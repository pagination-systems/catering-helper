"use client";

import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { clientPortalContent, type ClientPortalContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { bdt } from "@/features/client-portal/data";
import { useOrderSummaryData } from "@/features/client-portal/order-summary-data";
import { useClientPortalStore } from "@/features/client-portal/store";
import { Button } from "@/components/ui/button";
import { If } from "@/components/if";

export const DELIVERY_FEE = 60;

type OrderSummaryProps = {
  readonly?: boolean;
  showDeliveryFee?: boolean;
};

export function OrderSummary({ readonly = false, showDeliveryFee = false }: OrderSummaryProps) {
  const { language } = useLanguage();
  const content = clientPortalContent[language] as ClientPortalContent;

  const recentlyUpdatedKey = useClientPortalStore((state) => state.recentlyUpdatedKey);
  const updateQuantity = useClientPortalStore((state) => state.updateQuantity);

  const { groupedOrders, subtotal, totalQuantity } = useOrderSummaryData(language);
  const total = subtotal + (showDeliveryFee ? DELIVERY_FEE : 0);

  const deliveryFeeLabel = language === "bn" ? "ডেলিভারি ফি" : "Delivery Fee";
  const finalTotalLabel = language === "bn" ? "সর্বমোট" : "Final Total";

  const router = useRouter();

  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="p-5 pb-3">
        <CardTitle className="text-2xl font-semibold tracking-tight">{content.orderSummaryTitle}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-5 pt-0">
        <div className="max-h-[420px] space-y-3 overflow-auto pr-2">
          <If
            expression={groupedOrders.length > 0}
            fallback={<div className="p-4 text-sm text-muted-foreground">{content.noItemsSelected}</div>}
          >
            {groupedOrders.map((group) => (
              <Collapsible
                key={group.day}
                defaultOpen
                className="overflow-hidden rounded-xl border border-border/70 bg-background"
              >
                <CollapsibleTrigger className="rounded-none border-b border-border/70 bg-muted/40">
                  <span className="text-sm font-semibold text-foreground">
                    {content.dayShortLabel[group.day as keyof typeof content.dayShortLabel] || group.day},{" "}
                    {group.dateLabel}
                  </span>
                  <b>{bdt.format(group.subTotal)}</b>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="space-y-4 p-3">
                    {group.items.map((row) => (
                      <div
                        key={row.key}
                        className={cn(
                          "flex flex-col gap-1 transition-all",
                          recentlyUpdatedKey === row.key &&
                            "-m-1.5 rounded-md p-1.5 ring-1 ring-[hsl(var(--cater-primary))/0.4]",
                        )}
                      >
                        <p className="text-sm font-medium">
                          {row.packageName} - {row.label}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{row.items.join(", ")}</p>

                        <div className="mt-2 flex items-center justify-between">
                          {readonly ? (
                            <span className="rounded-full border bg-background px-2.5 py-1 text-xs font-semibold">
                              {row.quantity}x
                            </span>
                          ) : (
                            <div className="flex items-center gap-2 rounded-full border bg-background px-1.5 py-1">
                              <button
                                type="button"
                                onClick={() => updateQuantity(row.pkgId, row.day, row.variantId, row.quantity - 1)}
                              >
                                <Minus className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>

                              <span className="w-3 text-center text-xs font-semibold">{row.quantity}</span>

                              <button
                                type="button"
                                onClick={() => updateQuantity(row.pkgId, row.day, row.variantId, row.quantity + 1)}
                              >
                                <Plus className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </div>
                          )}

                          <span className="text-sm font-medium">{bdt.format(row.subtotal)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </If>
        </div>

        <div className="space-y-2 rounded-2xl border bg-muted/65 p-4 dark:bg-[hsl(var(--landing-chip-bg-soft))]">
          <div className="flex justify-between text-sm font-semibold">
            <p>{content.total}</p>
            <p>{bdt.format(subtotal)}</p>
          </div>

          {showDeliveryFee && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>{deliveryFeeLabel}</p>
              <p>{bdt.format(DELIVERY_FEE)}</p>
            </div>
          )}

          <div className="flex justify-between border-t border-border/70 pt-2">
            <p className="text-sm font-semibold">{showDeliveryFee ? finalTotalLabel : content.total}</p>
            <p className="text-2xl font-bold tracking-tight text-[hsl(var(--cater-primary-strong))]">
              {bdt.format(total)}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            {totalQuantity} {content.meals}
          </p>
        </div>

        {!readonly && (
          <Button className="w-full" disabled={groupedOrders.length === 0} onClick={() => router.push("/checkout")}>
            {content.checkout}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
