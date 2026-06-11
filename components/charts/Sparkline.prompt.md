Tiny inline trend for KPI tiles and table rows. Fixed-size SVG with optional gradient fill + end dot.

```jsx
<Sparkline data={[42,48,45,52,50,58,61]} width={84} height={30} color="var(--viz-2)" />
```

Color it to match the metric (green for volume, blue for value). Drop `fill` for a bare line in dense tables.
