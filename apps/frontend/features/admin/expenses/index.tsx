"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLanguage } from "@/providers/language-provider";
import { SectionHeader } from "../components/section-header";
import { DeleteConfirmation } from "./components/delete-confirmation";
import { ExpenseDetails } from "./components/expense-details";
import { ExpenseForm } from "./components/expense-form";
import { ExpenseTable } from "./components/expense-table";
import { TableToolbar } from "./components/table-toolbar";
import { UpdateExpense } from "./components/update-expense";
import { useCreateExpense } from "./hooks/useCreateExpense";
import { useExpenses } from "./hooks/useExpenses";
import { useExpensesI18n } from "./lib/expenses-i18n";
import { useExpensesStore } from "./store/useStore";

interface ExpensesProps {
  tenantId?: string;
}

export const Expenses = ({ tenantId }: ExpensesProps) => {
  const i18n = useExpensesI18n();
  const { language } = useLanguage();
  const { expenses, pagination, onSearch, handlePagination } = useExpenses(tenantId);

  const isCreateSheetOpen = useExpensesStore((s) => s.isCreateSheetOpen);
  const isEditSheetOpen = useExpensesStore((s) => s.isEditSheetOpen);
  const isViewSheetOpen = useExpensesStore((s) => s.isViewSheetOpen);
  const selectedItem = useExpensesStore((s) => s.selectedItem);
  const selectedViewItem = useExpensesStore((s) => s.selectedViewItem);
  const setCreateSheetOpen = useExpensesStore((s) => s.setCreateSheetOpen);
  const setEditSheetOpen = useExpensesStore((s) => s.setEditSheetOpen);
  const setViewSheetOpen = useExpensesStore((s) => s.setViewSheetOpen);
  const closeCreateSheet = useExpensesStore((s) => s.closeCreateSheet);
  const closeViewSheet = useExpensesStore((s) => s.closeViewSheet);

  const { createExpense, isCreating } = useCreateExpense();

  return (
    <section className="space-y-4" aria-labelledby="expenses-title">
      <SectionHeader title={i18n.title} description={i18n.description} />

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar expenses={expenses} onSearch={onSearch} />
        </CardHeader>

        <CardContent className="space-y-4">
          <ExpenseTable data={expenses} pagination={pagination} handlePaginate={handlePagination} />
        </CardContent>
      </Card>

      <Sheet open={isCreateSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent side="right" className="w-full sm:!max-w-[640px]">
          <SheetHeader>
            <SheetTitle>{i18n.sheet.createTitle}</SheetTitle>
            <SheetDescription>{i18n.sheet.createDescription}</SheetDescription>
          </SheetHeader>
          <ExpenseForm
            key={`${language}-create`}
            onSubmit={(values) => createExpense(values, closeCreateSheet)}
            submitLabel={isCreating ? undefined : i18n.form.submitCreate}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="w-full sm:!max-w-[640px]">
          <SheetHeader>
            <SheetTitle>{i18n.sheet.editTitle}</SheetTitle>
            <SheetDescription>{i18n.sheet.editDescription}</SheetDescription>
          </SheetHeader>
          {selectedItem && <UpdateExpense selectedItem={selectedItem} />}
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
