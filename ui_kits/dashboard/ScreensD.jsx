/* Screens: Year Comparison + Forecast → window.{YearScreen, ForecastScreen}
   2 years: 2568 (12mo actual) vs 2569 (actual months). Forecast projects 2569 year-end. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { Card, KpiCard, DeltaBadge, DataTable, LineChart, SegmentedControl, Badge, RankBar } = NS;
  const Icon = window.Icon;
  const { fmt } = window.VUtil;
  const { Grid } = window;
  const viewFor = window.viewFor || function(f){ return window.VDATA; };
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

  // ---------- Year Comparison (dynamic over all years in D.YEARS) ----------
  function YearScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const [metric, setMetric] = React.useState('value');
    const src = metric === 'value' ? D.valueByYear : D.volumeByYear;
    const unit = metric === 'value' ? 'ลบ.' : 'พัน Kg';
    const years = D.YEARS.filter((y) => Array.isArray(src[y])); // only years with data
    const latest = years[years.length - 1];
    const prev = years[years.length - 2];

    // count of actual (non-null) months for a year
    const monthsOf = (y) => src[y].filter((v) => v != null).length;
    // comparable window = min actual months across all years (so YoY is apples-to-apples)
    const cmp = Math.min(...years.map(monthsOf));
    const sumN = (y, n) => D.sum(src[y].slice(0, n).map((v) => v || 0));
    const sumFull = (y) => D.sum(src[y].map((v) => v || 0));

    const tLatest = sumN(latest, cmp);
    const tPrev = prev ? sumN(prev, cmp) : 0;
    const yoy = tPrev ? +((tLatest / tPrev - 1) * 100).toFixed(1) : 0;

    // palette: older years muted, latest highlighted
    const yearColor = (i) => i === years.length - 1 ? 'var(--viz-1)' : `var(--viz-${((years.length - 1 - i) % 6) + 2})`;
    const series = years.map((y, i) => ({
      name: 'ปี ' + y, data: src[y].slice(0, cmp), color: yearColor(i),
      type: i === years.length - 1 ? 'area' : 'line',
    }));

    // monthly comparison table — one column per year + YoY (latest vs prev)
    const rows = D.MONTHS_ACT.slice(0, cmp).map((m, i) => {
      const row = { month: m };
      years.forEach((y) => { row['y' + y] = src[y][i]; });
      row.yoy = prev && src[prev][i] ? +((src[latest][i] / src[prev][i] - 1) * 100).toFixed(1) : 0;
      return row;
    });

    // annual summary — per year totals (comparable window + full year), with step YoY
    const annual = years.map((y, i) => {
      const cmpT = sumN(y, cmp), full = sumFull(y), nM = monthsOf(y);
      const py = years[i - 1];
      const stepYoY = py ? +((sumN(y, cmp) / sumN(py, cmp) - 1) * 100).toFixed(1) : null;
      return { year: y, cmpT, full, nM, stepYoY };
    });

    return (
      <div>
        <Grid min={160} gap={12} style={{ marginBottom: 16 }}>
          <KpiCard label={`รวม ${cmp} เดือน ${latest}`} value={fmt.dec1(metric === 'value' ? tLatest/1e6 : tLatest)} unit={unit} delta={yoy} deltaSuffix=" YoY" accent />
          {prev && <KpiCard label={`รวม ${cmp} เดือน ${prev}`} value={fmt.dec1(metric === 'value' ? tPrev/1e6 : tPrev)} unit={unit} />}
          <KpiCard label="YoY Growth" value={fmt.pct(yoy).replace('%', '')} unit="%" delta={yoy} icon={<Icon name="activity" size={15} />} />
          <KpiCard label={`จำนวนปีที่เทียบ`} value={String(years.length)} unit="ปี" icon={<Icon name="calendar" size={15} />} />
        </Grid>

        <Card title={`เปรียบเทียบยอดขายรายปี (${years.join(' · ')})`} subtitle={`${metric === 'value' ? 'มูลค่า (ลบ.)' : 'ปริมาณ (พัน Kg)'} · รายเดือน · เทียบ ${cmp} เดือนแรกที่มีข้อมูลครบทุกปี`}
          actions={<SegmentedControl size="sm" value={metric} onChange={setMetric} options={[{value:'value',label:'มูลค่า'},{value:'volume',label:'ปริมาณ'}]} />}>
          <LineChart height={300} labels={D.MONTHS_ACT.slice(0, cmp)} yFormat={(v) => metric === 'value' ? fmt.dec1(v/1e6) : fmt.int(v)} showDots series={series} />
        </Card>

        <Grid cols={2} gap={16} style={{ marginTop: 16 }}>
          <Card title="สรุปรายปี" subtitle={`รวม ${cmp} เดือนเทียบกัน + ทั้งปี (เท่าที่มีข้อมูล)`} padding="none">
            <DataTable rows={annual} sortable={false} rowKey={(r) => r.year}
              columns={[
                { key: 'year', header: 'ปี', render: (r) => <span style={{ fontWeight: 500 }}>{r.year}</span> },
                { key: 'cmpT', header: `รวม ${cmp} เดือน`, numeric: true, render: (r) => fmt.dec1(metric === 'value' ? r.cmpT/1e6 : r.cmpT) },
                { key: 'full', header: 'ทั้งปี', numeric: true, render: (r) => <span>{fmt.dec1(metric === 'value' ? r.full/1e6 : r.full)}<span style={{ color: 'var(--text-disabled)', fontSize: 'var(--text-2xs)' }}> ({r.nM}ด.)</span></span> },
                { key: 'step', header: '% YoY', numeric: true, sortable: false, render: (r) => r.stepYoY == null ? <span style={{ color: 'var(--text-disabled)' }}>—</span> : <DeltaBadge value={r.stepYoY} size="sm" /> },
              ]} />
          </Card>

          <Card title="ตารางเปรียบเทียบรายเดือน" subtitle={`เดือน × ปี · YoY (${latest} vs ${prev || '—'})`} padding="none">
            <DataTable rows={rows} sortable={false} rowKey={(r) => r.month}
              columns={[
                { key: 'month', header: 'เดือน', render: (r) => <span style={{ fontWeight: 500 }}>{r.month}</span> },
                ...years.map((y) => ({ key: 'y' + y, header: String(y), numeric: true, render: (r) => r['y'+y] == null ? '—' : fmt.dec1(metric === 'value' ? r['y'+y]/1e6 : r['y'+y]) })),
                { key: 'yoy', header: '% YoY', numeric: true, render: (r) => <DeltaBadge value={r.yoy} size="sm" /> },
              ]} />
          </Card>
        </Grid>
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
          <Lg color="var(--viz-1)">{`ยอดจริง (${D.MONTHS_ACT[0]}–${D.MONTHS_ACT[D.NACT-1]})`}</Lg>
          <Lg color="var(--viz-3)" dash>คาดการณ์ (มิ.ย.–ธ.ค.)</Lg>
          <Lg color="var(--viz-3)" band>ช่วงความเชื่อมั่น ±9%</Lg>
        </div>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
          {[0, 0.25, 0.5, 0.75, 1].map((g, k) => (
            <g key={k}>
              <line x1={p.left} y1={p.top + g * ih} x2={p.left + iw} y2={p.top + g * ih} stroke="var(--chart-grid)" />
              <text x={p.left - 8} y={p.top + g * ih + 4} textAnchor="end" fontSize="10" fill="var(--chart-axis)" fontFamily="var(--font-numeric)">{fmt.dec1(max * (1 - g) / 1e6)}</text>
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

  function ForecastScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
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
          <KpiCard label="คาดการณ์มูลค่าสิ้นปี" value={fmt.dec1(F.yearEndVal / 1e6)} unit="ลบ." delta={(() => { const _vd = window.VDATA || {}; const _b = ((_vd.valueByYear && (_vd.valueByYear['2568'] || _vd.valueByYear[2568])) || []).reduce((s, x) => s + (+x || 0), 0); return _b ? +((F.yearEndVal / _b - 1) * 100).toFixed(1) : 0; })()} deltaSuffix=" vs 2568" accent icon={<Icon name="sparkles" size={15} />} />
          <KpiCard label="คาดการณ์ปริมาณสิ้นปี" value={Math.round(F.yearEndVolKg * 1e6).toLocaleString('en-US')} unit="Kg" delta={(() => { const _vd = window.VDATA || {}; const _b = ((_vd.volumeByYear && (_vd.volumeByYear['2568'] || _vd.volumeByYear[2568])) || []).reduce((s, x) => s + (+x || 0), 0); return _b ? +((F.yearEndVolKg * 1000 / _b - 1) * 100).toFixed(1) : 0; })()} deltaSuffix=" vs 2568" icon={<Icon name="box" size={15} />} />
          <KpiCard label="Confidence Level" value={F.confidence} unit="%" icon={<Icon name="target" size={15} />} />
          <KpiCard label="เดือนที่เหลือ" value={String(12 - NACT)} unit="เดือน" icon={<Icon name="clock" size={15} />} />
        </Grid>

        <Card title="คาดการณ์ยอดขายสิ้นปี 2569" subtitle={`มูลค่า (ลบ.) · ยอดจริง ${NACT} เดือน + คาดการณ์พร้อมช่วงความเชื่อมั่น`}
          actions={<Badge tone="positive" dot>ความเชื่อมั่น {F.confidence}%</Badge>}>
          <ForecastChart height={320} />
        </Card>

        <Grid cols={2} gap={16} style={{ marginTop: 16 }}>
          <Card title="Top 10 สินค้า คาดการณ์สิ้นปี" subtitle="มูลค่า (ลบ.)" bodyStyle={{ padding: 'var(--space-2)' }}>
            {prodByVal.slice(0, 10).map((p, i) => {
              const proj = +(p.val * (12 / NACT) * 1.02);
              return <RankBar key={p.id} rank={i + 1} label={p.name} sublabel={`คาด ${fmt.dec1(proj / 1e6)} ลบ.`}
                value={fmt.dec1(proj / 1e6) + ' ลบ.'} ratio={proj / (prodByVal[0].val * (12 / NACT) * 1.02)} color={`var(--viz-${(i % 8) + 1})`} />;
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
