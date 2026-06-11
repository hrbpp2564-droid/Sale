import React from 'react';

export interface ChartSeries {
  name: string;
  data: number[];
  color: string;
  /** Render style for this series */
  type?: 'line' | 'area' | 'bar';
  /** Bind to left (default) or right value axis for combo charts */
  axis?: 'left' | 'right';
}

export interface LineChartProps {
  series: ChartSeries[];
  /** X-axis category labels (months, quarters, years) */
  labels: string[];
  height?: number;
  /** Format y-axis ticks + tooltip values */
  yFormat?: (v: number) => string;
  showGrid?: boolean;
  showDots?: boolean;
  showLegend?: boolean;
  padding?: { top: number; right: number; bottom: number; left: number };
  style?: React.CSSProperties;
}

/**
 * Responsive multi-series line / area / combo chart — the main trend visual.
 * @startingPoint section="Charts" subtitle="Multi-line / area / combo trend chart" viewport="700x300"
 */
export function LineChart(props: LineChartProps): JSX.Element;
