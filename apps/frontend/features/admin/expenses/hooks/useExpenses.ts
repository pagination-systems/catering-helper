import { useBuildQueryString } from "@catering/react-query-builder";
import type { PaginationMeta } from "@catering/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks";
import * as expenseApi from "../api/expense.api";
import { EXPENSE_KEYS } from "../queries/expense.keys";

const DEFAULT_PAGINATION: PaginationMeta = {
  totalDocs: 0,
  limit: 10,
  hasPrevPage: false,
  hasNextPage: false,
  page: 1,
  totalPages: 1,
  prevPage: null,
  nextPage: null,
  pagingCounter: 1,
};

export const useExpenses = (tenantId?: string) => {
  const [search, setSearch] = useState("");
  const controller = useBuildQueryString(tenantId ? { required: { value: { tenantId } } } : undefined);
  const debouncedSearch = useDebounce(search, 500);
  const controllerRef = useRef(controller);

  const { data, isLoading } = useQuery({
    queryKey: EXPENSE_KEYS.lists(controller.query),
    queryFn: () => expenseApi.getExpenses(controller.getQueryString()),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    controllerRef.current = controller;
  }, [controller]);

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      controllerRef.current.handleSearch({ value: { clientSearch: debouncedSearch } });
    }
  }, [debouncedSearch]);

  return {
    ...controller,
    expenses: data?.items ?? [],
    pagination: data?.pagination ?? DEFAULT_PAGINATION,
    isLoading,
    onSearch: setSearch,
  };
};
