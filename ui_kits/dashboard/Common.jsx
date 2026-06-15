/* Shared helpers for dashboard screens → window.VUtil + small presentational components */
(function () {
  const NS = window.VantageSalesIntelligenceDesignSystem_a75d0a;
  const { Card, Badge } = NS;
  const Icon = window.Icon;

  const fmt = {
    int: (n) => Math.round(n).toLocaleString('en-US'),
    dec1: (n) => (Math.round(n * 10) / 10).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    money: (n) => (Math.round(n * 10) / 10).toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' ลบ.',
    m: (n) => (Math.round(n * 10) / 10).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'M',
    kg: (n) => Math.round(n).toLocaleString('en-US') + ' Kg',
    kgK: (n) => Math.round(n).toLocaleString('en-US') + ' Kg',
    kgM: (n) => Math.round(n).toLocaleString('en-US') + ' Kg',
    pct: (n) => (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(1) + '%',
  };

  // quarter aggregation of a 12-month series
  const toQuarters = (arr) => [0, 1, 2, 3].map((q) => arr.slice(q * 3, q * 3 + 3).reduce((s, x) => s + x, 0));
  const QLABELS = ['Q1', 'Q2', 'Q3', 'Q4'];

  // Section title row
  function SectionTitle({ icon, children, hint }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        {icon && <span style={{ color: 'var(--text-tertiary)' }}><Icon name={icon} size={16} /></span>}
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>{children}</h2>
        {hint && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>{hint}</span>}
      </div>
    );
  }

  // Small "drill" affordance shown on hoverable cards
  function DrillHint({ label = 'คลิกเพื่อ Drill Down' }) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-2xs)', color: 'var(--text-disabled)' }}>
        <Icon name="maximize" size={11} /> {label}
      </span>
    );
  }

  // grid helper
  function Grid({ cols = 2, min = null, gap = 16, children, style = {} }) {
    const tpl = min ? `repeat(auto-fit, minmax(${min}px, 1fr))` : `repeat(${cols}, minmax(0,1fr))`;
    return <div style={{ display: 'grid', gridTemplateColumns: tpl, gap, ...style }}>{children}</div>;
  }

  window.VUtil = { fmt, toQuarters, QLABELS };
  window.SectionTitle = SectionTitle;
  window.DrillHint = DrillHint;
  window.Grid = Grid;
})();
