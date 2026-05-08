import { PACKAGE_STATUS_ENUM } from "@catering/types";

export const getPackageStatusBadgeStyles = (status: PACKAGE_STATUS_ENUM) => {
  switch (status) {
    case PACKAGE_STATUS_ENUM.ACTIVE:
      return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    case PACKAGE_STATUS_ENUM.INACTIVE:
      return "bg-slate-100 text-slate-700 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    default:
      return "bg-slate-100 text-slate-700 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
  }
};
