import React from 'react';

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  /** Stroke + fill color (default accent) */
  color?: string;
  fill?: boolean;
  endDot?: boolean;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

/** Tiny inline trend line for KPI tiles and table rows. */
export function Sparkline(props: SparklineProps): JSX.Element;
