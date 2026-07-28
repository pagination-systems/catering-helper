import dynamic from "next/dynamic";

const Packages = dynamic(() => import("@/features/admin/packages").then((mod) => mod.Packages), {
  loading: () => <div className="p-4 text-center text-sm text-muted-foreground">Loading packages...</div>,
});

export default async function TenantPackagesRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Packages tenantId={id} />;
}
