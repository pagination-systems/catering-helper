import { UserAuthZEntity } from "@catering/authz";
import { AbilityAction, type IUser } from "@catering/types";
import { EyeIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsersStore } from "../store/useStore";

interface RowActionsProps {
  user: IUser;
}

export const RowActions = ({ user }: RowActionsProps) => {
  const openView = useUsersStore((state) => state.openView);
  const openDeleteDialog = useUsersStore((state) => state.openDeleteDialog);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label={`Open actions for ${user.name}`}>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <Can I={AbilityAction.READ} a={UserAuthZEntity}>
            <DropdownMenuItem onSelect={() => openView(user)}>
              <EyeIcon className="size-4" />
              View
            </DropdownMenuItem>
          </Can>
          <DropdownMenuSeparator />
          <Can I={AbilityAction.HARD_DELETE} a={UserAuthZEntity}>
            <DropdownMenuItem variant="destructive" onSelect={() => openDeleteDialog(user)}>
              <Trash2Icon className="size-4" />
              Delete
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
