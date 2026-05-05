import { OrderAuthZEntity } from "@catering/authz";
import { BanIcon, EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Can } from "@/authz/ability-context";
import { If } from "@/components/if";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AbilityAction } from "../../../../../../packages/types/dist/ability-action";
import { useOrdersI18n } from "../lib/orders-i18n";
import { isOrderLocked } from "../lib/utils";
import type { IOrder } from "../schemas/order.schema";
import { useOrdersStore } from "../store/useStore";

interface RowActionsProps {
  item: IOrder;
}

export const RowActions = ({ item }: RowActionsProps) => {
  const i18n = useOrdersI18n();
  const openView = useOrdersStore((state) => state.openView);
  const openEdit = useOrdersStore((state) => state.openEdit);
  const openDeleteDialog = useOrdersStore((state) => state.openDeleteDialog);
  const openCancelDialog = useOrdersStore((state) => state.openCancelDialog);
  const locked = isOrderLocked(item.status);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={i18n.actions.openActionsFor.replace("{{orderNo}}", item.orderNo)}
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <Can I={AbilityAction.READ} a={OrderAuthZEntity}>
            <DropdownMenuItem onSelect={() => openView(item)}>
              <EyeIcon className="size-4" />
              {i18n.actions.view}
            </DropdownMenuItem>
          </Can>

          <DropdownMenuSeparator />
          <Can I={AbilityAction.UPDATE} a={OrderAuthZEntity}>
            <DropdownMenuItem disabled={locked} onSelect={() => openEdit(item)}>
              <PencilIcon className="size-4" />
              {i18n.actions.edit}
            </DropdownMenuItem>
          </Can>

          <DropdownMenuSeparator />

          <Can I={AbilityAction.UPDATE} a={OrderAuthZEntity}>
            <DropdownMenuItem disabled={locked} variant="destructive" onSelect={() => openCancelDialog(item)}>
              <BanIcon className="size-4" />
              {i18n.actions.cancel}
            </DropdownMenuItem>
          </Can>

          <DropdownMenuSeparator />

          <Can I={AbilityAction.HARD_DELETE} a={OrderAuthZEntity}>
            <DropdownMenuItem disabled={locked} variant="destructive" onSelect={() => openDeleteDialog(item)}>
              <Trash2Icon className="size-4" />
              {i18n.actions.delete}
            </DropdownMenuItem>
          </Can>

          <If expression={locked}>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>{item.status} orders cannot be changed</DropdownMenuItem>
          </If>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
