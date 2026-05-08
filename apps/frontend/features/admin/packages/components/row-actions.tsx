import { PackageAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
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
import { interpolate, usePackagesI18n } from "../lib/packages-i18n";
import type { IPackage } from "../schemas/package.schema";
import { usePackagesStore } from "../store/useStore";

interface RowActionsProps {
  item: IPackage;
}

export const RowActions = ({ item }: RowActionsProps) => {
  const i18n = usePackagesI18n();
  const openView = usePackagesStore((state) => state.openView);
  const openEdit = usePackagesStore((state) => state.openEdit);
  const openDeleteDialog = usePackagesStore((state) => state.openDeleteDialog);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={interpolate(i18n.actions.openActionsFor, { name: item.name })}
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <Can I={AbilityAction.READ} a={PackageAuthZEntity}>
            <DropdownMenuItem onSelect={() => openView(item)}>
              <EyeIcon className="size-4" />
              {i18n.actions.view}
            </DropdownMenuItem>
          </Can>
          <DropdownMenuSeparator />
          <Can I={AbilityAction.UPDATE} a={PackageAuthZEntity}>
            <DropdownMenuItem onSelect={() => openEdit(item)}>
              <PencilIcon className="size-4" />
              {i18n.actions.edit}
            </DropdownMenuItem>
          </Can>
          <DropdownMenuSeparator />
          <Can I={AbilityAction.HARD_DELETE} a={PackageAuthZEntity}>
            <DropdownMenuItem variant="destructive" onSelect={() => openDeleteDialog(item)}>
              <Trash2Icon className="size-4" />
              {i18n.actions.delete}
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
