"use client";

import { ClipboardListIcon } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import type { GetTenantsResponse, ITenant } from "../schemas/tenant.schema";
import { getTenantStatusBadgeClassName } from "../utils/badge";
import { RowActions } from "./row-actions";

interface TenantTableProps {
  data: GetTenantsResponse;
  handlePaginate?: (page: number, limit: number) => void;
}

export const TenantTable = ({ data, handlePaginate }: TenantTableProps) => {
  const columns: DataTableColumn<ITenant>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (item) => (
        <div className="space-y-0.5">
          <Link
            href={`/admin/tenants/${item.id}`}
            className="w-fit text-left font-medium text-foreground transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {item.name}
          </Link>
          <div className="text-xs text-muted-foreground">{item.id}</div>
        </div>
      ),
    },
    {
      id: "phone",
      header: "Phone",
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-medium">{item.phone}</p>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (item) => (
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getTenantStatusBadgeClassName(item.status)}`}
        >
          {item.status}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Onboarded At",
      cell: (item) => formatDate(item.createdAt),
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: (item) => formatDate(item.updatedAt),
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
          <ClipboardListIcon className="size-5" />
          No tenants found. Please check back later.
        </div>
      }
    />
  );
};
