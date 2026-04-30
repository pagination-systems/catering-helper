"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SectionHeader } from "../components/section-header";
import { DeleteConfirmation } from "./components/delete-confirmation";
import { ExpenseDetails } from "./components/expense-details";
import { ExpenseForm } from "./components/expense-form";
import { ExpenseTable } from "./components/expense-table";
import { TableToolbar } from "./components/table-toolbar";
import { useExpensesI18n } from "./lib/expenses-i18n";
import type { CreateExpenseValues, IExpense } from "./schemas/expense.schema";
import { useExpensesStore } from "./store/useStore";

const buildFormValuesFromExpense = (expense: IExpense): CreateExpenseValues => {
  const year = expense.date.getFullYear();
  const month = String(expense.date.getMonth() + 1).padStart(2, "0");
  const day = String(expense.date.getDate()).padStart(2, "0");
  const dateValue = `${year}-${month}-${day}`;

  return {
    label: expense.label,
    description: expense.description,
    date: dateValue,
    category: expense.category,
    amount: expense.amount,
  };
};

export const Expenses = () => {
  const i18n = useExpensesI18n();
  const list = useExpensesStore((s) => s.list);
  const query = useExpensesStore((s) => s.query);
  const categoryFilter = useExpensesStore((s) => s.categoryFilter);
  const isCreateSheetOpen = useExpensesStore((s) => s.isCreateSheetOpen);
  const isEditSheetOpen = useExpensesStore((s) => s.isEditSheetOpen);
  const isViewSheetOpen = useExpensesStore((s) => s.isViewSheetOpen);
  const selectedItem = useExpensesStore((s) => s.selectedItem);
  const selectedViewItem = useExpensesStore((s) => s.selectedViewItem);
  const setCreateSheetOpen = useExpensesStore((s) => s.setCreateSheetOpen);
  const setEditSheetOpen = useExpensesStore((s) => s.setEditSheetOpen);
  const setViewSheetOpen = useExpensesStore((s) => s.setViewSheetOpen);
  const closeCreateSheet = useExpensesStore((s) => s.closeCreateSheet);
  const closeEditSheet = useExpensesStore((s) => s.closeEditSheet);
  const closeViewSheet = useExpensesStore((s) => s.closeViewSheet);
  const addExpense = useExpensesStore((s) => s.addExpense);
  const updateExpense = useExpensesStore((s) => s.updateExpense);

  const filteredExpenses = useMemo(() => {
    const queryText = query.trim().toLowerCase();

    return list.filter((expense) => {
      if (categoryFilter !== "all" && expense.category !== categoryFilter) {
        return false;
      }

      if (!queryText) {
        return true;
      }

      const searchable = [expense.label, expense.description, expense.category].join(" ").toLowerCase();

      return searchable.includes(queryText);
    });
  }, [list, query, categoryFilter]);

  const onSubmitCreateExpense = (values: CreateExpenseValues) => {
    addExpense(values);
    closeCreateSheet();
  };

  const onSubmitEditExpense = (values: CreateExpenseValues) => {
    if (!selectedItem) return;

    updateExpense(selectedItem.id, values);
    closeEditSheet();
  };

  return (
    <section className="space-y-4" aria-labelledby="expenses-title">
      <SectionHeader title={i18n.title} description={i18n.description} />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar filteredExpenses={filteredExpenses} />
        </CardHeader>

        <CardContent className="space-y-4">
          <ExpenseTable data={filteredExpenses} />
        </CardContent>
      </Card>

      <Sheet open={isCreateSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent side="right" className="w-full sm:!max-w-[640px]">
          <SheetHeader>
            <SheetTitle>{i18n.sheet.createTitle}</SheetTitle>
            <SheetDescription>{i18n.sheet.createDescription}</SheetDescription>
          </SheetHeader>

          <ExpenseForm onSubmit={onSubmitCreateExpense} submitLabel={i18n.form.submitCreate} />
        </SheetContent>
      </Sheet>

      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="w-full sm:!max-w-[640px]">
          <SheetHeader>
            <SheetTitle>{i18n.sheet.editTitle}</SheetTitle>
            <SheetDescription>{i18n.sheet.editDescription}</SheetDescription>
          </SheetHeader>

          <ExpenseForm
            onSubmit={onSubmitEditExpense}
            initialValues={selectedItem ? buildFormValuesFromExpense(selectedItem) : undefined}
            submitLabel={i18n.form.submitSave}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isViewSheetOpen} onOpenChange={(open) => (open ? setViewSheetOpen(true) : closeViewSheet())}>
        <SheetContent side="right" className="w-full sm:!max-w-[520px]">
          <SheetHeader>
            <SheetTitle>{i18n.sheet.detailsTitle}</SheetTitle>
            <SheetDescription>{i18n.sheet.detailsDescription}</SheetDescription>
          </SheetHeader>

          {selectedViewItem ? (
            <ExpenseDetails item={selectedViewItem} />
          ) : (
            <p className="p-4 text-sm text-muted-foreground">{i18n.sheet.noExpenseSelected}</p>
          )}
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
    </section>
  );
};
