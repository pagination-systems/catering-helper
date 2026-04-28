import { BanIcon, EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type IOrder, isOrderLocked } from "../schemas/order.schema";
import { useOrdersStore } from "../store/useStore";

interface RowActionsProps {
  item: IOrder;
}

export const RowActions = ({ item }: RowActionsProps) => {
  const openView = useOrdersStore((state) => state.openView);
  const openEdit = useOrdersStore((state) => state.openEdit);
  const openDeleteDialog = useOrdersStore((state) => state.openDeleteDialog);
  const openCancelDialog = useOrdersStore((state) => state.openCancelDialog);
  const locked = isOrderLocked(item.status);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label={`Open actions for ${item.orderNo}`}>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem onSelect={() => openView(item)}>
            <EyeIcon className="size-4" />
            View
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem disabled={locked} onSelect={() => openEdit(item)}>
            <PencilIcon className="size-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem disabled={locked} variant="destructive" onSelect={() => openCancelDialog(item)}>
            <BanIcon className="size-4" />
            Mark as Cancelled
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem disabled={locked} variant="destructive" onSelect={() => openDeleteDialog(item)}>
            <Trash2Icon className="size-4" />
            Delete
          </DropdownMenuItem>

          {locked && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>{item.status} orders cannot be changed</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
