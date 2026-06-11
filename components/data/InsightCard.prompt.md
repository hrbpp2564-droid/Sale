A single AI-generated insight row for the Insight Engine — tone-coded left rail + icon, optional emphasized metric.

```jsx
<InsightCard tone="positive" icon={<Icon name="trending-up" />}
  title="ยอดขายเดือนนี้เพิ่มขึ้น" metric="+18.4%"
  detail="แรงหนุนจากกลุ่มลูกค้า A และสินค้า Polymer-A เทียบเดือนก่อน" time="เรียลไทม์" />
<InsightCard tone="warning" icon={<Icon name="alert-triangle" />}
  title="พึ่งพาลูกค้ารายใหญ่สูง" detail="Top 3 ลูกค้าคิดเป็น 52% ของรายได้รวม" />
```

Tones: `positive | negative | warning | info`. Stack in the Insight Engine panel with a small gap.
