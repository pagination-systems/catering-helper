import { headers } from "next/headers";

import { ClientPortalPage } from "@/features/client-portal";

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

export default async function ClientPortalRoute({ searchParams }: { searchParams: Promise<{ tenant?: string }> }) {
  const params = await searchParams;
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "";
  const tenant = params.tenant ?? getTenantFromHost(host);

  return <ClientPortalPage tenant={tenant} />;
}
