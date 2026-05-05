"use client";

import { ClipboardListIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DataTable, type DataTableColumn } from "../../components/data-table";
import { useExpensesI18n } from "../lib/expenses-i18n";
import type { IExpense } from "../schemas/expense.schema";
import { useExpensesStore } from "../store/useStore";
import { getCategoryBadgeStyles } from "../utils/badge";
import { RowActions } from "./row-actions";

interface ExpenseTableProps {
  data: IExpense[];
  handlePaginate?: (page: number, limit: number) => void;
}

export const ExpenseTable = ({ data, handlePaginate }: ExpenseTableProps) => {
  const openView = useExpensesStore((s) => s.openView);
  const i18n = useExpensesI18n();

  const columns: DataTableColumn<IExpense>[] = [
    {
      accessorKey: "label",
      header: i18n.table.label,
      cell: (item) => (
        <button
          type="button"
          onClick={() => openView(item)}
          className="text-left font-medium text-foreground transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {item.label}
        </button>
      ),
    },
    {
      accessorKey: "category",
      header: i18n.table.category,
      cell: (item) => (
        <Badge variant="outline" className={getCategoryBadgeStyles(item.category)}>
          {i18n.categories[item.category] ?? item.category}
        </Badge>
      ),
    },
    {
      accessorKey: "amount",
      header: i18n.table.amount,
      cell: (item) => formatCurrency(item.amount),
    },
    {
      accessorKey: "date",
      header: i18n.table.date,
      cell: (item) => formatDate(item.date),
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
      pagination={{
        totalDocs: data.length,
        limit: 10,
        hasPrevPage: false,
        hasNextPage: false,
        page: 1,
        totalPages: Math.max(1, Math.ceil(data.length / 10)),
        prevPage: null,
        nextPage: null,
        pagingCounter: 1,
      }}
      handlePaginate={handlePaginate}
      getRowId={(item) => item.id}
      emptyState={
        <div className="flex flex-col items-center gap-2">
          <ClipboardListIcon className="size-5" />
          {i18n.table.noExpenses}
        </div>
      }
    />
  );
};
