Base surface that wraps every panel, chart, and table. Header is optional; pass `actions` for a header-right control slot.

```jsx
<Card title="ยอดขายรวมต่อเดือน" subtitle="เปรียบเทียบ 5 ปีย้อนหลัง"
      actions={<SegmentedControl value={g} onChange={setG} options={['เดือน','ไตรมาส','ปี']} />}>
  <LineChart … />
</Card>
```

`padding`: `none` (charts that bleed to edge), `sm`, `md`, `lg`. Set `interactive` for clickable drill-down cards (hover lift).
