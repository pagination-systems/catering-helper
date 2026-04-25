import type React from "react";
import { headers } from "next/headers";
import { Footer } from "@/components/layouts/client-portal/footer";
import { Navbar } from "@/components/layouts/client-portal/navbar";
import { resolveTenantData } from "./data";

function getTenantFromHost(host: string): string | undefined {
  const hostWithoutPort = host.split(":")[0].toLowerCase();

  if (hostWithoutPort.endsWith(".localhost")) {
    const parts = hostWithoutPort.split(".");
    if (parts.length > 1) {
      return parts[0];
    }
  }

  const rootDomain = (process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "").toLowerCase();
  if (rootDomain && hostWithoutPort.endsWith(`.${rootDomain}`)) {
    const suffixIndex = hostWithoutPort.lastIndexOf(`.${rootDomain}`);
    const subdomain = hostWithoutPort.slice(0, suffixIndex);
    if (subdomain && subdomain !== "www") {
      return subdomain;
    }
  }

  return undefined;
}

export default async function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "";
  const tenant = resolveTenantData(getTenantFromHost(host));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-[-10] overflow-hidden">
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-32 right-[-120px] h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-amber-200/50 blur-3xl" />
      </div>

      <Navbar tenant={tenant} />
      {children}
      <Footer tenant={tenant} />
    </div>
  );
}
