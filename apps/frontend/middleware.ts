import { NextRequest, NextResponse } from "next/server";

const MAIN_DOMAIN = process.env.MAIN_DOMAIN ?? process.env.NEXT_PUBLIC_MAIN_DOMAIN ?? "localhost";

function normalizeHost(host: string): string {
  return host.split(":")[0].toLowerCase();
}

function extractTenantId(host: string): string | null {
  if (host === "localhost") {
    return null;
  }

  if (host === MAIN_DOMAIN || host === `www.${MAIN_DOMAIN}`) {
    return null;
  }

  if (!host.endsWith(`.${MAIN_DOMAIN}`)) {
    return null;
  }

  const prefix = host.slice(0, -`.${MAIN_DOMAIN}`.length);
  if (!prefix || prefix === "www") {
    return null;
  }

  return prefix.split(".")[0] || null;
}

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const host = normalizeHost(hostHeader);
  const tenantId = extractTenantId(host);

  if (!tenantId) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  if (pathname === `/${tenantId}` || pathname.startsWith(`/${tenantId}/`)) {
    return NextResponse.next();
  }

  const rewrittenPath = pathname === "/" ? `/${tenantId}` : `/${tenantId}${pathname}`;
  const url = new URL(`${rewrittenPath}${search}`, request.url);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
