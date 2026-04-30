import { UserAuthZEntity } from "@catering/authz";
import { AbilityAction, USER_ROLE_ENUM } from "@catering/types";
import { FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useCustomersStore } from "../store/useStore";

export const TableToolbar = () => {
  const query = useCustomersStore((state) => state.query);
  const setQuery = useCustomersStore((state) => state.setQuery);
  const openCreate = useCustomersStore((state) => state.openCreate);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[14rem] flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, email or id"
          className="pl-8"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" type="button">
            <FilterIcon className="size-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>Role</DropdownMenuLabel>
          {Object.values(USER_ROLE_ENUM).map((role) => (
            <DropdownMenuCheckboxItem key={role} checked={false} onCheckedChange={() => {}}>
              {role}
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Status</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <div className="p-1">
            <Button type="button" variant="ghost" size="sm" className="w-full" onClick={() => {}}>
              Reset Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Can I={AbilityAction.CREATE} a={UserAuthZEntity}>
        <Button type="button" className="ml-auto" onClick={openCreate}>
          <PlusIcon className="size-4" />
          Create Customer
        </Button>
      </Can>
    </div>
  );
};
