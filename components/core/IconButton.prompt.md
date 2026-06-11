Icon-only square button for toolbars, card headers, and row actions. Always pass `label` for accessibility + tooltip.

```jsx
<IconButton label="ดาวน์โหลด" variant="ghost"><Icon name="download" /></IconButton>
<IconButton label="ตัวกรอง" variant="outline" active><Icon name="filter" /></IconButton>
```

Variants: `ghost`, `solid`, `outline`. Use `active` to show the selected/pressed state (accent tint).
