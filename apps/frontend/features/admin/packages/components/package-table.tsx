"use client";

import type { PaginationMeta } from "@catering/types";
import { PackageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import { getPackageStatusBadgeStyles } from "../lib/badge";
import { usePackagesI18n } from "../lib/packages-i18n";
import type { IPackage } from "../schemas/package.schema";
import { usePackagesStore } from "../store/useStore";
import { RowActions } from "./row-actions";

interface PackageTableProps {
  data: IPackage[];
  pagination: PaginationMeta;
  handlePaginate?: (page: number, limit: number) => void;
}

export const PackageTable = ({ data, pagination, handlePaginate }: PackageTableProps) => {
  const i18n = usePackagesI18n();
  const openView = usePackagesStore((state) => state.openView);

  const columns: DataTableColumn<IPackage>[] = [
    {
      accessorKey: "name",
      header: i18n.table.package,
      cell: (item) => (
        <>
          <button
            type="button"
            onClick={() => openView(item)}
            className="w-fit text-left font-medium text-foreground transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {item.name}
          </button>
          <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
          <div className="text-xs text-muted-foreground">
            {i18n.table.idLabel} {item.id}
          </div>
        </>
      ),
    },
    {
      accessorKey: "pricePerMeal",
      header: i18n.table.pricePerMeal,
      cell: (item) => formatCurrency(item.pricePerMeal),
    },
    {
      id: "variants",
      header: i18n.table.variantsPerWeek,
      cell: (item) => item.days.reduce((sum, day) => sum + day.variants.length, 0),
    },
    {
      accessorKey: "status",
      header: i18n.table.status,
      cell: (item) => (
        <Badge variant="outline" className={getPackageStatusBadgeStyles(item.status)}>
          {item.status}
        </Badge>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: i18n.table.lastUpdated,
      cell: (item) => formatDate(new Date(item.updatedAt)),
    },
    {
      id: "actions",
      header: i18n.table.actions,
      cell: (item) => <RowActions item={item} />,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      pagination={pagination}
      handlePaginate={handlePaginate}
      getRowId={(item) => item.id}
      emptyState={
        <div className="flex flex-col items-center gap-2">
          <PackageIcon className="size-5" />
          {i18n.table.noPackages}
        </div>
      }
    />
  );
};
