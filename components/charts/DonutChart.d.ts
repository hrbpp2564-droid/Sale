import React from 'react';

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
  /** Center caption under the value */
  centerLabel?: string | null;
  /** Center figure (e.g. total) */
  centerValue?: string | null;
  showLegend?: boolean;
  /** Degrees of gap between segments */
  gap?: number;
  style?: React.CSSProperties;
}

/** Proportional ring for Product Mix / revenue-share breakdowns. */
export function DonutChart(props: DonutChartProps): JSX.Element;
