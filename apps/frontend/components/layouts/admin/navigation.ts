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

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: string[];
  children?: NavigationItem[];
};

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
  },
  {
    label: "Packages",
    href: "/admin/packages",
    icon: Package2,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ListOrdered,
  },
  {
    label: "Production Requirements",
    href: "/admin/production-requirements",
    icon: Utensils,
  },
  {
    label: "Customer Ledger",
    href: "/admin/customer-ledger",
    icon: HandCoins,
  },
  {
    label: "Expenses",
    href: "/admin/expenses",
    icon: HandCoins,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function filterNavigationByRole(items: NavigationItem[], role: string): NavigationItem[] {
  return items
    .filter((item) => !item.roles || item.roles.includes(role))
    .map(
      (item): NavigationItem => ({
        ...item,
        children: item.children ? filterNavigationByRole(item.children, role) : undefined,
      }),
    );
}

export function isItemActive(item: NavigationItem, pathname: string): boolean {
  if (item.href === "/admin/dashboard") {
    return pathname === "/admin" || pathname === "/admin/dashboard";
  }

  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
    return true;
  }

  return Boolean(item.children?.some((child) => isItemActive(child, pathname)));
}
