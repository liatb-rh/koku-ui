import React from 'react';
import { DataTable } from '../../tables/dataTable';

export interface TableColumn {
  name: string;
  orderBy?: string;
  isSortable?: boolean;
  hidden?: boolean;
  style?: React.CSSProperties;
}

export interface TableCell {
  value: React.ReactNode;
  hidden?: boolean;
  style?: React.CSSProperties;
}

export interface TableRow {
  cells: TableCell[];
  // Allow consumers to attach arbitrary metadata
  [key: string]: any;
}

export interface OptimizationsDataTableShellProps {
  columns: TableColumn[];
  rows: TableRow[];
  filterBy?: any;
  isLoading?: boolean;
  onSort?(value: string, isSortAscending: boolean): void;
  orderBy?: any;
  emptyState?: React.ReactNode;
}

export function OptimizationsDataTableShell({
  columns,
  rows,
  filterBy,
  isLoading,
  onSort,
  orderBy,
  emptyState,
}: OptimizationsDataTableShellProps) {
  return (
    <DataTable
      columns={columns}
      emptyState={emptyState}
      filterBy={filterBy}
      isLoading={isLoading}
      onSort={onSort}
      orderBy={orderBy}
      rows={rows}
    />
  );
}


