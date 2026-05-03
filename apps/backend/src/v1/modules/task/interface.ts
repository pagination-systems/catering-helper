import type {
  IServiceCreateParams,
  IServiceGetParams,
  IServiceListParams,
  IServiceUpdateParams,
} from "../../../common/interface/service.interface";
import type { ITaskDoc, TaskInput as ITaskInput } from "../../../models/task";

export type IListTaskParams = IServiceListParams<ITaskInput>;
export type ITaskGetParams = IServiceGetParams<ITaskInput>;
export type ITaskUpdateParams = IServiceUpdateParams<ITaskDoc>;
export type ITaskCreateParams = IServiceCreateParams<ITaskInput>;
