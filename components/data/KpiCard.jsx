import React from 'react';
import { DeltaBadge } from './DeltaBadge.jsx';

/**
 * Vantage KpiCard — the executive metric tile.
 * Big tabular figure + label + optional delta(s) + sparkline slot.
 * Drill-down ready: pass onClick to make the whole tile a drill target.
 */
export function KpiCard({
  label,
  value,
  unit = '',
  delta = null,         // number → renders a DeltaBadge
  deltaSuffix = '',
  secondary = null,     // e.g. { label: 'YoY', value: 8.2 }
  icon = null,
  spark = null,         // ReactNode (e.g. <Sparkline/>)
  accent = false,       // highlight tile (primary KPI)
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
        position: 'relative',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
        padding: 'var(--space-4) var(--space-5)',
        minHeight: 118,
        background: accent
          ? 'linear-gradient(180deg, var(--accent-subtle), var(--surface-1) 70%)'
          : 'var(--surface-1)',
        border: `1px solid ${hover && clickable ? 'var(--border-strong)' : accent ? 'rgba(56,139,253,0.30)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: hover && clickable ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hover && clickable ? 'translateY(-1px)' : 'none',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'all var(--dur-base) var(--ease-standard)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{
          fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)',
          color: 'var(--text-secondary)', letterSpacing: 'var(--tracking-normal)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{label}</span>
        {icon && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 26, height: 26, borderRadius: 'var(--radius-sm)',
            background: accent ? 'var(--accent-subtle)' : 'var(--surface-3)',
            color: accent ? 'var(--accent-hover)' : 'var(--text-tertiary)', flex: '0 0 auto',
          }}>{icon}</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'nowrap', minWidth: 0 }}>
        <span style={{
          fontFamily: 'var(--font-numeric)', fontSize: String(value).length > 11 ? 'var(--text-lg)' : String(value).length > 5 ? 'var(--text-2xl)' : 'var(--text-3xl)',
          fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)',
          letterSpacing: 'var(--tracking-tight)', fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.05, whiteSpace: 'nowrap', flexShrink: 0,
        }}>{value}</span>
        {unit && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', fontWeight: 'var(--weight-medium)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{unit}</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
        {delta !== null && <DeltaBadge value={delta} suffix={deltaSuffix} size="sm" />}
        {secondary && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            <span>{secondary.label}</span>
            <DeltaBadge value={secondary.value} size="sm" showArrow={false} style={{ background: 'transparent', padding: 0 }} />
          </span>
        )}
        {spark && <div style={{ marginLeft: 'auto', flex: '0 0 auto' }}>{spark}</div>}
      </div>
    </div>
  );
}
