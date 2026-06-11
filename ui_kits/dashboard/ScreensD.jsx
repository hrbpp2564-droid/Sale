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
          <KpiCard label="คาดการณ์ปริมาณสิ้นปี" value={fmt.dec1(F.yearEndKg)} unit="ล้าน Kg" delta={9.2} icon={<Icon name="box" size={15} />} />
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
