/* Screens: Customer Analysis (+detail), Customer Contribution → window.{CustomerScreen, ContributionScreen}
   Customers carry Kg (real), share, MoM, monthly[5]. No per-customer value in source. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { Card, KpiCard, DeltaBadge, RankBar, DataTable, LineChart, DonutChart, ParetoChart, SegmentedControl, Badge, Button, InsightCard } = NS;
  const Icon = window.Icon;
  const { fmt } = window.VUtil;
  const { Grid } = window;
  const viewFor = window.viewFor || function(f){ return window.VDATA; };
  const D = window.VDATA;
  const NACT = D.NACT;

  function CustomerScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const [sel, setSel] = React.useState(null);
    const [mon, setMon] = React.useState(NACT - 1); // selected month index for monthly ranking
    const sorted = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    const max = sorted[0].kg;
    const fastest = [...D.CUSTOMERS].sort((a, b) => b.mom - a.mom)[0];

    // Top 10 ranked by the selected month's volume (Kg)
    const byMonth = [...D.CUSTOMERS].sort((a, b) => (b.monthly[mon] || 0) - (a.monthly[mon] || 0)).slice(0, 10);
    const maxMon = byMonth[0] ? (byMonth[0].monthly[mon] || 1) : 1;
    const monTotal = D.CUSTOMERS.reduce((s, c) => s + (c.monthly[mon] || 0), 0);

    if (sel) return <CustomerDetail customer={sel} onBack={() => setSel(null)} />;

    return (
      <div>
        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label="จำนวนลูกค้า" value={String(D.nCustomers)} unit="ราย" icon={<Icon name="users" size={15} />} />
          <KpiCard label="ปริมาณเฉลี่ย/ราย" value={fmt.int(D.custTotalKg / D.nCustomers)} unit="Kg" icon={<Icon name="box" size={15} />} />
          <KpiCard label="Top 10 = สัดส่วน" value={(sorted.slice(0,10).reduce((s,c)=>s+c.kg,0)/D.custTotalKg*100).toFixed(0)} unit="%" delta={-1.2} />
          <KpiCard label="ลูกค้าโตเร็วสุด" value={fastest.name.split(' ')[0]} unit={fmt.pct(fastest.mom)} delta={fastest.mom} icon={<Icon name="trending-up" size={15} />} />
        </Grid>

        <Grid cols={2} gap={16} style={{ marginBottom: 16 }}>
          <Card title="Top 10 ลูกค้า — ปริมาณขาย (Kg)" actions={<Badge tone="neutral" size="sm">5 เดือน</Badge>} bodyStyle={{ padding: 'var(--space-2)' }}>
            {sorted.slice(0, 10).map((c, i) => (
              <RankBar key={c.id} rank={i + 1} label={c.name} sublabel={c.share + '% ของยอดรวม'}
                value={fmt.int(c.kg) + ' Kg'} ratio={c.kg / max} share={null} delta={c.mom}
                color="var(--viz-4)" onClick={() => setSel(c)} />
            ))}
          </Card>
          <Card title="สัดส่วนปริมาณ — Top 10 vs อื่น ๆ">
            <DonutChart size={180} thickness={26} centerValue={Math.round(D.custTotalKg).toLocaleString('en-US')} centerLabel="Kg รวม"
              data={[
                ...sorted.slice(0, 6).map((c, i) => ({ label: c.name.split(' ')[0], value: c.kg, color: `var(--viz-${i + 1})` })),
                { label: 'ลูกค้าอื่น', value: D.custTotalKg - sorted.slice(0, 6).reduce((s, c) => s + c.kg, 0), color: 'var(--slate-500)' },
              ]} />
          </Card>
        </Grid>

        <Card title="Top 10 ลูกค้า — จัดอันดับรายเดือน" subtitle={`ปริมาณ (Kg) เฉพาะเดือน ${D.MONTHS_ACT[mon]} · อันดับเปลี่ยนตามเดือน`}
          actions={<SegmentedControl size="sm" value={String(mon)} onChange={(v) => setMon(+v)}
            options={D.MONTHS_ACT.map((m, i) => ({ value: String(i), label: m }))} />}
          bodyStyle={{ padding: 'var(--space-2)' }} style={{ marginBottom: 16 }}>
          {byMonth.map((c, i) => (
            <RankBar key={c.id} rank={i + 1} label={c.name}
              sublabel={monTotal ? ((c.monthly[mon] || 0) / monTotal * 100).toFixed(1) + '% ของเดือน' : '—'}
              value={fmt.int(c.monthly[mon] || 0) + ' Kg'} ratio={(c.monthly[mon] || 0) / maxMon}
              delta={mon > 0 && c.monthly[mon - 1] ? +(((c.monthly[mon] || 0) / c.monthly[mon - 1] - 1) * 100).toFixed(1) : null}
              color="var(--viz-5)" onClick={() => setSel(c)} />
          ))}
        </Card>

        <Card title="ลูกค้า Top 10" subtitle="คลิกแถวเพื่อดูรายละเอียด" padding="none">
          <DataTable rows={sorted.slice(0, 10)} onRowClick={setSel} rowKey={(r) => r.id}
            columns={[
              { key: '_r', header: '#', width: 48, numeric: true, sortable: false, render: (r) => sorted.indexOf(r) + 1 },
              { key: 'name', header: 'ลูกค้า', render: (r) => <span style={{ fontWeight: 500 }}>{r.name}</span> },
              { key: 'kg', header: 'ปริมาณ (Kg)', numeric: true, render: (r) => fmt.int(r.kg) },
              { key: 'share', header: 'สัดส่วน', numeric: true, render: (r) => r.share + '%' },
              { key: 'm5', header: 'พ.ค. (Kg)', numeric: true, sortable: false, render: (r) => fmt.int(r.monthly[NACT - 1]) },
              { key: 'mom', header: '% Growth (MoM)', numeric: true, render: (r) => <DeltaBadge value={r.mom} size="sm" /> },
            ]} />
        </Card>
      </div>
    );
  }

  function CustomerDetail({ customer: c, onBack }) {
    const rank = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg).indexOf(c) + 1;
    const avgPrice = D.totals.avgPrice;
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <Button variant="ghost" size="sm" iconLeft={<Icon name="chevron-left" size={15} />} onClick={onBack}>กลับ</Button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,var(--viz-4),var(--accent))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{c.name[0]}</span>
            <div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>อันดับ #{rank} · {c.share}% ของปริมาณรวม</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <DeltaBadge value={c.mom} size="lg" suffix=" MoM" />
        </div>

        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label="ปริมาณขายรวม" value={fmt.int(c.kg)} unit="Kg" delta={c.mom} accent />
          <KpiCard label="มูลค่าโดยประมาณ" value={fmt.dec1(c.kg * avgPrice / 1e6)} unit="ลบ." delta={c.mom + 2} />
          <KpiCard label="สัดส่วนรายได้" value={c.share} unit="%" />
          <KpiCard label="เฉลี่ย/เดือน" value={fmt.int(c.kg / NACT)} unit="Kg" delta={c.mom} />
        </Grid>

        <Grid cols={3} gap={16}>
          <div style={{ gridColumn: 'span 2' }}>
            <Card title="แนวโน้มการซื้อรายเดือน · 2569" subtitle="ปริมาณ (Kg) · ม.ค.–พ.ค.">
              <LineChart height={240} labels={D.MONTHS_ACT} yFormat={(v) => fmt.int(v)} showDots
                series={[{ name: c.name, data: c.monthly, color: 'var(--viz-4)', type: 'area' }]} />
            </Card>
          </div>
          <Card title="สรุปพฤติกรรม" bodyStyle={{ padding: 'var(--space-3)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <InsightCard tone={c.mom >= 0 ? 'positive' : 'negative'} icon={<Icon name={c.mom >= 0 ? 'trending-up' : 'trending-down'} size={15} />}
                title="แนวโน้มล่าสุด" metric={fmt.pct(c.mom)} detail={`ปริมาณเดือน พ.ค. ${c.mom >= 0 ? 'เพิ่มขึ้น' : 'ลดลง'}เทียบ เม.ย.`} />
              <InsightCard tone="info" icon={<Icon name="box" size={15} />} title="ปริมาณสูงสุด"
                metric={fmt.int(Math.max(...c.monthly)) + ' Kg'} detail={'เดือน ' + D.MONTHS_ACT[c.monthly.indexOf(Math.max(...c.monthly))]} />
              <InsightCard tone={rank <= 3 ? 'warning' : 'info'} icon={<Icon name="users" size={15} />} title={'อันดับลูกค้า #' + rank}
                detail={rank <= 3 ? 'ลูกค้ารายใหญ่ — มีผลต่อความเสี่ยงกระจุกตัว' : 'ลูกค้ากลุ่มกลาง'} />
            </div>
          </Card>
        </Grid>
      </div>
    );
  }

  // ---------- Customer Contribution (Pareto) ----------
  function ContributionScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const [scope, setScope] = React.useState('top10');
    const all = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    const allReal = [...D.allCustomers].sort((a, b) => b.kg - a.kg);
    const dataset = scope === 'top10' ? all.slice(0, 10) : scope === 'top20' ? allReal.slice(0, 20) : allReal;
    const paretoData = dataset.map((c) => ({ label: (c.name || '').length > 14 ? c.name.slice(0, 12) + '…' : c.name, value: Math.round(c.kg / 1000) }));

    const total = D.custTotalKg;
    // customers to reach 80%
    let cum = 0, n80 = 0;
    for (const c of allReal) { cum += c.kg; n80++; if (cum / total >= 0.8) break; }

    return (
      <div>
        <Grid min={200} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label="Top 3 = สัดส่วนปริมาณ" value={D.totals.top3} unit="%" accent icon={<Icon name="alert-triangle" size={15} />} />
          <KpiCard label="Top 5 = สัดส่วนปริมาณ" value={D.totals.top5} unit="%" icon={<Icon name="users" size={15} />} />
          <KpiCard label="ลูกค้าที่ทำ 80%" value={String(n80)} unit={'จาก ' + D.nCustomers + ' ราย'} icon={<Icon name="target" size={15} />} />
        </Grid>

        <Card title="Customer Contribution — Pareto Analysis" subtitle="ปริมาณขาย (พัน Kg) + % สะสม · เส้นเกณฑ์ 80%"
          actions={<SegmentedControl size="sm" value={scope} onChange={setScope} options={[{value:'top10',label:'Top 10'},{value:'top20',label:'Top 20'},{value:'all',label:'ทั้งหมด'}]} />}>
          <ParetoChart height={320} threshold={80} valueFormat={(v) => fmt.int(v) + ' พัน Kg'} data={paretoData} />
        </Card>

        <Grid cols={2} gap={16} style={{ marginTop: 16 }}>
          <Card title="การวิเคราะห์ความเสี่ยง" bodyStyle={{ padding: 'var(--space-3)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <InsightCard tone="warning" icon={<Icon name="alert-triangle" size={15} />} title="กระจุกตัวสูงมาก" metric={D.totals.top3 + '%'} detail={`Top 3 ลูกค้าสร้างยอดเกินครึ่ง — สูงกว่าเป้าหมาย 40% มาก ควรเร่งกระจายฐานลูกค้า`} />
              {(() => { const drop = [...D.CUSTOMERS].sort((a, b) => a.mom - b.mom)[0]; return (
                <InsightCard tone="negative" icon={<Icon name="trending-down" size={15} />} title={`ลูกค้าเสี่ยง: ${drop.name.split(' ')[0]}`} metric={fmt.pct(drop.mom)} detail="ปริมาณเดือนล่าสุดลดลง — แนะนำเข้าพบ/ติดตาม" />
              ); })()}
              <InsightCard tone="info" icon={<Icon name="users" size={15} />} title="ฐานลูกค้ารวม" metric={D.nCustomers + ' ราย'} detail={`มีเพียง ${n80} รายที่สร้างยอด 80% — ที่เหลือเป็น long tail`} />
            </div>
          </Card>
          <Card title="สัดส่วนปริมาณสะสม" subtitle="Top 10" padding="none">
            <DataTable rows={all.slice(0, 10)} rowKey={(r) => r.id} sortable={false}
              columns={(() => { let c = 0; return [
                { key: '_r', header: '#', width: 44, numeric: true, render: (r) => all.indexOf(r) + 1 },
                { key: 'name', header: 'ลูกค้า', render: (r) => <span style={{ fontWeight: 500 }}>{r.name}</span> },
                { key: 'kg', header: 'ปริมาณ (Kg)', numeric: true, render: (r) => fmt.int(r.kg) },
                { key: 'share', header: 'สัดส่วน', numeric: true, render: (r) => r.share + '%' },
                { key: 'cum', header: 'สะสม', numeric: true, render: (r) => { c += r.kg; const pct = c / total * 100; return <span style={{ color: pct <= 80 ? 'var(--negative)' : 'var(--text-tertiary)' }}>{pct.toFixed(1)}%</span>; } },
              ]; })()} />
          </Card>
        </Grid>
      </div>
    );
  }

  window.CustomerScreen = CustomerScreen;
  window.ContributionScreen = ContributionScreen;
})();
