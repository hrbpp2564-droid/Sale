import React from 'react';

export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'positive' | 'negative' | 'warning' | 'info';
  variant?: 'soft' | 'solid' | 'outline';
  size?: 'sm' | 'md';
  /** Show a leading status dot */
  dot?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Small pill label for status, category, or rank. */
export function Badge(props: BadgeProps): JSX.Element;
