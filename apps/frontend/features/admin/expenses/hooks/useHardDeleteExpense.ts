import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as expenseApi from "../api/expense.api";
import { expenseCache } from "../queries/expense.cache";

export const useHardDeleteExpense = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => expenseApi.hardDeleteExpense(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries();
      return expenseCache.optimisticHardDelete(queryClient, id);
    },

    onError: (error, _id, context) => {
      expenseCache.rollback(queryClient, context?.previous);
      toast.error(error.message || "Failed to delete expense");
    },

    onSuccess: ({ message }) => {
      toast.success(message);
    },
  });

  const deleteExpense = (id: string, callback?: () => void) => {
    mutation.mutate(id, { onSuccess: () => callback?.() });
  };

  return { deleteExpense, isDeleting: mutation.isPending };
};
