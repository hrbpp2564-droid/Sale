Bars (value, sorted desc) + cumulative-% line with an 80% reference — Customer Contribution / Pareto analysis (Dashboard 4). Reveals concentration risk (how few customers make 80% of revenue).

```jsx
<ParetoChart
  threshold={80}
  valueFormat={(v) => '฿' + v + 'M'}
  data={customers.map(c => ({ label: c.name, value: c.revenue }))}
/>
```

Data is sorted internally. Left axis = value, right axis = cumulative %. The dashed red line marks the threshold.
