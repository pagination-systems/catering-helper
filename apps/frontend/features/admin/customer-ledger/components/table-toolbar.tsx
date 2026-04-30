import { CustomerLedgerAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import { DownloadIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCustomerLedgerI18n } from "../lib/customer-ledger-i18n";
import type { ICustomerLedger } from "../schemas/customer-ledger.schema";
import { useCustomerLedgerStore } from "../store/useStore";
import { downloadCustomerLedgerPdf } from "./customer-ledger-pdf";

interface TableToolbarProps {
  filteredCustomers: ICustomerLedger[];
}

export const TableToolbar = ({ filteredCustomers }: TableToolbarProps) => {
  const i18n = useCustomerLedgerI18n();
  const [isDownloading, setIsDownloading] = useState(false);
  const query = useCustomerLedgerStore((state) => state.query);
  const setQuery = useCustomerLedgerStore((state) => state.setQuery);

  const handleDownload = async () => {
    if (!filteredCustomers.length || isDownloading) return;

    try {
      setIsDownloading(true);
      await downloadCustomerLedgerPdf({ entries: filteredCustomers, labels: i18n.pdf });
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
          placeholder={i18n.toolbar.searchPlaceholder}
          className="pl-8"
        />
      </div>

      <Can I={AbilityAction.READ} a={CustomerLedgerAuthZEntity}>
        <Button
          type="button"
          variant="secondary"
          onClick={handleDownload}
          disabled={!filteredCustomers.length || isDownloading}
        >
          <DownloadIcon className="size-4" />
          {isDownloading ? i18n.toolbar.downloadPreparing : i18n.toolbar.download}
        </Button>
      </Can>
    </div>
  );
};
