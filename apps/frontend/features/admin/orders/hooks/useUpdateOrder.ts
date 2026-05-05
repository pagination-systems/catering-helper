import { ORDER_STATUS_ENUM } from "@catering/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as orderApi from "../api/order.api";
import { orderCache } from "../queries/order.cache";
import type { OrderFormInput } from "../schemas/order.schema";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: orderApi.updateOrder,

    onMutate: async (updatedOrder) => {
      await queryClient.cancelQueries();
      return orderCache.optimisticUpdate(queryClient, updatedOrder);
    },

    onError: (error: any, _vars, context) => {
      orderCache.rollback(queryClient, context?.previous);
      toast.error(error?.message || "Failed to update order");
    },

    onSuccess: ({ order, message }) => {
      orderCache.update(queryClient, order);
      toast.success(message);
    },
  });

  const updateOrder = ({ id, payload }: { id: string; payload: Partial<OrderFormInput> }, callback?: () => void) => {
    mutation.mutate(
      { id, payload },
      {
        onSuccess: () => {
          callback?.();
        },
      },
    );
  };

  const cancelOrder = (id: string, callback?: () => void) => {
    mutation.mutate(
      { id, payload: { status: ORDER_STATUS_ENUM.CANCELLED } },
      {
        onSuccess: () => {
          callback?.();
        },
      },
    );
  };

  return {
    updateOrder,
    cancelOrder,
    isUpdating: mutation.isPending,
  };
};
