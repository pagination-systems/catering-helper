"use client";

import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { If } from "@/components/if";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { bdt } from "@/features/client-portal/data";
import { useOrderSummaryData } from "@/features/client-portal/order-summary-data";
import { useClientPortalStore } from "@/features/client-portal/store";
import { type ClientPortalContent, clientPortalContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const DELIVERY_FEE = 60;

type OrderSummaryProps = {
  readonly?: boolean;
  showDeliveryFee?: boolean;
};

export function OrderSummary({ readonly = false, showDeliveryFee = false }: OrderSummaryProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const content = clientPortalContent[language] as ClientPortalContent;

  const recentlyUpdatedKey = useClientPortalStore((state) => state.recentlyUpdatedKey);
  const updateQuantity = useClientPortalStore((state) => state.updateQuantity);

  const { groupedOrders, subtotal, totalQuantity } = useOrderSummaryData(language);
  const total = subtotal + (showDeliveryFee ? DELIVERY_FEE : 0);

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{content.orderSummaryTitle}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="max-h-[420px] space-y-3 overflow-y-auto pr-2">
          <If
            expression={groupedOrders.length > 0}
            fallback={<p className="p-4 text-sm text-muted-foreground">{content.noItemsSelected}</p>}
          >
            {groupedOrders.map((group) => (
              <Collapsible key={group.day} defaultOpen className="overflow-hidden rounded-sm border bg-background">
                {/* FIXED: Added flex, w-full, justify-between, and padding for proper layout */}
                <CollapsibleTrigger className="flex w-full items-center justify-between border-b bg-muted/40 p-3 text-sm transition-colors hover:bg-muted/60">
                  <span className="font-semibold">
                    {content.dayShortLabel[group.day as keyof typeof content.dayShortLabel] || group.day},{" "}
                    {group.dateLabel}
                  </span>
                  <span className="font-bold">{bdt.format(group.subTotal)}</span>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-4 p-4">
                  {group.items.map((row) => (
                    <div
                      key={row.key}
                      className={cn(
                        "flex flex-col gap-1 transition-all",
                        recentlyUpdatedKey === row.key && "rounded-md p-2 ring-1 ring-primary/40 bg-primary/5",
                      )}
                    >
                      <p className="text-sm font-medium">
                        {row.packageName} - {row.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{row.items.join(", ")}</p>

                      <div className="mt-1 flex items-center justify-between">
                        {readonly ? (
                          <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium">
                            {row.quantity}x
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
                        <span className="text-sm font-medium">{bdt.format(row.subtotal)}</span>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </If>
        </div>

        {/* Simplified Summary Box */}
        <div className="space-y-3 rounded-xl bg-muted/50 p-4">
          <div className="flex justify-between text-sm font-medium">
            <p>{content.total}</p>
            <p>{bdt.format(subtotal)}</p>
          </div>

          {showDeliveryFee && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>{content.deliveryFee}</p>
              <p>{bdt.format(DELIVERY_FEE)}</p>
            </div>
          )}

          <div className="flex items-end justify-between border-t pt-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold">{showDeliveryFee ? content.finalTotal : content.total}</p>
              <p className="text-xs text-muted-foreground">
                {totalQuantity} {content.meals}
              </p>
            </div>
            <p className="text-xl font-bold text-primary">{bdt.format(total)}</p>
          </div>
        </div>

        {!readonly && (
          <Button
            size="lg"
            className="w-full font-semibold"
            disabled={groupedOrders.length === 0}
            onClick={() => router.push("/checkout")}
          >
            {content.checkout}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
