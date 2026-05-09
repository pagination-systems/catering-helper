import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as expenseApi from "../api/expense.api";
import { EXPENSE_KEYS } from "../queries/expense.keys";
import type { ExpenseFormInput } from "../schemas/expense.schema";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: expenseApi.createExpense,
    onError: (error) => {
      toast.error(error.message || "Failed to create expense");
    },
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.lists() });
    },
  });

  const createExpense = (data: ExpenseFormInput, callback?: () => void) => {
    mutation.mutate(data, { onSuccess: () => callback?.() });
  };

  return { createExpense, isCreating: mutation.isPending };
};
