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

import { formatDecimal } from "@/lib/utils";
import { DashboardCardSection } from "./components/dashboard-card-section";

const accountingCards = [
  {
    title: "Total Income",
    value: formatDecimal(59800),
    link: "/admin/customer-ledger",
    icon: <Wallet className="size-5" />,
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
    icon: <CircleDollarSign className="size-5" />,
  },
];

const tenantCards = [
  {
    title: "Total Caterings",
    value: formatDecimal(150),
    link: "/admin/orders",
    icon: <Store className="size-5" />,
  },
  {
    title: "Active",
    value: formatDecimal(100),
    link: "/admin/orders",
    icon: <CheckCircle className="size-5" />,
  },
  {
    title: "Terminated",
    value: formatDecimal(50),
    link: "/admin/orders",
    icon: <Ban className="size-5" />,
  },
  {
    title: "Suspended",
    value: formatDecimal(25),
    link: "/admin/orders",
    icon: <PauseCircle className="size-5" />,
  },
];

const userCards = [
  {
    title: "Total Platform Admins",
    value: formatDecimal(3),
    link: "/admin/users",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Total Tenant Admins",
    value: formatDecimal(150),
    link: "/admin/users",
    icon: <UserCog className="size-5" />,
  },
  {
    title: "Total Customers",
    value: formatDecimal(500),
    link: "/admin/users",
    icon: <Users className="size-5" />,
  },
  {
    title: "Terminated Customers",
    value: formatDecimal(5),
    link: "/admin/users",
    icon: <UserX className="size-5" />,
  },
];

export const PlatformAdminDashboard = () => {
  return (
    <div className="space-y-4">
      <DashboardCardSection title="Accounting" cards={accountingCards} />
      <DashboardCardSection title="Caterings" cards={tenantCards} />
      <DashboardCardSection title="Users" cards={userCards} />
    </div>
  );
};
