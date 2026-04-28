import { PackageStatus } from "../schemas/package.schema";

export const getPackageStatusBadgeClassName = (status: PackageStatus) => {
  switch (status) {
    case PackageStatus.Active:
      return "bg-emerald-100 text-emerald-700";
    case PackageStatus.Inactive:
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};
