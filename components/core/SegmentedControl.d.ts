import React from 'react';

export interface SegmentOption {
  value: string;
  label?: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  /** Option list — strings or {value,label,icon} objects */
  options: (string | SegmentOption)[];
  /** Currently selected value */
  value: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/** Pill toggle for view modes (รายเดือน/รายไตรมาส/รายปี, chart types, theme). */
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
