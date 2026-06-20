/* Screens: Product Analysis (+detail), Product Mix, Price Analysis → window.{ProductScreen, MixScreen, PriceScreen} */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { Card, KpiCard, DeltaBadge, RankBar, DataTable, LineChart, DonutChart, SegmentedControl, Badge, Button } = NS;
  const Icon = window.Icon;
  const { fmt } = window.VUtil;
  const { Grid } = window;
  const viewFor = window.viewFor || function(f){ return window.VDATA; };
  const D = window.VDATA;
  const NACT = D.NACT;
  const groupColors = { 'ฟิล์มใส': 'var(--viz-1)', 'พิมพ์สี': 'var(--viz-3)', 'PCR (รีไซเคิล)': 'var(--viz-2)', 'สูตรพิเศษ': 'var(--viz-4)' };
  const prodGrowth = (p) => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(1) : 0;
  // per-product monthly volume (Kg) derived from monthly value (บาท) ÷ monthly price (฿/Kg)
  const prodKg = (p) => p.monthly.map((v, i) => (p.priceMonthly[i] ? Math.round(v / p.priceMonthly[i]) : 0));
  const prodKgK = (p) => prodKg(p).map((k) => +(k / 1000).toFixed(1)); // พัน Kg

  function groupAgg() {
    const map = {};
    D.PRODUCTS.forEach((p) => { map[p.group] = (map[p.group] || 0) + p.val; });
    return Object.entries(map).map(([group, val]) => ({ group, val })).sort((a, b) => b.val - a.val);
  }

  // ---------- Product Analysis ----------
  function ProductScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const prodGrowth = p => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(1) : 0;
    const groupAgg = (prods) => { prods = prods || D.PRODUCTS; const map = {}; prods.forEach(p => { map[p.group] = (map[p.group] || 0) + p.val; }); return Object.entries(map).map(([group, val]) => ({group, val})).sort((a, b) => b.val - a.val); };
    const [metric, setMetric] = React.useState('val'); // val | kg
    const [sel, setSel] = React.useState(null);
    const sorted = [...D.PRODUCTS].sort((a, b) => b[metric] - a[metric]);
    const max = sorted[0][metric];
    const topG = groupAgg()[0];

    if (sel) return <ProductDetail product={sel} onBack={() => setSel(null)} viewD={D} />;

    return (
      <div>
        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label="จำนวนสินค้า (ขนาด)" value={String(D.nSizes)} unit="SKU" icon={<Icon name="package" size={15} />} />
          <KpiCard label="มูลค่าขายรวม" value={fmt.dec1(D.totals.value / 1e6)} unit="ลบ." delta={D.totals.momVal} />
          <KpiCard label="ราคาเฉลี่ย" value={D.totals.avgPrice} unit="฿/Kg" delta={D.price69 && D.price69[NACT - 2] ? +((D.price69[NACT - 1] / D.price69[NACT - 2] - 1) * 100).toFixed(1) : 0} />
          <KpiCard label="กลุ่มขายดีสุด" value={topG.group} unit={fmt.dec1(topG.val / 1e6) + ' ลบ.'} icon={<Icon name="layers" size={15} />} />
        </Grid>

        <Grid cols={2} gap={16} style={{ marginBottom: 16 }}>
          <Card title={`Top 10 สินค้า — ${metric === 'val' ? 'มูลค่าขาย' : 'ปริมาณขาย'}`}
            actions={<SegmentedControl size="sm" value={metric} onChange={setMetric} options={[{value:'val',label:'มูลค่า'},{value:'kg',label:'ปริมาณ'}]} />}
            bodyStyle={{ padding: 'var(--space-2)' }}>
            {sorted.slice(0, 10).map((p, i) => (
              <RankBar key={p.id} rank={i + 1} label={p.name} sublabel={p.group}
                value={metric === 'val' ? fmt.dec1(p.val / 1e6) + ' ลบ.' : fmt.int(p.kg) + ' Kg'}
                ratio={p[metric] / max} share={p.share + '%'} delta={prodGrowth(p)}
                color={groupColors[p.group] || 'var(--viz-1)'} onClick={() => setSel(p)} />
            ))}
          </Card>

          <Card title="สัดส่วนมูลค่าขายตามกลุ่มสินค้า">
            <DonutChart size={180} thickness={26} centerValue={fmt.int(D.totals.value)} centerLabel="รวม (บาท)"
              data={groupAgg().map((g) => ({ label: g.group, value: g.val, color: groupColors[g.group] || 'var(--slate-500)' }))} />
          </Card>
        </Grid>

        <Card title="ปริมาณขายรายเดือนแยกตามสินค้า (Kg)" subtitle="พัน Kg · Top 6 สินค้า + ยอดรวมทุกสินค้า · ม.ค.–พ.ค. 2569"
          actions={<Badge tone="neutral" size="sm">หน่วย: พัน Kg</Badge>} style={{ marginBottom: 16 }}>
          <LineChart height={280} labels={D.MONTHS_ACT} yFormat={(v) => fmt.int(v)} showDots
            series={[
              { name: 'ยอดรวมทุกสินค้า', data: D.volumeByYear[2569].slice(0, NACT), color: 'var(--viz-2)', type: 'area' },
              ...[...D.PRODUCTS].sort((a, b) => b.kg - a.kg).slice(0, 6).map((p, i) => ({
                name: p.name, data: prodKgK(p), color: `var(--viz-${(i % 8) + 1})`, type: 'line',
              })),
            ]} />
        </Card>

        <Card title="สินค้าทั้งหมด (Top 12 ตามมูลค่า)" subtitle="คลิกแถวเพื่อ Drill Down" padding="none">
          <DataTable rows={sorted} onRowClick={setSel} rowKey={(r) => r.id}
            columns={[
              { key: '_r', header: '#', width: 48, numeric: true, sortable: false, render: (r) => sorted.indexOf(r) + 1 },
              { key: 'name', header: 'สินค้า (ขนาด)', render: (r) => <span style={{ fontWeight: 500 }}>{r.name}</span> },
              { key: 'group', header: 'กลุ่ม', muted: true, render: (r) => <Badge tone="neutral" size="sm">{r.group}</Badge> },
              { key: 'kg', header: 'ปริมาณ (Kg)', numeric: true, render: (r) => fmt.int(r.kg) },
              { key: 'val', header: 'มูลค่า (ลบ.)', numeric: true, render: (r) => fmt.dec1(r.val / 1e6) },
              { key: 'avgPrice', header: 'ราคาเฉลี่ย (฿/Kg)', numeric: true, render: (r) => fmt.dec1(r.avgPrice) },
              { key: 'share', header: 'สัดส่วน', numeric: true, render: (r) => r.share + '%' },
              { key: 'g', header: 'MoM', numeric: true, sortable: false, render: (r) => <DeltaBadge value={prodGrowth(r)} size="sm" /> },
            ]} />
        </Card>
      </div>
    );
  }

  function ProductDetail({ product: p, onBack, viewD }) {
    const _D = viewD || window.VDATA;
    const _pg = p.monthly.length >= 2 && p.monthly[p.monthly.length - 2] ? +((p.monthly[p.monthly.length - 1] / p.monthly[p.monthly.length - 2] - 1) * 100).toFixed(1) : 0;
    const _kArr = prodKg(p);
    const _kg = _kArr.length >= 2 && _kArr[_kArr.length - 2] ? +((_kArr[_kArr.length - 1] / _kArr[_kArr.length - 2] - 1) * 100).toFixed(1) : 0;
    const _pp = p.priceMonthly.length >= 2 && p.priceMonthly[p.priceMonthly.length - 2] ? +((p.priceMonthly[p.priceMonthly.length - 1] / p.priceMonthly[p.priceMonthly.length - 2] - 1) * 100).toFixed(1) : 0;
    const topCustForProduct = [..._D.CUSTOMERS].sort((a, b) => b.kg - a.kg).slice(0, 5);
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <Button variant="ghost" size="sm" iconLeft={<Icon name="chevron-left" size={15} />} onClick={onBack}>กลับ</Button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'var(--accent-subtle)', color: 'var(--accent-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="package" size={19} /></span>
            <div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>กลุ่ม {p.group} · อันดับ #{[..._D.PRODUCTS].sort((a,b)=>b.val-a.val).indexOf(p) + 1}</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <DeltaBadge value={_pg} size="lg" suffix=" MoM" />
        </div>

        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label={`มูลค่าขาย ${_D.NACT} เดือน`} value={fmt.dec1(p.val / 1e6)} unit="ลบ." delta={_pg} accent />
          <KpiCard label="ปริมาณขาย" value={fmt.int(p.kg)} unit="Kg" delta={_kg} />
          <KpiCard label="ราคาเฉลี่ย" value={fmt.dec1(p.avgPrice)} unit="฿/Kg" delta={_pp} />
          <KpiCard label="สัดส่วนพอร์ต" value={p.share} unit="%" />
        </Grid>

        <Card title="มูลค่า + ปริมาณ รายเดือน · 2569" subtitle={`มูลค่า (ลบ.) แกนซ้าย · ปริมาณ (Kg) แกนขวา · ${_D.MONTHS_ACT[0]}–${_D.MONTHS_ACT[_D.NACT-1]}`} style={{ marginBottom: 16 }}>
          <LineChart height={240} labels={_D.MONTHS_ACT} yFormat={(v) => fmt.dec1(v/1e6)} showDots
            series={[
              { name: 'มูลค่า (ลบ.)', data: p.monthly, color: 'var(--viz-1)', type: 'bar' },
              { name: 'ปริมาณ (Kg)', data: prodKg(p), color: 'var(--viz-2)', type: 'line', axis: 'right' },
            ]} />
        </Card>

        <Grid cols={2} gap={16} style={{ marginBottom: 16 }}>
          <Card title="แนวโน้มปริมาณรายเดือน · 2569" subtitle="ปริมาณ (Kg) · ม.ค.–พ.ค.">
            <LineChart height={220} labels={_D.MONTHS_ACT} yFormat={(v) => fmt.int(v)}
              series={[{ name: p.name, data: prodKg(p), color: 'var(--viz-2)', type: 'area' }]} />
          </Card>
          <Card title="ราคาเฉลี่ยรายเดือน" subtitle="฿/Kg">
            <LineChart height={220} labels={_D.MONTHS_ACT} yFormat={(v) => fmt.int(v)}
              series={[{ name: 'ราคา', data: p.priceMonthly, color: 'var(--viz-3)', type: 'line' }]} />
          </Card>
        </Grid>

        <Card title="ลูกค้าที่ซื้อสินค้านี้มากที่สุด" subtitle="ตัวอย่างการแสดงผล · ยังไม่มีข้อมูลสินค้า×ลูกค้าจริง" actions={<Badge tone="warning" variant="soft">ตัวอย่าง</Badge>} bodyStyle={{ padding: 'var(--space-2)' }}>
          {topCustForProduct.map((c, i) => {
            const portion = [0.3, 0.22, 0.18, 0.16, 0.14][i];
            return <RankBar key={c.id} rank={i + 1} label={c.name} sublabel={fmt.int(p.kg * portion) + ' Kg (ประมาณ)'}
              value={(portion * 100).toFixed(0) + '%'} ratio={[1, 0.73, 0.6, 0.53, 0.46][i]} color="var(--viz-4)" />;
          })}
        </Card>
      </div>
    );
  }

  // ---------- Product Mix (treemap) ----------
  function Treemap({ data, height = 300 }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const [hover, setHover] = React.useState(null);
    return (
      <div style={{ display: 'flex', gap: 4, height }}>
        <div style={{ flex: sorted[0].value, display: 'flex' }}><Cell d={sorted[0]} total={total} hover={hover} setHover={setHover} /></div>
        <div style={{ flex: sorted.slice(1, 4).reduce((s, d) => s + d.value, 0), display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sorted.slice(1, 4).map((d) => <div key={d.label} style={{ flex: d.value, display: 'flex' }}><Cell d={d} total={total} hover={hover} setHover={setHover} /></div>)}
        </div>
        <div style={{ flex: Math.max(1, sorted.slice(4).reduce((s, d) => s + d.value, 0)), display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sorted.slice(4).map((d) => <div key={d.label} style={{ flex: d.value, display: 'flex' }}><Cell d={d} total={total} hover={hover} setHover={setHover} small /></div>)}
        </div>
      </div>
    );
  }
  function Cell({ d, total, hover, setHover, small }) {
    const on = hover === d.label;
    return (
      <div onMouseEnter={() => setHover(d.label)} onMouseLeave={() => setHover(null)}
        style={{ flex: 1, background: d.color, borderRadius: 'var(--radius-sm)', padding: small ? '7px 9px' : '12px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', cursor: 'pointer',
          outline: on ? '2px solid var(--text-primary)' : 'none', outlineOffset: -2, overflow: 'hidden',
          filter: hover && !on ? 'brightness(0.7)' : 'none', transition: 'filter var(--dur-fast)' }}>
        <div style={{ fontSize: small ? 11 : 'var(--text-sm)', fontWeight: 600, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.label}</div>
        {!small && <div style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,.85)', textShadow: '0 1px 2px rgba(0,0,0,.4)' }}>{(d.value / total * 100).toFixed(1)}%</div>}
      </div>
    );
  }

  function MixScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const groupAgg = (prods) => { prods = prods || D.PRODUCTS; const map = {}; prods.forEach(p => { map[p.group] = (map[p.group] || 0) + p.val; }); return Object.entries(map).map(([group, val]) => ({group, val})).sort((a, b) => b.val - a.val); };
    const [view, setView] = React.useState('treemap');
    const sorted = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const segs = sorted.map((p, i) => ({ label: p.name, value: p.val, color: `var(--viz-${(i % 8) + 1})` }));
    const groupSegs = groupAgg().map((g) => ({ label: g.group, value: g.val, color: groupColors[g.group] || 'var(--slate-500)' }));

    return (
      <div>
        <Card title="สัดส่วนยอดขายแต่ละสินค้า (Product Mix)" subtitle={`มูลค่าขาย (ลบ.) · ${NACT} เดือน 2569`}
          actions={<SegmentedControl size="sm" value={view} onChange={setView} options={[{value:'treemap',label:'Treemap'},{value:'pie',label:'Pie'}]} />}>
          {view === 'treemap'
            ? <Treemap data={segs} height={320} />
            : <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}><DonutChart size={260} thickness={40} centerValue={fmt.int(D.totals.value)} centerLabel="รวมทั้งหมด (บาท)" data={segs} /></div>}
        </Card>

        <Grid cols={2} gap={16} style={{ marginTop: 16 }}>
          <Card title="Product Ranking" subtitle="เรียงตามสัดส่วนมูลค่า" bodyStyle={{ padding: 'var(--space-2)' }}>
            {sorted.map((p, i) => (
              <RankBar key={p.id} rank={i + 1} label={p.name} sublabel={p.group}
                value={p.share + '%'} ratio={p.val / sorted[0].val} delta={prodGrowth(p)} color={`var(--viz-${(i % 8) + 1})`} />
            ))}
          </Card>
          <Card title="สัดส่วนตามกลุ่มสินค้า" subtitle="4 กลุ่มหลัก">
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
              <DonutChart size={200} thickness={30} centerValue={String(groupAgg().length)} centerLabel="กลุ่ม" data={groupSegs} />
            </div>
          </Card>
        </Grid>
      </div>
    );
  }

  // ---------- Price Analysis ----------
  function PriceScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const [gran, setGran] = React.useState('month');
    const data = gran === 'year' ? D.YEARS.map((y) => Math.round(D.sum(D.valueByYear[y].slice(0, NACT)) / (D.sum(D.volumeByYear[y].slice(0, NACT)) * 1000))) : D.price69;
    const labels = gran === 'year' ? D.YEARS.map(String) : D.MONTHS_ACT;
    const prodByPrice = [...D.PRODUCTS].sort((a, b) => b.avgPrice - a.avgPrice);

    // real price alerts: products whose last-month price deviates strongly from their 5mo avg
    const alerts = D.PRODUCTS.map((p) => {
      const last = p.priceMonthly[NACT - 1], first = p.priceMonthly[0];
      const change = first ? +((last / first - 1) * 100).toFixed(1) : 0;
      return { name: p.name, change };
    }).filter((a) => Math.abs(a.change) >= 8).sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 5);

    return (
      <div>
        <Grid min={200} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label="ราคาเฉลี่ยต่อ Kg" value={D.totals.avgPrice} unit="฿/Kg" delta={((D.price69[NACT-1]/D.price69[0])-1)*100} deltaSuffix=" 5เดือน" accent icon={<Icon name="tag" size={15} />} />
          <KpiCard label="ราคาเฉลี่ยต่อสินค้า" value={fmt.dec1(D.totals.value / 1e6 / D.nSizes)} unit="ลบ./SKU" icon={<Icon name="package" size={15} />} />
          <KpiCard label="ราคาเฉลี่ยต่อลูกค้า" value={fmt.dec1(D.totals.value / 1e6 / D.nCustomers)} unit="ลบ./ราย" icon={<Icon name="users" size={15} />} />
        </Grid>

        <Card title="ราคาขายเฉลี่ย (Average Selling Price)" subtitle="มูลค่าขาย ÷ ปริมาณขาย · ฿/Kg"
          actions={<SegmentedControl size="sm" value={gran} onChange={setGran} options={[{value:'month',label:'รายเดือน'},{value:'year',label:'รายปี'}]} />}>
          <LineChart height={280} labels={labels} yFormat={(v) => '฿' + fmt.int(v)} showDots
            series={[{ name: 'ราคาเฉลี่ย ฿/Kg', data, color: 'var(--viz-3)', type: 'area' }]} />
        </Card>

        <Grid cols={2} gap={16} style={{ marginTop: 16 }}>
          <Card title="ราคาเฉลี่ยต่อสินค้า" subtitle="Top ตามราคา ฿/Kg" bodyStyle={{ padding: 'var(--space-2)' }}>
            {prodByPrice.slice(0, 8).map((p, i) => (
              <RankBar key={p.id} rank={i + 1} label={p.name} sublabel={p.group}
                value={fmt.dec1(p.avgPrice) + ' ฿/Kg'} ratio={p.avgPrice / prodByPrice[0].avgPrice} color="var(--viz-3)" />
            ))}
          </Card>
          <Card title="แจ้งเตือนการเปลี่ยนแปลงราคา" subtitle="เปลี่ยนแปลงเกิน ±8% (ม.ค.→พ.ค.)"
            actions={<Badge tone="warning" dot>{alerts.length} รายการ</Badge>} bodyStyle={{ padding: 'var(--space-3)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {alerts.length === 0 && <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', padding: 8 }}>ไม่มีรายการเกินเกณฑ์</div>}
              {alerts.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: a.change >= 0 ? 'var(--positive)' : 'var(--negative)' }}><Icon name={a.change >= 0 ? 'trending-up' : 'trending-down'} size={18} /></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>ราคาปรับ{a.change >= 0 ? 'ขึ้น' : 'ลด'}เกินเกณฑ์</div>
                  </div>
                  <DeltaBadge value={a.change} size="md" />
                </div>
              ))}
            </div>
          </Card>
        </Grid>
      </div>
    );
  }

  window.ProductScreen = ProductScreen;
  window.MixScreen = MixScreen;
  window.PriceScreen = PriceScreen;
})();
