import React from 'react';

export interface ParetoDatum {
  label: string;
  value: number;
}

export interface ParetoChartProps {
  data: ParetoDatum[];
  height?: number;
  barColor?: string;
  lineColor?: string;
  /** Reference line %, default 80 (Pareto principle) */
  threshold?: number;
  valueFormat?: (v: number) => string;
  style?: React.CSSProperties;
}

/** Bars + cumulative % line with an 80% reference — customer-concentration / Pareto analysis. */
export function ParetoChart(props: ParetoChartProps): JSX.Element;
