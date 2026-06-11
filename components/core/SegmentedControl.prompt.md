Pill toggle for switching view modes — the time-granularity switch on every Vantage chart, chart-type pickers, theme switch.

```jsx
const [g, setG] = React.useState('month');
<SegmentedControl
  value={g}
  onChange={setG}
  options={[
    { value: 'month', label: 'รายเดือน' },
    { value: 'quarter', label: 'รายไตรมาส' },
    { value: 'year', label: 'รายปี' },
  ]}
/>
```

Accepts plain string options too. Sizes `sm | md | lg`.
