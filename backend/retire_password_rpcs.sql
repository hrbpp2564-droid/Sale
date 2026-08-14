-- BWP Vantage — ปิดทางเข้าแบบเก่าที่รับรหัสผ่านตรง ๆ
--
-- หลังย้ายมาใช้ session token (session_tokens.sql) ทุกหน้าเรียกเฉพาะ RPC
-- ตระกูล _s กับ login_session และ get_dashboard_ro เท่านั้น แต่ RPC ชุดเดิม
-- ยังเปิดอยู่ ทำให้ใครที่เคยรู้ app_secrets.dashboard_pass ยังยิง
-- save_dashboard() เขียนทับข้อมูลได้ โดยข้ามทั้ง session และ role
--
-- หมายเหตุสำคัญ: Postgres ให้ EXECUTE กับ PUBLIC เป็นค่าเริ่มต้น และ Supabase
-- ยังตั้ง default privileges ให้ anon/authenticated กับฟังก์ชันใหม่ในสคีมา
-- public อัตโนมัติด้วย — การ revoke จาก anon อย่างเดียวจึงไม่พอ ต้อง revoke
-- จาก public ด้วยเสมอ ไม่งั้นจะยังเรียกได้อยู่ (เจอมาแล้วกับ get_dashboard_user)

revoke execute on function public.get_dashboard(text)                                from public, anon, authenticated;
revoke execute on function public.save_dashboard(text, jsonb)                        from public, anon, authenticated;
revoke execute on function public.set_dashboard_pass(text, text)                     from public, anon, authenticated;
revoke execute on function public.set_dashboard_pass_ro(text, text)                  from public, anon, authenticated;
revoke execute on function public.get_dashboard_user(text, text)                     from public, anon, authenticated;
revoke execute on function public.save_dashboard_user(text, text, jsonb)             from public, anon, authenticated;
revoke execute on function public.save_upload(text, text, text, integer, text, text) from public, anon, authenticated;
revoke execute on function public.list_uploads(text)                                 from public, anon, authenticated;
revoke execute on function public.get_upload(text, bigint)                           from public, anon, authenticated;

-- ตัวช่วยภายในของ RPC อื่น ไม่ควรเรียกจากภายนอก
revoke execute on function public.session_check(text, boolean) from public, anon, authenticated;

-- ยังเปิดอยู่ (ตั้งใจ): login_session · logout_session · get_dashboard_ro
-- และ RPC ตระกูล _s ทั้งหมด — คือทุกอย่างที่หน้าเว็บใช้จริง
--
-- ยังไม่ได้แตะ: add_bwp_user · deactivate_bwp_user · change_bwp_password
-- ทั้งสามตัวยังเปิดให้ PUBLIC เรียกได้ ตัวมันเองต้องใช้รหัสแอดมินจึงจะผ่าน
-- (ไม่ใช่ช่องข้ามสิทธิ์) แต่ยังไม่มีหน้าจอไหนเรียกใช้ ถ้าจะจัดการผู้ใช้ผ่าน SQL
-- อย่างเดียว ปิดได้ด้วย:
--   revoke execute on function public.add_bwp_user(text,text,text,text,text,text) from public, anon, authenticated;
--   revoke execute on function public.deactivate_bwp_user(text,text,text)          from public, anon, authenticated;
--   revoke execute on function public.change_bwp_password(text,text,text)          from public, anon, authenticated;
--
-- กู้คืนทางเก่า (ถ้าจำเป็น): grant execute on function <ชื่อ>(<args>) to anon;
