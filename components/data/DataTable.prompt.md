Compact dark data grid — rankings, customer/product detail tables, the year-comparison matrix (Dashboard 7). Click a header to sort; pass `onRowClick` for drill-down.

```jsx
<DataTable
  rows={data}
  onRowClick={(r) => drillInto(r.id)}
  columns={[
    { key: 'rank', header: '#', width: 44, numeric: true },
    { key: 'name', header: 'สินค้า' },
    { key: 'value', header: 'มูลค่า (บาท)', numeric: true,
      render: (r) => r.value.toLocaleString() },
    { key: 'growth', header: 'YoY', numeric: true,
      render: (r) => <DeltaBadge value={r.growth} size="sm" /> },
  ]}
/>
```

Mark money/quantity columns `numeric` for tabular figures. Use `render` to embed `DeltaBadge`, `Badge`, or `Sparkline` in cells.
