import type { AnyAbility } from "@casl/ability";
import {
  CustomerLedgerAuthZEntity,
  ExpenseAuthZEntity,
  OrderAuthZEntity,
  PackageAuthZEntity,
  ProductionRequirementAuthZEntity,
  TenantAuthZEntity,
  UserAuthZEntity,
} from "@catering/authz";
import { AbilityAction } from "@catering/types";
import {
  HandCoins,
  LayoutDashboard,
  ListOrdered,
  type LucideIcon,
  Package2,
  Settings,
  Users,
  Utensils,
} from "lucide-react";

/**
 * Represents a single navigation item in the admin sidebar.
 * Can have children for nested menu items.
 */
export type NavigationItem = {
  /** Display label for the navigation item */
  label: string;
  /** Route href to navigate to */
  href: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Optional function to determine if user can view this item based on abilities */
  canView?: (ability: AnyAbility) => boolean;
  /** Optional nested navigation items */
  children?: NavigationItem[];
};

/**
 * Main navigation items for the admin panel.
 * Each item can have permission checks and nested children.
 */
export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    canView: (ability) => ability.can(AbilityAction.MANAGE, UserAuthZEntity),
  },
  {
    label: "Packages",
    href: "/admin/packages",
    icon: Package2,
    canView: (ability) => ability.can(AbilityAction.MANAGE, PackageAuthZEntity),
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ListOrdered,
    canView: (ability) => ability.can(AbilityAction.MANAGE, OrderAuthZEntity),
  },
  {
    label: "Production Requirements",
    href: "/admin/production-requirements",
    icon: Utensils,
    canView: (ability) => ability.can(AbilityAction.MANAGE, ProductionRequirementAuthZEntity),
  },
  {
    label: "Customer Ledger",
    href: "/admin/customer-ledger",
    icon: HandCoins,
    canView: (ability) => ability.can(AbilityAction.MANAGE, CustomerLedgerAuthZEntity),
  },
  {
    label: "Expenses",
    href: "/admin/expenses",
    icon: HandCoins,
    canView: (ability) => ability.can(AbilityAction.MANAGE, ExpenseAuthZEntity),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    canView: (ability) => ability.can(AbilityAction.MANAGE, TenantAuthZEntity),
  },
];

/**
 * Recursively filters navigation items based on user permissions.
 * Removes items the user cannot view, and removes parent items
 * that have no visible children.
 *
 * @param items - Navigation items to filter
 * @param ability - CASL ability instance for permission checking
 * @returns Filtered navigation items with only accessible items
 */
export function filterNavigationByPermission(items: NavigationItem[], ability: AnyAbility): NavigationItem[] {
  return items.flatMap((item) => {
    const children = item.children ? filterNavigationByPermission(item.children, ability) : undefined;

    const canView = item.canView?.(ability) ?? true;

    // Hide item if user cannot view it and it has no visible children
    if (!canView && (!children || children.length === 0)) {
      return [];
    }

    return [
      {
        ...item,
        children: children && children.length > 0 ? children : undefined,
      },
    ];
  });
}

/**
 * Determines if a navigation item is currently active based on the current pathname.
 * Handles dashboard root path, exact matches, and child path matching.
 * Recursively checks children for active state.
 *
 * @param item - Navigation item to check
 * @param pathname - Current route pathname
 * @returns True if the item or any of its children are active
 */
export function isItemActive(item: NavigationItem, pathname: string): boolean {
  // Special case: dashboard routes
  if (item.href === "/admin/dashboard") {
    return pathname === "/admin" || pathname === "/admin/dashboard";
  }

  // Check if pathname matches item href or is a child route
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
    return true;
  }

  // Recursively check children
  return Boolean(item.children?.some((child) => isItemActive(child, pathname)));
}
