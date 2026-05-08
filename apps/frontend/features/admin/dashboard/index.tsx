"use client";

import { ACCOUNT_TYPE_ENUMS } from "@catering/types";
import { useSession } from "@/authz/use-session";
import { If } from "@/components/if";
import { PlatformAdminDashboard } from "./platform-admin-dashboard";
import { TenantAdminDashboard } from "./tenant-admin-dashboard";

export const Dashboard = () => {
  const session = useSession();

  return (
    <div>
      <If expression={session.user.type === ACCOUNT_TYPE_ENUMS.ADMIN}>
        <PlatformAdminDashboard />
      </If>
      <If expression={session.user.type === ACCOUNT_TYPE_ENUMS.CATERER}>
        <TenantAdminDashboard />
      </If>
    </div>
  );
};
