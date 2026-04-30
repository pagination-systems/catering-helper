import { PACKAGE_STATUS_ENUM } from "@catering/types";

export const getPackageStatusBadgeClassName = (status: PACKAGE_STATUS_ENUM) => {
  switch (status) {
    case PACKAGE_STATUS_ENUM.ACTIVE:
      return "bg-emerald-100 text-emerald-700";
    case PACKAGE_STATUS_ENUM.INACTIVE:
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};
