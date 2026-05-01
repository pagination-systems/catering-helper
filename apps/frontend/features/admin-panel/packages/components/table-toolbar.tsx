import { FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
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
import { PackageStatus } from "../schemas/package.schema";
import { usePackagesStore } from "../store/useStore";

export const TableToolbar = () => {
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
          placeholder="Search by package name, id, or description"
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
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          {Object.values(PackageStatus).map((status) => (
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
              Reset Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button type="button" className="ml-auto" onClick={openCreate}>
        <PlusIcon className="size-4" />
        Create Package
      </Button>
    </div>
  );
};
