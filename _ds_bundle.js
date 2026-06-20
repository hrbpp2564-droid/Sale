/* @ds-bundle: {"format":3,"namespace":"VantageSalesIntelligenceDesignSystem_a75d0a","components":[{"name":"DonutChart","sourcePath":"components/charts/DonutChart.jsx"},{"name":"LineChart","sourcePath":"components/charts/LineChart.jsx"},{"name":"ParetoChart","sourcePath":"components/charts/ParetoChart.jsx"},{"name":"Sparkline","sourcePath":"components/charts/Sparkline.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"DeltaBadge","sourcePath":"components/data/DeltaBadge.jsx"},{"name":"InsightCard","sourcePath":"components/data/InsightCard.jsx"},{"name":"KpiCard","sourcePath":"components/data/KpiCard.jsx"},{"name":"RankBar","sourcePath":"components/data/RankBar.jsx"}],"sourceHashes":{"components/charts/DonutChart.jsx":"a6ddbf3fd857","components/charts/LineChart.jsx":"f5dd47881348","components/charts/ParetoChart.jsx":"d64fd6a45af7","components/charts/Sparkline.jsx":"283f32f982d5","components/core/Badge.jsx":"66ee9657c714","components/core/Button.jsx":"be1a5f496b11","components/core/Card.jsx":"7c064f0ffe41","components/core/IconButton.jsx":"51b3d9fae440","components/core/SegmentedControl.jsx":"26c5163ec62e","components/core/Select.jsx":"eb7fe3224c40","components/data/DataTable.jsx":"a1cb29dc756c","components/data/DeltaBadge.jsx":"1323d2b31bb8","components/data/InsightCard.jsx":"4e0e2fd81129","components/data/KpiCard.jsx":"204c30ba3125","components/data/RankBar.jsx":"edf4ec5113ab","ui_kits/dashboard/App.jsx":"d54094192584","ui_kits/dashboard/Common.jsx":"248c79cceeac","ui_kits/dashboard/ScreensA.jsx":"ce84f3635278","ui_kits/dashboard/ScreensB.jsx":"a91c996fff9e","ui_kits/dashboard/ScreensC.jsx":"92527895439e","ui_kits/dashboard/ScreensD.jsx":"e468db81cdfd","ui_kits/dashboard/Shell.jsx":"447c29606dc2","ui_kits/dashboard/app.all.jsx":"6bddd3f2d5e5","ui_kits/dashboard/data.js":"5e931d3aa223","ui_kits/dashboard/icons.jsx":"920dab7f283c","ui_kits/dashboard/supabase-config.js":"ea6824ba6ed8","ui_kits/dashboard/supabase-loader.js":"1ff353d62bde"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VantageSalesIntelligenceDesignSystem_a75d0a = window.VantageSalesIntelligenceDesignSystem_a75d0a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/charts/DonutChart.jsx
try { (() => {
/**
 * Vantage DonutChart — proportional ring for Product Mix / contribution share.
 * Renders segments + optional center total and side legend.
 */
function DonutChart({
  data = [],
  // [{ label, value, color }]
  size = 200,
  thickness = 26,
  centerLabel = null,
  centerValue = null,
  showLegend = true,
  gap = 2,
  // degrees between segments
  valueFormat = null,
  style = {}
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const [active, setActive] = React.useState(null);
  let offset = 0;
  const segs = data.map((d, i) => {
    const frac = d.value / total;
    const len = frac * circ;
    const gapLen = gap / 360 * circ;
    const seg = {
      ...d,
      i,
      dasharray: `${Math.max(0, len - gapLen)} ${circ - Math.max(0, len - gapLen)}`,
      dashoffset: -offset,
      pct: frac * 100
    };
    offset += len;
    return seg;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r,
    fill: "none",
    stroke: "var(--surface-3)",
    strokeWidth: thickness
  }), segs.map(s => /*#__PURE__*/React.createElement("circle", {
    key: s.i,
    cx: cx,
    cy: cy,
    r: r,
    fill: "none",
    stroke: s.color,
    strokeWidth: active === s.i ? thickness + 4 : thickness,
    strokeDasharray: s.dasharray,
    strokeDashoffset: s.dashoffset,
    strokeLinecap: "butt",
    style: {
      transition: 'stroke-width var(--dur-fast)',
      cursor: 'pointer',
      opacity: active === null || active === s.i ? 1 : 0.45
    },
    onMouseEnter: () => setActive(s.i),
    onMouseLeave: () => setActive(null)
  }))), (centerLabel || centerValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, active !== null ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)'
    }
  }, segs[active].pct.toFixed(2), "%"), valueFormat ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)',
      marginTop: 1
    }
  }, valueFormat(segs[active].value)) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)',
      maxWidth: size - thickness * 2,
      textAlign: 'center'
    }
  }, segs[active].label)) : /*#__PURE__*/React.createElement(React.Fragment, null, centerValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)'
    }
  }, centerValue), centerLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)'
    }
  }, centerLabel)))), showLegend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 150,
      flex: 1
    }
  }, segs.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      opacity: active === null || active === s.i ? 1 : 0.5
    },
    onMouseEnter: () => setActive(s.i),
    onMouseLeave: () => setActive(null)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: s.color,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap'
    }
  }, active === s.i && valueFormat ? valueFormat(s.value) : s.pct.toFixed(2) + "%")))));
}
Object.assign(__ds_scope, { DonutChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/DonutChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/LineChart.jsx
try { (() => {
function useMeasure() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(640);
  React.useEffect(() => {
    if (!ref.current) return;
    let _roTimer;
    const ro = new ResizeObserver(entries => {
      const cw = entries[0].contentRect.width;
      if (cw > 0) { clearTimeout(_roTimer); _roTimer = setTimeout(() => setW(cw), 80); }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/**
 * Vantage LineChart — multi-series line / area / combo chart.
 * The workhorse trend chart (Sales Overview, Year Comparison, Price).
 */
function LineChart({
  series = [],
  // [{ name, data:[n], color, type?:'line'|'area'|'bar', axis?:'left'|'right' }]
  labels = [],
  // x-axis category labels
  height = 240,
  yFormat = v => v.toLocaleString('en-US'),
  showGrid = true,
  showDots = false,
  showLegend = true,
  padding = {
    top: 16,
    right: 16,
    bottom: 26,
    left: 44
  },
  style = {}
}) {
  const [ref, width] = useMeasure();
  const [hover, setHover] = React.useState(null);
  const leftSeries = series.filter(s => (s.axis || 'left') === 'left');
  const rightSeries = series.filter(s => s.axis === 'right');
  const maxOf = arr => Math.max(1, ...arr.flatMap(s => s.data));
  const lMax = maxOf(leftSeries.length ? leftSeries : series) * 1.12;
  const rMax = maxOf(rightSeries.length ? rightSeries : series) * 1.12;
  // auto-compute left padding to fit Y-axis label
  const _yLabelLen = String(yFormat(Math.round(lMax))).length;
  const _autoLeft = Math.max(padding.left, _yLabelLen * 7 + 10);
  const p = { ...padding, left: _autoLeft };
  const iw = Math.max(10, width - p.left - p.right);
  const ih = Math.max(10, height - p.top - p.bottom);
  const n = labels.length || (series[0]?.data.length ?? 0);
  const hasBar = series.some(s => s.type === 'bar');
  const xAt = i => p.left + (hasBar ? (i + 0.5) / n * iw : (n <= 1 ? iw / 2 : i / (n - 1) * iw));
  const yAt = (v, axis) => p.top + ih - v / (axis === 'right' ? rMax : lMax) * ih;
  const bxAt = i => xAt(i); // bar centers aligned with line/label x positions

  const gridLines = 4;
  function pathFor(data, axis) {
    return data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v, axis).toFixed(1)}`).join(' ');
  }
  function areaFor(data, axis) {
    const top = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v, axis).toFixed(1)}`).join(' ');
    return `${top} L ${xAt(data.length - 1).toFixed(1)} ${(p.top + ih).toFixed(1)} L ${xAt(0).toFixed(1)} ${(p.top + ih).toFixed(1)} Z`;
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      width: '100%',
      paddingBottom: 4,
      ...style
    }
  }, showLegend && series.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      marginBottom: 10
    }
  }, series.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.name,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: s.type === 'bar' ? 2 : '50%',
      background: s.color
    }
  }), s.name))), /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: 'block',
      overflow: 'visible'
    },
    onMouseLeave: () => setHover(null),
    onMouseMove: e => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * width;
      const i = Math.round((x - p.left) / iw * (n - 1));
      if (i >= 0 && i < n) setHover(i);
    }
  }, showGrid && Array.from({
    length: gridLines + 1
  }).map((_, g) => {
    const y = p.top + g / gridLines * ih;
    const val = lMax * (1 - g / gridLines);
    return /*#__PURE__*/React.createElement("g", {
      key: g
    }, /*#__PURE__*/React.createElement("line", {
      x1: p.left,
      y1: y,
      x2: p.left + iw,
      y2: y,
      stroke: "var(--chart-grid)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: p.left - 8,
      y: y + 4,
      textAnchor: "end",
      fontSize: "10",
      fill: "var(--chart-axis)",
      fontFamily: "var(--font-numeric)"
    }, yFormat(Math.round(val))));
  }), series.filter(s => s.type === 'bar').map(s => {
    const bw = iw / n * 0.5;
    return s.data.map((v, i) => /*#__PURE__*/React.createElement("rect", {
      key: s.name + i,
      x: bxAt(i) - bw / 2,
      y: yAt(v, s.axis),
      width: bw,
      height: p.top + ih - yAt(v, s.axis),
      rx: "2",
      fill: s.color,
      opacity: "0.85"
    }));
  }), series.filter(s => s.type === 'area').map(s => /*#__PURE__*/React.createElement("path", {
    key: s.name,
    d: areaFor(s.data, s.axis),
    fill: s.color,
    opacity: "0.12"
  })), series.filter(s => s.type !== 'bar').map(s => /*#__PURE__*/React.createElement("path", {
    key: s.name,
    d: pathFor(s.data, s.axis),
    fill: "none",
    stroke: s.color,
    strokeWidth: "2",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  })), showDots && series.filter(s => s.type !== 'bar').map(s => s.data.map((v, i) => /*#__PURE__*/React.createElement("circle", {
    key: s.name + i,
    cx: xAt(i),
    cy: yAt(v, s.axis),
    r: "2.5",
    fill: "var(--surface-1)",
    stroke: s.color,
    strokeWidth: "1.5"
  }))), hover !== null && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
    x1: xAt(hover),
    y1: p.top,
    x2: xAt(hover),
    y2: p.top + ih,
    stroke: "var(--border-strong)",
    strokeWidth: "1",
    strokeDasharray: "3 3"
  }), series.filter(s => s.type !== 'bar').map(s => /*#__PURE__*/React.createElement("circle", {
    key: s.name,
    cx: xAt(hover),
    cy: yAt(s.data[hover], s.axis),
    r: "3.5",
    fill: s.color,
    stroke: "var(--surface-1)",
    strokeWidth: "1.5"
  }))), null), labels.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: { display: 'flex', justifyContent: hasBar ? 'space-around' : (n <= 1 ? 'center' : 'space-between'), paddingLeft: p.left, paddingRight: p.right, marginTop: 2 }
  }, labels.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: { fontSize: 10, color: 'var(--chart-axis)', fontFamily: 'var(--font-sans)', textAlign: 'center', flex: '0 0 auto', visibility: (n <= 14 || i % Math.ceil(n / 12) === 0) ? 'visible' : 'hidden' }
  }, l))), hover !== null && labels[hover] && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      marginTop: 8,
      padding: '8px 12px',
      background: 'var(--surface-inset)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--text-xs)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, labels[hover]), series.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.name,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: s.color
    }
  }), s.name, ": ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-numeric)',
      color: 'var(--text-primary)'
    }
  }, yFormat(s.data[hover]))))));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/ParetoChart.jsx
try { (() => {
function useMeasure() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(640);
  React.useEffect(() => {
    if (!ref.current) return;
    let _roTimer;
    const ro = new ResizeObserver(e => {
      const cw = e[0].contentRect.width;
      if (cw > 0) { clearTimeout(_roTimer); _roTimer = setTimeout(() => setW(cw), 80); }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/**
 * Vantage ParetoChart — bars (value) + cumulative % line for contribution analysis.
 * Includes the 80% reference line for Pareto / customer-concentration risk.
 */
function ParetoChart({
  data = [],
  // [{ label, value }]
  height = 280,
  barColor = 'var(--viz-1)',
  lineColor = 'var(--viz-3)',
  threshold = 80,
  // % reference line
  valueFormat = v => v.toLocaleString('en-US'),
  style = {}
}) {
  const [ref, width] = useMeasure();
  const [hover, setHover] = React.useState(null);
  const p = {
    top: 18,
    right: 44,
    bottom: 40,
    left: 46
  };
  const iw = Math.max(10, width - p.left - p.right);
  const ih = Math.max(10, height - p.top - p.bottom);
  const sorted = [...data].sort((a, b) => b.value - a.value);
  const total = sorted.reduce((s, d) => s + d.value, 0) || 1;
  const maxV = Math.max(...sorted.map(d => d.value), 1) * 1.1;
  let cum = 0;
  const pts = sorted.map((d, i) => {
    cum += d.value;
    return {
      ...d,
      cumPct: cum / total * 100,
      i
    };
  });
  const n = pts.length;
  const bw = iw / n * 0.62;
  const bx = i => p.left + (i + 0.5) / n * iw;
  const by = v => p.top + ih - v / maxV * ih;
  const ly = pct => p.top + ih - pct / 100 * ih;
  const linePath = pts.map((d, i) => `${i === 0 ? 'M' : 'L'} ${bx(i).toFixed(1)} ${ly(d.cumPct).toFixed(1)}`).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      width: '100%',
      paddingBottom: 4,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: 'block',
      overflow: 'visible'
    },
    onMouseLeave: () => setHover(null)
  }, [0, 0.25, 0.5, 0.75, 1].map((g, k) => {
    const y = p.top + g * ih;
    return /*#__PURE__*/React.createElement("g", {
      key: k
    }, /*#__PURE__*/React.createElement("line", {
      x1: p.left,
      y1: y,
      x2: p.left + iw,
      y2: y,
      stroke: "var(--chart-grid)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: p.left - 8,
      y: y + 4,
      textAnchor: "end",
      fontSize: "10",
      fill: "var(--chart-axis)",
      fontFamily: "var(--font-numeric)"
    }, Math.round(maxV * (1 - g)).toLocaleString()), /*#__PURE__*/React.createElement("text", {
      x: p.left + iw + 8,
      y: y + 4,
      textAnchor: "start",
      fontSize: "10",
      fill: "var(--chart-axis)",
      fontFamily: "var(--font-numeric)"
    }, Math.round(100 * (1 - g)), "%"));
  }), /*#__PURE__*/React.createElement("line", {
    x1: p.left,
    y1: ly(threshold),
    x2: p.left + iw,
    y2: ly(threshold),
    stroke: "var(--negative)",
    strokeWidth: "1",
    strokeDasharray: "4 4",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("text", {
    x: p.left + iw,
    y: ly(threshold) - 5,
    textAnchor: "end",
    fontSize: "10",
    fill: "var(--negative)",
    fontFamily: "var(--font-numeric)"
  }, threshold, "%"), pts.map((d, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: bx(i) - bw / 2,
    y: by(d.value),
    width: bw,
    height: p.top + ih - by(d.value),
    rx: "2",
    fill: barColor,
    opacity: hover === null || hover === i ? 0.9 : 0.4,
    onMouseEnter: () => setHover(i),
    style: {
      cursor: 'pointer',
      transition: 'opacity var(--dur-fast)'
    }
  })), /*#__PURE__*/React.createElement("path", {
    d: linePath,
    fill: "none",
    stroke: lineColor,
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), pts.map((d, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: bx(i),
    cy: ly(d.cumPct),
    r: hover === i ? 4 : 2.5,
    fill: lineColor,
    stroke: "var(--surface-1)",
    strokeWidth: "1.5"
  })), pts.map((d, i) => (n <= 12 || i % Math.ceil(n / 12) === 0) && /*#__PURE__*/React.createElement("text", {
    key: i,
    x: bx(i),
    y: height - 22,
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--chart-axis)",
    fontFamily: "var(--font-sans)",
    transform: n > 8 ? `rotate(-30 ${bx(i)} ${height - 22})` : undefined
  }, d.label))), hover !== null && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 8,
      padding: '8px 12px',
      background: 'var(--surface-inset)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--text-xs)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-primary)'
    }
  }, pts[hover].label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-numeric)',
      color: 'var(--text-primary)'
    }
  }, valueFormat(pts[hover].value))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "\u0E2A\u0E30\u0E2A\u0E21: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-numeric)',
      color: lineColor
    }
  }, pts[hover].cumPct.toFixed(2), "%"))));
}
Object.assign(__ds_scope, { ParetoChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/ParetoChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/Sparkline.jsx
try { (() => {
/**
 * Vantage Sparkline — tiny inline trend for KPI tiles and table rows.
 * Fixed-size SVG; pass width/height. Optional area fill + end dot.
 */
function Sparkline({
  data = [],
  width = 84,
  height = 30,
  color = 'var(--accent)',
  fill = true,
  endDot = true,
  strokeWidth = 1.5,
  style = {}
}) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const iw = width - pad * 2;
  const ih = height - pad * 2;
  const x = i => pad + (data.length <= 1 ? iw / 2 : i / (data.length - 1) * iw);
  const y = v => pad + ih - (v - min) / range * ih;
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L ${x(data.length - 1).toFixed(1)} ${(pad + ih).toFixed(1)} L ${x(0).toFixed(1)} ${(pad + ih).toFixed(1)} Z`;
  const id = React.useId();
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    }
  }, fill && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `spark-${id}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.28"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#spark-${id})`
  })), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), endDot && /*#__PURE__*/React.createElement("circle", {
    cx: x(data.length - 1),
    cy: y(data[data.length - 1]),
    r: "2",
    fill: color
  }));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Vantage Badge — small status / category label.
 * Tones: neutral | accent | positive | negative | warning | info
 */
function Badge({
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  dot = false,
  style = {},
  children
}) {
  const tones = {
    neutral: {
      fg: 'var(--text-secondary)',
      soft: 'var(--surface-3)',
      solid: 'var(--slate-600)'
    },
    accent: {
      fg: 'var(--accent-hover)',
      soft: 'var(--accent-subtle)',
      solid: 'var(--accent)'
    },
    positive: {
      fg: 'var(--positive)',
      soft: 'var(--positive-subtle)',
      solid: 'var(--positive)'
    },
    negative: {
      fg: 'var(--negative)',
      soft: 'var(--negative-subtle)',
      solid: 'var(--negative)'
    },
    warning: {
      fg: 'var(--warning)',
      soft: 'var(--warning-subtle)',
      solid: 'var(--warning)'
    },
    info: {
      fg: 'var(--info)',
      soft: 'var(--info-subtle)',
      solid: 'var(--info)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const solid = variant === 'solid';
  const sizes = {
    sm: {
      h: 18,
      px: 6,
      fs: 'var(--text-2xs)'
    },
    md: {
      h: 22,
      px: 8,
      fs: 'var(--text-xs)'
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: s.h,
      padding: `0 ${s.px}px`,
      borderRadius: 'var(--radius-full)',
      background: solid ? t.solid : t.soft,
      color: solid ? '#fff' : t.fg,
      border: variant === 'outline' ? `1px solid ${t.fg}` : '1px solid transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: solid ? '#fff' : t.fg
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Vantage Button — primary action element.
 * Variants: primary | secondary | ghost | danger
 * Sizes: sm | md | lg
 */
function Button({
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = false,
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: {
      h: 30,
      px: 12,
      fs: 'var(--text-sm)',
      gap: 6
    },
    md: {
      h: 36,
      px: 16,
      fs: 'var(--text-base)',
      gap: 8
    },
    lg: {
      h: 44,
      px: 22,
      fs: 'var(--text-md)',
      gap: 8
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--accent-fg)',
      border: '1px solid transparent'
    },
    secondary: {
      background: 'var(--surface-2)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent'
    },
    danger: {
      background: 'var(--negative)',
      color: 'var(--negative-fg)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  let bg = v.background;
  if (!disabled && hover) {
    if (variant === 'primary') bg = 'var(--accent-hover)';else if (variant === 'secondary') bg = 'var(--surface-3)';else if (variant === 'ghost') bg = 'var(--surface-2)';else if (variant === 'danger') bg = 'var(--red-400)';
  }
  if (!disabled && active && variant === 'primary') bg = 'var(--accent-press)';
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.h,
      padding: `0 ${s.px}px`,
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      fontWeight: 'var(--weight-medium)',
      lineHeight: 1,
      borderRadius: 'var(--radius-md)',
      background: bg,
      color: v.color,
      border: v.border,
      transform: !disabled && active ? 'translateY(0.5px)' : 'none',
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'color var(--dur-fast), transform var(--dur-fast)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: '0 0 auto'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: '0 0 auto'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Vantage Card — the base surface for panels, charts, and tables.
 * Optional header (title + subtitle + actions slot).
 */
function Card({
  title = null,
  subtitle = null,
  actions = null,
  padding = 'md',
  interactive = false,
  style = {},
  bodyStyle = {},
  children,
  ...rest
}) {
  const pads = {
    none: 0,
    sm: 'var(--space-3)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)'
  };
  const pad = pads[padding] ?? pads.md;
  // Header should never sit flush against the card edge, even when the body
  // uses padding="none" (e.g. tables that supply their own cell padding).
  // 14px matches DataTable's cell padding so the title aligns with the first column.
  const headerPadX = (padding === 'none' ? '14px' : (typeof pad === 'number' ? pad + 'px' : pad));
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-1)',
      border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-lg)',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base), transform var(--dur-base)',
      transform: interactive && hover ? 'translateY(-1px)' : 'none',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), (title || actions) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      padding: `var(--space-4) ${headerPadX}`,
      paddingBottom: 'var(--space-3)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)',
      lineHeight: 'var(--leading-snug)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)',
      marginTop: 2
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      flex: '0 0 auto'
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad,
      flex: 1,
      minHeight: 0,
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Vantage IconButton — square, icon-only control for toolbars and headers.
 * Variants: ghost | solid | outline
 */
function IconButton({
  variant = 'ghost',
  size = 'md',
  active = false,
  disabled = false,
  label,
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: 28,
    md: 34,
    lg: 40
  };
  const dim = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);
  const base = {
    ghost: {
      bg: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent'
    },
    solid: {
      bg: 'var(--surface-2)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)'
    },
    outline: {
      bg: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-default)'
    }
  }[variant] || {
    bg: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent'
  };
  let bg = base.bg;
  let color = base.color;
  if (active) {
    bg = 'var(--accent-subtle)';
    color = 'var(--accent-hover)';
  } else if (hover && !disabled) {
    bg = 'var(--surface-3)';
    color = 'var(--text-primary)';
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-md)',
      background: bg,
      color,
      border: active ? '1px solid transparent' : base.border,
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'color var(--dur-fast)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
/**
 * Vantage SegmentedControl — pill toggle for view modes
 * (e.g. รายเดือน / รายไตรมาส / รายปี, or chart types).
 */
function SegmentedControl({
  options = [],
  value,
  onChange = () => {},
  size = 'md',
  style = {}
}) {
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const sizes = {
    sm: {
      h: 28,
      px: 10,
      fs: 'var(--text-xs)'
    },
    md: {
      h: 34,
      px: 14,
      fs: 'var(--text-sm)'
    },
    lg: {
      h: 40,
      px: 18,
      fs: 'var(--text-base)'
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      padding: 3,
      background: 'var(--surface-inset)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, norm.map(o => {
    const selected = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      role: "tab",
      "aria-selected": selected,
      onClick: () => onChange(o.value),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: s.h,
        padding: `0 ${s.px}px`,
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-sans)',
        fontSize: s.fs,
        fontWeight: selected ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        background: selected ? 'var(--surface-2)' : 'transparent',
        color: selected ? 'var(--text-primary)' : 'var(--text-tertiary)',
        boxShadow: selected ? 'var(--shadow-xs)' : 'none',
        cursor: 'pointer',
        transition: 'all var(--dur-fast) var(--ease-standard)',
        whiteSpace: 'nowrap'
      }
    }, o.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex'
      }
    }, o.icon), o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
/**
 * Vantage Select — compact filter dropdown used across the global filter bar.
 * Custom popover (not native) so it matches dark surfaces.
 */
function Select({
  options = [],
  value,
  onChange = () => {},
  placeholder = 'เลือก',
  label = null,
  size = 'md',
  disabled = false,
  width = 180,
  style = {}
}) {
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const sizes = {
    sm: 30,
    md: 36,
    lg: 42
  };
  const h = sizes[size] || sizes.md;
  const current = norm.find(o => o.value === value);
  React.useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      width,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      marginBottom: 5
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    onClick: () => setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      width: '100%',
      height: h,
      padding: '0 10px 0 12px',
      background: 'var(--surface-1)',
      border: `1px solid ${open ? 'var(--border-accent)' : 'var(--border-default)'}`,
      boxShadow: open ? '0 0 0 3px var(--accent-ring)' : 'none',
      borderRadius: 'var(--radius-md)',
      color: current ? 'var(--text-primary)' : 'var(--text-tertiary)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, current ? current.label : placeholder), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flex: '0 0 auto',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--dur-fast)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: 0,
      right: 0,
      zIndex: 'var(--z-overlay)',
      maxHeight: 280,
      overflowY: 'auto',
      padding: 4,
      background: 'var(--surface-2)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, norm.map(o => {
    const sel = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      onClick: () => {
        onChange(o.value);
        setOpen(false);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        width: '100%',
        padding: '8px 10px',
        border: 'none',
        textAlign: 'left',
        background: sel ? 'var(--accent-subtle)' : 'transparent',
        color: sel ? 'var(--accent-hover)' : 'var(--text-secondary)',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: sel ? 'var(--weight-medium)' : 'var(--weight-regular)'
      },
      onMouseEnter: e => {
        if (!sel) e.currentTarget.style.background = 'var(--surface-3)';
      },
      onMouseLeave: e => {
        if (!sel) e.currentTarget.style.background = 'transparent';
      }
    }, o.label, sel && /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })));
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
/**
 * Vantage DataTable — compact, dark data grid for rankings and detail views.
 * Columns describe alignment, width, and an optional render fn.
 */
function DataTable({
  columns = [],
  // [{ key, header, align?, width?, render?(row,i), numeric? }]
  rows = [],
  sortable = true,
  rowKey = (r, i) => i,
  onRowClick = null,
  stickyHeader = true,
  zebra = false,
  style = {}
}) {
  const [sort, setSort] = React.useState(null); // { key, dir }
  const [hover, setHover] = React.useState(null);
  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const col = columns.find(c => c.key === sort.key);
    if (!col) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sort.key],
        bv = b[sort.key];
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), 'th');
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sort, columns]);
  function toggleSort(key) {
    if (!sortable) return;
    setSort(s => s && s.key === key ? s.dir === 'desc' ? {
      key,
      dir: 'asc'
    } : null : {
      key,
      dir: 'desc'
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      overflowX: 'auto',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => {
    const isSorted = sort && sort.key === c.key;
    const alignRight = c.align === 'right' || c.numeric;
    return /*#__PURE__*/React.createElement("th", {
      key: c.key,
      onClick: () => c.sortable !== false && toggleSort(c.key),
      style: {
        position: stickyHeader ? 'sticky' : 'static',
        top: 0,
        zIndex: 1,
        textAlign: alignRight ? 'right' : c.align || 'left',
        width: c.width,
        padding: '10px 14px',
        background: 'var(--surface-2)',
        borderBottom: '1px solid var(--border-default)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--weight-semibold)',
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        color: isSorted ? 'var(--text-secondary)' : 'var(--text-tertiary)',
        cursor: sortable && c.sortable !== false ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        userSelect: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        justifyContent: alignRight ? 'flex-end' : 'flex-start'
      }
    }, c.header, isSorted && /*#__PURE__*/React.createElement("svg", {
      width: "10",
      height: "10",
      viewBox: "0 0 12 12",
      style: {
        transform: sort.dir === 'asc' ? 'rotate(180deg)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 8L2.5 4h7L6 8z",
      fill: "currentColor"
    }))));
  }))), /*#__PURE__*/React.createElement("tbody", null, sorted.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: rowKey(row, i),
    onClick: () => onRowClick && onRowClick(row, i),
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    style: {
      background: hover === i ? 'var(--surface-2)' : zebra && i % 2 ? 'var(--surface-1)' : 'transparent',
      cursor: onRowClick ? 'pointer' : 'default',
      transition: 'box-shadow var(--dur-fast)'
    }
  }, columns.map(c => {
    const alignRight = c.align === 'right' || c.numeric;
    return /*#__PURE__*/React.createElement("td", {
      key: c.key,
      style: {
        textAlign: alignRight ? 'right' : c.align || 'left',
        padding: '11px 14px',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: 'var(--text-sm)',
        fontFamily: c.numeric ? 'var(--font-numeric)' : 'var(--font-sans)',
        fontVariantNumeric: c.numeric ? 'tabular-nums' : 'normal',
        color: c.muted ? 'var(--text-tertiary)' : 'var(--text-primary)',
        whiteSpace: 'nowrap'
      }
    }, c.render ? c.render(row, i) : row[c.key]);
  }))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/DeltaBadge.jsx
try { (() => {
/**
 * Vantage DeltaBadge — directional growth indicator (▲ +12.4% / ▼ -3.1%).
 * Positive is green, negative red; "neutral" (≈0) is muted.
 * Set invert for metrics where down is good (e.g. ต้นทุน).
 */
function DeltaBadge({
  value = 0,
  format = 'percent',
  // 'percent' | 'number'
  size = 'md',
  showArrow = true,
  invert = false,
  suffix = '',
  style = {}
}) {
  const positive = value > 0;
  const negative = value < 0;
  const good = invert ? negative : positive;
  const bad = invert ? positive : negative;
  const color = good ? 'var(--positive)' : bad ? 'var(--negative)' : 'var(--text-tertiary)';
  const bg = good ? 'var(--positive-subtle)' : bad ? 'var(--negative-subtle)' : 'var(--surface-3)';
  const sizes = {
    sm: {
      h: 18,
      px: 6,
      fs: 'var(--text-2xs)',
      arrow: 8
    },
    md: {
      h: 22,
      px: 7,
      fs: 'var(--text-xs)',
      arrow: 9
    },
    lg: {
      h: 26,
      px: 9,
      fs: 'var(--text-sm)',
      arrow: 11
    }
  };
  const s = sizes[size] || sizes.md;
  const abs = Math.abs(value);
  const num = format === 'percent' ? `${abs.toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })}%` : abs.toLocaleString('en-US');
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      height: s.h,
      padding: `0 ${s.px}px`,
      borderRadius: 'var(--radius-sm)',
      background: bg,
      color,
      fontFamily: 'var(--font-numeric)',
      fontSize: s.fs,
      fontWeight: 'var(--weight-semibold)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, showArrow && (positive || negative) && /*#__PURE__*/React.createElement("svg", {
    width: s.arrow,
    height: s.arrow,
    viewBox: "0 0 12 12",
    fill: "none",
    style: {
      transform: negative ? 'rotate(180deg)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 2.5L10 8H2L6 2.5z",
    fill: "currentColor"
  })), positive ? '▲' : negative ? '▼' : '', num, suffix);
}
Object.assign(__ds_scope, { DeltaBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DeltaBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/InsightCard.jsx
try { (() => {
/**
 * Vantage InsightCard — a single AI-generated insight line for the Insight Engine.
 * Tone-coded left rail + icon; supports a drill action.
 */
function InsightCard({
  tone = 'info',
  // positive | negative | warning | info
  icon = null,
  title,
  detail = null,
  metric = null,
  // optional emphasized figure, e.g. "+18.4%"
  time = null,
  // e.g. "เรียลไทม์", "วันนี้"
  onClick = null,
  style = {}
}) {
  const tones = {
    positive: {
      c: 'var(--positive)',
      bg: 'var(--positive-subtle)'
    },
    negative: {
      c: 'var(--negative)',
      bg: 'var(--negative-subtle)'
    },
    warning: {
      c: 'var(--warning)',
      bg: 'var(--warning-subtle)'
    },
    info: {
      c: 'var(--info)',
      bg: 'var(--info-subtle)'
    }
  };
  const t = tones[tone] || tones.info;
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-start',
      padding: 'var(--space-3) var(--space-4)',
      background: hover && clickable ? 'var(--surface-2)' : 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderLeft: `2px solid ${t.c}`,
      borderRadius: 'var(--radius-md)',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'box-shadow var(--dur-fast)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-sm)',
      background: t.bg,
      color: t.c,
      flex: '0 0 auto',
      marginTop: 1
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-primary)',
      lineHeight: 'var(--leading-snug)'
    }
  }, title), metric && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: t.c,
      fontVariantNumeric: 'tabular-nums'
    }
  }, metric)), detail && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)',
      marginTop: 3,
      lineHeight: 'var(--leading-normal)'
    }
  }, detail)), time && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-disabled)',
      flex: '0 0 auto',
      whiteSpace: 'nowrap',
      marginTop: 2
    }
  }, time));
}
Object.assign(__ds_scope, { InsightCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/InsightCard.jsx", error: String((e && e.message) || e) }); }

// components/data/KpiCard.jsx
try { (() => {
/**
 * Vantage KpiCard — the executive metric tile.
 * Big tabular figure + label + optional delta(s) + sparkline slot.
 * Drill-down ready: pass onClick to make the whole tile a drill target.
 */
function KpiCard({
  label,
  value,
  unit = '',
  delta = null,
  // number → renders a DeltaBadge
  deltaSuffix = '',
  secondary = null,
  // e.g. { label: 'YoY', value: 8.2 }
  icon = null,
  spark = null,
  // ReactNode (e.g. <Sparkline/>)
  accent = false,
  // highlight tile (primary KPI)
  onClick = null,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      padding: 'var(--space-4) var(--space-5)',
      minHeight: 118,
      background: accent ? 'linear-gradient(180deg, var(--accent-subtle), var(--surface-1) 70%)' : 'var(--surface-1)',
      border: `1px solid ${hover && clickable ? 'var(--border-strong)' : accent ? 'rgba(56,139,253,0.30)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-lg)',
      boxShadow: hover && clickable ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hover && clickable ? 'translateY(-1px)' : 'none',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'all var(--dur-base) var(--ease-standard)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-secondary)',
      letterSpacing: 'var(--tracking-normal)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 26,
      height: 26,
      borderRadius: 'var(--radius-sm)',
      background: accent ? 'var(--accent-subtle)' : 'var(--surface-3)',
      color: accent ? 'var(--accent-hover)' : 'var(--text-tertiary)',
      flex: '0 0 auto'
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      flexWrap: 'nowrap',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontSize: String(value).length > 11 ? 'var(--text-lg)' : String(value).length > 5 ? 'var(--text-2xl)' : 'var(--text-3xl)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)',
      letterSpacing: 'var(--tracking-tight)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1.05,
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-tertiary)',
      fontWeight: 'var(--weight-medium)',
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 'auto'
    }
  }, delta !== null && /*#__PURE__*/React.createElement(__ds_scope.DeltaBadge, {
    value: delta,
    suffix: deltaSuffix,
    size: "sm"
  }), secondary && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, secondary.label), /*#__PURE__*/React.createElement(__ds_scope.DeltaBadge, {
    value: secondary.value,
    size: "sm",
    showArrow: false,
    style: {
      background: 'transparent',
      padding: 0
    }
  })), spark && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      flex: '0 0 auto'
    }
  }, spark)));
}
Object.assign(__ds_scope, { KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/data/RankBar.jsx
try { (() => {
/**
 * Vantage RankBar — a single ranked row with a proportional bar.
 * Used in Top-10 product/customer rankings. Bar width = value / max.
 */
function RankBar({
  rank,
  label,
  sublabel = null,
  value,
  // formatted string shown at the right
  ratio,
  // 0..1 fill proportion
  share = null,
  // optional % share string
  delta = null,
  // optional number for a small trend mark
  color = 'var(--viz-1)',
  onClick = null,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '26px 1fr auto',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: '8px 10px',
      borderRadius: 'var(--radius-md)',
      background: hover && clickable ? 'var(--surface-2)' : 'transparent',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'box-shadow var(--dur-fast)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      borderRadius: 'var(--radius-sm)',
      background: rank <= 3 ? 'var(--accent-subtle)' : 'var(--surface-3)',
      color: rank <= 3 ? 'var(--accent-hover)' : 'var(--text-tertiary)',
      fontFamily: 'var(--font-numeric)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      flex: '0 0 auto'
    }
  }, rank), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-primary)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)',
      flex: '0 0 auto'
    }
  }, sublabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-3)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${Math.max(2, Math.min(100, ratio * 100))}%`,
      height: '100%',
      borderRadius: 'var(--radius-full)',
      background: color,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), (share || delta !== null) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 6,
      marginTop: 2
    }
  }, share && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-tertiary)',
      fontFamily: 'var(--font-numeric)'
    }
  }, share), delta !== null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      fontFamily: 'var(--font-numeric)',
      fontWeight: 'var(--weight-semibold)',
      color: delta >= 0 ? 'var(--positive)' : 'var(--negative)'
    }
  }, delta >= 0 ? '+' : '−', Math.abs(delta).toFixed(2), "%"))));
}
Object.assign(__ds_scope, { RankBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/RankBar.jsx", error: String((e && e.message) || e) }); }

// Expose design-system components on __ds_ns early so screen sections can use them
Object.assign(__ds_ns, __ds_scope);

// ui_kits/dashboard/App.jsx
try { (() => {
/* Vantage dashboard app root → renders into #root.
   Load-order resilient: references shell/screen globals lazily and waits for
   all dependencies before mounting, so it works regardless of script order
   (e.g. when inlined/bundled into a single file). */
(function () {
  const SCREENS = {
    overview: {
      title: 'ภาพรวมผู้บริหาร',
      subtitle: 'Executive Sales Overview',
      comp: () => window.OverviewScreen,
      withProps: true
    },
    sales: {
      title: 'Sales Overview',
      subtitle: 'ยอดขายรวมต่อเดือน · เทียบ 2568',
      comp: () => window.SalesScreen
    },
    product: {
      title: 'Product Analysis',
      subtitle: 'วิเคราะห์สินค้าทั้งหมด',
      comp: () => window.ProductScreen
    },
    customer: {
      title: 'Customer Analysis',
      subtitle: 'วิเคราะห์ลูกค้าทั้งหมด',
      comp: () => window.CustomerScreen
    },
    contribution: {
      title: 'Customer Contribution',
      subtitle: 'Pareto Analysis · ความเสี่ยงการพึ่งพา',
      comp: () => window.ContributionScreen
    },
    mix: {
      title: 'Product Mix',
      subtitle: 'สัดส่วนยอดขายแต่ละสินค้า',
      comp: () => window.MixScreen
    },
    price: {
      title: 'Price Analysis',
      subtitle: 'Average Selling Price',
      comp: () => window.PriceScreen
    },
    year: {
      title: 'Year Comparison',
      subtitle: 'เปรียบเทียบ 2568 vs 2569 · YoY',
      comp: () => window.YearScreen
    },
    forecast: {
      title: 'Forecast',
      subtitle: 'AI Forecasting · คาดการณ์สิ้นปี',
      comp: () => window.ForecastScreen
    }
  };
  function App() {
    const Sidebar = window.Sidebar,
      TopBar = window.TopBar,
      FilterBar = window.FilterBar;
    const [active, setActive] = React.useState(() => localStorage.getItem('vantage.screen') || 'overview');
    const [theme, setTheme] = React.useState(() => localStorage.getItem('vantage.theme') || 'dark');
    const [collapsed, setCollapsed] = React.useState(false);
    var _mobileOpen = React.useState(false); var mobileOpen = _mobileOpen[0]; var setMobileOpen = _mobileOpen[1];
    const [filters, setFilters] = React.useState({
      year: '2569',
      month: 'all',
      customerGroup: 'all',
      product: 'all',
      granularity: 'month'
    });
    const scrollRef = React.useRef(null);
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('vantage.theme', theme);
    }, [theme]);
    const nav = id => {
      setActive(id);
      localStorage.setItem('vantage.screen', id);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    };
    const screen = SCREENS[active] || SCREENS.overview;
    const ScreenComp = screen.comp();

    // Defensive: never hand React an undefined element type (keeps console clean even
    // if a dependency is momentarily missing during a hot-reload re-evaluation).
    if (!Sidebar || !TopBar || !FilterBar || !ScreenComp) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-app)'
      }
    }, /*#__PURE__*/React.createElement(Sidebar, {
      'data-sidebar': true,
      className: mobileOpen ? 'open' : '',
      active: active,
      onNav: nav,
      collapsed: collapsed,
      onToggle: () => setCollapsed(c => !c)
    }), mobileOpen && /*#__PURE__*/React.createElement('div', {
      'data-sidebar-backdrop': true,
      onClick: function() { setMobileOpen(false); }
    }), /*#__PURE__*/React.createElement("div", {
      'data-main': true,
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(TopBar, {
      title: screen.title,
      subtitle: screen.subtitle,
      theme: theme,
      onTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
      onMenuToggle: function() { setMobileOpen(!mobileOpen); }
    }), /*#__PURE__*/React.createElement(FilterBar, {
      filters: filters,
      setFilters: setFilters
    }), /*#__PURE__*/React.createElement("main", {
      ref: scrollRef,
      style: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '22px',
        scrollBehavior: 'smooth'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--content-max)',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement(ScreenComp, {
      onDrill: nav,
      filters: filters
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 24
      }
    }), /*#__PURE__*/React.createElement("footer", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 2px',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-disabled)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "BWP \xB7 Best World Interplas \u2014 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07 \u0E21.\u0E04.\u2013\u0E1E.\u0E04. 2569 (\u0E40\u0E17\u0E35\u0E22\u0E1A 2568)"), /*#__PURE__*/React.createElement("span", null, "\u0E17\u0E35\u0E48\u0E21\u0E32: \u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22 69.xlsx"))))));
  }
  window.VantageApp = App;

  // Error boundary: a single screen crash shows a readable message + lets the user
  // switch screens, instead of leaving the whole app a black screen.
  if (!window.__BWP_ErrorBoundary) {
    class BWPErrorBoundary extends React.Component {
      constructor(p) { super(p); this.state = { err: null }; }
      static getDerivedStateFromError(err) { return { err: err }; }
      componentDidCatch(err, info) { try { console.error('BWP screen error:', err, info); } catch (e) {} }
      render() {
        if (!this.state.err) return this.props.children;
        var reset = () => { try { localStorage.setItem('vantage.screen', 'overview'); } catch (e) {} this.setState({ err: null }); location.reload(); };
        return React.createElement('div', { style: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b1220', color: '#cbd5e1', fontFamily: 'system-ui,sans-serif', padding: 24 } },
          React.createElement('div', { style: { maxWidth: 520, textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: '#fff' } }, 'หน้านี้แสดงผลไม่สำเร็จ'),
            React.createElement('div', { style: { fontSize: 13, margin: '10px 0 4px', color: '#94a3b8' } }, 'เกิดข้อผิดพลาดในการแสดงผลหน้าจอ — ลองกลับไปหน้าภาพรวม'),
            React.createElement('pre', { style: { fontSize: 11, color: '#f87171', whiteSpace: 'pre-wrap', textAlign: 'left', background: '#141d2e', borderRadius: 8, padding: 12, marginTop: 12, overflow: 'auto', maxHeight: 160 } }, String(this.state.err && (this.state.err.stack || this.state.err.message) || this.state.err)),
            React.createElement('button', { onClick: reset, style: { marginTop: 16, background: '#2563eb', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 600, padding: '10px 18px', cursor: 'pointer' } }, 'กลับหน้าภาพรวม')));
      }
    }
    window.__BWP_ErrorBoundary = BWPErrorBoundary;
  }

  // Mount once, only after every dependency global is ready (load-order safe).
  function ready() {
    return window.BWP_AUTHED && window.VDATA && window.VantageSalesIntelligenceDesignSystem_a75d0a && window.Icon && window.Sidebar && window.TopBar && window.FilterBar && window.OverviewScreen && window.SalesScreen && window.ProductScreen && window.CustomerScreen && window.ContributionScreen && window.MixScreen && window.PriceScreen && window.YearScreen && window.ForecastScreen;
  }
  function mount() {
    if (!ready()) {
      return setTimeout(mount, 25);
    }
    const el = document.getElementById('root');
    if (!el) {
      return setTimeout(mount, 25);
    }
    if (!el.__vroot) el.__vroot = ReactDOM.createRoot(el);
    el.__vroot.render(/*#__PURE__*/React.createElement(window.__BWP_ErrorBoundary, null, /*#__PURE__*/React.createElement(App, null)));
  }
  window.__BWP_REMOUNT = mount; // Supabase loader calls this after refreshing window.VDATA
  mount();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Common.jsx
try { (() => {
/* Shared helpers for dashboard screens → window.VUtil + small presentational components */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    Badge
  } = NS;
  const Icon = window.Icon;
  const fmt = {
    int: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    dec2: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    dec1: n => (!n || n <= 0) ? '—' : (Math.round(n * 100) / 100).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    money: n => Math.round(n * 1e6).toLocaleString('en-US') + ' บาท',
    m: n => (Math.round(n * 100) / 100).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + 'M',
    kg: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg',
    kgK: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg',
    kgM: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg',
    pct: n => (n >= 0 ? '+' : '−') + Math.abs(n == null ? 0 : n).toFixed(2) + '%'
  };

  // quarter aggregation of a 12-month series
  const toQuarters = arr => [0, 1, 2, 3].map(q => arr.slice(q * 3, q * 3 + 3).reduce((s, x) => s + x, 0));
  const QLABELS = ['Q1', 'Q2', 'Q3', 'Q4'];

  // Section title row
  function SectionTitle({
    icon,
    children,
    hint
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        marginBottom: 14
      }
    }, icon && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-tertiary)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 16
    })), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--text-lg)',
        fontWeight: 600,
        color: 'var(--text-primary)'
      }
    }, children), hint && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-disabled)'
      }
    }, hint));
  }

  // Small "drill" affordance shown on hoverable cards
  function DrillHint({
    label = 'คลิกเพื่อ Drill Down'
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-disabled)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "maximize",
      size: 11
    }), " ", label);
  }

  // grid helper
  function Grid({
    cols = 2,
    min = null,
    gap = 16,
    children,
    style = {}
  }) {
    const tpl = min ? `repeat(auto-fit, minmax(${min}px, 1fr))` : `repeat(${cols}, minmax(0,1fr))`;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: tpl,
        gap,
        ...style
      }
    }, children);
  }
  window.VUtil = {
    fmt,
    toQuarters,
    QLABELS
  };
  window.SectionTitle = SectionTitle;
  window.DrillHint = DrillHint;
  window.Grid = Grid;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Common.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/ScreensA.jsx
try { (() => {
/* Screens: Executive Overview + Sales Overview → window.{OverviewScreen, SalesScreen}
   Data: BWP real sales ม.ค.–พ.ค. 2569 (เทียบ 2568). Value=ล้านบาท, Volume=พัน Kg. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    KpiCard,
    DeltaBadge,
    RankBar,
    InsightCard,
    LineChart,
    DonutChart,
    Sparkline,
    SegmentedControl,
    Badge
  } = NS;
  const Icon = window.Icon;
  const {
    fmt
  } = window.VUtil;
  const {
    DrillHint,
    Grid
  } = window;
  const D = window.VDATA;
  const NACT = D.NACT;
  // Derive a filtered VDATA-shaped view from the top filter bar selections, so screens
  // change with the year/month/customer/product filters. Keeps the same shape (years
  // keyed 2569/2568, MONTHS_ACT, NACT, KPIS, totals, PRODUCTS, CUSTOMERS) so screen
  // bodies need no edits beyond shadowing `D`/`NACT` with the view.
  function viewFor(f) {
    const D = window.VDATA;
    f = f || {};
    const rnd = (x, d) => { const p = Math.pow(10, d); return Math.round(x * p) / p; };
    const sum = (a) => a.reduce((s, x) => s + (x || 0), 0);
    const curY = String(f.year || '2569');
    const cmpY = String(parseInt(curY) - 1);
    let vCur = D.valueByYear[curY] || D.valueByYear['2569'] || [];
    let kCur = D.volumeByYear[curY] || D.volumeByYear['2569'] || [];
    let vCmp = D.valueByYear[cmpY] || [];
    let kCmp = D.volumeByYear[cmpY] || [];
    // product filter: narrow the headline value/volume series to a single product
    const prodId = f.product;
    if (prodId && prodId !== 'all') {
      const P = (D.PRODUCTS || []).find((p) => p.id === prodId);
      if (P) {
        vCur = (P.monthly || []).map((v) => (v == null ? null : v));          // value (บาท) per month
        kCur = (P.monthly || []).map((v, i) => {                              // volume (พัน Kg) per month
          const pr = (P.priceMonthly || [])[i];
          return v == null ? null : (pr ? rnd(v / pr / 1000, 1) : 0);
        });
        vCmp = []; kCmp = []; // no per-product prior-year data → no YoY baseline
      }
    }
    let n = 0; for (let i = 0; i < 12; i++) { if (vCur[i] != null && +vCur[i] > 0) n = i + 1; else break; }
    const _isAllM = f.month == null || f.month === 'all' || f.month === '';
    const _selIdx = _isAllM ? [] : String(f.month).split(',').map(Number).filter((i) => !isNaN(i) && i >= 0 && i < 12).sort((a, b) => a - b);
    const single = _selIdx.length === 1;
    const mi = single ? _selIdx[0] : -1;
    const idxs = _isAllM ? Array.from({ length: n }, (_, i) => i) : _selIdx;
    const pick = (arr) => idxs.map((i) => arr[i]);
    const sumVal = sum(pick(vCur)), sumVol = sum(pick(kCur));
    const sumValC = sum(pick(vCmp)), sumVolC = sum(pick(kCmp));
    const price = sumVol ? sumVal / (sumVol * 1000) : 0;
    const priceC = sumVolC ? sumValC / (sumVolC * 1000) : 0;
    const momVal = single ? (mi >= 1 && vCur[mi - 1] != null && vCur[mi - 1] !== 0 ? rnd((vCur[mi] - vCur[mi - 1]) / vCur[mi - 1] * 100, 1) : null) : D.totals.momVal;
    const momVol = single ? (mi >= 1 && kCur[mi - 1] != null && kCur[mi - 1] !== 0 ? rnd((kCur[mi] - kCur[mi - 1]) / kCur[mi - 1] * 100, 1) : null) : D.totals.momKg;
    const yoy = (a, b) => b ? rnd((a - b) / b * 100, 1) : 0;
    const cg = f.customerGroup;
    const reslice = (arr) => idxs.map((i) => (arr || [])[i] || 0);
    // select year-appropriate product/customer source (hist years use customersByYear/productsByYear)
    const _yrSrc = (curY !== '2569' && D.productsByYear && D.productsByYear[curY]) ? curY : '2569';
    const _prodSrc = _yrSrc !== '2569' ? (D.productsByYear[_yrSrc] || D.PRODUCTS || []) : (D.PRODUCTS || []);
    const _custSrc = _yrSrc !== '2569' ? (D.customersByYear && D.customersByYear[_yrSrc] || []) : ((D.allCustomers && D.allCustomers.length) ? D.allCustomers : D.CUSTOMERS);
    // when product filter applies to hist year, remap vCur/kCur to that product's monthly series
    if (prodId && prodId !== 'all' && _yrSrc !== '2569') {
      const _Phist = _prodSrc.find((p) => p.id === prodId);
      if (_Phist) {
        vCur = (_Phist.monthly || []).map((v) => (v == null ? null : v));
        kCur = (_Phist.monthly || []).map((v, i) => { const pr = (_Phist.priceMonthly || [])[i]; return v == null ? null : (pr ? rnd(v / pr / 1000, 1) : 0); });
      }
    }
    // products: merge duplicate names → 1 ประเภท, filter, re-slice monthly, recompute val/share
    const _pByName = {};
    _prodSrc.forEach((p) => {
      const key = (p.name || '').trim();
      if (!_pByName[key]) { _pByName[key] = Object.assign({}, p, { monthly: (p.monthly || []).slice(), kg: p.kg || 0 }); }
      else { const t = _pByName[key].monthly, s = p.monthly || []; for (let i = 0; i < s.length; i++) t[i] = (t[i] || 0) + (s[i] || 0); _pByName[key].kg += (p.kg || 0); }
    });
    let prods = Object.keys(_pByName).map((k) => _pByName[k]);
    if (prodId && prodId !== 'all') prods = prods.filter((p) => p.id === prodId);
    prods = prods.map((p) => {
      const m = reslice(p.monthly);
      const mPr = reslice(p.priceMonthly || []);
      const kgSlice = m.map((v, i) => mPr[i] ? Math.round(v / mPr[i]) : 0);
      const kg = kgSlice.reduce((s, k) => s + k, 0);
      return Object.assign({}, p, { monthly: m, val: rnd(sum(m), 1), kg: kg });
    });
    const totP = sum(prods.map((p) => p.val));
    prods = prods.map((p) => Object.assign({}, p, { share: totP ? rnd(p.val / totP * 100, 1) : 0 }));
    // customers: re-slice monthly to selected months, recompute kg/share/mom; filter by selected customer
    const remapCust = (list) => {
      // merge duplicate customer names (same buyer entered as multiple rows) → 1 ราย
      const byName = {};
      (list || []).forEach((c) => {
        const key = (c.name || '').trim();
        if (!byName[key]) { byName[key] = Object.assign({}, c, { monthly: (c.monthly || []).slice() }); }
        else { const t = byName[key].monthly, s = c.monthly || []; for (let i = 0; i < s.length; i++) t[i] = (t[i] || 0) + (s[i] || 0); }
      });
      let out = Object.keys(byName).map((k) => byName[k]).map((c) => {
        const m = reslice(c.monthly);
        const kg = Math.round(sum(m));
        const L = m.length;
        const mom = L >= 2 && m[L - 2] ? rnd((m[L - 1] / m[L - 2] - 1) * 100, 1) : 0;
        return Object.assign({}, c, { monthly: m, kg: kg, mom: mom });
      }).filter((c) => c.kg > 0);
      const tot = sum(out.map((c) => c.kg)) || 1;
      out = out.map((c) => Object.assign({}, c, { share: rnd(c.kg / tot * 100, 1) }));
      out.sort((a, b) => b.kg - a.kg);
      return out;
    };
    let allC = remapCust(_custSrc);
    if (cg && cg !== 'all') {
      const selName = (D.CUSTOMERS.find((c) => c.id === cg) || {}).name;
      if (selName) allC = allC.filter((c) => c.name === selName);
    }
    let custs = allC.slice(0, 10).map((c, i) => Object.assign({ id: 'c' + (i + 1) }, c));
    const custTotalKg = sum(allC.map((c) => c.kg));
    let cum = 0, top3 = 0, top5 = 0;
    allC.forEach((c, i) => { cum += c.share; if (i === 2) top3 = rnd(cum, 1); if (i === 4) top5 = rnd(cum, 1); });
    if (allC.length < 3) top3 = rnd(cum, 1);
    if (allC.length < 5) top5 = rnd(cum, 1);
    // when customer filter active: rescale value/volume proportionally from customer Kg
    let _sv = sumVal, _sk = sumVol, _pr = price;
    if (cg && cg !== 'all' && allC.length > 0 && sumVol > 0) {
      _sk = allC.reduce((s, c) => s + c.kg, 0) / 1000; // Kg → พัน Kg
      _sv = rnd(sumVal * (_sk / sumVol), 4);
      _pr = _sk ? rnd(_sv / (_sk * 1000), 2) : 0;
    }
    var _tgtMode = D.targetMode === 'kg' ? 'kg' : 'value';
    var _tgt = 0, _hasT = false, _tgtKg = 0, _hasTKg = false;
    (D.targets || []).forEach(function(t, i){ if(idxs.indexOf(i) >= 0 && t != null){ _tgt += t; _hasT = true; } });
    (D.targetsKg || []).forEach(function(t, i){ if(idxs.indexOf(i) >= 0 && t != null){ _tgtKg += t; _hasTKg = true; } });
    var _achv;
    if (_tgtMode === 'kg') {
      _achv = (_hasTKg && _tgtKg > 0) ? rnd(_sk * 1000 / _tgtKg * 100, 1)
            : (_hasT && _tgt > 0) ? rnd(_sv / _tgt * 100, 1) : null;
    } else {
      _achv = (_hasT && _tgt > 0) ? rnd(_sv / _tgt * 100, 1)
            : (_hasTKg && _tgtKg > 0) ? rnd(_sk * 1000 / _tgtKg * 100, 1) : null;
    }
    const patch = {
      value: { value: Math.round(_sv).toLocaleString('en-US'), delta: momVal, yoy: yoy(_sv, sumValC) },
      volume: { value: Math.round(_sk * 1000).toLocaleString('en-US'), delta: momVol, yoy: yoy(_sk, sumVolC) },
      price: { value: _pr.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}), yoy: yoy(_pr, priceC) },
      customers: { value: String(allC.length) },
      products: { value: String(prods.filter(p => p.val > 0 || p.kg > 0).length) },
      target: { value: _achv != null ? _achv.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1}) : '—', unit: _achv != null ? '%' : 'ไม่มีเป้า' },
    };
    const KPIS = D.KPIS.map((k) => Object.assign({}, k, patch[k.id] || {}));
    const labels = idxs.map((i) => D.TH_MONTHS[i]);
    const priceArr = idxs.map((i) => kCur[i] ? rnd(vCur[i] / (kCur[i] * 1000), 1) : 0);
    // per-month customer series for charts when customer filter is active
    const _custMonKg = (cg && cg !== 'all' && allC.length > 0)
      ? idxs.map((_, j) => allC.reduce((s, c) => s + ((c.monthly || [])[j] || 0), 0) / 1000)
      : null;
    const _vCur69 = _custMonKg ? _custMonKg.map((k, j) => kCur[idxs[j]] ? rnd(pick(vCur)[j] * (k / kCur[idxs[j]]), 2) : 0) : pick(vCur);
    const _kCur69 = _custMonKg ? _custMonKg : pick(kCur);
    // recompute forecast for filtered view (run-rate base + linear trend, last 3 months)
    const _fNACT = idxs.length;
    const _f3v = _vCur69.slice(Math.max(0, _fNACT-3), _fNACT).filter(v => v != null && +v > 0);
    const _fBase = _f3v.length ? _f3v.reduce((s,v)=>s+(+v),0)/_f3v.length : (_fNACT ? _vCur69.reduce((s,v)=>s+(+v||0),0)/_fNACT : 0);
    const _fSlope = _f3v.length >= 2 ? (_f3v[_f3v.length-1] - _f3v[0]) / Math.max(1, _f3v.length-1) : 0;
    const _fProjVal = Array.from({length: 12}, (_, fi) => {
      if (fi < _fNACT) return +(_vCur69[fi] == null ? 0 : +_vCur69[fi]).toFixed(2);
      const ahead = fi - _fNACT + 1;
      return +Math.max(0, _fBase + _fSlope * ahead).toFixed(2);
    });
    const _fYearEndVal = Math.round(_fProjVal.reduce((s,v)=>s+v,0));
    const _fTotalKg = _kCur69.reduce((s,v)=>s+(+v||0),0);
    const _fYearEndKg = rnd((_fTotalKg + (_fNACT ? _fTotalKg/_fNACT : 0) * (12 - _fNACT)) / 1000, 2);
    const _forecast = { yearEndVal: _fYearEndVal, yearEndVolKg: _fYearEndKg, projVal: _fProjVal, actualMonths: _fNACT, confidence: Math.min(95, Math.round(50 + _fNACT * 8)) };
    return Object.assign({}, D, {
      NACT: idxs.length,
      MONTHS_ACT: labels,
      valueByYear: Object.assign({}, D.valueByYear, { 2569: _vCur69, 2568: pick(vCmp) }),
      volumeByYear: Object.assign({}, D.volumeByYear, { 2569: _kCur69, 2568: pick(kCmp) }),
      price69: priceArr,
      forecast: _forecast,
      KPIS: KPIS,
      PRODUCTS: prods,
      CUSTOMERS: custs,
      allCustomers: allC,
      custTotalKg: custTotalKg,
      nCustomers: allC.length,
      totals: Object.assign({}, D.totals, { value: Math.round(_sv), volume: Math.round(_sk * 1e3), avgPrice: rnd(_pr, 1), top3: top3, top5: top5, yoyVal: yoy(_sv, sumValC), yoyKg: yoy(_sk, sumVolC), momVal: momVal, momKg: momVol }),
    });
  }
  const KPI_DRILL = {
    volume: 'sales',
    value: 'sales',
    price: 'price',
    customers: 'customer',
    products: 'product',
    orders: 'sales'
  };
  const prodGrowth = p => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(2) : 0;

  function KpiRow({
    onDrill,
    filters
  }) {
    const D = viewFor(filters);
    return /*#__PURE__*/React.createElement(Grid, {
      min: 150,
      gap: 12,
      style: {
        marginBottom: 18
      }
    }, D.KPIS.map(k => /*#__PURE__*/React.createElement(KpiCard, {
      key: k.id,
      label: k.label,
      value: k.id === 'volume' ? D.totals.volume.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}) : k.id === 'value' ? D.totals.value.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}) : k.value,
      unit: k.id === 'volume' ? 'Kg' : k.id === 'value' ? 'บาท' : k.unit,
      delta: k.delta,
      deltaSuffix: " MoM",
      secondary: k.yoy ? {
        label: 'YoY',
        value: k.yoy
      } : null,
      accent: k.accent,
      spark: /*#__PURE__*/React.createElement(Sparkline, {
        data: k.spark,
        color: k.color,
        width: 70,
        height: 26
      }),
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: k.id === 'value' ? 'dollar-sign' : k.id === 'volume' ? 'box' : k.id === 'price' ? 'tag' : k.id === 'customers' ? 'users' : k.id === 'products' ? 'package' : 'file-text',
        size: 15
      }),
      onClick: () => onDrill(KPI_DRILL[k.id])
    })));
  }
  function OverviewScreen({
    onDrill,
    filters
  }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const prodGrowth = p => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(2) : 0;
    const labels = D.MONTHS_ACT;
    const _curY = String((filters && filters.year) || '2569');
    const _cmpY = String(parseInt(_curY) - 1);
    const val69 = (D.valueByYear[2569] || []).slice(0, NACT);
    const val68 = (D.valueByYear[2568] || []).slice(0, NACT);
    const vol69 = (D.volumeByYear[2569] || []).slice(0, NACT);
    const prodByVal = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const custByKg = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    const _gc = D.CUSTOMERS.length > 0 ? D.CUSTOMERS.slice().sort((a, b) => b.mom - a.mom)[0] : null;
    // ---- ตัวช่วยสร้าง insight จากค่าจริง (กันข้อมูลไม่พอ + เลิก hardcode) ----
    // ตัดคำนำหน้า/ลงท้ายนิติบุคคล ให้เหลือชื่อจริงที่สื่อความหมาย (กัน split() เหลือแต่ "บริษัท")
    const _short = nm => !nm ? '—' : (nm
      .replace(/^(บริษัท|ห้างหุ้นส่วนจำกัด|หจก\.|บจก\.)\s*/, '')
      .replace(/\s*จำกัด\s*\(มหาชน\)\s*$/, '')
      .replace(/\s*จำกัด\s*$/, '').trim() || nm);
    // เงื่อนไขกันข้อมูลไม่พอ (รู้จักตัวกรองเดือน):
    //  • _single = ผู้ใช้เลือกกรอง "เดือนเดียว"  •  _mi = ดัชนีเดือนที่เลือก (0-based)
    //  • _canMoM  = เทียบเดือนต่อเดือนได้ไหม → มุมมองหลายเดือนต้องมี ≥2 เดือน,
    //               ถ้าเลือกเดือนเดียวก็เทียบกับเดือนก่อนหน้าได้ (ตราบใดที่ไม่ใช่เดือนแรกสุด)
    //  • _canTrend = ดูแนวโน้ม/การเติบโตหลายเดือนได้ไหม → ต้องมีหลายจุดในมุมมอง (ไม่ใช่เดือนเดียว)
    const _selMonArr = filters && filters.month != null && filters.month !== 'all' && filters.month !== '' ? String(filters.month).split(',').map(Number).filter((x) => !isNaN(x)) : [];
    const _single = _selMonArr.length === 1;
    const _mi = _single ? _selMonArr[0] : -1;
    const _mName = (_single && D.TH_MONTHS) ? D.TH_MONTHS[_mi] : '';
    const _vArr = (D.valueByYear || {})[String((filters && filters.year) || '2569')] || [];
    const _momVal = _single
      ? (_mi >= 1 && _vArr[_mi - 1] != null && _vArr[_mi - 1] !== 0 ? D.totals.momVal : null)
      : D.totals.momVal;
    const _canMoM = (_single ? (_mi >= 1) : (NACT >= 2)) && _momVal != null;
    const _canTrend = NACT >= 2;  // มุมมองเดือนเดียว NACT=1 → ดูแนวโน้มไม่ได้โดยอัตโนมัติ
    // ฟอร์แมตราคา ฿/Kg อย่างปลอดภัย — ไม่มีค่าให้คืน "—" ไม่ใช่ 0
    const _fp = v => (v != null && v > 0) ? v.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) : '—';
    const _priceArr = (D.price69 || []).slice(0, NACT).filter(p => p != null && p > 0);
    const _pNow = _priceArr.length ? _priceArr[_priceArr.length - 1] : null;
    const _pFirst = _priceArr.length ? _priceArr[0] : null;
    const _pChg = (_canTrend && _pFirst) ? (_pNow / _pFirst - 1) * 100 : null;  // เปลี่ยนแปลงราคารวม (%)
    let _upStreak = 0;  // จำนวนเดือนที่ราคาขึ้น "ติดกัน" จากเดือนล่าสุดย้อนกลับ
    for (let i = _priceArr.length - 1; i > 0; i--) { if (_priceArr[i] > _priceArr[i - 1]) _upStreak++; else break; }
    // ส่วนต่างมูลค่าเป็นบาท (เดือนปัจจุบัน − เดือนก่อนหน้า) — ดึงจากซีรีส์เต็มใน VDATA (ลบ. → ×1e6)
    // เพราะมุมมองเดือนเดียวใน D ถูกตัดเหลือเดือนเดียว จึงไม่มีเดือนก่อนให้เทียบ
    const _vFull = ((window.VDATA || {}).valueByYear || {})[String((filters && filters.year) || '2569')] || [];
    const _curIdx = _single ? _mi : (NACT - 1);
    const _prevIdx = _curIdx - 1;
    const _curBaht = (_vFull[_curIdx] != null) ? _vFull[_curIdx] : null;
    const _prevBaht = (_prevIdx >= 0 && _vFull[_prevIdx] != null) ? _vFull[_prevIdx] : null;
    const _diffBaht = (_curBaht != null && _prevBaht != null) ? (_curBaht - _prevBaht) : null;
    const _diffStr = _diffBaht == null ? '' :
      ((_diffBaht >= 0 ? 'เพิ่มขึ้น ' : 'ลดลง ') + fmt.int(Math.abs(_diffBaht)) + ' บาท จากเดือนก่อน');

    // 1) มูลค่าขายเดือน (MoM) — เทียบได้เมื่อ _canMoM, ไม่งั้นขึ้น "—" พร้อมหมายเหตุตามบริบท
    const _mom = _momVal;
    const _i1 = _canMoM
      ? { tone: _mom > 0 ? 'positive' : _mom < 0 ? 'negative' : 'info',
          icon: _mom > 0 ? 'trending-up' : _mom < 0 ? 'trending-down' : 'activity',
          title: (_single ? `มูลค่าขาย ${_mName} ` : 'มูลค่าขายเดือนล่าสุด') + (_mom > 0 ? 'เพิ่มขึ้น' : _mom < 0 ? 'ลดลง' : 'ทรงตัว'),
          metric: fmt.pct(_mom),
          detail: (_diffStr ? _diffStr + ' · ' : '') + `ราคาเฉลี่ย ${_fp(_pNow)} ฿/Kg`,
          time: _single ? _mName : 'ล่าสุด' }
      : { tone: 'info', icon: 'clock', title: _single ? `มูลค่าขาย ${_mName}` : 'มูลค่าขายเดือนล่าสุด', metric: '—',
          detail: _single
            ? `${_mName} เป็นเดือนแรก ยังไม่มีเดือนก่อนให้เทียบ · ราคาเฉลี่ย ${_fp(_pNow)} ฿/Kg`
            : `มีข้อมูลเดือนเดียว ยังเทียบเดือนก่อนไม่ได้ (ต้องมี ≥2 เดือน) · ราคาเฉลี่ย ${_fp(_pNow)} ฿/Kg`,
          time: 'ข้อมูลไม่พอ' };

    // 2) การพึ่งพาลูกค้ารายใหญ่ (Top 3) — แบ่งระดับตามส่วนแบ่งจริง + กรณีไม่มีข้อมูลลูกค้า
    const _t3 = D.totals.top3;
    const _hasCust = D.CUSTOMERS.length > 0 && _t3 > 0;
    const _i2 = !_hasCust
      ? { tone: 'info', icon: 'users', title: 'ยังไม่มีข้อมูลลูกค้า', metric: '—',
          detail: 'ยังไม่มีข้อมูลการซื้อรายลูกค้าให้วิเคราะห์การกระจุกตัว', time: '—' }
      : { tone: _t3 >= 70 ? 'warning' : _t3 >= 40 ? 'info' : 'positive',
          icon: _t3 >= 70 ? 'alert-triangle' : 'users',
          title: _t3 >= 70 ? 'พึ่งพาลูกค้ารายใหญ่สูงมาก' : _t3 >= 40 ? 'พึ่งพาลูกค้ารายใหญ่ปานกลาง' : 'ฐานลูกค้ากระจายตัวดี',
          metric: _t3.toFixed(2) + '%',
          detail: `Top 3 ลูกค้า (${D.CUSTOMERS.slice(0, 3).map(c => _short(c.name)).join(', ')}) สร้างยอด ${_t3.toFixed(2)}% ของปริมาณ`,
          time: _t3 >= 70 ? 'เฝ้าระวัง' : 'ภาพรวม' };

    // 3) ลูกค้าโตเด่น — ต้องมุมมองหลายเดือนจึงจัดอันดับการเติบโตได้ (เดือนเดียวคำนวณ MoM รายลูกค้าไม่ได้)
    const _i3 = (!_canTrend || !_gc)
      ? { tone: 'info', icon: 'clock', title: 'ลูกค้าโตเด่น', metric: '—',
          detail: _single
            ? 'เลือกดูเดือนเดียว · ดูการเติบโตรายลูกค้าได้ในมุมมองหลายเดือน'
            : (!_canTrend ? 'ต้องมีข้อมูลอย่างน้อย 2 เดือนจึงดูการเติบโตได้' : 'ยังไม่มีข้อมูลลูกค้าให้จัดอันดับ'),
          time: _single ? 'เลือกเดือนเดียว' : 'ข้อมูลไม่พอ' }
      : (_gc.mom > 0
          ? { tone: 'positive', icon: 'arrow-up', title: `ลูกค้าโตเด่น: ${_short(_gc.name)}`,
              metric: fmt.pct(_gc.mom), detail: `ปริมาณสั่งซื้อเดือนล่าสุดเพิ่มขึ้น ${fmt.pct(_gc.mom)} จากเดือนก่อน`, time: 'เดือนนี้' }
          : { tone: 'info', icon: 'activity', title: 'การเติบโตของลูกค้า', metric: fmt.pct(_gc.mom),
              detail: 'ยังไม่มีลูกค้าที่ปริมาณสั่งซื้อเพิ่มขึ้นจากเดือนก่อน', time: 'เดือนนี้' });

    // 4) ราคาขายเฉลี่ย — ปรับขึ้น/ลง/ทรงตัว ตามค่าจริง ("ต่อเนื่อง" ใช้เมื่อขึ้นติดกัน ≥2 เดือน)
    const _i4 = !_canTrend
      ? { tone: 'info', icon: 'tag', title: 'ราคาขายเฉลี่ย', metric: '—',
          detail: _single
            ? `เลือกดู ${_mName} · ราคาเฉลี่ย ${_fp(D.totals.avgPrice)} ฿/Kg (ดูแนวโน้มได้ในมุมมองหลายเดือน)`
            : `ราคาเฉลี่ย ${_fp(D.totals.avgPrice)} ฿/Kg (ข้อมูลเดือนเดียว ยังดูแนวโน้มไม่ได้)`, time: _single ? _mName : '1 เดือน' }
      : { tone: _pChg > 0 ? 'positive' : _pChg < 0 ? 'negative' : 'info', icon: 'activity',
          title: _pChg > 0 ? (_upStreak >= 2 ? 'ราคาขายเฉลี่ยปรับขึ้นต่อเนื่อง' : 'ราคาขายเฉลี่ยปรับขึ้น')
               : _pChg < 0 ? 'ราคาขายเฉลี่ยปรับลง' : 'ราคาขายเฉลี่ยทรงตัว',
          metric: _pChg != null ? fmt.pct(_pChg) : '—',
          detail: `เฉลี่ย ${NACT} เดือน ${_fp(D.totals.avgPrice)} ฿/Kg`, time: `${NACT} เดือน` };

    const INSIGHTS = NACT === 0 ? [] : [_i1, _i2, _i3, _i4];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KpiRow, {
      onDrill: onDrill,
      filters: filters
    }), /*#__PURE__*/React.createElement(Grid, {
      cols: 3,
      gap: 16,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: 'span 2'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17) \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (\u0E1E\u0E31\u0E19 Kg) \xB7 ${D.MONTHS_ACT[0]}\u2013${D.MONTHS_ACT[NACT-1]} 2569`,
      actions: /*#__PURE__*/React.createElement("button", {
        onClick: () => onDrill('sales'),
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          background: 'none',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-secondary)',
          padding: '5px 10px',
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-sans)',
          cursor: 'pointer'
        }
      }, "\u0E14\u0E39\u0E40\u0E15\u0E47\u0E21 ", /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        size: 13
      }))
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 250,
      labels: labels,
      yFormat: v => fmt.dec1(v / 1e6),
      series: [{
        name: `มูลค่า ${_curY} (บาท)`,
        data: val69.map(v => v == null ? null : Math.round(v)),
        color: 'var(--viz-1)',
        type: 'bar'
      }, {
        name: `ปริมาณ ${_curY} (Kg)`,
        data: vol69.map(v => v == null ? null : Math.round(v * 1000)),
        color: 'var(--viz-2)',
        type: 'line',
        axis: 'right'
      }, {
        name: `มูลค่า ${_cmpY} (บาท)`,
        data: val68.map(v => v == null ? null : Math.round(v)),
        color: 'var(--slate-400)',
        type: 'line'
      }]
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "AI Insight Engine",
      subtitle: "\u0E2A\u0E23\u0E38\u0E1B\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07",
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "accent",
        variant: "soft",
        dot: true
      }, "Live"),
      bodyStyle: {
        padding: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, INSIGHTS.map((it, i) => /*#__PURE__*/React.createElement(InsightCard, {
      key: i,
      tone: it.tone,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: it.icon,
        size: 15
      }),
      title: it.title,
      metric: it.metric,
      detail: it.detail,
      time: it.time,
      onClick: () => {}
    }))))), /*#__PURE__*/React.createElement(Grid, {
      cols: 3,
      gap: 16
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Top \u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32",
      subtitle: "\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 (Kg)",
      actions: /*#__PURE__*/React.createElement(DrillHint, null),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, [...D.PRODUCTS].sort((a,b)=>b.kg-a.kg).map((p, i, _sp) => /*#__PURE__*/React.createElement(RankBar, {
      key: p.id,
      rank: i + 1,
      label: p.name,
      value: fmt.int(p.kg) + ' Kg',
      ratio: _sp.length ? p.kg / _sp[0].kg : 0,
      share: p.share.toFixed(2) + '%',
      delta: prodGrowth(p),
      color: "var(--viz-1)",
      onClick: () => onDrill('product')
    }))), /*#__PURE__*/React.createElement("div", { style: { gridColumn: 'span 2' } }, /*#__PURE__*/React.createElement(Card, {
      title: "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32",
      subtitle: "\u0E08\u0E31\u0E14\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg) \u00B7 \u0E41\u0E2A\u0E14\u0E07\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)",
      actions: /*#__PURE__*/React.createElement(DrillHint, null),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, [...(D.allCustomers||D.CUSTOMERS)].sort((a,b)=>b.kg-a.kg).slice(0,10).map((c, i, _sc) => /*#__PURE__*/React.createElement(RankBar, {
        key: c.name + i,
        rank: i + 1,
        label: c.name,
        sublabel: fmt.int(c.kg * (D.totals.avgPrice || 0)) + ' \u0E1A\u0E32\u0E17',
        value: fmt.int(c.kg) + ' Kg',
        ratio: _sc.length ? c.kg / _sc[0].kg : 0,
        share: c.share.toFixed(2) + '%',
        delta: c.mom,
        color: "var(--viz-4)",
        onClick: () => onDrill('customer')
      }))))));
  }
  function SalesScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const [gran, setGran] = React.useState('month');
    const [type, setType] = React.useState('combo');
    const labels = gran === 'year' ? D.YEARS.map(String) : D.MONTHS_ACT;
    let series;
    if (gran === 'year') {
      // 5-month comparable totals per year
      const v = D.YEARS.map(y => D.sum(D.valueByYear[y].slice(0, NACT)));
      series = [{
        name: `มูลค่า ${NACT} เดือน (ลบ.)`,
        data: v.map(x => x == null ? null : Math.round(x)),
        color: 'var(--viz-1)',
        type: 'bar'
      }];
    } else if (type === 'combo') {
      series = [{
        name: 'มูลค่า (บาท)',
        data: D.valueByYear[2569].slice(0, NACT).map(v => v == null ? null : Math.round(v)),
        color: 'var(--viz-1)',
        type: 'bar'
      }, {
        name: 'ปริมาณ (Kg)',
        data: D.volumeByYear[2569].slice(0, NACT).map(v => v == null ? null : Math.round(v * 1000)),
        color: 'var(--viz-2)',
        type: 'line',
        axis: 'right'
      }];
    } else {
      series = D.YEARS.map((y, i) => ({
        name: 'มูลค่า ' + y + ' (บาท)',
        data: D.valueByYear[y].slice(0, NACT).map(v => v == null ? null : Math.round(v)),
        color: i === D.YEARS.length - 1 ? 'var(--viz-1)' : 'var(--slate-400)',
        type: type === 'area' && i === D.YEARS.length - 1 ? 'area' : 'line'
      }));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 ${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19`,
      value: fmt.dec2(D.totals.value),
      unit: "\u0E1A\u0E32\u0E17",
      delta: D.totals.yoyVal,
      deltaSuffix: " YoY",
      accent: true
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 ${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19`,
      value: fmt.kgM(D.totals.volume),
      unit: "",
      delta: D.totals.yoyKg,
      deltaSuffix: " YoY"
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19",
      value: fmt.int(D.totals.value / NACT),
      unit: "\u0E1A\u0E32\u0E17",
      delta: D.totals.momVal
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
      value: (() => { const arr = (D.valueByYear[2569] || []).slice(0, NACT); const vals = arr.filter(v => v != null); const mx = vals.length ? Math.max(...vals) : 0; const idx = mx > 0 ? arr.indexOf(mx) : -1; return idx >= 0 ? (D.MONTHS_ACT[idx] || '\u2014') : '\u2014'; })(),
      unit: (() => { const arr = (D.valueByYear[2569] || []).slice(0, NACT).filter(v => v != null); return arr.length && NACT > 0 ? fmt.int(Math.max(0, ...arr)) + ' \u0E1A\u0E32\u0E17' : '\u2014 \u0E1A\u0E32\u0E17'; })(),
      delta: D.totals.momVal
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21 \u2014 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 2568 vs 2569",
      subtitle: `${D.MONTHS_ACT[0]}\u2013${D.MONTHS_ACT[NACT-1]} (${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07)`,
      actions: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: type,
        onChange: setType,
        options: [{
          value: 'multi',
          label: 'Multi-Line'
        }, {
          value: 'combo',
          label: 'Combo'
        }, {
          value: 'area',
          label: 'Area'
        }]
      }), /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: gran,
        onChange: setGran,
        options: [{
          value: 'month',
          label: 'รายเดือน'
        }, {
          value: 'year',
          label: 'รายปี'
        }]
      }))
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 340,
      labels: labels,
      yFormat: v => fmt.dec1(v / 1e6),
      showDots: gran !== 'month',
      series: series
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 \xB7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 \xB7 \u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
      style: {
        marginTop: 16
      },
      padding: "none"
    }, /*#__PURE__*/React.createElement(MonthTable, {D, filters})));
  }
  function MonthTable({D, filters}) {
    const {
      DataTable
    } = NS;
    const curY = String((filters && filters.year) || '2569');
    const cmpY = String(parseInt(curY) - 1);
    const rows = D.MONTHS_ACT.map((m, i) => ({
      month: m,
      v_cur: (D.valueByYear[2569] || [])[i],
      v_cmp: (D.valueByYear[2568] || [])[i],
      kg69: (D.volumeByYear[2569] || [])[i],
      price: (D.price69 || [])[i],
      yoy: (() => { const a = (D.valueByYear[2569]||[])[i], b = (D.valueByYear[2568]||[])[i]; return (a != null && b) ? +((a/b - 1)*100).toFixed(2) : null; })()
    }));
    return /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      sortable: false,
      rowKey: r => r.month,
      columns: [{
        key: 'month',
        header: 'เดือน',
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 500
          }
        }, r.month)
      }, {
        key: 'v_cmp',
        header: `มูลค่า ${cmpY} (บาท)`,
        numeric: true,
        render: r => r.v_cmp != null ? fmt.dec1(r.v_cmp / 1e6) : '—'
      }, {
        key: 'v_cur',
        header: `มูลค่า ${curY} (บาท)`,
        numeric: true,
        render: r => r.v_cur != null ? fmt.dec1(r.v_cur / 1e6) : '—'
      }, {
        key: 'kg69',
        header: 'ปริมาณ (Kg)',
        numeric: true,
        render: r => r.kg69 != null ? fmt.int(r.kg69 * 1000) : '—'
      }, {
        key: 'price',
        header: 'ราคาเฉลี่ย (฿/Kg)',
        numeric: true,
        render: r => r.price != null ? fmt.dec1(r.price) : '—'
      }, {
        key: 'yoy',
        header: '% YoY',
        numeric: true,
        render: r => r.yoy != null ? /*#__PURE__*/React.createElement(DeltaBadge, {
          value: r.yoy,
          size: "sm"
        }) : /*#__PURE__*/React.createElement("span", {style:{color:'var(--text-tertiary)'}}, '—')
      }]
    });
  }
  window.OverviewScreen = OverviewScreen;
  window.SalesScreen = SalesScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/ScreensA.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/ScreensB.jsx
try { (() => {
/* Screens: Product Analysis (+detail), Product Mix, Price Analysis → window.{ProductScreen, MixScreen, PriceScreen} */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    KpiCard,
    DeltaBadge,
    RankBar,
    DataTable,
    LineChart,
    DonutChart,
    SegmentedControl,
    Badge,
    Button
  } = NS;
  const Icon = window.Icon;
  const {
    fmt
  } = window.VUtil;
  const {
    Grid
  } = window;
  const D = window.VDATA;
  const NACT = D.NACT;
  const prodGrowth = p => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(2) : 0;
  // per-product monthly volume (Kg) derived from monthly value (บาท) ÷ monthly price (฿/Kg)
  const prodKg = p => p.monthly.map((v, i) => p.priceMonthly[i] ? Math.round(v / p.priceMonthly[i]) : 0);
  const prodKgK = p => prodKg(p).map(k => +(k / 1000).toFixed(2)); // พัน Kg


  // ---------- Product Analysis ----------
  function ProductScreen() {
    const [metric, setMetric] = React.useState('val'); // val | kg
    const [sel, setSel] = React.useState(null);
    const sorted = [...D.PRODUCTS].sort((a, b) => b[metric] - a[metric]);
    const max = sorted.length ? sorted[0][metric] : 1;
    if (sel) return /*#__PURE__*/React.createElement(ProductDetail, {
      product: sel,
      onBack: () => setSel(null),
      viewD: D
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 (\u0E02\u0E19\u0E32\u0E14)",
      value: String(D.PRODUCTS.filter(p => p.kg > 0).length),
      unit: "SKU",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "package",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21",
      value: fmt.dec2(D.totals.value),
      unit: "\u0E1A\u0E32\u0E17",
      delta: D.totals.momVal
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
      value: D.totals.avgPrice.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}),
      unit: "\u0E3F/Kg",
      delta: D.price69 && D.price69[NACT - 2] ? +((D.price69[NACT - 1] / D.price69[NACT - 2] - 1) * 100).toFixed(1) : 0
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: `สินค้าทั้งหมด — ${metric === 'val' ? 'มูลค่าขาย' : 'ปริมาณขาย'}`,
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: metric,
        onChange: setMetric,
        options: [{
          value: 'val',
          label: 'มูลค่า'
        }, {
          value: 'kg',
          label: 'ปริมาณ'
        }]
      }),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, sorted.slice(0, 10).map((p, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: p.id,
      rank: i + 1,
      label: p.name,      value: metric === 'val' ? fmt.dec1(p.val / 1e6) + ' ลบ.' : fmt.int(p.kg) + ' Kg',
      ratio: p[metric] / max,
      share: p.share.toFixed(2) + '%',
      delta: prodGrowth(p),
      color: `var(--viz-${i % 8 + 1})`,
      onClick: () => setSel(p)
    })))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 (Kg)",
      subtitle: (D.PRODUCTS.length <= 6 ? "Kg \xB7 \u0E17\u0E38\u0E01\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32" : "Kg \xB7 Top 6 \u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"),
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "neutral",
        size: "sm"
      }, "\u0E2B\u0E19\u0E48\u0E27\u0E22: \u0E1E\u0E31\u0E19 Kg"),
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 280,
      labels: D.MONTHS_ACT,
      yFormat: v => fmt.int(v),
      showDots: true,
      series: [...[...D.PRODUCTS].sort((a, b) => b.kg - a.kg).slice(0, 6).map((p, i) => ({
        name: p.name,
        data: prodKg(p),
        color: `var(--viz-${i % 8 + 1})`,
        type: 'line'
      }))]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32)",
      subtitle: "\u0E04\u0E25\u0E34\u0E01\u0E41\u0E16\u0E27\u0E40\u0E1E\u0E37\u0E48\u0E2D Drill Down",
      padding: "none"
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: sorted.slice(0, 10),
      onRowClick: setSel,
      rowKey: r => r.id,
      columns: [{
        key: '_r',
        header: '#',
        width: 48,
        numeric: true,
        sortable: false,
        render: r => sorted.indexOf(r) + 1
      }, {
        key: 'name',
        header: 'สินค้า (ขนาด)',
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 500
          }
        }, r.name)
      }, {
        key: 'kg',
        header: 'ปริมาณ (Kg)',
        numeric: true,
        render: r => fmt.int(r.kg)
      }, {
        key: 'val',
        header: 'มูลค่า (บาท)',
        numeric: true,
        render: r => fmt.int(r.val)
      }, {
        key: 'avgPrice',
        header: 'ราคาเฉลี่ย (฿/Kg)',
        numeric: true,
        render: r => fmt.dec1(r.avgPrice)
      }, {
        key: 'share',
        header: 'สัดส่วน',
        numeric: true,
        render: r => r.share.toFixed(2) + '%'
      }, {
        key: 'g',
        header: 'MoM',
        numeric: true,
        sortable: false,
        render: r => /*#__PURE__*/React.createElement(DeltaBadge, {
          value: prodGrowth(r),
          size: "sm"
        })
      }]
    })));
  }
  function ProductDetail({
    product: p,
    onBack,
    viewD,
    monIdx,
    monAll
  }) {
    const _D = viewD || window.VDATA;
    const _NACTp = _D.NACT || p.monthly.length || 1;
    const _single = !monAll && monIdx != null && monIdx >= 0 && monIdx < _NACTp;
    const _mi = _single ? monIdx : _NACTp - 1;
    const _mName = _D.MONTHS_ACT[_mi] || '';
    const _chartLen = _single ? _mi + 1 : _NACTp;
    const _pg = p.monthly.length >= 2 && p.monthly[p.monthly.length - 2] ? +((p.monthly[p.monthly.length - 1] / p.monthly[p.monthly.length - 2] - 1) * 100).toFixed(1) : 0;
    const _kArr = prodKg(p);
    const _kg = _kArr.length >= 2 && _kArr[_kArr.length - 2] ? +((_kArr[_kArr.length - 1] / _kArr[_kArr.length - 2] - 1) * 100).toFixed(1) : 0;
    const _pp = p.priceMonthly.length >= 2 && p.priceMonthly[p.priceMonthly.length - 2] ? +((p.priceMonthly[p.priceMonthly.length - 1] / p.priceMonthly[p.priceMonthly.length - 2] - 1) * 100).toFixed(1) : 0;
    const topCustForProduct = [..._D.CUSTOMERS].sort((a, b) => b.kg - a.kg).slice(0, 5);
    const _kgArrM = prodKg(p);
    const _curVal = _single ? (p.monthly[_mi] || 0) : p.val;
    const _curKgM = _single ? (_kgArrM[_mi] || 0) : p.kg;
    const _curPrice = _single ? (p.priceMonthly[_mi] || 0) : p.avgPrice;
    const _curMom = _mi >= 1 && p.monthly[_mi - 1] ? +((p.monthly[_mi] / p.monthly[_mi - 1] - 1) * 100).toFixed(1) : (_single ? 0 : _pg);
    const _kgMom = _mi >= 1 && _kgArrM[_mi - 1] ? +((_kgArrM[_mi] / _kgArrM[_mi - 1] - 1) * 100).toFixed(1) : (_single ? 0 : _kg);
    const _monValTot = _single ? _D.PRODUCTS.reduce((s, x) => s + ((x.monthly || [])[_mi] || 0), 0) : 0;
    const _curShare = _single ? (_monValTot ? +(_curVal / _monValTot * 100).toFixed(1) : 0) : p.share;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-left",
        size: 15
      }),
      onClick: onBack
    }, "\u0E01\u0E25\u0E31\u0E1A"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 'var(--radius-md)',
        background: 'var(--accent-subtle)',
        color: 'var(--accent-hover)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "package",
      size: 19
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-lg)',
        fontWeight: 600,
        color: 'var(--text-primary)'
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, "\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A #", [..._D.PRODUCTS].sort((a, b) => b.val - a.val).indexOf(p) + 1))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(DeltaBadge, {
      value: _pg,
      size: "lg",
      suffix: " MoM"
    })), /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? ("\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 " + _mName) : `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 ${_D.NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19`,
      value: fmt.int(_curVal),
      unit: "\u0E1A\u0E32\u0E17",
      delta: _curMom,
      accent: true
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? ("\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 " + _mName) : "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22",
      value: fmt.int(_curKgM),
      unit: "Kg",
      delta: _kgMom
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
      value: fmt.dec1(_curPrice),
      unit: "\u0E3F/Kg",
      delta: _pp
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? ("\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1E\u0E2D\u0E23\u0E4C\u0E15 " + _mName) : "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1E\u0E2D\u0E23\u0E4C\u0E15",
      value: _curShare,
      unit: "%"
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 + \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 \u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 2569",
      subtitle: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17) \u0E41\u0E01\u0E19\u0E0B\u0E49\u0E32\u0E22 \xB7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg) \u0E41\u0E01\u0E19\u0E02\u0E27\u0E32 \xB7 " + ((_D.MONTHS_ACT[0] || '') + (_chartLen > 1 ? "\u2013" + (_D.MONTHS_ACT[_chartLen - 1] || '') : '')),
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 240,
      labels: _D.MONTHS_ACT.slice(0, _chartLen),
      yFormat: v => fmt.dec1(v / 1e6),
      showDots: true,
      series: [{
        name: 'มูลค่า (บาท)',
        data: p.monthly.slice(0, _chartLen).map(v => v == null ? null : Math.round(v)),
        color: 'var(--viz-1)',
        type: 'bar'
      }, {
        name: 'ปริมาณ (Kg)',
        data: prodKg(p).slice(0, _chartLen),
        color: 'var(--viz-2)',
        type: 'line',
        axis: 'right'
      }]
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 2569",
      subtitle: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg) \xB7 " + (_D.MONTHS_ACT.length ? (_D.MONTHS_ACT[0] + "\u2013" + _D.MONTHS_ACT[_D.MONTHS_ACT.length - 1]) : "")
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 220,
      labels: _D.MONTHS_ACT.slice(0, _chartLen),
      yFormat: v => fmt.int(v),
      series: [{
        name: p.name,
        data: prodKg(p).slice(0, _chartLen),
        color: 'var(--viz-2)',
        type: 'area'
      }]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: "\u0E3F/Kg"
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 220,
      labels: _D.MONTHS_ACT.slice(0, _chartLen),
      yFormat: v => fmt.int(v),
      series: [{
        name: 'ราคา',
        data: p.priceMonthly.slice(0, _chartLen),
        color: 'var(--viz-3)',
        type: 'line'
      }]
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E17\u0E35\u0E48\u0E0B\u0E37\u0E49\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E19\u0E35\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14",
      subtitle: "\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25 \u00B7 \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u00D7\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E08\u0E23\u0E34\u0E07",
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "warning",
        variant: "soft"
      }, "\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07"),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, topCustForProduct.map((c, i) => {
      const portion = [0.3, 0.22, 0.18, 0.16, 0.14][i];
      return /*#__PURE__*/React.createElement(RankBar, {
        key: c.id,
        rank: i + 1,
        label: c.name,
        sublabel: fmt.int(p.kg * portion) + ' Kg (ประมาณ)',
        value: (portion * 100).toFixed(2) + '%',
        ratio: [1, 0.73, 0.6, 0.53, 0.46][i],
        color: "var(--viz-4)"
      });
    })));
  }

  // ---------- Product Mix (treemap) ----------
  function Treemap({
    data,
    height = 300
  }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const [hover, setHover] = React.useState(null);
    if (!sorted.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        height
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: sorted.length ? sorted[0].value : 1,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Cell, {
      d: sorted[0],
      total: total,
      hover: hover,
      setHover: setHover
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: sorted.slice(1, 4).reduce((s, d) => s + d.value, 0),
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, sorted.slice(1, 4).map(d => /*#__PURE__*/React.createElement("div", {
      key: d.label,
      style: {
        flex: d.value,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Cell, {
      d: d,
      total: total,
      hover: hover,
      setHover: setHover
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: Math.max(1, sorted.slice(4).reduce((s, d) => s + d.value, 0)),
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, sorted.slice(4).map(d => /*#__PURE__*/React.createElement("div", {
      key: d.label,
      style: {
        flex: d.value,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Cell, {
      d: d,
      total: total,
      hover: hover,
      setHover: setHover,
      small: true
    })))));
  }
  function Cell({
    d,
    total,
    hover,
    setHover,
    small
  }) {
    const on = hover === d.label;
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => setHover(d.label),
      onMouseLeave: () => setHover(null),
      style: {
        flex: 1,
        background: d.color,
        borderRadius: 'var(--radius-sm)',
        padding: small ? '7px 9px' : '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        outline: on ? '2px solid var(--text-primary)' : 'none',
        outlineOffset: -2,
        overflow: 'hidden',
        filter: hover && !on ? 'brightness(0.7)' : 'none',
        transition: 'filter var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: small ? 11 : 'var(--text-sm)',
        fontWeight: 600,
        color: '#fff',
        textShadow: '0 1px 2px rgba(0,0,0,.4)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, d.label), !small && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-numeric)',
        fontSize: 'var(--text-xs)',
        color: 'rgba(255,255,255,.85)',
        textShadow: '0 1px 2px rgba(0,0,0,.4)'
      }
    }, (d.value / total * 100).toFixed(2), "%"));
  }
  function MixScreen() {
    const [view, setView] = React.useState('treemap');
    const sorted = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const segs = sorted.map((p, i) => ({
      label: p.name,
      value: Math.round(p.val),
      color: `var(--viz-${i % 8 + 1})`
    }));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E41\u0E15\u0E48\u0E25\u0E30\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 (Product Mix)",
      subtitle: `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 (\u0E1A\u0E32\u0E17) \xB7 ${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19 2569`,
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: view,
        onChange: setView,
        options: [{
          value: 'treemap',
          label: 'Treemap'
        }, {
          value: 'pie',
          label: 'Pie'
        }]
      })
    }, view === 'treemap' ? /*#__PURE__*/React.createElement(Treemap, {
      data: segs,
      height: 320
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 0'
      }
    }, /*#__PURE__*/React.createElement(DonutChart, {
      size: 260,
      thickness: 40,
      centerValue: fmt.int(D.totals.value),
      centerLabel: "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (\u0E1A\u0E32\u0E17)",
      valueFormat: v => fmt.int(v) + ' บาท',
      data: segs
    }))), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Product Ranking",
      subtitle: "\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32",
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, sorted.map((p, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: p.id,
      rank: i + 1,
      label: p.name,      value: p.share.toFixed(2) + '%',
      ratio: sorted.length ? p.val / sorted[0].val : 0,
      delta: prodGrowth(p),
      color: `var(--viz-${i % 8 + 1})`
    })))));
  }

  // ---------- Price Analysis ----------
  function PriceScreen() {
    const [gran, setGran] = React.useState('month');
    const data = gran === 'year' ? D.YEARS.map(y => Math.round(D.sum(D.valueByYear[y].slice(0, NACT)) / (D.sum(D.volumeByYear[y].slice(0, NACT)) * 1000))) : D.price69;
    const labels = gran === 'year' ? D.YEARS.map(String) : D.MONTHS_ACT;
    const prodByPrice = [...D.PRODUCTS].sort((a, b) => b.avgPrice - a.avgPrice);

    // real price alerts: products whose last-month price deviates strongly from their 5mo avg
    const alerts = D.PRODUCTS.map(p => {
      const last = p.priceMonthly[NACT - 1],
        first = p.priceMonthly[0];
      const change = first ? +((last / first - 1) * 100).toFixed(2) : 0;
      return {
        name: p.name,
        change
      };
    }).filter(a => Math.abs(a.change) >= 8).sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 5);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 200,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D Kg",
      value: D.totals.avgPrice.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}),
      unit: "\u0E3F/Kg",
      delta: (D.price69[NACT - 1] / D.price69[0] - 1) * 100,
      deltaSuffix: " 5\u0E40\u0E14\u0E37\u0E2D\u0E19",
      accent: true,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "tag",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32",
      value: fmt.int(D.totals.value / (D.PRODUCTS.filter(p => p.kg > 0).length || 1)),
      unit: "\u0E1A\u0E32\u0E17/SKU",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "package",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32",
      value: fmt.int(D.totals.value / (D.nCustomers || 1)),
      unit: "\u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E23\u0E32\u0E04\u0E32\u0E02\u0E32\u0E22\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 (Average Selling Price)",
      subtitle: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 \xF7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 \xB7 \u0E3F/Kg",
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: gran,
        onChange: setGran,
        options: [{
          value: 'month',
          label: 'รายเดือน'
        }, {
          value: 'year',
          label: 'รายปี'
        }]
      })
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 280,
      labels: labels,
      yFormat: v => '฿' + fmt.int(v),
      showDots: true,
      series: [{
        name: 'ราคาเฉลี่ย ฿/Kg',
        data,
        color: 'var(--viz-3)',
        type: 'area'
      }]
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32",
      subtitle: "Top \u0E15\u0E32\u0E21\u0E23\u0E32\u0E04\u0E32 \u0E3F/Kg",
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, prodByPrice.slice(0, 8).map((p, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: p.id,
      rank: i + 1,
      label: p.name,      value: fmt.dec1(p.avgPrice) + ' ฿/Kg',
      ratio: prodByPrice.length ? p.avgPrice / prodByPrice[0].avgPrice : 0,
      color: "var(--viz-3)"
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E23\u0E32\u0E04\u0E32",
      subtitle: "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E40\u0E01\u0E34\u0E19 \xB18% (\u0E21.\u0E04.\u2192\u0E1E.\u0E04.)",
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "warning",
        dot: true
      }, alerts.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"),
      bodyStyle: {
        padding: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, alerts.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-tertiary)',
        fontSize: 'var(--text-sm)',
        padding: 8
      }
    }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C"), alerts.map((a, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        background: 'var(--surface-2)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: a.change >= 0 ? 'var(--positive)' : 'var(--negative)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.change >= 0 ? 'trending-up' : 'trending-down',
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        color: 'var(--text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, a.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, "\u0E23\u0E32\u0E04\u0E32\u0E1B\u0E23\u0E31\u0E1A", a.change >= 0 ? 'ขึ้น' : 'ลด', "\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C")), /*#__PURE__*/React.createElement(DeltaBadge, {
      value: a.change,
      size: "md"
    })))))));
  }
  window.ProductScreen = ProductScreen;
  window.MixScreen = MixScreen;
  window.PriceScreen = PriceScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/ScreensB.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/ScreensC.jsx
try { (() => {
/* Screens: Customer Analysis (+detail), Customer Contribution → window.{CustomerScreen, ContributionScreen}
   Customers carry Kg (real), share, MoM, monthly[5]. No per-customer value in source. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    KpiCard,
    DeltaBadge,
    RankBar,
    DataTable,
    LineChart,
    DonutChart,
    ParetoChart,
    SegmentedControl,
    Badge,
    Button,
    InsightCard
  } = NS;
  const Icon = window.Icon;
  const {
    fmt
  } = window.VUtil;
  const {
    Grid
  } = window;
  const D = window.VDATA;
  const NACT = D.NACT;
  const viewFor = window.viewFor || function(f){ return window.VDATA; };
  function CustomerScreen({ filters } = {}) {
    // keep full months so the trend chart, ranking and segmented control work;
    // the global month dropdown drives the internal `mon` selection instead of slicing data
    const D = viewFor(Object.assign({}, filters, { month: 'all' }));
    const NACT = D.NACT;
    const [sel, setSel] = React.useState(null);
    const _gMonArr = filters && filters.month != null && filters.month !== 'all' && filters.month !== '' ? String(filters.month).split(',').map(Number).filter((x) => !isNaN(x)) : []; const _gMon = _gMonArr.length ? _gMonArr[_gMonArr.length - 1] : null;
    const [mon, setMon] = React.useState(_gMon != null ? _gMon : (NACT - 1)); // selected month index, synced with global filter
    React.useEffect(() => { setMon(_gMon != null ? _gMon : (NACT - 1)); }, [_gMon, NACT]);
    const sorted = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    const max = sorted.length ? sorted[0].kg : 1;
    const fastest = [...D.CUSTOMERS].sort((a, b) => b.mom - a.mom)[0] || { name: '—', mom: 0 };
    const [custMetric, setCustMetric] = React.useState('kg'); // kg | val
    const _avgP = D.totals.avgPrice || 0;

    // Top 10 ranked by the selected month's volume (Kg)
    const byMonth = [...D.CUSTOMERS].sort((a, b) => (b.monthly[mon] || 0) - (a.monthly[mon] || 0)).slice(0, 10);
    // All customers with purchases in selected month
    const maxMon = byMonth[0] ? byMonth[0].monthly[mon] || 1 : 1;
    const monTotal = (D.allCustomers||D.CUSTOMERS).reduce((s, c) => s + (c.monthly[mon] || 0), 0);
    // ตารางลูกค้าทั้งหมด: ทำตามตัวกรองเดือนด้านบน — "ทุกเดือน" = แสดงลูกค้าทุกรายเรียงตามยอดรวม
    const gAll = !filters || filters.month == null || filters.month === 'all' || filters.month === '';
    const baseAll = D.allCustomers || D.CUSTOMERS;
    const allByMonth = gAll
      ? [...baseAll].filter(cx => (cx.kg || 0) > 0).sort((a, b) => (b.kg || 0) - (a.kg || 0))
      : [...baseAll].filter(cx => (cx.monthly[mon] || 0) > 0).sort((a, b) => (b.monthly[mon] || 0) - (a.monthly[mon] || 0));
    // month-aware list KPIs: reflect the selected month when one is chosen
    const _kCount = gAll ? D.nCustomers : baseAll.filter(cx => (cx.monthly[mon] || 0) > 0).length;
    const _kTotalKg = gAll ? D.custTotalKg : monTotal;
    const _kAvg = _kCount ? _kTotalKg / _kCount : 0;
    const _kTop10 = gAll
      ? (D.custTotalKg ? sorted.slice(0, 10).reduce((s, c) => s + c.kg, 0) / D.custTotalKg * 100 : 0)
      : (monTotal ? byMonth.reduce((s, c) => s + (c.monthly[mon] || 0), 0) / monTotal * 100 : 0);
    // ลูกค้าประจำ = ซื้อครบทุกเดือน (monthly[i] > 0 ทุกเดือน)
    const regulars = baseAll.filter(c => { for (let i = 0; i < NACT; i++) { if (!((c.monthly[i] || 0) > 0)) return false; } return NACT > 0; }).sort((a, b) => b.kg - a.kg);
    // ลูกค้าใหม่ในเดือนที่เลือก = ซื้อครั้งแรกในเดือนนั้น (ไม่เคยซื้อในเดือนก่อนหน้า)
    const _firstMonthOf = (c) => { for (let i = 0; i < NACT; i++) { if ((c.monthly[i] || 0) > 0) return i; } return -1; };
    const newInMon = baseAll.filter(c => _firstMonthOf(c) === mon).sort((a, b) => (b.monthly[mon] || 0) - (a.monthly[mon] || 0));
    if (sel) return /*#__PURE__*/React.createElement(CustomerDetail, {
      customer: sel,
      onBack: () => setSel(null),
      viewD: D,
      monIdx: mon,
      monAll: _gMon == null
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: gAll ? "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32" : "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 (\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49)",
      value: String(_kCount),
      unit: "\u0E23\u0E32\u0E22",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22",
      value: fmt.int(_kAvg),
      unit: "Kg",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "box",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "Top 10 = \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19",
      value: _kTop10.toFixed(2),
      unit: "%"
    }),/*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E42\u0E15\u0E40\u0E23\u0E47\u0E27\u0E2A\u0E38\u0E14",
      value: (() => { const nm = (fastest.name || '').replace(/^บริษัท\s*/, '').replace(/\s*จำกัด.*$/, '').trim() || fastest.name; return nm.length > 16 ? nm.slice(0, 16) + '…' : nm; })(),
      unit: fmt.pct(fastest.mom),
      delta: fastest.mom,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trending-up",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: custMetric === 'val' ? "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 \u2014 \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 (\u0E1A\u0E32\u0E17)" : "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 (Kg)",
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: custMetric,
        onChange: setCustMetric,
        options: [{ value: 'kg', label: 'Kg' }, { value: 'val', label: '\u0E1A\u0E32\u0E17' }]
      }),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, sorted.slice(0, 10).map((c, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: c.id,
      rank: i + 1,
      label: c.name,
      sublabel: c.share.toFixed(2) + '% ของยอดรวม',
      value: custMetric === 'val' ? fmt.int(c.kg * _avgP) + ' บาท' : fmt.int(c.kg) + ' Kg',
      ratio: c.kg / max,
      share: null,
      delta: c.mom,
      color: "var(--viz-4)",
      onClick: () => setSel(c)
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 \u2014 Top 10 vs \u0E2D\u0E37\u0E48\u0E19 \u0E46"
    }, /*#__PURE__*/React.createElement(DonutChart, {
      size: 180,
      thickness: 26,
      centerValue: Math.round(D.custTotalKg).toLocaleString('en-US'),
      centerLabel: "Kg \u0E23\u0E27\u0E21",
      valueFormat: v => Math.round(v).toLocaleString('en-US') + " Kg",
      data: [...sorted.slice(0, 10).map((c, i) => ({
        label: c.name,
        value: c.kg,
        color: `var(--viz-${(i % 5) + 1})`
      })), {
        label: 'ลูกค้าอื่น',
        value: D.custTotalKg - sorted.slice(0, 10).reduce((s, c) => s + c.kg, 0),
        color: 'var(--slate-500)'
      }]
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 \u2014 \u0E08\u0E31\u0E14\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: `ปริมาณ (Kg) เฉพาะเดือน ${D.MONTHS_ACT[mon]} · อันดับเปลี่ยนตามเดือน`,
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: String(mon),
        onChange: v => setMon(+v),
        options: D.MONTHS_ACT.map((m, i) => ({
          value: String(i),
          label: m
        }))
      }),
      bodyStyle: {
        padding: 'var(--space-2)'
      },
      style: {
        marginBottom: 16
      }
    }, byMonth.map((c, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: c.id,
      rank: i + 1,
      label: c.name,
      sublabel: monTotal ? ((c.monthly[mon] || 0) / monTotal * 100).toFixed(2) + '% ของเดือน' : '—',
      value: fmt.int(c.monthly[mon] || 0) + ' Kg',
      ratio: (c.monthly[mon] || 0) / maxMon,
      delta: mon > 0 && c.monthly[mon - 1] ? +(((c.monthly[mon] || 0) / c.monthly[mon - 1] - 1) * 100).toFixed(2) : null,
      color: "var(--viz-5)",
      onClick: () => setSel(c)
    }))), /*#__PURE__*/React.createElement(Grid, {
      cols: 2, gap: 16, style: { marginTop: 16 }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "ลูกค้าประจำ (ซื้อครบทุกเดือน)",
      subtitle: regulars.length + " ราย · ซื้อต่อเนื่องทั้ง " + NACT + " เดือน",
      padding: "none"
    }, regulars.length ? /*#__PURE__*/React.createElement(DataTable, {
      rows: regulars, onRowClick: setSel, rowKey: r => r.name,
      columns: [
        { key: '_r', header: '#', width: 48, numeric: true, sortable: false, render: (r, i) => i + 1 },
        { key: 'name', header: 'ลูกค้า', render: r => /*#__PURE__*/React.createElement("span", { style: { fontWeight: 500 } }, r.name) },
        { key: 'kg', header: 'ปริมาณรวม (Kg)', numeric: true, render: r => fmt.int(r.kg) },
        { key: 'mom', header: '% MoM', numeric: true, render: r => /*#__PURE__*/React.createElement(DeltaBadge, { value: r.mom, size: "sm" }) }
      ]
    }) : /*#__PURE__*/React.createElement("div", { style: { padding: 24, color: 'var(--text-tertiary)', textAlign: 'center' } }, "ไม่มีลูกค้าที่ซื้อครบทุกเดือน")), /*#__PURE__*/React.createElement(Card, {
      title: "ลูกค้าใหม่ — เดือน " + D.MONTHS_ACT[mon],
      subtitle: mon === 0 ? "เดือนแรก — ใช้เป็นฐานเริ่มต้น" : (newInMon.length + " ราย · ซื้อครั้งแรกในเดือนนี้"),
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm", value: String(mon), onChange: v => setMon(+v),
        options: D.MONTHS_ACT.map((m, i) => ({ value: String(i), label: m }))
      }),
      padding: "none"
    }, newInMon.length ? /*#__PURE__*/React.createElement(DataTable, {
      rows: newInMon, onRowClick: setSel, rowKey: r => r.name,
      columns: [
        { key: '_r', header: '#', width: 48, numeric: true, sortable: false, render: (r, i) => i + 1 },
        { key: 'name', header: 'ลูกค้า', render: r => /*#__PURE__*/React.createElement("span", { style: { fontWeight: 500 } }, r.name) },
        { key: 'monKg', header: 'ปริมาณ (Kg)', numeric: true, render: r => fmt.int(r.monthly[mon] || 0) }
      ]
    }) : /*#__PURE__*/React.createElement("div", { style: { padding: 24, color: 'var(--text-tertiary)', textAlign: 'center' } }, mon === 0 ? "เดือนแรก ยังไม่มีฐานให้เทียบ" : "ไม่มีลูกค้าใหม่ในเดือนนี้"))), /*#__PURE__*/React.createElement(Card, {
      title: gAll ? "ลูกค้าทั้งหมด (ทุกเดือน)" : ("ลูกค้าทั้งหมดในเดือน " + D.MONTHS_ACT[mon]),
      subtitle: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E17\u0E35\u0E48\u0E21\u0E35\u0E22\u0E2D\u0E14\u0E0B\u0E37\u0E49\u0E2D · " + allByMonth.length + " \u0E23\u0E32\u0E22",
      padding: "none",
      style: { marginTop: 16 }
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: allByMonth,
      onRowClick: setSel,
      rowKey: r => r.name,
      columns: [{
        key: '_r',
        header: '#',
        width: 48,
        numeric: true,
        sortable: false,
        render: (r, i) => i + 1
      }, {
        key: 'name',
        header: '\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32',
        render: r => /*#__PURE__*/React.createElement("span", { style: { fontWeight: 500 } }, r.name)
      }, {
        key: 'monKg',
        header: '\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg)',
        numeric: true,
        render: r => gAll ? fmt.int(r.kg) : fmt.int(r.monthly[mon] || 0)
      }, {
        key: 'monShare',
        header: '\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19',
        numeric: true,
        render: r => gAll ? ((r.share != null ? r.share : 0).toFixed(2) + '%') : (monTotal ? ((r.monthly[mon] || 0) / monTotal * 100).toFixed(2) + '%' : '\u2014')
      }, {
        key: 'monDelta',
        header: '% MoM',
        numeric: true,
        render: r => gAll
          ? /*#__PURE__*/React.createElement(DeltaBadge, { value: r.mom, size: "sm" })
          : (mon > 0 && r.monthly[mon - 1]
            ? /*#__PURE__*/React.createElement(DeltaBadge, { value: +(((r.monthly[mon] || 0) / r.monthly[mon - 1] - 1) * 100).toFixed(2), size: "sm" })
            : /*#__PURE__*/React.createElement("span", { style: { color: 'var(--text-tertiary)' } }, '\u2014'))
      }]
    })));
  }
  function CustomerDetail({
    customer: c,
    onBack,
    viewD,
    monIdx,
    monAll
  }) {
    const _detailD = viewD || window.VDATA;
    const _allC = _detailD.allCustomers || _detailD.CUSTOMERS || [];
    const _NACT = _detailD.NACT || 1;
    const rank = [..._allC].sort((a, b) => b.kg - a.kg).findIndex(x => x.name === c.name) + 1;
    const avgPrice = _detailD.totals.avgPrice;
    // month-aware: when a specific month is selected in the global filter, KPIs reflect that month
    const _single = !monAll && monIdx != null && monIdx >= 0 && monIdx < _NACT;
    const _mi = _single ? monIdx : _NACT - 1;
    const _mName = _detailD.MONTHS_ACT[_mi] || '';
    const _curKg = _single ? (c.monthly[_mi] || 0) : c.kg;
    const _momM = _mi >= 1 && c.monthly[_mi - 1] ? +((c.monthly[_mi] / c.monthly[_mi - 1] - 1) * 100).toFixed(1) : (_single ? 0 : c.mom);
    const _monTot = _single ? _allC.reduce((s, x) => s + (x.monthly[_mi] || 0), 0) : 0;
    const _curShare = _single ? (_monTot ? _curKg / _monTot * 100 : 0) : c.share;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-left",
        size: 15
      }),
      onClick: onBack
    }, "\u0E01\u0E25\u0E31\u0E1A"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,var(--viz-4),var(--accent))',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600
      }
    }, c.name[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-lg)',
        fontWeight: 600,
        color: 'var(--text-primary)'
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, "\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A #", rank, " \xB7 ", c.share, "% \u0E02\u0E2D\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E23\u0E27\u0E21"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(DeltaBadge, {
      value: _momM,
      size: "lg",
      suffix: " MoM"
    })), /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? ("\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E40\u0E14\u0E37\u0E2D\u0E19 " + _mName) : "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21",
      value: fmt.int(_curKg),
      unit: "Kg",
      delta: _momM,
      accent: true
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E42\u0E14\u0E22\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",
      value: fmt.int(_curKg * avgPrice),
      unit: "\u0E1A\u0E32\u0E17",
      delta: _momM
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49" : "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13",
      value: _curShare.toFixed(2),
      unit: "%"
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E23\u0E27\u0E21 ${_NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19` : "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19",
      value: _single ? fmt.int(c.kg) : fmt.int(c.kg / (_NACT || 1)),
      unit: "Kg",
      delta: _single ? undefined : c.mom
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 3,
      gap: 16
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: 'span 2'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E01\u0E32\u0E23\u0E0B\u0E37\u0E49\u0E2D\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 2569",
      subtitle: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg) \xB7 " + (_single ? _mName : "\u0E21.\u0E04.\u2013\u0E1E.\u0E04.")
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 240,
      labels: _detailD.MONTHS_ACT.slice(0, _single ? _mi + 1 : _NACT),
      yFormat: v => fmt.int(v),
      showDots: true,
      series: [{
        name: c.name,
        data: c.monthly.slice(0, _single ? _mi + 1 : _NACT),
        color: 'var(--viz-4)',
        type: 'area'
      }]
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E23\u0E38\u0E1B\u0E1E\u0E24\u0E15\u0E34\u0E01\u0E23\u0E23\u0E21",
      bodyStyle: {
        padding: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(InsightCard, {
      tone: _momM >= 0 ? 'positive' : 'negative',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: _momM >= 0 ? 'trending-up' : 'trending-down',
        size: 15
      }),
      title: _single ? ("\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E40\u0E14\u0E37\u0E2D\u0E19 " + _mName) : "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
      metric: fmt.pct(_momM),
      detail: `ปริมาณเดือน ${_single ? _mName : (_detailD.MONTHS_ACT[_NACT - 1] || 'ล่าสุด')} ${_momM >= 0 ? 'เพิ่มขึ้น' : 'ลดลง'}เทียบเดือนก่อน`
    }), /*#__PURE__*/React.createElement(InsightCard, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "box",
        size: 15
      }),
      title: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
      metric: ((_ms => fmt.int(_ms.length ? Math.max(..._ms) : 0))(c.monthly.slice(0, _NACT).filter(v => v != null))) + ' Kg',
      detail: 'เดือน ' + ((_ms => _ms.length ? (_detailD.MONTHS_ACT[c.monthly.slice(0, _NACT).indexOf(Math.max(..._ms))] || '—') : '—')(c.monthly.slice(0, _NACT).filter(v => v != null)))
    }), /*#__PURE__*/React.createElement(InsightCard, {
      tone: rank <= 3 ? 'warning' : 'info',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      }),
      title: 'อันดับลูกค้า #' + rank,
      detail: rank <= 3 ? 'ลูกค้ารายใหญ่ — มีผลต่อความเสี่ยงกระจุกตัว' : 'ลูกค้ากลุ่มกลาง'
    })))));
  }

  // ---------- Customer Contribution (Pareto) ----------
  function ContributionScreen() {
    const [scope, setScope] = React.useState('top10');
    const all = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    const allReal = [...D.allCustomers].sort((a, b) => b.kg - a.kg);
    const dataset = scope === 'top10' ? all.slice(0, 10) : scope === 'top20' ? allReal.slice(0, 20) : allReal;
    const paretoData = dataset.map(c => ({
      label: (c.name || '').length > 14 ? c.name.slice(0, 12) + '…' : c.name,
      value: Math.round(c.kg / 1000)
    }));
    const total = D.custTotalKg;
    // customers to reach 80%
    let cum = 0,
      n80 = 0;
    for (const c of allReal) {
      cum += c.kg;
      n80++;
      if (cum / total >= 0.8) break;
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 200,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: "Top 3 = \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13",
      value: D.totals.top3,
      unit: "%",
      accent: true,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-triangle",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "Top 5 = \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13",
      value: D.totals.top5,
      unit: "%",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E17\u0E35\u0E48\u0E17\u0E33 80%",
      value: String(n80),
      unit: 'จาก ' + D.nCustomers + ' ราย',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "target",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Customer Contribution \u2014 Pareto Analysis",
      subtitle: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 (\u0E1E\u0E31\u0E19 Kg) + % \u0E2A\u0E30\u0E2A\u0E21 \xB7 \u0E40\u0E2A\u0E49\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C 80%",
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: scope,
        onChange: setScope,
        options: [{
          value: 'top10',
          label: 'Top 10'
        }, {
          value: 'top20',
          label: 'Top 20'
        }, {
          value: 'all',
          label: 'ทั้งหมด'
        }]
      })
    }, /*#__PURE__*/React.createElement(ParetoChart, {
      height: 320,
      threshold: 80,
      valueFormat: v => fmt.int(v * 1000) + ' Kg',
      data: paretoData
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07",
      bodyStyle: {
        padding: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(InsightCard, {
      tone: "warning",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-triangle",
        size: 15
      }),
      title: "\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01\u0E15\u0E31\u0E27\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01",
      metric: D.totals.top3.toFixed(2) + '%',
      detail: `Top 3 ลูกค้าสร้างยอดเกินครึ่ง — สูงกว่าเป้าหมาย 40% มาก ควรเร่งกระจายฐานลูกค้า`
    }), (() => {
      const drop = [...D.CUSTOMERS].sort((a, b) => a.mom - b.mom)[0];
      if (!drop) return null;
      return /*#__PURE__*/React.createElement(InsightCard, {
        tone: "negative",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "trending-down",
          size: 15
        }),
        title: `ลูกค้าเสี่ยง: ${drop.name.split(' ')[0]}`,
        metric: fmt.pct(drop.mom),
        detail: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14\u0E25\u0E14\u0E25\u0E07 \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E02\u0E49\u0E32\u0E1E\u0E1A/\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
      });
    })(), /*#__PURE__*/React.createElement(InsightCard, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      }),
      title: "\u0E10\u0E32\u0E19\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E23\u0E27\u0E21",
      metric: D.nCustomers + ' ราย',
      detail: `มีเพียง ${n80} รายที่สร้างยอด 80% — ที่เหลือเป็น long tail`
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E2A\u0E30\u0E2A\u0E21",
      subtitle: "Top 10",
      padding: "none"
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: all.slice(0, 10),
      rowKey: r => r.id,
      sortable: false,
      columns: (() => {
        let c = 0;
        return [{
          key: '_r',
          header: '#',
          width: 44,
          numeric: true,
          render: r => all.indexOf(r) + 1
        }, {
          key: 'name',
          header: 'ลูกค้า',
          render: r => /*#__PURE__*/React.createElement("span", {
            style: {
              fontWeight: 500
            }
          }, r.name)
        }, {
          key: 'kg',
          header: 'ปริมาณ (Kg)',
          numeric: true,
          render: r => fmt.int(r.kg)
        }, {
          key: 'share',
          header: 'สัดส่วน',
          numeric: true,
          render: r => r.share.toFixed(2) + '%'
        }, {
          key: 'cum',
          header: 'สะสม',
          numeric: true,
          render: r => {
            c += r.kg;
            const pct = c / total * 100;
            return /*#__PURE__*/React.createElement("span", {
              style: {
                color: pct <= 80 ? 'var(--negative)' : 'var(--text-tertiary)'
              }
            }, pct.toFixed(2), "%");
          }
        }];
      })()
    }))));
  }
  window.CustomerScreen = CustomerScreen;
  window.ContributionScreen = ContributionScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/ScreensC.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/ScreensD.jsx
try { (() => {
/* Screens: Year Comparison + Forecast → window.{YearScreen, ForecastScreen}
   2 years: 2568 (12mo actual) vs 2569 (5mo actual). Forecast projects 2569 year-end. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    KpiCard,
    DeltaBadge,
    DataTable,
    LineChart,
    SegmentedControl,
    Badge,
    RankBar
  } = NS;
  const Icon = window.Icon;
  const {
    fmt
  } = window.VUtil;
  const {
    Grid
  } = window;
  const viewFor = window.viewFor || function(f){ return window.VDATA; };
  const D = window.VDATA;
  const NACT = D.NACT;
  function useMeasure() {
    const ref = React.useRef(null);
    const [w, setW] = React.useState(720);
    React.useEffect(() => {
      if (!ref.current) return;
      let _roTimer;
      const ro = new ResizeObserver(e => {
        const cw = e[0].contentRect.width;
        if (cw > 0) { clearTimeout(_roTimer); _roTimer = setTimeout(() => setW(cw), 80); }
      });
      ro.observe(ref.current);
      return () => ro.disconnect();
    }, []);
    return [ref, w];
  }

  // ---------- Year Comparison (dynamic over all years in D.YEARS) ----------
  function YearScreen() {
    const [metric, setMetric] = React.useState('value');
    // Year comparison is a full-year view across years — source the untruncated
    // 12-month arrays from window.VDATA (viewFor narrows 2568/2569 to the current
    // year's active-month window, which would clip the comparison years).
    const FULL = window.VDATA || D;
    const src = metric === 'value' ? FULL.valueByYear : FULL.volumeByYear;
    const unit = metric === 'value' ? 'บาท' : 'Kg';
    const _vmul = 1;
    const _vfmt = metric === 'value' ? (n => fmt.dec1(n / 1e6)) : (n => fmt.dec1(n));
    const _kfmt = metric === 'value' ? (n => Math.round(n).toLocaleString('en-US')) : _vfmt;
    // count of actual (non-null, >0) months for a year
    const monthsOf = y => src[y].filter(v => v != null && +v > 0).length;
    // only years that actually have data for this metric
    const years = D.YEARS.filter(y => Array.isArray(src[y]) && monthsOf(y) > 0);
    const latest = years[years.length - 1];
    const prev = years[years.length - 2];

    // comparable window = min actual months across years with data (so YoY is apples-to-apples)
    const cmp = years.length ? Math.min(...years.map(monthsOf)) : 0;
    const sumN = (y, n) => D.sum(src[y].slice(0, n).map(v => v || 0));
    const sumFull = y => D.sum(src[y].map(v => v || 0));
    const tLatest = sumN(latest, cmp);
    const tPrev = prev ? sumN(prev, cmp) : 0;
    const yoy = tPrev ? +((tLatest / tPrev - 1) * 100).toFixed(2) : 0;

    // palette: older years muted, latest highlighted
    const yearColor = i => i === years.length - 1 ? 'var(--viz-1)' : `var(--viz-${(years.length - 1 - i) % 6 + 2})`;
    const series = years.map((y, i) => ({
      name: 'ปี ' + y,
      data: src[y].slice(0, 12).map(v => v == null ? null : (metric === 'value' ? Math.round(v) : v)),
      color: yearColor(i),
      type: i === years.length - 1 ? 'area' : 'line'
    }));

    // monthly comparison table — one column per year + YoY (latest vs prev)
    const rows = D.TH_MONTHS.map((m, i) => {
      const row = {
        month: m
      };
      years.forEach(y => {
        row['y' + y] = src[y][i];
      });
      row.yoy = (prev && src[prev][i] != null && +src[prev][i] > 0 && src[latest][i] != null && +src[latest][i] > 0)
        ? +((src[latest][i] / src[prev][i] - 1) * 100).toFixed(2) : null;
      return row;
    });

    // annual summary — per year totals (comparable window + full year), with step YoY
    const annual = years.map((y, i) => {
      const cmpT = sumN(y, cmp),
        full = sumFull(y),
        nM = monthsOf(y);
      const py = years[i - 1];
      const stepYoY = py ? +((sumN(y, cmp) / sumN(py, cmp) - 1) * 100).toFixed(2) : null;
      return {
        year: y,
        cmpT,
        full,
        nM,
        stepYoY
      };
    });
    // ---------- บทวิเคราะห์อัตโนมัติ (อัปเดตตาม metric + ตัวกรอง) ----------
    const fv = (n) => metric === 'value' ? fmt.dec1(n / 1e6) + ' ลบ.' : fmt.int(n) + ' ' + unit;
    const _latM = rows.map((r) => (r['y' + latest] == null ? null : r['y' + latest]));
    const _valid = _latM.map((v, i) => ({ v: v, i: i })).filter((o) => o.v != null && +o.v > 0);
    const insights = [];
    if (_valid.length) {
      if (prev) {
        const _diff = tLatest - tPrev;
        insights.push({ tone: yoy >= 0 ? 'positive' : 'negative', icon: yoy >= 0 ? 'trending-up' : 'trending-down', text: `ยอดรวม ${cmp} เดือนแรกของปี ${latest} ${yoy >= 0 ? 'เติบโต' : 'ลดลง'} ${fmt.pct(yoy)} เทียบปี ${prev} — ${fv(tLatest)} เทียบ ${fv(tPrev)} (${_diff >= 0 ? 'เพิ่มขึ้น' : 'ลดลง'} ${fv(Math.abs(_diff))})` });
      }
      const _sortedT = annual.map((a) => a.cmpT).slice().sort((x, y) => y - x);
      const _rank = _sortedT.indexOf(tLatest) + 1;
      insights.push({ tone: _rank === 1 ? 'positive' : 'info', icon: 'award', text: _rank === 1 ? `ปี ${latest} ทำยอด ${cmp} เดือนแรกสูงสุดในรอบ ${years.length} ปีที่นำมาเทียบ` : `ปี ${latest} อยู่อันดับ ${_rank} จาก ${years.length} ปี ในช่วง ${cmp} เดือนแรก` });
      const _peak = _valid.reduce((a, b) => (b.v > a.v ? b : a));
      const _trough = _valid.reduce((a, b) => (b.v < a.v ? b : a));
      insights.push({ tone: 'info', icon: 'bar-chart-2', text: `เดือนที่ทำยอดสูงสุดคือ ${rows[_peak.i].month} (${fv(_peak.v)}) ส่วนต่ำสุดคือ ${rows[_trough.i].month} (${fv(_trough.v)})` });
      if (prev) {
        const _yv = rows.filter((r) => r.yoy != null && isFinite(r.yoy));
        if (_yv.length) {
          const _best = _yv.reduce((a, b) => (b.yoy > a.yoy ? b : a));
          const _worst = _yv.reduce((a, b) => (b.yoy < a.yoy ? b : a));
          insights.push({ tone: _best.yoy >= 0 ? 'positive' : 'negative', icon: 'activity', text: `เทียบรายเดือนกับปี ${prev}: ${_best.month} โตเด่นสุด (${fmt.pct(_best.yoy)}) ขณะที่ ${_worst.month} อ่อนสุด (${fmt.pct(_worst.yoy)})` });
        }
      }
      if (_valid.length >= 2) {
        const _f = _valid[0], _l = _valid[_valid.length - 1];
        const _mo = _f.v ? +((_l.v / _f.v - 1) * 100).toFixed(1) : 0;
        insights.push({ tone: _mo >= 0 ? 'positive' : 'warning', icon: _mo >= 0 ? 'trending-up' : 'trending-down', text: `โมเมนตัมภายในปี ${latest}: เดือน ${rows[_l.i].month} ${_mo >= 0 ? 'สูงกว่า' : 'ต่ำกว่า'} ${rows[_f.i].month} ${fmt.pct(_mo)}` });
      }
    }
    const _toneColor = (t) => t === 'positive' ? 'var(--positive)' : t === 'negative' ? 'var(--negative)' : t === 'warning' ? 'var(--warning)' : 'var(--accent)';
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: `รวม ${cmp} เดือน ${latest}`,
      value: _kfmt(tLatest),
      unit: unit,
      delta: yoy,
      deltaSuffix: " YoY",
      accent: true
    }), prev && /*#__PURE__*/React.createElement(KpiCard, {
      label: `รวม ${cmp} เดือน ${prev}`,
      value: _kfmt(tPrev),
      unit: unit
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "YoY Growth",
      value: fmt.pct(yoy).replace('%', ''),
      unit: "%",
      delta: yoy,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "activity",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: `จำนวนปีที่เทียบ`,
      value: String(years.length),
      unit: "\u0E1B\u0E35",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: `เปรียบเทียบยอดขายรายปี (${years.join(' · ')})`,
      subtitle: `${metric === 'value' ? 'มูลค่า (ลบ.)' : 'ปริมาณ (Kg)'} · รายเดือน · ปีปัจจุบันมีข้อมูล ${cmp} เดือน`,
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: metric,
        onChange: setMetric,
        options: [{
          value: 'value',
          label: 'มูลค่า'
        }, {
          value: 'volume',
          label: 'ปริมาณ'
        }]
      })
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 300,
      labels: D.TH_MONTHS,
      yFormat: v => metric === 'value' ? fmt.dec1(v / 1e6) : fmt.int(v),
      showDots: true,
      series: series
    })), insights.length > 0 && /*#__PURE__*/React.createElement(Card, {
      title: "\u0E1A\u0E17\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34",
      subtitle: `\u0E2A\u0E23\u0E38\u0E1B\u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07 \u00B7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E15\u0E32\u0E21${metric === 'value' ? '\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32' : '\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13'}\u0E41\u0E25\u0E30\u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07`,
      style: { marginTop: 16 }
    }, /*#__PURE__*/React.createElement("div", {
      style: { display: 'flex', flexDirection: 'column', gap: 10 }
    }, insights.map((it, i) => {
      const c = _toneColor(it.tone);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid ' + c }
      }, /*#__PURE__*/React.createElement("span", {
        style: { color: c, flex: '0 0 auto', marginTop: 1 }
      }, /*#__PURE__*/React.createElement(Icon, { name: it.icon, size: 16 })), /*#__PURE__*/React.createElement("span", {
        style: { fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }
      }, it.text));
    }))), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E32\u0E22\u0E1B\u0E35",
      subtitle: `รวม ${cmp} เดือนเทียบกัน + ทั้งปี · หน่วย ${metric === 'value' ? 'ลบ.' : 'พัน Kg'}`,
      padding: "none"
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: annual,
      sortable: false,
      rowKey: r => r.year,
      columns: [{
        key: 'year',
        header: 'ปี',
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 500
          }
        }, r.year)
      }, {
        key: 'cmpT',
        header: `รวม ${cmp} เดือน`,
        numeric: true,
        render: r => _vfmt(r.cmpT)
      }, {
        key: 'full',
        header: 'ทั้งปี',
        numeric: true,
        render: r => /*#__PURE__*/React.createElement("span", null, _vfmt(r.full), /*#__PURE__*/React.createElement("span", {
          style: {
            color: 'var(--text-disabled)',
            fontSize: 'var(--text-2xs)'
          }
        }, " (", r.nM, "\u0E14.)"))
      }, {
        key: 'step',
        header: '% YoY',
        numeric: true,
        sortable: false,
        render: r => r.stepYoY == null ? /*#__PURE__*/React.createElement("span", {
          style: {
            color: 'var(--text-disabled)'
          }
        }, "\u2014") : /*#__PURE__*/React.createElement(DeltaBadge, {
          value: r.stepYoY,
          size: "sm"
        })
      }]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: `เดือน × ปี · YoY (${latest} vs ${prev || '—'})`,
      padding: "none"
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      sortable: false,
      rowKey: r => r.month,
      columns: [{
        key: 'month',
        header: 'เดือน',
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 500
          }
        }, r.month)
      }, ...years.map(y => ({
        key: 'y' + y,
        header: String(y),
        numeric: true,
        render: r => (r['y' + y] == null || +r['y' + y] === 0) ? /*#__PURE__*/React.createElement('span', { style: { color: 'var(--text-disabled)' } }, '—') : _vfmt(r['y' + y])
      })), {
        key: 'yoy',
        header: '% YoY',
        numeric: true,
        render: r => r.yoy == null ? /*#__PURE__*/React.createElement('span', { style: { color: 'var(--text-disabled)' } }, '—') : /*#__PURE__*/React.createElement(DeltaBadge, {
          value: r.yoy,
          size: "sm"
        })
      }]
    }))));
  }

  // ---------- Forecast ----------
  function ForecastChart({
    height = 300
  }) {
    const [ref, width] = useMeasure();
    const F = D.forecast;
    const A = F.actualMonths;
    const proj = F.projVal; // 12 months, first A actual
    const actual = proj.map((v, i) => i < A ? v : null);
    const projected = proj.map((v, i) => i >= A - 1 ? v : null);
    const upper = projected.map(v => v == null ? null : +(v * 1.09).toFixed(2));
    const lower = projected.map(v => v == null ? null : +(v * 0.91).toFixed(2));
    const p = {
      top: 16,
      right: 16,
      bottom: 28,
      left: 42
    };
    const iw = Math.max(10, width - p.left - p.right);
    const ih = Math.max(10, height - p.top - p.bottom);
    const max = Math.max(...proj, ...upper.filter(v => v != null)) * 1.12;
    const n = proj.length;
    const x = i => p.left + i / (n - 1) * iw;
    const y = v => p.top + ih - v / max * ih;
    const actualPath = actual.map((v, i) => v == null ? null : `${actual.slice(0, i).every(u => u == null) ? 'M' : 'L'} ${x(i)} ${y(v)}`).filter(Boolean).join(' ');
    const projPts = projected.map((v, i) => v == null ? null : `${x(i)},${y(v)}`).filter(Boolean);
    const projD = projPts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt}`).join(' ');
    const upPts = upper.map((v, i) => v == null ? null : `${x(i)},${y(v)}`).filter(Boolean);
    const loPts = lower.map((v, i) => v == null ? null : `${x(i)},${y(v)}`).filter(Boolean).reverse();
    const band = upPts.length ? `M ${[...upPts, ...loPts].join(' L ')} Z` : '';
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        marginBottom: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Lg, {
      color: "var(--viz-1)"
    }, `\u0E22\u0E2D\u0E14\u0E08\u0E23\u0E34\u0E07 (${D.MONTHS_ACT[0] || ''}\u2013${D.MONTHS_ACT[A - 1] || ''})`), /*#__PURE__*/React.createElement(Lg, {
      color: "var(--viz-3)",
      dash: true
    }, `\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C (${D.TH_MONTHS[A] || ''}\u2013${D.TH_MONTHS[11] || ''})`), /*#__PURE__*/React.createElement(Lg, {
      color: "var(--viz-3)",
      band: true
    }, "\u0E0A\u0E48\u0E27\u0E07\u0E04\u0E27\u0E32\u0E21\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E31\u0E48\u0E19 \xB19%")), /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      height: height,
      viewBox: `0 0 ${width} ${height}`,
      style: {
        display: 'block',
        overflow: 'visible'
      }
    }, [0, 0.25, 0.5, 0.75, 1].map((g, k) => /*#__PURE__*/React.createElement("g", {
      key: k
    }, /*#__PURE__*/React.createElement("line", {
      x1: p.left,
      y1: p.top + g * ih,
      x2: p.left + iw,
      y2: p.top + g * ih,
      stroke: "var(--chart-grid)"
    }), /*#__PURE__*/React.createElement("text", {
      x: p.left - 8,
      y: p.top + g * ih + 4,
      textAnchor: "end",
      fontSize: "10",
      fill: "var(--chart-axis)",
      fontFamily: "var(--font-numeric)"
    }, fmt.dec1(max * (1 - g) / 1e6)))), /*#__PURE__*/React.createElement("line", {
      x1: x(A - 1),
      y1: p.top,
      x2: x(A - 1),
      y2: p.top + ih,
      stroke: "var(--border-strong)",
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement("rect", {
      x: x(A - 1),
      y: p.top,
      width: p.left + iw - x(A - 1),
      height: ih,
      fill: "var(--viz-3)",
      opacity: "0.04"
    }), band && /*#__PURE__*/React.createElement("path", {
      d: band,
      fill: "var(--viz-3)",
      opacity: "0.14"
    }), /*#__PURE__*/React.createElement("path", {
      d: projD,
      fill: "none",
      stroke: "var(--viz-3)",
      strokeWidth: "2",
      strokeDasharray: "5 4"
    }), /*#__PURE__*/React.createElement("path", {
      d: actualPath,
      fill: "none",
      stroke: "var(--viz-1)",
      strokeWidth: "2.5"
    }), actual.map((v, i) => v != null && /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: x(i),
      cy: y(v),
      r: "2.5",
      fill: "var(--viz-1)"
    })), F.projVal.map((v, i) => /*#__PURE__*/React.createElement("text", {
      key: i,
      x: x(i),
      y: height - 8,
      textAnchor: "middle",
      fontSize: "10",
      fill: "var(--chart-axis)",
      fontFamily: "var(--font-sans)"
    }, D.TH_MONTHS[i]))));
  }
  function Lg({
    color,
    dash,
    band,
    children
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, band ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 10,
        background: color,
        opacity: 0.2,
        borderRadius: 2
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 0,
        borderTop: `2px ${dash ? 'dashed' : 'solid'} ${color}`
      }
    }), children);
  }
  function ForecastScreen() {
    const F = D.forecast;
    const prodByVal = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const custByKg = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      variant: "soft",
      dot: true
    }, "AI Forecasting"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-tertiary)'
      }
    }, `\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35 2569 \u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07 ${D.NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19 (${D.MONTHS_ACT[0] || ''}\u2013${D.MONTHS_ACT[D.NACT - 1] || ''}) \u00B7 Run-rate + Linear Trend`)), /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35",
      value: fmt.dec1(F.yearEndVal / 1e6),
      unit: "\u0E25\u0E1A.",
      delta: (() => { const _vd = window.VDATA || {}; const _b = ((_vd.valueByYear && (_vd.valueByYear['2568'] || _vd.valueByYear[2568])) || []).reduce((s, x) => s + (+x || 0), 0); return _b ? +((F.yearEndVal / _b - 1) * 100).toFixed(1) : 0; })(),
      deltaSuffix: " vs 2568",
      accent: true,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "sparkles",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35",
      value: Math.round(F.yearEndVolKg * 1e6).toLocaleString('en-US'),
      unit: "Kg",
      delta: (() => { const _vd = window.VDATA || {}; const _b = ((_vd.volumeByYear && (_vd.volumeByYear['2568'] || _vd.volumeByYear[2568])) || []).reduce((s, x) => s + (+x || 0), 0); return _b ? +((F.yearEndVolKg * 1000 / _b - 1) * 100).toFixed(1) : 0; })(),
      deltaSuffix: " vs 2568",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "box",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "Confidence Level",
      value: F.confidence,
      unit: "%",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "target",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E25\u0E37\u0E2D",
      value: String(12 - NACT),
      unit: "\u0E40\u0E14\u0E37\u0E2D\u0E19",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "clock",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35 2569",
      subtitle: `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17) \xB7 \u0E22\u0E2D\u0E14\u0E08\u0E23\u0E34\u0E07 ${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19 + \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E0A\u0E48\u0E27\u0E07\u0E04\u0E27\u0E32\u0E21\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E31\u0E48\u0E19`,
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "positive",
        dot: true
      }, "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E31\u0E48\u0E19 ", F.confidence, "%")
    }, /*#__PURE__*/React.createElement(ForecastChart, {
      height: 320
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Top 10 \u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35",
      subtitle: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)",
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, prodByVal.slice(0, 10).map((p, i) => {
      const proj = +(p.val * (12 / NACT) * 1.02).toFixed(2);
      return /*#__PURE__*/React.createElement(RankBar, {
        key: p.id,
        rank: i + 1,
        label: p.name,
        sublabel: `คาด ${fmt.dec1(proj / 1e6)} ลบ.`,
        value: fmt.dec1(proj / 1e6) + ' ลบ.',
        ratio: prodByVal.length ? proj / (prodByVal[0].val * (12 / NACT) * 1.02) : 0,
        color: `var(--viz-${i % 8 + 1})`
      });
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35",
      subtitle: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg)",
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, custByKg.slice(0, 10).map((c, i) => {
      const proj = Math.round(c.kg * (12 / NACT) * (1 + c.mom / 100 * 0.2));
      return /*#__PURE__*/React.createElement(RankBar, {
        key: c.id,
        rank: i + 1,
        label: c.name,
        sublabel: `คาด ${fmt.int(proj)} Kg`,
        value: fmt.int(proj) + ' Kg',
        ratio: custByKg.length ? proj / (custByKg[0].kg * (12 / NACT) * 1.1) : 0,
        delta: c.mom,
        color: "var(--viz-4)"
      });
    }))));
  }
  window.YearScreen = YearScreen;
  window.ForecastScreen = ForecastScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/ScreensD.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Shell.jsx
try { (() => {
/* Vantage app shell: Sidebar, TopBar, FilterBar, Layout. → window.{Sidebar,TopBar,FilterBar,AppShell} */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    IconButton,
    Button,
    Select,
    Badge,
    SegmentedControl
  } = NS;
  const Icon = window.Icon;
  const NAV = [{
    id: 'overview',
    label: 'ภาพรวมผู้บริหาร',
    icon: 'layout-dashboard'
  }, {
    id: 'sales',
    label: 'Sales Overview',
    icon: 'line-chart'
  }, {
    id: 'product',
    label: 'Product Analysis',
    icon: 'package'
  }, {
    id: 'customer',
    label: 'Customer Analysis',
    icon: 'users'
  }, {
    id: 'contribution',
    label: 'Customer Contribution',
    icon: 'bar-chart-2'
  }, {
    id: 'mix',
    label: 'Product Mix',
    icon: 'pie-chart'
  }, {
    id: 'price',
    label: 'Price Analysis',
    icon: 'dollar-sign'
  }, {
    id: 'year',
    label: 'Year Comparison',
    icon: 'calendar'
  }, {
    id: 'forecast',
    label: 'Forecast',
    icon: 'sparkles'
  }];
  window.VANTAGE_NAV = NAV;
  function Logo({
    collapsed
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        height: 'var(--topbar-h)',
        padding: collapsed ? '0' : '0 18px',
        justifyContent: collapsed ? 'center' : 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/bwp-logo.svg",
      width: "30",
      height: "30",
      alt: "BWP",
      style: {
        flex: '0 0 auto'
      }
    }), !collapsed && /*#__PURE__*/React.createElement("div", {
      style: {
        lineHeight: 1.1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em'
      }
    }, "BWP ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-tertiary)',
        fontWeight: 500
      }
    }, "Vantage")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-tertiary)'
      }
    }, "Best World Interplas")));
  }
  function Sidebar({
    active,
    onNav,
    collapsed,
    onToggle
  }) {
    const [hovered, setHovered] = React.useState(null);
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        position: 'sticky',
        top: 0,
        height: '100vh',
        flex: `0 0 ${collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)'}`,
        width: collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)',
        background: 'var(--bg-base)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width var(--dur-base) var(--ease-standard)',
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      collapsed: collapsed
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: '10px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, NAV.map(n => {
      const on = n.id === active;
      const hot = !on && hovered === n.id;
      return /*#__PURE__*/React.createElement("button", {
        key: n.id,
        onClick: () => onNav(n.id),
        title: collapsed ? n.label : undefined,
        "aria-label": n.label,
        "aria-current": active === n.id ? 'page' : undefined,
        onMouseEnter: () => setHovered(n.id),
        onMouseLeave: () => setHovered(null),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          width: '100%',
          padding: collapsed ? '10px 0' : '9px 11px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          textAlign: 'left',
          background: on ? 'var(--accent-subtle)' : hot ? 'var(--surface-2)' : 'transparent',
          color: on ? 'var(--accent-hover)' : hot ? 'var(--text-primary)' : 'var(--text-secondary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: on ? 600 : 500,
          transition: 'color var(--dur-fast)',
          position: 'relative'
        }
      }, on && !collapsed && /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: -10,
          top: 8,
          bottom: 8,
          width: 3,
          borderRadius: 3,
          background: 'var(--accent)'
        }
      }), /*#__PURE__*/React.createElement(Icon, {
        name: n.icon,
        size: 17
      }), !collapsed && /*#__PURE__*/React.createElement("span", {
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, n.label));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 10,
        borderTop: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onToggle,
      title: "\u0E22\u0E48\u0E2D/\u0E02\u0E22\u0E32\u0E22\u0E40\u0E21\u0E19\u0E39",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        width: '100%',
        padding: collapsed ? '9px 0' : '9px 11px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        border: 'none',
        background: 'transparent',
        color: 'var(--text-tertiary)',
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevrons-left",
      size: 17,
      style: {
        transform: collapsed ? 'rotate(180deg)' : 'none'
      }
    }), !collapsed && /*#__PURE__*/React.createElement("span", null, "\u0E22\u0E48\u0E2D\u0E40\u0E21\u0E19\u0E39"))));
  }
  function TopBar({
    title,
    subtitle,
    theme,
    onTheme,
    breadcrumb,
    onBack,
    onMenuToggle
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 15,
        height: 'var(--topbar-h)',
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 22px',
        background: 'color-mix(in srgb, var(--bg-app) 88%, transparent)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, React.createElement('button', {
      'data-hamburger': true,
      onClick: onMenuToggle || function(){},
      style: { display: 'none', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px 8px', marginRight: 4 },
      className: 'bwp-hamburger'
    }, React.createElement(window.Icon, { name: 'menu', size: 20 })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, breadcrumb && /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: 'none',
        border: 'none',
        color: 'var(--text-tertiary)',
        cursor: 'pointer',
        fontSize: 'var(--text-xs)',
        fontFamily: 'var(--font-sans)',
        marginBottom: 1,
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 13
    }), " ", breadcrumb), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--text-xl)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em'
      }
    }, title), subtitle && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, subtitle))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 10,
        color: 'var(--text-tertiary)',
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })), /*#__PURE__*/React.createElement("input", {
      placeholder: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32...",
      style: {
        height: 36,
        width: 200,
        padding: '0 12px 0 32px',
        background: 'var(--surface-1)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        outline: 'none'
      },
      onFocus: e => e.target.style.borderColor = 'var(--border-accent)',
      onBlur: e => e.target.style.borderColor = 'var(--border-default)'
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "md",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "edit",
        size: 15
      }),
      onClick: () => window.location.href = '/bwp-data-editor/'
    }, "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "md",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      }),
      onClick: () => window.location.href = '/bwp-customer-db/'
    }, "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "md",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 15
      })
    }, "\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01"), /*#__PURE__*/React.createElement(IconButton, {
      label: "\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19",
      variant: "ghost"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 17
    })), /*#__PURE__*/React.createElement(IconButton, {
      label: theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด',
      variant: "ghost",
      onClick: onTheme
    }, /*#__PURE__*/React.createElement(Icon, {
      name: theme === 'dark' ? 'sun' : 'moon',
      size: 17
    })), React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 6, marginLeft: 2, borderLeft: '1px solid var(--border-subtle)', cursor: 'pointer' },
      title: 'ออกจากระบบ',
      onClick: function() { window.BWP_LOGOUT && window.BWP_LOGOUT(); }
    },
      React.createElement('div', {
        style: { width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--viz-4),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 13 }
      }, (window.BWP_USER && window.BWP_USER.username || 'B').charAt(0).toUpperCase()),
      React.createElement('span', {
        style: { fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'none' },
        className: 'bwp-username'
      }, window.BWP_USER && window.BWP_USER.username || '')
    )));
  }
  function MonthFilter({ value, onChange, D, width = 168 }) {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);
    React.useEffect(() => {
      function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }, []);
    const months = D.TH_MONTHS || [];
    const isAll = value == null || value === 'all' || value === '';
    const sel = isAll ? [] : String(value).split(',').map(Number).filter((n) => !isNaN(n) && n >= 0 && n < 12);
    const emit = (arr) => onChange(!arr || arr.length === 0 ? 'all' : arr.slice().sort((a, b) => a - b).join(','));
    const toggle = (i) => emit(sel.includes(i) ? sel.filter((x) => x !== i) : sel.concat(i));
    const sameSet = (a) => !isAll && sel.length === a.length && a.every((x) => sel.includes(x));
    const labelText = isAll ? 'ทุกเดือน' : sel.length === 1 ? months[sel[0]] : sel.length <= 3 ? sel.slice().sort((a, b) => a - b).map((i) => months[i]).join(', ') : sel.length + ' เดือน';
    const QUARTERS = [['Q1', [0, 1, 2]], ['Q2', [3, 4, 5]], ['Q3', [6, 7, 8]], ['Q4', [9, 10, 11]]];
    const chip = (lbl, active, onClick) => React.createElement("button", {
      key: lbl, onClick,
      style: { padding: '4px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid ' + (active ? 'var(--border-accent)' : 'var(--border-default)'), background: active ? 'var(--accent-subtle)' : 'transparent', color: active ? 'var(--accent-hover)' : 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: active ? 600 : 500, cursor: 'pointer' }
    }, lbl);
    return React.createElement("div", { ref, style: { position: 'relative', width } },
      React.createElement("button", {
        onClick: () => setOpen((o) => !o),
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%', height: 36, padding: '0 10px 0 12px', background: 'var(--surface-1)', border: '1px solid ' + (open ? 'var(--border-accent)' : 'var(--border-default)'), boxShadow: open ? '0 0 0 3px var(--accent-ring)' : 'none', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', cursor: 'pointer' }
      },
        React.createElement("span", { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, labelText),
        React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", style: { flex: '0 0 auto', transform: open ? 'rotate(180deg)' : 'none', color: 'var(--text-tertiary)' } },
          React.createElement("path", { d: "M6 9l6 6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))),
      open && React.createElement("div", {
        style: { position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 'var(--z-overlay)', width: 264, padding: 10, background: 'var(--surface-2)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }
      },
        React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 } },
          chip('ทุกเดือน', isAll, () => emit(null)),
          ...QUARTERS.map((q) => chip(q[0], sameSet(q[1]), () => emit(q[1])))),
        React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 } },
          ...months.map((m, i) => {
            const on = sel.includes(i);
            return React.createElement("button", {
              key: i, onClick: () => toggle(i),
              style: { display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', border: 'none', borderRadius: 'var(--radius-sm)', background: on ? 'var(--accent-subtle)' : 'transparent', color: on ? 'var(--accent-hover)' : 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: on ? 600 : 400, cursor: 'pointer', textAlign: 'left' }
            },
              React.createElement("span", { style: { width: 13, height: 13, flex: '0 0 auto', borderRadius: 3, border: '1.5px solid ' + (on ? 'var(--accent)' : 'var(--border-strong)'), background: on ? 'var(--accent)' : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } },
                on && React.createElement("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none" }, React.createElement("path", { d: "M20 6L9 17l-5-5", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }))),
              m);
          }))));
  }
  function FilterBar({
    filters,
    setFilters,
    onExport
  }) {
    const D = window.VDATA;
    const set = k => v => setFilters(f => ({
      ...f,
      [k]: v
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 'var(--topbar-h)',
        zIndex: 12,
        minHeight: 'var(--filterbar-h)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 22px',
        flexWrap: 'wrap',
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        color: 'var(--text-tertiary)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        marginRight: 2
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "filter",
      size: 14
    }), " \u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07"), /*#__PURE__*/React.createElement(Select, {
      width: 110,
      value: filters.year,
      onChange: set('year'),
      options: D.YEARS.map(String)
    }), /*#__PURE__*/React.createElement(MonthFilter, {
      value: filters.month,
      onChange: set('month'),
      D: D
    }), /*#__PURE__*/React.createElement(Select, {
      width: 170,
      value: filters.customerGroup,
      onChange: set('customerGroup'),
      options: [{
        value: 'all',
        label: 'ลูกค้าทั้งหมด'
      }, ...D.CUSTOMERS.slice(0, 6).map(c => ({
        value: c.id,
        label: c.name.length > 16 ? c.name.slice(0, 16) + '…' : c.name
      }))]
    }), /*#__PURE__*/React.createElement(Select, {
      width: 150,
      value: filters.product || 'all',
      onChange: set('product'),
      options: [{
        value: 'all',
        label: 'ทุกสินค้า'
      }, ...(D.PRODUCTS || []).map(p => ({
        value: p.id,
        label: p.name.length > 14 ? p.name.slice(0, 14) + '…' : p.name
      }))]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      variant: "soft",
      dot: true
    }, `\u0E1B\u0E35 ${filters.year} \xB7 ${D.NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19 (${(D.MONTHS_ACT||[])[0]||""}\u2013${(D.MONTHS_ACT||[])[D.NACT-1]||""})`));
  }
  window.Sidebar = Sidebar;
  window.TopBar = TopBar;
  window.FilterBar = FilterBar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/app.all.jsx
try { (() => {
// --- Common ---
/* Shared helpers for dashboard screens → window.VUtil + small presentational components */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    Badge
  } = NS;
  const Icon = window.Icon;
  const fmt = {
    int: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    dec2: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    dec1: n => (!n || n <= 0) ? '—' : (Math.round(n * 100) / 100).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    money: n => Math.round(n * 1e6).toLocaleString('en-US') + ' บาท',
    m: n => (Math.round(n * 100) / 100).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + 'M',
    kg: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg',
    kgK: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg',
    kgM: n => (n == null ? 0 : n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Kg',
    pct: n => (n >= 0 ? '+' : '−') + Math.abs(n == null ? 0 : n).toFixed(2) + '%'
  };

  // quarter aggregation of a 12-month series
  const toQuarters = arr => [0, 1, 2, 3].map(q => arr.slice(q * 3, q * 3 + 3).reduce((s, x) => s + x, 0));
  const QLABELS = ['Q1', 'Q2', 'Q3', 'Q4'];

  // Section title row
  function SectionTitle({
    icon,
    children,
    hint
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        marginBottom: 14
      }
    }, icon && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-tertiary)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 16
    })), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--text-lg)',
        fontWeight: 600,
        color: 'var(--text-primary)'
      }
    }, children), hint && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-disabled)'
      }
    }, hint));
  }

  // Small "drill" affordance shown on hoverable cards
  function DrillHint({
    label = 'คลิกเพื่อ Drill Down'
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-disabled)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "maximize",
      size: 11
    }), " ", label);
  }

  // grid helper
  function Grid({
    cols = 2,
    min = null,
    gap = 16,
    children,
    style = {}
  }) {
    const tpl = min ? `repeat(auto-fit, minmax(${min}px, 1fr))` : `repeat(${cols}, minmax(0,1fr))`;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: tpl,
        gap,
        ...style
      }
    }, children);
  }
  window.VUtil = {
    fmt,
    toQuarters,
    QLABELS
  };
  window.SectionTitle = SectionTitle;
  window.DrillHint = DrillHint;
  window.Grid = Grid;
})();

// --- Shell ---
/* Vantage app shell: Sidebar, TopBar, FilterBar, Layout. → window.{Sidebar,TopBar,FilterBar,AppShell} */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    IconButton,
    Button,
    Select,
    Badge,
    SegmentedControl
  } = NS;
  const Icon = window.Icon;
  const NAV = [{
    id: 'overview',
    label: 'ภาพรวมผู้บริหาร',
    icon: 'layout-dashboard'
  }, {
    id: 'sales',
    label: 'Sales Overview',
    icon: 'line-chart'
  }, {
    id: 'product',
    label: 'Product Analysis',
    icon: 'package'
  }, {
    id: 'customer',
    label: 'Customer Analysis',
    icon: 'users'
  }, {
    id: 'contribution',
    label: 'Customer Contribution',
    icon: 'bar-chart-2'
  }, {
    id: 'mix',
    label: 'Product Mix',
    icon: 'pie-chart'
  }, {
    id: 'price',
    label: 'Price Analysis',
    icon: 'dollar-sign'
  }, {
    id: 'year',
    label: 'Year Comparison',
    icon: 'calendar'
  }, {
    id: 'forecast',
    label: 'Forecast',
    icon: 'sparkles'
  }];
  window.VANTAGE_NAV = NAV;
  function Logo({
    collapsed
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        height: 'var(--topbar-h)',
        padding: collapsed ? '0' : '0 18px',
        justifyContent: collapsed ? 'center' : 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/bwp-logo.svg",
      width: "30",
      height: "30",
      alt: "BWP",
      style: {
        flex: '0 0 auto'
      }
    }), !collapsed && /*#__PURE__*/React.createElement("div", {
      style: {
        lineHeight: 1.1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em'
      }
    }, "BWP ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-tertiary)',
        fontWeight: 500
      }
    }, "Vantage")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-tertiary)'
      }
    }, "Best World Interplas")));
  }
  function Sidebar({
    active,
    onNav,
    collapsed,
    onToggle
  }) {
    const [hovered, setHovered] = React.useState(null);
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        position: 'sticky',
        top: 0,
        height: '100vh',
        flex: `0 0 ${collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)'}`,
        width: collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)',
        background: 'var(--bg-base)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width var(--dur-base) var(--ease-standard)',
        zIndex: 20
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      collapsed: collapsed
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: '10px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, NAV.map(n => {
      const on = n.id === active;
      const hot = !on && hovered === n.id;
      return /*#__PURE__*/React.createElement("button", {
        key: n.id,
        onClick: () => onNav(n.id),
        title: collapsed ? n.label : undefined,
        "aria-label": n.label,
        "aria-current": active === n.id ? 'page' : undefined,
        onMouseEnter: () => setHovered(n.id),
        onMouseLeave: () => setHovered(null),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          width: '100%',
          padding: collapsed ? '10px 0' : '9px 11px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          textAlign: 'left',
          background: on ? 'var(--accent-subtle)' : hot ? 'var(--surface-2)' : 'transparent',
          color: on ? 'var(--accent-hover)' : hot ? 'var(--text-primary)' : 'var(--text-secondary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: on ? 600 : 500,
          transition: 'color var(--dur-fast)',
          position: 'relative'
        }
      }, on && !collapsed && /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: -10,
          top: 8,
          bottom: 8,
          width: 3,
          borderRadius: 3,
          background: 'var(--accent)'
        }
      }), /*#__PURE__*/React.createElement(Icon, {
        name: n.icon,
        size: 17
      }), !collapsed && /*#__PURE__*/React.createElement("span", {
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, n.label));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 10,
        borderTop: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onToggle,
      title: "\u0E22\u0E48\u0E2D/\u0E02\u0E22\u0E32\u0E22\u0E40\u0E21\u0E19\u0E39",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        width: '100%',
        padding: collapsed ? '9px 0' : '9px 11px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        border: 'none',
        background: 'transparent',
        color: 'var(--text-tertiary)',
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevrons-left",
      size: 17,
      style: {
        transform: collapsed ? 'rotate(180deg)' : 'none'
      }
    }), !collapsed && /*#__PURE__*/React.createElement("span", null, "\u0E22\u0E48\u0E2D\u0E40\u0E21\u0E19\u0E39"))));
  }
  function TopBar({
    title,
    subtitle,
    theme,
    onTheme,
    breadcrumb,
    onBack,
    onMenuToggle
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 15,
        height: 'var(--topbar-h)',
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 22px',
        background: 'color-mix(in srgb, var(--bg-app) 88%, transparent)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, React.createElement('button', {
      'data-hamburger': true,
      onClick: onMenuToggle || function(){},
      style: { display: 'none', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px 8px', marginRight: 4 },
      className: 'bwp-hamburger'
    }, React.createElement(window.Icon, { name: 'menu', size: 20 })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, breadcrumb && /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: 'none',
        border: 'none',
        color: 'var(--text-tertiary)',
        cursor: 'pointer',
        fontSize: 'var(--text-xs)',
        fontFamily: 'var(--font-sans)',
        marginBottom: 1,
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 13
    }), " ", breadcrumb), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--text-xl)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em'
      }
    }, title), subtitle && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, subtitle))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 10,
        color: 'var(--text-tertiary)',
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })), /*#__PURE__*/React.createElement("input", {
      placeholder: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32...",
      style: {
        height: 36,
        width: 200,
        padding: '0 12px 0 32px',
        background: 'var(--surface-1)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        outline: 'none'
      },
      onFocus: e => e.target.style.borderColor = 'var(--border-accent)',
      onBlur: e => e.target.style.borderColor = 'var(--border-default)'
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "md",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "edit",
        size: 15
      }),
      onClick: () => window.location.href = '/bwp-data-editor/'
    }, "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "md",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      }),
      onClick: () => window.location.href = '/bwp-customer-db/'
    }, "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "md",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 15
      })
    }, "\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01"), /*#__PURE__*/React.createElement(IconButton, {
      label: "\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19",
      variant: "ghost"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 17
    })), /*#__PURE__*/React.createElement(IconButton, {
      label: theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด',
      variant: "ghost",
      onClick: onTheme
    }, /*#__PURE__*/React.createElement(Icon, {
      name: theme === 'dark' ? 'sun' : 'moon',
      size: 17
    })), React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 6, marginLeft: 2, borderLeft: '1px solid var(--border-subtle)', cursor: 'pointer' },
      title: 'ออกจากระบบ',
      onClick: function() { window.BWP_LOGOUT && window.BWP_LOGOUT(); }
    },
      React.createElement('div', {
        style: { width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--viz-4),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 13 }
      }, (window.BWP_USER && window.BWP_USER.username || 'B').charAt(0).toUpperCase()),
      React.createElement('span', {
        style: { fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'none' },
        className: 'bwp-username'
      }, window.BWP_USER && window.BWP_USER.username || '')
    )));
  }
  function MonthFilter({ value, onChange, D, width = 168 }) {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);
    React.useEffect(() => {
      function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }, []);
    const months = D.TH_MONTHS || [];
    const isAll = value == null || value === 'all' || value === '';
    const sel = isAll ? [] : String(value).split(',').map(Number).filter((n) => !isNaN(n) && n >= 0 && n < 12);
    const emit = (arr) => onChange(!arr || arr.length === 0 ? 'all' : arr.slice().sort((a, b) => a - b).join(','));
    const toggle = (i) => emit(sel.includes(i) ? sel.filter((x) => x !== i) : sel.concat(i));
    const sameSet = (a) => !isAll && sel.length === a.length && a.every((x) => sel.includes(x));
    const labelText = isAll ? 'ทุกเดือน' : sel.length === 1 ? months[sel[0]] : sel.length <= 3 ? sel.slice().sort((a, b) => a - b).map((i) => months[i]).join(', ') : sel.length + ' เดือน';
    const QUARTERS = [['Q1', [0, 1, 2]], ['Q2', [3, 4, 5]], ['Q3', [6, 7, 8]], ['Q4', [9, 10, 11]]];
    const chip = (lbl, active, onClick) => React.createElement("button", {
      key: lbl, onClick,
      style: { padding: '4px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid ' + (active ? 'var(--border-accent)' : 'var(--border-default)'), background: active ? 'var(--accent-subtle)' : 'transparent', color: active ? 'var(--accent-hover)' : 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: active ? 600 : 500, cursor: 'pointer' }
    }, lbl);
    return React.createElement("div", { ref, style: { position: 'relative', width } },
      React.createElement("button", {
        onClick: () => setOpen((o) => !o),
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%', height: 36, padding: '0 10px 0 12px', background: 'var(--surface-1)', border: '1px solid ' + (open ? 'var(--border-accent)' : 'var(--border-default)'), boxShadow: open ? '0 0 0 3px var(--accent-ring)' : 'none', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', cursor: 'pointer' }
      },
        React.createElement("span", { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, labelText),
        React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", style: { flex: '0 0 auto', transform: open ? 'rotate(180deg)' : 'none', color: 'var(--text-tertiary)' } },
          React.createElement("path", { d: "M6 9l6 6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))),
      open && React.createElement("div", {
        style: { position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 'var(--z-overlay)', width: 264, padding: 10, background: 'var(--surface-2)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }
      },
        React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 } },
          chip('ทุกเดือน', isAll, () => emit(null)),
          ...QUARTERS.map((q) => chip(q[0], sameSet(q[1]), () => emit(q[1])))),
        React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 } },
          ...months.map((m, i) => {
            const on = sel.includes(i);
            return React.createElement("button", {
              key: i, onClick: () => toggle(i),
              style: { display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', border: 'none', borderRadius: 'var(--radius-sm)', background: on ? 'var(--accent-subtle)' : 'transparent', color: on ? 'var(--accent-hover)' : 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: on ? 600 : 400, cursor: 'pointer', textAlign: 'left' }
            },
              React.createElement("span", { style: { width: 13, height: 13, flex: '0 0 auto', borderRadius: 3, border: '1.5px solid ' + (on ? 'var(--accent)' : 'var(--border-strong)'), background: on ? 'var(--accent)' : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } },
                on && React.createElement("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none" }, React.createElement("path", { d: "M20 6L9 17l-5-5", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }))),
              m);
          }))));
  }
  function FilterBar({
    filters,
    setFilters,
    onExport
  }) {
    const D = window.VDATA;
    const set = k => v => setFilters(f => ({
      ...f,
      [k]: v
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 'var(--topbar-h)',
        zIndex: 12,
        minHeight: 'var(--filterbar-h)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 22px',
        flexWrap: 'wrap',
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        color: 'var(--text-tertiary)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        marginRight: 2
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "filter",
      size: 14
    }), " \u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07"), /*#__PURE__*/React.createElement(Select, {
      width: 110,
      value: filters.year,
      onChange: set('year'),
      options: D.YEARS.map(String)
    }), /*#__PURE__*/React.createElement(MonthFilter, {
      value: filters.month,
      onChange: set('month'),
      D: D
    }), /*#__PURE__*/React.createElement(Select, {
      width: 170,
      value: filters.customerGroup,
      onChange: set('customerGroup'),
      options: [{
        value: 'all',
        label: 'ลูกค้าทั้งหมด'
      }, ...D.CUSTOMERS.slice(0, 6).map(c => ({
        value: c.id,
        label: c.name.length > 16 ? c.name.slice(0, 16) + '…' : c.name
      }))]
    }), /*#__PURE__*/React.createElement(Select, {
      width: 150,
      value: filters.product || 'all',
      onChange: set('product'),
      options: [{
        value: 'all',
        label: 'ทุกสินค้า'
      }, ...(D.PRODUCTS || []).map(p => ({
        value: p.id,
        label: p.name.length > 14 ? p.name.slice(0, 14) + '…' : p.name
      }))]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      variant: "soft",
      dot: true
    }, `\u0E1B\u0E35 ${filters.year} \xB7 ${D.NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19 (${(D.MONTHS_ACT||[])[0]||""}\u2013${(D.MONTHS_ACT||[])[D.NACT-1]||""})`));
  }
  window.Sidebar = Sidebar;
  window.TopBar = TopBar;
  window.FilterBar = FilterBar;
})();

// --- ScreensA ---
/* Screens: Executive Overview + Sales Overview → window.{OverviewScreen, SalesScreen}
   Data: BWP real sales ม.ค.–พ.ค. 2569 (เทียบ 2568). Value=ล้านบาท, Volume=พัน Kg. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    KpiCard,
    DeltaBadge,
    RankBar,
    InsightCard,
    LineChart,
    DonutChart,
    Sparkline,
    SegmentedControl,
    Badge
  } = NS;
  const Icon = window.Icon;
  const {
    fmt
  } = window.VUtil;
  const {
    DrillHint,
    Grid
  } = window;
  const D = window.VDATA;
  const NACT = D.NACT;
  // Derive a filtered VDATA-shaped view from the top filter bar selections, so screens
  // change with the year/month/customer/product filters. Keeps the same shape (years
  // keyed 2569/2568, MONTHS_ACT, NACT, KPIS, totals, PRODUCTS, CUSTOMERS) so screen
  // bodies need no edits beyond shadowing `D`/`NACT` with the view.
  function viewFor(f) {
    const D = window.VDATA;
    f = f || {};
    const rnd = (x, d) => { const p = Math.pow(10, d); return Math.round(x * p) / p; };
    const sum = (a) => a.reduce((s, x) => s + (x || 0), 0);
    const curY = String(f.year || '2569');
    const cmpY = String(parseInt(curY) - 1);
    let vCur = D.valueByYear[curY] || D.valueByYear['2569'] || [];
    let kCur = D.volumeByYear[curY] || D.volumeByYear['2569'] || [];
    let vCmp = D.valueByYear[cmpY] || [];
    let kCmp = D.volumeByYear[cmpY] || [];
    // product filter: narrow the headline value/volume series to a single product
    const prodId = f.product;
    if (prodId && prodId !== 'all') {
      const P = (D.PRODUCTS || []).find((p) => p.id === prodId);
      if (P) {
        vCur = (P.monthly || []).map((v) => (v == null ? null : v));          // value (บาท) per month
        kCur = (P.monthly || []).map((v, i) => {                              // volume (พัน Kg) per month
          const pr = (P.priceMonthly || [])[i];
          return v == null ? null : (pr ? rnd(v / pr / 1000, 1) : 0);
        });
        vCmp = []; kCmp = []; // no per-product prior-year data → no YoY baseline
      }
    }
    let n = 0; for (let i = 0; i < 12; i++) { if (vCur[i] != null && +vCur[i] > 0) n = i + 1; else break; }
    const _isAllM = f.month == null || f.month === 'all' || f.month === '';
    const _selIdx = _isAllM ? [] : String(f.month).split(',').map(Number).filter((i) => !isNaN(i) && i >= 0 && i < 12).sort((a, b) => a - b);
    const single = _selIdx.length === 1;
    const mi = single ? _selIdx[0] : -1;
    const idxs = _isAllM ? Array.from({ length: n }, (_, i) => i) : _selIdx;
    const pick = (arr) => idxs.map((i) => arr[i]);
    const sumVal = sum(pick(vCur)), sumVol = sum(pick(kCur));
    const sumValC = sum(pick(vCmp)), sumVolC = sum(pick(kCmp));
    const price = sumVol ? sumVal / (sumVol * 1000) : 0;
    const priceC = sumVolC ? sumValC / (sumVolC * 1000) : 0;
    const momVal = single ? (mi >= 1 && vCur[mi - 1] != null && vCur[mi - 1] !== 0 ? rnd((vCur[mi] - vCur[mi - 1]) / vCur[mi - 1] * 100, 1) : null) : D.totals.momVal;
    const momVol = single ? (mi >= 1 && kCur[mi - 1] != null && kCur[mi - 1] !== 0 ? rnd((kCur[mi] - kCur[mi - 1]) / kCur[mi - 1] * 100, 1) : null) : D.totals.momKg;
    const yoy = (a, b) => b ? rnd((a - b) / b * 100, 1) : 0;
    const cg = f.customerGroup;
    const reslice = (arr) => idxs.map((i) => (arr || [])[i] || 0);
    // select year-appropriate product/customer source (hist years use customersByYear/productsByYear)
    const _yrSrc = (curY !== '2569' && D.productsByYear && D.productsByYear[curY]) ? curY : '2569';
    const _prodSrc = _yrSrc !== '2569' ? (D.productsByYear[_yrSrc] || D.PRODUCTS || []) : (D.PRODUCTS || []);
    const _custSrc = _yrSrc !== '2569' ? (D.customersByYear && D.customersByYear[_yrSrc] || []) : ((D.allCustomers && D.allCustomers.length) ? D.allCustomers : D.CUSTOMERS);
    // when product filter applies to hist year, remap vCur/kCur to that product's monthly series
    if (prodId && prodId !== 'all' && _yrSrc !== '2569') {
      const _Phist = _prodSrc.find((p) => p.id === prodId);
      if (_Phist) {
        vCur = (_Phist.monthly || []).map((v) => (v == null ? null : v));
        kCur = (_Phist.monthly || []).map((v, i) => { const pr = (_Phist.priceMonthly || [])[i]; return v == null ? null : (pr ? rnd(v / pr / 1000, 1) : 0); });
      }
    }
    // products: merge duplicate names → 1 ประเภท, filter, re-slice monthly, recompute val/share
    const _pByName = {};
    _prodSrc.forEach((p) => {
      const key = (p.name || '').trim();
      if (!_pByName[key]) { _pByName[key] = Object.assign({}, p, { monthly: (p.monthly || []).slice(), kg: p.kg || 0 }); }
      else { const t = _pByName[key].monthly, s = p.monthly || []; for (let i = 0; i < s.length; i++) t[i] = (t[i] || 0) + (s[i] || 0); _pByName[key].kg += (p.kg || 0); }
    });
    let prods = Object.keys(_pByName).map((k) => _pByName[k]);
    if (prodId && prodId !== 'all') prods = prods.filter((p) => p.id === prodId);
    prods = prods.map((p) => {
      const m = reslice(p.monthly);
      const mPr = reslice(p.priceMonthly || []);
      const kgSlice = m.map((v, i) => mPr[i] ? Math.round(v / mPr[i]) : 0);
      const kg = kgSlice.reduce((s, k) => s + k, 0);
      return Object.assign({}, p, { monthly: m, val: rnd(sum(m), 1), kg: kg });
    });
    const totP = sum(prods.map((p) => p.val));
    prods = prods.map((p) => Object.assign({}, p, { share: totP ? rnd(p.val / totP * 100, 1) : 0 }));
    // customers: re-slice monthly to selected months, recompute kg/share/mom; filter by selected customer
    const remapCust = (list) => {
      // merge duplicate customer names (same buyer entered as multiple rows) → 1 ราย
      const byName = {};
      (list || []).forEach((c) => {
        const key = (c.name || '').trim();
        if (!byName[key]) { byName[key] = Object.assign({}, c, { monthly: (c.monthly || []).slice() }); }
        else { const t = byName[key].monthly, s = c.monthly || []; for (let i = 0; i < s.length; i++) t[i] = (t[i] || 0) + (s[i] || 0); }
      });
      let out = Object.keys(byName).map((k) => byName[k]).map((c) => {
        const m = reslice(c.monthly);
        const kg = Math.round(sum(m));
        const L = m.length;
        const mom = L >= 2 && m[L - 2] ? rnd((m[L - 1] / m[L - 2] - 1) * 100, 1) : 0;
        return Object.assign({}, c, { monthly: m, kg: kg, mom: mom });
      }).filter((c) => c.kg > 0);
      const tot = sum(out.map((c) => c.kg)) || 1;
      out = out.map((c) => Object.assign({}, c, { share: rnd(c.kg / tot * 100, 1) }));
      out.sort((a, b) => b.kg - a.kg);
      return out;
    };
    let allC = remapCust(_custSrc);
    if (cg && cg !== 'all') {
      const selName = (D.CUSTOMERS.find((c) => c.id === cg) || {}).name;
      if (selName) allC = allC.filter((c) => c.name === selName);
    }
    let custs = allC.slice(0, 10).map((c, i) => Object.assign({ id: 'c' + (i + 1) }, c));
    const custTotalKg = sum(allC.map((c) => c.kg));
    let cum = 0, top3 = 0, top5 = 0;
    allC.forEach((c, i) => { cum += c.share; if (i === 2) top3 = rnd(cum, 1); if (i === 4) top5 = rnd(cum, 1); });
    if (allC.length < 3) top3 = rnd(cum, 1);
    if (allC.length < 5) top5 = rnd(cum, 1);
    // when customer filter active: rescale value/volume proportionally from customer Kg
    let _sv = sumVal, _sk = sumVol, _pr = price;
    if (cg && cg !== 'all' && allC.length > 0 && sumVol > 0) {
      _sk = allC.reduce((s, c) => s + c.kg, 0) / 1000; // Kg → พัน Kg
      _sv = rnd(sumVal * (_sk / sumVol), 4);
      _pr = _sk ? rnd(_sv / (_sk * 1000), 2) : 0;
    }
    var _tgtMode = D.targetMode === 'kg' ? 'kg' : 'value';
    var _tgt = 0, _hasT = false, _tgtKg = 0, _hasTKg = false;
    (D.targets || []).forEach(function(t, i){ if(idxs.indexOf(i) >= 0 && t != null){ _tgt += t; _hasT = true; } });
    (D.targetsKg || []).forEach(function(t, i){ if(idxs.indexOf(i) >= 0 && t != null){ _tgtKg += t; _hasTKg = true; } });
    var _achv;
    if (_tgtMode === 'kg') {
      _achv = (_hasTKg && _tgtKg > 0) ? rnd(_sk * 1000 / _tgtKg * 100, 1)
            : (_hasT && _tgt > 0) ? rnd(_sv / _tgt * 100, 1) : null;
    } else {
      _achv = (_hasT && _tgt > 0) ? rnd(_sv / _tgt * 100, 1)
            : (_hasTKg && _tgtKg > 0) ? rnd(_sk * 1000 / _tgtKg * 100, 1) : null;
    }
    const patch = {
      value: { value: Math.round(_sv).toLocaleString('en-US'), delta: momVal, yoy: yoy(_sv, sumValC) },
      volume: { value: Math.round(_sk * 1000).toLocaleString('en-US'), delta: momVol, yoy: yoy(_sk, sumVolC) },
      price: { value: _pr.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}), yoy: yoy(_pr, priceC) },
      customers: { value: String(allC.length) },
      products: { value: String(prods.filter(p => p.val > 0 || p.kg > 0).length) },
      target: { value: _achv != null ? _achv.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1}) : '—', unit: _achv != null ? '%' : 'ไม่มีเป้า' },
    };
    const KPIS = D.KPIS.map((k) => Object.assign({}, k, patch[k.id] || {}));
    const labels = idxs.map((i) => D.TH_MONTHS[i]);
    const priceArr = idxs.map((i) => kCur[i] ? rnd(vCur[i] / (kCur[i] * 1000), 1) : 0);
    // per-month customer series for charts when customer filter is active
    const _custMonKg = (cg && cg !== 'all' && allC.length > 0)
      ? idxs.map((_, j) => allC.reduce((s, c) => s + ((c.monthly || [])[j] || 0), 0) / 1000)
      : null;
    const _vCur69 = _custMonKg ? _custMonKg.map((k, j) => kCur[idxs[j]] ? rnd(pick(vCur)[j] * (k / kCur[idxs[j]]), 2) : 0) : pick(vCur);
    const _kCur69 = _custMonKg ? _custMonKg : pick(kCur);
    // recompute forecast for filtered view (run-rate base + linear trend, last 3 months)
    const _fNACT = idxs.length;
    const _f3v = _vCur69.slice(Math.max(0, _fNACT-3), _fNACT).filter(v => v != null && +v > 0);
    const _fBase = _f3v.length ? _f3v.reduce((s,v)=>s+(+v),0)/_f3v.length : (_fNACT ? _vCur69.reduce((s,v)=>s+(+v||0),0)/_fNACT : 0);
    const _fSlope = _f3v.length >= 2 ? (_f3v[_f3v.length-1] - _f3v[0]) / Math.max(1, _f3v.length-1) : 0;
    const _fProjVal = Array.from({length: 12}, (_, fi) => {
      if (fi < _fNACT) return +(_vCur69[fi] == null ? 0 : +_vCur69[fi]).toFixed(2);
      const ahead = fi - _fNACT + 1;
      return +Math.max(0, _fBase + _fSlope * ahead).toFixed(2);
    });
    const _fYearEndVal = Math.round(_fProjVal.reduce((s,v)=>s+v,0));
    const _fTotalKg = _kCur69.reduce((s,v)=>s+(+v||0),0);
    const _fYearEndKg = rnd((_fTotalKg + (_fNACT ? _fTotalKg/_fNACT : 0) * (12 - _fNACT)) / 1000, 2);
    const _forecast = { yearEndVal: _fYearEndVal, yearEndVolKg: _fYearEndKg, projVal: _fProjVal, actualMonths: _fNACT, confidence: Math.min(95, Math.round(50 + _fNACT * 8)) };
    return Object.assign({}, D, {
      NACT: idxs.length,
      MONTHS_ACT: labels,
      valueByYear: Object.assign({}, D.valueByYear, { 2569: _vCur69, 2568: pick(vCmp) }),
      volumeByYear: Object.assign({}, D.volumeByYear, { 2569: _kCur69, 2568: pick(kCmp) }),
      price69: priceArr,
      forecast: _forecast,
      KPIS: KPIS,
      PRODUCTS: prods,
      CUSTOMERS: custs,
      allCustomers: allC,
      custTotalKg: custTotalKg,
      nCustomers: allC.length,
      totals: Object.assign({}, D.totals, { value: Math.round(_sv), volume: Math.round(_sk * 1e3), avgPrice: rnd(_pr, 1), top3: top3, top5: top5, yoyVal: yoy(_sv, sumValC), yoyKg: yoy(_sk, sumVolC), momVal: momVal, momKg: momVol }),
    });
  }
  const KPI_DRILL = {
    volume: 'sales',
    value: 'sales',
    price: 'price',
    customers: 'customer',
    products: 'product',
    orders: 'sales'
  };
  const prodGrowth = p => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(2) : 0;

  function KpiRow({
    onDrill,
    filters
  }) {
    const D = viewFor(filters);
    return /*#__PURE__*/React.createElement(Grid, {
      min: 150,
      gap: 12,
      style: {
        marginBottom: 18
      }
    }, D.KPIS.map(k => /*#__PURE__*/React.createElement(KpiCard, {
      key: k.id,
      label: k.label,
      value: k.id === 'volume' ? D.totals.volume.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}) : k.id === 'value' ? D.totals.value.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}) : k.value,
      unit: k.id === 'volume' ? 'Kg' : k.id === 'value' ? 'บาท' : k.unit,
      delta: k.delta,
      deltaSuffix: " MoM",
      secondary: k.yoy ? {
        label: 'YoY',
        value: k.yoy
      } : null,
      accent: k.accent,
      spark: /*#__PURE__*/React.createElement(Sparkline, {
        data: k.spark,
        color: k.color,
        width: 70,
        height: 26
      }),
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: k.id === 'value' ? 'dollar-sign' : k.id === 'volume' ? 'box' : k.id === 'price' ? 'tag' : k.id === 'customers' ? 'users' : k.id === 'products' ? 'package' : 'file-text',
        size: 15
      }),
      onClick: () => onDrill(KPI_DRILL[k.id])
    })));
  }
  function OverviewScreen({
    onDrill,
    filters
  }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const prodGrowth = p => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(2) : 0;
    const labels = D.MONTHS_ACT;
    const _curY = String((filters && filters.year) || '2569');
    const _cmpY = String(parseInt(_curY) - 1);
    const val69 = (D.valueByYear[2569] || []).slice(0, NACT);
    const val68 = (D.valueByYear[2568] || []).slice(0, NACT);
    const vol69 = (D.volumeByYear[2569] || []).slice(0, NACT);
    const prodByVal = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const custByKg = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    const _gc = D.CUSTOMERS.length > 0 ? D.CUSTOMERS.slice().sort((a, b) => b.mom - a.mom)[0] : null;
    // ---- ตัวช่วยสร้าง insight จากค่าจริง (กันข้อมูลไม่พอ + เลิก hardcode) ----
    // ตัดคำนำหน้า/ลงท้ายนิติบุคคล ให้เหลือชื่อจริงที่สื่อความหมาย (กัน split() เหลือแต่ "บริษัท")
    const _short = nm => !nm ? '—' : (nm
      .replace(/^(บริษัท|ห้างหุ้นส่วนจำกัด|หจก\.|บจก\.)\s*/, '')
      .replace(/\s*จำกัด\s*\(มหาชน\)\s*$/, '')
      .replace(/\s*จำกัด\s*$/, '').trim() || nm);
    // เงื่อนไขกันข้อมูลไม่พอ (รู้จักตัวกรองเดือน):
    //  • _single = ผู้ใช้เลือกกรอง "เดือนเดียว"  •  _mi = ดัชนีเดือนที่เลือก (0-based)
    //  • _canMoM  = เทียบเดือนต่อเดือนได้ไหม → มุมมองหลายเดือนต้องมี ≥2 เดือน,
    //               ถ้าเลือกเดือนเดียวก็เทียบกับเดือนก่อนหน้าได้ (ตราบใดที่ไม่ใช่เดือนแรกสุด)
    //  • _canTrend = ดูแนวโน้ม/การเติบโตหลายเดือนได้ไหม → ต้องมีหลายจุดในมุมมอง (ไม่ใช่เดือนเดียว)
    const _selMonArr = filters && filters.month != null && filters.month !== 'all' && filters.month !== '' ? String(filters.month).split(',').map(Number).filter((x) => !isNaN(x)) : [];
    const _single = _selMonArr.length === 1;
    const _mi = _single ? _selMonArr[0] : -1;
    const _mName = (_single && D.TH_MONTHS) ? D.TH_MONTHS[_mi] : '';
    const _vArr = (D.valueByYear || {})[String((filters && filters.year) || '2569')] || [];
    const _momVal = _single
      ? (_mi >= 1 && _vArr[_mi - 1] != null && _vArr[_mi - 1] !== 0 ? D.totals.momVal : null)
      : D.totals.momVal;
    const _canMoM = (_single ? (_mi >= 1) : (NACT >= 2)) && _momVal != null;
    const _canTrend = NACT >= 2;  // มุมมองเดือนเดียว NACT=1 → ดูแนวโน้มไม่ได้โดยอัตโนมัติ
    // ฟอร์แมตราคา ฿/Kg อย่างปลอดภัย — ไม่มีค่าให้คืน "—" ไม่ใช่ 0
    const _fp = v => (v != null && v > 0) ? v.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) : '—';
    const _priceArr = (D.price69 || []).slice(0, NACT).filter(p => p != null && p > 0);
    const _pNow = _priceArr.length ? _priceArr[_priceArr.length - 1] : null;
    const _pFirst = _priceArr.length ? _priceArr[0] : null;
    const _pChg = (_canTrend && _pFirst) ? (_pNow / _pFirst - 1) * 100 : null;  // เปลี่ยนแปลงราคารวม (%)
    let _upStreak = 0;  // จำนวนเดือนที่ราคาขึ้น "ติดกัน" จากเดือนล่าสุดย้อนกลับ
    for (let i = _priceArr.length - 1; i > 0; i--) { if (_priceArr[i] > _priceArr[i - 1]) _upStreak++; else break; }
    // ส่วนต่างมูลค่าเป็นบาท (เดือนปัจจุบัน − เดือนก่อนหน้า) — ดึงจากซีรีส์เต็มใน VDATA (ลบ. → ×1e6)
    // เพราะมุมมองเดือนเดียวใน D ถูกตัดเหลือเดือนเดียว จึงไม่มีเดือนก่อนให้เทียบ
    const _vFull = ((window.VDATA || {}).valueByYear || {})[String((filters && filters.year) || '2569')] || [];
    const _curIdx = _single ? _mi : (NACT - 1);
    const _prevIdx = _curIdx - 1;
    const _curBaht = (_vFull[_curIdx] != null) ? _vFull[_curIdx] : null;
    const _prevBaht = (_prevIdx >= 0 && _vFull[_prevIdx] != null) ? _vFull[_prevIdx] : null;
    const _diffBaht = (_curBaht != null && _prevBaht != null) ? (_curBaht - _prevBaht) : null;
    const _diffStr = _diffBaht == null ? '' :
      ((_diffBaht >= 0 ? 'เพิ่มขึ้น ' : 'ลดลง ') + fmt.int(Math.abs(_diffBaht)) + ' บาท จากเดือนก่อน');

    // 1) มูลค่าขายเดือน (MoM) — เทียบได้เมื่อ _canMoM, ไม่งั้นขึ้น "—" พร้อมหมายเหตุตามบริบท
    const _mom = _momVal;
    const _i1 = _canMoM
      ? { tone: _mom > 0 ? 'positive' : _mom < 0 ? 'negative' : 'info',
          icon: _mom > 0 ? 'trending-up' : _mom < 0 ? 'trending-down' : 'activity',
          title: (_single ? `มูลค่าขาย ${_mName} ` : 'มูลค่าขายเดือนล่าสุด') + (_mom > 0 ? 'เพิ่มขึ้น' : _mom < 0 ? 'ลดลง' : 'ทรงตัว'),
          metric: fmt.pct(_mom),
          detail: (_diffStr ? _diffStr + ' · ' : '') + `ราคาเฉลี่ย ${_fp(_pNow)} ฿/Kg`,
          time: _single ? _mName : 'ล่าสุด' }
      : { tone: 'info', icon: 'clock', title: _single ? `มูลค่าขาย ${_mName}` : 'มูลค่าขายเดือนล่าสุด', metric: '—',
          detail: _single
            ? `${_mName} เป็นเดือนแรก ยังไม่มีเดือนก่อนให้เทียบ · ราคาเฉลี่ย ${_fp(_pNow)} ฿/Kg`
            : `มีข้อมูลเดือนเดียว ยังเทียบเดือนก่อนไม่ได้ (ต้องมี ≥2 เดือน) · ราคาเฉลี่ย ${_fp(_pNow)} ฿/Kg`,
          time: 'ข้อมูลไม่พอ' };

    // 2) การพึ่งพาลูกค้ารายใหญ่ (Top 3) — แบ่งระดับตามส่วนแบ่งจริง + กรณีไม่มีข้อมูลลูกค้า
    const _t3 = D.totals.top3;
    const _hasCust = D.CUSTOMERS.length > 0 && _t3 > 0;
    const _i2 = !_hasCust
      ? { tone: 'info', icon: 'users', title: 'ยังไม่มีข้อมูลลูกค้า', metric: '—',
          detail: 'ยังไม่มีข้อมูลการซื้อรายลูกค้าให้วิเคราะห์การกระจุกตัว', time: '—' }
      : { tone: _t3 >= 70 ? 'warning' : _t3 >= 40 ? 'info' : 'positive',
          icon: _t3 >= 70 ? 'alert-triangle' : 'users',
          title: _t3 >= 70 ? 'พึ่งพาลูกค้ารายใหญ่สูงมาก' : _t3 >= 40 ? 'พึ่งพาลูกค้ารายใหญ่ปานกลาง' : 'ฐานลูกค้ากระจายตัวดี',
          metric: _t3.toFixed(2) + '%',
          detail: `Top 3 ลูกค้า (${D.CUSTOMERS.slice(0, 3).map(c => _short(c.name)).join(', ')}) สร้างยอด ${_t3.toFixed(2)}% ของปริมาณ`,
          time: _t3 >= 70 ? 'เฝ้าระวัง' : 'ภาพรวม' };

    // 3) ลูกค้าโตเด่น — ต้องมุมมองหลายเดือนจึงจัดอันดับการเติบโตได้ (เดือนเดียวคำนวณ MoM รายลูกค้าไม่ได้)
    const _i3 = (!_canTrend || !_gc)
      ? { tone: 'info', icon: 'clock', title: 'ลูกค้าโตเด่น', metric: '—',
          detail: _single
            ? 'เลือกดูเดือนเดียว · ดูการเติบโตรายลูกค้าได้ในมุมมองหลายเดือน'
            : (!_canTrend ? 'ต้องมีข้อมูลอย่างน้อย 2 เดือนจึงดูการเติบโตได้' : 'ยังไม่มีข้อมูลลูกค้าให้จัดอันดับ'),
          time: _single ? 'เลือกเดือนเดียว' : 'ข้อมูลไม่พอ' }
      : (_gc.mom > 0
          ? { tone: 'positive', icon: 'arrow-up', title: `ลูกค้าโตเด่น: ${_short(_gc.name)}`,
              metric: fmt.pct(_gc.mom), detail: `ปริมาณสั่งซื้อเดือนล่าสุดเพิ่มขึ้น ${fmt.pct(_gc.mom)} จากเดือนก่อน`, time: 'เดือนนี้' }
          : { tone: 'info', icon: 'activity', title: 'การเติบโตของลูกค้า', metric: fmt.pct(_gc.mom),
              detail: 'ยังไม่มีลูกค้าที่ปริมาณสั่งซื้อเพิ่มขึ้นจากเดือนก่อน', time: 'เดือนนี้' });

    // 4) ราคาขายเฉลี่ย — ปรับขึ้น/ลง/ทรงตัว ตามค่าจริง ("ต่อเนื่อง" ใช้เมื่อขึ้นติดกัน ≥2 เดือน)
    const _i4 = !_canTrend
      ? { tone: 'info', icon: 'tag', title: 'ราคาขายเฉลี่ย', metric: '—',
          detail: _single
            ? `เลือกดู ${_mName} · ราคาเฉลี่ย ${_fp(D.totals.avgPrice)} ฿/Kg (ดูแนวโน้มได้ในมุมมองหลายเดือน)`
            : `ราคาเฉลี่ย ${_fp(D.totals.avgPrice)} ฿/Kg (ข้อมูลเดือนเดียว ยังดูแนวโน้มไม่ได้)`, time: _single ? _mName : '1 เดือน' }
      : { tone: _pChg > 0 ? 'positive' : _pChg < 0 ? 'negative' : 'info', icon: 'activity',
          title: _pChg > 0 ? (_upStreak >= 2 ? 'ราคาขายเฉลี่ยปรับขึ้นต่อเนื่อง' : 'ราคาขายเฉลี่ยปรับขึ้น')
               : _pChg < 0 ? 'ราคาขายเฉลี่ยปรับลง' : 'ราคาขายเฉลี่ยทรงตัว',
          metric: _pChg != null ? fmt.pct(_pChg) : '—',
          detail: `เฉลี่ย ${NACT} เดือน ${_fp(D.totals.avgPrice)} ฿/Kg`, time: `${NACT} เดือน` };

    const INSIGHTS = NACT === 0 ? [] : [_i1, _i2, _i3, _i4];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KpiRow, {
      onDrill: onDrill,
      filters: filters
    }), /*#__PURE__*/React.createElement(Grid, {
      cols: 3,
      gap: 16,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: 'span 2'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17) \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (\u0E1E\u0E31\u0E19 Kg) \xB7 ${D.MONTHS_ACT[0]}\u2013${D.MONTHS_ACT[NACT-1]} 2569`,
      actions: /*#__PURE__*/React.createElement("button", {
        onClick: () => onDrill('sales'),
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          background: 'none',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-secondary)',
          padding: '5px 10px',
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-sans)',
          cursor: 'pointer'
        }
      }, "\u0E14\u0E39\u0E40\u0E15\u0E47\u0E21 ", /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        size: 13
      }))
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 250,
      labels: labels,
      yFormat: v => fmt.dec1(v / 1e6),
      series: [{
        name: `มูลค่า ${_curY} (บาท)`,
        data: val69.map(v => v == null ? null : Math.round(v)),
        color: 'var(--viz-1)',
        type: 'bar'
      }, {
        name: `ปริมาณ ${_curY} (Kg)`,
        data: vol69.map(v => v == null ? null : Math.round(v * 1000)),
        color: 'var(--viz-2)',
        type: 'line',
        axis: 'right'
      }, {
        name: `มูลค่า ${_cmpY} (บาท)`,
        data: val68.map(v => v == null ? null : Math.round(v)),
        color: 'var(--slate-400)',
        type: 'line'
      }]
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "AI Insight Engine",
      subtitle: "\u0E2A\u0E23\u0E38\u0E1B\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07",
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "accent",
        variant: "soft",
        dot: true
      }, "Live"),
      bodyStyle: {
        padding: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, INSIGHTS.map((it, i) => /*#__PURE__*/React.createElement(InsightCard, {
      key: i,
      tone: it.tone,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: it.icon,
        size: 15
      }),
      title: it.title,
      metric: it.metric,
      detail: it.detail,
      time: it.time,
      onClick: () => {}
    }))))), /*#__PURE__*/React.createElement(Grid, {
      cols: 3,
      gap: 16
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Top \u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32",
      subtitle: "\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 (Kg)",
      actions: /*#__PURE__*/React.createElement(DrillHint, null),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, [...D.PRODUCTS].sort((a,b)=>b.kg-a.kg).map((p, i, _sp) => /*#__PURE__*/React.createElement(RankBar, {
      key: p.id,
      rank: i + 1,
      label: p.name,
      value: fmt.int(p.kg) + ' Kg',
      ratio: _sp.length ? p.kg / _sp[0].kg : 0,
      share: p.share.toFixed(2) + '%',
      delta: prodGrowth(p),
      color: "var(--viz-1)",
      onClick: () => onDrill('product')
    }))), /*#__PURE__*/React.createElement("div", { style: { gridColumn: 'span 2' } }, /*#__PURE__*/React.createElement(Card, {
      title: "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32",
      subtitle: "\u0E08\u0E31\u0E14\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg) \u00B7 \u0E41\u0E2A\u0E14\u0E07\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)",
      actions: /*#__PURE__*/React.createElement(DrillHint, null),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, [...(D.allCustomers||D.CUSTOMERS)].sort((a,b)=>b.kg-a.kg).slice(0,10).map((c, i, _sc) => /*#__PURE__*/React.createElement(RankBar, {
        key: c.name + i,
        rank: i + 1,
        label: c.name,
        sublabel: fmt.int(c.kg * (D.totals.avgPrice || 0)) + ' \u0E1A\u0E32\u0E17',
        value: fmt.int(c.kg) + ' Kg',
        ratio: _sc.length ? c.kg / _sc[0].kg : 0,
        share: c.share.toFixed(2) + '%',
        delta: c.mom,
        color: "var(--viz-4)",
        onClick: () => onDrill('customer')
      }))))));
  }
  function SalesScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const [gran, setGran] = React.useState('month');
    const [type, setType] = React.useState('combo');
    const labels = gran === 'year' ? D.YEARS.map(String) : D.MONTHS_ACT;
    let series;
    if (gran === 'year') {
      // 5-month comparable totals per year
      const v = D.YEARS.map(y => D.sum(D.valueByYear[y].slice(0, NACT)));
      series = [{
        name: `มูลค่า ${NACT} เดือน (ลบ.)`,
        data: v.map(x => x == null ? null : Math.round(x)),
        color: 'var(--viz-1)',
        type: 'bar'
      }];
    } else if (type === 'combo') {
      series = [{
        name: 'มูลค่า (บาท)',
        data: D.valueByYear[2569].slice(0, NACT).map(v => v == null ? null : Math.round(v)),
        color: 'var(--viz-1)',
        type: 'bar'
      }, {
        name: 'ปริมาณ (Kg)',
        data: D.volumeByYear[2569].slice(0, NACT).map(v => v == null ? null : Math.round(v * 1000)),
        color: 'var(--viz-2)',
        type: 'line',
        axis: 'right'
      }];
    } else {
      series = D.YEARS.map((y, i) => ({
        name: 'มูลค่า ' + y + ' (บาท)',
        data: D.valueByYear[y].slice(0, NACT).map(v => v == null ? null : Math.round(v)),
        color: i === D.YEARS.length - 1 ? 'var(--viz-1)' : 'var(--slate-400)',
        type: type === 'area' && i === D.YEARS.length - 1 ? 'area' : 'line'
      }));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 ${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19`,
      value: fmt.dec2(D.totals.value),
      unit: "\u0E1A\u0E32\u0E17",
      delta: D.totals.yoyVal,
      deltaSuffix: " YoY",
      accent: true
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 ${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19`,
      value: fmt.kgM(D.totals.volume),
      unit: "",
      delta: D.totals.yoyKg,
      deltaSuffix: " YoY"
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19",
      value: fmt.int(D.totals.value / NACT),
      unit: "\u0E1A\u0E32\u0E17",
      delta: D.totals.momVal
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
      value: (() => { const arr = (D.valueByYear[2569] || []).slice(0, NACT); const vals = arr.filter(v => v != null); const mx = vals.length ? Math.max(...vals) : 0; const idx = mx > 0 ? arr.indexOf(mx) : -1; return idx >= 0 ? (D.MONTHS_ACT[idx] || '\u2014') : '\u2014'; })(),
      unit: (() => { const arr = (D.valueByYear[2569] || []).slice(0, NACT).filter(v => v != null); return arr.length && NACT > 0 ? fmt.int(Math.max(0, ...arr)) + ' \u0E1A\u0E32\u0E17' : '\u2014 \u0E1A\u0E32\u0E17'; })(),
      delta: D.totals.momVal
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21 \u2014 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 2568 vs 2569",
      subtitle: `${D.MONTHS_ACT[0]}\u2013${D.MONTHS_ACT[NACT-1]} (${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07)`,
      actions: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: type,
        onChange: setType,
        options: [{
          value: 'multi',
          label: 'Multi-Line'
        }, {
          value: 'combo',
          label: 'Combo'
        }, {
          value: 'area',
          label: 'Area'
        }]
      }), /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: gran,
        onChange: setGran,
        options: [{
          value: 'month',
          label: 'รายเดือน'
        }, {
          value: 'year',
          label: 'รายปี'
        }]
      }))
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 340,
      labels: labels,
      yFormat: v => fmt.dec1(v / 1e6),
      showDots: gran !== 'month',
      series: series
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 \xB7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 \xB7 \u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
      style: {
        marginTop: 16
      },
      padding: "none"
    }, /*#__PURE__*/React.createElement(MonthTable, {D, filters})));
  }
  function MonthTable({D, filters}) {
    const {
      DataTable
    } = NS;
    const curY = String((filters && filters.year) || '2569');
    const cmpY = String(parseInt(curY) - 1);
    const rows = D.MONTHS_ACT.map((m, i) => ({
      month: m,
      v_cur: (D.valueByYear[2569] || [])[i],
      v_cmp: (D.valueByYear[2568] || [])[i],
      kg69: (D.volumeByYear[2569] || [])[i],
      price: (D.price69 || [])[i],
      yoy: (() => { const a = (D.valueByYear[2569]||[])[i], b = (D.valueByYear[2568]||[])[i]; return (a != null && b) ? +((a/b - 1)*100).toFixed(2) : null; })()
    }));
    return /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      sortable: false,
      rowKey: r => r.month,
      columns: [{
        key: 'month',
        header: 'เดือน',
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 500
          }
        }, r.month)
      }, {
        key: 'v_cmp',
        header: `มูลค่า ${cmpY} (บาท)`,
        numeric: true,
        render: r => r.v_cmp != null ? fmt.dec1(r.v_cmp / 1e6) : '—'
      }, {
        key: 'v_cur',
        header: `มูลค่า ${curY} (บาท)`,
        numeric: true,
        render: r => r.v_cur != null ? fmt.dec1(r.v_cur / 1e6) : '—'
      }, {
        key: 'kg69',
        header: 'ปริมาณ (Kg)',
        numeric: true,
        render: r => r.kg69 != null ? fmt.int(r.kg69 * 1000) : '—'
      }, {
        key: 'price',
        header: 'ราคาเฉลี่ย (฿/Kg)',
        numeric: true,
        render: r => r.price != null ? fmt.dec1(r.price) : '—'
      }, {
        key: 'yoy',
        header: '% YoY',
        numeric: true,
        render: r => r.yoy != null ? /*#__PURE__*/React.createElement(DeltaBadge, {
          value: r.yoy,
          size: "sm"
        }) : /*#__PURE__*/React.createElement("span", {style:{color:'var(--text-tertiary)'}}, '—')
      }]
    });
  }
  window.viewFor = viewFor;
  window.OverviewScreen = OverviewScreen;
  window.SalesScreen = SalesScreen;
})();

// --- ScreensB ---
/* Screens: Product Analysis (+detail), Product Mix, Price Analysis → window.{ProductScreen, MixScreen, PriceScreen} */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    KpiCard,
    DeltaBadge,
    RankBar,
    DataTable,
    LineChart,
    DonutChart,
    SegmentedControl,
    Badge,
    Button
  } = NS;
  const Icon = window.Icon;
  const {
    fmt
  } = window.VUtil;
  const {
    Grid
  } = window;
  const viewFor = window.viewFor || function(f){ return window.VDATA; };
  const D = window.VDATA;
  const NACT = D.NACT;
  const prodGrowth = p => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(2) : 0;
  // per-product monthly volume (Kg) derived from monthly value (บาท) ÷ monthly price (฿/Kg)
  const prodKg = p => p.monthly.map((v, i) => p.priceMonthly[i] ? Math.round(v / p.priceMonthly[i]) : 0);
  const prodKgK = p => prodKg(p).map(k => +(k / 1000).toFixed(2)); // พัน Kg


  // ---------- Product Analysis ----------
  function ProductScreen({ filters }) {
    const D = viewFor(filters);
    const _Dfull = viewFor(Object.assign({}, filters, { month: 'all' }));
    const _gMonArr = filters && filters.month != null && filters.month !== 'all' && filters.month !== '' ? String(filters.month).split(',').map(Number).filter((x) => !isNaN(x)) : []; const _gMon = _gMonArr.length ? _gMonArr[_gMonArr.length - 1] : null;
    const NACT = D.NACT;
    const prodGrowth = (p) => {
      if (_gMon != null && _gMon >= 1) {
        const fp = _Dfull.PRODUCTS.find(x => x.name === p.name) || p;
        const cur = (fp.monthly || [])[_gMon] || 0;
        const prev = (fp.monthly || [])[_gMon - 1];
        return prev ? +((cur / prev - 1) * 100).toFixed(2) : 0;
      }
      return p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(2) : 0;
    };
    const [metric, setMetric] = React.useState('val'); // val | kg
    const [sel, setSel] = React.useState(null);
    const sorted = [...D.PRODUCTS].sort((a, b) => b[metric] - a[metric]);
    const max = sorted.length ? sorted[0][metric] : 1;
    if (sel) {
      const _live = _Dfull.PRODUCTS.find(x => x.id === sel.id) || _Dfull.PRODUCTS.find(x => x.name === sel.name) || sel;
      return /*#__PURE__*/React.createElement(ProductDetail, {
        product: _live,
        onBack: () => setSel(null),
        viewD: _Dfull,
        monIdx: _gMon,
        monAll: _gMon == null
      });
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 (\u0E02\u0E19\u0E32\u0E14)",
      value: String(D.PRODUCTS.filter(p => p.kg > 0).length),
      unit: "SKU",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "package",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21",
      value: fmt.dec2(D.totals.value),
      unit: "\u0E1A\u0E32\u0E17",
      delta: D.totals.momVal
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
      value: D.totals.avgPrice.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}),
      unit: "\u0E3F/Kg",
      delta: D.price69 && D.price69[NACT - 2] ? +((D.price69[NACT - 1] / D.price69[NACT - 2] - 1) * 100).toFixed(1) : 0
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: `สินค้าทั้งหมด — ${metric === 'val' ? 'มูลค่าขาย' : 'ปริมาณขาย'}`,
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: metric,
        onChange: setMetric,
        options: [{
          value: 'val',
          label: 'มูลค่า'
        }, {
          value: 'kg',
          label: 'ปริมาณ'
        }]
      }),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, sorted.slice(0, 10).map((p, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: p.id,
      rank: i + 1,
      label: p.name,      value: metric === 'val' ? fmt.dec1(p.val / 1e6) + ' ลบ.' : fmt.int(p.kg) + ' Kg',
      ratio: p[metric] / max,
      share: p.share.toFixed(2) + '%',
      delta: prodGrowth(p),
      color: `var(--viz-${i % 8 + 1})`,
      onClick: () => setSel(p)
    })))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 (Kg)",
      subtitle: (D.PRODUCTS.length <= 6 ? "Kg \xB7 \u0E17\u0E38\u0E01\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32" : "Kg \xB7 Top 6 \u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"),
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "neutral",
        size: "sm"
      }, "\u0E2B\u0E19\u0E48\u0E27\u0E22: \u0E1E\u0E31\u0E19 Kg"),
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 280,
      labels: D.MONTHS_ACT,
      yFormat: v => fmt.int(v),
      showDots: true,
      series: [...[...D.PRODUCTS].sort((a, b) => b.kg - a.kg).slice(0, 6).map((p, i) => ({
        name: p.name,
        data: prodKg(p),
        color: `var(--viz-${i % 8 + 1})`,
        type: 'line'
      }))]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32)",
      subtitle: "\u0E04\u0E25\u0E34\u0E01\u0E41\u0E16\u0E27\u0E40\u0E1E\u0E37\u0E48\u0E2D Drill Down",
      padding: "none"
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: sorted.slice(0, 10),
      onRowClick: setSel,
      rowKey: r => r.id,
      columns: [{
        key: '_r',
        header: '#',
        width: 48,
        numeric: true,
        sortable: false,
        render: r => sorted.indexOf(r) + 1
      }, {
        key: 'name',
        header: 'สินค้า (ขนาด)',
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 500
          }
        }, r.name)
      }, {
        key: 'kg',
        header: 'ปริมาณ (Kg)',
        numeric: true,
        render: r => fmt.int(r.kg)
      }, {
        key: 'val',
        header: 'มูลค่า (บาท)',
        numeric: true,
        render: r => fmt.int(r.val)
      }, {
        key: 'avgPrice',
        header: 'ราคาเฉลี่ย (฿/Kg)',
        numeric: true,
        render: r => fmt.dec1(r.avgPrice)
      }, {
        key: 'share',
        header: 'สัดส่วน',
        numeric: true,
        render: r => r.share.toFixed(2) + '%'
      }, {
        key: 'g',
        header: 'MoM',
        numeric: true,
        sortable: false,
        render: r => /*#__PURE__*/React.createElement(DeltaBadge, {
          value: prodGrowth(r),
          size: "sm"
        })
      }]
    })));
  }
  function ProductDetail({
    product: p,
    onBack,
    viewD,
    monIdx,
    monAll
  }) {
    const _D = viewD || window.VDATA;
    const _NACTp = _D.NACT || p.monthly.length || 1;
    const _single = !monAll && monIdx != null && monIdx >= 0 && monIdx < _NACTp;
    const _mi = _single ? monIdx : _NACTp - 1;
    const _mName = _D.MONTHS_ACT[_mi] || '';
    const _chartLen = _single ? _mi + 1 : _NACTp;
    const _pg = p.monthly.length >= 2 && p.monthly[p.monthly.length - 2] ? +((p.monthly[p.monthly.length - 1] / p.monthly[p.monthly.length - 2] - 1) * 100).toFixed(1) : 0;
    const _kArr = prodKg(p);
    const _kg = _kArr.length >= 2 && _kArr[_kArr.length - 2] ? +((_kArr[_kArr.length - 1] / _kArr[_kArr.length - 2] - 1) * 100).toFixed(1) : 0;
    const _pp = p.priceMonthly.length >= 2 && p.priceMonthly[p.priceMonthly.length - 2] ? +((p.priceMonthly[p.priceMonthly.length - 1] / p.priceMonthly[p.priceMonthly.length - 2] - 1) * 100).toFixed(1) : 0;
    const topCustForProduct = [..._D.CUSTOMERS].sort((a, b) => b.kg - a.kg).slice(0, 5);
    const _kgArrM = prodKg(p);
    const _curVal = _single ? (p.monthly[_mi] || 0) : p.val;
    const _curKgM = _single ? (_kgArrM[_mi] || 0) : p.kg;
    const _curPrice = _single ? (p.priceMonthly[_mi] || 0) : p.avgPrice;
    const _curMom = _mi >= 1 && p.monthly[_mi - 1] ? +((p.monthly[_mi] / p.monthly[_mi - 1] - 1) * 100).toFixed(1) : (_single ? 0 : _pg);
    const _kgMom = _mi >= 1 && _kgArrM[_mi - 1] ? +((_kgArrM[_mi] / _kgArrM[_mi - 1] - 1) * 100).toFixed(1) : (_single ? 0 : _kg);
    const _monValTot = _single ? _D.PRODUCTS.reduce((s, x) => s + ((x.monthly || [])[_mi] || 0), 0) : 0;
    const _curShare = _single ? (_monValTot ? +(_curVal / _monValTot * 100).toFixed(1) : 0) : p.share;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-left",
        size: 15
      }),
      onClick: onBack
    }, "\u0E01\u0E25\u0E31\u0E1A"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 'var(--radius-md)',
        background: 'var(--accent-subtle)',
        color: 'var(--accent-hover)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "package",
      size: 19
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-lg)',
        fontWeight: 600,
        color: 'var(--text-primary)'
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, "\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A #", [..._D.PRODUCTS].sort((a, b) => b.val - a.val).indexOf(p) + 1))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(DeltaBadge, {
      value: _pg,
      size: "lg",
      suffix: " MoM"
    })), /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? ("\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 " + _mName) : `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 ${_D.NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19`,
      value: fmt.int(_curVal),
      unit: "\u0E1A\u0E32\u0E17",
      delta: _curMom,
      accent: true
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? ("\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 " + _mName) : "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22",
      value: fmt.int(_curKgM),
      unit: "Kg",
      delta: _kgMom
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
      value: fmt.dec1(_curPrice),
      unit: "\u0E3F/Kg",
      delta: _pp
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? ("\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1E\u0E2D\u0E23\u0E4C\u0E15 " + _mName) : "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1E\u0E2D\u0E23\u0E4C\u0E15",
      value: _curShare,
      unit: "%"
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 + \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 \u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 2569",
      subtitle: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17) \u0E41\u0E01\u0E19\u0E0B\u0E49\u0E32\u0E22 \xB7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg) \u0E41\u0E01\u0E19\u0E02\u0E27\u0E32 \xB7 " + ((_D.MONTHS_ACT[0] || '') + (_chartLen > 1 ? "\u2013" + (_D.MONTHS_ACT[_chartLen - 1] || '') : '')),
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 240,
      labels: _D.MONTHS_ACT.slice(0, _chartLen),
      yFormat: v => fmt.dec1(v / 1e6),
      showDots: true,
      series: [{
        name: 'มูลค่า (บาท)',
        data: p.monthly.slice(0, _chartLen).map(v => v == null ? null : Math.round(v)),
        color: 'var(--viz-1)',
        type: 'bar'
      }, {
        name: 'ปริมาณ (Kg)',
        data: prodKg(p).slice(0, _chartLen),
        color: 'var(--viz-2)',
        type: 'line',
        axis: 'right'
      }]
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 2569",
      subtitle: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg) \xB7 " + (_D.MONTHS_ACT.length ? (_D.MONTHS_ACT[0] + "\u2013" + _D.MONTHS_ACT[_D.MONTHS_ACT.length - 1]) : "")
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 220,
      labels: _D.MONTHS_ACT.slice(0, _chartLen),
      yFormat: v => fmt.int(v),
      series: [{
        name: p.name,
        data: prodKg(p).slice(0, _chartLen),
        color: 'var(--viz-2)',
        type: 'area'
      }]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: "\u0E3F/Kg"
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 220,
      labels: _D.MONTHS_ACT.slice(0, _chartLen),
      yFormat: v => fmt.int(v),
      series: [{
        name: 'ราคา',
        data: p.priceMonthly.slice(0, _chartLen),
        color: 'var(--viz-3)',
        type: 'line'
      }]
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E17\u0E35\u0E48\u0E0B\u0E37\u0E49\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E19\u0E35\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14",
      subtitle: "\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25 \u00B7 \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u00D7\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E08\u0E23\u0E34\u0E07",
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "warning",
        variant: "soft"
      }, "\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07"),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, topCustForProduct.map((c, i) => {
      const portion = [0.3, 0.22, 0.18, 0.16, 0.14][i];
      return /*#__PURE__*/React.createElement(RankBar, {
        key: c.id,
        rank: i + 1,
        label: c.name,
        sublabel: fmt.int(p.kg * portion) + ' Kg (ประมาณ)',
        value: (portion * 100).toFixed(2) + '%',
        ratio: [1, 0.73, 0.6, 0.53, 0.46][i],
        color: "var(--viz-4)"
      });
    })));
  }

  // ---------- Product Mix (treemap) ----------
  function Treemap({
    data,
    height = 300
  }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const [hover, setHover] = React.useState(null);
    if (!sorted.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        height
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: sorted.length ? sorted[0].value : 1,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Cell, {
      d: sorted[0],
      total: total,
      hover: hover,
      setHover: setHover
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: sorted.slice(1, 4).reduce((s, d) => s + d.value, 0),
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, sorted.slice(1, 4).map(d => /*#__PURE__*/React.createElement("div", {
      key: d.label,
      style: {
        flex: d.value,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Cell, {
      d: d,
      total: total,
      hover: hover,
      setHover: setHover
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: Math.max(1, sorted.slice(4).reduce((s, d) => s + d.value, 0)),
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, sorted.slice(4).map(d => /*#__PURE__*/React.createElement("div", {
      key: d.label,
      style: {
        flex: d.value,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Cell, {
      d: d,
      total: total,
      hover: hover,
      setHover: setHover,
      small: true
    })))));
  }
  function Cell({
    d,
    total,
    hover,
    setHover,
    small
  }) {
    const on = hover === d.label;
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => setHover(d.label),
      onMouseLeave: () => setHover(null),
      style: {
        flex: 1,
        background: d.color,
        borderRadius: 'var(--radius-sm)',
        padding: small ? '7px 9px' : '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        outline: on ? '2px solid var(--text-primary)' : 'none',
        outlineOffset: -2,
        overflow: 'hidden',
        filter: hover && !on ? 'brightness(0.7)' : 'none',
        transition: 'filter var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: small ? 11 : 'var(--text-sm)',
        fontWeight: 600,
        color: '#fff',
        textShadow: '0 1px 2px rgba(0,0,0,.4)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, d.label), !small && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-numeric)',
        fontSize: 'var(--text-xs)',
        color: 'rgba(255,255,255,.85)',
        textShadow: '0 1px 2px rgba(0,0,0,.4)'
      }
    }, (d.value / total * 100).toFixed(2), "%"));
  }
  function MixScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const prodGrowth = p => p.monthly[NACT - 2] ? +((p.monthly[NACT - 1] / p.monthly[NACT - 2] - 1) * 100).toFixed(2) : 0;
    const [view, setView] = React.useState('treemap');
    const sorted = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const segs = sorted.map((p, i) => ({
      label: p.name,
      value: Math.round(p.val),
      color: `var(--viz-${i % 8 + 1})`
    }));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E41\u0E15\u0E48\u0E25\u0E30\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 (Product Mix)",
      subtitle: `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 (\u0E1A\u0E32\u0E17) \xB7 ${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19 2569`,
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: view,
        onChange: setView,
        options: [{
          value: 'treemap',
          label: 'Treemap'
        }, {
          value: 'pie',
          label: 'Pie'
        }]
      })
    }, view === 'treemap' ? /*#__PURE__*/React.createElement(Treemap, {
      data: segs,
      height: 320
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 0'
      }
    }, /*#__PURE__*/React.createElement(DonutChart, {
      size: 260,
      thickness: 40,
      centerValue: fmt.int(D.totals.value),
      centerLabel: "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (\u0E1A\u0E32\u0E17)",
      valueFormat: v => fmt.int(v) + ' บาท',
      data: segs
    }))), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Product Ranking",
      subtitle: "\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32",
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, sorted.map((p, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: p.id,
      rank: i + 1,
      label: p.name,      value: p.share.toFixed(2) + '%',
      ratio: sorted.length ? p.val / sorted[0].val : 0,
      delta: prodGrowth(p),
      color: `var(--viz-${i % 8 + 1})`
    })))));
  }

  // ---------- Price Analysis ----------
  function PriceScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const [gran, setGran] = React.useState('month');
    const data = gran === 'year' ? D.YEARS.map(y => Math.round(D.sum(D.valueByYear[y].slice(0, NACT)) / (D.sum(D.volumeByYear[y].slice(0, NACT)) * 1000))) : D.price69;
    const labels = gran === 'year' ? D.YEARS.map(String) : D.MONTHS_ACT;
    const prodByPrice = [...D.PRODUCTS].sort((a, b) => b.avgPrice - a.avgPrice);

    // real price alerts: products whose last-month price deviates strongly from their 5mo avg
    const alerts = D.PRODUCTS.map(p => {
      const last = p.priceMonthly[NACT - 1],
        first = p.priceMonthly[0];
      const change = first ? +((last / first - 1) * 100).toFixed(2) : 0;
      return {
        name: p.name,
        change
      };
    }).filter(a => Math.abs(a.change) >= 8).sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 5);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 200,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D Kg",
      value: D.totals.avgPrice.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}),
      unit: "\u0E3F/Kg",
      delta: (D.price69[NACT - 1] / D.price69[0] - 1) * 100,
      deltaSuffix: " 5\u0E40\u0E14\u0E37\u0E2D\u0E19",
      accent: true,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "tag",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32",
      value: fmt.int(D.totals.value / (D.PRODUCTS.filter(p => p.kg > 0).length || 1)),
      unit: "\u0E1A\u0E32\u0E17/SKU",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "package",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32",
      value: fmt.int(D.totals.value / (D.nCustomers || 1)),
      unit: "\u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E23\u0E32\u0E04\u0E32\u0E02\u0E32\u0E22\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 (Average Selling Price)",
      subtitle: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 \xF7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 \xB7 \u0E3F/Kg",
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: gran,
        onChange: setGran,
        options: [{
          value: 'month',
          label: 'รายเดือน'
        }, {
          value: 'year',
          label: 'รายปี'
        }]
      })
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 280,
      labels: labels,
      yFormat: v => '฿' + fmt.int(v),
      showDots: true,
      series: [{
        name: 'ราคาเฉลี่ย ฿/Kg',
        data,
        color: 'var(--viz-3)',
        type: 'area'
      }]
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E23\u0E32\u0E04\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32",
      subtitle: "Top \u0E15\u0E32\u0E21\u0E23\u0E32\u0E04\u0E32 \u0E3F/Kg",
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, prodByPrice.slice(0, 8).map((p, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: p.id,
      rank: i + 1,
      label: p.name,      value: fmt.dec1(p.avgPrice) + ' ฿/Kg',
      ratio: prodByPrice.length ? p.avgPrice / prodByPrice[0].avgPrice : 0,
      color: "var(--viz-3)"
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E23\u0E32\u0E04\u0E32",
      subtitle: "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E40\u0E01\u0E34\u0E19 \xB18% (\u0E21.\u0E04.\u2192\u0E1E.\u0E04.)",
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "warning",
        dot: true
      }, alerts.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"),
      bodyStyle: {
        padding: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, alerts.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-tertiary)',
        fontSize: 'var(--text-sm)',
        padding: 8
      }
    }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C"), alerts.map((a, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        background: 'var(--surface-2)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: a.change >= 0 ? 'var(--positive)' : 'var(--negative)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.change >= 0 ? 'trending-up' : 'trending-down',
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        color: 'var(--text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, a.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, "\u0E23\u0E32\u0E04\u0E32\u0E1B\u0E23\u0E31\u0E1A", a.change >= 0 ? 'ขึ้น' : 'ลด', "\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C")), /*#__PURE__*/React.createElement(DeltaBadge, {
      value: a.change,
      size: "md"
    })))))));
  }
  window.ProductScreen = ProductScreen;
  window.MixScreen = MixScreen;
  window.PriceScreen = PriceScreen;
})();

// --- ScreensC ---
/* Screens: Customer Analysis (+detail), Customer Contribution → window.{CustomerScreen, ContributionScreen}
   Customers carry Kg (real), share, MoM, monthly[5]. No per-customer value in source. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    KpiCard,
    DeltaBadge,
    RankBar,
    DataTable,
    LineChart,
    DonutChart,
    ParetoChart,
    SegmentedControl,
    Badge,
    Button,
    InsightCard
  } = NS;
  const Icon = window.Icon;
  const {
    fmt
  } = window.VUtil;
  const {
    Grid
  } = window;
  const viewFor = window.viewFor || function(f){ return window.VDATA; };
  const D = window.VDATA;
  const NACT = D.NACT;
  function CustomerScreen({ filters }) {
    // keep full months so the trend chart, ranking and segmented control work;
    // the global month dropdown drives the internal `mon` selection instead of slicing data
    const D = viewFor(Object.assign({}, filters, { month: 'all' }));
    const NACT = D.NACT;
    const [sel, setSel] = React.useState(null);
    const _gMonArr = filters && filters.month != null && filters.month !== 'all' && filters.month !== '' ? String(filters.month).split(',').map(Number).filter((x) => !isNaN(x)) : []; const _gMon = _gMonArr.length ? _gMonArr[_gMonArr.length - 1] : null;
    const [mon, setMon] = React.useState(_gMon != null ? _gMon : (NACT - 1)); // selected month index, synced with global filter
    React.useEffect(() => { setMon(_gMon != null ? _gMon : (NACT - 1)); }, [_gMon, NACT]);
    const sorted = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    const max = sorted.length ? sorted[0].kg : 1;
    const fastest = [...D.CUSTOMERS].sort((a, b) => b.mom - a.mom)[0] || { name: '—', mom: 0 };
    const [custMetric, setCustMetric] = React.useState('kg'); // kg | val
    const _avgP = D.totals.avgPrice || 0;

    // Top 10 ranked by the selected month's volume (Kg)
    const byMonth = [...D.CUSTOMERS].sort((a, b) => (b.monthly[mon] || 0) - (a.monthly[mon] || 0)).slice(0, 10);
    // All customers with purchases in selected month
    const maxMon = byMonth[0] ? byMonth[0].monthly[mon] || 1 : 1;
    const monTotal = (D.allCustomers||D.CUSTOMERS).reduce((s, c) => s + (c.monthly[mon] || 0), 0);
    // ตารางลูกค้าทั้งหมด: ทำตามตัวกรองเดือนด้านบน — "ทุกเดือน" = แสดงลูกค้าทุกรายเรียงตามยอดรวม
    const gAll = !filters || filters.month == null || filters.month === 'all' || filters.month === '';
    const baseAll = D.allCustomers || D.CUSTOMERS;
    const allByMonth = gAll
      ? [...baseAll].filter(cx => (cx.kg || 0) > 0).sort((a, b) => (b.kg || 0) - (a.kg || 0))
      : [...baseAll].filter(cx => (cx.monthly[mon] || 0) > 0).sort((a, b) => (b.monthly[mon] || 0) - (a.monthly[mon] || 0));
    // month-aware list KPIs: reflect the selected month when one is chosen
    const _kCount = gAll ? D.nCustomers : baseAll.filter(cx => (cx.monthly[mon] || 0) > 0).length;
    const _kTotalKg = gAll ? D.custTotalKg : monTotal;
    const _kAvg = _kCount ? _kTotalKg / _kCount : 0;
    const _kTop10 = gAll
      ? (D.custTotalKg ? sorted.slice(0, 10).reduce((s, c) => s + c.kg, 0) / D.custTotalKg * 100 : 0)
      : (monTotal ? byMonth.reduce((s, c) => s + (c.monthly[mon] || 0), 0) / monTotal * 100 : 0);
    // ลูกค้าประจำ = ซื้อครบทุกเดือน (monthly[i] > 0 ทุกเดือน)
    const regulars = baseAll.filter(c => { for (let i = 0; i < NACT; i++) { if (!((c.monthly[i] || 0) > 0)) return false; } return NACT > 0; }).sort((a, b) => b.kg - a.kg);
    // ลูกค้าใหม่ในเดือนที่เลือก = ซื้อครั้งแรกในเดือนนั้น (ไม่เคยซื้อในเดือนก่อนหน้า)
    const _firstMonthOf = (c) => { for (let i = 0; i < NACT; i++) { if ((c.monthly[i] || 0) > 0) return i; } return -1; };
    const newInMon = baseAll.filter(c => _firstMonthOf(c) === mon).sort((a, b) => (b.monthly[mon] || 0) - (a.monthly[mon] || 0));
    if (sel) return /*#__PURE__*/React.createElement(CustomerDetail, {
      customer: sel,
      onBack: () => setSel(null),
      viewD: D,
      monIdx: mon,
      monAll: _gMon == null
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: gAll ? "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32" : "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 (\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49)",
      value: String(_kCount),
      unit: "\u0E23\u0E32\u0E22",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22",
      value: fmt.int(_kAvg),
      unit: "Kg",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "box",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "Top 10 = \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19",
      value: _kTop10.toFixed(2),
      unit: "%"
    }),/*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E42\u0E15\u0E40\u0E23\u0E47\u0E27\u0E2A\u0E38\u0E14",
      value: (() => { const nm = (fastest.name || '').replace(/^บริษัท\s*/, '').replace(/\s*จำกัด.*$/, '').trim() || fastest.name; return nm.length > 16 ? nm.slice(0, 16) + '…' : nm; })(),
      unit: fmt.pct(fastest.mom),
      delta: fastest.mom,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trending-up",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: custMetric === 'val' ? "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 \u2014 \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E02\u0E32\u0E22 (\u0E1A\u0E32\u0E17)" : "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 (Kg)",
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: custMetric,
        onChange: setCustMetric,
        options: [{ value: 'kg', label: 'Kg' }, { value: 'val', label: '\u0E1A\u0E32\u0E17' }]
      }),
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, sorted.slice(0, 10).map((c, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: c.id,
      rank: i + 1,
      label: c.name,
      sublabel: c.share.toFixed(2) + '% ของยอดรวม',
      value: custMetric === 'val' ? fmt.int(c.kg * _avgP) + ' บาท' : fmt.int(c.kg) + ' Kg',
      ratio: c.kg / max,
      share: null,
      delta: c.mom,
      color: "var(--viz-4)",
      onClick: () => setSel(c)
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 \u2014 Top 10 vs \u0E2D\u0E37\u0E48\u0E19 \u0E46"
    }, /*#__PURE__*/React.createElement(DonutChart, {
      size: 180,
      thickness: 26,
      centerValue: Math.round(D.custTotalKg).toLocaleString('en-US'),
      centerLabel: "Kg \u0E23\u0E27\u0E21",
      valueFormat: v => Math.round(v).toLocaleString('en-US') + " Kg",
      data: [...sorted.slice(0, 10).map((c, i) => ({
        label: c.name,
        value: c.kg,
        color: `var(--viz-${(i % 5) + 1})`
      })), {
        label: 'ลูกค้าอื่น',
        value: D.custTotalKg - sorted.slice(0, 10).reduce((s, c) => s + c.kg, 0),
        color: 'var(--slate-500)'
      }]
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 \u2014 \u0E08\u0E31\u0E14\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: `ปริมาณ (Kg) เฉพาะเดือน ${D.MONTHS_ACT[mon]} · อันดับเปลี่ยนตามเดือน`,
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: String(mon),
        onChange: v => setMon(+v),
        options: D.MONTHS_ACT.map((m, i) => ({
          value: String(i),
          label: m
        }))
      }),
      bodyStyle: {
        padding: 'var(--space-2)'
      },
      style: {
        marginBottom: 16
      }
    }, byMonth.map((c, i) => /*#__PURE__*/React.createElement(RankBar, {
      key: c.id,
      rank: i + 1,
      label: c.name,
      sublabel: monTotal ? ((c.monthly[mon] || 0) / monTotal * 100).toFixed(2) + '% ของเดือน' : '—',
      value: fmt.int(c.monthly[mon] || 0) + ' Kg',
      ratio: (c.monthly[mon] || 0) / maxMon,
      delta: mon > 0 && c.monthly[mon - 1] ? +(((c.monthly[mon] || 0) / c.monthly[mon - 1] - 1) * 100).toFixed(2) : null,
      color: "var(--viz-5)",
      onClick: () => setSel(c)
    }))), /*#__PURE__*/React.createElement(Grid, {
      cols: 2, gap: 16, style: { marginTop: 16 }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "ลูกค้าประจำ (ซื้อครบทุกเดือน)",
      subtitle: regulars.length + " ราย · ซื้อต่อเนื่องทั้ง " + NACT + " เดือน",
      padding: "none"
    }, regulars.length ? /*#__PURE__*/React.createElement(DataTable, {
      rows: regulars, onRowClick: setSel, rowKey: r => r.name,
      columns: [
        { key: '_r', header: '#', width: 48, numeric: true, sortable: false, render: (r, i) => i + 1 },
        { key: 'name', header: 'ลูกค้า', render: r => /*#__PURE__*/React.createElement("span", { style: { fontWeight: 500 } }, r.name) },
        { key: 'kg', header: 'ปริมาณรวม (Kg)', numeric: true, render: r => fmt.int(r.kg) },
        { key: 'mom', header: '% MoM', numeric: true, render: r => /*#__PURE__*/React.createElement(DeltaBadge, { value: r.mom, size: "sm" }) }
      ]
    }) : /*#__PURE__*/React.createElement("div", { style: { padding: 24, color: 'var(--text-tertiary)', textAlign: 'center' } }, "ไม่มีลูกค้าที่ซื้อครบทุกเดือน")), /*#__PURE__*/React.createElement(Card, {
      title: "ลูกค้าใหม่ — เดือน " + D.MONTHS_ACT[mon],
      subtitle: mon === 0 ? "เดือนแรก — ใช้เป็นฐานเริ่มต้น" : (newInMon.length + " ราย · ซื้อครั้งแรกในเดือนนี้"),
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm", value: String(mon), onChange: v => setMon(+v),
        options: D.MONTHS_ACT.map((m, i) => ({ value: String(i), label: m }))
      }),
      padding: "none"
    }, newInMon.length ? /*#__PURE__*/React.createElement(DataTable, {
      rows: newInMon, onRowClick: setSel, rowKey: r => r.name,
      columns: [
        { key: '_r', header: '#', width: 48, numeric: true, sortable: false, render: (r, i) => i + 1 },
        { key: 'name', header: 'ลูกค้า', render: r => /*#__PURE__*/React.createElement("span", { style: { fontWeight: 500 } }, r.name) },
        { key: 'monKg', header: 'ปริมาณ (Kg)', numeric: true, render: r => fmt.int(r.monthly[mon] || 0) }
      ]
    }) : /*#__PURE__*/React.createElement("div", { style: { padding: 24, color: 'var(--text-tertiary)', textAlign: 'center' } }, mon === 0 ? "เดือนแรก ยังไม่มีฐานให้เทียบ" : "ไม่มีลูกค้าใหม่ในเดือนนี้"))), /*#__PURE__*/React.createElement(Card, {
      title: gAll ? "ลูกค้าทั้งหมด (ทุกเดือน)" : ("ลูกค้าทั้งหมดในเดือน " + D.MONTHS_ACT[mon]),
      subtitle: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E17\u0E35\u0E48\u0E21\u0E35\u0E22\u0E2D\u0E14\u0E0B\u0E37\u0E49\u0E2D · " + allByMonth.length + " \u0E23\u0E32\u0E22",
      padding: "none",
      style: { marginTop: 16 }
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: allByMonth,
      onRowClick: setSel,
      rowKey: r => r.name,
      columns: [{
        key: '_r',
        header: '#',
        width: 48,
        numeric: true,
        sortable: false,
        render: (r, i) => i + 1
      }, {
        key: 'name',
        header: '\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32',
        render: r => /*#__PURE__*/React.createElement("span", { style: { fontWeight: 500 } }, r.name)
      }, {
        key: 'monKg',
        header: '\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg)',
        numeric: true,
        render: r => gAll ? fmt.int(r.kg) : fmt.int(r.monthly[mon] || 0)
      }, {
        key: 'monShare',
        header: '\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19',
        numeric: true,
        render: r => gAll ? ((r.share != null ? r.share : 0).toFixed(2) + '%') : (monTotal ? ((r.monthly[mon] || 0) / monTotal * 100).toFixed(2) + '%' : '\u2014')
      }, {
        key: 'monDelta',
        header: '% MoM',
        numeric: true,
        render: r => gAll
          ? /*#__PURE__*/React.createElement(DeltaBadge, { value: r.mom, size: "sm" })
          : (mon > 0 && r.monthly[mon - 1]
            ? /*#__PURE__*/React.createElement(DeltaBadge, { value: +(((r.monthly[mon] || 0) / r.monthly[mon - 1] - 1) * 100).toFixed(2), size: "sm" })
            : /*#__PURE__*/React.createElement("span", { style: { color: 'var(--text-tertiary)' } }, '\u2014'))
      }]
    })));
  }
  function CustomerDetail({
    customer: c,
    onBack,
    viewD,
    monIdx,
    monAll
  }) {
    const _detailD = viewD || window.VDATA;
    const _allC = _detailD.allCustomers || _detailD.CUSTOMERS || [];
    const _NACT = _detailD.NACT || 1;
    const rank = [..._allC].sort((a, b) => b.kg - a.kg).findIndex(x => x.name === c.name) + 1;
    const avgPrice = _detailD.totals.avgPrice;
    // month-aware: when a specific month is selected in the global filter, KPIs reflect that month
    const _single = !monAll && monIdx != null && monIdx >= 0 && monIdx < _NACT;
    const _mi = _single ? monIdx : _NACT - 1;
    const _mName = _detailD.MONTHS_ACT[_mi] || '';
    const _curKg = _single ? (c.monthly[_mi] || 0) : c.kg;
    const _momM = _mi >= 1 && c.monthly[_mi - 1] ? +((c.monthly[_mi] / c.monthly[_mi - 1] - 1) * 100).toFixed(1) : (_single ? 0 : c.mom);
    const _monTot = _single ? _allC.reduce((s, x) => s + (x.monthly[_mi] || 0), 0) : 0;
    const _curShare = _single ? (_monTot ? _curKg / _monTot * 100 : 0) : c.share;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-left",
        size: 15
      }),
      onClick: onBack
    }, "\u0E01\u0E25\u0E31\u0E1A"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,var(--viz-4),var(--accent))',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600
      }
    }, c.name[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-lg)',
        fontWeight: 600,
        color: 'var(--text-primary)'
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, "\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A #", rank, " \xB7 ", c.share, "% \u0E02\u0E2D\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E23\u0E27\u0E21"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(DeltaBadge, {
      value: _momM,
      size: "lg",
      suffix: " MoM"
    })), /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? ("\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E40\u0E14\u0E37\u0E2D\u0E19 " + _mName) : "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21",
      value: fmt.int(_curKg),
      unit: "Kg",
      delta: _momM,
      accent: true
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E42\u0E14\u0E22\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",
      value: fmt.int(_curKg * avgPrice),
      unit: "\u0E1A\u0E32\u0E17",
      delta: _momM
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49" : "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13",
      value: _curShare.toFixed(2),
      unit: "%"
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: _single ? `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E23\u0E27\u0E21 ${_NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19` : "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19",
      value: _single ? fmt.int(c.kg) : fmt.int(c.kg / (_NACT || 1)),
      unit: "Kg",
      delta: _single ? undefined : c.mom
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 3,
      gap: 16
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: 'span 2'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E01\u0E32\u0E23\u0E0B\u0E37\u0E49\u0E2D\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 2569",
      subtitle: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg) \xB7 " + (_single ? _mName : "\u0E21.\u0E04.\u2013\u0E1E.\u0E04.")
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 240,
      labels: _detailD.MONTHS_ACT.slice(0, _single ? _mi + 1 : _NACT),
      yFormat: v => fmt.int(v),
      showDots: true,
      series: [{
        name: c.name,
        data: c.monthly.slice(0, _single ? _mi + 1 : _NACT),
        color: 'var(--viz-4)',
        type: 'area'
      }]
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E23\u0E38\u0E1B\u0E1E\u0E24\u0E15\u0E34\u0E01\u0E23\u0E23\u0E21",
      bodyStyle: {
        padding: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(InsightCard, {
      tone: _momM >= 0 ? 'positive' : 'negative',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: _momM >= 0 ? 'trending-up' : 'trending-down',
        size: 15
      }),
      title: _single ? ("\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E40\u0E14\u0E37\u0E2D\u0E19 " + _mName) : "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
      metric: fmt.pct(_momM),
      detail: `ปริมาณเดือน ${_single ? _mName : (_detailD.MONTHS_ACT[_NACT - 1] || 'ล่าสุด')} ${_momM >= 0 ? 'เพิ่มขึ้น' : 'ลดลง'}เทียบเดือนก่อน`
    }), /*#__PURE__*/React.createElement(InsightCard, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "box",
        size: 15
      }),
      title: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
      metric: ((_ms => fmt.int(_ms.length ? Math.max(..._ms) : 0))(c.monthly.slice(0, _NACT).filter(v => v != null))) + ' Kg',
      detail: 'เดือน ' + ((_ms => _ms.length ? (_detailD.MONTHS_ACT[c.monthly.slice(0, _NACT).indexOf(Math.max(..._ms))] || '—') : '—')(c.monthly.slice(0, _NACT).filter(v => v != null)))
    }), /*#__PURE__*/React.createElement(InsightCard, {
      tone: rank <= 3 ? 'warning' : 'info',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      }),
      title: 'อันดับลูกค้า #' + rank,
      detail: rank <= 3 ? 'ลูกค้ารายใหญ่ — มีผลต่อความเสี่ยงกระจุกตัว' : 'ลูกค้ากลุ่มกลาง'
    })))));
  }

  // ---------- Customer Contribution (Pareto) ----------
  function ContributionScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const [scope, setScope] = React.useState('top10');
    const all = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    const allReal = [...D.allCustomers].sort((a, b) => b.kg - a.kg);
    const dataset = scope === 'top10' ? all.slice(0, 10) : scope === 'top20' ? allReal.slice(0, 20) : allReal;
    const paretoData = dataset.map(c => ({
      label: (c.name || '').length > 14 ? c.name.slice(0, 12) + '…' : c.name,
      value: Math.round(c.kg / 1000)
    }));
    const total = D.custTotalKg;
    // customers to reach 80%
    let cum = 0,
      n80 = 0;
    for (const c of allReal) {
      cum += c.kg;
      n80++;
      if (cum / total >= 0.8) break;
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 200,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: "Top 3 = \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13",
      value: D.totals.top3,
      unit: "%",
      accent: true,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-triangle",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "Top 5 = \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13",
      value: D.totals.top5,
      unit: "%",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E17\u0E35\u0E48\u0E17\u0E33 80%",
      value: String(n80),
      unit: 'จาก ' + D.nCustomers + ' ราย',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "target",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Customer Contribution \u2014 Pareto Analysis",
      subtitle: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E02\u0E32\u0E22 (\u0E1E\u0E31\u0E19 Kg) + % \u0E2A\u0E30\u0E2A\u0E21 \xB7 \u0E40\u0E2A\u0E49\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C 80%",
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: scope,
        onChange: setScope,
        options: [{
          value: 'top10',
          label: 'Top 10'
        }, {
          value: 'top20',
          label: 'Top 20'
        }, {
          value: 'all',
          label: 'ทั้งหมด'
        }]
      })
    }, /*#__PURE__*/React.createElement(ParetoChart, {
      height: 320,
      threshold: 80,
      valueFormat: v => fmt.int(v * 1000) + ' Kg',
      data: paretoData
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07",
      bodyStyle: {
        padding: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(InsightCard, {
      tone: "warning",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-triangle",
        size: 15
      }),
      title: "\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01\u0E15\u0E31\u0E27\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01",
      metric: D.totals.top3.toFixed(2) + '%',
      detail: `Top 3 ลูกค้าสร้างยอดเกินครึ่ง — สูงกว่าเป้าหมาย 40% มาก ควรเร่งกระจายฐานลูกค้า`
    }), (() => {
      const drop = [...D.CUSTOMERS].sort((a, b) => a.mom - b.mom)[0];
      if (!drop) return null;
      return /*#__PURE__*/React.createElement(InsightCard, {
        tone: "negative",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "trending-down",
          size: 15
        }),
        title: `ลูกค้าเสี่ยง: ${drop.name.split(' ')[0]}`,
        metric: fmt.pct(drop.mom),
        detail: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14\u0E25\u0E14\u0E25\u0E07 \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E02\u0E49\u0E32\u0E1E\u0E1A/\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21"
      });
    })(), /*#__PURE__*/React.createElement(InsightCard, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 15
      }),
      title: "\u0E10\u0E32\u0E19\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E23\u0E27\u0E21",
      metric: D.nCustomers + ' ราย',
      detail: `มีเพียง ${n80} รายที่สร้างยอด 80% — ที่เหลือเป็น long tail`
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E2A\u0E30\u0E2A\u0E21",
      subtitle: "Top 10",
      padding: "none"
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: all.slice(0, 10),
      rowKey: r => r.id,
      sortable: false,
      columns: (() => {
        let c = 0;
        return [{
          key: '_r',
          header: '#',
          width: 44,
          numeric: true,
          render: r => all.indexOf(r) + 1
        }, {
          key: 'name',
          header: 'ลูกค้า',
          render: r => /*#__PURE__*/React.createElement("span", {
            style: {
              fontWeight: 500
            }
          }, r.name)
        }, {
          key: 'kg',
          header: 'ปริมาณ (Kg)',
          numeric: true,
          render: r => fmt.int(r.kg)
        }, {
          key: 'share',
          header: 'สัดส่วน',
          numeric: true,
          render: r => r.share.toFixed(2) + '%'
        }, {
          key: 'cum',
          header: 'สะสม',
          numeric: true,
          render: r => {
            c += r.kg;
            const pct = c / total * 100;
            return /*#__PURE__*/React.createElement("span", {
              style: {
                color: pct <= 80 ? 'var(--negative)' : 'var(--text-tertiary)'
              }
            }, pct.toFixed(2), "%");
          }
        }];
      })()
    }))));
  }
  window.CustomerScreen = CustomerScreen;
  window.ContributionScreen = ContributionScreen;
})();

// --- ScreensD ---
/* Screens: Year Comparison + Forecast → window.{YearScreen, ForecastScreen}
   2 years: 2568 (12mo actual) vs 2569 (5mo actual). Forecast projects 2569 year-end. */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const {
    Card,
    KpiCard,
    DeltaBadge,
    DataTable,
    LineChart,
    SegmentedControl,
    Badge,
    RankBar
  } = NS;
  const Icon = window.Icon;
  const {
    fmt
  } = window.VUtil;
  const {
    Grid
  } = window;
  const viewFor = window.viewFor || function(f){ return window.VDATA; };
  const D = window.VDATA;
  const NACT = D.NACT;
  function useMeasure() {
    const ref = React.useRef(null);
    const [w, setW] = React.useState(720);
    React.useEffect(() => {
      if (!ref.current) return;
      let _roTimer;
      const ro = new ResizeObserver(e => {
        const cw = e[0].contentRect.width;
        if (cw > 0) { clearTimeout(_roTimer); _roTimer = setTimeout(() => setW(cw), 80); }
      });
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
    // Year comparison is a full-year view across years — source the untruncated
    // 12-month arrays from window.VDATA (viewFor narrows 2568/2569 to the current
    // year's active-month window, which would clip the comparison years).
    const FULL = window.VDATA || D;
    const src = metric === 'value' ? FULL.valueByYear : FULL.volumeByYear;
    const unit = metric === 'value' ? 'บาท' : 'Kg';
    const _vmul = 1;
    const _vfmt = metric === 'value' ? (n => fmt.dec1(n / 1e6)) : (n => fmt.dec1(n));
    const _kfmt = metric === 'value' ? (n => Math.round(n).toLocaleString('en-US')) : _vfmt;
    // count of actual (non-null, >0) months for a year
    const monthsOf = y => src[y].filter(v => v != null && +v > 0).length;
    // only years that actually have data for this metric
    const years = D.YEARS.filter(y => Array.isArray(src[y]) && monthsOf(y) > 0);
    const latest = years[years.length - 1];
    const prev = years[years.length - 2];

    // comparable window = min actual months across years with data (so YoY is apples-to-apples)
    const cmp = years.length ? Math.min(...years.map(monthsOf)) : 0;
    const sumN = (y, n) => D.sum(src[y].slice(0, n).map(v => v || 0));
    const sumFull = y => D.sum(src[y].map(v => v || 0));
    const tLatest = sumN(latest, cmp);
    const tPrev = prev ? sumN(prev, cmp) : 0;
    const yoy = tPrev ? +((tLatest / tPrev - 1) * 100).toFixed(2) : 0;

    // palette: older years muted, latest highlighted
    const yearColor = i => i === years.length - 1 ? 'var(--viz-1)' : `var(--viz-${(years.length - 1 - i) % 6 + 2})`;
    const series = years.map((y, i) => ({
      name: 'ปี ' + y,
      data: src[y].slice(0, 12).map(v => v == null ? null : (metric === 'value' ? Math.round(v) : v)),
      color: yearColor(i),
      type: i === years.length - 1 ? 'area' : 'line'
    }));

    // monthly comparison table — one column per year + YoY (latest vs prev)
    const rows = D.TH_MONTHS.map((m, i) => {
      const row = {
        month: m
      };
      years.forEach(y => {
        row['y' + y] = src[y][i];
      });
      row.yoy = (prev && src[prev][i] != null && +src[prev][i] > 0 && src[latest][i] != null && +src[latest][i] > 0)
        ? +((src[latest][i] / src[prev][i] - 1) * 100).toFixed(2) : null;
      return row;
    });

    // annual summary — per year totals (comparable window + full year), with step YoY
    const annual = years.map((y, i) => {
      const cmpT = sumN(y, cmp),
        full = sumFull(y),
        nM = monthsOf(y);
      const py = years[i - 1];
      const stepYoY = py ? +((sumN(y, cmp) / sumN(py, cmp) - 1) * 100).toFixed(2) : null;
      return {
        year: y,
        cmpT,
        full,
        nM,
        stepYoY
      };
    });
    // ---------- บทวิเคราะห์อัตโนมัติ (อัปเดตตาม metric + ตัวกรอง) ----------
    const fv = (n) => metric === 'value' ? fmt.dec1(n / 1e6) + ' ลบ.' : fmt.int(n) + ' ' + unit;
    const _latM = rows.map((r) => (r['y' + latest] == null ? null : r['y' + latest]));
    const _valid = _latM.map((v, i) => ({ v: v, i: i })).filter((o) => o.v != null && +o.v > 0);
    const insights = [];
    if (_valid.length) {
      if (prev) {
        const _diff = tLatest - tPrev;
        insights.push({ tone: yoy >= 0 ? 'positive' : 'negative', icon: yoy >= 0 ? 'trending-up' : 'trending-down', text: `ยอดรวม ${cmp} เดือนแรกของปี ${latest} ${yoy >= 0 ? 'เติบโต' : 'ลดลง'} ${fmt.pct(yoy)} เทียบปี ${prev} — ${fv(tLatest)} เทียบ ${fv(tPrev)} (${_diff >= 0 ? 'เพิ่มขึ้น' : 'ลดลง'} ${fv(Math.abs(_diff))})` });
      }
      const _sortedT = annual.map((a) => a.cmpT).slice().sort((x, y) => y - x);
      const _rank = _sortedT.indexOf(tLatest) + 1;
      insights.push({ tone: _rank === 1 ? 'positive' : 'info', icon: 'award', text: _rank === 1 ? `ปี ${latest} ทำยอด ${cmp} เดือนแรกสูงสุดในรอบ ${years.length} ปีที่นำมาเทียบ` : `ปี ${latest} อยู่อันดับ ${_rank} จาก ${years.length} ปี ในช่วง ${cmp} เดือนแรก` });
      const _peak = _valid.reduce((a, b) => (b.v > a.v ? b : a));
      const _trough = _valid.reduce((a, b) => (b.v < a.v ? b : a));
      insights.push({ tone: 'info', icon: 'bar-chart-2', text: `เดือนที่ทำยอดสูงสุดคือ ${rows[_peak.i].month} (${fv(_peak.v)}) ส่วนต่ำสุดคือ ${rows[_trough.i].month} (${fv(_trough.v)})` });
      if (prev) {
        const _yv = rows.filter((r) => r.yoy != null && isFinite(r.yoy));
        if (_yv.length) {
          const _best = _yv.reduce((a, b) => (b.yoy > a.yoy ? b : a));
          const _worst = _yv.reduce((a, b) => (b.yoy < a.yoy ? b : a));
          insights.push({ tone: _best.yoy >= 0 ? 'positive' : 'negative', icon: 'activity', text: `เทียบรายเดือนกับปี ${prev}: ${_best.month} โตเด่นสุด (${fmt.pct(_best.yoy)}) ขณะที่ ${_worst.month} อ่อนสุด (${fmt.pct(_worst.yoy)})` });
        }
      }
      if (_valid.length >= 2) {
        const _f = _valid[0], _l = _valid[_valid.length - 1];
        const _mo = _f.v ? +((_l.v / _f.v - 1) * 100).toFixed(1) : 0;
        insights.push({ tone: _mo >= 0 ? 'positive' : 'warning', icon: _mo >= 0 ? 'trending-up' : 'trending-down', text: `โมเมนตัมภายในปี ${latest}: เดือน ${rows[_l.i].month} ${_mo >= 0 ? 'สูงกว่า' : 'ต่ำกว่า'} ${rows[_f.i].month} ${fmt.pct(_mo)}` });
      }
    }
    const _toneColor = (t) => t === 'positive' ? 'var(--positive)' : t === 'negative' ? 'var(--negative)' : t === 'warning' ? 'var(--warning)' : 'var(--accent)';
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: `รวม ${cmp} เดือน ${latest}`,
      value: _kfmt(tLatest),
      unit: unit,
      delta: yoy,
      deltaSuffix: " YoY",
      accent: true
    }), prev && /*#__PURE__*/React.createElement(KpiCard, {
      label: `รวม ${cmp} เดือน ${prev}`,
      value: _kfmt(tPrev),
      unit: unit
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "YoY Growth",
      value: fmt.pct(yoy).replace('%', ''),
      unit: "%",
      delta: yoy,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "activity",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: `จำนวนปีที่เทียบ`,
      value: String(years.length),
      unit: "\u0E1B\u0E35",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: `เปรียบเทียบยอดขายรายปี (${years.join(' · ')})`,
      subtitle: `${metric === 'value' ? 'มูลค่า (ลบ.)' : 'ปริมาณ (Kg)'} · รายเดือน · ปีปัจจุบันมีข้อมูล ${cmp} เดือน`,
      actions: /*#__PURE__*/React.createElement(SegmentedControl, {
        size: "sm",
        value: metric,
        onChange: setMetric,
        options: [{
          value: 'value',
          label: 'มูลค่า'
        }, {
          value: 'volume',
          label: 'ปริมาณ'
        }]
      })
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 300,
      labels: D.TH_MONTHS,
      yFormat: v => metric === 'value' ? fmt.dec1(v / 1e6) : fmt.int(v),
      showDots: true,
      series: series
    })), insights.length > 0 && /*#__PURE__*/React.createElement(Card, {
      title: "\u0E1A\u0E17\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34",
      subtitle: `\u0E2A\u0E23\u0E38\u0E1B\u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07 \u00B7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E15\u0E32\u0E21${metric === 'value' ? '\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32' : '\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13'}\u0E41\u0E25\u0E30\u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07`,
      style: { marginTop: 16 }
    }, /*#__PURE__*/React.createElement("div", {
      style: { display: 'flex', flexDirection: 'column', gap: 10 }
    }, insights.map((it, i) => {
      const c = _toneColor(it.tone);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid ' + c }
      }, /*#__PURE__*/React.createElement("span", {
        style: { color: c, flex: '0 0 auto', marginTop: 1 }
      }, /*#__PURE__*/React.createElement(Icon, { name: it.icon, size: 16 })), /*#__PURE__*/React.createElement("span", {
        style: { fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }
      }, it.text));
    }))), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E32\u0E22\u0E1B\u0E35",
      subtitle: `รวม ${cmp} เดือนเทียบกัน + ทั้งปี · หน่วย ${metric === 'value' ? 'ลบ.' : 'พัน Kg'}`,
      padding: "none"
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: annual,
      sortable: false,
      rowKey: r => r.year,
      columns: [{
        key: 'year',
        header: 'ปี',
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 500
          }
        }, r.year)
      }, {
        key: 'cmpT',
        header: `รวม ${cmp} เดือน`,
        numeric: true,
        render: r => _vfmt(r.cmpT)
      }, {
        key: 'full',
        header: 'ทั้งปี',
        numeric: true,
        render: r => /*#__PURE__*/React.createElement("span", null, _vfmt(r.full), /*#__PURE__*/React.createElement("span", {
          style: {
            color: 'var(--text-disabled)',
            fontSize: 'var(--text-2xs)'
          }
        }, " (", r.nM, "\u0E14.)"))
      }, {
        key: 'step',
        header: '% YoY',
        numeric: true,
        sortable: false,
        render: r => r.stepYoY == null ? /*#__PURE__*/React.createElement("span", {
          style: {
            color: 'var(--text-disabled)'
          }
        }, "\u2014") : /*#__PURE__*/React.createElement(DeltaBadge, {
          value: r.stepYoY,
          size: "sm"
        })
      }]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19",
      subtitle: `เดือน × ปี · YoY (${latest} vs ${prev || '—'})`,
      padding: "none"
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      sortable: false,
      rowKey: r => r.month,
      columns: [{
        key: 'month',
        header: 'เดือน',
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 500
          }
        }, r.month)
      }, ...years.map(y => ({
        key: 'y' + y,
        header: String(y),
        numeric: true,
        render: r => (r['y' + y] == null || +r['y' + y] === 0) ? /*#__PURE__*/React.createElement('span', { style: { color: 'var(--text-disabled)' } }, '—') : _vfmt(r['y' + y])
      })), {
        key: 'yoy',
        header: '% YoY',
        numeric: true,
        render: r => r.yoy == null ? /*#__PURE__*/React.createElement('span', { style: { color: 'var(--text-disabled)' } }, '—') : /*#__PURE__*/React.createElement(DeltaBadge, {
          value: r.yoy,
          size: "sm"
        })
      }]
    }))));
  }

  // ---------- Forecast ----------
  function ForecastChart({
    height = 300
  }) {
    const [ref, width] = useMeasure();
    const F = D.forecast;
    const A = F.actualMonths;
    const proj = F.projVal; // 12 months, first A actual
    const actual = proj.map((v, i) => i < A ? v : null);
    const projected = proj.map((v, i) => i >= A - 1 ? v : null);
    const upper = projected.map(v => v == null ? null : +(v * 1.09).toFixed(2));
    const lower = projected.map(v => v == null ? null : +(v * 0.91).toFixed(2));
    const p = {
      top: 16,
      right: 16,
      bottom: 28,
      left: 42
    };
    const iw = Math.max(10, width - p.left - p.right);
    const ih = Math.max(10, height - p.top - p.bottom);
    const max = Math.max(...proj, ...upper.filter(v => v != null)) * 1.12;
    const n = proj.length;
    const x = i => p.left + i / (n - 1) * iw;
    const y = v => p.top + ih - v / max * ih;
    const actualPath = actual.map((v, i) => v == null ? null : `${actual.slice(0, i).every(u => u == null) ? 'M' : 'L'} ${x(i)} ${y(v)}`).filter(Boolean).join(' ');
    const projPts = projected.map((v, i) => v == null ? null : `${x(i)},${y(v)}`).filter(Boolean);
    const projD = projPts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt}`).join(' ');
    const upPts = upper.map((v, i) => v == null ? null : `${x(i)},${y(v)}`).filter(Boolean);
    const loPts = lower.map((v, i) => v == null ? null : `${x(i)},${y(v)}`).filter(Boolean).reverse();
    const band = upPts.length ? `M ${[...upPts, ...loPts].join(' L ')} Z` : '';
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        marginBottom: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Lg, {
      color: "var(--viz-1)"
    }, `\u0E22\u0E2D\u0E14\u0E08\u0E23\u0E34\u0E07 (${D.MONTHS_ACT[0] || ''}\u2013${D.MONTHS_ACT[A - 1] || ''})`), /*#__PURE__*/React.createElement(Lg, {
      color: "var(--viz-3)",
      dash: true
    }, `\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C (${D.TH_MONTHS[A] || ''}\u2013${D.TH_MONTHS[11] || ''})`), /*#__PURE__*/React.createElement(Lg, {
      color: "var(--viz-3)",
      band: true
    }, "\u0E0A\u0E48\u0E27\u0E07\u0E04\u0E27\u0E32\u0E21\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E31\u0E48\u0E19 \xB19%")), /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      height: height,
      viewBox: `0 0 ${width} ${height}`,
      style: {
        display: 'block',
        overflow: 'visible'
      }
    }, [0, 0.25, 0.5, 0.75, 1].map((g, k) => /*#__PURE__*/React.createElement("g", {
      key: k
    }, /*#__PURE__*/React.createElement("line", {
      x1: p.left,
      y1: p.top + g * ih,
      x2: p.left + iw,
      y2: p.top + g * ih,
      stroke: "var(--chart-grid)"
    }), /*#__PURE__*/React.createElement("text", {
      x: p.left - 8,
      y: p.top + g * ih + 4,
      textAnchor: "end",
      fontSize: "10",
      fill: "var(--chart-axis)",
      fontFamily: "var(--font-numeric)"
    }, fmt.dec1(max * (1 - g) / 1e6)))), /*#__PURE__*/React.createElement("line", {
      x1: x(A - 1),
      y1: p.top,
      x2: x(A - 1),
      y2: p.top + ih,
      stroke: "var(--border-strong)",
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement("rect", {
      x: x(A - 1),
      y: p.top,
      width: p.left + iw - x(A - 1),
      height: ih,
      fill: "var(--viz-3)",
      opacity: "0.04"
    }), band && /*#__PURE__*/React.createElement("path", {
      d: band,
      fill: "var(--viz-3)",
      opacity: "0.14"
    }), /*#__PURE__*/React.createElement("path", {
      d: projD,
      fill: "none",
      stroke: "var(--viz-3)",
      strokeWidth: "2",
      strokeDasharray: "5 4"
    }), /*#__PURE__*/React.createElement("path", {
      d: actualPath,
      fill: "none",
      stroke: "var(--viz-1)",
      strokeWidth: "2.5"
    }), actual.map((v, i) => v != null && /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: x(i),
      cy: y(v),
      r: "2.5",
      fill: "var(--viz-1)"
    })), F.projVal.map((v, i) => /*#__PURE__*/React.createElement("text", {
      key: i,
      x: x(i),
      y: height - 8,
      textAnchor: "middle",
      fontSize: "10",
      fill: "var(--chart-axis)",
      fontFamily: "var(--font-sans)"
    }, D.TH_MONTHS[i]))));
  }
  function Lg({
    color,
    dash,
    band,
    children
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, band ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 10,
        background: color,
        opacity: 0.2,
        borderRadius: 2
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 0,
        borderTop: `2px ${dash ? 'dashed' : 'solid'} ${color}`
      }
    }), children);
  }
  function ForecastScreen({ filters }) {
    const D = viewFor(filters);
    const NACT = D.NACT;
    const F = D.forecast;
    const prodByVal = [...D.PRODUCTS].sort((a, b) => b.val - a.val);
    const custByKg = [...D.CUSTOMERS].sort((a, b) => b.kg - a.kg);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      variant: "soft",
      dot: true
    }, "AI Forecasting"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-tertiary)'
      }
    }, `\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35 2569 \u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07 ${D.NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19 (${D.MONTHS_ACT[0] || ''}\u2013${D.MONTHS_ACT[D.NACT - 1] || ''}) \u00B7 Run-rate + Linear Trend`)), /*#__PURE__*/React.createElement(Grid, {
      min: 160,
      gap: 12,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35",
      value: fmt.dec1(F.yearEndVal / 1e6),
      unit: "\u0E25\u0E1A.",
      delta: (() => { const _vd = window.VDATA || {}; const _b = ((_vd.valueByYear && (_vd.valueByYear['2568'] || _vd.valueByYear[2568])) || []).reduce((s, x) => s + (+x || 0), 0); return _b ? +((F.yearEndVal / _b - 1) * 100).toFixed(1) : 0; })(),
      deltaSuffix: " vs 2568",
      accent: true,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "sparkles",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35",
      value: Math.round(F.yearEndVolKg * 1e6).toLocaleString('en-US'),
      unit: "Kg",
      delta: (() => { const _vd = window.VDATA || {}; const _b = ((_vd.volumeByYear && (_vd.volumeByYear['2568'] || _vd.volumeByYear[2568])) || []).reduce((s, x) => s + (+x || 0), 0); return _b ? +((F.yearEndVolKg * 1000 / _b - 1) * 100).toFixed(1) : 0; })(),
      deltaSuffix: " vs 2568",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "box",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "Confidence Level",
      value: F.confidence,
      unit: "%",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "target",
        size: 15
      })
    }), /*#__PURE__*/React.createElement(KpiCard, {
      label: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E25\u0E37\u0E2D",
      value: String(12 - NACT),
      unit: "\u0E40\u0E14\u0E37\u0E2D\u0E19",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "clock",
        size: 15
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35 2569",
      subtitle: `\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17) \xB7 \u0E22\u0E2D\u0E14\u0E08\u0E23\u0E34\u0E07 ${NACT} \u0E40\u0E14\u0E37\u0E2D\u0E19 + \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E0A\u0E48\u0E27\u0E07\u0E04\u0E27\u0E32\u0E21\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E31\u0E48\u0E19`,
      actions: /*#__PURE__*/React.createElement(Badge, {
        tone: "positive",
        dot: true
      }, "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E31\u0E48\u0E19 ", F.confidence, "%")
    }, /*#__PURE__*/React.createElement(ForecastChart, {
      height: 320
    })), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 16,
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Top 10 \u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35",
      subtitle: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)",
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, prodByVal.slice(0, 10).map((p, i) => {
      const proj = +(p.val * (12 / NACT) * 1.02).toFixed(2);
      return /*#__PURE__*/React.createElement(RankBar, {
        key: p.id,
        rank: i + 1,
        label: p.name,
        sublabel: `คาด ${fmt.dec1(proj / 1e6)} ลบ.`,
        value: fmt.dec1(proj / 1e6) + ' ลบ.',
        ratio: prodByVal.length ? proj / (prodByVal[0].val * (12 / NACT) * 1.02) : 0,
        color: `var(--viz-${i % 8 + 1})`
      });
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Top 10 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35",
      subtitle: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (Kg)",
      bodyStyle: {
        padding: 'var(--space-2)'
      }
    }, custByKg.slice(0, 10).map((c, i) => {
      const proj = Math.round(c.kg * (12 / NACT) * (1 + c.mom / 100 * 0.2));
      return /*#__PURE__*/React.createElement(RankBar, {
        key: c.id,
        rank: i + 1,
        label: c.name,
        sublabel: `คาด ${fmt.int(proj)} Kg`,
        value: fmt.int(proj) + ' Kg',
        ratio: custByKg.length ? proj / (custByKg[0].kg * (12 / NACT) * 1.1) : 0,
        delta: c.mom,
        color: "var(--viz-4)"
      });
    }))));
  }
  window.YearScreen = YearScreen;
  window.ForecastScreen = ForecastScreen;
})();

// --- App ---
/* Vantage dashboard app root → renders into #root.
   Load-order resilient: references shell/screen globals lazily and waits for
   all dependencies before mounting, so it works regardless of script order
   (e.g. when inlined/bundled into a single file). */
(function () {
  const SCREENS = {
    overview: {
      title: 'ภาพรวมผู้บริหาร',
      subtitle: 'Executive Sales Overview',
      comp: () => window.OverviewScreen,
      withProps: true
    },
    sales: {
      title: 'Sales Overview',
      subtitle: 'ยอดขายรวมต่อเดือน · เทียบ 2568',
      comp: () => window.SalesScreen
    },
    product: {
      title: 'Product Analysis',
      subtitle: 'วิเคราะห์สินค้าทั้งหมด',
      comp: () => window.ProductScreen
    },
    customer: {
      title: 'Customer Analysis',
      subtitle: 'วิเคราะห์ลูกค้าทั้งหมด',
      comp: () => window.CustomerScreen
    },
    contribution: {
      title: 'Customer Contribution',
      subtitle: 'Pareto Analysis · ความเสี่ยงการพึ่งพา',
      comp: () => window.ContributionScreen
    },
    mix: {
      title: 'Product Mix',
      subtitle: 'สัดส่วนยอดขายแต่ละสินค้า',
      comp: () => window.MixScreen
    },
    price: {
      title: 'Price Analysis',
      subtitle: 'Average Selling Price',
      comp: () => window.PriceScreen
    },
    year: {
      title: 'Year Comparison',
      subtitle: 'เปรียบเทียบ 2568 vs 2569 · YoY',
      comp: () => window.YearScreen
    },
    forecast: {
      title: 'Forecast',
      subtitle: 'AI Forecasting · คาดการณ์สิ้นปี',
      comp: () => window.ForecastScreen
    }
  };
  function App() {
    const Sidebar = window.Sidebar,
      TopBar = window.TopBar,
      FilterBar = window.FilterBar;
    const [active, setActive] = React.useState(() => localStorage.getItem('vantage.screen') || 'overview');
    const [theme, setTheme] = React.useState(() => localStorage.getItem('vantage.theme') || 'dark');
    const [collapsed, setCollapsed] = React.useState(false);
    var _mobileOpen = React.useState(false); var mobileOpen = _mobileOpen[0]; var setMobileOpen = _mobileOpen[1];
    const [filters, setFilters] = React.useState({
      year: '2569',
      month: 'all',
      customerGroup: 'all',
      product: 'all',
      granularity: 'month'
    });
    const scrollRef = React.useRef(null);
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('vantage.theme', theme);
    }, [theme]);
    const nav = id => {
      setActive(id);
      localStorage.setItem('vantage.screen', id);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    };
    const screen = SCREENS[active] || SCREENS.overview;
    const ScreenComp = screen.comp();

    // Defensive: never hand React an undefined element type (keeps console clean even
    // if a dependency is momentarily missing during a hot-reload re-evaluation).
    if (!Sidebar || !TopBar || !FilterBar || !ScreenComp) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-app)'
      }
    }, /*#__PURE__*/React.createElement(Sidebar, {
      'data-sidebar': true,
      className: mobileOpen ? 'open' : '',
      active: active,
      onNav: nav,
      collapsed: collapsed,
      onToggle: () => setCollapsed(c => !c)
    }), mobileOpen && /*#__PURE__*/React.createElement('div', {
      'data-sidebar-backdrop': true,
      onClick: function() { setMobileOpen(false); }
    }), /*#__PURE__*/React.createElement("div", {
      'data-main': true,
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(TopBar, {
      title: screen.title,
      subtitle: screen.subtitle,
      theme: theme,
      onTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
      onMenuToggle: function() { setMobileOpen(!mobileOpen); }
    }), /*#__PURE__*/React.createElement(FilterBar, {
      filters: filters,
      setFilters: setFilters
    }), /*#__PURE__*/React.createElement("main", {
      ref: scrollRef,
      style: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '22px',
        scrollBehavior: 'smooth'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--content-max)',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement(ScreenComp, {
      onDrill: nav,
      filters: filters
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 24
      }
    }), /*#__PURE__*/React.createElement("footer", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 2px',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-disabled)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "BWP \xB7 Best World Interplas \u2014 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07 \u0E21.\u0E04.\u2013\u0E1E.\u0E04. 2569 (\u0E40\u0E17\u0E35\u0E22\u0E1A 2568)"), /*#__PURE__*/React.createElement("span", null, "\u0E17\u0E35\u0E48\u0E21\u0E32: \u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22 69.xlsx"))))));
  }
  window.VantageApp = App;

  // Error boundary: a single screen crash shows a readable message + lets the user
  // switch screens, instead of leaving the whole app a black screen.
  if (!window.__BWP_ErrorBoundary) {
    class BWPErrorBoundary extends React.Component {
      constructor(p) { super(p); this.state = { err: null }; }
      static getDerivedStateFromError(err) { return { err: err }; }
      componentDidCatch(err, info) { try { console.error('BWP screen error:', err, info); } catch (e) {} }
      render() {
        if (!this.state.err) return this.props.children;
        var reset = () => { try { localStorage.setItem('vantage.screen', 'overview'); } catch (e) {} this.setState({ err: null }); location.reload(); };
        return React.createElement('div', { style: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b1220', color: '#cbd5e1', fontFamily: 'system-ui,sans-serif', padding: 24 } },
          React.createElement('div', { style: { maxWidth: 520, textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: '#fff' } }, 'หน้านี้แสดงผลไม่สำเร็จ'),
            React.createElement('div', { style: { fontSize: 13, margin: '10px 0 4px', color: '#94a3b8' } }, 'เกิดข้อผิดพลาดในการแสดงผลหน้าจอ — ลองกลับไปหน้าภาพรวม'),
            React.createElement('pre', { style: { fontSize: 11, color: '#f87171', whiteSpace: 'pre-wrap', textAlign: 'left', background: '#141d2e', borderRadius: 8, padding: 12, marginTop: 12, overflow: 'auto', maxHeight: 160 } }, String(this.state.err && (this.state.err.stack || this.state.err.message) || this.state.err)),
            React.createElement('button', { onClick: reset, style: { marginTop: 16, background: '#2563eb', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 600, padding: '10px 18px', cursor: 'pointer' } }, 'กลับหน้าภาพรวม')));
      }
    }
    window.__BWP_ErrorBoundary = BWPErrorBoundary;
  }

  // Mount once, only after every dependency global is ready (load-order safe).
  function ready() {
    return window.BWP_AUTHED && window.VDATA && window.VantageSalesIntelligenceDesignSystem_a75d0a && window.Icon && window.Sidebar && window.TopBar && window.FilterBar && window.OverviewScreen && window.SalesScreen && window.ProductScreen && window.CustomerScreen && window.ContributionScreen && window.MixScreen && window.PriceScreen && window.YearScreen && window.ForecastScreen;
  }
  function mount() {
    if (!ready()) {
      return setTimeout(mount, 25);
    }
    const el = document.getElementById('root');
    if (!el) {
      return setTimeout(mount, 25);
    }
    if (!el.__vroot) el.__vroot = ReactDOM.createRoot(el);
    el.__vroot.render(/*#__PURE__*/React.createElement(window.__BWP_ErrorBoundary, null, /*#__PURE__*/React.createElement(App, null)));
  }
  window.__BWP_REMOUNT = mount; // Supabase loader calls this after refreshing window.VDATA
  mount();
})();


})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/app.all.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/data.js
try { (() => {
/* BWP — Best World Interplas: real sales data ม.ค.–พ.ค. 2569 (เทียบ 2568).
   Source: ยอดขาย 69.xlsx (อัปโหลดโดยผู้ใช้). Value=ล้านบาท, Volume=พัน Kg unless noted.
   Customer Kg = raw Kg. Generated — do not hand-edit; re-run aggregation to refresh. */
window.VDATA = {company:{name:"",en:"",abbr:"BWP"},TH_MONTHS:["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."],MONTHS_ACT:[],NACT:0,YEARS:[2568,2569],valueByYear:{"2568":[],"2569":[]},volumeByYear:{"2568":[],"2569":[]},price68:[],price69:[],PRODUCTS:[],CUSTOMERS:[],allCustomers:[],custTotalKg:0,nCustomers:0,nSizes:0,KPIS:[],totals:{value:0,volume:0,avgPrice:0,yoyKg:0,yoyVal:0,momKg:0,momVal:0,top3:0,top5:0},forecast:{yearEndVal:0,yearEndVolKg:0,projVal:[],actualMonths:0,confidence:0}};
window.VDATA.sum = a => a.reduce((s, x) => s + (x || 0), 0);
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/data.js", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/icons.jsx
try { (() => {
/* Vantage icon set — curated Lucide glyphs (1.5px stroke, currentColor).
   Usage: <Icon name="trending-up" size={16} />  → window.Icon */
(function () {
  const P = {
    'layout-dashboard': 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
    'trending-up': 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
    'trending-down': 'M23 18l-9.5-9.5-5 5L1 6 M17 18h6v-6',
    'arrow-up': 'M12 19V5 M5 12l7-7 7 7',
    'arrow-up-right': 'M7 17L17 7 M7 7h10v10',
    'package': 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12',
    'box': 'M12 2l9 5v10l-9 5-9-5V7z M12 12l9-5 M12 12v10 M12 12L3 7',
    'users': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    'user': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    'bar-chart': 'M12 20V10 M18 20V4 M6 20v-4',
    'bar-chart-2': 'M18 20V10 M12 20V4 M6 20v-6',
    'pie-chart': 'M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z',
    'line-chart': 'M3 3v18h18 M19 9l-5 5-4-4-3 3',
    'activity': 'M22 12h-4l-3 9L9 3l-3 9H2',
    'tag': 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01',
    'calendar': 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18',
    'filter': 'M22 3H2l8 9.46V19l4 2v-8.54z',
    'sliders': 'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6',
    'download': 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
    'search': 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35',
    'chevron-down': 'M6 9l6 6 6-6',
    'chevron-right': 'M9 18l6-6-6-6',
    'chevron-left': 'M15 18l-6-6 6-6',
    'chevrons-left': 'M11 17l-5-5 5-5 M18 17l-5-5 5-5',
    'alert-triangle': 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01',
    'sparkles': 'M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z',
    'sun': 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42',
    'moon': 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
    'settings': 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
    'bell': 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
    'target': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    'dollar-sign': 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    'percent': 'M19 5L5 19 M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    'layers': 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
    'x': 'M18 6L6 18 M6 6l12 12',
    'file-text': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
    'table': 'M3 3h18v18H3z M3 9h18 M3 15h18 M9 3v18 M15 3v18',
    'maximize': 'M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7',
    'external-link': 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3',
    'globe': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
    'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'briefcase': 'M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
    'clock': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
    'check': 'M20 6L9 17l-5-5'
  };
  function Icon({
    name,
    size = 16,
    strokeWidth = 1.75,
    style = {},
    ...rest
  }) {
    const d = P[name];
    if (!d) return React.createElement('span', {
      style: {
        display: 'inline-block',
        width: size,
        height: size
      }
    });
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: {
        display: 'block',
        flex: '0 0 auto',
        ...style
      },
      ...rest
    }, d.split(' M').map((seg, i) => React.createElement('path', {
      key: i,
      d: (i ? 'M' : '') + seg
    })));
  }
  window.Icon = Icon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/supabase-config.js
try { (() => {
/* BWP Vantage — Supabase connection config.
   URL is filled in. Paste your anon (public) key below to go live.
   Until then the dashboard runs on the bundled data.js (identical data). */
window.BWP_SUPABASE = {
  url: 'https://botyvrujnvttfcyyvxuw.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdHl2cnVqbnZ0dGZjeXl2eHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMTE4NzksImV4cCI6MjA5Njc4Nzg3OX0.I2eVfezC2QqmDxEZqvSjH3Gzh42ogkwFYjuJSZf423M',
  // Supabase → Settings → API → "anon public"
  table: 'dashboard_data',
  id: 'bwp'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/supabase-config.js", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/supabase-loader.js
try { (() => {
/* BWP Vantage — Supabase live-data loader.
   Fetches the dashboard snapshot from Supabase and refreshes window.VDATA in place
   (screens hold the same object reference, so a DB update flows through on re-render).
   Falls back silently to the bundled data.js if the key is unset or the request fails. */
(function () {
  return; // DISABLED — data now loads only via the password-gated auth loader (supabase-loader.js)
  var cfg = window.BWP_SUPABASE;
  window.__BWP_SOURCE = 'bundled';
  if (!cfg || !cfg.url || !cfg.anonKey || cfg.anonKey.indexOf('PASTE') === 0) {
    return; // no key yet → stay on bundled data.js
  }
  var endpoint = cfg.url.replace(/\/$/, '') + '/rest/v1/' + (cfg.table || 'dashboard_data') + '?id=eq.' + encodeURIComponent(cfg.id || 'bwp') + '&select=payload';
  var ctrl = new AbortController();
  var timer = setTimeout(function () {
    ctrl.abort();
  }, 4000);
  fetch(endpoint, {
    headers: {
      apikey: cfg.anonKey,
      Authorization: 'Bearer ' + cfg.anonKey
    },
    signal: ctrl.signal
  }).then(function (r) {
    return r.ok ? r.json() : Promise.reject(r.status);
  }).then(function (rows) {
    clearTimeout(timer);
    // Apply once (external supabase-loader.js carries the same logic) — the
    // double-apply + destructive refresh caused the screen to flicker.
    if (window.__BWP_SB_APPLIED) return;
    window.__BWP_SB_APPLIED = true;
    var payload = rows && rows[0] && rows[0].payload;
    if (!payload || typeof payload !== 'object') return;
    var cur = window.VDATA || {};
    // Overlay in place (no delete-all first) so screens never read an empty VDATA mid-render.
    Object.assign(cur, payload);
    if (typeof cur.sum !== 'function') cur.sum = function (a) {
      return a.reduce(function (s, x) {
        return s + (x || 0);
      }, 0);
    };
    window.VDATA = cur;
    window.__BWP_SOURCE = 'supabase';
    if (typeof window.__BWP_REMOUNT === 'function') window.__BWP_REMOUNT();
    console.info('[BWP] live data loaded from Supabase');
  }).catch(function (e) {
    clearTimeout(timer);
    console.warn('[BWP] Supabase fetch failed — using bundled data. ', e);
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/supabase-loader.js", error: String((e && e.message) || e) }); }

__ds_ns.DonutChart = __ds_scope.DonutChart;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.ParetoChart = __ds_scope.ParetoChart;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.DeltaBadge = __ds_scope.DeltaBadge;

__ds_ns.InsightCard = __ds_scope.InsightCard;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.RankBar = __ds_scope.RankBar;

})();
