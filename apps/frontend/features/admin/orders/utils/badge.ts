import { ORDER_STATUS_ENUM } from "@catering/types";

export const getOrderStatusBadgeClassName = (status: ORDER_STATUS_ENUM) => {
  switch (status) {
    case ORDER_STATUS_ENUM.CONFIRMED:
      return "bg-blue-100 text-blue-700";
    case ORDER_STATUS_ENUM.CANCELLED:
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};
