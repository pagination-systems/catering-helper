import { useBuildQueryString } from "@catering/react-query-builder";
import type { PaginationMeta } from "@catering/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks";
import * as packageApi from "../api/package.api";
import { PACKAGE_KEYS } from "../queries/package.keys";

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

export const usePackages = (tenantId?: string) => {
  const [search, setSearch] = useState("");
  const controller = useBuildQueryString(tenantId ? { required: { value: { tenantId } } } : undefined);
  const debouncedSearch = useDebounce(search, 500);
  const controllerRef = useRef(controller);

  const { data, isLoading } = useQuery({
    queryKey: PACKAGE_KEYS.lists(controller.query),
    queryFn: () => packageApi.getPackages(controller.getQueryString()),
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
    packages: data?.packages || [],
    pagination: data?.pagination ?? DEFAULT_PAGINATION,
    isGettingPackages: isLoading,
    onSearch: setSearch,
  };
};
