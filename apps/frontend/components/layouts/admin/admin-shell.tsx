"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuthBootstrap } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store/useStore";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { AdminRouteGuard } from "./route-guard";
import { Sidebar } from "./sidebar";

const LOGIN_PATH = "/admin/login";

/** Routes rendered without the admin chrome or auth guard. */
const PUBLIC_PATHS = new Set<string>([LOGIN_PATH, "/admin/register", "/admin/forgot-password"]);

const FullScreenLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
    <Loader2 className="h-6 w-6 animate-spin" />
  </div>
);

const AuthenticatedShell = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const status = useAuthStore((s) => s.status);

  useEffect(() => {
    if (status === "unauthenticated") router.replace(LOGIN_PATH);
  }, [status, router]);

  if (status === "idle" || status === "loading") return <FullScreenLoader />;
  if (status !== "authenticated") return <FullScreenLoader />;

  return (
    <div data-app-theme="admin" className="flex min-h-screen overflow-x-clip bg-background text-foreground">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="min-w-0 flex-1 px-[var(--layout-space-inline)] py-[var(--layout-space-block)]">
          <AdminRouteGuard>{children}</AdminRouteGuard>
        </main>
        <Footer />
      </div>
    </div>
  );
};

/**
 * Top-level gate for the `/admin` segment.
 *
 * - Bootstraps the session from the httpOnly cookie once on mount.
 * - Renders public routes (login, forgot password) without the admin chrome.
 * - Guards every other route behind authentication.
 */
export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useAuthBootstrap();

  if (PUBLIC_PATHS.has(pathname)) return <>{children}</>;

  return <AuthenticatedShell>{children}</AuthenticatedShell>;
}
