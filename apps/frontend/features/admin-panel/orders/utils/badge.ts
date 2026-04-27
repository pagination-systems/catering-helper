import { OrderStatus } from "../schemas/order.schema";

export const getOrderStatusBadgeClassName = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Confirmed:
      return "bg-blue-100 text-blue-700";
    case OrderStatus.Cancelled:
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};
