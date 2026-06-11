Filter dropdown with a custom dark popover — the building block of the global filter bar (ปี, เดือน, ลูกค้า, สินค้า, จังหวัด…).

```jsx
const [year, setYear] = React.useState('2569');
<Select
  label="ปี"
  width={120}
  value={year}
  onChange={setYear}
  options={['2565','2566','2567','2568','2569']}
/>
```

Pass `{value,label}` objects when display text differs from value. Optional `label` renders an uppercase overline above the control.
