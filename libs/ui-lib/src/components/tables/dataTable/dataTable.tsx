import './dataTable.css';

import { Bullseye, EmptyState, EmptyStateBody, Spinner } from '@patternfly/react-core';
import { CalculatorIcon } from '@patternfly/react-icons/dist/esm/icons/calculator-icon';
import type { ThProps } from '@patternfly/react-table';
import { SortByDirection, Table, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import React from 'react';

import { styles } from './dataTable.styles';

interface DataTableOwnProps {
  columns?: any[];
  emptyState?: React.ReactNode;
  emptyStateBody?: React.ReactNode | string;
  filterBy?: any;
  isActionsCell?: boolean;
  isLoading?: boolean;
  isSelectable?: boolean;
  onSelect?(items: any[], isSelected: boolean): void;
  onSort?(value: string, isSortAscending: boolean): void;
  orderBy?: any;
  rows?: any[];
  selectedItems?: any[];
  ariaLabel?: string;
}

type DataTableProps = DataTableOwnProps;

class DataTable extends React.Component<DataTableProps, any> {
  constructor(props: DataTableProps) {
    super(props);
    this.handleOnSelect = this.handleOnSelect.bind(this);
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

    const direction = orderBy && columns && orderBy[columns[index].orderBy];

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
      onSort: (_evt, i, direction) => this.handleOnSort(i, direction),
      columnIndex: index,
    };
  };

  private handleOnSelect = (isSelected, rowId) => {
    const { onSelect, rows } = this.props;

    let newRows;
    let items = [];
    if (rowId === -1) {
      newRows = rows && rows.map(row => {
        row.selected = isSelected;
        return row;
      });
    } else {
      newRows = rows && [...rows];
      newRows[rowId].selected = isSelected;
      items = newRows && [newRows[rowId].item];
    }
    this.setState({ rows }, () => {
      if (onSelect) {
        onSelect(items, isSelected);
      }
    });
  };

  private handleOnSort = (index, direction) => {
    const { columns, onSort } = this.props;

    if (onSort) {
      const orderBy = columns && columns[index].orderBy;
      const isSortAscending = direction === SortByDirection.asc;
      onSort(orderBy, isSortAscending);
    }
  };

  public render() {
    const { ariaLabel, columns = [], isActionsCell = false, isLoading, isSelectable, rows = [] } = this.props;

    return (
      <>
        <Table
          aria-label={ariaLabel ?? 'Data table'}
          className="tableOverride"
          gridBreakPoint="grid-2xl"
          variant={TableVariant.compact}
        >
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
                <Tr key={`row-${rowIndex}`}>
                  {row.cells.map((item, cellIndex) =>
                    cellIndex === 0 && isSelectable ? (
                      <Td
                        dataLabel={columns[cellIndex].name}
                        key={`cell-${cellIndex}-${rowIndex}`}
                        modifier="nowrap"
                        select={{
                          isDisabled: row.selectionDisabled,
                          isSelected: row.selected,
                          onSelect: (_evt, isSelected) => this.handleOnSelect(isSelected, rowIndex),
                          rowIndex,
                        }}
                        style={item.style}
                      />
                    ) : (
                      <Td
                        dataLabel={columns[cellIndex].name}
                        key={`cell-${rowIndex}-${cellIndex}`}
                        modifier="nowrap"
                        isActionCell={isActionsCell && cellIndex === row.cells.length - 1}
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

export { DataTable };


