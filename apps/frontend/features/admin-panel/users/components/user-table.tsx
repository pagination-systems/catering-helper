"use client";

import { UsersIcon } from "lucide-react";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import type { GetUsersResponse, IUser } from "../schemas/user.schema";
import { RowActions } from "./row-actions";

interface UserTableProps {
  data: GetUsersResponse;
  handlePaginate?: (payload: { page: number; limit: number }) => void;
}

const columns: DataTableColumn<IUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (user) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{user.name}</span>
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
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (user) => user.createdAt.toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (user) => <RowActions user={user} />,
  },
];

export const UserTable = ({ data, handlePaginate }: UserTableProps) => {
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
