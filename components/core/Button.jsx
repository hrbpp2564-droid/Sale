import React from 'react';

/**
 * Vantage Button — primary action element.
 * Variants: primary | secondary | ghost | danger
 * Sizes: sm | md | lg
 */
export function Button({
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
    sm: { h: 30, px: 12, fs: 'var(--text-sm)', gap: 6 },
    md: { h: 36, px: 16, fs: 'var(--text-base)', gap: 8 },
    lg: { h: 44, px: 22, fs: 'var(--text-md)', gap: 8 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--accent-fg)',
      border: '1px solid transparent',
    },
    secondary: {
      background: 'var(--surface-2)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent',
    },
    danger: {
      background: 'var(--negative)',
      color: 'var(--negative-fg)',
      border: '1px solid transparent',
    },
  };
  const v = variants[variant] || variants.primary;

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  let bg = v.background;
  if (!disabled && hover) {
    if (variant === 'primary') bg = 'var(--accent-hover)';
    else if (variant === 'secondary') bg = 'var(--surface-3)';
    else if (variant === 'ghost') bg = 'var(--surface-2)';
    else if (variant === 'danger') bg = 'var(--red-400)';
  }
  if (!disabled && active && variant === 'primary') bg = 'var(--accent-press)';

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex', flex: '0 0 auto' }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex', flex: '0 0 auto' }}>{iconRight}</span>}
    </button>
  );
}
