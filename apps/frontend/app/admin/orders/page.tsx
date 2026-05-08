import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Orders } from "@/features/admin/orders";
import { getOrders } from "@/features/admin/orders/api/order.api";
import { ORDER_KEYS } from "@/features/admin/orders/queries/order.keys";

export default async function OrdersRoute() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ORDER_KEYS.lists(),
    queryFn: () => getOrders(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Orders />
    </HydrationBoundary>
  );
}
