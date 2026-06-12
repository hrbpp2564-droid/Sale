-- BWP Vantage — normalized sales tables for ปี 2569
-- Source: รายงานสรุปยอดขาย ประจำปี 2569 (ม.ค.–พ.ค. 2569, มูลค่าก่อน VAT)
-- These tables hold the raw monthly figures imported from the Excel workbook.
-- The dashboard reads its runtime snapshot from dashboard_data.payload (VDATA shape),
-- which is derived from the same source data and kept internally consistent.

-- ───────────────────────── Monthly summary ─────────────────────────
CREATE TABLE IF NOT EXISTS sales_monthly_2569 (
  month_num   smallint PRIMARY KEY,            -- 1=ม.ค. ... 12=ธ.ค.
  month_th    text NOT NULL,
  volume_kg   numeric,                         -- ยอดขาย (กก.)
  value_baht  numeric,                         -- มูลค่าก่อน VAT (บาท)
  avg_price   numeric GENERATED ALWAYS AS (
                CASE WHEN volume_kg > 0 THEN value_baht / volume_kg ELSE NULL END
              ) STORED,                        -- ราคาเฉลี่ย (บาท/กก.)
  num_customers smallint,                      -- จำนวนลูกค้า (ราย)
  top_customer  text,                          -- ลูกค้าอันดับ 1
  updated_at  timestamptz DEFAULT now()
);

-- ─────────────────────── Product breakdown (kg) ───────────────────────
CREATE TABLE IF NOT EXISTS sales_products_2569 (
  product_name text NOT NULL,                  -- ม้วนใส / ม้วนพิมพ์ / ถุงคลุม-ชีท / ฟิล์มยืด / ถุงหลอด
  month_num    smallint NOT NULL,
  volume_kg    numeric,
  PRIMARY KEY (product_name, month_num)
);

-- ─────────────────────── Customer breakdown (kg) ──────────────────────
CREATE TABLE IF NOT EXISTS sales_customers_2569 (
  rank_order    smallint NOT NULL,             -- อันดับตามปริมาณรวม
  customer_name text NOT NULL,
  month_num     smallint NOT NULL,
  volume_kg     numeric DEFAULT 0,
  PRIMARY KEY (customer_name, month_num)
);

-- Read-only public access (anon key) for the dashboard
ALTER TABLE sales_monthly_2569   ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_products_2569  ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_customers_2569 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read monthly"   ON sales_monthly_2569   FOR SELECT USING (true);
CREATE POLICY "public read products"  ON sales_products_2569  FOR SELECT USING (true);
CREATE POLICY "public read customers" ON sales_customers_2569 FOR SELECT USING (true);
