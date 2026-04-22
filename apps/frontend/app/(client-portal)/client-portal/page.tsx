import { headers } from "next/headers";
import { ClientPortalPage } from "@/features/client-portal";
import { resolveTenantData } from "../data";

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

export default async function ClientPortalRoute() {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "";
  const tenant = resolveTenantData(getTenantFromHost(host));

  return <ClientPortalPage tenant={tenant} />;
}
