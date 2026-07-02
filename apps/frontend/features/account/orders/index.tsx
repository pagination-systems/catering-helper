"use client";

import { Loader2, PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAccountI18n } from "../lib/account-i18n";
import { CurrentOrder } from "./components/current-order";
import { OrderCard } from "./components/order-card";
import { useMyOrders } from "./hooks/useMyOrders";

const CenteredState = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center text-muted-foreground">
    {children}
  </div>
);

export const CustomerOrders = () => {
  const i18n = useAccountI18n().orders;
  const { orders, activeOrder, isLoading, isError } = useMyOrders();

  if (isLoading) {
    return (
      <CenteredState>
        <Loader2 className="size-6 animate-spin" />
        <p className="text-sm">{i18n.loading}</p>
      </CenteredState>
    );
  }

  if (isError) {
    return (
      <CenteredState>
        <p className="text-sm">{i18n.error}</p>
      </CenteredState>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{i18n.title}</h1>
          <p className="text-sm text-muted-foreground">{i18n.description}</p>
        </div>
        <CenteredState>
          <PackageOpen className="size-10 text-muted-foreground/60" />
          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">{i18n.empty.title}</p>
            <p className="text-sm">{i18n.empty.description}</p>
          </div>
          <Button asChild className="mt-2">
            <Link href="/">{i18n.empty.browse}</Link>
          </Button>
        </CenteredState>
      </div>
    );
  }

  // The active order is highlighted at the top; keep it out of the history list.
  const history = activeOrder ? orders.filter((order) => order.id !== activeOrder.id) : orders;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{i18n.title}</h1>
        <p className="text-sm text-muted-foreground">{i18n.description}</p>
      </div>

      {activeOrder && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{i18n.active.heading}</h2>
          <CurrentOrder order={activeOrder} />
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{i18n.history.heading}</h2>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">{i18n.history.empty}</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {history.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
