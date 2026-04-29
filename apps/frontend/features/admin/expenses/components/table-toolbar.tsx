"use client";

import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
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
import type { IExpense } from "../schemas/expense.schema";
import { EXPENSE_CATEGORY_ENUM } from "../schemas/expense.schema";
import { useExpensesStore } from "../store/useStore";
import { downloadExpensesPdf } from "./expenses-pdf";

interface TableToolbarProps {
  filteredExpenses?: IExpense[];
}

export const TableToolbar = ({ filteredExpenses = [] }: TableToolbarProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const query = useExpensesStore((state) => state.query);
  const categoryFilter = useExpensesStore((state) => state.categoryFilter);
  const setQuery = useExpensesStore((state) => state.setQuery);
  const setCategoryFilter = useExpensesStore((state) => state.setCategoryFilter);
  const openCreate = useExpensesStore((state) => state.openCreate);

  const handleDownload = async () => {
    if (!filteredExpenses.length || isDownloading) return;

    try {
      setIsDownloading(true);
      await downloadExpensesPdf({ entries: filteredExpenses });
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
          placeholder="Search by label, description, category"
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
          <DropdownMenuLabel>Category</DropdownMenuLabel>
          {Object.values(EXPENSE_CATEGORY_ENUM).map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={categoryFilter === category}
              onCheckedChange={() => setCategoryFilter(category)}
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuSeparator />
          <div className="p-1">
            <Button type="button" variant="ghost" size="sm" className="w-full" onClick={() => setCategoryFilter("all")}>
              Reset Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        type="button"
        variant="secondary"
        onClick={handleDownload}
        disabled={!filteredExpenses.length || isDownloading}
      >
        <DownloadIcon className="size-4" />
        {isDownloading ? "Preparing..." : "Download"}
      </Button>

      <Button type="button" className="ml-auto" onClick={openCreate}>
        <PlusIcon className="size-4" />
        Add Expense
      </Button>
    </div>
  );
};
