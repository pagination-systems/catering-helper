import { ORDER_STATUS_ENUM } from "@catering/types";

export const getOrderStatusBadgeStyles = (status: ORDER_STATUS_ENUM) => {
  switch (status) {
    case ORDER_STATUS_ENUM.CONFIRMED:
      return "bg-blue-100 text-blue-700 hover:bg-blue-100/80 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800";
    case ORDER_STATUS_ENUM.CANCELLED:
      return "bg-rose-100 text-rose-700 hover:bg-rose-100/80 dark:bg-rose-900 dark:text-rose-300 border-rose-200 dark:border-rose-800";
    default:
      return "bg-muted text-muted-foreground hover:bg-muted/80 border-border";
  }
};
