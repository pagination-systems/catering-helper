import { notFound } from "next/navigation";
import { StoreFront } from "@/features/storefront";
import { getTenantData, getTenantPackages } from "../data";

export default async function StoreFrontRoute({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const [tenantData, packages] = await Promise.all([getTenantData(tenant), getTenantPackages(tenant)]);

  if (!tenantData) {
    notFound();
  }

  return <StoreFront tenant={tenantData} packages={packages} />;
}
