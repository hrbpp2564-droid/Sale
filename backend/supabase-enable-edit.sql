-- ============================================================
-- BWP VANTAGE — เปิดสิทธิ์ "แก้ไขข้อมูล" ผ่านเครื่องมือกรอกฟอร์ม
-- รันไฟล์นี้ใน Supabase → SQL Editor → Run (รันครั้งเดียวพอ)
-- หลังรันแล้ว เครื่องมือ "BWP-Data-Editor" จะบันทึกข้อมูลกลับได้
-- ============================================================

-- อนุญาตให้ update แถวที่ id = 'bwp' ผ่าน anon key
-- (ข้อมูลยอดขายภายใน หลังลิงก์ลับ — เหมาะกับการใช้งานภายในองค์กร)
drop policy if exists "anon update dashboard" on dashboard_data;
create policy "anon update dashboard" on dashboard_data
  for update using (true) with check (true);

-- เผื่อกรณีต้องสร้างแถวใหม่ครั้งแรก
drop policy if exists "anon insert dashboard" on dashboard_data;
create policy "anon insert dashboard" on dashboard_data
  for insert with check (true);

-- เสร็จ ✔  ทดสอบได้ที่เครื่องมือ BWP-Data-Editor → กดบันทึก
-- ────────────────────────────────────────────────────────────
-- 🔒 หมายเหตุความปลอดภัย:
-- policy นี้ให้ "ใครก็ตามที่รู้ลิงก์ + anon key" แก้ข้อมูลได้
-- ถ้าต้องการจำกัดเฉพาะผู้ดูแล แนะนำเปิด Supabase Auth แล้วเปลี่ยน
-- using/with check เป็น  (auth.role() = 'authenticated')
-- ============================================================
