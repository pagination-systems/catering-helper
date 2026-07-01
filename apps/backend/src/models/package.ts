import { PACKAGE_STATUS_ENUM } from "@catering/types";
import {
  type AggregatePaginateModel,
  type Document,
  type Model,
  model,
  type PaginateModel,
  Schema,
  Types,
} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoosePaginate from "mongoose-paginate-v2";
import { modelNames } from "./constants";
import { type ISoftDeleteDoc, type ISoftDeleteModel, softDeletePlugin } from "./plugins/soft-delete.plugin";
import {
  type ITenantDoc as ITenantDataDoc,
  type TenantInput as TenantDataInput,
  tenantDataPlugin,
} from "./plugins/tenant-data.plugin";

/**
 * Weekly menu is planned per day. The order mirrors the storefront week
 * (Saturday first) used by the admin panel package form.
 */
export const PACKAGE_DAY_ENUMS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;
export type PackageDay = (typeof PACKAGE_DAY_ENUMS)[number];

export interface IMenuVariant {
  /** Stable client-facing id (generated on write when missing). */
  id: string;
  name: string;
  note?: string;
  items: string[];
  available?: boolean;
}

export interface IDayPlan {
  day: PackageDay;
  variants: IMenuVariant[];
}

export interface PackageInput extends TenantDataInput {
  name: string;
  description?: string;
  pricePerMeal: number;
  status?: PACKAGE_STATUS_ENUM;
  days: IDayPlan[];
}

// Package document interface
export interface IPackageDoc extends PackageInput, ITenantDataDoc, ISoftDeleteDoc, Document {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Package model interface with static methods (soft-delete + pagination helpers)
export interface IPackageModel
  extends Model<IPackageDoc>,
    ISoftDeleteModel<IPackageDoc>,
    PaginateModel<IPackageDoc>,
    AggregatePaginateModel<IPackageDoc> {}

// A single menu variant offered on a given day (embedded, no own _id).
const menuVariantSchema = new Schema<IMenuVariant>(
  {
    id: {
      type: String,
      required: true,
      default: () => new Types.ObjectId().toString(),
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    items: {
      type: [String],
      default: [],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

// One day's plan holding one or more variants (embedded, no own _id).
const dayPlanSchema = new Schema<IDayPlan>(
  {
    day: {
      type: String,
      enum: PACKAGE_DAY_ENUMS,
      required: true,
    },
    variants: {
      type: [menuVariantSchema],
      default: [],
    },
  },
  { _id: false },
);

const packageSchema = new Schema<IPackageDoc>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    pricePerMeal: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(PACKAGE_STATUS_ENUM),
      default: PACKAGE_STATUS_ENUM.ACTIVE,
    },
    days: {
      type: [dayPlanSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Apply plugins — tenantDataPlugin adds the `tenantId` reference field.
packageSchema.plugin(tenantDataPlugin);
packageSchema.plugin(softDeletePlugin);
packageSchema.plugin(mongoosePaginate);
packageSchema.plugin(aggregatePaginate);

const Package = model<IPackageDoc, IPackageModel>(modelNames.PACKAGE, packageSchema);

export { Package };
