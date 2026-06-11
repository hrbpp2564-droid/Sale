import React from 'react';

function useMeasure() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(640);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0].contentRect.width;
      if (cw > 0) setW(cw);
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
export function LineChart({
  series = [],          // [{ name, data:[n], color, type?:'line'|'area'|'bar', axis?:'left'|'right' }]
  labels = [],          // x-axis category labels
  height = 240,
  yFormat = (v) => v.toLocaleString('en-US'),
  showGrid = true,
  showDots = false,
  showLegend = true,
  padding = { top: 16, right: 16, bottom: 26, left: 44 },
  style = {},
}) {
  const [ref, width] = useMeasure();
  const [hover, setHover] = React.useState(null);
  const p = padding;
  const iw = Math.max(10, width - p.left - p.right);
  const ih = Math.max(10, height - p.top - p.bottom);

  const leftSeries = series.filter((s) => (s.axis || 'left') === 'left');
  const rightSeries = series.filter((s) => s.axis === 'right');
  const maxOf = (arr) => Math.max(1, ...arr.flatMap((s) => s.data));
  const lMax = maxOf(leftSeries.length ? leftSeries : series) * 1.12;
  const rMax = maxOf(rightSeries.length ? rightSeries : series) * 1.12;

  const n = labels.length || (series[0]?.data.length ?? 0);
  const xAt = (i) => p.left + (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const yAt = (v, axis) => p.top + ih - (v / (axis === 'right' ? rMax : lMax)) * ih;
  const bxAt = (i) => p.left + ((i + 0.5) / n) * iw; // bar centers

  const gridLines = 4;

  function pathFor(data, axis) {
    return data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v, axis).toFixed(1)}`).join(' ');
  }
  function areaFor(data, axis) {
    const top = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v, axis).toFixed(1)}`).join(' ');
    return `${top} L ${xAt(data.length - 1).toFixed(1)} ${(p.top + ih).toFixed(1)} L ${xAt(0).toFixed(1)} ${(p.top + ih).toFixed(1)} Z`;
  }

  return (
    <div ref={ref} style={{ width: '100%', ...style }}>
      {showLegend && series.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 10 }}>
          {series.map((s) => (
            <span key={s.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              <span style={{ width: 10, height: 10, borderRadius: s.type === 'bar' ? 2 : '50%', background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      )}
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * width;
          const i = Math.round(((x - p.left) / iw) * (n - 1));
          if (i >= 0 && i < n) setHover(i);
        }}
      >
        {showGrid && Array.from({ length: gridLines + 1 }).map((_, g) => {
          const y = p.top + (g / gridLines) * ih;
          const val = lMax * (1 - g / gridLines);
          return (
            <g key={g}>
              <line x1={p.left} y1={y} x2={p.left + iw} y2={y} stroke="var(--chart-grid)" strokeWidth="1" />
              <text x={p.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--chart-axis)" fontFamily="var(--font-numeric)">
                {yFormat(Math.round(val))}
              </text>
            </g>
          );
        })}

        {/* bars first (behind lines) */}
        {series.filter((s) => s.type === 'bar').map((s) => {
          const bw = (iw / n) * 0.5;
          return s.data.map((v, i) => (
            <rect key={s.name + i} x={bxAt(i) - bw / 2} y={yAt(v, s.axis)} width={bw} height={p.top + ih - yAt(v, s.axis)}
              rx="2" fill={s.color} opacity="0.85" />
          ));
        })}

        {/* areas */}
        {series.filter((s) => s.type === 'area').map((s) => (
          <path key={s.name} d={areaFor(s.data, s.axis)} fill={s.color} opacity="0.12" />
        ))}

        {/* lines */}
        {series.filter((s) => s.type !== 'bar').map((s) => (
          <path key={s.name} d={pathFor(s.data, s.axis)} fill="none" stroke={s.color} strokeWidth="2"
            strokeLinejoin="round" strokeLinecap="round" />
        ))}

        {/* dots */}
        {showDots && series.filter((s) => s.type !== 'bar').map((s) =>
          s.data.map((v, i) => <circle key={s.name + i} cx={xAt(i)} cy={yAt(v, s.axis)} r="2.5" fill="var(--surface-1)" stroke={s.color} strokeWidth="1.5" />)
        )}

        {/* hover crosshair */}
        {hover !== null && (
          <g>
            <line x1={xAt(hover)} y1={p.top} x2={xAt(hover)} y2={p.top + ih} stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" />
            {series.filter((s) => s.type !== 'bar').map((s) => (
              <circle key={s.name} cx={xAt(hover)} cy={yAt(s.data[hover], s.axis)} r="3.5" fill={s.color} stroke="var(--surface-1)" strokeWidth="1.5" />
            ))}
          </g>
        )}

        {/* x labels */}
        {labels.map((l, i) => (
          (n <= 14 || i % Math.ceil(n / 12) === 0) && (
            <text key={i} x={series.some((s) => s.type === 'bar') ? bxAt(i) : xAt(i)} y={height - 8} textAnchor="middle"
              fontSize="10" fill="var(--chart-axis)" fontFamily="var(--font-sans)">{l}</text>
          )
        ))}
      </svg>

      {hover !== null && labels[hover] && (
        <div style={{
          display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8,
          padding: '8px 12px', background: 'var(--surface-inset)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)',
        }}>
          <span style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--weight-semibold)' }}>{labels[hover]}</span>
          {series.map((s) => (
            <span key={s.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
              {s.name}: <strong style={{ fontFamily: 'var(--font-numeric)', color: 'var(--text-primary)' }}>{yFormat(s.data[hover])}</strong>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
