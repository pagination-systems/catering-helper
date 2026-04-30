"use client";

import { formatCurrency } from "@/lib/utils";
import { useProductionRequirementsI18n } from "../lib/production-requirements-i18n";
import type { PackageRequirement } from "../schemas/production.schema";
import { VariantRequirementsTable } from "./variant-requirements-table";

interface PackageRequirementCardProps {
  package: PackageRequirement;
}

export const PackageRequirementCard = ({ package: pkg }: PackageRequirementCardProps) => {
  const i18n = useProductionRequirementsI18n();
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Package Header */}
      <div className="border-b border-border bg-muted/40 px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {pkg.packageName} ({formatCurrency(pkg.packagePrice)})
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {pkg.variants.length}{" "}
              {pkg.variants.length !== 1 ? i18n.packageCard.variantsPlural : i18n.packageCard.variantsSingular}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{pkg.totalMeals}</div>
              <p className="text-xs font-medium text-muted-foreground">{i18n.packageCard.totalMealsLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Variants Table */}
      <div className="p-0">
        <VariantRequirementsTable variants={pkg.variants} />
      </div>
    </div>
  );
};
