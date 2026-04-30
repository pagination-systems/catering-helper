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
import { interpolate, useExpensesI18n } from "../lib/expenses-i18n";
import type { IExpense } from "../schemas/expense.schema";
import { useExpensesStore } from "../store/useStore";

interface RowActionsProps {
  item: IExpense;
}

export const RowActions = ({ item }: RowActionsProps) => {
  const i18n = useExpensesI18n();
  const openView = useExpensesStore((state) => state.openView);
  const openEdit = useExpensesStore((state) => state.openEdit);
  const openDeleteDialog = useExpensesStore((state) => state.openDeleteDialog);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={interpolate(i18n.actions.openActionsFor, { label: item.label })}
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <Can I={AbilityAction.READ} a={ExpenseAuthZEntity}>
            <DropdownMenuItem onSelect={() => openView(item)}>
              <EyeIcon className="size-4" />
              {i18n.actions.view}
            </DropdownMenuItem>
          </Can>

          <DropdownMenuSeparator />

          <Can I={AbilityAction.UPDATE} a={ExpenseAuthZEntity}>
            <DropdownMenuItem onSelect={() => openEdit(item)}>
              <PencilIcon className="size-4" />
              {i18n.actions.edit}
            </DropdownMenuItem>
          </Can>

          <DropdownMenuSeparator />

          <Can I={AbilityAction.HARD_DELETE} a={ExpenseAuthZEntity}>
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
