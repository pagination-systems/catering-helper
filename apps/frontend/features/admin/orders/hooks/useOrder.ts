import { useQuery } from "@tanstack/react-query";
import * as orderApi from "../api/order.api";
import { ORDER_KEYS } from "../queries/order.keys";

export const useOrder = (id?: string) => {
  const { data, isLoading, ...query } = useQuery({
    queryKey: ORDER_KEYS.detail(id as string),
    queryFn: () => orderApi.getOrder(id as string),
    enabled: !!id,
  });

  return {
    order: data?.order,
    isGettingOrder: isLoading,
    ...query,
  };
};
