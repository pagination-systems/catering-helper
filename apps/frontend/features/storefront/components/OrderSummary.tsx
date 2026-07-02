"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { type ClientPortalContent, clientPortalContent } from "@/lib/i18n";
import { cn, formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { useOrderSummaryData } from "../order-summary-data";
import { useStorefrontStore } from "../store/useStore";

type OrderSummaryProps = {
  tenantSlug: string;
  readonly?: boolean;
  showDeliveryFee?: boolean;
  naked?: boolean;
  /** Tenant-owned delivery fee (authoritative; falls back to 0). */
  deliveryFee?: number;
};

export function OrderSummary({
  tenantSlug,
  readonly = false,
  showDeliveryFee = false,
  naked = false,
  deliveryFee = 0,
}: OrderSummaryProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const content = clientPortalContent[language] as ClientPortalContent;

  const recentlyUpdatedKey = useStorefrontStore((state) => state.recentlyUpdatedKey);
  const updateQuantity = useStorefrontStore((state) => state.updateQuantity);

  const { groupedOrders, subtotal, totalQuantity } = useOrderSummaryData(language);
  const total = subtotal + (showDeliveryFee ? deliveryFee : 0);

  const inner = (
    <div className="space-y-4">
      {/* Item list */}
      <div className={cn("space-y-2 overflow-y-auto pr-1", naked ? "max-h-none" : "max-h-[420px]")}>
        {groupedOrders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{content.noItemsSelected}</p>
            <p className="text-xs text-muted-foreground/70">Select meals from the menu to get started</p>
          </div>
        ) : (
          groupedOrders.map((group) => (
            <Collapsible key={group.day} defaultOpen className="overflow-hidden rounded-lg border bg-background">
              <CollapsibleTrigger className="flex w-full items-center justify-between bg-muted/40 px-3 py-2.5 text-sm transition-colors hover:bg-muted/60">
                <span className="font-semibold">
                  {content.dayShortLabel[group.day as keyof typeof content.dayShortLabel] || group.day},{" "}
                  {group.dateLabel}
                </span>
                <span className="font-bold">{formatCurrency(group.subTotal)}</span>
              </CollapsibleTrigger>

              <CollapsibleContent className="divide-y divide-border/50">
                {group.items.map((row) => (
                  <div
                    key={row.key}
                    className={cn(
                      "flex flex-col gap-1 px-3 py-3 transition-colors",
                      recentlyUpdatedKey === row.key && "bg-primary/5 ring-1 ring-inset ring-primary/20",
                    )}
                  >
                    <p className="text-sm font-medium leading-snug">
                      {row.packageName} — {row.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{row.items.join(", ")}</p>

                    <div className="mt-1.5 flex items-center justify-between">
                      {readonly ? (
                        <span className="rounded-full border bg-muted px-3 py-0.5 text-xs font-semibold">
                          {row.quantity}×
                        </span>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full border px-1 py-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => updateQuantity(row.pkgId, row.day, row.variantId, row.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-4 text-center text-xs font-semibold">{row.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => updateQuantity(row.pkgId, row.day, row.variantId, row.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      <span className="text-sm font-semibold text-primary">{formatCurrency(row.subtotal)}</span>
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))
        )}
      </div>

      {/* Totals */}
      <div className="space-y-2.5 rounded-xl bg-muted/50 p-4">
        <div className="flex justify-between text-sm">
          <p className="text-muted-foreground">{content.total}</p>
          <p className="font-medium">{formatCurrency(subtotal)}</p>
        </div>

        {showDeliveryFee && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>{content.deliveryFee}</p>
            <p>{formatCurrency(deliveryFee)}</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-2.5">
          <div>
            <p className="text-sm font-semibold">{showDeliveryFee ? content.finalTotal : content.total}</p>
            <p className="text-xs text-muted-foreground">
              {totalQuantity} {content.meals}
            </p>
          </div>
          <p className="text-xl font-bold text-primary">{formatCurrency(total)}</p>
        </div>
      </div>

      {!readonly && (
        <Button
          size="lg"
          className="w-full font-semibold"
          disabled={groupedOrders.length === 0}
          onClick={() => router.push(`/${tenantSlug}/checkout`)}
        >
          {content.checkout}
        </Button>
      )}
    </div>
  );

  if (naked) return inner;

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{content.orderSummaryTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">{inner}</CardContent>
    </Card>
  );
}
