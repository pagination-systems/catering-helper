import type { QueryClient } from "@tanstack/react-query";
import type { IOrder, OrderCache, OrderFormInput, OrdersCache } from "../schemas/order.schema";
import { ORDER_KEYS } from "./order.keys";

type UpdateOrderVars = {
  id: string;
  payload: Partial<OrderFormInput>;
};

export const orderCache = {
  optimisticUpdate(queryClient: QueryClient, { id, payload }: UpdateOrderVars) {
    const previous = queryClient.getQueriesData<OrdersCache>({
      queryKey: ORDER_KEYS.lists(),
    });

    const existingOrder = previous.flatMap(([, cache]) => cache?.orders ?? []).find((order) => order.id === id);

    if (existingOrder) {
      const { items: _items, deliveryDate, ...safePayload } = payload;

      this.update(queryClient, {
        ...existingOrder,
        ...safePayload,
        id,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : existingOrder.deliveryDate,
      });
    }

    return { previous };
  },

  update(queryClient: QueryClient, updatedOrder: IOrder) {
    queryClient.setQueriesData<OrdersCache>({ queryKey: ORDER_KEYS.lists() }, (old) => {
      if (!old) return old;

      return {
        ...old,
        orders: old.orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)),
      };
    });

    queryClient.setQueryData<OrderCache>(ORDER_KEYS.detail(updatedOrder.id), (old) => {
      if (!old) return { order: updatedOrder };
      return { ...old, order: updatedOrder };
    });
  },

  optimisticSoftDelete(queryClient: QueryClient, id: string) {
    const previous = queryClient.getQueriesData<OrdersCache>({
      queryKey: ORDER_KEYS.lists(),
    });

    queryClient.setQueriesData<OrdersCache>({ queryKey: ORDER_KEYS.lists() }, (old) => {
      if (!old) return old;

      return {
        ...old,
        orders: old.orders.filter((o) => o.id !== id),
      };
    });

    return { previous };
  },

  optimisticHardDelete(queryClient: QueryClient, id: string) {
    const previous = queryClient.getQueriesData<OrdersCache>({
      queryKey: ORDER_KEYS.lists(),
    });

    queryClient.setQueriesData<OrdersCache>({ queryKey: ORDER_KEYS.lists() }, (old) => {
      if (!old) return old;

      return {
        ...old,
        orders: old.orders.filter((o) => o.id !== id),
      };
    });

    queryClient.removeQueries({
      queryKey: ORDER_KEYS.detail(id),
    });

    return { previous };
  },

  rollback(queryClient: QueryClient, previous: any) {
    previous?.forEach(([key, data]: any) => {
      queryClient.setQueryData(key, data);
    });
  },
};
