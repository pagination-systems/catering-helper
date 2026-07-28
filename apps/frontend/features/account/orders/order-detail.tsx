"use client";

import { ORDER_STATUS_ENUM } from "@catering/types";
import { ArrowLeft, Loader2, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { useAccountI18n } from "../lib/account-i18n";
import { ReorderButton } from "./components/reorder-button";
import { OrderStatusTimeline } from "./components/order-status-timeline";
import { useMyOrder } from "./hooks/useMyOrder";
import { getOrderStatusBadgeStyles } from "./lib/order-status";

const InfoRow = ({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) => (
  <div className="flex gap-3">
    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export const CustomerOrderDetail = ({ id }: { id: string }) => {
  const i18n = useAccountI18n().orders;
  const { order, isLoading, isError } = useMyOrder(id);

  const backLink = (
    <Link
      href="/account/orders"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="size-4" />
      {i18n.detail.back}
    </Link>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="space-y-6">
        {backLink}
        <p className="text-sm text-muted-foreground">{i18n.detail.notFound}</p>
      </div>
    );
  }

  const statusLabel = order.status === ORDER_STATUS_ENUM.CANCELLED ? i18n.status.cancelled : i18n.status.confirmed;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        {backLink}
        <ReorderButton order={order} />
      </div>

      {/* Header */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{i18n.detail.order}</p>
              <CardTitle className="text-lg">{order.orderNo}</CardTitle>
              {order.tenantName && <p className="text-sm text-muted-foreground">{order.tenantName}</p>}
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <Badge variant="outline" className={cn(getOrderStatusBadgeStyles(order.status))}>
                {statusLabel}
              </Badge>
              <p className="text-xs text-muted-foreground">
                {i18n.detail.placedOn} {formatDateTime(order.createdAt)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <OrderStatusTimeline order={order} />
        </CardContent>
      </Card>

      {/* Delivery details */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base">{i18n.detail.deliveryDetails}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 pt-6 sm:grid-cols-2">
          <InfoRow icon={User} label={i18n.detail.recipient} value={order.customerName} />
          <InfoRow icon={Phone} label={i18n.detail.phone} value={order.customerPhone} />
          <InfoRow icon={MapPin} label={i18n.detail.deliveryAddress} value={order.deliveryAddress} />
          <InfoRow
            icon={User}
            label={i18n.detail.deliveryDay}
            value={`${order.deliveryDay} · ${formatDate(order.deliveryDate)}`}
          />
          {order.notes && (
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{i18n.detail.notes}</p>
              <p className="mt-1 text-sm text-foreground">{order.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base">
            {i18n.detail.items}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({order.totalMeals} {i18n.detail.meals})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-6">
          {order.items.map((item) => (
            <article key={item.id} className="rounded-md border border-border/70 bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.packageName}</p>
                  <p className="text-xs text-muted-foreground">{item.variantName}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-foreground">{formatCurrency(item.subtotal)}</p>
              </div>
              {item.items.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.items.map((menuItem) => (
                    <span
                      key={`${item.id}-${menuItem}`}
                      className="inline-flex rounded-full bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {menuItem}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-3 border-t pt-3 text-xs text-muted-foreground">
                {item.quantity} × {formatCurrency(item.pricePerMeal)} {i18n.detail.perMeal}
              </p>
            </article>
          ))}

          {/* Totals */}
          <div className="space-y-2 border-t border-border/60 pt-4 text-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{i18n.detail.subtotal}</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{i18n.detail.deliveryFee}</span>
              <span>{formatCurrency(order.deliveryFee)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-foreground">
              <span>{i18n.detail.grandTotal}</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
