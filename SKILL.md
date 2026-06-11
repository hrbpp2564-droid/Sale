---
name: vantage-design
description: Use this skill to generate well-branded interfaces and assets for Vantage Sales Intelligence — an executive sales-dashboard system (Thai-primary, dark-first, electric-blue). Use for production UI or throwaway prototypes/mocks. Contains design guidelines, color & type tokens, fonts, logo assets, chart + data components, and a full dashboard UI kit.
user-invocable: true
---

# Vantage Sales Intelligence — design skill

Read `readme.md` first — it carries the full guidance: brand context, content fundamentals
(Thai-primary voice, executive tone, numbers-lead copy), visual foundations (dark-first surfaces,
one blue accent, tabular numerals, hand-built charts), and iconography (Lucide).

Then explore the system:
- `styles.css` — the single stylesheet to link; `@import`s all tokens + fonts.
- `tokens/` — colors (dark `:root` + light `[data-theme="light"]`), typography, spacing/radii/shadows.
- `components/` — React primitives: **core** (Button, IconButton, Select, SegmentedControl, Card,
  Badge), **data** (KpiCard, DeltaBadge, RankBar, InsightCard, DataTable), **charts** (LineChart,
  DonutChart, ParetoChart, Sparkline). Each has a `.prompt.md` with a usage example.
- `guidelines/` — foundation specimen cards.
- `ui_kits/dashboard/` — a full 9-screen executive dashboard (shell + screens). Read these files to
  see how the components compose into real product views.
- `assets/vantage-mark.svg` — the logo.

## How to build with it

If creating **visual artifacts** (slides, mocks, throwaway prototypes): copy the assets you need out
of this skill, link `styles.css` (or inline the token values), wrap your root in
`<body class="vantage" data-theme="dark">`, and assemble static HTML. Reuse the component patterns
shown in `ui_kits/dashboard/` rather than reinventing them.

If working on **production code**: copy the relevant assets and read the token + component rules here
to become an expert in designing with this brand. Pull colors from `--viz-*` for chart series, use
`--font-numeric` (tabular) for every figure, and keep green/red reserved for growth direction only.

## Non-negotiables
- **Thai primary**, Latin reserved for units/metrics/proper nouns (Kg, บาท, YoY, CAGR, Top 10).
- **Dark-first**, full light parity via `[data-theme]`. One accent: blue `#1f6feb`.
- **Numbers lead** every statement, with unit + comparison basis. **No emoji.** Lucide icons only.
- **Charts are hand-built SVG/CSS** — no chart libraries.

If invoked without guidance, ask what to build, ask a few scoping questions (surface, audience,
light/dark, which dashboards), then act as an expert designer outputting HTML artifacts or production
code as needed.
