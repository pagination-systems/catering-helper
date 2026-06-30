"use client";

import { ArrowDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import type { TenantData } from "@/app/(storefront)/data";
import { If } from "@/components/if";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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

const packageFeatures: Record<string, string[]> = {
  "daily-basic": ["Budget-friendly daily meals", "Classic Bangladeshi cuisine", "Ideal for regular orders"],
  standard: ["Balanced & nutritious menu", "Wider variety each day", "Great for teams of any size"],
  premium: ["Restaurant-quality meals", "Premium ingredients", "Perfect for meetings & events"],
};

const heroStats = [
  { value: "3", label: "Packages" },
  { value: "Daily", label: "Fresh" },
  { value: "On-Time", label: "Delivery" },
];

export const StoreFront = ({ tenant }: { tenant: TenantData }) => {
  const router = useRouter();
  const customizerRef = useRef<HTMLElement | null>(null);
  const packagesRef = useRef<HTMLElement | null>(null);
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

  const activeDayMealCounts = useMemo(() => {
    const selection = packageSelections[activePackage.id] || { quantities: {} };
    return Object.fromEntries(
      activePackage.days.map(({ day, variants }) => [
        day,
        variants.reduce((sum, v) => sum + (selection.quantities[createQuantityKey(day, v.id)] || 0), 0),
      ]),
    );
  }, [packageSelections, activePackage]);

  const { subtotal, totalQuantity } = useOrderSummaryData(language);

  const handlePickPackage = (id: string) => {
    pickPackage(id);
    requestAnimationFrame(() => customizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <main className="overflow-x-hidden bg-background pb-28">
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6 lg:px-8">
        {/* ── Hero ── */}
        <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 mb-24 mt-0">
          <div className="relative h-[480px] sm:h-[540px] overflow-hidden">
            <Image
              src={tenant.menuUrl}
              alt={tenant.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
              <Badge className="mb-5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                {content.badge}
              </Badge>
              <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                {tenant.title}
              </h1>
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/80">
                {tenant.description}
              </p>
              <button
                type="button"
                onClick={() => packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="mt-8 inline-flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors"
              >
                <span className="text-xs font-medium uppercase tracking-widest">View Packages</span>
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </button>
            </div>
          </div>

          {/* Stats strip — overlaps hero bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex divide-x divide-border/50 rounded-2xl border border-border/60 bg-background/95 px-6 py-4 shadow-xl backdrop-blur-md">
            {heroStats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center px-5 first:pl-0 last:pr-0">
                <span className="text-xl font-bold text-primary">{value}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Package Selection ── */}
        <section ref={packagesRef} className="space-y-6 pb-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{content.packageLabel}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{content.packageDescription}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {packages.map((pkg) => {
              const active = pkg.id === activePackageId;
              const selectedCount = packageSelectionTotals[pkg.id];
              return (
                <Card
                  key={pkg.id}
                  className={cn(
                    "relative overflow-hidden transition-all duration-200 flex flex-col cursor-pointer",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_20px_40px_-20px_hsl(var(--primary)/0.5)] ring-1 ring-primary"
                      : "border-border/60 bg-card hover:-translate-y-1 hover:shadow-lg hover:border-primary/30",
                  )}
                  onClick={() => handlePickPackage(pkg.id)}
                >
                  {pkg.popular && (
                    <div
                      className={cn(
                        "absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl px-5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]",
                        active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-amber-400 text-amber-900",
                      )}
                    >
                      {content.mostPopular}
                    </div>
                  )}

                  <CardHeader className={cn("p-6 flex-1 space-y-4", pkg.popular && "pt-8")}>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle
                        className={cn("text-xl font-semibold leading-tight", active ? "text-primary-foreground" : "text-foreground")}
                      >
                        {pkg.name}
                      </CardTitle>
                      {active && <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-foreground mt-0.5" />}
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className={cn("text-4xl font-extrabold tracking-tight", active ? "text-primary-foreground" : "text-foreground")}>
                        {formatCurrency(pkg.pricePerMeal)}
                      </span>
                      <span className={cn("text-xs font-semibold uppercase", active ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        {content.mealSuffix}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {(packageFeatures[pkg.id] ?? []).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <span className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full", active ? "bg-primary-foreground/20" : "bg-accent/15")}>
                            <CheckCircle2 className={cn("h-3 w-3", active ? "text-primary-foreground" : "text-accent")} />
                          </span>
                          <span className={active ? "text-primary-foreground/90" : "text-muted-foreground"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardHeader>

                  <CardContent className="p-6 pt-0 space-y-2">
                    <Button
                      className={cn(
                        "h-10 w-full rounded-xl font-semibold text-sm",
                        active && "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
                      )}
                      variant={active ? "outline" : "default"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePickPackage(pkg.id);
                      }}
                    >
                      {active ? content.selectedPackage : content.viewPackage}
                    </Button>
                    {selectedCount > 0 && (
                      <p className={cn("text-center text-xs font-semibold", active ? "text-primary-foreground/80" : "text-primary")}>
                        {selectedCount} {content.mealSelected}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── Customizer + Summary ── */}
        <If expression={customizerOpen}>
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:pb-10 pb-4">
            {/* Left: customizer */}
            <section ref={customizerRef} className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {content.customizeTitle}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activePackage.name} &mdash; <strong>{formatCurrency(activePackage.pricePerMeal)}</strong>{" "}
                    {content.perMealSuffix}
                  </p>
                </div>
                {packageSelectionTotals[activePackage.id] > 0 && (
                  <Badge className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {packageSelectionTotals[activePackage.id]} {content.mealSelected}
                  </Badge>
                )}
              </div>

              {/* Two-column: day sidebar + variants */}
              <div className="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)]">
                {/* Day sidebar — desktop */}
                <aside className="hidden lg:flex lg:flex-col lg:gap-1.5">
                  {upcomingDays.map(({ day, dateLabel, isToday }) => (
                    <DayTab
                      key={day}
                      dayLabel={content.dayShortLabel[day as keyof typeof content.dayShortLabel] || day}
                      dateLabel={dateLabel}
                      active={activeDay?.day === day}
                      mealCount={activeDayMealCounts[day] || 0}
                      isToday={isToday}
                      onClick={() => setActiveDay(activePackage.id, day as any)}
                    />
                  ))}
                </aside>

                {/* Day chips — mobile horizontal scroll */}
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 lg:hidden [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                  {upcomingDays.map(({ day, dateLabel, isToday }) => (
                    <div key={day} className="shrink-0 w-[80px]">
                      <DayTab
                        dayLabel={content.dayShortLabel[day as keyof typeof content.dayShortLabel] || day}
                        dateLabel={dateLabel}
                        active={activeDay?.day === day}
                        mealCount={activeDayMealCounts[day] || 0}
                        isToday={isToday}
                        onClick={() => setActiveDay(activePackage.id, day as any)}
                      />
                    </div>
                  ))}
                </div>

                {/* Variants grid */}
                <If expression={activeDay}>
                  <div className="animate-in fade-in-0 duration-300 lg:col-start-2">
                    <div className="grid gap-4 sm:grid-cols-2">
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
                </If>
              </div>
            </section>

            {/* Right: sticky desktop summary */}
            <aside className="hidden h-fit lg:sticky lg:top-6 lg:block">
              <OrderSummary tenantSlug={tenant.slug} />
            </aside>
          </div>
        </If>
      </div>

      {/* ── Mobile sticky bar ── */}
      <If expression={customizerOpen}>
        <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur-sm px-4 py-3 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <Sheet open={mobileSummaryOpen} onOpenChange={setMobileSummaryOpen}>
            <div className="flex items-center gap-2">
              <SheetTrigger asChild>
                <Button variant="outline" className="h-10 shrink-0 rounded-xl px-4 text-sm font-semibold">
                  {content.summary}
                </Button>
              </SheetTrigger>

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

            <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl p-0">
              <SheetHeader className="border-b px-5 py-4 pr-12">
                <SheetTitle>{content.orderSummaryTitle}</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(75vh-65px)] overflow-y-auto px-4 py-4">
                <OrderSummary tenantSlug={tenant.slug} readonly naked />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </If>
    </main>
  );
};
