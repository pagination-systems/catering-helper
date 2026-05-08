import { useBuildQueryString } from "@catering/react-query-builder";
import type { PaginationMeta } from "@catering/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks";
import * as orderApi from "../api/order.api";
import { ORDER_KEYS } from "../queries/order.keys";

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

export const useOrders = (tenantId?: string) => {
  const [search, setSearch] = useState("");
  const controller = useBuildQueryString(tenantId ? { required: { value: { tenantId } } } : undefined);
  const debouncedSearch = useDebounce(search, 500);
  const controllerRef = useRef(controller);

  const { data, isLoading } = useQuery({
    queryKey: ORDER_KEYS.lists(controller.query),
    queryFn: () => orderApi.getOrders(controller.getQueryString()),
  });

  useEffect(() => {
    controllerRef.current = controller;
  }, [controller]);

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      controllerRef.current.handleSearch({
        value: { clientSearch: debouncedSearch },
      });
    }
  }, [debouncedSearch]);

  return {
    ...controller,
    orders: data?.orders || [],
    pagination: data?.pagination ?? DEFAULT_PAGINATION,
    isGettingOrders: isLoading,
    onSearch: setSearch,
  };
};
