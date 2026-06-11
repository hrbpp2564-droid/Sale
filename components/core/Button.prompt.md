Primary action button — use for the main call-to-action on a screen; pair with `secondary`/`ghost` for lesser actions.

```jsx
<Button variant="primary" size="md" iconLeft={<Icon name="download" />}>
  ส่งออก Excel
</Button>
<Button variant="secondary">ยกเลิก</Button>
<Button variant="ghost" size="sm">ล้างตัวกรอง</Button>
```

Variants: `primary` (blue), `secondary` (outlined surface), `ghost` (transparent), `danger` (red). Sizes: `sm` (30px), `md` (36px), `lg` (44px). Supports `iconLeft` / `iconRight`, `fullWidth`, `disabled`.
