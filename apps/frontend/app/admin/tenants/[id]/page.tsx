import { redirect } from "next/navigation";

export default async function TenantDetailsRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/admin/tenants/${id}/orders`);
}
