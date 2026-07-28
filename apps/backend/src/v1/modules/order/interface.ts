import type {
  IServiceCreateParams,
  IServiceGetParams,
  IServiceListParams,
  IServiceUpdateParams,
} from "../../../common/interface/service.interface";
import type { IOrderDoc, OrderInput } from "../../../models/order";

// --- Standardized Parameter Interfaces ---
export type IListOrderParams = IServiceListParams<OrderInput>;
export type IOrderGetParams = IServiceGetParams<OrderInput>;
export type IOrderUpdateParams = IServiceUpdateParams<IOrderDoc>;
export type IOrderCreateParams = IServiceCreateParams<OrderInput>;
