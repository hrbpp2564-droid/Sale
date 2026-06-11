Proportional ring for Product Mix (Dashboard 5) and revenue-share breakdowns. Hovering a segment or legend row lifts it and shows its % in the center.

```jsx
<DonutChart
  centerValue="847M" centerLabel="รวมทั้งหมด"
  data={[
    { label: 'Polymer-A', value: 32, color: 'var(--viz-1)' },
    { label: 'Resin-B',   value: 24, color: 'var(--viz-2)' },
    { label: 'Compound-C',value: 18, color: 'var(--viz-3)' },
    { label: 'อื่น ๆ',    value: 26, color: 'var(--viz-4)' },
  ]}
/>
```

Pull segment colors from the `--viz-*` palette in order. Legend is on by default; hide with `showLegend={false}` for a compact ring.
