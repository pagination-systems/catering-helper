import { ORDER_STATUS_ENUM, type PaginationMeta } from "@catering/types";
import { z } from "zod";

export const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type DayName = (typeof dayOrder)[number];

export interface IOrderItem {
  id: string;
  packageName: string;
  variantName: string;
  items: string[];
  quantity: number;
  pricePerMeal: number;
  subtotal: number;
  deliveryDate: Date;
}

export interface IOrder {
  id: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  address: string;
  notes: string;
  source: "Client Portal" | "Admin Panel";
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

export interface GetOrdersResponse {
  data: IOrder[];
  meta: {
    pagination: PaginationMeta;
  };
}

const bdPhoneRegex = /^01[3-9]\d{8}$/;

export interface CreateOrderLineItemValues {
  packageName: string;
  variantName: string;
  quantity: number;
  deliveryDate: string;
}

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Customer name must be at least 2 characters.").max(80),
  customerPhone: z
    .string()
    .trim()
    .regex(bdPhoneRegex, "Enter a valid Bangladesh phone number.")
    .min(10, "Phone number must be at least 10 digits.")
    .max(20, "Phone number is too long."),
  address: z.string().trim().min(8, "Address must be at least 8 characters.").max(240),
  notes: z.string().trim().max(300),
  packageName: z.string().trim().min(2, "Package name is required.").max(100),
  deliveryDate: z.string().trim().min(1, "Delivery date is required."),
  items: z
    .array(
      z.object({
        packageName: z.string().trim().min(2, "Package name is required.").max(100),
        variantName: z.string().trim().min(2, "Variant name is required.").max(100),
        quantity: z.number().int().min(1, "Quantity must be at least 1.").max(500),
        deliveryDate: z.string().trim().min(1, "Delivery date is required."),
      }),
    )
    .min(1, "Select at least one meal variant."),
});

export type CreateOrderValues = z.infer<typeof createOrderSchema>;

export const LOCKED_ORDER_STATUSES: ORDER_STATUS_ENUM[] = [ORDER_STATUS_ENUM.CANCELLED];

export const isOrderLocked = (status: ORDER_STATUS_ENUM) => LOCKED_ORDER_STATUSES.includes(status);
