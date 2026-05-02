"use client";

import type { PaginationMeta } from "@catering/types";
import { useEffect, useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PageItem = number | "ellipsis";

interface TablePaginationProps {
  pagination: PaginationMeta;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  rowsLabel?: string;
  pageSizeSelectId?: string;
  className?: string;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const getPageItems = (currentPage: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  if (left > 2) {
    items.push("ellipsis");
  }

  for (let value = left; value <= right; value += 1) {
    items.push(value);
  }

  if (right < totalPages - 1) {
    items.push("ellipsis");
  }

  items.push(totalPages);
  return items;
};

export const TablePagination = ({
  pagination,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
  rowsLabel = "Rows",
  pageSizeSelectId = "table-page-size",
  className,
}: TablePaginationProps) => {
  const totalPages = Math.max(1, pagination.totalPages);
  const initialPage = Math.min(Math.max(pagination.page ?? 1, 1), totalPages);

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(pagination.limit);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    setPageSize(pagination.limit);
  }, [pagination.limit]);

  const pageItems = useMemo(() => getPageItems(page, totalPages), [page, totalPages]);

  const goToPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(safePage);
    onPageChange?.(safePage);
  };

  const onPageSizeSelect = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
    onPageSizeChange?.(nextPageSize);
    onPageChange?.(1);
  };

  const renderPageItem = (item: PageItem, index: number) => {
    if (item === "ellipsis") {
      const previousItem = pageItems[index - 1];
      const nextItem = pageItems[index + 1];

      return (
        <PaginationItem key={`ellipsis-${String(previousItem)}-${String(nextItem)}`}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return (
      <PaginationItem key={item}>
        <PaginationLink isActive={item === page} onClick={() => goToPage(item)}>
          {item}
        </PaginationLink>
      </PaginationItem>
    );
  };

  return (
    <div className={className ?? "flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"}>
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        Page {page} of {totalPages}
      </span>

      <div className="flex w-full flex-wrap items-center justify-end gap-3 sm:w-auto sm:flex-nowrap">
        <label className="text-sm whitespace-nowrap text-muted-foreground" htmlFor={pageSizeSelectId}>
          {rowsLabel}
        </label>
        <select
          id={pageSizeSelectId}
          value={pageSize}
          className="h-8 rounded-md border border-input bg-background px-2 text-sm"
          onChange={(e) => {
            onPageSizeSelect(Number(e.target.value));
          }}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <Pagination className="mx-0 w-auto shrink-0 justify-start">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(page - 1)} disabled={page === 1} />
            </PaginationItem>

            {pageItems.map(renderPageItem)}

            <PaginationItem>
              <PaginationNext onClick={() => goToPage(page + 1)} disabled={page === totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
