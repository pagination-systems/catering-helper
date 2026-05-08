import { UserAuthZEntity } from "@catering/authz";
import { AbilityAction, type IUser } from "@catering/types";
import { EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { interpolate, useCustomersI18n } from "../lib/customers-i18n";
import { useCustomersStore } from "../store/useStore";

interface RowActionsProps {
  user: IUser;
}

export const RowActions = ({ user }: RowActionsProps) => {
  const i18n = useCustomersI18n();
  const openView = useCustomersStore((state) => state.openView);
  const openEdit = useCustomersStore((state) => state.openEdit);
  const openDeleteDialog = useCustomersStore((state) => state.openDeleteDialog);
  const ariaLabel = interpolate(i18n.actions.openActionsFor, { name: user.name });

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label={ariaLabel}>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <Can I={AbilityAction.READ} a={UserAuthZEntity}>
            <DropdownMenuItem onSelect={() => openView(user)}>
              <EyeIcon className="size-4" />
              {i18n.actions.view}
            </DropdownMenuItem>
          </Can>
          <DropdownMenuSeparator />
          <Can I={AbilityAction.UPDATE} a={UserAuthZEntity}>
            <DropdownMenuItem onSelect={() => openEdit(user)}>
              <PencilIcon className="size-4" />
              {i18n.actions.edit}
            </DropdownMenuItem>
          </Can>
          <DropdownMenuSeparator />
          <Can I={AbilityAction.HARD_DELETE} a={UserAuthZEntity}>
            <DropdownMenuItem variant="destructive" onSelect={() => openDeleteDialog(user)}>
              <Trash2Icon className="size-4" />
              {i18n.actions.delete}
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
