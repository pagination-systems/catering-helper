import { TASK_PRIORITY_ENUMS, TASK_STATUS_ENUMS } from "@catering/types";
import {
  type AggregatePaginateModel,
  type Document,
  type Model,
  model,
  type PaginateModel,
  Schema,
  type Types,
} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoosePaginate from "mongoose-paginate-v2";
import { modelNames } from "./constants";

import { type ISoftDeleteDoc, type ISoftDeleteModel, softDeletePlugin } from "./plugins/soft-delete.plugin";
import { type ITenantDoc, type ITenantModel, type TenantInput, tenantDataPlugin } from "./plugins/tenant-data.plugin";

export interface TaskInput extends TenantInput {
  title: string;
  description?: string;
  assignedTo?: Types.ObjectId;
  createdBy?: Types.ObjectId;
  status?: TASK_STATUS_ENUMS;
  priority?: TASK_PRIORITY_ENUMS;
  dueDate?: Date;
}

export interface ITaskDoc extends TaskInput, ITenantDoc, ISoftDeleteDoc, Document {
  createdAt: Date;
  updatedAt: Date;
}

interface ITaskModel
  extends Model<ITaskDoc>,
    ISoftDeleteModel<ITaskDoc>,
    PaginateModel<ITaskDoc>,
    AggregatePaginateModel<ITaskDoc>,
    ITenantModel<ITaskDoc> {}

const taskSchema = new Schema<ITaskDoc>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: modelNames.USER,
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: modelNames.USER,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(TASK_STATUS_ENUMS),
      default: null,
    },
    priority: {
      type: String,
      enum: Object.values(TASK_PRIORITY_ENUMS),
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Plugins
taskSchema.plugin(tenantDataPlugin);
taskSchema.plugin(softDeletePlugin);
taskSchema.plugin(mongoosePaginate);
taskSchema.plugin(aggregatePaginate);

taskSchema.index({ assignedTo: 1, dueDate: 1 });

export const Task = model<ITaskDoc, ITaskModel>(modelNames.TASK, taskSchema);

export default Task;
