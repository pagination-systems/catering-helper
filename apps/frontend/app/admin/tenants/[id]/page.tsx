import { TenantDetails } from "@/features/admin/tenants/tenant-details";

interface TenantDetailsRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TenantDetailsRoute({ params }: TenantDetailsRouteProps) {
  await params;

  return <TenantDetails />;
}
