import { Checkout } from "@/features/storefront/checkout";

export default async function CheckoutRoute({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return <Checkout tenant={tenant} />;
}
