import { useMemo } from "react";
import type { DayName, IOrder } from "../schemas/order.schema";

export const useDayCounts = (orders: IOrder[]) => {
  return useMemo(() => {
    return orders.reduce(
      (acc: Partial<Record<DayName, number>>, order: IOrder) => {
        acc[order.deliveryDay] = (acc[order.deliveryDay] ?? 0) + 1;
        return acc;
      },
      {} as Partial<Record<DayName, number>>,
    );
  }, [orders]);
};
