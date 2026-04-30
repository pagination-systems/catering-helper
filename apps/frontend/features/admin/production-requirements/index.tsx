"use client";

import { ProductionRequirementAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { Can } from "@/authz/ability-context";
import { If } from "@/components/if";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { SectionHeader } from "../components/section-header";
import { EmptyProductionRequirements } from "./components/empty-state";
import { PackageRequirementCard } from "./components/package-requirement-card";
import { downloadProductionRequirementsPdf } from "./components/production-requirements-pdf";
import { useProductionRequirementsStore } from "./store/useStore";

export const ProductionRequirements = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const productionData = useProductionRequirementsStore((state) => state.data);

  const hasRequirements = productionData.packages.length > 0;

  const handleDownload = async () => {
    if (!hasRequirements || isDownloading) return;

    try {
      setIsDownloading(true);
      await downloadProductionRequirementsPdf({ data: productionData });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="space-y-4" aria-labelledby="production-requirements-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          title="Production Requirements"
          description={`Today's meal requirements by package and variant (${formatDate(productionData.date)})`}
          titleId="production-requirements-title"
        />

        <Can I={AbilityAction.READ} a={ProductionRequirementAuthZEntity}>
          <Button
            type="button"
            variant="secondary"
            className="sm:shrink-0"
            onClick={handleDownload}
            disabled={!hasRequirements || isDownloading}
          >
            <DownloadIcon className="size-4" />
            {isDownloading ? "Preparing..." : "Download PDF"}
          </Button>
        </Can>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Daily Summary</h3>
              <p className="text-sm text-muted-foreground">{productionData.dayName}</p>
            </div>
            <div className="flex gap-8">
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{productionData.totalMeals}</div>
                <p className="text-xs font-medium text-muted-foreground">Total Meals</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <If expression={hasRequirements} fallback={<EmptyProductionRequirements />}>
        <div className="space-y-4">
          {productionData.packages.map((pkg) => (
            <PackageRequirementCard key={pkg.packageName} package={pkg} />
          ))}
        </div>
      </If>
    </section>
  );
};
