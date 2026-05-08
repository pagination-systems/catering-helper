"use client";

import { CheckCircle2, Clock3, ShieldCheck, Truck, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import type { TenantData } from "@/app/(storefront)/data";
import { If } from "@/components/if";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { type ClientPortalContent, clientPortalContent } from "@/lib/i18n";
import { cn, formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { DayTab } from "./components/day-tab";
import { OrderSummary } from "./components/OrderSummary";
import { getUpcomingDays } from "./components/utils";
import { VariantCard } from "./components/variant-card";
import { packages } from "./data";
import { useOrderSummaryData } from "./order-summary-data";
import { createQuantityKey, useStorefrontStore } from "./store/useStore";

const trustSignals = [
  { icon: ShieldCheck, label: "Trusted Quality" },
  { icon: Truck, label: "On-Time Delivery" },
  { icon: Users, label: "Corporate Ready" },
];

export const StoreFront = ({ tenant }: { tenant: TenantData }) => {
  const router = useRouter();
  const customizerRef = useRef<HTMLElement | null>(null);
  const { language } = useLanguage();
  const content = clientPortalContent[language] as ClientPortalContent;

  const {
    activePackageId,
    customizerOpen,
    mobileSummaryOpen,
    recentlyUpdatedKey,
    packageSelections,
    pickPackage,
    setActiveDay,
    updateQuantity,
    setRecentlyUpdatedKey,
    setMobileSummaryOpen,
  } = useStorefrontStore();

  useEffect(() => {
    if (!recentlyUpdatedKey) return;
    const t = setTimeout(() => setRecentlyUpdatedKey(null), 450);
    return () => clearTimeout(t);
  }, [recentlyUpdatedKey, setRecentlyUpdatedKey]);

  const activePackage = packages.find((pkg) => pkg.id === activePackageId) ?? packages[0];
  const activeSelection = packageSelections[activePackage.id];
  const activeDayName = activeSelection?.activeDay || activePackage.days[0]?.day;
  const activeDay = activePackage.days.find((d) => d.day === activeDayName) ?? activePackage.days[0];
  const upcomingDays = useMemo(() => getUpcomingDays(language), [language]);

  const packageSelectionTotals = useMemo(() => {
    return Object.fromEntries(
      packages.map((pkg) => {
        const selection = packageSelections[pkg.id] || { quantities: {} };
        const selected = Object.values(selection.quantities).reduce((a, b) => a + Math.max(0, b), 0);
        return [pkg.id, selected];
      }),
    );
  }, [packageSelections]);

  const { subtotal, totalQuantity } = useOrderSummaryData(language);

  const handlePickPackage = (id: string) => {
    pickPackage(id);
    requestAnimationFrame(() => customizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <main className="bg-background pb-28">
      <div className="mx-auto w-full max-w-[1260px] px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-10">
        {/* Hero */}
        <section className="mb-12 lg:mb-16 mt-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                <Clock3 className="h-3.5 w-3.5" />
                {content.badge}
              </div>
              <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {tenant.title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {tenant.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {trustSignals.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[240px] sm:h-[320px] lg:h-[360px] w-full overflow-hidden rounded-3xl bg-muted/30 shadow-xl ring-1 ring-border/50 dark:bg-card">
              <Image
                src={tenant.menuUrl}
                alt="Display"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
                width={800}
                height={360}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* Package Selection */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{content.packageLabel}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{content.packageDescription}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg) => {
              const active = pkg.id === activePackageId;
              const selectedCount = packageSelectionTotals[pkg.id];
              return (
                <Card
                  key={pkg.id}
                  className={cn(
                    "relative overflow-hidden transition duration-200 flex flex-col",
                    active
                      ? "border-primary ring-1 ring-primary shadow-[0_16px_30px_-24px_hsl(var(--primary))]"
                      : "hover:-translate-y-0.5 hover:shadow-lg",
                  )}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full bg-primary px-4 py-1 text-[9px] font-bold text-primary-foreground uppercase tracking-[0.12em]">
                      {content.mostPopular}
                    </div>
                  )}

                  <CardHeader className={cn("space-y-3 p-5 sm:p-6 flex-1", pkg.popular && "pt-7")}>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl font-semibold leading-tight">{pkg.name}</CardTitle>
                      {active && <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{pkg.description}</p>
                    <div className="flex items-baseline gap-1.5 pt-1">
                      <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        {formatCurrency(pkg.pricePerMeal)}
                      </p>
                      <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                        {content.mealSuffix}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 pt-0 space-y-2.5">
                    <Button
                      className="h-10 w-full rounded-xl font-semibold text-sm"
                      onClick={() => handlePickPackage(pkg.id)}
                    >
                      {active ? content.selectedPackage : content.viewPackage}
                    </Button>
                    {selectedCount > 0 && (
                      <p className="text-center text-xs font-semibold text-primary">
                        {selectedCount} {content.mealSelected}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Customizer + Summary */}
        <If expression={customizerOpen}>
          <section ref={customizerRef} className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-3">
              <Card className="border-border/70 bg-card/96 shadow-sm dark:bg-card">
                <CardHeader className="space-y-5 border-b border-border/70 bg-muted/40 p-4 dark:bg-muted/40 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
                        {content.customizeTitle}
                      </CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {activePackage.name} &mdash; <strong>{formatCurrency(activePackage.pricePerMeal)}</strong>{" "}
                        {content.perMealSuffix}
                      </p>
                    </div>
                    {packageSelectionTotals[activePackage.id] > 0 && (
                      <div className="shrink-0 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary whitespace-nowrap">
                        {packageSelectionTotals[activePackage.id]} {content.mealSelected}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {upcomingDays.map(({ day, dateLabel }) => (
                      <DayTab
                        key={day}
                        dayLabel={content.dayShortLabel[day as keyof typeof content.dayShortLabel] || day}
                        dateLabel={dateLabel}
                        active={activeDay?.day === day}
                        onClick={() => setActiveDay(activePackage.id, day as any)}
                      />
                    ))}
                  </div>
                </CardHeader>

                <If expression={activeDay}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="animate-in fade-in-0 duration-300">
                      <div className="grid gap-4 md:grid-cols-2">
                        {activeDay.variants.map((v) => (
                          <VariantCard
                            key={v.id}
                            variant={v}
                            quantity={activeSelection?.quantities?.[createQuantityKey(activeDay.day, v.id)] || 0}
                            price={activePackage.pricePerMeal}
                            mealSuffix={content.mealSuffix}
                            unavailableLabel={content.unavailable}
                            pulse={
                              recentlyUpdatedKey === `${activePackage.id}::${createQuantityKey(activeDay.day, v.id)}`
                            }
                            onQuantityChange={(nxt) => updateQuantity(activePackage.id, activeDay.day, v.id, nxt)}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </If>
              </Card>
            </div>

            <aside className="hidden h-fit lg:sticky lg:top-6 lg:block">
              <OrderSummary tenantSlug={tenant.slug} />
            </aside>
          </section>
        </If>
      </div>

      {/* Mobile sticky bar */}
      <If expression={customizerOpen}>
        <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur-sm px-4 py-3 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
              variant="outline"
              className="h-10 shrink-0 rounded-xl px-4 text-sm font-semibold"
            >
              {mobileSummaryOpen ? content.hide : content.summary}
            </Button>
            <div className="min-w-0 flex-1 rounded-xl bg-muted/65 px-3 py-2 text-right dark:bg-muted/65">
              <p className="text-[10px] font-medium text-muted-foreground">
                {totalQuantity} {content.meals}
              </p>
              <p className="text-base font-bold leading-tight">{formatCurrency(subtotal)}</p>
            </div>
            <Button
              disabled={totalQuantity === 0}
              className="h-10 shrink-0 rounded-xl font-semibold"
              onClick={() => router.push(`/${tenant.slug}/checkout`)}
            >
              {content.checkout}
            </Button>
          </div>
          <Collapsible open={mobileSummaryOpen} onOpenChange={setMobileSummaryOpen}>
            <CollapsibleContent>
              <div className="mt-3 max-h-[60vh] overflow-auto rounded-xl border bg-background shadow-sm">
                <OrderSummary tenantSlug={tenant.slug} readonly />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </If>
    </main>
  );
};
