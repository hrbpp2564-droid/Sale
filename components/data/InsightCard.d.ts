import React from 'react';

export interface InsightCardProps {
  tone?: 'positive' | 'negative' | 'warning' | 'info';
  icon?: React.ReactNode;
  title: React.ReactNode;
  detail?: React.ReactNode;
  /** Emphasized figure, e.g. "+18.4%" */
  metric?: string | null;
  /** Timestamp/freshness label, e.g. "เรียลไทม์" */
  time?: string | null;
  onClick?: (() => void) | null;
  style?: React.CSSProperties;
}

/** A single AI-generated insight row for the Insight Engine panel. */
export function InsightCard(props: InsightCardProps): JSX.Element;
