"use client";

import {
  Ban,
  CheckCircle,
  CircleDollarSign,
  PauseCircle,
  Receipt,
  ShieldCheck,
  Store,
  UserCog,
  Users,
  UserX,
  Wallet,
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
    icon: <Wallet className="size-5" />,
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
    icon: <CircleDollarSign className="size-5" />,
  },
];

const tenantCards = (t: any) => [
  {
    title: t.cards.totalCaterings,
    value: formatDecimal(150),
    link: "/admin/orders",
    icon: <Store className="size-5" />,
  },
  {
    title: t.cards.activeCaterings,
    value: formatDecimal(100),
    link: "/admin/orders",
    icon: <CheckCircle className="size-5" />,
  },
  {
    title: t.cards.terminatedCaterings,
    value: formatDecimal(50),
    link: "/admin/orders",
    icon: <Ban className="size-5" />,
  },
  {
    title: t.cards.suspendedCaterings,
    value: formatDecimal(25),
    link: "/admin/orders",
    icon: <PauseCircle className="size-5" />,
  },
];

const userCards = (t: any) => [
  {
    title: t.cards.totalPlatformAdmins,
    value: formatDecimal(3),
    link: "/admin/users",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: t.cards.totalTenantAdmins,
    value: formatDecimal(150),
    link: "/admin/users",
    icon: <UserCog className="size-5" />,
  },
  {
    title: t.cards.totalCustomers,
    value: formatDecimal(500),
    link: "/admin/users",
    icon: <Users className="size-5" />,
  },
  {
    title: t.cards.terminatedCustomers,
    value: formatDecimal(5),
    link: "/admin/users",
    icon: <UserX className="size-5" />,
  },
];

export const PlatformAdminDashboard = () => {
  const { language } = useLanguage();
  const t = getAdminContent(language).dashboard;

  return (
    <div className="space-y-4">
      <DashboardCardSection title={t.sections.accounting} cards={accountingCards(t)} />
      <DashboardCardSection title={t.sections.caterings} cards={tenantCards(t)} />
      <DashboardCardSection title={t.sections.users} cards={userCards(t)} />
    </div>
  );
};
