/* Screens: Executive Overview + Sales Overview → window.{OverviewScreen, SalesScreen}
   Data: BWP real sales ม.ค.–พ.ค. 2569 (เทียบ 2568). Value=ล้านบาท, Volume=พัน Kg. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { Card, KpiCard, DeltaBadge, RankBar, InsightCard, LineChart, DonutChart, Sparkline, SegmentedControl, Badge } = NS;
  const Icon = window.Icon;
  const { fmt } = window.VUtil;
  const { DrillHint, Grid } = window;
  const D = window.VDATA;
  const NACT = D.NACT;

  const KPI_DRILL = { volume: 'sales', value: 'sales', price: 'price', customers: 'customer', products: 'product', orders: 'sales' };
  const prodGrowth = (p) => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(1) : 0;
  const groupColors = { 'ฟิล์มใส': 'var(--viz-1)', 'พิมพ์สี': 'var(--viz-3)', 'PCR (รีไซเคิล)': 'var(--viz-2)', 'สูตรพิเศษ': 'var(--viz-4)' };

  // Real-data insights
  const INSIGHTS = [
    { tone: D.totals.momVal >= 0 ? 'positive' : 'negative', icon: D.totals.momVal >= 0 ? 'trending-up' : 'trending-down', title: 'มูลค่าขายเดือน พ.ค. เทียบเดือนก่อน', metric: fmt.pct(D.totals.momVal), detail: `ราคาเฉลี่ยพุ่งเป็น ${D.price69[NACT-1]} ฿/Kg (จาก ${D.price69[0]} ฿/Kg เมื่อ ม.ค.) เป็นแรงหนุนหลัก`, time: 'ล่าสุด' },
    { tone: 'warning', icon: 'alert-triangle', title: 'พึ่งพาลูกค้ารายใหญ่สูงมาก', metric: D.totals.top3 + '%', detail: `Top 3 ลูกค้า (${D.CUSTOMERS.slice(0,3).map(c=>c.name.split(' ')[0]).join(', ')}) สร้างยอด ${D.totals.top3}% ของปริมาณ — ความเสี่ยงกระจุกตัว`, time: 'เฝ้าระวัง' },
    { tone: 'positive', icon: 'arrow-up', title: `ลูกค้าโตเด่น: ${D.CUSTOMERS.slice().sort((a,b)=>b.mom-a.mom)[0].name.split(' ')[0]}`, metric: fmt.pct(D.CUSTOMERS.slice().sort((a,b)=>b.mom-a.mom)[0].mom), detail: 'ปริมาณสั่งซื้อเดือนล่าสุดเพิ่มขึ้นเด่นชัด', time: 'เดือนนี้' },
    { tone: 'info', icon: 'activity', title: 'ราคาขายเฉลี่ยปรับขึ้นต่อเนื่อง', metric: fmt.pct(((D.price69[NACT-1]/D.price69[0])-1)*100), detail: `เฉลี่ย 5 เดือน ${D.totals.avgPrice} ฿/Kg — สะท้อนการปรับ mix ไปสินค้ามูลค่าสูง`, time: '5 เดือน' },
  ];

  function KpiRow({ onDrill }) {
    return (
      <Grid min={150} gap={12} style={{ marginBottom: 18 }}>
        {D.KPIS.map((k) => (
          <KpiCard key={k.id} label={k.label} value={k.value} unit={k.unit}
            delta={k.delta} deltaSuffix=" MoM" secondary={k.yoy ? { label: 'YoY', value: k.yoy } : null}
            accent={k.accent} spark={<Sparkline data={k.spark} color={k.color} width={70} height={26} />}
            icon={<Icon name={k.id==='value'?'dollar-sign':k.id==='volume'?'box':k.id==='price'?'tag':k.id==='customers'?'users':k.id==='products'?'package':'file-text'} size={15} />}
            onClick={() => onDrill(KPI_DRILL[k.id])} />
        ))}
      </Grid>
    );
  }

  function OverviewScreen({ onDrill }) {
    const labels = D.MONTHS_ACT;
    const val69 = D.valueByYear[2569].slice(0, NACT);
    const val68 = D.valueByYear[2568].slice(0, NACT);
    const vol69 = D.volumeByYear[2569].slice(0, NACT);
    const prodByVal = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const custByKg = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);

    return (
      <div>
        <KpiRow onDrill={onDrill} />

        <Grid cols={3} gap={16} style={{ marginBottom: 16 }}>
          <div style={{ gridColumn: 'span 2' }}>
            <Card title="ยอดขายรวมต่อเดือน" subtitle="มูลค่า (ลบ.) เทียบปริมาณ (พัน Kg) · ม.ค.–พ.ค. 2569"
              actions={<button onClick={() => onDrill('sales')} style={{ display:'inline-flex',alignItems:'center',gap:4,background:'none',border:'1px solid var(--border-default)',borderRadius:'var(--radius-md)',color:'var(--text-secondary)',padding:'5px 10px',fontSize:'var(--text-xs)',fontFamily:'var(--font-sans)',cursor:'pointer'}}>ดูเต็ม <Icon name="chevron-right" size={13} /></button>}>
              <LineChart height={250} labels={labels} yFormat={(v) => fmt.int(v)}
                series={[
                  { name: 'มูลค่า 2569 (ลบ.)', data: val69, color: 'var(--viz-1)', type: 'bar' },
                  { name: 'ปริมาณ 2569 (พัน Kg)', data: vol69, color: 'var(--viz-2)', type: 'line', axis: 'right' },
                  { name: 'มูลค่า 2568 (ลบ.)', data: val68, color: 'var(--slate-400)', type: 'line' },
                ]} />
            </Card>
          </div>

          <Card title="AI Insight Engine" subtitle="สรุปอัตโนมัติจากข้อมูลจริง"
            actions={<Badge tone="accent" variant="soft" dot>Live</Badge>} bodyStyle={{ padding: 'var(--space-3)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {INSIGHTS.map((it, i) => (
                <InsightCard key={i} tone={it.tone} icon={<Icon name={it.icon} size={15} />}
                  title={it.title} metric={it.metric} detail={it.detail} time={it.time} onClick={() => {}} />
              ))}
            </div>
          </Card>
        </Grid>

        <Grid cols={3} gap={16}>
          <Card title="Top สินค้า" subtitle="ตามมูลค่าขาย (ลบ.)" actions={<DrillHint />} bodyStyle={{ padding: 'var(--space-2)' }}>
            {prodByVal.slice(0, 5).map((p, i) => (
              <RankBar key={p.id} rank={i + 1} label={p.name} sublabel={p.group}
                value={fmt.dec1(p.val) + ' ลบ.'} ratio={p.val / prodByVal[0].val} share={p.share + '%'} delta={prodGrowth(p)}
                color="var(--viz-1)" onClick={() => onDrill('product')} />
            ))}
          </Card>

          <Card title="Top ลูกค้า" subtitle="ตามปริมาณขาย (Kg)" actions={<DrillHint />} bodyStyle={{ padding: 'var(--space-2)' }}>
            {custByKg.slice(0, 5).map((c, i) => (
              <RankBar key={c.id} rank={i + 1} label={c.name} sublabel={fmt.int(c.kg) + ' Kg'}
                value={c.share + '%'} ratio={c.kg / custByKg[0].kg} delta={c.mom}
                color="var(--viz-4)" onClick={() => onDrill('customer')} />
            ))}
          </Card>

          <Card title="Product Mix" subtitle="สัดส่วนมูลค่าตามกลุ่มสินค้า" actions={<button onClick={() => onDrill('mix')} style={{background:'none',border:'none',color:'var(--text-tertiary)',cursor:'pointer'}}><Icon name="external-link" size={14} /></button>}>
            <DonutChart size={140} thickness={20} centerValue={fmt.m(D.totals.value / 1e6)} centerLabel="รวม (ลบ.)" showLegend
              data={groupAgg().map((g) => ({ label: g.group, value: g.val, color: groupColors[g.group] || 'var(--slate-500)' }))} />
          </Card>
        </Grid>
      </div>
    );
  }

  function groupAgg() {
    const map = {};
    D.PRODUCTS.forEach((p) => { map[p.group] = (map[p.group] || 0) + p.val; });
    return Object.entries(map).map(([group, val]) => ({ group, val })).sort((a, b) => b.val - a.val);
  }

  function SalesScreen() {
    const [gran, setGran] = React.useState('month');
    const [type, setType] = React.useState('combo');
    const labels = gran === 'year' ? D.YEARS.map(String) : D.MONTHS_ACT;

    let series;
    if (gran === 'year') {
      // 5-month comparable totals per year
      const v = D.YEARS.map((y) => D.sum(D.valueByYear[y].slice(0, NACT)));
      series = [{ name: 'มูลค่า 5 เดือน (ลบ.)', data: v, color: 'var(--viz-1)', type: 'bar' }];
    } else if (type === 'combo') {
      series = [
        { name: 'มูลค่า (ลบ.)', data: D.valueByYear[2569].slice(0, NACT), color: 'var(--viz-1)', type: 'bar' },
        { name: 'ปริมาณ (พัน Kg)', data: D.volumeByYear[2569].slice(0, NACT), color: 'var(--viz-2)', type: 'line', axis: 'right' },
      ];
    } else {
      series = D.YEARS.map((y, i) => ({
        name: 'มูลค่า ' + y + ' (ลบ.)', data: D.valueByYear[y].slice(0, NACT),
        color: i === D.YEARS.length - 1 ? 'var(--viz-1)' : 'var(--slate-400)',
        type: type === 'area' && i === D.YEARS.length - 1 ? 'area' : 'line',
      }));
    }

    return (
      <div>
        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label="มูลค่าขาย 5 เดือน" value={fmt.dec1(D.totals.value / 1e6)} unit="ลบ." delta={D.totals.yoyVal} deltaSuffix=" YoY" accent />
          <KpiCard label="ปริมาณขาย 5 เดือน" value={fmt.kgM(D.totals.volume)} unit="" delta={D.totals.yoyKg} deltaSuffix=" YoY" />
          <KpiCard label="เฉลี่ย/เดือน" value={fmt.dec1(D.totals.value / 1e6 / NACT)} unit="ลบ." delta={D.totals.momVal} />
          <KpiCard label="เดือนสูงสุด" value="พ.ค." unit={fmt.dec1(Math.max(...D.valueByYear[2569].slice(0, NACT))) + ' ลบ.'} delta={D.totals.momVal} />
        </Grid>

        <Card title="ยอดขายรวม — เปรียบเทียบ 2568 vs 2569" subtitle="ม.ค.–พ.ค. (5 เดือนที่มีข้อมูลจริง)"
          actions={
            <div style={{ display: 'flex', gap: 8 }}>
              <SegmentedControl size="sm" value={type} onChange={setType} options={[{value:'multi',label:'Multi-Line'},{value:'combo',label:'Combo'},{value:'area',label:'Area'}]} />
              <SegmentedControl size="sm" value={gran} onChange={setGran} options={[{value:'month',label:'รายเดือน'},{value:'year',label:'รายปี'}]} />
            </div>
          }>
          <LineChart height={340} labels={labels} yFormat={(v) => fmt.int(v)} showDots={gran !== 'month'} series={series} />
        </Card>

        <Card title="ตารางยอดขายรายเดือน" subtitle="มูลค่า · ปริมาณ · ราคาเฉลี่ย" style={{ marginTop: 16 }} padding="none">
          <MonthTable />
        </Card>
      </div>
    );
  }

  function MonthTable() {
    const { DataTable } = NS;
    const rows = D.MONTHS_ACT.map((m, i) => ({
      month: m,
      v69: D.valueByYear[2569][i], v68: D.valueByYear[2568][i],
      kg69: D.volumeByYear[2569][i], price: D.price69[i],
      yoy: +((D.valueByYear[2569][i] / D.valueByYear[2568][i] - 1) * 100).toFixed(1),
    }));
    return (
      <DataTable rows={rows} sortable={false} rowKey={(r) => r.month}
        columns={[
          { key: 'month', header: 'เดือน', render: (r) => <span style={{ fontWeight: 500 }}>{r.month}</span> },
          { key: 'v68', header: 'มูลค่า 2568 (ลบ.)', numeric: true, render: (r) => fmt.dec1(r.v68) },
          { key: 'v69', header: 'มูลค่า 2569 (ลบ.)', numeric: true, render: (r) => fmt.dec1(r.v69) },
          { key: 'kg69', header: 'ปริมาณ (พัน Kg)', numeric: true, render: (r) => fmt.int(r.kg69) },
          { key: 'price', header: 'ราคาเฉลี่ย (฿/Kg)', numeric: true, render: (r) => fmt.dec1(r.price) },
          { key: 'yoy', header: '% YoY', numeric: true, render: (r) => <DeltaBadge value={r.yoy} size="sm" /> },
        ]} />
    );
  }

  window.OverviewScreen = OverviewScreen;
  window.SalesScreen = SalesScreen;
})();
