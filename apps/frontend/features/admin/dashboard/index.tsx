"use client";

import { USER_ROLE_ENUM } from "@catering/types";
import { useSession } from "@/authz/use-session";
import { If } from "@/components/if";
import { PlatformAdminDashboard } from "./platform-admin-dashboard";
import { TenantAdminDashboard } from "./tenant-admin-dashboard";

export const Dashboard = () => {
  const session = useSession();

  return (
    <div>
      <If expression={session.user.role === USER_ROLE_ENUM.PLATFORM_ADMIN}>
        <PlatformAdminDashboard />
      </If>
      <If expression={session.user.role === USER_ROLE_ENUM.CATERING_ADMIN}>
        <TenantAdminDashboard />
      </If>
    </div>
  );
};
