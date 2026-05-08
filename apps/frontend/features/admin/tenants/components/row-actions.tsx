import { TenantAuthZEntity } from "@catering/authz";
import { EyeIcon, MoreHorizontalIcon, PauseCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AbilityAction } from "../../../../../../packages/types/dist/ability-action";
import type { ITenant } from "../schemas/tenant.schema";

interface RowActionsProps {
  item: ITenant;
}

export const RowActions = ({ item }: RowActionsProps) => {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="Open actions menu">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <Can I={AbilityAction.READ} a={TenantAuthZEntity}>
            <DropdownMenuItem asChild>
              <Link href={`/admin/tenants/${item.id}`}>
                <EyeIcon className="size-4" />
                View
              </Link>
            </DropdownMenuItem>
          </Can>

          <DropdownMenuSeparator />
          <Can I={AbilityAction.UPDATE} a={TenantAuthZEntity}>
            <DropdownMenuItem onSelect={() => console.log("Terminate tenant", item.id)}>
              <XCircle className="size-4" />
              Terminate
            </DropdownMenuItem>
          </Can>

          <DropdownMenuSeparator />
          <Can I={AbilityAction.UPDATE} a={TenantAuthZEntity}>
            <DropdownMenuItem onSelect={() => console.log("Suspended tenant", item.id)}>
              <PauseCircle className="size-4" />
              Suspend
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
