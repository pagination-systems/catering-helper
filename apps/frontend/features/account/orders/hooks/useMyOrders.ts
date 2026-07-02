import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import * as orderApi from "../api/order.api";
import { isActiveOrder } from "../lib/order-status";
import { CUSTOMER_ORDER_KEYS } from "../queries/order.keys";

/**
 * The signed-in customer's orders, split into the nearest active order (for the
 * tracking card) and the full history list.
 */
export const useMyOrders = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: CUSTOMER_ORDER_KEYS.lists(),
    queryFn: orderApi.getMyOrders,
  });

  const orders = useMemo(() => data?.orders ?? [], [data?.orders]);

  // Nearest upcoming confirmed order becomes the highlighted "current" order.
  const activeOrder = useMemo(() => {
    const active = orders.filter(isActiveOrder);
    active.sort((a, b) => a.deliveryDate.getTime() - b.deliveryDate.getTime());
    return active[0] ?? null;
  }, [orders]);

  return {
    orders,
    activeOrder,
    isLoading,
    isError,
    refetch,
  };
};
