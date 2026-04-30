import type React from "react";
import { Footer } from "@/components/layouts/storefront/footer";
import { Navbar } from "@/components/layouts/storefront/navbar";
import { resolveTenantData } from "../data";

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const tenantData = resolveTenantData(tenant);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-[-10] overflow-hidden">
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-32 right-[-120px] h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-amber-200/50 blur-3xl" />
      </div>

      <Navbar tenant={tenantData} />
      {children}
      <Footer tenant={tenantData} />
    </div>
  );
}
