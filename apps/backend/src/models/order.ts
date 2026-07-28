import { ORDER_SOURCE_ENUM, ORDER_STATUS_ENUM } from "@catering/types";
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
 * Delivery day derived from the order's delivery date. Sunday-first to match the
 * storefront/admin order UI (JavaScript `Date.getDay()` order).
 */
export const ORDER_DAY_ENUMS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export type OrderDay = (typeof ORDER_DAY_ENUMS)[number];

// A single line item on an order (embedded, no own _id — carries a stable `id`).
export interface IOrderItem {
  id: string;
  packageId: Types.ObjectId;
  packageName: string;
  variantName: string;
  items: string[];
  quantity: number;
  pricePerMeal: number;
  subtotal: number;
}

export interface OrderInput extends TenantDataInput {
  userId?: Types.ObjectId | null;
  orderNo?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes?: string;
  packageName: string;
  source?: ORDER_SOURCE_ENUM;
  status?: ORDER_STATUS_ENUM;
  deliveryDay?: OrderDay;
  deliveryDate: Date;
  items: IOrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  total?: number;
  totalMeals?: number;
}

// Order document interface
export interface IOrderDoc extends OrderInput, ITenantDataDoc, ISoftDeleteDoc, Document {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Order model interface with static methods (soft-delete + pagination helpers)
export interface IOrderModel
  extends Model<IOrderDoc>,
    ISoftDeleteModel<IOrderDoc>,
    PaginateModel<IOrderDoc>,
    AggregatePaginateModel<IOrderDoc> {}

const orderItemSchema = new Schema<IOrderItem>(
  {
    id: {
      type: String,
      required: true,
      default: () => new Types.ObjectId().toString(),
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: modelNames.PACKAGE,
      required: true,
    },
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    variantName: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: [String],
      default: [],
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    pricePerMeal: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrderDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: modelNames.USER,
      default: null,
    },
    orderNo: {
      type: String,
      trim: true,
      index: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      enum: Object.values(ORDER_SOURCE_ENUM),
      default: ORDER_SOURCE_ENUM.ADMIN_PANEL,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS_ENUM),
      default: ORDER_STATUS_ENUM.CONFIRMED,
    },
    deliveryDay: {
      type: String,
      enum: ORDER_DAY_ENUMS,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    items: {
      type: [orderItemSchema],
      default: [],
    },
    subtotal: {
      type: Number,
      default: 0,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalMeals: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Apply plugins — tenantDataPlugin adds the `tenantId` reference field.
orderSchema.plugin(tenantDataPlugin);
orderSchema.plugin(softDeletePlugin);
orderSchema.plugin(mongoosePaginate);
orderSchema.plugin(aggregatePaginate);

const Order = model<IOrderDoc, IOrderModel>(modelNames.ORDER, orderSchema);

export { Order };
