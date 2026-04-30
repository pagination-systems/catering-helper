import { UserAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCustomersI18n } from "../lib/customers-i18n";
import { useCustomersStore } from "../store/useStore";

export const TableToolbar = () => {
  const i18n = useCustomersI18n();
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
          placeholder={i18n.toolbar.searchPlaceholder}
          className="pl-8"
        />
      </div>

      <Can I={AbilityAction.CREATE} a={UserAuthZEntity}>
        <Button type="button" className="ml-auto" onClick={openCreate}>
          <PlusIcon className="size-4" />
          {i18n.toolbar.createCustomer}
        </Button>
      </Can>
    </div>
  );
};
