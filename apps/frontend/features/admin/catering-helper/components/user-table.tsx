"use client";

import type { IUser } from "@catering/types";
import { UsersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import { useCateringHelperI18n } from "../lib/catering-helper-i18n";
import type { GetUsersResponse } from "../schemas/user.schema";
import { useUsersStore } from "../store/useStore";
import { getRoleBadgeStyles } from "../utils/badge";
import { RowActions } from "./row-actions";

interface UserTableProps {
  data: GetUsersResponse;
  handlePaginate?: (page: number, limit: number) => void;
}

export const UserTable = ({ data, handlePaginate }: UserTableProps) => {
  const i18n = useCateringHelperI18n();
  const openView = useUsersStore((state) => state.openView);

  const columns: DataTableColumn<IUser>[] = [
    {
      accessorKey: "name",
      header: i18n.table.name,
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
      header: i18n.table.phone,
    },
    {
      accessorKey: "role",
      header: i18n.table.role,
      cell: (user) => (
        <Badge variant="outline" className={getRoleBadgeStyles(user.role)}>
          {user.role}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: i18n.table.created,
      cell: (user) => formatDate(user.createdAt),
    },
    {
      accessorKey: "updatedAt",
      header: i18n.table.lastUpdated,
      cell: (user) => formatDate(user.updatedAt),
    },
    {
      id: "actions",
      header: i18n.table.actions,
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
          {i18n.table.noUsers}
        </div>
      }
    />
  );
};
