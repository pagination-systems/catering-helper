import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as orderApi from "../api/order.api";
import { ORDER_KEYS } from "../queries/order.keys";
import type { OrderFormInput } from "../schemas/order.schema";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: orderApi.createOrder,

    onError: (error: any) => {
      toast.error(error?.message || "Failed to create order");
    },

    onSuccess: ({ message }) => {
      toast.success(message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.lists() });
    },
  });

  const createOrder = (orderData: OrderFormInput, callback?: () => void) => {
    mutation.mutate(orderData, {
      onSuccess: () => {
        callback?.();
      },
    });
  };

  return {
    createOrder,
    isCreating: mutation.isPending,
  };
};
