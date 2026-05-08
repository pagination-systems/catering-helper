import dynamic from "next/dynamic";

const Orders = dynamic(() => import("@/features/admin/orders").then((mod) => mod.Orders), {
  loading: () => <div className="p-4 text-center text-sm text-muted-foreground">Loading orders...</div>,
});

export default async function TenantOrdersRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Orders tenantId={id} />;
}
