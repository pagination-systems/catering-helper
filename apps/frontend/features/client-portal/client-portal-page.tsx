"use client";

import { useEffect, useMemo, useRef } from "react";
import { Clock3, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { clientPortalContent, type ClientPortalContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { useClientPortalStore, createQuantityKey } from "./store";
import { packages, dayOrder, bdt, DayName } from "./data";
import { getUpcomingDays } from "./components/utils";
import { DayTab } from "./components/day-tab";
import { VariantCard } from "./components/variant-card";
import type { TenantData } from "@/app/(client-portal)/data";
import { If } from "@/components/if";

export function ClientPortalPage({ tenant }: { tenant: TenantData }) {
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

  const orderRows = useMemo(() => {
    const rows: any[] = [];
    packages.forEach((pkg) => {
      const selection = packageSelections[pkg.id] || { quantities: {} };
      pkg.days.forEach((d) => {
        d.variants.forEach((v) => {
          const qty = selection.quantities[createQuantityKey(d.day, v.id)] ?? 0;
          if (qty > 0) {
            rows.push({
              key: `${pkg.id}::${d.day}::${v.id}`,
              pkgId: pkg.id,
              variantId: v.id,
              packageName: pkg.name,
              day: d.day,
              label: v.name,
              items: v.items,
              quantity: qty,
              subtotal: qty * pkg.pricePerMeal,
            });
          }
        });
      });
    });
    return rows.sort(
      (a, b) => a.packageName.localeCompare(b.packageName) || dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day),
    );
  }, [packageSelections]);

  const groupedOrders = useMemo(() => {
    const grouped: Record<string, { day: string; dateLabel: string; items: typeof orderRows; subTotal: number }> = {};

    orderRows.forEach((row) => {
      if (!grouped[row.day]) {
        const dayInfo = upcomingDays.find((d) => d.day === row.day);
        grouped[row.day] = {
          day: row.day,
          dateLabel: dayInfo?.dateLabel || "",
          items: [],
          subTotal: 0,
        };
      }
      grouped[row.day].items.push(row);
      grouped[row.day].subTotal += row.subtotal;
    });

    return Object.values(grouped).sort(
      (a, b) => dayOrder.indexOf(a.day as DayName) - dayOrder.indexOf(b.day as DayName),
    );
  }, [orderRows, upcomingDays]);

  const total = orderRows.reduce((a, b) => a + b.subtotal, 0);
  const totalQuantity = orderRows.reduce((a, b) => a + b.quantity, 0);

  const handlePickPackage = (id: string) => {
    pickPackage(id);
    requestAnimationFrame(() => customizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <main className="dark:bg-[hsl(var(--landing-bg))] pb-28">
      <div className="mx-auto w-full max-w-[1260px] px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-10">
        <section className="mb-10 lg:mb-16 mt-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--cater-primary))/0.3] bg-[hsl(var(--cater-primary))/0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[hsl(var(--cater-primary-strong))]">
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
            <div className="relative h-[240px] sm:h-[320px] lg:h-[350px] w-full overflow-hidden rounded-3xl bg-muted/30 shadow-xl ring-1 ring-border/50 dark:bg-[hsl(var(--landing-card-soft-bg))]">
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
                      ? "border-[hsl(var(--cater-primary))] ring-1 ring-[hsl(var(--cater-primary))] shadow-[0_16px_30px_-24px_hsl(var(--cater-primary))]"
                      : "hover:-translate-y-0.5 hover:shadow-lg",
                  )}
                >
                  <If expression={pkg.popular}>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full bg-[hsl(var(--cater-primary))] px-3 py-1 b-4 text-[8px] font-semibold text-white uppercase tracking-[0.12em]">
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
                      className="h-11 w-full rounded-xl bg-[hsl(var(--cater-primary))] text-white hover:bg-[hsl(var(--cater-primary-strong))]"
                      onClick={() => handlePickPackage(pkg.id)}
                    >
                      {active ? content.selectedPackage : content.viewPackage}
                    </Button>
                    <If expression={packageSelectionTotals[pkg.id] > 0}>
                      <p className="text-xs font-medium text-[hsl(var(--cater-primary-strong))]">
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
              <Card className="border-border/70 bg-card/96 shadow-sm dark:bg-[hsl(var(--landing-card-bg))]">
                <CardHeader className="space-y-5 border-b border-border/70 bg-muted/40 p-4 dark:bg-[hsl(var(--landing-chip-bg-soft))] sm:p-5">
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
              <Card className="border-border/70 shadow-sm">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-2xl font-semibold tracking-tight">{content.orderSummaryTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-5 pt-0">
                  <div className="max-h-[420px] space-y-3 overflow-auto pr-2">
                    {groupedOrders.length === 0 ? (
                      <div className="p-4 text-sm text-muted-foreground">{content.noItemsSelected}</div>
                    ) : (
                      groupedOrders.map((group) => (
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
                            <b>BDT {group.subTotal.toFixed(2)}</b>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-3 space-y-4">
                              {group.items.map((r) => (
                                <div
                                  key={r.key}
                                  className={cn(
                                    "flex flex-col gap-1 transition-all",
                                    recentlyUpdatedKey === r.key &&
                                      "ring-1 ring-[hsl(var(--cater-primary))/0.4] rounded-md p-1.5 -m-1.5",
                                  )}
                                >
                                  <p className="text-sm font-medium">
                                    {r.packageName} - {r.label}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground">{r.items.join(", ")}</p>
                                  <div className="mt-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2 rounded-full border bg-background px-1.5 py-1">
                                      <button
                                        onClick={() =>
                                          updateQuantity(r.pkgId, r.day as any, r.variantId, r.quantity - 1)
                                        }
                                      >
                                        <Minus className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                      </button>
                                      <span className="w-3 text-center text-xs font-semibold">{r.quantity}</span>
                                      <button
                                        onClick={() =>
                                          updateQuantity(r.pkgId, r.day as any, r.variantId, r.quantity + 1)
                                        }
                                      >
                                        <Plus className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                      </button>
                                    </div>
                                    <span className="text-sm font-medium">{bdt.format(r.subtotal)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))
                    )}
                  </div>

                  <div className="rounded-2xl border bg-muted/65 p-4 dark:bg-[hsl(var(--landing-chip-bg-soft))]">
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold">{content.total}</p>
                      <p className="text-2xl font-bold tracking-tight text-[hsl(var(--cater-primary-strong))]">
                        {bdt.format(total)}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {totalQuantity} {content.meals}
                    </p>
                  </div>
                  <Button className="w-full">{content.checkout}</Button>
                </CardContent>
              </Card>
            </aside>
          </section>
        </If>

        {/* Mobile Summary Section */}
        <If expression={customizerOpen}>
          <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 px-4 py-3 dark:bg-[hsl(var(--landing-card-bg))] lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                className="border px-3 py-2 rounded-xl text-sm font-semibold bg-background"
              >
                {mobileSummaryOpen ? content.hide : content.summary}
              </button>
              <div className="min-w-0 flex-1 rounded-xl bg-muted/65 px-3 py-1.5 text-right dark:bg-[hsl(var(--landing-chip-bg-soft))]">
                <p className="text-[10px] text-muted-foreground">
                  {totalQuantity} {content.meals}
                </p>
                <p className="text-lg font-semibold leading-tight">{bdt.format(total)}</p>
              </div>
              <Button>{content.checkout}</Button>
            </div>
            <Collapsible open={mobileSummaryOpen} onOpenChange={setMobileSummaryOpen}>
              <CollapsibleContent>
                <div className="mt-3 max-h-[60vh] overflow-auto rounded-2xl border bg-background/98 p-3 dark:bg-[hsl(var(--landing-card-bg))]">
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
                        <span className="text-[11px] font-bold text-[hsl(var(--cater-primary-strong))]">
                          {bdt.format(group.subTotal)}
                        </span>
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
