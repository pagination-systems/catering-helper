import { Checkout } from "@/features/storefront/checkout";
import { getTenantData } from "../../data";

export default async function CheckoutRoute({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const tenantData = await getTenantData(tenant);
  return <Checkout tenant={tenant} deliveryFee={tenantData?.deliveryFee ?? 0} />;
}
