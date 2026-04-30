"use client";

import { MailIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import type { SentInvitation } from "../schemas/user.schema";
import { useUsersStore } from "../store/useStore";
import { InvitationRowActions } from "./invitation-row-actions";

export const SentInvitationsTable = () => {
  const data = useUsersStore((state) => state.sentInvitations);

  const columns: DataTableColumn<SentInvitation>[] = [
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "lastSentAt",
      header: "Last Sent",
      cell: (invitation) => formatDate(invitation.lastSentAt),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (invitation) => <InvitationRowActions invitation={invitation} />,
    },
  ];

  return (
    <DataTable
      data={data.data}
      columns={columns}
      pagination={data.meta.pagination}
      getRowId={(invitation) => invitation.id}
      emptyState={
        <div className="flex flex-col items-center gap-2">
          <MailIcon className="size-5" />
          No sent invitations yet.
        </div>
      }
    />
  );
};
