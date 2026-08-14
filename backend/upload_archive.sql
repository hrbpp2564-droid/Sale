-- BWP Vantage — คลังเก็บไฟล์ Excel ต้นฉบับที่อัปโหลด
-- ใช้รหัสผ่านชุดเดียวกับ get_dashboard (app_secrets.dashboard_pass)
-- ต้องรัน security_gatekeeper.sql มาก่อน
--
-- รันไฟล์นี้ครั้งเดียวใน Supabase → SQL Editor ของโปรเจกต์ Sale

create table if not exists public.upload_files (
  id          bigserial primary key,
  filename    text not null,
  mime        text,
  size_bytes  integer,
  content_b64 text not null,          -- ตัวไฟล์ .xlsx เข้ารหัส base64
  kind        text default 'current', -- 'current' = ปี 2569 · 'history' = ปีเก่า
  uploaded_at timestamptz not null default now()
);

create index if not exists upload_files_uploaded_at_idx on public.upload_files (uploaded_at desc);

-- ไม่มี policy ใด ๆ = anon แตะตารางนี้ตรง ๆ ไม่ได้เลย ต้องผ่าน RPC ที่ตรวจรหัสผ่านเท่านั้น
alter table public.upload_files enable row level security;

-- ---------- บันทึกไฟล์ ----------
create or replace function public.save_upload(
  pass text, p_filename text, p_mime text, p_size integer, p_content_b64 text, p_kind text default 'current'
) returns bigint language plpgsql security definer set search_path = public, extensions as $$
declare ok boolean; new_id bigint;
begin
  select (hash = extensions.crypt(pass, hash)) into ok from public.app_secrets where key='dashboard_pass';
  if not coalesce(ok,false) then perform pg_sleep(0.4); raise exception 'unauthorized'; end if;
  if p_content_b64 is null or length(p_content_b64) = 0 then raise exception 'empty file'; end if;
  -- 8 MB จริง ≈ 11.2 MB เมื่อเข้ารหัส base64 — วัดจากของที่ส่งมาจริง ไม่ใช่ตัวเลขที่ client แจ้ง (ปลอมได้)
  if length(p_content_b64) > 11534336 then raise exception 'file too large (max 8 MB)'; end if;

  insert into public.upload_files(filename, mime, size_bytes, content_b64, kind)
  values (p_filename, p_mime, p_size, p_content_b64, coalesce(p_kind, 'current'))
  returning id into new_id;

  -- เก็บย้อนหลังแค่ 20 ไฟล์ล่าสุด กันตารางบวม
  delete from public.upload_files
   where id in (select id from public.upload_files order by uploaded_at desc offset 20);

  return new_id;
end; $$;

-- ---------- รายการไฟล์ (ไม่ส่งตัวไฟล์กลับ เพื่อให้ list เร็ว) ----------
create or replace function public.list_uploads(pass text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare ok boolean; result jsonb;
begin
  select (hash = extensions.crypt(pass, hash)) into ok from public.app_secrets where key='dashboard_pass';
  if not coalesce(ok,false) then perform pg_sleep(0.4); raise exception 'unauthorized'; end if;
  select coalesce(jsonb_agg(x order by x->>'uploaded_at' desc), '[]'::jsonb) into result
    from (select jsonb_build_object(
            'id', id, 'filename', filename, 'mime', mime,
            'size_bytes', size_bytes, 'kind', kind, 'uploaded_at', uploaded_at
          ) as x from public.upload_files) t;
  return result;
end; $$;

-- ---------- ดึงไฟล์เดียวพร้อมเนื้อไฟล์ ----------
create or replace function public.get_upload(pass text, p_id bigint)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare ok boolean; result jsonb;
begin
  select (hash = extensions.crypt(pass, hash)) into ok from public.app_secrets where key='dashboard_pass';
  if not coalesce(ok,false) then perform pg_sleep(0.4); raise exception 'unauthorized'; end if;
  select jsonb_build_object('id', id, 'filename', filename, 'mime', mime, 'content_b64', content_b64)
    into result from public.upload_files where id = p_id;
  if result is null then raise exception 'not found'; end if;
  return result;
end; $$;

revoke all on function public.save_upload(text, text, text, integer, text, text) from public;
revoke all on function public.list_uploads(text)                                 from public;
revoke all on function public.get_upload(text, bigint)                           from public;
grant execute on function public.save_upload(text, text, text, integer, text, text) to anon, authenticated;
grant execute on function public.list_uploads(text)                                 to anon, authenticated;
grant execute on function public.get_upload(text, bigint)                           to anon, authenticated;
