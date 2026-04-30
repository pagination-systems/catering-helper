"use client";

import { ExpenseAuthZEntity } from "@catering/authz";
import { AbilityAction, EXPENSE_CATEGORY_ENUM } from "@catering/types";
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
import { useLanguage } from "@/providers/language-provider";
import { useExpensesI18n } from "../lib/expenses-i18n";
import type { IExpense } from "../schemas/expense.schema";
import { useExpensesStore } from "../store/useStore";
import { downloadExpensesPdf } from "./expenses-pdf";

interface TableToolbarProps {
  filteredExpenses?: IExpense[];
}

export const TableToolbar = ({ filteredExpenses = [] }: TableToolbarProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const i18n = useExpensesI18n();
  const { language } = useLanguage();

  const query = useExpensesStore((state) => state.query);
  const categoryFilter = useExpensesStore((state) => state.categoryFilter);
  const setQuery = useExpensesStore((state) => state.setQuery);
  const setCategoryFilter = useExpensesStore((state) => state.setCategoryFilter);
  const openCreate = useExpensesStore((state) => state.openCreate);

  const handleDownload = async () => {
    if (!filteredExpenses.length || isDownloading) return;

    try {
      setIsDownloading(true);
      await downloadExpensesPdf({ entries: filteredExpenses, lang: language });
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
          <DropdownMenuLabel>{i18n.toolbar.category}</DropdownMenuLabel>
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
              {i18n.toolbar.resetFilters}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Can I={AbilityAction.READ} a={ExpenseAuthZEntity}>
        <Button
          type="button"
          variant="secondary"
          onClick={handleDownload}
          disabled={!filteredExpenses.length || isDownloading}
        >
          <DownloadIcon className="size-4" />
          {isDownloading ? i18n.toolbar.downloadPreparing : i18n.toolbar.download}
        </Button>
      </Can>

      <Can I={AbilityAction.CREATE} a={ExpenseAuthZEntity}>
        <Button type="button" className="ml-auto" onClick={openCreate}>
          <PlusIcon className="size-4" />
          {i18n.toolbar.addExpense}
        </Button>
      </Can>
    </div>
  );
};
