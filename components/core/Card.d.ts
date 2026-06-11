import React from 'react';

export interface CardProps {
  /** Header title; omit for a bare surface */
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Right-aligned header slot (e.g. SegmentedControl, IconButton) */
  actions?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Adds hover lift + pointer for clickable cards */
  interactive?: boolean;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Base surface for panels, charts, and tables. */
export function Card(props: CardProps): JSX.Element;
