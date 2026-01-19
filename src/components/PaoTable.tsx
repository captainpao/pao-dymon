import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaColumns, FaBars } from "react-icons/fa";

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
  manageColumns?: boolean;
  initialColumnVisibility?: Record<string, boolean>;
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
  rowIdKey = 'id',
  manageColumns = false,
  initialColumnVisibility
}: PaoTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<RowId[]>([]);

  // Column management state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    if (initialColumnVisibility) {
      return columns.reduce((acc, col) => ({
        ...acc,
        [col.key]: initialColumnVisibility[col.key] !== undefined ? initialColumnVisibility[col.key] : true
      }), {});
    }
    return columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {});
  });
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map(col => col.key)
  );
  const [showColumnManager, setShowColumnManager] = useState(false);
  const columnManagerRef = useRef<HTMLDivElement>(null);

  // Column management functionality
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnManagerRef.current && !columnManagerRef.current.contains(event.target as Node)) {
        setShowColumnManager(false);
      }
    };

    if (showColumnManager) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showColumnManager]);

  // Update column order in initialColumnVisibility changes
 useEffect(() => {
    if (initialColumnVisibility) {
      setColumnOrder(prev => {
        return prev.filter(key => columnVisibility[key] !== false);
      });
    }
  }, [initialColumnVisibility]);

  const toggleColumnVisibility = (columnKey: string) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);

    if (dragIndex !== dropIndex) {
      setColumnOrder(prev => {
        const newOrder = [...prev];
        const draggedItem = newOrder.splice(dragIndex, 1)[0];
        newOrder.splice(dropIndex, 0, draggedItem);
        return newOrder;
      });
    }
  };

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

  // Apply column order and visibility
  const visibleColumns = useMemo(() => {
    return columnOrder
      .map(key => columns.find(col => col.key === key))
      .filter((col): col is Column => col !== undefined && columnVisibility[col.key]);
  }, [columns, columnOrder, columnVisibility]);

  const sizeClass = size === 'sm' ? 'table-sm' : size === 'lg' ? 'table-lg' : '';
  const tableClass = `table ${bordered ? 'table-bordered' : ''} ${striped ? 'table-striped' : ''} ${hover ? 'table-hover' : ''} ${sizeClass} ${className}`.trim();

  const getSortIcon = (direction: SortDirection) => {
    if (direction === 'asc') return <FaSortUp size={16} />;
    if (direction === 'desc') return <FaSortDown size={16} />;
    return <FaSort size={16} />;
  };


  const ColumnManager = () => (
    <div className="d-flex justify-content-end">
      <div className="position-relative" ref={columnManagerRef}>
        <button
          className="btn btn-sm btn-link"
          title="Manage Columns"
          onClick={() => setShowColumnManager(!showColumnManager)}
        >
          <FaColumns />
        </button>

        {showColumnManager && (
          <div
            className="position-absolute top-100 end-0 bg-white border rounded shadow p-2 mt-1 z-3"
            style={{ width: '250px', maxHeight: '400px', overflowY: 'auto' }}
          >
            <div className="fw-bold mb-2 px-2">Manage Columns</div>
            {columnOrder.map((colKey, index) => {
              const column = columns.find(col => col.key === colKey);
              if (!column) return null;

              return (
                <div
                  key={colKey}
                  className="d-flex align-items-center gap-2 px-2 rounded small"
                  style={{ cursor: 'grab', border: '1px solid transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onDragStart={(e) => {
                    e.currentTarget.style.opacity = '0.5';
                    e.currentTarget.style.cursor = 'grabbing';
                    e.dataTransfer.effectAllowed = 'move';
                    handleDragStart(e, index);
                  }}
                  onDragEnd={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.cursor = 'grab';
                  }}
                  draggable
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <div style={{ marginTop: '-9px' }}>
                    <FaBars size={12} />
                  </div>
                  <div className="form-check mb-0 flex-grow-1">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={columnVisibility[colKey]}
                      onChange={() => toggleColumnVisibility(colKey)}
                    />
                    <label className="form-check-label text-nowrap overflow-hidden text-truncate">
                      {column.header}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      {manageColumns && ColumnManager()}
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
            {visibleColumns.map((column) => (
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
              <td colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="text-center text-muted">
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
                  {visibleColumns.map((column) => (
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
  </div>
  );
}

export default PaoTable;