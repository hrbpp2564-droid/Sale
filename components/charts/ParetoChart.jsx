import React from 'react';

function useMeasure() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(640);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((e) => { const cw = e[0].contentRect.width; if (cw > 0) setW(cw); });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/**
 * Vantage ParetoChart — bars (value) + cumulative % line for contribution analysis.
 * Includes the 80% reference line for Pareto / customer-concentration risk.
 */
export function ParetoChart({
  data = [],            // [{ label, value }]
  height = 280,
  barColor = 'var(--viz-1)',
  lineColor = 'var(--viz-3)',
  threshold = 80,       // % reference line
  valueFormat = (v) => v.toLocaleString('en-US'),
  style = {},
}) {
  const [ref, width] = useMeasure();
  const [hover, setHover] = React.useState(null);
  const p = { top: 18, right: 44, bottom: 40, left: 46 };
  const iw = Math.max(10, width - p.left - p.right);
  const ih = Math.max(10, height - p.top - p.bottom);

  const sorted = [...data].sort((a, b) => b.value - a.value);
  const total = sorted.reduce((s, d) => s + d.value, 0) || 1;
  const maxV = Math.max(...sorted.map((d) => d.value), 1) * 1.1;
  let cum = 0;
  const pts = sorted.map((d, i) => {
    cum += d.value;
    return { ...d, cumPct: (cum / total) * 100, i };
  });

  const n = pts.length;
  const bw = (iw / n) * 0.62;
  const bx = (i) => p.left + ((i + 0.5) / n) * iw;
  const by = (v) => p.top + ih - (v / maxV) * ih;
  const ly = (pct) => p.top + ih - (pct / 100) * ih;
  const linePath = pts.map((d, i) => `${i === 0 ? 'M' : 'L'} ${bx(i).toFixed(1)} ${ly(d.cumPct).toFixed(1)}`).join(' ');

  return (
    <div ref={ref} style={{ width: '100%', ...style }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}
        onMouseLeave={() => setHover(null)}>
        {/* y grid (left = value) */}
        {[0, 0.25, 0.5, 0.75, 1].map((g, k) => {
          const y = p.top + g * ih;
          return (
            <g key={k}>
              <line x1={p.left} y1={y} x2={p.left + iw} y2={y} stroke="var(--chart-grid)" strokeWidth="1" />
              <text x={p.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--chart-axis)" fontFamily="var(--font-numeric)">{Math.round(maxV * (1 - g)).toLocaleString()}</text>
              <text x={p.left + iw + 8} y={y + 4} textAnchor="start" fontSize="10" fill="var(--chart-axis)" fontFamily="var(--font-numeric)">{Math.round(100 * (1 - g))}%</text>
            </g>
          );
        })}

        {/* threshold line */}
        <line x1={p.left} y1={ly(threshold)} x2={p.left + iw} y2={ly(threshold)} stroke="var(--negative)" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
        <text x={p.left + iw} y={ly(threshold) - 5} textAnchor="end" fontSize="10" fill="var(--negative)" fontFamily="var(--font-numeric)">{threshold}%</text>

        {/* bars */}
        {pts.map((d, i) => (
          <rect key={i} x={bx(i) - bw / 2} y={by(d.value)} width={bw} height={p.top + ih - by(d.value)} rx="2"
            fill={barColor} opacity={hover === null || hover === i ? 0.9 : 0.4}
            onMouseEnter={() => setHover(i)} style={{ cursor: 'pointer', transition: 'opacity var(--dur-fast)' }} />
        ))}

        {/* cumulative line */}
        <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2" strokeLinejoin="round" />
        {pts.map((d, i) => (
          <circle key={i} cx={bx(i)} cy={ly(d.cumPct)} r={hover === i ? 4 : 2.5} fill={lineColor} stroke="var(--surface-1)" strokeWidth="1.5" />
        ))}

        {/* x labels */}
        {pts.map((d, i) => (
          (n <= 12 || i % Math.ceil(n / 12) === 0) && (
            <text key={i} x={bx(i)} y={height - 22} textAnchor="middle" fontSize="10" fill="var(--chart-axis)" fontFamily="var(--font-sans)"
              transform={n > 8 ? `rotate(-30 ${bx(i)} ${height - 22})` : undefined}>{d.label}</text>
          )
        ))}
      </svg>

      {hover !== null && (
        <div style={{ display: 'flex', gap: 16, marginTop: 8, padding: '8px 12px', background: 'var(--surface-inset)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>{pts[hover].label}</strong>
          <span style={{ color: 'var(--text-secondary)' }}>มูลค่า: <strong style={{ fontFamily: 'var(--font-numeric)', color: 'var(--text-primary)' }}>{valueFormat(pts[hover].value)}</strong></span>
          <span style={{ color: 'var(--text-secondary)' }}>สะสม: <strong style={{ fontFamily: 'var(--font-numeric)', color: lineColor }}>{pts[hover].cumPct.toFixed(1)}%</strong></span>
        </div>
      )}
    </div>
  );
}
