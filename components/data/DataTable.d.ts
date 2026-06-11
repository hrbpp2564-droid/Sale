import React from 'react';

export interface DataColumn {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  /** Right-aligns + applies tabular numeric font */
  numeric?: boolean;
  /** Muted text color */
  muted?: boolean;
  width?: number | string;
  /** Disable sorting for this column */
  sortable?: boolean;
  /** Custom cell renderer */
  render?: (row: any, index: number) => React.ReactNode;
}

export interface DataTableProps {
  columns: DataColumn[];
  rows: any[];
  sortable?: boolean;
  rowKey?: (row: any, index: number) => string | number;
  onRowClick?: ((row: any, index: number) => void) | null;
  stickyHeader?: boolean;
  zebra?: boolean;
  style?: React.CSSProperties;
}

/**
 * Compact dark data grid for rankings, detail tables, and year-comparison matrices.
 * @startingPoint section="Data" subtitle="Sortable dark data grid" viewport="700x320"
 */
export function DataTable(props: DataTableProps): JSX.Element;
