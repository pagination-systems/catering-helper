"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./sidebar-content";
import { useAdminLayout } from "./store/useStore";

/**
 * Desktop sidebar - sticky, always visible on medium screens and up
 */
function DesktopSidebar() {
  const { isSidebarCollapsed } = useAdminLayout();

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 border-r border-sidebar-border bg-sidebar transition-[width] duration-300 md:flex md:flex-col",
        isSidebarCollapsed ? "w-[var(--admin-sidebar-collapsed-width)]" : "w-[var(--admin-sidebar-width)]",
      )}
    >
      <SidebarContent />
    </aside>
  );
}

/**
 * Mobile sidebar overlay - appears on small screens when toggled
 */
function MobileSidebarOverlay() {
  const { isMobileSidebarOpen, closeMobileSidebar } = useAdminLayout();

  if (!isMobileSidebarOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-black/35 transition-opacity duration-200"
      aria-hidden="true"
      onClick={closeMobileSidebar}
    />
  );
}

/**
 * Mobile sidebar - drawer that slides in from the left on small screens
 */
function MobileSidebar() {
  const { isMobileSidebarOpen, closeMobileSidebar } = useAdminLayout();

  return (
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
  );
}

/**
 * Main Sidebar component that manages both desktop and mobile views.
 * Provides responsive navigation for the admin panel.
 */
export function Sidebar() {
  const pathname = usePathname();
  const { closeMobileSidebar } = useAdminLayout();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    useAdminLayout.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      closeMobileSidebar();
    }
  }, [closeMobileSidebar, pathname]);

  return (
    <>
      <DesktopSidebar />
      <MobileSidebarOverlay />
      <MobileSidebar />
    </>
  );
}
