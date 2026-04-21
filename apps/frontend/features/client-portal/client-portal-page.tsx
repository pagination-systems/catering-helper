"use client";

import { useEffect, useMemo, useRef } from "react";
import { Clock3, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clientPortalContent, type ClientPortalContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { useClientPortalStore, createQuantityKey } from "./store";
import { packages, dayOrder, bdt } from "./data";
import { getUpcomingDays } from "./components/utils";
import { DayTab } from "./components/day-tab";
import { VariantCard } from "./components/variant-card";
import { TenantData } from "@/app/client-portal/data";

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

  const total = orderRows.reduce((a, b) => a + b.subtotal, 0);
  const totalQuantity = orderRows.reduce((a, b) => a + b.quantity, 0);

  const handlePickPackage = (id: string) => {
    pickPackage(id);
    requestAnimationFrame(() => customizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <main className="mx-auto w-full max-w-[1260px] px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-10">
      <section className="mb-10 lg:mb-16">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--cater-primary))/0.3] bg-[hsl(var(--cater-primary))/0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[hsl(var(--cater-primary-strong))]">
              <Clock3 className="h-3.5 w-3.5" />
              {content.badge}
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              {content.description}
            </p>
          </div>
          <div className="relative h-[240px] sm:h-[320px] lg:h-[400px] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-border/50 bg-muted/30">
            <img
              src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80"
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
                {pkg.popular && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 rounded-full bg-[hsl(var(--cater-primary))] px-3 py-1 text-[8px] font-semibold text-white uppercase tracking-[0.12em]">
                    {content.mostPopular}
                  </div>
                )}
                <CardHeader className="space-y-3 p-5 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-semibold">{pkg.name}</CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">{pkg.description}</p>
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
                  {packageSelectionTotals[pkg.id] > 0 && (
                    <p className="text-xs font-medium text-[hsl(var(--cater-primary-strong))]">
                      {packageSelectionTotals[pkg.id]} {content.mealSelected}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {customizerOpen && (
        <section ref={customizerRef} className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-3">
            <Card className="border-border/70 bg-card/96 shadow-sm">
              <CardHeader className="space-y-5 border-b border-border/70 bg-muted/40 p-4 sm:p-5">
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
                      dayLabel={content.dayShortLabel[day]}
                      dateLabel={dateLabel}
                      active={activeDay?.day === day}
                      onClick={() => setActiveDay(activePackage.id, day)}
                    />
                  ))}
                </div>
              </CardHeader>

              {activeDay && (
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
              )}
            </Card>
          </div>

          <aside className="hidden h-fit lg:sticky lg:top-6 lg:block">
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-2xl font-semibold tracking-tight">{content.orderSummaryTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5 pt-0">
                <div className="max-h-[360px] space-y-2 overflow-auto pr-1">
                  {orderRows.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground">{content.noItemsSelected}</div>
                  ) : (
                    orderRows.map((r) => (
                      <div
                        key={r.key}
                        className={cn(
                          "rounded-xl border border-border/70 p-3",
                          recentlyUpdatedKey === r.key && "ring-1 ring-[hsl(var(--cater-primary))/0.4]",
                        )}
                      >
                        <p className="text-sm font-semibold">
                          {r.packageName} - {r.day} - {r.label}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground">{r.items.join(", ")}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-background px-1.5 py-1 rounded-full border">
                            <button onClick={() => updateQuantity(r.pkgId, r.day, r.variantId, r.quantity - 1)}>
                              <Minus className="w-3 h-3 text-muted-foreground" />
                            </button>
                            <span className="text-xs font-semibold">{r.quantity}</span>
                            <button onClick={() => updateQuantity(r.pkgId, r.day, r.variantId, r.quantity + 1)}>
                              <Plus className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </div>
                          <span className="font-medium text-sm">{bdt.format(r.subtotal)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="rounded-2xl border p-4 bg-muted/65">
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
      )}

      {customizerOpen && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
              className="border px-3 py-1 rounded-xl text-sm font-semibold"
            >
              {mobileSummaryOpen ? content.hide : content.summary}
            </button>
            <div className="flex-1 text-right min-w-0 bg-muted/65 px-3 py-1 rounded-xl">
              <p className="text-[10px] text-muted-foreground">
                {totalQuantity} {content.meals}
              </p>
              <p className="text-lg font-semibold">{bdt.format(total)}</p>
            </div>
            <Button>{content.checkout}</Button>
          </div>
          {mobileSummaryOpen && (
            <div className="mt-3 max-h-64 overflow-auto border p-3 rounded-2xl bg-background/98">
              {orderRows.map((r) => (
                <div key={r.key} className="border p-2 mb-2 rounded-xl">
                  <div className="flex justify-between font-semibold text-sm">
                    <span>
                      {r.day} - {r.label}
                    </span>
                    <span>{r.quantity}x</span>
                  </div>
                  <div className="text-muted-foreground text-xs">{bdt.format(r.subtotal)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
