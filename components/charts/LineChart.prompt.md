Responsive multi-series trend chart — line, area, and combo (bar + line, dual-axis). Powers Sales Overview, Year Comparison, Price Analysis. Auto-fits container width; hover shows a crosshair + value readout.

```jsx
<LineChart
  height={260}
  labels={['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.']}
  yFormat={(v) => v.toLocaleString() + 'M'}
  series={[
    { name: 'มูลค่า (บาท)', data: [62,68,71,69,80,84], color: 'var(--viz-1)', type: 'bar' },
    { name: 'ปริมาณ (Kg)', data: [40,44,46,45,52,55], color: 'var(--viz-2)', type: 'line', axis: 'right' },
  ]}
/>
```

Mix `type` per series for combo charts; use `axis:'right'` for a second scale. Use `type:'area'` for a single-metric area chart.
