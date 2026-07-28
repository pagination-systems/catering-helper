import { TENANT_STATUS_ENUMS } from "@catering/types";

export const getTenantStatusBadgeClassName = (status: TENANT_STATUS_ENUMS) => {
  switch (status) {
    case TENANT_STATUS_ENUMS.ACTIVE:
      return "bg-blue-100 text-blue-700";
    case TENANT_STATUS_ENUMS.TERMINATED:
      return "bg-rose-100 text-rose-700";
    case TENANT_STATUS_ENUMS.SUSPENDED:
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};
