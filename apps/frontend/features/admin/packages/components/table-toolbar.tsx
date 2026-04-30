import { PackageAuthZEntity } from "@catering/authz";
import { AbilityAction, PACKAGE_STATUS_ENUM } from "@catering/types";
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
import { usePackagesI18n } from "../lib/packages-i18n";
import { usePackagesStore } from "../store/useStore";

export const TableToolbar = () => {
  const i18n = usePackagesI18n();
  const query = usePackagesStore((state) => state.query);
  const statusFilter = usePackagesStore((state) => state.statusFilter);
  const setQuery = usePackagesStore((state) => state.setQuery);
  const setStatusFilter = usePackagesStore((state) => state.setStatusFilter);
  const openCreate = usePackagesStore((state) => state.openCreate);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[14rem] flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={i18n.toolbar.searchPlaceholder}
          className="pl-8"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" type="button">
            <FilterIcon className="size-4" />
            {i18n.toolbar.filter}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>{i18n.toolbar.status}</DropdownMenuLabel>
          {Object.values(PACKAGE_STATUS_ENUM).map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={statusFilter === status}
              onCheckedChange={() => setStatusFilter(status)}
            >
              {status}
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuSeparator />
          <div className="p-1">
            <Button type="button" variant="ghost" size="sm" className="w-full" onClick={() => setStatusFilter("all")}>
              {i18n.toolbar.resetFilters}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Can I={AbilityAction.CREATE} a={PackageAuthZEntity}>
        <Button type="button" className="ml-auto" onClick={openCreate}>
          <PlusIcon className="size-4" />
          {i18n.toolbar.createPackage}
        </Button>
      </Can>
    </div>
  );
};
