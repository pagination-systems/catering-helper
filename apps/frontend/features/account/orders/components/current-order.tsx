"use client";

import { CalendarDays, ChevronRight, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAccountI18n } from "../../lib/account-i18n";
import type { CustomerOrder } from "../schemas/order.schema";
import { OrderStatusTimeline } from "./order-status-timeline";
import { ReorderButton } from "./reorder-button";

export const CurrentOrder = ({ order }: { order: CustomerOrder }) => {
  const i18n = useAccountI18n().orders;

  return (
    <Card className="border-primary/30 bg-primary/[0.03]">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`/account/orders/${order.id}`}
                className="truncate text-base font-semibold text-foreground hover:text-primary hover:underline"
              >
                {order.orderNo || i18n.detail.order}
              </Link>
              <Badge className="shrink-0 bg-primary/15 text-primary hover:bg-primary/15">{i18n.active.badge}</Badge>
            </div>
            {order.tenantName && <p className="mt-0.5 truncate text-sm text-muted-foreground">{order.tenantName}</p>}
          </div>
          <p className="shrink-0 text-base font-semibold text-foreground">{formatCurrency(order.total)}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-6">
        <OrderStatusTimeline order={order} />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {i18n.card.deliveryOn}: {formatDate(order.deliveryDate)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UtensilsCrossed className="size-3.5" />
            {order.totalMeals} {i18n.card.meals}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/account/orders/${order.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {i18n.card.viewDetails}
            <ChevronRight className="size-4" />
          </Link>
          <ReorderButton order={order} variant="outline" size="default" />
        </div>
      </CardContent>
    </Card>
  );
};
