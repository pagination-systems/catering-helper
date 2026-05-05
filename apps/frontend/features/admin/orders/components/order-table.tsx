"use client";

import type { PaginationMeta } from "@catering/types";
import { ClipboardListIcon } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import { getOrderStatusBadgeClassName } from "../lib/badge";
import { useOrdersI18n } from "../lib/orders-i18n";
import type { IOrder } from "../schemas/order.schema";
import { useOrdersStore } from "../store/useStore";
import { RowActions } from "./row-actions";

interface OrderTableProps {
  data: IOrder[];
  pagination: PaginationMeta;
  handlePaginate?: (page: number, limit: number) => void;
}

export const OrderTable = ({ data, pagination, handlePaginate }: OrderTableProps) => {
  const i18n = useOrdersI18n();
  const openView = useOrdersStore((state) => state.openView);

  const columns: DataTableColumn<IOrder>[] = [
    {
      accessorKey: "orderNo",
      header: i18n.table.orderNo,
      cell: (item) => (
        <div className="space-y-0.5">
          <button
            type="button"
            onClick={() => openView(item)}
            className="w-fit text-left font-medium text-foreground transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {item.orderNo}
          </button>
          <div className="text-xs text-muted-foreground">{item.source}</div>
        </div>
      ),
    },
    {
      id: "customer",
      header: i18n.table.customer,
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-medium">{item.customerName}</p>
          <p className="text-xs text-muted-foreground">{item.customerPhone}</p>
        </div>
      ),
    },
    {
      id: "delivery",
      header: i18n.details.delivery,
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-medium">{item.deliveryDay}</p>
          <p className="text-xs text-muted-foreground">{formatDate(item.deliveryDate)}</p>
        </div>
      ),
    },
    {
      accessorKey: "totalMeals",
      header: i18n.table.meals,
      cell: (item) => (
        <div>
          <p className="font-medium">{item.totalMeals}</p>
          <p className="text-xs text-muted-foreground">{item.items.length} variant(s)</p>
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: i18n.table.amount,
      cell: (item) => formatCurrency(item.total),
    },
    {
      accessorKey: "status",
      header: i18n.table.status,
      cell: (item) => (
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getOrderStatusBadgeClassName(item.status)}`}
        >
          {item.status}
        </span>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: i18n.details.lastUpdated,
      cell: (item) => formatDate(item.updatedAt),
    },
    {
      id: "actions",
      header: i18n.table.actions,
      cell: (item) => <RowActions item={item} />,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      pagination={pagination}
      handlePaginate={handlePaginate}
      getRowId={(item) => item.id}
      emptyState={
        <div className="flex flex-col items-center gap-2">
          <ClipboardListIcon className="size-5" />
          {i18n.table.noOrders}
        </div>
      }
    />
  );
};
