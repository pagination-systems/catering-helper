"use client";

import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminLayout } from "@/components/layouts/admin/admin-layout-context";
import {
  filterNavigationByRole,
  isItemActive,
  type NavigationItem,
  navigationItems,
} from "@/components/layouts/admin/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function NavItem({ item, depth = 0 }: { item: NavigationItem; depth?: number }) {
  const pathname = usePathname();
  const { isSidebarCollapsed, closeMobileSidebar, isMobileSidebarOpen } = useAdminLayout();
  const active = isItemActive(item, pathname);
  const hasChildren = Boolean(item.children?.length);
  const childItems: NavigationItem[] = item.children ?? [];
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        onClick={() => {
          if (isMobileSidebarOpen) {
            closeMobileSidebar();
          }
        }}
        title={isSidebarCollapsed ? item.label : undefined}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group/nav-item relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          depth > 0 && "ml-4",
        )}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />

        <span
          className={cn(
            "truncate transition-[opacity,max-width] duration-200",
            isSidebarCollapsed ? "max-w-0 opacity-0" : "max-w-[12rem] opacity-100",
          )}
        >
          {item.label}
        </span>

        {hasChildren && (
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 shrink-0 transition-opacity",
              isSidebarCollapsed ? "opacity-0" : "opacity-100",
            )}
            aria-hidden="true"
          />
        )}
      </Link>

      {hasChildren && !isSidebarCollapsed && (
        <ul className="mt-1 space-y-1" aria-label={`${item.label} sub menu`}>
          {childItems.map((child) => (
            <NavItem key={child.href} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function SidebarContent() {
  const { isSidebarCollapsed } = useAdminLayout();
  const items = filterNavigationByRole(navigationItems, "admin");

  return (
    <>
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border px-3",
          isSidebarCollapsed ? "justify-center" : "justify-between",
        )}
      >
        <Link href="/admin/dashboard" className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
            CH
          </span>
          <span
            className={cn(
              "text-sm font-semibold tracking-tight text-sidebar-foreground transition-[opacity,max-width] duration-200",
              isSidebarCollapsed ? "max-w-0 opacity-0" : "max-w-[12rem] opacity-100",
            )}
          >
            Catering Helper
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Admin navigation">
        <ul className="space-y-1">
          {items.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </ul>
      </nav>
    </>
  );
}

export function Sidebar() {
  const { isSidebarCollapsed, isMobileSidebarOpen, closeMobileSidebar } = useAdminLayout();

  return (
    <>
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-sidebar-border bg-sidebar transition-[width] duration-300 md:flex md:flex-col",
          isSidebarCollapsed ? "w-[var(--admin-sidebar-collapsed-width)]" : "w-[var(--admin-sidebar-width)]",
        )}
      >
        <SidebarContent />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/35 transition-opacity duration-200 md:hidden",
          isMobileSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
        onClick={closeMobileSidebar}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[var(--admin-sidebar-width)] flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 md:hidden",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar menu"
      >
        <div className="flex h-16 items-center justify-end border-b border-sidebar-border px-3">
          <Button type="button" variant="ghost" size="icon-sm" onClick={closeMobileSidebar} aria-label="Close menu">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <SidebarContent />
      </aside>
    </>
  );
}
