"use client";

import { UserAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import { Link2Icon, MoreHorizontalIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { interpolate, useCateringHelperI18n } from "../lib/catering-helper-i18n";
import type { SentInvitation } from "../schemas/user.schema";
import { useUsersStore } from "../store/useStore";

interface InvitationRowActionsProps {
  invitation: SentInvitation;
}

export const InvitationRowActions = ({ invitation }: InvitationRowActionsProps) => {
  const i18n = useCateringHelperI18n();
  const resendInvitation = useUsersStore((state) => state.resendInvitation);
  const deleteInvitation = useUsersStore((state) => state.deleteInvitation);

  const ariaLabel = interpolate(i18n.actions.openActionsFor, { name: invitation.phone });

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label={ariaLabel}>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <Can I={AbilityAction.SEND_INVITATION} a={UserAuthZEntity}>
            <DropdownMenuItem onSelect={() => resendInvitation(invitation.id)}>
              <RotateCcwIcon className="size-4" />
              {i18n.sentInvitations.resend}
            </DropdownMenuItem>
          </Can>
          <DropdownMenuSeparator />
          <Can I={AbilityAction.READ} a={UserAuthZEntity}>
            <DropdownMenuItem onSelect={() => void copyLink()}>
              <Link2Icon className="size-4" />
              {i18n.sentInvitations.copyLink}
            </DropdownMenuItem>
          </Can>
          <DropdownMenuSeparator />
          <Can I={AbilityAction.HARD_DELETE} a={UserAuthZEntity}>
            <DropdownMenuItem variant="destructive" onSelect={() => deleteInvitation(invitation.id)}>
              <Trash2Icon className="size-4" />
              {i18n.actions.delete}
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
