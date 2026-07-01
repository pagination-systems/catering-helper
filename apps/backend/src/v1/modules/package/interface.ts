import type {
  IServiceCreateParams,
  IServiceGetParams,
  IServiceListParams,
  IServiceUpdateParams,
} from "../../../common/interface/service.interface";
import type { IPackageDoc, PackageInput } from "../../../models/package";

// --- Standardized Parameter Interfaces ---
export type IListPackageParams = IServiceListParams<PackageInput>;
export type IPackageGetParams = IServiceGetParams<PackageInput>;
export type IPackageUpdateParams = IServiceUpdateParams<IPackageDoc>;
export type IPackageCreateParams = IServiceCreateParams<PackageInput>;
