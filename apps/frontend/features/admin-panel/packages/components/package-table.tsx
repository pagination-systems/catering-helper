"use client";

import { PackageIcon } from "lucide-react";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import type { GetPackagesResponse, ICateringPackage } from "../schemas/package.schema";
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

const columns: DataTableColumn<ICateringPackage>[] = [
  {
    accessorKey: "name",
    header: "Package",
    cell: (item) => (
      <>
        <div className="font-medium text-foreground">{item.name}</div>
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
        className={
          item.status === "Active"
            ? "inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
            : "inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
        }
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

export const PackageTable = ({ data, handlePaginate }: PackageTableProps) => {
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
