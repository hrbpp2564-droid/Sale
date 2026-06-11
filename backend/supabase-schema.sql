-- ============================================================
-- BWP VANTAGE — Supabase schema (วิธีที่ง่ายและเวิร์กจริง)
-- เก็บข้อมูลแดชบอร์ดเป็น JSONB snapshot 1 แถว — อ่านเร็ว อัปเดตง่าย
-- วิธีใช้: Supabase → SQL Editor → วางทั้งหมดนี้ → Run
-- จากนั้นเปิดไฟล์ supabase-seed.sql → วาง → Run (ใส่ข้อมูลจริง)
-- ============================================================

create table if not exists dashboard_data (
  id          text primary key,           -- 'bwp'
  payload     jsonb not null,             -- ออบเจ็กต์ VDATA ทั้งก้อน
  label       text,
  updated_at  timestamptz default now()
);

-- เปิดอ่านสาธารณะ (read-only) ให้แดชบอร์ดดึงด้วย anon key — ปลอดภัย
alter table dashboard_data enable row level security;

drop policy if exists "public read dashboard" on dashboard_data;
create policy "public read dashboard" on dashboard_data
  for select using (true);

-- เสร็จ ✔  ต่อไป: รัน supabase-seed.sql เพื่อใส่ข้อมูลจริง
