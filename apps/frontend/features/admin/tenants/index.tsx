"use client";

import { TENANT_STATUS_ENUMS } from "@catering/types";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "../components/section-header";
import { TableToolbar } from "./components/table-toolbar";
import { TenantTable } from "./components/tenant-table";
import { useTenants } from "./hooks/useTenants";
import { type TenantListTab, useTenantsStore } from "./store/useStore";

const tabOptions: TenantListTab[] = [
  TENANT_STATUS_ENUMS.ACTIVE,
  TENANT_STATUS_ENUMS.TERMINATED,
  TENANT_STATUS_ENUMS.SUSPENDED,
];

const StatusTabs = ({ counts }: { counts: Partial<Record<TenantListTab, number>> }) => {
  const activeTab = useTenantsStore((state) => state.activeTab);
  const setActiveTab = useTenantsStore((state) => state.setActiveTab);

  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex min-w-full gap-2">
        {tabOptions.map((tab) => (
          <Button
            key={tab}
            type="button"
            variant={activeTab === tab ? "default" : "outline"}
            className="h-auto rounded-full px-4 py-2"
            onClick={() => setActiveTab(tab)}
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="capitalize">{tab}</span>
              <Badge
                variant="secondary"
                className="grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] leading-none tabular-nums"
              >
                {counts[tab] ?? 0}
              </Badge>
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Tenants = () => {
  const { data, isLoading } = useTenants();
  const query = useTenantsStore((state) => state.query);
  const activeTab = useTenantsStore((state) => state.activeTab);

  const counts = useMemo(
    () =>
      data.data.reduce(
        (acc, tenant) => {
          acc[tenant.status] = (acc[tenant.status] ?? 0) + 1;
          return acc;
        },
        {} as Partial<Record<TenantListTab, number>>,
      ),
    [data.data],
  );

  const filteredTenants = useMemo(() => {
    const queryText = query.trim().toLowerCase();

    return data.data.filter((tenant) => {
      if (tenant.status !== activeTab) {
        return false;
      }

      if (!queryText) {
        return true;
      }

      const searchable = [
        tenant.name,
        tenant.id,
        tenant.phone,
        tenant.contactEmail,
        tenant.contactPhone,
        tenant.contactAddress,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(queryText);
    });
  }, [activeTab, data.data, query]);

  const filteredData = useMemo(
    () => ({
      data: filteredTenants,
      meta: {
        pagination: {
          totalDocs: filteredTenants.length,
          limit: data.meta.pagination.limit,
          hasPrevPage: false,
          hasNextPage: false,
          page: 1,
          totalPages: Math.max(1, Math.ceil(filteredTenants.length / data.meta.pagination.limit)),
          prevPage: null,
          nextPage: null,
          pagingCounter: 1,
        },
      },
    }),
    [data.meta.pagination.limit, filteredTenants],
  );

  return (
    <section className="space-y-4" aria-labelledby="tenants-title">
      <SectionHeader title="Tenants" description="Manage all tenants and their details." />

      <StatusTabs counts={counts} />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar filteredTenants={filteredTenants} />
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="py-10 text-center text-sm text-muted-foreground">Loading tenants...</div>
          ) : (
            <TenantTable data={filteredData} handlePaginate={() => {}} />
          )}
        </CardContent>
      </Card>
    </section>
  );
};
