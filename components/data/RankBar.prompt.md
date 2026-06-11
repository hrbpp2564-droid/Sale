One ranked row with a proportional fill bar — the building block of Top-10 product & customer rankings (Dashboards 2, 3, 4).

```jsx
{rows.map((r, i) => (
  <RankBar key={r.id} rank={i + 1} label={r.name} sublabel={r.group}
    value={`฿${r.value}M`} ratio={r.value / max} share="18.4%" delta={r.growth}
    color="var(--viz-1)" onClick={() => drillInto(r.id)} />
))}
```

Stack them in a Card body with no gap. Top-3 ranks auto-highlight. `ratio` drives bar width — normalize against the list max.
