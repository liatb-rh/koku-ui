import { Bullseye, EmptyState, EmptyStateBody, Spinner } from '@patternfly/react-core';
import { CalculatorIcon } from '@patternfly/react-icons/dist/esm/icons/calculator-icon';
import type { ThProps } from '@patternfly/react-table';
import { SortByDirection, Table, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import type { ReactNode } from 'react';
import React from 'react';

import { styles } from './dataTable.styles';

interface SelectableTableOwnProps {
  columns?: any[];
  emptyState?: ReactNode;
  emptyStateBody?: ReactNode | string;
  filterBy?: any;
  isLoading?: boolean;
  onSort?(value: string, isSortAscending: boolean): void;
  onRowClick?(rowIndex: number): void;
  orderBy?: any;
  rows?: any[];
  ariaLabel?: string;
  rowAriaLabel?: string;
  headerAriaLabel?: string;
}

type SelectableTableProps = SelectableTableOwnProps;

class SelectableTable extends React.Component<SelectableTableProps, any> {
  constructor(props: SelectableTableProps) {
    super(props);
    this.handleOnSort = this.handleOnSort.bind(this);
  }

  private getEmptyState = () => {
    const { emptyState, emptyStateBody, filterBy } = this.props;

    if (filterBy) {
      for (const val of Object.values(filterBy)) {
        if (val !== '*') {
          return (
            <EmptyState icon={CalculatorIcon} titleText="">
              <EmptyStateBody>No results match the selected filters</EmptyStateBody>
            </EmptyState>
          );
        }
      }
    }
    if (emptyState) {
      return emptyState;
    }
    return (
      <EmptyState icon={CalculatorIcon} titleText="">
        <EmptyStateBody>{emptyStateBody ?? 'No data available'}</EmptyStateBody>
      </EmptyState>
    );
  };

  private getSortBy = index => {
    const { columns, orderBy } = this.props;

    const direction = orderBy && orderBy[columns[index].orderBy];

    return direction
      ? {
          index,
          direction,
        }
      : {};
  };

  private getSortParams = (index: number): ThProps['sort'] => {
    return {
      sortBy: this.getSortBy(index),
      onSort: this.handleOnSort,
      columnIndex: index,
    };
  };

  private handleOnSort = (index, direction) => {
    const { columns, onSort } = this.props;

    if (onSort) {
      const orderBy = columns[index].orderBy;
      const isSortAscending = direction === SortByDirection.asc;
      onSort(orderBy, isSortAscending);
    }
  };

  private handleOnRowClick = (rowIndex: number) => {
    const { onRowClick, rows } = this.props;

    rows.map(row => (row.selected = false));
    rows[rowIndex].selected = true;

    this.setState({ rows }, () => {
      if (onRowClick) {
        onRowClick(rowIndex);
      }
    });
  };

  public render() {
    const {
      ariaLabel,
      columns = [],
      headerAriaLabel,
      isLoading,
      rowAriaLabel,
      rows = [],
    } = this.props;

    return (
      <>
        <Table aria-label={ariaLabel ?? 'Selectable table'} gridBreakPoint="grid-2xl" variant={TableVariant.compact}>
          <Thead>
            <Tr>
              {columns.map((col, index) => (
                <Th
                  key={`col-${index}-${col.value}`}
                  modifier="nowrap"
                  sort={col.isSortable ? this.getSortParams(index) : undefined}
                  style={col.style}
                >
                  {col.name}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={100}>
                  <Bullseye>
                    <div style={{ textAlign: 'center' }}>
                      <Spinner size="xl" />
                    </div>
                  </Bullseye>
                </Td>
              </Tr>
            ) : (
              rows.map((row, rowIndex) => (
                <Tr
                  aria-label={rowAriaLabel ?? 'Selectable table row'}
                  isSelectable
                  isClickable
                  isRowSelected={row.selected}
                  onRowClick={() => this.handleOnRowClick(rowIndex)}
                  key={`row-${rowIndex}`}
                >
                  {row.cells.map((item, cellIndex) =>
                    cellIndex === 0 ? (
                      <Th
                        aria-label={headerAriaLabel ?? 'Row header'}
                        dataLabel={columns[cellIndex].name}
                        key={`cell-${rowIndex}-${cellIndex}`}
                        modifier="nowrap"
                        style={item.style}
                      >
                        {item.value}
                      </Th>
                    ) : (
                      <Td
                        dataLabel={columns[cellIndex].name}
                        key={`cell-${rowIndex}-${cellIndex}`}
                        modifier="nowrap"
                        style={item.style}
                      >
                        {item.value}
                      </Td>
                    )
                  )}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
        {rows.length === 0 && <div style={styles.emptyState}>{this.getEmptyState()}</div>}
      </>
    );
  }
}

export { SelectableTable };


