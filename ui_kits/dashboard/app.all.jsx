/* BWP Vantage — concatenated app (generated). One-time load guard absorbs duplicate execution. */
if (!window.__BWP_APP_LOADED) {
  window.__BWP_APP_LOADED = true;

/* ===== Common.jsx ===== */
/* Shared helpers for dashboard screens → window.VUtil + small presentational components */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { Card, Badge } = NS;
  const Icon = window.Icon;

  const fmt = {
    int: (n) => Math.round(n).toLocaleString('en-US'),
    dec1: (n) => (Math.round(n * 10) / 10).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    money: (n) => (Math.round(n * 10) / 10).toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' ลบ.',
    m: (n) => (Math.round(n * 10) / 10).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'M',
    kg: (n) => Math.round(n).toLocaleString('en-US') + ' Kg',
    kgK: (n) => Math.round(n).toLocaleString('en-US') + ' Kg',
    kgM: (n) => Math.round(n).toLocaleString('en-US') + ' Kg',
    pct: (n) => (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(1) + '%',
  };

  // quarter aggregation of a 12-month series
  const toQuarters = (arr) => [0, 1, 2, 3].map((q) => arr.slice(q * 3, q * 3 + 3).reduce((s, x) => s + x, 0));
  const QLABELS = ['Q1', 'Q2', 'Q3', 'Q4'];

  // Section title row
  function SectionTitle({ icon, children, hint }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        {icon && <span style={{ color: 'var(--text-tertiary)' }}><Icon name={icon} size={16} /></span>}
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>{children}</h2>
        {hint && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>{hint}</span>}
      </div>
    );
  }

  // Small "drill" affordance shown on hoverable cards
  function DrillHint({ label = 'คลิกเพื่อ Drill Down' }) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-2xs)', color: 'var(--text-disabled)' }}>
        <Icon name="maximize" size={11} /> {label}
      </span>
    );
  }

  // grid helper
  function Grid({ cols = 2, min = null, gap = 16, children, style = {} }) {
    const tpl = min ? `repeat(auto-fit, minmax(${min}px, 1fr))` : `repeat(${cols}, minmax(0,1fr))`;
    return <div style={{ display: 'grid', gridTemplateColumns: tpl, gap, ...style }}>{children}</div>;
  }

  window.VUtil = { fmt, toQuarters, QLABELS };
  window.SectionTitle = SectionTitle;
  window.DrillHint = DrillHint;
  window.Grid = Grid;
})();


/* ===== Shell.jsx ===== */
/* Vantage app shell: Sidebar, TopBar, FilterBar, Layout. → window.{Sidebar,TopBar,FilterBar,AppShell} */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { IconButton, Button, Select, Badge, SegmentedControl } = NS;
  const Icon = window.Icon;

  const NAV = [
    { id: 'overview', label: 'ภาพรวมผู้บริหาร', icon: 'layout-dashboard' },
    { id: 'sales', label: 'Sales Overview', icon: 'line-chart' },
    { id: 'product', label: 'Product Analysis', icon: 'package' },
    { id: 'customer', label: 'Customer Analysis', icon: 'users' },
    { id: 'contribution', label: 'Customer Contribution', icon: 'bar-chart-2' },
    { id: 'mix', label: 'Product Mix', icon: 'pie-chart' },
    { id: 'price', label: 'Price Analysis', icon: 'dollar-sign' },
    { id: 'year', label: 'Year Comparison', icon: 'calendar' },
    { id: 'forecast', label: 'Forecast', icon: 'sparkles' },
  ];
  window.VANTAGE_NAV = NAV;

  function Logo({ collapsed }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, height: 'var(--topbar-h)', padding: collapsed ? '0' : '0 18px', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <svg width="30" height="30" viewBox="0 0 48 48" fill="none" style={{ flex: '0 0 auto' }}>
          <rect width="48" height="48" rx="11" fill="#1f6feb"/>
          <path d="M12 31.5L20 22.5L26.5 29L36 16.5" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="36" cy="16.5" r="3" fill="white"/>
          <path d="M12 36.5H36" stroke="white" strokeOpacity="0.45" strokeWidth="2.4" strokeLinecap="round"/>
        </svg>
        {!collapsed && (
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>BWP <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>Vantage</span></div>
            <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Best World Interplas</div>
          </div>
        )}
      </div>
    );
  }

  function Sidebar({ active, onNav, collapsed, onToggle }) {
    const [hovered, setHovered] = React.useState(null);
    return (
      <aside style={{
        position: 'sticky', top: 0, height: '100vh', flex: `0 0 ${collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)'}`,
        width: collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)',
        background: 'var(--bg-base)', borderRight: '1px solid var(--border-subtle)',
        display: 'flex', flexDirection: 'column', transition: 'width var(--dur-base) var(--ease-standard)', zIndex: 20,
      }}>
        <Logo collapsed={collapsed} />
        <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map((n) => {
            const on = n.id === active;
            const hot = !on && hovered === n.id;
            return (
              <button key={n.id} onClick={() => onNav(n.id)} title={collapsed ? n.label : undefined}
                onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 11, width: '100%',
                  padding: collapsed ? '10px 0' : '9px 11px', justifyContent: collapsed ? 'center' : 'flex-start',
                  border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left',
                  background: on ? 'var(--accent-subtle)' : hot ? 'var(--surface-2)' : 'transparent',
                  color: on ? 'var(--accent-hover)' : hot ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: on ? 600 : 500,
                  transition: 'color var(--dur-fast)', position: 'relative',
                }}>
                {on && !collapsed && <span style={{ position: 'absolute', left: -10, top: 8, bottom: 8, width: 3, borderRadius: 3, background: 'var(--accent)' }} />}
                <Icon name={n.icon} size={17} />
                {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.label}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: 10, borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onToggle} title="ย่อ/ขยายเมนู"
            style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', padding: collapsed ? '9px 0' : '9px 11px', justifyContent: collapsed ? 'center' : 'flex-start', border: 'none', background: 'transparent', color: 'var(--text-tertiary)', cursor: 'pointer', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)' }}>
            <Icon name="chevrons-left" size={17} style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }} />
            {!collapsed && <span>ย่อเมนู</span>}
          </button>
        </div>
      </aside>
    );
  }

  function TopBar({ title, subtitle, theme, onTheme, breadcrumb, onBack }) {
    return (
      <header style={{
        position: 'sticky', top: 0, zIndex: 15, height: 'var(--topbar-h)', flex: '0 0 auto',
        display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px',
        background: 'color-mix(in srgb, var(--bg-app) 88%, transparent)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          {breadcrumb && (
            <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-sans)', marginBottom: 1, padding: 0 }}>
              <Icon name="chevron-left" size={13} /> {breadcrumb}
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{title}</h1>
            {subtitle && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{subtitle}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 10, color: 'var(--text-tertiary)', pointerEvents: 'none' }}><Icon name="search" size={15} /></span>
            <input placeholder="ค้นหาสินค้า ลูกค้า..." style={{
              height: 36, width: 200, padding: '0 12px 0 32px', background: 'var(--surface-1)',
              border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', outline: 'none',
            }} onFocus={(e)=>e.target.style.borderColor='var(--border-accent)'} onBlur={(e)=>e.target.style.borderColor='var(--border-default)'} />
          </div>
          <Button variant="secondary" size="md" iconLeft={<Icon name="download" size={15} />}>ส่งออก</Button>
          <IconButton label="การแจ้งเตือน" variant="ghost"><Icon name="bell" size={17} /></IconButton>
          <IconButton label={theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด'} variant="ghost" onClick={onTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
          </IconButton>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 6, marginLeft: 2, borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--viz-4),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 13 }}>B</div>
          </div>
        </div>
      </header>
    );
  }

  function FilterBar({ filters, setFilters, onExport }) {
    const D = window.VDATA;
    const set = (k) => (v) => setFilters((f) => ({ ...f, [k]: v }));
    return (
      <div style={{
        position: 'sticky', top: 'var(--topbar-h)', zIndex: 12, minHeight: 'var(--filterbar-h)',
        display: 'flex', alignItems: 'center', gap: 10, padding: '9px 22px', flexWrap: 'wrap',
        background: 'var(--bg-base)', borderBottom: '1px solid var(--border-subtle)',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginRight: 2 }}>
          <Icon name="filter" size={14} /> ตัวกรอง
        </span>
        <Select width={110} value={filters.year} onChange={set('year')} options={D.YEARS.map(String)} />
        <Select width={120} value={filters.month} onChange={set('month')} options={[{value:'all',label:'ทุกเดือน'}, ...D.MONTHS_ACT.map((m,i)=>({value:String(i),label:m}))]} />
        <Select width={170} value={filters.customerGroup} onChange={set('customerGroup')} options={[{value:'all',label:'ลูกค้าทั้งหมด'}, ...D.CUSTOMERS.slice(0,6).map(c=>({value:c.id,label:c.name.length>16?c.name.slice(0,16)+'…':c.name}))]} />
        <Select width={160} value={filters.productGroup} onChange={set('productGroup')} options={[{value:'all',label:'ทุกกลุ่มสินค้า'},'ฟิล์มใส','พิมพ์สี','PCR (รีไซเคิล)','สูตรพิเศษ']} />
        <div style={{ flex: 1 }} />
        <Badge tone="accent" variant="soft" dot>ปี {filters.year} · 5 เดือน (ม.ค.–พ.ค.)</Badge>
        <SegmentedControl size="sm" value={filters.granularity} onChange={set('granularity')}
          options={[{value:'month',label:'รายเดือน'},{value:'year',label:'รายปี'}]} />
      </div>
    );
  }

  window.Sidebar = Sidebar;
  window.TopBar = TopBar;
  window.FilterBar = FilterBar;
})();


/* ===== ScreensA.jsx ===== */
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


/* ===== ScreensB.jsx ===== */
/* Screens: Product Analysis (+detail), Product Mix, Price Analysis → window.{ProductScreen, MixScreen, PriceScreen} */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { Card, KpiCard, DeltaBadge, RankBar, DataTable, LineChart, DonutChart, SegmentedControl, Badge, Button } = NS;
  const Icon = window.Icon;
  const { fmt } = window.VUtil;
  const { Grid } = window;
  const D = window.VDATA;
  const NACT = D.NACT;
  const groupColors = { 'ฟิล์มใส': 'var(--viz-1)', 'พิมพ์สี': 'var(--viz-3)', 'PCR (รีไซเคิล)': 'var(--viz-2)', 'สูตรพิเศษ': 'var(--viz-4)' };
  const prodGrowth = (p) => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(1) : 0;

  function groupAgg() {
    const map = {};
    D.PRODUCTS.forEach((p) => { map[p.group] = (map[p.group] || 0) + p.val; });
    return Object.entries(map).map(([group, val]) => ({ group, val })).sort((a, b) => b.val - a.val);
  }

  // ---------- Product Analysis ----------
  function ProductScreen() {
    const [metric, setMetric] = React.useState('val'); // val | kg
    const [sel, setSel] = React.useState(null);
    const sorted = [...D.PRODUCTS].sort((a, b) => b[metric] - a[metric]);
    const max = sorted[0][metric];
    const topG = groupAgg()[0];

    if (sel) return <ProductDetail product={sel} onBack={() => setSel(null)} />;

    return (
      <div>
        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label="จำนวนสินค้า (ขนาด)" value={String(D.nSizes)} unit="SKU" icon={<Icon name="package" size={15} />} />
          <KpiCard label="มูลค่าขายรวม" value={fmt.dec1(D.totals.value / 1e6)} unit="ลบ." delta={D.totals.momVal} />
          <KpiCard label="ราคาเฉลี่ย" value={D.totals.avgPrice} unit="฿/Kg" delta={3.6} />
          <KpiCard label="กลุ่มขายดีสุด" value={topG.group} unit={fmt.dec1(topG.val) + ' ลบ.'} icon={<Icon name="layers" size={15} />} />
        </Grid>

        <Grid cols={2} gap={16} style={{ marginBottom: 16 }}>
          <Card title={`Top 10 สินค้า — ${metric === 'val' ? 'มูลค่าขาย' : 'ปริมาณขาย'}`}
            actions={<SegmentedControl size="sm" value={metric} onChange={setMetric} options={[{value:'val',label:'มูลค่า'},{value:'kg',label:'ปริมาณ'}]} />}
            bodyStyle={{ padding: 'var(--space-2)' }}>
            {sorted.slice(0, 10).map((p, i) => (
              <RankBar key={p.id} rank={i + 1} label={p.name} sublabel={p.group}
                value={metric === 'val' ? fmt.dec1(p.val) + ' ลบ.' : fmt.int(p.kg) + ' Kg'}
                ratio={p[metric] / max} share={p.share + '%'} delta={prodGrowth(p)}
                color={groupColors[p.group] || 'var(--viz-1)'} onClick={() => setSel(p)} />
            ))}
          </Card>

          <Card title="สัดส่วนมูลค่าขายตามกลุ่มสินค้า">
            <DonutChart size={180} thickness={26} centerValue={fmt.m(D.totals.value / 1e6)} centerLabel="รวม (ลบ.)"
              data={groupAgg().map((g) => ({ label: g.group, value: g.val, color: groupColors[g.group] || 'var(--slate-500)' }))} />
          </Card>
        </Grid>

        <Card title="สินค้าทั้งหมด (Top 12 ตามมูลค่า)" subtitle="คลิกแถวเพื่อ Drill Down" padding="none">
          <DataTable rows={sorted} onRowClick={setSel} rowKey={(r) => r.id}
            columns={[
              { key: '_r', header: '#', width: 48, numeric: true, sortable: false, render: (r) => sorted.indexOf(r) + 1 },
              { key: 'name', header: 'สินค้า (ขนาด)', render: (r) => <span style={{ fontWeight: 500 }}>{r.name}</span> },
              { key: 'group', header: 'กลุ่ม', muted: true, render: (r) => <Badge tone="neutral" size="sm">{r.group}</Badge> },
              { key: 'kg', header: 'ปริมาณ (Kg)', numeric: true, render: (r) => fmt.int(r.kg) },
              { key: 'val', header: 'มูลค่า (ลบ.)', numeric: true, render: (r) => fmt.dec1(r.val) },
              { key: 'avgPrice', header: 'ราคาเฉลี่ย (฿/Kg)', numeric: true, render: (r) => fmt.dec1(r.avgPrice) },
              { key: 'share', header: 'สัดส่วน', numeric: true, render: (r) => r.share + '%' },
              { key: 'g', header: 'MoM', numeric: true, sortable: false, render: (r) => <DeltaBadge value={prodGrowth(r)} size="sm" /> },
            ]} />
        </Card>
      </div>
    );
  }

  function ProductDetail({ product: p, onBack }) {
    const topCustForProduct = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg).slice(0, 5);
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <Button variant="ghost" size="sm" iconLeft={<Icon name="chevron-left" size={15} />} onClick={onBack}>กลับ</Button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'var(--accent-subtle)', color: 'var(--accent-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="package" size={19} /></span>
            <div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>กลุ่ม {p.group} · อันดับ #{[...D.PRODUCTS].sort((a,b)=>b.val-a.val).indexOf(p) + 1}</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <DeltaBadge value={prodGrowth(p)} size="lg" suffix=" MoM" />
        </div>

        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label="มูลค่าขาย 5 เดือน" value={fmt.dec1(p.val)} unit="ลบ." delta={prodGrowth(p)} accent />
          <KpiCard label="ปริมาณขาย" value={fmt.int(p.kg)} unit="Kg" delta={prodGrowth(p) - 2} />
          <KpiCard label="ราคาเฉลี่ย" value={fmt.dec1(p.avgPrice)} unit="฿/Kg" delta={3.1} />
          <KpiCard label="สัดส่วนพอร์ต" value={p.share} unit="%" />
        </Grid>

        <Grid cols={2} gap={16} style={{ marginBottom: 16 }}>
          <Card title="แนวโน้มมูลค่ารายเดือน · 2569" subtitle="มูลค่า (ลบ.) · ม.ค.–พ.ค.">
            <LineChart height={220} labels={D.MONTHS_ACT} yFormat={(v) => fmt.dec1(v)}
              series={[{ name: p.name, data: p.monthly, color: 'var(--viz-1)', type: 'area' }]} />
          </Card>
          <Card title="ราคาเฉลี่ยรายเดือน" subtitle="฿/Kg">
            <LineChart height={220} labels={D.MONTHS_ACT} yFormat={(v) => fmt.int(v)}
              series={[{ name: 'ราคา', data: p.priceMonthly, color: 'var(--viz-3)', type: 'line' }]} />
          </Card>
        </Grid>

        <Card title="ลูกค้าที่ซื้อสินค้านี้มากที่สุด" subtitle="ประมาณการจากสัดส่วนปริมาณรวม" bodyStyle={{ padding: 'var(--space-2)' }}>
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

  function MixScreen() {
    const [view, setView] = React.useState('treemap');
    const sorted = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const segs = sorted.map((p, i) => ({ label: p.name, value: p.val, color: `var(--viz-${(i % 8) + 1})` }));
    const groupSegs = groupAgg().map((g) => ({ label: g.group, value: g.val, color: groupColors[g.group] || 'var(--slate-500)' }));

    return (
      <div>
        <Card title="สัดส่วนยอดขายแต่ละสินค้า (Product Mix)" subtitle="มูลค่าขาย (ลบ.) · 5 เดือน 2569"
          actions={<SegmentedControl size="sm" value={view} onChange={setView} options={[{value:'treemap',label:'Treemap'},{value:'pie',label:'Pie'}]} />}>
          {view === 'treemap'
            ? <Treemap data={segs} height={320} />
            : <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}><DonutChart size={260} thickness={40} centerValue={fmt.m(D.totals.value / 1e6)} centerLabel="รวมทั้งหมด (ลบ.)" data={segs} /></div>}
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
  function PriceScreen() {
    const [gran, setGran] = React.useState('month');
    const data = gran === 'year' ? D.YEARS.map((y) => Math.round(D.sum(D.valueByYear[y].slice(0, NACT)) * 1e6 / (D.sum(D.volumeByYear[y].slice(0, NACT)) * 1000))) : D.price69;
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
          <KpiCard label="ราคาเฉลี่ยต่อสินค้า" value={fmt.dec1(D.totals.value / 1e6 / D.nSizes)} unit="ลบ./SKU" delta={6.9} icon={<Icon name="package" size={15} />} />
          <KpiCard label="ราคาเฉลี่ยต่อลูกค้า" value={fmt.dec1(D.totals.value / 1e6 / D.nCustomers)} unit="ลบ./ราย" delta={5.1} icon={<Icon name="users" size={15} />} />
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


/* ===== ScreensC.jsx ===== */
/* Screens: Customer Analysis (+detail), Customer Contribution → window.{CustomerScreen, ContributionScreen}
   Customers carry Kg (real), share, MoM, monthly[5]. No per-customer value in source. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { Card, KpiCard, DeltaBadge, RankBar, DataTable, LineChart, DonutChart, ParetoChart, SegmentedControl, Badge, Button, InsightCard } = NS;
  const Icon = window.Icon;
  const { fmt } = window.VUtil;
  const { Grid } = window;
  const D = window.VDATA;
  const NACT = D.NACT;

  function CustomerScreen() {
    const [sel, setSel] = React.useState(null);
    const sorted = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    const max = sorted[0].kg;
    const fastest = [...D.CUSTOMERS].sort((a, b) => b.mom - a.mom)[0];

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
          <KpiCard label="มูลค่าโดยประมาณ" value={fmt.dec1(c.kg * avgPrice / 1e6)} unit="ลบ." delta={c.mom} />
          <KpiCard label="สัดส่วนปริมาณ" value={c.share} unit="%" />
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
  function ContributionScreen() {
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


/* ===== ScreensD.jsx ===== */
/* Screens: Year Comparison + Forecast → window.{YearScreen, ForecastScreen}
   2 years: 2568 (12mo actual) vs 2569 (5mo actual). Forecast projects 2569 year-end. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { Card, KpiCard, DeltaBadge, DataTable, LineChart, SegmentedControl, Badge, RankBar } = NS;
  const Icon = window.Icon;
  const { fmt } = window.VUtil;
  const { Grid } = window;
  const D = window.VDATA;
  const NACT = D.NACT;

  function useMeasure() {
    const ref = React.useRef(null);
    const [w, setW] = React.useState(720);
    React.useEffect(() => {
      if (!ref.current) return;
      const ro = new ResizeObserver((e) => { const cw = e[0].contentRect.width; if (cw > 0) setW(cw); });
      ro.observe(ref.current);
      return () => ro.disconnect();
    }, []);
    return [ref, w];
  }

  // ---------- Year Comparison ----------
  function YearScreen() {
    const [metric, setMetric] = React.useState('value');
    const src = metric === 'value' ? D.valueByYear : D.volumeByYear;
    const unit = metric === 'value' ? 'ลบ.' : 'พัน Kg';

    // 5-month comparable
    const t68 = D.sum(src[2568].slice(0, NACT));
    const t69 = D.sum(src[2569].slice(0, NACT));
    const yoy = +((t69 / t68 - 1) * 100).toFixed(1);
    const t68Full = D.sum(src[2568]);

    const rows = D.MONTHS_ACT.map((m, i) => ({
      month: m, y68: src[2568][i], y69: src[2569][i],
      yoy: +((src[2569][i] / src[2568][i] - 1) * 100).toFixed(1),
    }));

    return (
      <div>
        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label={`รวม 5 เดือน 2569`} value={fmt.dec1(t69)} unit={unit} delta={yoy} deltaSuffix=" YoY" accent />
          <KpiCard label="รวม 5 เดือน 2568" value={fmt.dec1(t68)} unit={unit} />
          <KpiCard label="YoY Growth" value={fmt.pct(yoy).replace('%', '')} unit="%" delta={yoy} icon={<Icon name="activity" size={15} />} />
          <KpiCard label="ทั้งปี 2568 (อ้างอิง)" value={fmt.dec1(t68Full)} unit={unit} icon={<Icon name="calendar" size={15} />} />
        </Grid>

        <Card title="เปรียบเทียบยอดขาย 2568 vs 2569" subtitle={`${metric === 'value' ? 'มูลค่า (ลบ.)' : 'ปริมาณ (พัน Kg)'} · รายเดือน ม.ค.–พ.ค.`}
          actions={<SegmentedControl size="sm" value={metric} onChange={setMetric} options={[{value:'value',label:'มูลค่า'},{value:'volume',label:'ปริมาณ'}]} />}>
          <LineChart height={300} labels={D.MONTHS_ACT} yFormat={(v) => fmt.int(v)} showDots
            series={[
              { name: 'ปี 2568', data: src[2568].slice(0, NACT), color: 'var(--slate-400)', type: 'line' },
              { name: 'ปี 2569', data: src[2569].slice(0, NACT), color: 'var(--viz-1)', type: 'area' },
            ]} />
        </Card>

        <Card title="ตารางเปรียบเทียบรายเดือน" subtitle="เดือน × ปี · พร้อม % Growth (YoY)" style={{ marginTop: 16 }} padding="none">
          <DataTable rows={rows} sortable={false} rowKey={(r) => r.month}
            columns={[
              { key: 'month', header: 'เดือน', render: (r) => <span style={{ fontWeight: 500 }}>{r.month}</span> },
              { key: 'y68', header: 'ปี 2568', numeric: true, render: (r) => fmt.dec1(r.y68) },
              { key: 'y69', header: 'ปี 2569', numeric: true, render: (r) => fmt.dec1(r.y69) },
              { key: 'diff', header: 'ส่วนต่าง', numeric: true, sortable: false, render: (r) => fmt.dec1(r.y69 - r.y68) },
              { key: 'yoy', header: '% Growth (YoY)', numeric: true, render: (r) => <DeltaBadge value={r.yoy} size="sm" /> },
            ]} />
        </Card>
      </div>
    );
  }

  // ---------- Forecast ----------
  function ForecastChart({ height = 300 }) {
    const [ref, width] = useMeasure();
    const F = D.forecast;
    const A = F.actualMonths;
    const proj = F.projVal; // 12 months, first A actual
    const actual = proj.map((v, i) => i < A ? v : null);
    const projected = proj.map((v, i) => i >= A - 1 ? v : null);
    const upper = projected.map((v) => v == null ? null : +(v * 1.09).toFixed(1));
    const lower = projected.map((v) => v == null ? null : +(v * 0.91).toFixed(1));

    const p = { top: 16, right: 16, bottom: 28, left: 42 };
    const iw = Math.max(10, width - p.left - p.right);
    const ih = Math.max(10, height - p.top - p.bottom);
    const max = Math.max(...proj, ...upper.filter((v) => v != null)) * 1.12;
    const n = proj.length;
    const x = (i) => p.left + (i / (n - 1)) * iw;
    const y = (v) => p.top + ih - (v / max) * ih;

    const actualPath = actual.map((v, i) => v == null ? null : `${actual.slice(0, i).every((u) => u == null) ? 'M' : 'L'} ${x(i)} ${y(v)}`).filter(Boolean).join(' ');
    const projPts = projected.map((v, i) => v == null ? null : `${x(i)},${y(v)}`).filter(Boolean);
    const projD = projPts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt}`).join(' ');
    const upPts = upper.map((v, i) => v == null ? null : `${x(i)},${y(v)}`).filter(Boolean);
    const loPts = lower.map((v, i) => v == null ? null : `${x(i)},${y(v)}`).filter(Boolean).reverse();
    const band = upPts.length ? `M ${[...upPts, ...loPts].join(' L ')} Z` : '';

    return (
      <div ref={ref} style={{ width: '100%' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
          <Lg color="var(--viz-1)">ยอดจริง (ม.ค.–พ.ค.)</Lg>
          <Lg color="var(--viz-3)" dash>คาดการณ์ (มิ.ย.–ธ.ค.)</Lg>
          <Lg color="var(--viz-3)" band>ช่วงความเชื่อมั่น ±9%</Lg>
        </div>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
          {[0, 0.25, 0.5, 0.75, 1].map((g, k) => (
            <g key={k}>
              <line x1={p.left} y1={p.top + g * ih} x2={p.left + iw} y2={p.top + g * ih} stroke="var(--chart-grid)" />
              <text x={p.left - 8} y={p.top + g * ih + 4} textAnchor="end" fontSize="10" fill="var(--chart-axis)" fontFamily="var(--font-numeric)">{fmt.int(max * (1 - g))}</text>
            </g>
          ))}
          <line x1={x(A - 1)} y1={p.top} x2={x(A - 1)} y2={p.top + ih} stroke="var(--border-strong)" strokeDasharray="3 3" />
          <rect x={x(A - 1)} y={p.top} width={p.left + iw - x(A - 1)} height={ih} fill="var(--viz-3)" opacity="0.04" />
          {band && <path d={band} fill="var(--viz-3)" opacity="0.14" />}
          <path d={projD} fill="none" stroke="var(--viz-3)" strokeWidth="2" strokeDasharray="5 4" />
          <path d={actualPath} fill="none" stroke="var(--viz-1)" strokeWidth="2.5" />
          {actual.map((v, i) => v != null && <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill="var(--viz-1)" />)}
          {F.projVal.map((v, i) => <text key={i} x={x(i)} y={height - 8} textAnchor="middle" fontSize="10" fill="var(--chart-axis)" fontFamily="var(--font-sans)">{D.TH_MONTHS[i]}</text>)}
        </svg>
      </div>
    );
  }
  function Lg({ color, dash, band, children }) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
        {band ? <span style={{ width: 14, height: 10, background: color, opacity: 0.2, borderRadius: 2 }} />
          : <span style={{ width: 16, height: 0, borderTop: `2px ${dash ? 'dashed' : 'solid'} ${color}` }} />}
        {children}
      </span>
    );
  }

  function ForecastScreen() {
    const F = D.forecast;
    const prodByVal = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const custByKg = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <Badge tone="accent" variant="soft" dot>AI Forecasting</Badge>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>คาดการณ์สิ้นปี 2569 จากข้อมูลจริง ม.ค.–พ.ค. · โมเดล Time-Series (ค่าเฉลี่ย 3 เดือนล่าสุด + แนวโน้ม)</span>
        </div>

        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label="คาดการณ์มูลค่าสิ้นปี" value={fmt.int(F.yearEndVal)} unit="ลบ." delta={13.8} deltaSuffix=" vs 2568" accent icon={<Icon name="sparkles" size={15} />} />
          <KpiCard label="คาดการณ์ปริมาณสิ้นปี" value={Math.round(F.yearEndKg * 1e6).toLocaleString('en-US')} unit="Kg" delta={9.2} icon={<Icon name="box" size={15} />} />
          <KpiCard label="Confidence Level" value={F.confidence} unit="%" icon={<Icon name="target" size={15} />} />
          <KpiCard label="เดือนที่เหลือ" value={String(12 - NACT)} unit="เดือน" icon={<Icon name="clock" size={15} />} />
        </Grid>

        <Card title="คาดการณ์ยอดขายสิ้นปี 2569" subtitle="มูลค่า (ลบ.) · ยอดจริง 5 เดือน + คาดการณ์พร้อมช่วงความเชื่อมั่น"
          actions={<Badge tone="positive" dot>ความเชื่อมั่น {F.confidence}%</Badge>}>
          <ForecastChart height={320} />
        </Card>

        <Grid cols={2} gap={16} style={{ marginTop: 16 }}>
          <Card title="Top 10 สินค้า คาดการณ์สิ้นปี" subtitle="มูลค่า (ลบ.)" bodyStyle={{ padding: 'var(--space-2)' }}>
            {prodByVal.slice(0, 10).map((p, i) => {
              const proj = +(p.val * (12 / NACT) * 1.02).toFixed(1);
              return <RankBar key={p.id} rank={i + 1} label={p.name} sublabel={`คาด ${fmt.dec1(proj)} ลบ.`}
                value={fmt.dec1(proj) + ' ลบ.'} ratio={proj / (prodByVal[0].val * (12 / NACT) * 1.02)} color={`var(--viz-${(i % 8) + 1})`} />;
            })}
          </Card>
          <Card title="Top 10 ลูกค้า คาดการณ์สิ้นปี" subtitle="ปริมาณ (Kg)" bodyStyle={{ padding: 'var(--space-2)' }}>
            {custByKg.slice(0, 10).map((c, i) => {
              const proj = Math.round(c.kg * (12 / NACT) * (1 + c.mom / 100 * 0.2));
              return <RankBar key={c.id} rank={i + 1} label={c.name} sublabel={`คาด ${fmt.int(proj)} Kg`}
                value={fmt.int(proj) + ' Kg'} ratio={proj / (custByKg[0].kg * (12 / NACT) * 1.1)} delta={c.mom} color="var(--viz-4)" />;
            })}
          </Card>
        </Grid>
      </div>
    );
  }

  window.YearScreen = YearScreen;
  window.ForecastScreen = ForecastScreen;
})();


/* ===== App.jsx ===== */
/* Vantage dashboard app root → renders into #root.
   Load-order resilient: references shell/screen globals lazily and waits for
   all dependencies before mounting, so it works regardless of script order
   (e.g. when inlined/bundled into a single file). */
(function () {
  const SCREENS = {
    overview: { title: 'ภาพรวมผู้บริหาร', subtitle: 'Executive Sales Overview', comp: () => window.OverviewScreen, withProps: true },
    sales: { title: 'Sales Overview', subtitle: 'ยอดขายรวมต่อเดือน · เทียบ 2568', comp: () => window.SalesScreen },
    product: { title: 'Product Analysis', subtitle: 'วิเคราะห์สินค้าทั้งหมด', comp: () => window.ProductScreen },
    customer: { title: 'Customer Analysis', subtitle: 'วิเคราะห์ลูกค้าทั้งหมด', comp: () => window.CustomerScreen },
    contribution: { title: 'Customer Contribution', subtitle: 'Pareto Analysis · ความเสี่ยงการพึ่งพา', comp: () => window.ContributionScreen },
    mix: { title: 'Product Mix', subtitle: 'สัดส่วนยอดขายแต่ละสินค้า', comp: () => window.MixScreen },
    price: { title: 'Price Analysis', subtitle: 'Average Selling Price', comp: () => window.PriceScreen },
    year: { title: 'Year Comparison', subtitle: 'เปรียบเทียบ 2568 vs 2569 · YoY', comp: () => window.YearScreen },
    forecast: { title: 'Forecast', subtitle: 'AI Forecasting · คาดการณ์สิ้นปี', comp: () => window.ForecastScreen },
  };

  function App() {
    const Sidebar = window.Sidebar, TopBar = window.TopBar, FilterBar = window.FilterBar;
    const [active, setActive] = React.useState(() => localStorage.getItem('vantage.screen') || 'overview');
    const [theme, setTheme] = React.useState(() => localStorage.getItem('vantage.theme') || 'dark');
    const [collapsed, setCollapsed] = React.useState(false);
    const [filters, setFilters] = React.useState({ year: '2569', month: 'all', customerGroup: 'all', productGroup: 'all', granularity: 'month' });
    const scrollRef = React.useRef(null);

    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('vantage.theme', theme);
    }, [theme]);

    const nav = (id) => { setActive(id); localStorage.setItem('vantage.screen', id); if (scrollRef.current) scrollRef.current.scrollTop = 0; };
    const screen = SCREENS[active] || SCREENS.overview;
    const ScreenComp = screen.comp();

    // Defensive: never hand React an undefined element type (keeps console clean even
    // if a dependency is momentarily missing during a hot-reload re-evaluation).
    if (!Sidebar || !TopBar || !FilterBar || !ScreenComp) return null;

    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
        <Sidebar active={active} onNav={nav} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
          <TopBar title={screen.title} subtitle={screen.subtitle} theme={theme} onTheme={() => setTheme((t) => t === 'dark' ? 'light' : 'dark')} />
          <FilterBar filters={filters} setFilters={setFilters} />
          <main ref={scrollRef} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '22px', scrollBehavior: 'smooth' }}>
            <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
              {screen.withProps ? <ScreenComp onDrill={nav} /> : <ScreenComp />}
              <div style={{ height: 24 }} />
              <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 2px', borderTop: '1px solid var(--border-subtle)', fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>
                <span>BWP · Best World Interplas — ข้อมูลจริง ม.ค.–พ.ค. 2569 (เทียบ 2568)</span>
                <span>ที่มา: ยอดขาย 69.xlsx</span>
              </footer>
            </div>
          </main>
        </div>
      </div>
    );
  }
  window.VantageApp = App;

  // Mount once, only after every dependency global is ready (load-order safe).
  function ready() {
    return window.VDATA && window.VantageSalesIntelligenceDesignSystem_a75d0a && window.Icon &&
      window.Sidebar && window.TopBar && window.FilterBar &&
      window.OverviewScreen && window.SalesScreen && window.ProductScreen && window.CustomerScreen &&
      window.ContributionScreen && window.MixScreen && window.PriceScreen && window.YearScreen && window.ForecastScreen;
  }
  function mount() {
    if (!ready()) { return setTimeout(mount, 25); }
    const el = document.getElementById('root');
    if (!el) { return setTimeout(mount, 25); }
    if (!el.__vroot) el.__vroot = ReactDOM.createRoot(el);
    el.__vroot.render(<App />);
  }
  window.__BWP_REMOUNT = mount;   // Supabase loader calls this after refreshing window.VDATA
  mount();
})();


}
