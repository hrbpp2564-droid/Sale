import React from 'react';

export interface IconButtonProps {
  variant?: 'ghost' | 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  /** Highlight as the active/selected control */
  active?: boolean;
  disabled?: boolean;
  /** Accessible label + tooltip text */
  label?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

/** Icon-only square control for toolbars, table rows, and headers. */
export function IconButton(props: IconButtonProps): JSX.Element;
