import { ORDER_STATUS_ENUM } from "@catering/types";

export const isOrderLocked = (status: ORDER_STATUS_ENUM) => {
  return status === ORDER_STATUS_ENUM.CANCELLED;
};
