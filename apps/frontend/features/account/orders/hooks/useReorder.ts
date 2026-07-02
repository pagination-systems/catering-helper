import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeOrder } from "@/features/storefront/api/order.api";
import { toast } from "@/lib/toast";
import { nextDateForDay } from "../lib/order-status";
import { CUSTOMER_ORDER_KEYS } from "../queries/order.keys";
import type { CustomerOrder } from "../schemas/order.schema";

/**
 * Places a fresh copy of a previous order through the caterer's public
 * storefront. Prices are re-resolved server-side, so a reorder always reflects
 * the current catalog. Requires the order to carry its tenant slug.
 */
export const useReorder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (order: CustomerOrder) => {
      if (!order.tenantSlug) {
        throw new Error("This order can't be reordered.");
      }

      return placeOrder(order.tenantSlug, {
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        deliveryAddress: order.deliveryAddress,
        notes: order.notes,
        packageName: order.packageName,
        deliveryDate: nextDateForDay(order.deliveryDay),
        items: order.items.map((item) => ({
          packageId: item.packageId,
          variantName: item.variantName,
          quantity: item.quantity,
          items: item.items,
        })),
      });
    },
    onSuccess: (result) => {
      toast.success(result.message || "Order placed again.");
      queryClient.invalidateQueries({ queryKey: CUSTOMER_ORDER_KEYS.lists() });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Could not place your order again.");
    },
  });

  return { reorder: mutation.mutateAsync, isReordering: mutation.isPending };
};
