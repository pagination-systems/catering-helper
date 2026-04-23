"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { clientPortalContent, type ClientPortalContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { OrderSummary } from "@/features/client-portal/components/OrderSummary";

import { useClientPortalStore, createQuantityKey } from "./store";
import { packages, bdt } from "./data";
import { getUpcomingDays } from "./components/utils";
import { DayTab } from "./components/day-tab";
import { VariantCard } from "./components/variant-card";
import type { TenantData } from "@/app/(client-portal)/data";
import { If } from "@/components/if";
import { useOrderSummaryData } from "./order-summary-data";

export function ClientPortalPage({ tenant }: { tenant: TenantData }) {
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
  } = useClientPortalStore();

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
  const { groupedOrders, subtotal, totalQuantity } = useOrderSummaryData(language);

  const handlePickPackage = (id: string) => {
    pickPackage(id);
    requestAnimationFrame(() => customizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <main className="bg-background pb-28">
      <div className="mx-auto w-full max-w-[1260px] px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-10">
        <section className="mb-10 lg:mb-16 mt-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                <Clock3 className="h-3.5 w-3.5" />
                {content.badge}
              </div>
              <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {tenant.title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {tenant.description}
              </p>
            </div>
            <div className="relative h-[240px] sm:h-[320px] lg:h-[350px] w-full overflow-hidden rounded-3xl bg-muted/30 shadow-xl ring-1 ring-border/50 dark:bg-card">
              <img
                src={tenant.menuUrl}
                alt="Display"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
            </div>
          </div>
        </section>

        <section className="space-y-7">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{content.packageLabel}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{content.packageDescription}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg) => {
              const active = pkg.id === activePackageId;
              return (
                <Card
                  key={pkg.id}
                  className={cn(
                    "relative overflow-hidden transition duration-200",
                    active
                      ? "border-primary ring-1 ring-primary shadow-[0_16px_30px_-24px_hsl(var(--primary))]"
                      : "hover:-translate-y-0.5 hover:shadow-lg",
                  )}
                >
                  <If expression={pkg.popular}>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full bg-primary px-3 py-1 b-4 text-[8px] font-semibold text-primary-foreground uppercase tracking-[0.12em]">
                      {content.mostPopular}
                    </div>
                  </If>

                  <CardHeader className="space-y-3 p-5 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl font-semibold">{pkg.name}</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground h-12">{pkg.description}</p>
                    <div className="flex items-end gap-1.5 sm:gap-2 mt-2">
                      <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        {bdt.format(pkg.pricePerMeal)}
                      </p>
                      <span className="pb-1 text-[10px] sm:text-xs font-semibold uppercase text-muted-foreground">
                        {content.mealSuffix}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 p-5 pt-0">
                    <Button
                      className="h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handlePickPackage(pkg.id)}
                    >
                      {active ? content.selectedPackage : content.viewPackage}
                    </Button>
                    <If expression={packageSelectionTotals[pkg.id] > 0}>
                      <p className="text-xs font-bold">
                        {packageSelectionTotals[pkg.id]} {content.mealSelected}
                      </p>
                    </If>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <If expression={customizerOpen}>
          <section ref={customizerRef} className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-3">
              <Card className="border-border/70 bg-card/96 shadow-sm dark:bg-card">
                <CardHeader className="space-y-5 border-b border-border/70 bg-muted/40 p-4 dark:bg-muted/40 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        {content.customizeTitle}
                      </CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {activePackage.name} - <b>{bdt.format(activePackage.pricePerMeal)}</b> {content.perMealSuffix}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pb-2">
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
                  <CardContent className="p-4 sm:p-5">
                    <div className="animate-in fade-in-0 duration-300">
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
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
              <OrderSummary />
            </aside>
          </section>
        </If>

        {/* Mobile Summary Section */}
        <If expression={customizerOpen}>
          <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background px-4 py-3 lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                variant="outline"
                className="h-auto rounded-xl px-3 py-2 text-sm font-semibold"
              >
                {mobileSummaryOpen ? content.hide : content.summary}
              </Button>
              <div className="min-w-0 flex-1 rounded-xl bg-muted/65 px-3 py-1.5 text-right dark:bg-muted/65">
                <p className="text-[10px] text-muted-foreground">
                  {totalQuantity} {content.meals}
                </p>
                <p className="text-lg font-semibold leading-tight">{bdt.format(subtotal)}</p>
              </div>
              <Button disabled={groupedOrders.length === 0} onClick={() => router.push("/checkout")}>
                {content.checkout}
              </Button>
            </div>
            <Collapsible open={mobileSummaryOpen} onOpenChange={setMobileSummaryOpen}>
              <CollapsibleContent>
                <div className="mt-3 max-h-[60vh] overflow-auto rounded-2xl border bg-background/98 p-3 dark:bg-card">
                  {groupedOrders.map((group) => (
                    <Collapsible
                      key={group.day}
                      defaultOpen
                      className="mb-3 overflow-hidden rounded-xl border last:mb-0"
                    >
                      <CollapsibleTrigger className="rounded-none border-b bg-muted/40 px-3 py-2 text-xs font-semibold text-foreground">
                        <span>
                          {content.dayShortLabel[group.day as keyof typeof content.dayShortLabel] || group.day},{" "}
                          {group.dateLabel}
                        </span>
                        <span className="text-[11px] font-bold text-primary">{bdt.format(group.subTotal)}</span>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="space-y-3 p-3">
                          {group.items.map((r) => (
                            <div key={r.key} className="flex items-start justify-between text-sm">
                              <div className="pr-2">
                                <div className="text-[13px] font-semibold">
                                  {r.packageName} - {r.label}
                                </div>
                                <div className="mt-0.5 text-[11px] text-muted-foreground">{bdt.format(r.subtotal)}</div>
                              </div>
                              <div className="whitespace-nowrap rounded bg-muted px-2 py-1 text-xs font-semibold">
                                {r.quantity}x
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </If>
      </div>
    </main>
  );
}
