import React from 'react';

/**
 * Vantage SegmentedControl — pill toggle for view modes
 * (e.g. รายเดือน / รายไตรมาส / รายปี, or chart types).
 */
export function SegmentedControl({
  options = [],
  value,
  onChange = () => {},
  size = 'md',
  style = {},
}) {
  const norm = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const sizes = {
    sm: { h: 28, px: 10, fs: 'var(--text-xs)' },
    md: { h: 34, px: 14, fs: 'var(--text-sm)' },
    lg: { h: 40, px: 18, fs: 'var(--text-base)' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        padding: 3,
        background: 'var(--surface-inset)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        ...style,
      }}
    >
      {norm.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(o.value)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              height: s.h,
              padding: `0 ${s.px}px`,
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)',
              fontSize: s.fs,
              fontWeight: selected ? 'var(--weight-semibold)' : 'var(--weight-medium)',
              background: selected ? 'var(--surface-2)' : 'transparent',
              color: selected ? 'var(--text-primary)' : 'var(--text-tertiary)',
              boxShadow: selected ? 'var(--shadow-xs)' : 'none',
              cursor: 'pointer',
              transition: 'all var(--dur-fast) var(--ease-standard)',
              whiteSpace: 'nowrap',
            }}
          >
            {o.icon && <span style={{ display: 'inline-flex' }}>{o.icon}</span>}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
