"use client";

import { PackageIcon } from "lucide-react";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import type { GetPackagesResponse, ICateringPackage } from "../schemas/package.schema";
import { usePackagesStore } from "../store/useStore";
import { getPackageStatusBadgeClassName } from "../utils/badge";
import { RowActions } from "./row-actions";

interface PackageTableProps {
  data: GetPackagesResponse;
  handlePaginate?: (payload: { page: number; limit: number }) => void;
}

const bdt = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

export const PackageTable = ({ data, handlePaginate }: PackageTableProps) => {
  const openView = usePackagesStore((state) => state.openView);

  const columns: DataTableColumn<ICateringPackage>[] = [
    {
      accessorKey: "name",
      header: "Package",
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
          <div className="text-xs text-muted-foreground">ID: {item.id}</div>
        </>
      ),
    },
    {
      accessorKey: "pricePerMeal",
      header: "Price / Meal",
      cell: (item) => bdt.format(item.pricePerMeal),
    },
    {
      id: "variants",
      header: "Variants / Week",
      cell: (item) => item.days.reduce((sum, day) => sum + day.variants.length, 0),
    },
    {
      accessorKey: "status",
      header: "Status",
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
      header: "Updated At",
      cell: (item) => item.updatedAt.toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
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
          No packages found for your current query and filters.
        </div>
      }
    />
  );
};
