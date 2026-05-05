"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const detailsTabs = [
  { id: "orders", label: "Orders" },
  { id: "packages", label: "Packages" },
  { id: "production-requirements", label: "Production Requirements" },
  { id: "customer-ledger", label: "Customer Ledger" },
  { id: "expenses", label: "Expenses" },
  { id: "settings", label: "Settings" },
];

const dummyTenants = [
  { value: "uttara-catering", label: "Uttara Catering" },
  { value: "nikunja-catering", label: "Nikunja Catering" },
];

interface TenantDetailsLayoutProps {
  id: string;
  children: React.ReactNode;
}

export const TenantDetailsLayout = ({ id, children }: TenantDetailsLayoutProps) => {
  const pathname = usePathname();
  const [selectedTenant, setSelectedTenant] = useState<string>(dummyTenants[0].value);

  return (
    <section className="space-y-4" aria-labelledby="tenant-details-title">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b">
        <div className="overflow-x-auto flex-1 hide-scrollbar">
          <div className="flex w-fit whitespace-nowrap">
            {detailsTabs.map((tab) => {
              const href = `/admin/tenants/${id}/${tab.id}`;
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={tab.id}
                  href={href}
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors hover:text-primary",
                    isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground",
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-full sm:w-[350px] shrink-0 pb-2 sm:pb-0 sm:self-end sm:mb-1">
          <Select
            options={dummyTenants}
            value={selectedTenant}
            onValueChange={setSelectedTenant}
            isSearchable={false}
            className="text-sm"
          />
        </div>
      </div>
      {children}
    </section>
  );
};
