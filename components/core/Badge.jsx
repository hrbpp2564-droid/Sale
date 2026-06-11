import React from 'react';

/**
 * Vantage Badge — small status / category label.
 * Tones: neutral | accent | positive | negative | warning | info
 */
export function Badge({
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  dot = false,
  style = {},
  children,
}) {
  const tones = {
    neutral:  { fg: 'var(--text-secondary)', soft: 'var(--surface-3)', solid: 'var(--slate-600)' },
    accent:   { fg: 'var(--accent-hover)',   soft: 'var(--accent-subtle)', solid: 'var(--accent)' },
    positive: { fg: 'var(--positive)',       soft: 'var(--positive-subtle)', solid: 'var(--positive)' },
    negative: { fg: 'var(--negative)',       soft: 'var(--negative-subtle)', solid: 'var(--negative)' },
    warning:  { fg: 'var(--warning)',        soft: 'var(--warning-subtle)', solid: 'var(--warning)' },
    info:     { fg: 'var(--info)',           soft: 'var(--info-subtle)', solid: 'var(--info)' },
  };
  const t = tones[tone] || tones.neutral;
  const solid = variant === 'solid';
  const sizes = {
    sm: { h: 18, px: 6, fs: 'var(--text-2xs)' },
    md: { h: 22, px: 8, fs: 'var(--text-xs)' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      height: s.h, padding: `0 ${s.px}px`,
      borderRadius: 'var(--radius-full)',
      background: solid ? t.solid : t.soft,
      color: solid ? '#fff' : t.fg,
      border: variant === 'outline' ? `1px solid ${t.fg}` : '1px solid transparent',
      fontFamily: 'var(--font-sans)', fontSize: s.fs, fontWeight: 'var(--weight-semibold)',
      lineHeight: 1, whiteSpace: 'nowrap', ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: solid ? '#fff' : t.fg }} />}
      {children}
    </span>
  );
}
