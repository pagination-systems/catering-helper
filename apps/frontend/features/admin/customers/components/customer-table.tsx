"use client";

import type { IUser } from "@catering/types";
import { UsersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import type { GetUsersResponse } from "../schemas/customer.schema";
import { useCustomersStore } from "../store/useStore";
import { getRoleBadgeStyles } from "../utils/badge";
import { RowActions } from "./row-actions";

interface CustomerTableProps {
  data: GetUsersResponse;
  handlePaginate?: (payload: { page: number; limit: number }) => void;
}

export const CustomerTable = ({ data, handlePaginate }: CustomerTableProps) => {
  const openView = useCustomersStore((state) => state.openView);

  const columns: DataTableColumn<IUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (user) => (
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => openView(user)}
            className="w-fit text-left font-medium text-foreground transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {user.name}
          </button>
          <span className="text-xs text-muted-foreground">ID: {user.id}</span>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (user) => (
        <Badge variant="outline" className={getRoleBadgeStyles(user.role)}>
          {user.role}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: (user) => formatDate(user.createdAt),
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: (user) => formatDate(user.updatedAt),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (user) => <RowActions user={user} />,
    },
  ];

  return (
    <DataTable
      data={data.data}
      columns={columns}
      pagination={data.meta.pagination}
      handlePaginate={handlePaginate}
      getRowId={(user) => user.id}
      emptyState={
        <div className="flex flex-col items-center gap-2">
          <UsersIcon className="size-5" />
          No customers found for your current query and filters.
        </div>
      }
    />
  );
};
