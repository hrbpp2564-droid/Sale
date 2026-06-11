import React from 'react';

export interface KpiSecondary {
  label: string;
  value: number;
}

export interface KpiCardProps {
  /** Metric name, e.g. "ยอดขายรวม (Kg)" */
  label: string;
  /** Pre-formatted figure string (use tabular numerals) */
  value: string;
  /** Unit suffix, e.g. "Kg", "บาท", "฿/Kg" */
  unit?: string;
  /** Primary delta — renders a DeltaBadge */
  delta?: number | null;
  deltaSuffix?: string;
  /** Optional second comparison (e.g. YoY) */
  secondary?: KpiSecondary | null;
  icon?: React.ReactNode;
  /** Sparkline / mini-trend node rendered bottom-right */
  spark?: React.ReactNode;
  /** Highlight as the hero KPI (accent wash) */
  accent?: boolean;
  /** Makes the whole tile a drill-down target */
  onClick?: (() => void) | null;
  style?: React.CSSProperties;
}

/**
 * Executive metric tile — the row of KPIs across the top of every dashboard.
 * @startingPoint section="Data" subtitle="KPI metric tiles with delta + sparkline" viewport="700x150"
 */
export function KpiCard(props: KpiCardProps): JSX.Element;
