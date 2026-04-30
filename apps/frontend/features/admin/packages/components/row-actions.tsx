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
import type { ICateringPackage } from "../schemas/package.schema";
import { usePackagesStore } from "../store/useStore";

interface RowActionsProps {
  item: ICateringPackage;
}

export const RowActions = ({ item }: RowActionsProps) => {
  const openView = usePackagesStore((state) => state.openView);
  const openEdit = usePackagesStore((state) => state.openEdit);
  const openDeleteDialog = usePackagesStore((state) => state.openDeleteDialog);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label={`Open actions for ${item.name}`}>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <Can I={AbilityAction.READ} a={PackageAuthZEntity}>
            <DropdownMenuItem onSelect={() => openView(item)}>
              <EyeIcon className="size-4" />
              View
            </DropdownMenuItem>
          </Can>
          <DropdownMenuSeparator />
          <Can I={AbilityAction.UPDATE} a={PackageAuthZEntity}>
            <DropdownMenuItem onSelect={() => openEdit(item)}>
              <PencilIcon className="size-4" />
              Edit
            </DropdownMenuItem>
          </Can>
          <DropdownMenuSeparator />
          <Can I={AbilityAction.HARD_DELETE} a={PackageAuthZEntity}>
            <DropdownMenuItem variant="destructive" onSelect={() => openDeleteDialog(item)}>
              <Trash2Icon className="size-4" />
              Delete
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
