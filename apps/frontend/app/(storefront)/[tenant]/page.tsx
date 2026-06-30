import { notFound } from "next/navigation";
import { StoreFront } from "@/features/storefront";
import { getTenantData } from "../data";

export default async function StoreFrontRoute({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const tenantData = await getTenantData(tenant);

  if (!tenantData) {
    notFound();
  }

  return <StoreFront tenant={tenantData} />;
}
