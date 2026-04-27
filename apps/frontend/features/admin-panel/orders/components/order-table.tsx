"use client";

import { ClipboardListIcon } from "lucide-react";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import type { GetOrdersResponse, IOrder } from "../schemas/order.schema";
import { useOrdersStore } from "../store/useStore";
import { getOrderStatusBadgeClassName } from "../utils/badge";
import { RowActions } from "./row-actions";

interface OrderTableProps {
  data: GetOrdersResponse;
  handlePaginate?: (payload: { page: number; limit: number }) => void;
}

const bdt = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-BD", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const OrderTable = ({ data, handlePaginate }: OrderTableProps) => {
  const openView = useOrdersStore((state) => state.openView);

  const columns: DataTableColumn<IOrder>[] = [
    {
      accessorKey: "orderNo",
      header: "Order",
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
      header: "Customer",
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-medium">{item.customerName}</p>
          <p className="text-xs text-muted-foreground">{item.customerPhone}</p>
        </div>
      ),
    },
    {
      id: "delivery",
      header: "Delivery",
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-medium">{item.deliveryDay}</p>
          <p className="text-xs text-muted-foreground">{dateFormatter.format(item.deliveryDate)}</p>
        </div>
      ),
    },
    {
      accessorKey: "totalMeals",
      header: "Meals",
      cell: (item) => (
        <div>
          <p className="font-medium">{item.totalMeals}</p>
          <p className="text-xs text-muted-foreground">{item.items.length} variant(s)</p>
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: "Amount",
      cell: (item) => bdt.format(item.total),
    },
    {
      accessorKey: "status",
      header: "Status",
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
      header: "Last Updated",
      cell: (item) => dateFormatter.format(item.updatedAt),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (item) => <RowActions item={item} />,
    },
  ];

  return (
    <DataTable
      data={data.data}
      columns={columns}
      pagination={data.meta.pagination}
      handlePaginate={handlePaginate}
      getRowId={(item) => item.id}
      emptyState={
        <div className="flex flex-col items-center gap-2">
          <ClipboardListIcon className="size-5" />
          No orders found for your current query and filters.
        </div>
      }
    />
  );
};
