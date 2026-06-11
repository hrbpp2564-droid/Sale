import React from 'react';

export interface RankBarProps {
  /** 1-based rank; top 3 get an accent chip */
  rank: number;
  label: string;
  sublabel?: string | null;
  /** Formatted value string shown at the right */
  value: string;
  /** Fill proportion 0..1 (usually value / max) */
  ratio: number;
  /** Optional % share string, e.g. "18.4%" */
  share?: string | null;
  /** Optional signed growth % for a small trend mark */
  delta?: number | null;
  /** Bar color — pull from --viz-* */
  color?: string;
  onClick?: (() => void) | null;
  style?: React.CSSProperties;
}

/** One ranked row with a proportional bar — Top-10 product & customer lists. */
export function RankBar(props: RankBarProps): JSX.Element;
