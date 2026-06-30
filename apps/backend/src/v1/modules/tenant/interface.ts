import type {
  IServiceCreateParams,
  IServiceGetParams,
  IServiceListParams,
  IServiceUpdateParams,
} from "../../../common/interface/service.interface";
import type { ITenantDoc, TenantInput } from "../../../models/tenant";

// --- Standardized Parameter Interfaces ---
export type IListTenantParams = IServiceListParams<TenantInput>;
export type ITenantGetParams = IServiceGetParams<TenantInput>;
export type ITenantUpdateParams = IServiceUpdateParams<ITenantDoc>;
export type ITenantCreateParams = IServiceCreateParams<TenantInput>;
