import type {
  IServiceCreateParams,
  IServiceGetParams,
  IServiceListParams,
  IServiceUpdateParams,
} from "../../../common/interface/service.interface";
import type { IUserDoc, UserInput as IUserInput } from "../../../models/user";

// --- Standardized Parameter Interfaces ---
export type IListUserParams = IServiceListParams<IUserInput>;
export type IUserGetParams = IServiceGetParams<IUserInput>;
export type IUserUpdateParams = IServiceUpdateParams<IUserDoc>;
export type IUserCreateParams = IServiceCreateParams<IUserInput>;
