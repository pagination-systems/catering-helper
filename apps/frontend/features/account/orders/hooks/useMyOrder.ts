import { useQuery } from "@tanstack/react-query";
import * as orderApi from "../api/order.api";
import { CUSTOMER_ORDER_KEYS } from "../queries/order.keys";

export const useMyOrder = (id?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: CUSTOMER_ORDER_KEYS.detail(id as string),
    queryFn: () => orderApi.getMyOrder(id as string),
    enabled: !!id,
  });

  return {
    order: data?.order,
    isLoading,
    isError,
  };
};
