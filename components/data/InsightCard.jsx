import React from 'react';

/**
 * Vantage InsightCard — a single AI-generated insight line for the Insight Engine.
 * Tone-coded left rail + icon; supports a drill action.
 */
export function InsightCard({
  tone = 'info',        // positive | negative | warning | info
  icon = null,
  title,
  detail = null,
  metric = null,        // optional emphasized figure, e.g. "+18.4%"
  time = null,          // e.g. "เรียลไทม์", "วันนี้"
  onClick = null,
  style = {},
}) {
  const tones = {
    positive: { c: 'var(--positive)', bg: 'var(--positive-subtle)' },
    negative: { c: 'var(--negative)', bg: 'var(--negative-subtle)' },
    warning:  { c: 'var(--warning)',  bg: 'var(--warning-subtle)' },
    info:     { c: 'var(--info)',     bg: 'var(--info-subtle)' },
  };
  const t = tones[tone] || tones.info;
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;

  return (
    <div
      onClick={onClick || undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
        padding: 'var(--space-3) var(--space-4)',
        background: hover && clickable ? 'var(--surface-2)' : 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `2px solid ${t.c}`,
        borderRadius: 'var(--radius-md)',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'box-shadow var(--dur-fast)',
        ...style,
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, borderRadius: 'var(--radius-sm)',
        background: t.bg, color: t.c, flex: '0 0 auto', marginTop: 1,
      }}>{icon}</span>

      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)', lineHeight: 'var(--leading-snug)' }}>
            {title}
          </span>
          {metric && (
            <span style={{
              fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)',
              color: t.c, fontVariantNumeric: 'tabular-nums',
            }}>{metric}</span>
          )}
        </div>
        {detail && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 3, lineHeight: 'var(--leading-normal)' }}>{detail}</div>}
      </div>

      {time && (
        <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-disabled)', flex: '0 0 auto', whiteSpace: 'nowrap', marginTop: 2 }}>
          {time}
        </span>
      )}
    </div>
  );
}
