import {
  CalendarCheck,
  CalendarClock,
  CalendarX,
  ChefHat,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardX,
  ClockAlert,
  Coins,
  HandCoins,
  Layers,
  Package,
  PackageCheck,
  PackageX,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import { formatDecimal } from "@/lib/utils";
import { DashboardCardSection } from "./components/dashboard-card-section";

const accountingCards = [
  {
    title: "Total Income",
    value: formatDecimal(59800),
    link: "/admin/customer-ledger",
    icon: <CircleDollarSign className="size-5" />,
  },
  {
    title: "Total Expense",
    value: formatDecimal(15000),
    link: "/admin/expenses",
    icon: <Receipt className="size-5" />,
  },
  {
    title: "Total Revenue",
    value: formatDecimal(44800),
    link: "/admin/customer-ledger",
    icon: <TrendingUp className="size-5" />,
  },
  {
    title: "Total Collections",
    value: formatDecimal(30000),
    link: "/admin/customer-ledger",
    icon: <HandCoins className="size-5" />,
  },
  {
    title: "Total Due",
    value: formatDecimal(14800),
    link: "/admin/customer-ledger",
    icon: <ClockAlert className="size-5" />,
  },
  {
    title: "Today's Collections",
    value: formatDecimal(5000),
    link: "/admin/customer-ledger",
    icon: <Coins className="size-5" />,
  },
  {
    title: "Today's Due",
    value: formatDecimal(2000),
    link: "/admin/customer-ledger",
    icon: <CalendarClock className="size-5" />,
  },
];

const orderCards = [
  {
    title: "Total Orders",
    value: formatDecimal(150),
    link: "/admin/orders",
    icon: <ShoppingCart className="size-5" />,
  },
  {
    title: "Confirmed",
    value: formatDecimal(100),
    link: "/admin/orders",
    icon: <ClipboardCheck className="size-5" />,
  },
  {
    title: "Cancelled",
    value: formatDecimal(50),
    link: "/admin/orders",
    icon: <ClipboardX className="size-5" />,
  },
  {
    title: "Today's Orders",
    value: formatDecimal(25),
    link: "/admin/orders",
    icon: <ShoppingBag className="size-5" />,
  },
  {
    title: "Today's Confirmed",
    value: formatDecimal(20),
    link: "/admin/orders",
    icon: <CalendarCheck className="size-5" />,
  },
  {
    title: "Today's Cancelled",
    value: formatDecimal(5),
    link: "/admin/orders",
    icon: <CalendarX className="size-5" />,
  },
  {
    title: "Today's Meals Ordered",
    value: formatDecimal(100),
    link: "/admin/production-requirements",
    icon: <ChefHat className="size-5" />,
  },
];

const packageCards = [
  {
    title: "Total Packages",
    value: formatDecimal(3),
    link: "/admin/packages",
    icon: <Package className="size-5" />,
  },
  {
    title: "Active Packages",
    value: formatDecimal(3),
    link: "/admin/packages",
    icon: <PackageCheck className="size-5" />,
  },
  {
    title: "Inactive Packages",
    value: formatDecimal(0),
    link: "/admin/packages",
    icon: <PackageX className="size-5" />,
  },
  {
    title: "Total Variants",
    value: formatDecimal(5),
    link: "/admin/packages",
    icon: <Layers className="size-5" />,
  },
];

export const TenantAdminDashboard = () => {
  return (
    <div className="space-y-4">
      <DashboardCardSection title="Accounting" cards={accountingCards} />
      <DashboardCardSection title="Orders" cards={orderCards} />
      <DashboardCardSection title="Packages & Variants" cards={packageCards} />
    </div>
  );
};
