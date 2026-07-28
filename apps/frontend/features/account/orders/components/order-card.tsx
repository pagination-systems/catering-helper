"use client";

import { ORDER_STATUS_ENUM } from "@catering/types";
import { CalendarDays, ChevronRight, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { useAccountI18n } from "../../lib/account-i18n";
import { getOrderStatusBadgeStyles } from "../lib/order-status";
import type { CustomerOrder } from "../schemas/order.schema";
import { ReorderButton } from "./reorder-button";

export const OrderCard = ({ order }: { order: CustomerOrder }) => {
  const i18n = useAccountI18n().orders;
  const statusLabel = order.status === ORDER_STATUS_ENUM.CANCELLED ? i18n.status.cancelled : i18n.status.confirmed;

  return (
    <div className="rounded-lg border border-border/70 bg-card p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Link
              href={`/account/orders/${order.id}`}
              className="truncate text-sm font-semibold text-foreground hover:text-primary hover:underline"
            >
              {order.orderNo || i18n.detail.order}
            </Link>
            <Badge variant="outline" className={cn("shrink-0 text-[11px]", getOrderStatusBadgeStyles(order.status))}>
              {statusLabel}
            </Badge>
          </div>
          {order.tenantName && <p className="mt-0.5 truncate text-xs text-muted-foreground">{order.tenantName}</p>}
        </div>
        <p className="shrink-0 text-sm font-semibold text-foreground">{formatCurrency(order.total)}</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          {i18n.card.deliveryOn}: {formatDate(order.deliveryDate)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UtensilsCrossed className="size-3.5" />
          {order.totalMeals} {i18n.card.meals}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
        <Link
          href={`/account/orders/${order.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          {i18n.card.viewDetails}
          <ChevronRight className="size-3.5" />
        </Link>
        <ReorderButton order={order} />
      </div>
    </div>
  );
};
