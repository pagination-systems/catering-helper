import { TENANT_STATUS_ENUM } from "@catering/types";

export const getTenantStatusBadgeClassName = (status: TENANT_STATUS_ENUM) => {
  switch (status) {
    case TENANT_STATUS_ENUM.ACTIVE:
      return "bg-blue-100 text-blue-700";
    case TENANT_STATUS_ENUM.TERMINATED:
      return "bg-rose-100 text-rose-700";
    case TENANT_STATUS_ENUM.SUSPENDED:
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};
