# Vantage Sales Intelligence — Design System

**Vantage** is the design system for an **Executive Sales Dashboard** — a business-intelligence
product that turns a company's real sales database (date · customer · product · quantity in **Kg** ·
value in **บาท** · average unit price · multi-year history) into executive decision support for
sales, production, and business planning.

The product is **Thai-primary**, **dark-mode-first**, and built around dense, comparable numbers:
KPI tiles, multi-year trend charts, Top-10 rankings, Pareto concentration analysis, product mix,
price tracking, year-over-year comparison, AI forecasting, and an always-on AI Insight Engine.

> **Sources.** This system was authored from a written product brief (a Thai-language
> *Sales Dashboard System Design Prompt*). No existing codebase, Figma file, or brand assets were
> provided — the brand (name "Vantage", logo, color, type) was created for this system. If you have
> the company's real brand assets, replace `assets/vantage-mark.svg`, the accent color in
> `tokens/colors.css`, and the fonts in `tokens/fonts.css`.

---

## Foundational decisions (confirmed with the user)

| Decision | Choice |
|---|---|
| Language | **Thai primary** — Thai fonts, Thai labels throughout |
| Theme | **Dark mode primary** (executive, high-contrast); full light-mode parity |
| Accent | **Electric blue** `#1f6feb` |
| Type | **Geometric & clean** — IBM Plex Sans Thai + tabular numerals |
| Charts | **Hand-built SVG/CSS**, no chart dependencies |
| Scope | **All 8 dashboards** + Executive Overview as one interactive UI kit |

---

## Content fundamentals

How Vantage writes copy:

- **Language is Thai**, with **English/Latin reserved for units, metrics, and proper nouns** —
  `Kg`, `บาท`, `YoY`, `CAGR`, `YTD`, `Top 10`, `Drill Down`, product/customer names. This bilingual
  register is intentional: Thai for the narrative, Latin for the math.
- **Tone is executive and factual** — declarative, confident, never chatty. Insights state the fact
  and the magnitude: *"ยอดขายเดือนนี้เพิ่มขึ้น +18.4%"*, *"พึ่งพาลูกค้ารายใหญ่สูง — Top 3 = 52% ของรายได้"*.
- **Numbers lead.** Every statement is anchored to a figure with its unit and a comparison basis
  (MoM / YoY / vs target). A claim without a number is incomplete.
- **No first or second person** in the UI chrome. The system speaks about the *data*, not to the
  user ("ยอดขายเพิ่มขึ้น", not "คุณขายได้มากขึ้น"). Buttons are bare imperatives: *ส่งออก*, *ล้างตัวกรอง*, *ดูรายละเอียด*.
- **Casing:** Latin labels use Title Case for nav/sections (Sales Overview, Product Analysis) and
  UPPERCASE for tiny overline labels (e.g. `EXECUTIVE DASHBOARD`). Thai has no casing — weight and
  size carry hierarchy instead.
- **No emoji.** Status and direction are shown with iconography, color, and arrow glyphs (▲ ▼), never
  emoji. Tone stays boardroom-appropriate.
- **Units are explicit and consistent:** `Kg` (quantity), `บาท` / `ลบ.` (ล้านบาท, value),
  `฿/Kg` (average selling price). Always show the unit beside the figure.

Example insight voice:
> ▲ **ยอดขายเดือนนี้เพิ่มขึ้น +18.4%** — แรงหนุนจากกลุ่มลูกค้า A และสินค้า Polymer-A เทียบเดือนก่อน · เรียลไทม์

---

## Visual foundations

**Mood.** A quiet, high-contrast executive cockpit. Deep cool-slate canvas, one electric-blue signal
color, generous use of tabular numerals. Calm by default so the *data* and its *color-coded deltas*
are the only things that shout.

- **Color.** Dark-first. Canvas is near-black cool slate (`--bg-app #0b0e14`), cards step up through a
  5-level surface ramp (`surface-1 → surface-3`). A single brand blue (`#1f6feb`) is the only accent —
  used for primary actions, active states, and the primary chart series. **Green/red are reserved for
  growth direction only** (never decoration). An 8-hue categorical palette (`--viz-1…8`) colors chart
  series; use them *in order*. Light theme is a true parity theme via `[data-theme="light"]`, not an
  afterthought.
- **Type.** IBM Plex Sans Thai for all UI text; **IBM Plex Mono** for every number (KPIs, axes, table
  cells) with `tabular-nums lining-nums` so digits align in columns. Hierarchy is weight + size, not
  color. Display figures run 30–48px; body 13–14px; overline labels 11px uppercase with wide tracking.
- **Spacing.** 4px base grid. Cards pad `16–24px`. Dense by intent — this is a data product, not a
  marketing page — but never cramped; `gap` (flex/grid) carries all rhythm.
- **Backgrounds.** Flat solid surfaces. **No gradients** except two restrained uses: a faint accent
  wash on the single hero KPI tile, and sparkline/area fills that fade an accent to transparent.
  No images, textures, or patterns behind data.
- **Borders.** Hairline, low-opacity white on dark (`--border-subtle` 6% → `--border-strong` 16%).
  Borders define structure; they never use the accent except on focus/active.
- **Corner radii.** Controls `8px` (md), cards `12px` (lg), pills/badges `999px`. Soft but not bubbly.
- **Cards** = `surface-1` + `1px subtle border` + `shadow-sm`. On hover (interactive cards only):
  border brightens to `strong`, shadow lifts to `md`, and the card nudges up `1px`. No heavy shadows
  at rest.
- **Shadows.** Deep and low-spread, tuned for dark (`0 4px 12px rgba(0,0,0,.45)` family). A dedicated
  `--shadow-accent-glow` is reserved for primary emphasis.
- **Motion.** Quick and functional: `120–180ms`, `cubic-bezier(0.4,0,0.2,1)`. Fades and 1px lifts;
  bars/lines grow on first paint with an ease-out. **No bounce, no infinite loops, no decorative
  motion.** Charts animate width/length once on entry.
- **Hover states:** surfaces lighten one step (`surface-2 → surface-3`); primary button → `accent-hover`
  (lighter blue). **Press states:** primary button → `accent-press` (darker) + `0.5px` downward nudge.
- **Transparency & blur** are used sparingly — only popovers/dialogs (`--surface-overlay` ~93% opacity).
  Data surfaces are fully opaque for legibility.
- **Layout rules.** Fixed left sidebar (`248px`, collapsible to `64px`), fixed top bar (`60px`), and a
  sticky global **filter bar** (`52px`) that applies to every dashboard simultaneously. Content max
  `1600px`. KPI row across the top, then a responsive chart/table grid.
- **Imagery.** Essentially none — this is a numbers product. The only "imagery" is data viz itself.

---

## Iconography

- **System:** [**Lucide**](https://lucide.dev) — 1.5–2px stroke, rounded caps/joins, 24px grid.
  Its clean geometric stroke matches the Plex Sans Thai / geometric direction and reads well at small
  sizes on dark surfaces. **This is a substitution flagged to the user:** no icon set was supplied with
  the brief, so Lucide was chosen as the closest fit. Swap freely if the company has its own set.
- **Delivery:** Lucide is loaded from CDN (`lucide@latest`) in the UI kit, or inlined as SVG paths in
  components/cards (stroke `currentColor` so they inherit text color). The reusable components accept
  icon nodes as props (`iconLeft`, `icon`) rather than hard-coding glyphs.
- **Direction glyphs:** growth uses a filled triangle (▲ / ▼ via `DeltaBadge`), not an emoji or a
  letter. Color (green/red) reinforces direction.
- **No emoji, no unicode-as-icon** anywhere in the product. Rank numbers (#1, #2) are typeset figures,
  not medal emoji.
- **Logo:** `assets/vantage-mark.svg` — an ascending trend line peaking to a dot inside a rounded-square,
  in brand blue. Pairs with the "Vantage" wordmark (IBM Plex Sans Thai 600, `-0.02em`). See
  `guidelines/logo.html`.

---

## Index / manifest

**Root**
- `styles.css` — the one file consumers link; `@import`s everything below.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills entry point.
- `_ds_bundle.js`, `_ds_manifest.json` — generated by the compiler (do not edit).

**`tokens/`** — design tokens (all reachable from `styles.css`)
- `fonts.css` · `colors.css` (dark `:root` + light `[data-theme="light"]`) · `typography.css` ·
  `spacing.css` (spacing/radii/shadows/motion/layout) · `base.css` (`.vantage` reset).

**`components/`** — reusable React primitives (namespace `VantageSalesIntelligenceDesignSystem_a75d0a`)
- `core/` — **Button, IconButton, Select, SegmentedControl, Card, Badge**
- `data/` — **KpiCard, DeltaBadge, RankBar, InsightCard, DataTable**
- `charts/` — **LineChart** (line/area/combo, dual-axis), **DonutChart**, **ParetoChart**, **Sparkline**

**`guidelines/`** — foundation specimen cards (Design System tab): colors (accent, neutral, semantic,
viz, surfaces, themes), type (numeric, headings, body), spacing (scale, radii, shadows), brand (logo).

**`ui_kits/`** — full-screen product recreations
- `dashboard/` — the BWP Executive Dashboard: 9 interactive screens (Executive Overview + 8
  dashboards) sharing the app shell, global filter bar, and the component library. **Wired to real
  company data** from `ยอดขาย 69.xlsx` (ม.ค.–พ.ค. 2569 เทียบ 2568), aggregated into `data.js`.

> **Live data note.** `ui_kits/dashboard/data.js` is generated from the user's uploaded workbook
> (BWP — Best World Interplas, a plastic film/bag manufacturer; sales in **Kg + บาท**). 5 months of
> 2569 actuals vs 2568. Per-customer figures are **volume (Kg)** only — the source has no
> per-customer value — so customer screens rank by Kg while product/value screens use มูลค่า (ลบ.).
> Forecast projects year-end from the last-3-month run rate. Regenerate `data.js` by re-running the
> aggregation if the workbook is updated.

**`assets/`** — `vantage-mark.svg` (logo).
