"use client";

import { UsersIcon } from "lucide-react";
import { If } from "@/components/if";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TablePagination } from "../../components/table-pagination";
import type { GetUsersResponse } from "../schemas/user.schema";
import { RowActions } from "./row-actions";

interface UserTableProps {
  data: GetUsersResponse;
}

export const UserTable = ({ data }: UserTableProps) => {
  return (
    <>
      <Table className="border-b">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <If
            expression={data.data.length > 0}
            fallback={
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <UsersIcon className="size-5" />
                    No users found for your current query and filters.
                  </div>
                </TableCell>
              </TableRow>
            }
          >
            {data.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-medium text-foreground">{user.name}</div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {user.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <RowActions user={user} />
                </TableCell>
              </TableRow>
            ))}
          </If>
        </TableBody>
      </Table>

      <TablePagination pagination={data.meta.pagination} />
    </>
  );
};
