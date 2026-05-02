"use client";

import { BookUserIcon } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import { interpolate, useCustomerLedgerI18n } from "../lib/customer-ledger-i18n";
import type { GetCustomerLedgerResponse, ICustomerLedger } from "../schemas/customer-ledger.schema";
import { useCustomerLedgerStore } from "../store/useStore";
import { RowActions } from "./row-actions";

interface CustomerLedgerTableProps {
  data: GetCustomerLedgerResponse;
  handlePaginate?: (payload: { page: number; limit: number }) => void;
}

export const CustomerLedgerTable = ({ data, handlePaginate }: CustomerLedgerTableProps) => {
  const i18n = useCustomerLedgerI18n();
  const openEdit = useCustomerLedgerStore((state) => state.openEdit);

  const columns: DataTableColumn<ICustomerLedger>[] = [
    {
      accessorKey: "customerName",
      header: i18n.table.customer,
      cell: (item) =>
        item.dueAmount > 0 ? (
          <button
            type="button"
            className="font-medium text-left text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => openEdit(item)}
            aria-label={interpolate(i18n.table.updatePaymentFor, { customerName: item.customerName })}
          >
            {item.customerName}
          </button>
        ) : (
          <p className="font-medium">{item.customerName}</p>
        ),
    },
    {
      accessorKey: "customerPhone",
      header: i18n.table.phoneNumber,
      cell: (item) => <p>{item.customerPhone}</p>,
    },
    {
      accessorKey: "totalAmount",
      header: i18n.table.totalAmount,
      cell: (item) => formatCurrency(item.totalAmount),
    },
    {
      accessorKey: "totalPaidAmount",
      header: i18n.table.totalPaid,
      cell: (item) => <span className="font-medium text-emerald-700">{formatCurrency(item.totalPaidAmount)}</span>,
    },
    {
      accessorKey: "dueAmount",
      header: i18n.table.dueAmount,
      cell: (item) => (
        <span className={item.dueAmount > 0 ? "font-medium text-destructive" : "font-medium text-emerald-700"}>
          {formatCurrency(item.dueAmount)}
        </span>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: i18n.table.lastUpdated,
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
      data={data.data}
      columns={columns}
      pagination={data.meta.pagination}
      handlePaginate={handlePaginate}
      getRowId={(item) => item.id}
      emptyState={
        <div className="flex flex-col items-center gap-2">
          <BookUserIcon className="size-5" />
          {i18n.table.noEntries}
        </div>
      }
    />
  );
};
