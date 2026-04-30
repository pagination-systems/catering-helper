"use client";

import { Link2Icon, MoreHorizontalIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SentInvitation } from "../schemas/user.schema";
import { useUsersStore } from "../store/useStore";

interface InvitationRowActionsProps {
  invitation: SentInvitation;
}

export const InvitationRowActions = ({ invitation }: InvitationRowActionsProps) => {
  const resendInvitation = useUsersStore((state) => state.resendInvitation);
  const deleteInvitation = useUsersStore((state) => state.deleteInvitation);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label={`Open actions for ${invitation.phone}`}>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onSelect={() => resendInvitation(invitation.id)}>
            <RotateCcwIcon className="size-4" />
            Resend
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => void copyLink()}>
            <Link2Icon className="size-4" />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => deleteInvitation(invitation.id)}>
            <Trash2Icon className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
