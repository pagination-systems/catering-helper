import { ExpenseAuthZEntity } from "@catering/authz";
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
import type { IExpense } from "../schemas/expense.schema";
import { useExpensesStore } from "../store/useStore";

interface RowActionsProps {
  item: IExpense;
}

export const RowActions = ({ item }: RowActionsProps) => {
  const openView = useExpensesStore((state) => state.openView);
  const openEdit = useExpensesStore((state) => state.openEdit);
  const openDeleteDialog = useExpensesStore((state) => state.openDeleteDialog);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label={`Open actions for ${item.label}`}>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <Can I={AbilityAction.READ} a={ExpenseAuthZEntity}>
            <DropdownMenuItem onSelect={() => openView(item)}>
              <EyeIcon className="size-4" />
              View
            </DropdownMenuItem>
          </Can>

          <DropdownMenuSeparator />

          <Can I={AbilityAction.UPDATE} a={ExpenseAuthZEntity}>
            <DropdownMenuItem onSelect={() => openEdit(item)}>
              <PencilIcon className="size-4" />
              Edit
            </DropdownMenuItem>
          </Can>

          <DropdownMenuSeparator />

          <Can I={AbilityAction.HARD_DELETE} a={ExpenseAuthZEntity}>
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
