"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAbility } from "@/authz/ability-context";
import { useLanguage } from "@/providers/language-provider";
import { getNavigationItemForPath, getNavigationItems } from "./navigation";

interface AdminRouteGuardProps {
  children: ReactNode;
}

// When unauthorized, perform a client-side replace to the admin dashboard
// to avoid showing a disallowed page and keep history clean.

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const pathname = usePathname();
  const ability = useAbility();
  const { language } = useLanguage();
  const item = getNavigationItemForPath(getNavigationItems(language), pathname);
  const router = useRouter();

  useEffect(() => {
    if (item?.canView && !item.canView(ability)) {
      // replace so the denied page isn't in history
      router.replace("/admin/dashboard");
    }
  }, [item, ability, router]);

  // Don't render the protected children while redirecting
  if (item?.canView && !item.canView(ability)) {
    return null;
  }

  return children;
}
