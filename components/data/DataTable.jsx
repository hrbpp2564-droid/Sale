import React from 'react';

/**
 * Vantage DataTable — compact, dark data grid for rankings and detail views.
 * Columns describe alignment, width, and an optional render fn.
 */
export function DataTable({
  columns = [],         // [{ key, header, align?, width?, render?(row,i), numeric? }]
  rows = [],
  sortable = true,
  rowKey = (r, i) => i,
  onRowClick = null,
  stickyHeader = true,
  zebra = false,
  style = {},
}) {
  const [sort, setSort] = React.useState(null); // { key, dir }
  const [hover, setHover] = React.useState(null);

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv : String(av).localeCompare(String(bv), 'th');
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sort, columns]);

  function toggleSort(key) {
    if (!sortable) return;
    setSort((s) => s && s.key === key ? (s.dir === 'desc' ? { key, dir: 'asc' } : null) : { key, dir: 'desc' });
  }

  return (
    <div style={{ width: '100%', overflowX: 'auto', ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)' }}>
        <thead>
          <tr>
            {columns.map((c) => {
              const isSorted = sort && sort.key === c.key;
              const alignRight = c.align === 'right' || c.numeric;
              return (
                <th key={c.key}
                  onClick={() => c.sortable !== false && toggleSort(c.key)}
                  style={{
                    position: stickyHeader ? 'sticky' : 'static', top: 0, zIndex: 1,
                    textAlign: alignRight ? 'right' : c.align || 'left',
                    width: c.width, padding: '10px 14px',
                    background: 'var(--surface-2)',
                    borderBottom: '1px solid var(--border-default)',
                    fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-semibold)',
                    letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
                    color: isSorted ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                    cursor: sortable && c.sortable !== false ? 'pointer' : 'default', whiteSpace: 'nowrap',
                    userSelect: 'none',
                  }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: alignRight ? 'flex-end' : 'flex-start' }}>
                    {c.header}
                    {isSorted && (
                      <svg width="10" height="10" viewBox="0 0 12 12" style={{ transform: sort.dir === 'asc' ? 'rotate(180deg)' : 'none' }}>
                        <path d="M6 8L2.5 4h7L6 8z" fill="currentColor" />
                      </svg>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={rowKey(row, i)}
              onClick={() => onRowClick && onRowClick(row, i)}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              style={{
                background: hover === i ? 'var(--surface-2)' : zebra && i % 2 ? 'var(--surface-1)' : 'transparent',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'box-shadow var(--dur-fast)',
              }}>
              {columns.map((c) => {
                const alignRight = c.align === 'right' || c.numeric;
                return (
                  <td key={c.key} style={{
                    textAlign: alignRight ? 'right' : c.align || 'left',
                    padding: '11px 14px',
                    borderBottom: '1px solid var(--border-subtle)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: c.numeric ? 'var(--font-numeric)' : 'var(--font-sans)',
                    fontVariantNumeric: c.numeric ? 'tabular-nums' : 'normal',
                    color: c.muted ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                  }}>
                    {c.render ? c.render(row, i) : row[c.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
