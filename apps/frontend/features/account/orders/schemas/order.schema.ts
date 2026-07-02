import type { ORDER_SOURCE_ENUM, ORDER_STATUS_ENUM } from "@catering/types";

export const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export type DayName = (typeof dayOrder)[number];

/** A single line item on a customer's order. */
export interface CustomerOrderItem {
  id: string;
  packageId: string;
  packageName: string;
  variantName: string;
  items: string[];
  quantity: number;
  pricePerMeal: number;
  subtotal: number;
}

/** An order as consumed by the customer account portal. */
export interface CustomerOrder {
  id: string;
  orderNo: string;
  status: ORDER_STATUS_ENUM;
  source: ORDER_SOURCE_ENUM;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes: string;
  packageName: string;
  deliveryDay: DayName;
  deliveryDate: Date;
  items: CustomerOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalMeals: number;
  /** Public slug/name of the caterer, used to reorder from their storefront. */
  tenantSlug: string | null;
  tenantName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerOrdersResult {
  orders: CustomerOrder[];
}

export interface CustomerOrderResult {
  order: CustomerOrder;
}
