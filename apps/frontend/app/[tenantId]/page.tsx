type TenantPageProps = {
  params: Promise<{ tenantId: string }>;
};

export default async function TenantPage({ params }: TenantPageProps) {
  const { tenantId } = await params;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Tenant: {tenantId}</h1>
      <p>Tenant-aware page placeholder.</p>
    </main>
  );
}
