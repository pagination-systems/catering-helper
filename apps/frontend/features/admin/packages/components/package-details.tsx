import { CalendarDaysIcon, CircleDollarSignIcon, PackageIcon, UtensilsCrossedIcon } from "lucide-react";
import { If } from "@/components/if";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Loader } from "../../components/loader";
import { usePackage } from "../hooks";
import { getPackageStatusBadgeStyles } from "../lib/badge";
import { usePackagesI18n } from "../lib/packages-i18n";
import { getTotalFoodItems, getTotalVariants } from "../lib/utils";
import type { DayName } from "../schemas/package.schema";

interface PackageDetailsProps {
  id: string;
}

export const PackageDetails = ({ id }: PackageDetailsProps) => {
  const i18n = usePackagesI18n();
  const { package: item, isGettingPackage } = usePackage(id);
  const totalVariants = getTotalVariants(item);
  const totalFoodItems = getTotalFoodItems(item);

  const metrics = [
    {
      label: i18n.details.pricePerMeal,
      value: formatCurrency(item?.pricePerMeal ?? 0),
      icon: CircleDollarSignIcon,
    },
    {
      label: i18n.details.daysCovered,
      value: String(item?.days.length ?? 0),
      icon: CalendarDaysIcon,
    },
    {
      label: i18n.details.weeklyVariants,
      value: String(totalVariants),
      icon: PackageIcon,
    },
    {
      label: i18n.details.foodItems,
      value: String(totalFoodItems),
      icon: UtensilsCrossedIcon,
    },
  ] as const;

  const totalVariantsLabel = totalVariants === 1 ? i18n.form.variantLabel : i18n.form.variantsLabel;

  return (
    <If expression={!isGettingPackage && item} fallback={<Loader />}>
      {item && (
        <div className="space-y-5">
          <section className="rounded-md border border-border/70 bg-muted/15 p-4 md:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {i18n.details.package}
                </p>
                <h3 className="break-words text-base font-semibold text-foreground md:text-lg">{item.name ?? "-"}</h3>
                <p className="break-words text-sm leading-6 text-muted-foreground">
                  {item.description || i18n.details.noDescription}
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 sm:items-end">
                <Badge variant="outline" className={getPackageStatusBadgeStyles(item.status)}>
                  {item.status ?? "-"}
                </Badge>
                <p className="text-sm font-semibold text-foreground">{formatCurrency(item.pricePerMeal)}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 border-t border-border/60 pt-4 text-xs sm:grid-cols-3">
              <div>
                <p className="uppercase tracking-wide text-muted-foreground">{i18n.details.packageId}</p>
                <p className="mt-1 break-all font-medium text-foreground">{item.id ?? "-"}</p>
              </div>
              <div>
                <p className="uppercase tracking-wide text-muted-foreground">{i18n.details.created}</p>
                <p className="mt-1 font-medium text-foreground">{formatDateTime(new Date(item.createdAt))}</p>
              </div>
              <div>
                <p className="uppercase tracking-wide text-muted-foreground">{i18n.details.lastUpdated}</p>
                <p className="mt-1 font-medium text-foreground">{formatDateTime(new Date(item.updatedAt))}</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-border/70 bg-card p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                  <metric.icon className="size-4 text-muted-foreground" />
                </div>
                <p className="mt-2 text-base font-semibold text-foreground md:text-lg">{metric.value}</p>
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {i18n.details.weeklyMenuPlan}
              </p>
              <p className="text-xs text-muted-foreground">
                {totalVariants} {totalVariantsLabel} {i18n.details.variantsInTotal}
              </p>
            </div>

            <div className="grid gap-3 xl:grid-cols-2">
              {item.days.map((day) => (
                <article key={day.day} className="rounded-md border border-border/70 bg-card p-4">
                  <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <p className="text-sm font-semibold text-foreground">
                      {i18n.dayLabels[day.day as DayName] ?? day.day}
                    </p>
                    <span className="rounded-full bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                      {day.variants.length}{" "}
                      {day.variants.length === 1 ? i18n.form.variantLabel : i18n.form.variantsLabel}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2.5 md:grid-cols-2">
                    {day.variants.map((variant) => (
                      <div key={variant.id} className="rounded-md border border-border/60 bg-muted/15 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-foreground">{variant.name}</p>
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[8px] font-medium ${
                              (variant.available ?? true)
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {(variant.available ?? true) ? i18n.details.available : i18n.details.unavailable}
                          </span>
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {variant.note || i18n.details.noNote}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {Array.from(new Set(variant.items)).map((menuItem) => (
                            <span
                              key={`${variant.id}-${menuItem}`}
                              className="inline-flex rounded-full bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
                            >
                              {menuItem}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </If>
  );
};
