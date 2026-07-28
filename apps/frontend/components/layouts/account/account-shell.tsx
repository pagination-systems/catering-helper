"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Footer } from "@/components/layouts/marketing/footer";
import { Navbar } from "@/components/layouts/marketing/navbar";
import { useAccountI18n } from "@/features/account/lib/account-i18n";
import { useAuthBootstrap } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store/useStore";
import { cn } from "@/lib/utils";

const FullScreenLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
    <Loader2 className="h-6 w-6 animate-spin" />
  </div>
);

const AccountTabs = () => {
  const pathname = usePathname();
  const tabs = useAccountI18n().tabs;

  const items = [
    { href: "/account/orders", label: tabs.orders },
    { href: "/account/profile", label: tabs.profile },
    { href: "/account/settings", label: tabs.settings },
  ];

  return (
    <nav className="flex gap-1 border-b border-border/70">
      {items.map((item) => {
        // Keep the Orders tab active on nested order-detail routes too.
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

/**
 * Chrome + auth guard for the customer `/account` area. Bootstraps the session,
 * sends unauthenticated visitors to the login page, and renders the account
 * tabs around the page content.
 */
export function AccountShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  useAuthBootstrap();
  const status = useAuthStore((s) => s.status);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/admin/login");
  }, [status, router]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {status === "authenticated" ? (
          <div className="space-y-6">
            <AccountTabs />
            {children}
          </div>
        ) : (
          <FullScreenLoader />
        )}
      </main>
      <Footer />
    </div>
  );
}
