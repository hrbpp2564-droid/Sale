import React from 'react';

/**
 * Vantage Sparkline — tiny inline trend for KPI tiles and table rows.
 * Fixed-size SVG; pass width/height. Optional area fill + end dot.
 */
export function Sparkline({
  data = [],
  width = 84,
  height = 30,
  color = 'var(--accent)',
  fill = true,
  endDot = true,
  strokeWidth = 1.5,
  style = {},
}) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const iw = width - pad * 2;
  const ih = height - pad * 2;
  const x = (i) => pad + (data.length <= 1 ? iw / 2 : (i / (data.length - 1)) * iw);
  const y = (v) => pad + ih - ((v - min) / range) * ih;
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L ${x(data.length - 1).toFixed(1)} ${(pad + ih).toFixed(1)} L ${x(0).toFixed(1)} ${(pad + ih).toFixed(1)} Z`;
  const id = React.useId();

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible', ...style }}>
      {fill && (
        <>
          <defs>
            <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#spark-${id})`} />
        </>
      )}
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {endDot && <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="2" fill={color} />}
    </svg>
  );
}
