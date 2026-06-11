import React from 'react';

export interface DeltaBadgeProps {
  /** Signed change. Positive → up arrow + green by default. */
  value: number;
  format?: 'percent' | 'number';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  /** For metrics where down is good (cost, risk): flips the color logic */
  invert?: boolean;
  /** Appended after the figure, e.g. " YoY" */
  suffix?: string;
  style?: React.CSSProperties;
}

/** Directional growth indicator — the MoM / YoY delta chip used on every KPI. */
export function DeltaBadge(props: DeltaBadgeProps): JSX.Element;
