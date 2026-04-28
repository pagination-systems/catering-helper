import { CalendarClockIcon, CookingPotIcon, MapPinIcon, PhoneIcon, ReceiptTextIcon, UserIcon } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { IOrder } from "../schemas/order.schema";
import { getOrderStatusBadgeClassName } from "../utils/badge";

interface OrderDetailsProps {
  item: IOrder;
}

export const OrderDetails = ({ item }: OrderDetailsProps) => {
  const statusClassName = getOrderStatusBadgeClassName(item.status);

  return (
    <div className="space-y-5">
      <section className="rounded-md border border-border/70 bg-muted/15 p-4 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Order</p>
            <h3 className="text-base font-semibold text-foreground md:text-lg">{item.orderNo}</h3>
            <p className="text-sm text-muted-foreground">{item.source}</p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClassName}`}>
              {item.status}
            </span>
            <p className="text-sm font-semibold text-foreground">{formatCurrency(item.total)}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 border-t border-border/60 pt-4 text-xs sm:grid-cols-3">
          <div>
            <p className="uppercase tracking-wide text-muted-foreground">Created</p>
            <p className="mt-1 font-medium text-foreground">{formatDateTime(item.createdAt)}</p>
          </div>
          <div>
            <p className="uppercase tracking-wide text-muted-foreground">Last Updated</p>
            <p className="mt-1 font-medium text-foreground">{formatDateTime(item.updatedAt)}</p>
          </div>
          <div>
            <p className="uppercase tracking-wide text-muted-foreground">Delivery</p>
            <p className="mt-1 font-medium text-foreground">
              {item.deliveryDay}, {formatDateTime(item.deliveryDate)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-md border border-border/70 bg-card p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Customer</p>
            <UserIcon className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-sm font-semibold text-foreground">{item.customerName}</p>
        </div>

        <div className="rounded-md border border-border/70 bg-card p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
            <PhoneIcon className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-sm font-semibold text-foreground">{item.customerPhone}</p>
        </div>

        <div className="rounded-md border border-border/70 bg-card p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Meals</p>
            <CookingPotIcon className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-base font-semibold text-foreground">{item.totalMeals}</p>
        </div>

        <div className="rounded-md border border-border/70 bg-card p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Grand Total</p>
            <ReceiptTextIcon className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-base font-semibold text-foreground">{formatCurrency(item.total)}</p>
        </div>
      </section>

      <section className="rounded-md border border-border/70 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Delivery Address</p>
        <div className="mt-2 flex gap-2">
          <MapPinIcon className="mt-0.5 size-4 text-muted-foreground" />
          <p className="text-sm text-foreground">{item.address}</p>
        </div>
        {item.notes ? <p className="mt-2 text-sm text-muted-foreground">Note: {item.notes}</p> : null}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Order Items</p>
          <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarClockIcon className="size-3.5" />
            {item.deliveryDay}
          </div>
        </div>

        <div className="space-y-3">
          {item.items.map((orderItem) => (
            <article key={orderItem.id} className="rounded-md border border-border/70 bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{orderItem.packageName}</p>
                  <p className="text-xs text-muted-foreground">{orderItem.variantName}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{formatCurrency(orderItem.subtotal)}</p>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {orderItem.items.map((menuItem) => (
                  <span
                    key={`${orderItem.id}-${menuItem}`}
                    className="inline-flex rounded-full bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {menuItem}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
                <p>
                  {orderItem.quantity} x {formatCurrency(orderItem.pricePerMeal)}
                </p>
                <p>{formatDateTime(orderItem.deliveryDate)}</p>
                <p className="font-medium text-foreground">{formatCurrency(orderItem.subtotal)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
