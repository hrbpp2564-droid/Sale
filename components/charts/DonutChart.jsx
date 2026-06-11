import React from 'react';

/**
 * Vantage DonutChart — proportional ring for Product Mix / contribution share.
 * Renders segments + optional center total and side legend.
 */
export function DonutChart({
  data = [],            // [{ label, value, color }]
  size = 200,
  thickness = 26,
  centerLabel = null,
  centerValue = null,
  showLegend = true,
  gap = 2,              // degrees between segments
  style = {},
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
    const gapLen = (gap / 360) * circ;
    const seg = {
      ...d, i,
      dasharray: `${Math.max(0, len - gapLen)} ${circ - Math.max(0, len - gapLen)}`,
      dashoffset: -offset,
      pct: frac * 100,
    };
    offset += len;
    return seg;
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap', ...style }}>
      <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={thickness} />
          {segs.map((s) => (
            <circle key={s.i} cx={cx} cy={cy} r={r} fill="none"
              stroke={s.color} strokeWidth={active === s.i ? thickness + 4 : thickness}
              strokeDasharray={s.dasharray} strokeDashoffset={s.dashoffset}
              strokeLinecap="butt"
              style={{ transition: 'stroke-width var(--dur-fast)', cursor: 'pointer', opacity: active === null || active === s.i ? 1 : 0.45 }}
              onMouseEnter={() => setActive(s.i)} onMouseLeave={() => setActive(null)} />
          ))}
        </svg>
        {(centerLabel || centerValue) && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            {active !== null ? (
              <>
                <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>{segs[active].pct.toFixed(1)}%</span>
                <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', maxWidth: size - thickness * 2, textAlign: 'center' }}>{segs[active].label}</span>
              </>
            ) : (
              <>
                {centerValue && <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>{centerValue}</span>}
                {centerLabel && <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>{centerLabel}</span>}
              </>
            )}
          </div>
        )}
      </div>

      {showLegend && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 150, flex: 1 }}>
          {segs.map((s) => (
            <div key={s.i} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', opacity: active === null || active === s.i ? 1 : 0.5 }}
              onMouseEnter={() => setActive(s.i)} onMouseLeave={() => setActive(null)}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flex: '0 0 auto' }} />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</span>
              <span style={{ fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>{s.pct.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
