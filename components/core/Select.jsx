import React from 'react';

/**
 * Vantage Select — compact filter dropdown used across the global filter bar.
 * Custom popover (not native) so it matches dark surfaces.
 */
export function Select({
  options = [],
  value,
  onChange = () => {},
  placeholder = 'เลือก',
  label = null,
  size = 'md',
  disabled = false,
  width = 180,
  style = {},
}) {
  const norm = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const sizes = { sm: 30, md: 36, lg: 42 };
  const h = sizes[size] || sizes.md;
  const current = norm.find((o) => o.value === value);

  React.useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width, ...style }}>
      {label && (
        <div style={{
          fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)',
          letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
          color: 'var(--text-tertiary)', marginBottom: 5,
        }}>{label}</div>
      )}
      <button
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          width: '100%', height: h, padding: '0 10px 0 12px',
          background: 'var(--surface-1)',
          border: `1px solid ${open ? 'var(--border-accent)' : 'var(--border-default)'}`,
          boxShadow: open ? '0 0 0 3px var(--accent-ring)' : 'none',
          borderRadius: 'var(--radius-md)',
          color: current ? 'var(--text-primary)' : 'var(--text-tertiary)',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
          cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
          transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {current ? current.label : placeholder}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          style={{ flex: '0 0 auto', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-fast)', color: 'var(--text-tertiary)' }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 'var(--z-overlay)',
          maxHeight: 280, overflowY: 'auto', padding: 4,
          background: 'var(--surface-2)', border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
        }}>
          {norm.map((o) => {
            const sel = o.value === value;
            return (
              <button key={o.value}
                onClick={() => { onChange(o.value); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                  width: '100%', padding: '8px 10px', border: 'none', textAlign: 'left',
                  background: sel ? 'var(--accent-subtle)' : 'transparent',
                  color: sel ? 'var(--accent-hover)' : 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
                  fontWeight: sel ? 'var(--weight-medium)' : 'var(--weight-regular)',
                }}
                onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = 'var(--surface-3)'; }}
                onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = 'transparent'; }}
              >
                {o.label}
                {sel && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
