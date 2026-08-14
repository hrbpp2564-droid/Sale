-- BWP Vantage — PIN ผู้บริหาร (อ่านอย่างเดียวจริง)
--
-- ปัญหาเดิม: โหมด "ผู้บริหาร" ใช้รหัสเดียวกับแอดมิน (app_secrets.dashboard_pass)
-- คำว่าอ่านอย่างเดียวจึงอยู่แค่ใน UI — ผู้ถือ PIN เรียก save_dashboard หรือ
-- set_dashboard_pass ตรง ๆ ได้ทันที ไฟล์นี้แยกความลับออกเป็นคนละตัว
--
-- ต้องรัน security_gatekeeper.sql มาก่อน · รันไฟล์นี้ครั้งเดียว
-- หลังรันแล้ว ให้แอดมินตั้ง PIN ผ่านปุ่ม 🔑 ในหน้า Data Editor
-- (หรือ: select public.set_dashboard_pass_ro('รหัสแอดมิน', 'PIN ใหม่'); )

-- READ-ONLY gate: ไม่มี RPC ตัวใดรับรหัสตัวนี้ไปเขียนข้อมูลได้
create or replace function public.get_dashboard_ro(pass text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare h text; result jsonb;
begin
  select hash into h from public.app_secrets where key = 'dashboard_pass_ro';
  if h is null then raise exception 'ro_not_configured'; end if;
  if h <> extensions.crypt(pass, h) then perform pg_sleep(0.4); raise exception 'unauthorized'; end if;
  select payload into result from public.dashboard_data where id = 'bwp';
  return result;
end; $$;

-- ตั้ง/เปลี่ยน PIN — ต้องยืนยันด้วยรหัสแอดมิน
create or replace function public.set_dashboard_pass_ro(admin_pass text, new_ro_pass text)
returns void language plpgsql security definer set search_path = public, extensions as $$
declare ok boolean;
begin
  select (hash = extensions.crypt(admin_pass, hash)) into ok
    from public.app_secrets where key = 'dashboard_pass';
  if not coalesce(ok, false) then perform pg_sleep(0.4); raise exception 'unauthorized'; end if;
  if new_ro_pass is null or length(new_ro_pass) < 6 then raise exception 'pin too short'; end if;
  if new_ro_pass = admin_pass then raise exception 'ro pin must differ from admin password'; end if;
  insert into public.app_secrets(key, hash)
  values ('dashboard_pass_ro', extensions.crypt(new_ro_pass, extensions.gen_salt('bf')))
  on conflict (key) do update set hash = excluded.hash, updated_at = now();
end; $$;

revoke all on function public.get_dashboard_ro(text)              from public;
revoke all on function public.set_dashboard_pass_ro(text, text)   from public;
grant execute on function public.get_dashboard_ro(text)            to anon, authenticated;
grant execute on function public.set_dashboard_pass_ro(text, text) to anon, authenticated;
