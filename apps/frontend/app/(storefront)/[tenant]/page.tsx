import { StoreFront } from "@/features/storefront";
import { resolveTenantData } from "../data";

export default async function StoreFrontRoute({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const tenantData = resolveTenantData(tenant);

  return <StoreFront tenant={tenantData} />;
}
