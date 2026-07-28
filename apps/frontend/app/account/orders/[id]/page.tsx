import { CustomerOrderDetail } from "@/features/account/orders/order-detail";

export default async function AccountOrderDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CustomerOrderDetail id={id} />;
}
