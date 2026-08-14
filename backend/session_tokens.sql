-- BWP Vantage — ล็อกอินครั้งเดียวใช้ได้ทุกหน้า (single sign-on)
--
-- ปัญหาเดิม: แดชบอร์ดตรวจกับ bwp_users แต่หน้าบันทึกข้อมูล/จัดการลูกค้าตรวจกับ
-- app_secrets.dashboard_pass — เป็นคนละรหัส ผู้ใช้จึงต้องกรอกซ้ำ และหน้าจัดการ
-- ลูกค้าเคยเก็บรหัสแอดมินไว้ใน sessionStorage ตรง ๆ เพื่อเลี่ยงการถามซ้ำ
--
-- วิธีใหม่: รวมทุกหน้าไว้ที่ bwp_users แล้วออก session token
--   * เบราว์เซอร์ถือแค่ token สุ่ม 32 ไบต์ ไม่ใช่รหัสผ่าน
--   * ฐานข้อมูลเก็บแค่ SHA-256 ของ token (ฐานข้อมูลรั่วก็สวมรอยไม่ได้)
--   * หมดอายุ 8 ชม. นับจากการใช้ครั้งล่าสุด (sliding) · เพิกถอนได้ทันที
--   * สิทธิ์เขียนผูกกับ role: admin/editor เท่านั้น viewer อ่านได้อย่างเดียว
--
-- ต้องรัน security_gatekeeper.sql + upload_archive.sql มาก่อน
-- ต้องมีผู้ใช้ในตาราง bwp_users แล้ว (ดู add_bwp_user)

create table if not exists public.app_sessions (
  token_hash   text primary key,
  username     text not null,
  role         text not null,
  created_at   timestamptz not null default now(),
  expires_at   timestamptz not null,
  last_used_at timestamptz not null default now()
);
create index if not exists app_sessions_expires_idx on public.app_sessions (expires_at);
alter table public.app_sessions enable row level security;   -- ไม่มี policy = anon แตะตรงไม่ได้

-- ตรวจ token → คืน {username, role} · เลื่อนอายุออกไปอีก 8 ชม.
-- ไม่ grant ให้ anon: เป็นตัวช่วยภายในสำหรับ RPC อื่นเท่านั้น
create or replace function public.session_check(p_token text, p_need_write boolean default false)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare h text; s public.app_sessions%rowtype;
begin
  if p_token is null or length(p_token) < 32 then raise exception 'session_invalid'; end if;
  h := encode(extensions.digest(p_token, 'sha256'), 'hex');
  select * into s from public.app_sessions where token_hash = h;
  if s.token_hash is null then raise exception 'session_invalid'; end if;
  if s.expires_at < now() then
    delete from public.app_sessions where token_hash = h;
    raise exception 'session_expired';
  end if;
  if p_need_write and s.role not in ('admin', 'editor') then raise exception 'forbidden'; end if;
  update public.app_sessions
     set last_used_at = now(), expires_at = now() + interval '8 hours'
   where token_hash = h;
  return jsonb_build_object('username', s.username, 'role', s.role);
end; $$;

-- ล็อกอิน: ตรวจกับ bwp_users แล้วออก token พร้อมส่ง payload กลับในครั้งเดียว
create or replace function public.login_session(p_username text, p_pass text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare u public.bwp_users%rowtype; tok text; h text; exp timestamptz;
begin
  select * into u from public.bwp_users where username = p_username and coalesce(active, true);
  if u.id is null or u.password_hash is null
     or u.password_hash <> extensions.crypt(p_pass, u.password_hash) then
    perform pg_sleep(0.4);
    raise exception 'unauthorized';
  end if;

  delete from public.app_sessions where expires_at < now();
  tok := encode(extensions.gen_random_bytes(32), 'hex');
  h   := encode(extensions.digest(tok, 'sha256'), 'hex');
  exp := now() + interval '8 hours';
  insert into public.app_sessions(token_hash, username, role, expires_at)
  values (h, u.username, coalesce(u.role, 'viewer'), exp);

  return jsonb_build_object(
    'token', tok,
    'username', u.username,
    'role', coalesce(u.role, 'viewer'),
    'canWrite', coalesce(u.role, 'viewer') in ('admin', 'editor'),
    'expiresAt', exp,
    'payload', (select payload from public.dashboard_data where id = 'bwp')
  );
end; $$;

create or replace function public.logout_session(p_token text)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  delete from public.app_sessions
   where token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex');
end; $$;

-- ---------- RPC ที่ใช้ token แทนรหัสผ่าน ----------

create or replace function public.get_dashboard_s(p_token text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare s jsonb;
begin
  s := public.session_check(p_token, false);
  return (select payload from public.dashboard_data where id = 'bwp');
end; $$;

create or replace function public.save_dashboard_s(p_token text, new_payload jsonb)
returns void language plpgsql security definer set search_path = public, extensions as $$
declare s jsonb;
begin
  s := public.session_check(p_token, true);
  insert into public.dashboard_data(id, payload, updated_at) values ('bwp', new_payload, now())
  on conflict (id) do update set payload = excluded.payload, updated_at = now();
end; $$;

create or replace function public.save_upload_s(
  p_token text, p_filename text, p_mime text, p_size integer, p_content_b64 text, p_kind text default 'current'
) returns bigint language plpgsql security definer set search_path = public, extensions as $$
declare s jsonb; new_id bigint;
begin
  s := public.session_check(p_token, true);
  if p_content_b64 is null or length(p_content_b64) = 0 then raise exception 'empty file'; end if;
  if length(p_content_b64) > 11534336 then raise exception 'file too large (max 8 MB)'; end if;
  insert into public.upload_files(filename, mime, size_bytes, content_b64, kind)
  values (p_filename, p_mime, p_size, p_content_b64, coalesce(p_kind, 'current')) returning id into new_id;
  delete from public.upload_files
   where id in (select id from public.upload_files order by uploaded_at desc offset 20);
  return new_id;
end; $$;

create or replace function public.list_uploads_s(p_token text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare s jsonb; result jsonb;
begin
  s := public.session_check(p_token, false);
  select coalesce(jsonb_agg(x order by x->>'uploaded_at' desc), '[]'::jsonb) into result
    from (select jsonb_build_object('id', id, 'filename', filename, 'mime', mime,
                 'size_bytes', size_bytes, 'kind', kind, 'uploaded_at', uploaded_at) as x
            from public.upload_files) t;
  return result;
end; $$;

create or replace function public.get_upload_s(p_token text, p_id bigint)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare s jsonb; result jsonb;
begin
  s := public.session_check(p_token, false);
  select jsonb_build_object('id', id, 'filename', filename, 'mime', mime, 'content_b64', content_b64)
    into result from public.upload_files where id = p_id;
  if result is null then raise exception 'not found'; end if;
  return result;
end; $$;

-- ตั้ง PIN ผู้บริหาร — admin เท่านั้น
create or replace function public.set_pass_ro_s(p_token text, new_ro_pass text)
returns void language plpgsql security definer set search_path = public, extensions as $$
declare s jsonb;
begin
  s := public.session_check(p_token, true);
  if s->>'role' <> 'admin' then raise exception 'forbidden'; end if;
  if new_ro_pass is null or length(new_ro_pass) < 6 then raise exception 'pin too short'; end if;
  insert into public.app_secrets(key, hash)
  values ('dashboard_pass_ro', extensions.crypt(new_ro_pass, extensions.gen_salt('bf')))
  on conflict (key) do update set hash = excluded.hash, updated_at = now();
end; $$;

-- เปลี่ยนรหัสของบัญชีตัวเอง — ต้องยืนยันรหัสเดิม แล้วเตะทุก session ของบัญชีนั้นออก
create or replace function public.change_own_password_s(p_token text, old_pass text, new_pass text)
returns void language plpgsql security definer set search_path = public, extensions as $$
declare s jsonb; uname text; cur text;
begin
  s := public.session_check(p_token, false);
  uname := s->>'username';
  select password_hash into cur from public.bwp_users where username = uname;
  if cur is null or cur <> extensions.crypt(old_pass, cur) then
    perform pg_sleep(0.4); raise exception 'unauthorized';
  end if;
  if new_pass is null or length(new_pass) < 8 then raise exception 'password too short'; end if;
  update public.bwp_users set password_hash = extensions.crypt(new_pass, extensions.gen_salt('bf'))
   where username = uname;
  delete from public.app_sessions where username = uname;
end; $$;

revoke all on function public.session_check(text, boolean)                             from public;
revoke all on function public.login_session(text, text)                                from public;
revoke all on function public.logout_session(text)                                     from public;
revoke all on function public.get_dashboard_s(text)                                    from public;
revoke all on function public.save_dashboard_s(text, jsonb)                            from public;
revoke all on function public.save_upload_s(text, text, text, integer, text, text)     from public;
revoke all on function public.list_uploads_s(text)                                     from public;
revoke all on function public.get_upload_s(text, bigint)                               from public;
revoke all on function public.set_pass_ro_s(text, text)                                from public;
revoke all on function public.change_own_password_s(text, text, text)                  from public;

grant execute on function public.login_session(text, text)                              to anon, authenticated;
grant execute on function public.logout_session(text)                                   to anon, authenticated;
grant execute on function public.get_dashboard_s(text)                                  to anon, authenticated;
grant execute on function public.save_dashboard_s(text, jsonb)                          to anon, authenticated;
grant execute on function public.save_upload_s(text, text, text, integer, text, text)    to anon, authenticated;
grant execute on function public.list_uploads_s(text)                                   to anon, authenticated;
grant execute on function public.get_upload_s(text, bigint)                             to anon, authenticated;
grant execute on function public.set_pass_ro_s(text, text)                              to anon, authenticated;
grant execute on function public.change_own_password_s(text, text, text)                to anon, authenticated;
