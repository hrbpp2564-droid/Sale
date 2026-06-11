import React from 'react';

/**
 * Vantage DeltaBadge — directional growth indicator (▲ +12.4% / ▼ -3.1%).
 * Positive is green, negative red; "neutral" (≈0) is muted.
 * Set invert for metrics where down is good (e.g. ต้นทุน).
 */
export function DeltaBadge({
  value = 0,
  format = 'percent',     // 'percent' | 'number'
  size = 'md',
  showArrow = true,
  invert = false,
  suffix = '',
  style = {},
}) {
  const positive = value > 0;
  const negative = value < 0;
  const good = invert ? negative : positive;
  const bad = invert ? positive : negative;

  const color = good ? 'var(--positive)' : bad ? 'var(--negative)' : 'var(--text-tertiary)';
  const bg = good ? 'var(--positive-subtle)' : bad ? 'var(--negative-subtle)' : 'var(--surface-3)';

  const sizes = {
    sm: { h: 18, px: 6, fs: 'var(--text-2xs)', arrow: 8 },
    md: { h: 22, px: 7, fs: 'var(--text-xs)', arrow: 9 },
    lg: { h: 26, px: 9, fs: 'var(--text-sm)', arrow: 11 },
  };
  const s = sizes[size] || sizes.md;

  const abs = Math.abs(value);
  const num = format === 'percent'
    ? `${abs.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`
    : abs.toLocaleString('en-US');

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      height: s.h, padding: `0 ${s.px}px`,
      borderRadius: 'var(--radius-sm)',
      background: bg, color,
      fontFamily: 'var(--font-numeric)', fontSize: s.fs, fontWeight: 'var(--weight-semibold)',
      fontVariantNumeric: 'tabular-nums', lineHeight: 1, whiteSpace: 'nowrap', ...style,
    }}>
      {showArrow && (positive || negative) && (
        <svg width={s.arrow} height={s.arrow} viewBox="0 0 12 12" fill="none"
          style={{ transform: negative ? 'rotate(180deg)' : 'none' }}>
          <path d="M6 2.5L10 8H2L6 2.5z" fill="currentColor" />
        </svg>
      )}
      {positive ? '+' : negative ? '−' : ''}{num}{suffix}
    </span>
  );
}
