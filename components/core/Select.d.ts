import React from 'react';

export interface SelectOption {
  value: string;
  label?: string;
}

export interface SelectProps {
  options: (string | SelectOption)[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Optional overline label above the control */
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Fixed control width in px */
  width?: number;
  style?: React.CSSProperties;
}

/** Compact filter dropdown with a custom dark popover. Powers the global filter bar. */
export function Select(props: SelectProps): JSX.Element;
