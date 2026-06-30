import { useQuery } from "@tanstack/react-query";
import * as tenantApi from "../api/tenant.api";
import { TENANT_KEYS } from "../queries/tenant.keys";
import type { GetTenantsResponse } from "../schemas/tenant.schema";

const EMPTY_RESPONSE: GetTenantsResponse = {
  data: [],
  meta: {
    pagination: {
      totalDocs: 0,
      limit: 10,
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      totalPages: 1,
      prevPage: null,
      nextPage: null,
      pagingCounter: 1,
    },
  },
};

export const useTenants = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: TENANT_KEYS.lists(),
    queryFn: () => tenantApi.getTenants(),
  });

  return {
    data: data ?? EMPTY_RESPONSE,
    isLoading,
    isError,
  };
};
