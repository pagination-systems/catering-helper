"use client";

import { PackageIcon } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import { usePackagesI18n } from "../lib/packages-i18n";
import type { GetPackagesResponse, ICateringPackage } from "../schemas/package.schema";
import { usePackagesStore } from "../store/useStore";
import { getPackageStatusBadgeClassName } from "../utils/badge";
import { RowActions } from "./row-actions";

interface PackageTableProps {
  data: GetPackagesResponse;
  handlePaginate?: (payload: { page: number; limit: number }) => void;
}

export const PackageTable = ({ data, handlePaginate }: PackageTableProps) => {
  const i18n = usePackagesI18n();
  const openView = usePackagesStore((state) => state.openView);

  const columns: DataTableColumn<ICateringPackage>[] = [
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
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getPackageStatusBadgeClassName(item.status)}`}
        >
          {item.status}
        </span>
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
      data={data.data}
      columns={columns}
      pagination={data.meta.pagination}
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
