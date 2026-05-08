"use client";

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
import { getAdminContent } from "@/lib/admin-i18n";
import { formatDecimal } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { DashboardCardSection } from "./components/dashboard-card-section";

const accountingCards = (t: any) => [
  {
    title: t.cards.totalIncome,
    value: formatDecimal(59800),
    link: "/admin/customer-ledger",
    icon: <CircleDollarSign className="size-5" />,
  },
  {
    title: t.cards.totalExpense,
    value: formatDecimal(15000),
    link: "/admin/expenses",
    icon: <Receipt className="size-5" />,
  },
  {
    title: t.cards.totalRevenue,
    value: formatDecimal(44800),
    link: "/admin/customer-ledger",
    icon: <TrendingUp className="size-5" />,
  },
  {
    title: t.cards.totalCollections,
    value: formatDecimal(30000),
    link: "/admin/customer-ledger",
    icon: <HandCoins className="size-5" />,
  },
  {
    title: t.cards.totalDue,
    value: formatDecimal(14800),
    link: "/admin/customer-ledger",
    icon: <ClockAlert className="size-5" />,
  },
  {
    title: t.cards.todaysCollections,
    value: formatDecimal(5000),
    link: "/admin/customer-ledger",
    icon: <Coins className="size-5" />,
  },
  {
    title: t.cards.todaysDue,
    value: formatDecimal(2000),
    link: "/admin/customer-ledger",
    icon: <CalendarClock className="size-5" />,
  },
];

const orderCards = (t: any) => [
  {
    title: t.cards.totalOrders,
    value: formatDecimal(150),
    link: "/admin/orders",
    icon: <ShoppingCart className="size-5" />,
  },
  {
    title: t.cards.confirmed,
    value: formatDecimal(100),
    link: "/admin/orders",
    icon: <ClipboardCheck className="size-5" />,
  },
  {
    title: t.cards.cancelled,
    value: formatDecimal(50),
    link: "/admin/orders",
    icon: <ClipboardX className="size-5" />,
  },
  {
    title: t.cards.todaysOrders,
    value: formatDecimal(25),
    link: "/admin/orders",
    icon: <ShoppingBag className="size-5" />,
  },
  {
    title: t.cards.todaysConfirmed,
    value: formatDecimal(20),
    link: "/admin/orders",
    icon: <CalendarCheck className="size-5" />,
  },
  {
    title: t.cards.todaysCancelled,
    value: formatDecimal(5),
    link: "/admin/orders",
    icon: <CalendarX className="size-5" />,
  },
  {
    title: t.cards.todaysMealsOrdered,
    value: formatDecimal(100),
    link: "/admin/production-requirements",
    icon: <ChefHat className="size-5" />,
  },
];

const packageCards = (t: any) => [
  {
    title: t.cards.totalPackages,
    value: formatDecimal(3),
    link: "/admin/packages",
    icon: <Package className="size-5" />,
  },
  {
    title: t.cards.activePackages,
    value: formatDecimal(3),
    link: "/admin/packages",
    icon: <PackageCheck className="size-5" />,
  },
  {
    title: t.cards.inactivePackages,
    value: formatDecimal(0),
    link: "/admin/packages",
    icon: <PackageX className="size-5" />,
  },
  {
    title: t.cards.totalVariants,
    value: formatDecimal(5),
    link: "/admin/packages",
    icon: <Layers className="size-5" />,
  },
];

export const TenantAdminDashboard = () => {
  const { language } = useLanguage();
  const t = getAdminContent(language).dashboard;

  return (
    <div className="space-y-4">
      <DashboardCardSection title={t.sections.accounting} cards={accountingCards(t)} />
      <DashboardCardSection title={t.sections.orders} cards={orderCards(t)} />
      <DashboardCardSection title={t.sections.packagesAndVariants} cards={packageCards(t)} />
    </div>
  );
};
