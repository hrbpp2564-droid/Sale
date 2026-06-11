Executive metric tile — the KPI row across the top of every dashboard. Drill-down ready via `onClick`.

```jsx
<KpiCard
  label="มูลค่าขายรวม"
  value="847.2" unit="ล้านบาท"
  delta={12.4} deltaSuffix=" MoM"
  secondary={{ label: 'YoY', value: 8.2 }}
  spark={<Sparkline data={[3,5,4,6,7,6,8]} />}
  accent
  onClick={() => drillInto('revenue')}
/>
```

Pre-format `value` yourself (tabular numerals are applied). Use `accent` for the single hero KPI; pass `secondary` for a YoY alongside the MoM `delta`.
