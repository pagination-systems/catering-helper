import { DownloadIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ICustomerLedger } from "../schemas/customer-ledger.schema";
import { useCustomerLedgerStore } from "../store/useStore";
import { downloadCustomerLedgerPdf } from "./customer-ledger-pdf";

interface TableToolbarProps {
  filteredCustomers: ICustomerLedger[];
}

export const TableToolbar = ({ filteredCustomers }: TableToolbarProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const query = useCustomerLedgerStore((state) => state.query);
  const setQuery = useCustomerLedgerStore((state) => state.setQuery);

  const handleDownload = async () => {
    if (!filteredCustomers.length || isDownloading) return;

    try {
      setIsDownloading(true);
      await downloadCustomerLedgerPdf({ entries: filteredCustomers });
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
          placeholder="Search by customer name or phone"
          className="pl-8"
        />
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={handleDownload}
        disabled={!filteredCustomers.length || isDownloading}
      >
        <DownloadIcon className="size-4" />
        {isDownloading ? "Preparing..." : "Download"}
      </Button>
    </div>
  );
};
