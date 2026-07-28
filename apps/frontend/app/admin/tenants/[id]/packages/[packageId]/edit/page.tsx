import dynamic from "next/dynamic";

const EditPackage = dynamic(() => import("@/features/admin/packages").then((mod) => mod.EditPackage), {
  loading: () => <div className="p-4 text-center text-sm text-muted-foreground">Loading package...</div>,
});

export default async function TenantPackageEditRoute({
  params,
}: {
  params: Promise<{ id: string; packageId: string }>;
}) {
  const { id, packageId } = await params;
  return <EditPackage tenantId={id} packageId={packageId} />;
}
