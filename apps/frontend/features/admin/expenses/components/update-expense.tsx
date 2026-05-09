import { If } from "@/components/if";
import { useLanguage } from "@/providers/language-provider";
import { Loader } from "../../components/loader";
import { useExpense, useUpdateExpense } from "../hooks";
import { useExpensesI18n } from "../lib/expenses-i18n";
import type { IExpense } from "../schemas/expense.schema";
import { useExpensesStore } from "../store/useStore";
import { ExpenseForm } from "./expense-form";

interface UpdateExpenseProps {
  selectedItem: IExpense;
}

export const UpdateExpense = ({ selectedItem }: UpdateExpenseProps) => {
  const i18n = useExpensesI18n();
  const { language } = useLanguage();
  const closeEditSheet = useExpensesStore((state) => state.closeEditSheet);
  const { expense, isGettingExpense } = useExpense(selectedItem.id);
  const { updateExpense } = useUpdateExpense();

  return (
    <If expression={!isGettingExpense} fallback={<Loader />}>
      <ExpenseForm
        key={`${language}-edit`}
        onSubmit={(values) => {
          if (!selectedItem.id) return;
          updateExpense({ id: selectedItem.id, payload: values }, closeEditSheet);
        }}
        initialValues={expense}
        submitLabel={i18n.form.submitSave}
      />
    </If>
  );
};
