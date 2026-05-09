import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as expenseApi from "../api/expense.api";
import { expenseCache } from "../queries/expense.cache";
import type { UpdateExpenseInput } from "../schemas/expense.schema";

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: expenseApi.updateExpense,

    onMutate: async (vars) => {
      await queryClient.cancelQueries();
      return expenseCache.optimisticUpdate(queryClient, vars);
    },

    onError: (error, _vars, context) => {
      expenseCache.rollback(queryClient, context?.previous);
      toast.error(error.message || "Failed to update expense");
    },

    onSuccess: ({ item: updated, message }) => {
      expenseCache.update(queryClient, updated);
      toast.success(message);
    },
  });

  const updateExpense = (
    { id, payload }: { id: string; payload: Partial<UpdateExpenseInput> },
    callback?: () => void,
  ) => {
    mutation.mutate({ id, payload }, { onSuccess: () => callback?.() });
  };

  return { updateExpense, isUpdating: mutation.isPending };
};
