"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isItemActive, type NavigationItem } from "@/components/layouts/admin/navigation";
import { cn } from "@/lib/utils";
import { useAdminLayout } from "./store/useStore";

interface NavItemProps {
  item: NavigationItem;
  depth?: number;
}

/**
 * Recursive navigation item component that renders a navigation link with optional children.
 * Handles active state, collapsing, and mobile sidebar closing.
 */
export function NavItem({ item, depth = 0 }: NavItemProps) {
  const pathname = usePathname();
  const { isSidebarCollapsed, closeMobileSidebar, isMobileSidebarOpen } = useAdminLayout();

  const active = isItemActive(item, pathname);
  const hasChildren = Boolean(item.children?.length);
  const childItems = item.children ?? [];
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
