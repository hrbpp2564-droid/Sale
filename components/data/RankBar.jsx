import React from 'react';

/**
 * Vantage RankBar — a single ranked row with a proportional bar.
 * Used in Top-10 product/customer rankings. Bar width = value / max.
 */
export function RankBar({
  rank,
  label,
  sublabel = null,
  value,            // formatted string shown at the right
  ratio,            // 0..1 fill proportion
  share = null,     // optional % share string
  delta = null,     // optional number for a small trend mark
  color = 'var(--viz-1)',
  onClick = null,
  style = {},
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;
  return (
    <div
      onClick={onClick || undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '26px 1fr auto',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: '8px 10px',
        borderRadius: 'var(--radius-md)',
        background: hover && clickable ? 'var(--surface-2)' : 'transparent',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'box-shadow var(--dur-fast)',
        ...style,
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 22, height: 22, borderRadius: 'var(--radius-sm)',
        background: rank <= 3 ? 'var(--accent-subtle)' : 'var(--surface-3)',
        color: rank <= 3 ? 'var(--accent-hover)' : 'var(--text-tertiary)',
        fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-semibold)', flex: '0 0 auto',
      }}>{rank}</span>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 5 }}>
          <span style={{
            fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{label}</span>
          {sublabel && <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', flex: '0 0 auto' }}>{sublabel}</span>}
        </div>
        <div style={{ height: 6, borderRadius: 'var(--radius-full)', background: 'var(--surface-3)', overflow: 'hidden' }}>
          <div style={{
            width: `${Math.max(2, Math.min(100, ratio * 100))}%`, height: '100%',
            borderRadius: 'var(--radius-full)', background: color,
            transition: 'width var(--dur-slow) var(--ease-out)',
          }} />
        </div>
      </div>

      <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
        <div style={{
          fontFamily: 'var(--font-numeric)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)',
          color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums',
        }}>{value}</div>
        {(share || delta !== null) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 2 }}>
            {share && <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-numeric)' }}>{share}</span>}
            {delta !== null && (
              <span style={{
                fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-numeric)', fontWeight: 'var(--weight-semibold)',
                color: delta >= 0 ? 'var(--positive)' : 'var(--negative)',
              }}>{delta >= 0 ? '+' : '−'}{Math.abs(delta).toFixed(1)}%</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
