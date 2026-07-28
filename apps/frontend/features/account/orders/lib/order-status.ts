import { ORDER_STATUS_ENUM } from "@catering/types";
import { formatDateValue } from "@/lib/utils";
import { type DayName, dayOrder } from "../schemas/order.schema";

/** Badge colours for an order status, matching the admin order table palette. */
export const getOrderStatusBadgeStyles = (status: ORDER_STATUS_ENUM): string => {
  switch (status) {
    case ORDER_STATUS_ENUM.CONFIRMED:
      return "bg-blue-100 text-blue-700 hover:bg-blue-100/80 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800";
    case ORDER_STATUS_ENUM.CANCELLED:
      return "bg-rose-100 text-rose-700 hover:bg-rose-100/80 dark:bg-rose-900 dark:text-rose-300 border-rose-200 dark:border-rose-800";
    default:
      return "bg-muted text-muted-foreground hover:bg-muted/80 border-border";
  }
};

/** Start of today in local time — used to decide whether a delivery is upcoming. */
const startOfToday = (): Date => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

/**
 * An order is "active" (still trackable) when it hasn't been cancelled and its
 * delivery date is today or later.
 */
export const isActiveOrder = (order: { status: ORDER_STATUS_ENUM; deliveryDate: Date }): boolean =>
  order.status === ORDER_STATUS_ENUM.CONFIRMED && order.deliveryDate.getTime() >= startOfToday().getTime();

export type TimelineState = "done" | "current" | "upcoming" | "cancelled";

export interface TimelineStep {
  key: "placed" | "confirmed" | "delivery" | "cancelled";
  state: TimelineState;
  date: Date | null;
}

/**
 * Derives a lightweight delivery timeline from the data we actually track
 * (Confirmed/Cancelled + delivery date). No fabricated statuses.
 */
export const buildTimeline = (order: {
  status: ORDER_STATUS_ENUM;
  createdAt: Date;
  updatedAt: Date;
  deliveryDate: Date;
}): TimelineStep[] => {
  if (order.status === ORDER_STATUS_ENUM.CANCELLED) {
    return [
      { key: "placed", state: "done", date: order.createdAt },
      { key: "cancelled", state: "cancelled", date: order.updatedAt },
    ];
  }

  const delivered = order.deliveryDate.getTime() < startOfToday().getTime();

  return [
    { key: "placed", state: "done", date: order.createdAt },
    { key: "confirmed", state: "done", date: order.createdAt },
    {
      key: "delivery",
      state: delivered ? "done" : "current",
      date: order.deliveryDate,
    },
  ];
};

/**
 * Next upcoming date (within a week) whose weekday matches the order's delivery
 * day, used to prefill a reorder. Falls back to one week out.
 */
export const nextDateForDay = (day: DayName): string => {
  const targetIndex = dayOrder.indexOf(day);
  const today = new Date();
  for (let offset = 0; offset < 7; offset += 1) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + offset);
    if (candidate.getDay() === targetIndex) return formatDateValue(candidate);
  }
  const fallback = new Date(today);
  fallback.setDate(today.getDate() + 7);
  return formatDateValue(fallback);
};
