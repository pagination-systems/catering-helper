"use client";

import type { PaginationMeta } from "@catering/types";
import type { ReactNode } from "react";
import { If } from "@/components/if";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTableAutoAnimate } from "@/hooks/use-table-auto-animate";
import { cn } from "@/lib/utils";
import { TablePagination } from "./table-pagination";

type ColumnSize = number | string;

export interface DataTableColumn<TData> {
  id?: string;
  accessorKey?: keyof TData;
  header: ReactNode;
  cell?: (row: TData) => ReactNode;
  size?: ColumnSize;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: DataTableColumn<TData>[];
  pagination: PaginationMeta;
  handlePaginate?: (page: number, limit: number) => void;
  getRowId: (row: TData, index: number) => string;
  emptyState?: ReactNode;
  tableClassName?: string;
  paginationClassName?: string;
}

const getColumnSizeStyle = (size?: ColumnSize) => {
  if (!size) return undefined;

  return {
    width: typeof size === "number" ? `${size}px` : size,
  };
};

const isActionsColumn = <TData,>(column: DataTableColumn<TData>) => {
  if (typeof column.id === "string" && column.id.toLowerCase() === "actions") return true;
  if (typeof column.accessorKey === "string" && column.accessorKey.toLowerCase() === "actions") return true;

  return false;
};

export const DataTable = <TData,>({
  data,
  columns,
  pagination,
  handlePaginate,
  getRowId,
  emptyState,
  tableClassName,
  paginationClassName,
}: DataTableProps<TData>) => {
  const [tbodyRef] = useTableAutoAnimate();

  const rows = data.map((row, rowIndex) => (
    <TableRow key={getRowId(row, rowIndex)}>
      {columns.map((column, colIndex) => {
        const cellContent = column.cell?.(row) ?? (column.accessorKey ? (row[column.accessorKey] as ReactNode) : null);

        return (
          <TableCell key={column.id ?? String(column.accessorKey ?? colIndex)} style={getColumnSizeStyle(column.size)}>
            {cellContent}
          </TableCell>
        );
      })}
    </TableRow>
  ));

  return (
    <>
      <Table className={tableClassName ?? "border-b"}>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={column.id ?? String(column.accessorKey ?? index)}
                style={getColumnSizeStyle(column.size)}
                className={cn(isActionsColumn(column) && "text-right")}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody ref={tbodyRef} key={pagination.page}>
          <If
            expression={data.length > 0}
            fallback={
              <TableRow>
                <TableCell colSpan={columns.length} className="py-32 text-center text-muted-foreground">
                  {emptyState ?? "No records found."}
                </TableCell>
              </TableRow>
            }
          >
            {rows}
          </If>
        </TableBody>
      </Table>

      <If expression={pagination.totalDocs > pagination.limit}>
        <TablePagination
          className={paginationClassName}
          pagination={pagination}
          onPageChange={(page) => {
            handlePaginate?.(page, pagination.limit);
          }}
          onPageSizeChange={(limit) => {
            handlePaginate?.(1, limit);
          }}
        />
      </If>
    </>
  );
};
