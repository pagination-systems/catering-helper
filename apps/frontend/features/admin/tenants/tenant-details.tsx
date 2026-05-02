"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "../components/section-header";
import { type TenantDetailsTab, useTenantsStore } from "./store/useStore";

const detailsTabs: Array<{ id: TenantDetailsTab; label: string }> = [
  { id: "tab-1", label: "Tab 1" },
  { id: "tab-2", label: "Tab 2" },
  { id: "tab-3", label: "Tab 3" },
  { id: "tab-4", label: "Tab 4" },
  { id: "tab-5", label: "Tab 5" },
  { id: "tab-6", label: "Tab 6" },
];

export const TenantDetails = () => {
  const activeDetailsTab = useTenantsStore((state) => state.activeDetailsTab);
  const setActiveDetailsTab = useTenantsStore((state) => state.setActiveDetailsTab);
  const resetDetailsTab = useTenantsStore((state) => state.resetDetailsTab);

  useEffect(() => {
    resetDetailsTab();
  }, [resetDetailsTab]);

  const activeTabLabel = detailsTabs.find((tab) => tab.id === activeDetailsTab)?.label ?? "Tab 1";

  return (
    <section className="space-y-4" aria-labelledby="tenant-details-title">
      <SectionHeader title="Tenant Details" description="View tenant details grouped by tabs." />

      <Card>
        <CardHeader className="space-y-3">
          <div className="overflow-x-auto pb-1">
            <div className="inline-flex min-w-full gap-2">
              {detailsTabs.map((tab) => (
                <Button
                  key={tab.id}
                  type="button"
                  variant={activeDetailsTab === tab.id ? "default" : "outline"}
                  className="h-auto rounded-full px-4 py-2"
                  onClick={() => setActiveDetailsTab(tab.id)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <h1 className="text-2xl font-semibold tracking-tight">{activeTabLabel}</h1>
        </CardContent>
      </Card>
    </section>
  );
};
