"use client";

import { UsersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import type { GetUsersResponse, IUser } from "../schemas/user.schema";
import { useUsersStore } from "../store/useStore";
import { getRoleBadgeVariant } from "../utils/badge";
import { RowActions } from "./row-actions";

interface UserTableProps {
  data: GetUsersResponse;
  handlePaginate?: (payload: { page: number; limit: number }) => void;
}

export const UserTable = ({ data, handlePaginate }: UserTableProps) => {
  const openView = useUsersStore((state) => state.openView);

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
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (user) => <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>,
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
          No users found for your current query and filters.
        </div>
      }
    />
  );
};
