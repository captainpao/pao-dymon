import React, { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export type SortDirection = 'asc' | 'desc' | null;

interface Column {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: Row) => React.ReactNode;
}

interface Row {
  [key: string]: any;
}

type RowId = string | number;

interface PaoTableProps {
  columns: Column[];
  rows: Row[];
  className?: string;
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  minWidth?: string | number;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: RowId[]) => void;
  rowIdKey?: string;
}

export function PaoTable({
  columns,
  rows,
  className = '',
  striped = true,
  hover = true,
  bordered = true,
  size = 'md',
  minWidth,
  selectable = false,
  onSelectionChange,
  rowIdKey = 'id'
}: PaoTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<RowId[]>([]);

  const handleSort = (columnKey: string) => {
    if (sortKey === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortKey(null);
      }
    } else {
      setSortKey(columnKey);
      setSortDirection('asc');
    }
  };

  const getSortDirectionForColumn = (columnKey: string) => {
    if (sortKey === columnKey) {
      return sortDirection;
    }
    return null;
  };

  // Selection functionality
  const handleSelectAll = () => {
    if (!selectable) return;

    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
      onSelectionChange?.([]);
    } else {
      const allRowIds = rows.map(row => row[rowIdKey]);
      setSelectedRows(allRowIds);
      onSelectionChange?.(allRowIds);
    }
  };

  const handleSelectRow = (rowId: RowId) => {
    if (!selectable) return;

    const newSelectedRows = selectedRows.includes(rowId)
      ? selectedRows.filter(id => id !== rowId)
      : [...selectedRows, rowId];

    setSelectedRows(newSelectedRows);
    onSelectionChange?.(newSelectedRows);
  };

  const isAllSelected = selectable && rows.length > 0 && selectedRows.length === rows.length;
  const isIndeterminate = selectable && selectedRows.length > 0 && selectedRows.length < rows.length;

  const sortedRows = useMemo(() => {
    if (!sortKey || !sortDirection) return rows;

    return [...rows].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      // Try to parse values as numbers for numeric sorting
      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);

      // If both values can be parsed as numbers, sort numerically
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // Otherwise, sort as strings
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [rows, sortKey, sortDirection]);

  const sizeClass = size === 'sm' ? 'table-sm' : size === 'lg' ? 'table-lg' : '';
  const tableClass = `table ${bordered ? 'table-bordered' : ''} ${striped ? 'table-striped' : ''} ${hover ? 'table-hover' : ''} ${sizeClass} ${className}`.trim();

  const getSortIcon = (direction: SortDirection) => {
    if (direction === 'asc') return <FaSortUp size={16} />;
    if (direction === 'desc') return <FaSortDown size={16} />;
    return <FaSort size={16} />;
  };


  return (
    <div className="table-responsive overflow-auto">
      <table className={tableClass} style={{ minWidth: minWidth }}>
        <thead>
          <tr>
            {selectable && (
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                style={column.width ? { width: column.width } : {}}
                className={Boolean(column.sortable) ? 'cursor-pointer user-select-none' : ''}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="d-flex align-items-center justify-content-between small">
                  {column.header}
                  {column.sortable && (
                    <span className="ms-1 text-muted">
                      {getSortIcon(getSortDirectionForColumn(column.key))}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center text-muted">
                No data available
              </td>
            </tr>
          ) : (
            sortedRows.map((row, rowIndex) => {
              const rowId = row[rowIdKey];
              const isSelected = selectedRows.includes(rowId);

              return (
                <tr key={rowIndex}>
                  {selectable && (
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isSelected}
                        onChange={() => handleSelectRow(rowId)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PaoTable;