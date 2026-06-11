import React from 'react';

/**
 * Vantage IconButton — square, icon-only control for toolbars and headers.
 * Variants: ghost | solid | outline
 */
export function IconButton({
  variant = 'ghost',
  size = 'md',
  active = false,
  disabled = false,
  label,
  style = {},
  children,
  ...rest
}) {
  const sizes = { sm: 28, md: 34, lg: 40 };
  const dim = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);

  const base = {
    ghost: { bg: 'transparent', color: 'var(--text-secondary)', border: '1px solid transparent' },
    solid: { bg: 'var(--surface-2)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' },
    outline: { bg: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' },
  }[variant] || { bg: 'transparent', color: 'var(--text-secondary)', border: '1px solid transparent' };

  let bg = base.bg;
  let color = base.color;
  if (active) { bg = 'var(--accent-subtle)'; color = 'var(--accent-hover)'; }
  else if (hover && !disabled) { bg = 'var(--surface-3)'; color = 'var(--text-primary)'; }

  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
