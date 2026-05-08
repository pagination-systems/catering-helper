"use client";

import { Clock3 } from "lucide-react";
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
              <Image
                src={tenant.menuUrl}
                alt="Display"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
                width={100}
                height={100}
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
                        {formatCurrency(pkg.pricePerMeal)}
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
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-semibold tracking-tight">
                      {content.customizeTitle}
                    </CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {activePackage.name} - <b>{formatCurrency(activePackage.pricePerMeal)}</b>{" "}
                      {content.perMealSuffix}
                    </p>
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
              <OrderSummary tenantSlug={tenant.slug} />
            </aside>
          </section>
        </If>
      </div>

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
              <p className="text-lg font-semibold leading-tight">{formatCurrency(subtotal)}</p>
            </div>
            <Button
              disabled={totalQuantity === 0}
              onClick={() => router.push(`/${tenant.slug}/checkout`)}
            >
              {content.checkout}
            </Button>
          </div>
          <Collapsible open={mobileSummaryOpen} onOpenChange={setMobileSummaryOpen}>
            <CollapsibleContent>
              <div className="mt-3 max-h-[60vh] overflow-auto">
                <OrderSummary tenantSlug={tenant.slug} readonly />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </If>
    </main>
  );
};
