import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as orderApi from "../api/order.api";
import { orderCache } from "../queries/order.cache";

export const useSoftDeleteOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => orderApi.softDeleteOrder(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries();
      return orderCache.optimisticSoftDelete(queryClient, id);
    },

    onError: (error: any, _id, context) => {
      orderCache.rollback(queryClient, context?.previous);
      toast.error(error?.message || "Failed to delete order");
    },

    onSuccess: ({ message }) => {
      toast.success(message);
    },
  });

  const deleteOrder = (id: string, callback?: () => void) => {
    mutation.mutate(id, {
      onSuccess: () => {
        callback?.();
      },
    });
  };

  return {
    deleteOrder,
    isDeleting: mutation.isPending,
  };
};
