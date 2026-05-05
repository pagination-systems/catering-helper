import { TenantAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import { DownloadIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ITenant } from "@/features/admin/tenants/schemas/tenant.schema";
import { useTenantsStore } from "../store/useStore";

interface TableToolbarProps {
  filteredTenants: ITenant[];
}

export const TableToolbar = ({ filteredTenants }: TableToolbarProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const query = useTenantsStore((state) => state.query);
  const setQuery = useTenantsStore((state) => state.setQuery);

  const handleDownload = async () => {
    if (!filteredTenants.length || isDownloading) return;

    try {
      setIsDownloading(true);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[14rem] flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tenants..."
          className="pl-8"
        />
      </div>

      <Can I={AbilityAction.READ} a={TenantAuthZEntity}>
        <Button
          type="button"
          variant="secondary"
          onClick={handleDownload}
          disabled={!filteredTenants.length || isDownloading}
        >
          <DownloadIcon className="size-4" />
          {isDownloading ? "Preparing..." : "Download"}
        </Button>
      </Can>

      <Can I={AbilityAction.SEND_INVITATION} a={TenantAuthZEntity}>
        <Button type="button" className="ml-auto" onClick={() => console.log("Send invitation")}>
          <PlusIcon className="size-4" />
          Invite Tenant
        </Button>
      </Can>
    </div>
  );
};
