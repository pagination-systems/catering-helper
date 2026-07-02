"use client";

import { Check, Clock, Truck, X } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { useAccountI18n } from "../../lib/account-i18n";
import { buildTimeline, type TimelineStep } from "../lib/order-status";
import type { CustomerOrder } from "../schemas/order.schema";

const STEP_ICON = {
  placed: Check,
  confirmed: Check,
  delivery: Truck,
  cancelled: X,
} as const;

const nodeStyles = (step: TimelineStep): string => {
  switch (step.state) {
    case "done":
      return "border-primary bg-primary text-primary-foreground";
    case "current":
      return "border-primary bg-primary/10 text-primary";
    case "cancelled":
      return "border-rose-300 bg-rose-100 text-rose-600 dark:border-rose-800 dark:bg-rose-900/50 dark:text-rose-300";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

/**
 * Lightweight delivery tracker built from the order's real status + delivery
 * date (Placed → Confirmed → Delivery, or Placed → Cancelled).
 */
export const OrderStatusTimeline = ({ order }: { order: CustomerOrder }) => {
  const i18n = useAccountI18n().orders.timeline;
  const steps = buildTimeline(order);

  const labels: Record<TimelineStep["key"], string> = {
    placed: i18n.placed,
    confirmed: i18n.confirmed,
    delivery: i18n.delivery,
    cancelled: i18n.cancelled,
  };

  return (
    <ol className="flex items-start">
      {steps.map((step, index) => {
        const Icon = step.key === "delivery" && step.state === "current" ? Clock : STEP_ICON[step.key];
        const isLast = index === steps.length - 1;
        const connectorActive = step.state === "done";

        return (
          <li key={step.key} className={cn("flex flex-1 flex-col items-center", isLast && "flex-none")}>
            <div className="flex w-full items-center">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  nodeStyles(step),
                )}
              >
                <Icon className="size-4" />
              </div>
              {!isLast && (
                <div className={cn("h-0.5 flex-1", connectorActive ? "bg-primary" : "bg-border")} />
              )}
            </div>
            <div className={cn("mt-2 space-y-0.5 text-center", isLast ? "w-20" : "w-full pr-4")}>
              <p
                className={cn(
                  "text-xs font-medium",
                  step.state === "upcoming" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {labels[step.key]}
              </p>
              {step.date && <p className="text-[11px] text-muted-foreground">{formatDate(step.date)}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
