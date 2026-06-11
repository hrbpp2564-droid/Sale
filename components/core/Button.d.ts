import React from 'react';

export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Control height */
  size?: 'sm' | 'md' | 'lg';
  /** Icon node placed before the label */
  iconLeft?: React.ReactNode;
  /** Icon node placed after the label */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  /** Stretch to container width */
  fullWidth?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Primary action button for the Vantage dashboard.
 * @startingPoint section="Core" subtitle="Buttons — primary, secondary, ghost, danger" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
