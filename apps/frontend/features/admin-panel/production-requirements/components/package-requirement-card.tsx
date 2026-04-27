"use client";

import type { PackageRequirement } from "../schemas/production.schema";
import { VariantRequirementsTable } from "./variant-requirements-table";

interface PackageRequirementCardProps {
  package: PackageRequirement;
}

const bdt = new Intl.NumberFormat("en-BD", {
  style: "decimal",
  maximumFractionDigits: 0,
});

export const PackageRequirementCard = ({ package: pkg }: PackageRequirementCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Package Header */}
      <div className="border-b border-border bg-muted/40 px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {pkg.packageName} ({bdt.format(pkg.packagePrice)})
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {pkg.variants.length} variant{pkg.variants.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{pkg.totalMeals}</div>
              <p className="text-xs font-medium text-muted-foreground">Total Meals</p>
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
