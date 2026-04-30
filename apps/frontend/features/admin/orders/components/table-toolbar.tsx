import { OrderAuthZEntity } from "@catering/authz";
import { AbilityAction, ORDER_STATUS_ENUM } from "@catering/types";
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
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
import { useOrdersI18n } from "../lib/orders-i18n";
import type { IOrder } from "../schemas/order.schema";

import { useOrdersStore } from "../store/useStore";
import { downloadOrdersPdf } from "./orders-pdf";

interface TableToolbarProps {
  filteredOrders: IOrder[];
  activeDay: string;
}

export const TableToolbar = ({ filteredOrders, activeDay }: TableToolbarProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const i18n = useOrdersI18n();
  const query = useOrdersStore((state) => state.query);
  const statusFilter = useOrdersStore((state) => state.statusFilter);
  const setQuery = useOrdersStore((state) => state.setQuery);
  const setStatusFilter = useOrdersStore((state) => state.setStatusFilter);
  const openCreate = useOrdersStore((state) => state.openCreate);

  const handleDownload = async () => {
    if (!filteredOrders.length || isDownloading) return;

    try {
      setIsDownloading(true);
      await downloadOrdersPdf({ orders: filteredOrders, activeDay, i18n });
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" type="button">
            <FilterIcon className="size-4" />
            {i18n.toolbar.filter}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>{i18n.toolbar.status}</DropdownMenuLabel>
          {Object.values(ORDER_STATUS_ENUM).map((status) => (
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

      <Can I={AbilityAction.READ} a={OrderAuthZEntity}>
        <Button
          type="button"
          variant="secondary"
          onClick={handleDownload}
          disabled={!filteredOrders.length || isDownloading}
        >
          <DownloadIcon className="size-4" />
          {isDownloading ? i18n.toolbar.downloadPreparing : i18n.toolbar.download}
        </Button>
      </Can>

      <Can I={AbilityAction.CREATE} a={OrderAuthZEntity}>
        <Button type="button" className="ml-auto" onClick={openCreate}>
          <PlusIcon className="size-4" />
          {i18n.toolbar.createOrder}
        </Button>
      </Can>
    </div>
  );
};
