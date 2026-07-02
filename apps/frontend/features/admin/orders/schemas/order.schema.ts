import { ORDER_SOURCE_ENUM, ORDER_STATUS_ENUM, type PaginationMeta } from "@catering/types";
import { z } from "zod";

export const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export type DayName = (typeof dayOrder)[number];

export interface IOrderItem {
  id: string;
  packageId: string;
  packageName: string;
  variantName: string;
  items: string[];
  quantity: number;
  pricePerMeal: number;
  subtotal: number;
}

export interface IOrder {
  id: string;
  tenantId: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes: string;
  packageName: string;
  source: ORDER_SOURCE_ENUM;
  status: ORDER_STATUS_ENUM;
  deliveryDay: DayName;
  deliveryDate: Date;
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalMeals: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrdersCache {
  orders: IOrder[];
  pagination: PaginationMeta;
}

export interface OrderCache {
  order: IOrder;
}

export interface OrderMutationResult {
  order: IOrder;
  message: string;
}

const bdPhoneRegex = /^01[3-9]\d{8}$/;

// Line item captured by the form. `packageId` lets the backend resolve the
// authoritative price; `items` is a food snapshot shown on the order.
const orderItemInputSchema = z.object({
  packageId: z.string().min(1, "Package is required."),
  packageName: z.string().trim().min(2).max(100),
  variantName: z.string().trim().min(2).max(100),
  quantity: z.number().int().min(1).max(500),
  items: z.array(z.string()),
});

const orderItemsSchema = z.array(orderItemInputSchema).min(1, "Select at least one meal variant.");

export const orderFormSchema = z.object({
  customerName: z.string().trim().min(2, "Name must be at least 2 characters.").max(80),
  customerPhone: z.string().trim().regex(bdPhoneRegex, "Enter a valid Bangladesh phone number.").min(10).max(20),
  deliveryAddress: z.string().trim().min(8, "Address must be at least 8 characters.").max(240),
  notes: z.string().trim().max(300),
  source: z.nativeEnum(ORDER_SOURCE_ENUM),
  packageName: z.string().trim().min(2, "Package name is required.").max(100),
  deliveryDate: z.string().trim().min(1, "Delivery date is required."),
  items: orderItemsSchema,
});

export const UpdateOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Name must be at least 2 characters.").max(80),
  customerPhone: z.string().trim().regex(bdPhoneRegex, "Enter a valid Bangladesh phone number.").min(10).max(20),
  deliveryAddress: z.string().trim().min(8, "Address must be at least 8 characters.").max(240),
  notes: z.string().trim().max(300),
  source: z.nativeEnum(ORDER_SOURCE_ENUM),
  status: z.nativeEnum(ORDER_STATUS_ENUM),
  packageName: z.string().trim().min(2, "Package name is required.").max(100),
  deliveryDate: z.string().trim().min(1, "Delivery date is required."),
  items: orderItemsSchema,
});

export type OrderFormInput = z.infer<typeof orderFormSchema>;
export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;
