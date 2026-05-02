import { OrderSuccess } from "@/features/storefront/order-success";

export default async function OrderSuccessRoute({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return <OrderSuccess tenant={tenant} />;
}
