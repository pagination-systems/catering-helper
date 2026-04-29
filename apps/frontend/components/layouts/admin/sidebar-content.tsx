"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAbility } from "@/authz/ability-context";
import { cn } from "@/lib/utils";
import { NavItem } from "./nav-item";
import { filterNavigationByPermission, type NavigationItem, navigationItems } from "./navigation";
import { useAdminLayout } from "./store/useStore";

const SIDEBAR_LOGO = "CH";
const SIDEBAR_TITLE = "Catering Helper";

interface SidebarContentProps {
  items: NavigationItem[];
}

/**
 * Logo and branding section of the sidebar
 */
function SidebarHeader() {
  const { isSidebarCollapsed } = useAdminLayout();

  return (
    <div
      className={cn(
        "flex h-16 items-center border-b border-sidebar-border px-3",
        isSidebarCollapsed ? "justify-center" : "justify-between",
      )}
    >
      <Link href="/admin/dashboard" className="flex items-center gap-2 overflow-hidden">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
          {SIDEBAR_LOGO}
        </span>
        <span
          className={cn(
            "text-sm font-semibold tracking-tight text-sidebar-foreground transition-[opacity,max-width] duration-200",
            isSidebarCollapsed ? "max-w-0 opacity-0" : "max-w-[12rem] opacity-100",
          )}
        >
          {SIDEBAR_TITLE}
        </span>
      </Link>
    </div>
  );
}

/**
 * Navigation menu section of the sidebar
 */
function SidebarMenu({ items }: SidebarContentProps) {
  return (
    <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Admin navigation">
      <ul className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}

/**
 * Main sidebar content component that combines header and navigation menu.
 * Filters navigation items based on user permissions.
 */
export function SidebarContent() {
  const ability = useAbility();
  const items = useMemo(() => filterNavigationByPermission(navigationItems, ability), [ability]);

  return (
    <>
      <SidebarHeader />
      <SidebarMenu items={items} />
    </>
  );
}
