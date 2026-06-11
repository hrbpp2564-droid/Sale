import React from 'react';

/**
 * Vantage Card — the base surface for panels, charts, and tables.
 * Optional header (title + subtitle + actions slot).
 */
export function Card({
  title = null,
  subtitle = null,
  actions = null,
  padding = 'md',
  interactive = false,
  style = {},
  bodyStyle = {},
  children,
  ...rest
}) {
  const pads = { none: 0, sm: 'var(--space-3)', md: 'var(--space-5)', lg: 'var(--space-6)' };
  const pad = pads[padding] ?? pads.md;
  const [hover, setHover] = React.useState(false);

  return (
    <section
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-1)',
        border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base), transform var(--dur-base)',
        transform: interactive && hover ? 'translateY(-1px)' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {(title || actions) && (
        <header style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)',
          padding: `var(--space-4) ${typeof pad === 'number' ? pad + 'px' : pad}`,
          paddingBottom: 'var(--space-3)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{ minWidth: 0 }}>
            {title && <div style={{
              fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)',
              color: 'var(--text-primary)', lineHeight: 'var(--leading-snug)',
            }}>{title}</div>}
            {subtitle && <div style={{
              fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2,
            }}>{subtitle}</div>}
          </div>
          {actions && <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flex: '0 0 auto' }}>{actions}</div>}
        </header>
      )}
      <div style={{ padding: pad, flex: 1, minHeight: 0, ...bodyStyle }}>
        {children}
      </div>
    </section>
  );
}
