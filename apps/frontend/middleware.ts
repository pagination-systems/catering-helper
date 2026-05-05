import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const RESERVED_SUBDOMAINS = new Set(["www", "api"]);

function getSubdomain(hostHeader: string): string | null {
  const hostWithoutPort = hostHeader.split(":")[0].toLowerCase();

  if (hostWithoutPort.endsWith(".localhost")) {
    const parts = hostWithoutPort.split(".");
    if (parts.length > 1) {
      const subdomain = parts[0];
      return RESERVED_SUBDOMAINS.has(subdomain) ? null : subdomain;
    }
    return null;
  }

  const rootDomain = (process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "").toLowerCase();
  if (!rootDomain) {
    return null;
  }

  if (!hostWithoutPort.endsWith(`.${rootDomain}`)) {
    return null;
  }

  const suffixIndex = hostWithoutPort.lastIndexOf(`.${rootDomain}`);
  const subdomain = hostWithoutPort.slice(0, suffixIndex);
  if (!subdomain || RESERVED_SUBDOMAINS.has(subdomain)) {
    return null;
  }

  return subdomain;
}

export function middleware(request: NextRequest) {
  return NextResponse.next();
  // const pathname = request.nextUrl.pathname;

  // if (
  //   pathname.startsWith("/_next") ||
  //   pathname.startsWith("/api") ||
  //   pathname.startsWith("/favicon") ||
  //   pathname.startsWith("/robots") ||
  //   pathname.startsWith("/sitemap")
  // ) {
  //   return NextResponse.next();
  // }

  // const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  // const subdomain = getSubdomain(host);

  // if (!subdomain) {
  //   return NextResponse.next();
  // }

  // const url = request.nextUrl.clone();
  // if (subdomain === "admin" || subdomain === "app") {
  //   if (pathname === "/admin" || pathname.startsWith("/admin/")) {
  //     return NextResponse.next();
  //   }

  //   url.pathname = `/admin${pathname}`;
  //   return NextResponse.rewrite(url);
  // }

  // url.pathname = `/${subdomain}${pathname}`;

  // return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
