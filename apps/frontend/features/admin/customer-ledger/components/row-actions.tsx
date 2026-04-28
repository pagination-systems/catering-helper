import { MoreHorizontalIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ICustomerLedger } from "../schemas/customer-ledger.schema";
import { useCustomerLedgerStore } from "../store/useStore";

interface RowActionsProps {
  item: ICustomerLedger;
}

export const RowActions = ({ item }: RowActionsProps) => {
  const openEdit = useCustomerLedgerStore((state) => state.openEdit);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label={`Open actions for ${item.customerName}`}>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onSelect={() => openEdit(item)} disabled={item.dueAmount <= 0}>
            <PencilIcon className="size-4" />
            Update Payment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
