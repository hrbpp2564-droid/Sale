Directional growth chip — the MoM / YoY delta shown on every KPI and table row. Green up / red down, arrow auto-rotates.

```jsx
<DeltaBadge value={12.4} suffix=" MoM" />
<DeltaBadge value={-3.1} />
<DeltaBadge value={8.2} invert />   {/* down-is-good metric */}
```

`format`: `percent` (default, 1 decimal) or `number`. Use `invert` for cost/risk metrics where a decrease is positive.
