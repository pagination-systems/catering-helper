import { TenantDetailsLayout } from "@/features/admin/tenants/tenant-details";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TenantDetailsLayout id={id}>{children}</TenantDetailsLayout>;
}
