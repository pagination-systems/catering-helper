"use client";

import { Check, ClipboardList, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSummary } from "../components/OrderSummary";
import { CheckoutForm } from "./components/checkout-form";

const steps = [
  { icon: ShoppingCart, label: "Select Meals" },
  { icon: ClipboardList, label: "Your Details" },
  { icon: Check, label: "Confirmed" },
];

export const Checkout = ({ tenant }: { tenant: string }) => {
  return (
    <main className="bg-background" data-tenant={tenant}>
      <div className="mx-auto w-full max-w-[1260px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const done = i === 0;
            const current = i === 1;
            return (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${
                      done
                        ? "border-primary bg-primary text-primary-foreground"
                        : current
                          ? "border-primary bg-background text-primary"
                          : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`hidden text-[10px] font-semibold uppercase tracking-wide sm:block ${
                      done || current ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`mx-2 h-px w-12 sm:w-20 ${i === 0 ? "bg-primary" : "bg-border"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section>
            <Card className="border-border/70 shadow-sm dark:bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold tracking-tight">Your Details</CardTitle>
                  <Link
                    href={`/${tenant}`}
                    className="text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
                  >
                    ← Back to menu
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">Fill in your delivery information below.</p>
              </CardHeader>
              <CardContent className="pt-4">
                <CheckoutForm tenant={tenant} />
              </CardContent>
            </Card>
          </section>

          <aside className="h-fit lg:sticky lg:top-6">
            <OrderSummary tenantSlug={tenant} readonly showDeliveryFee />
          </aside>
        </div>
      </div>
    </main>
  );
};
