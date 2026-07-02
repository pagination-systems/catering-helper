import type { ORDER_SOURCE_ENUM, ORDER_STATUS_ENUM } from "@catering/types";
import { apiClient } from "@/lib/axios";
import type {
  CustomerOrder,
  CustomerOrderItem,
  CustomerOrderResult,
  CustomerOrdersResult,
  DayName,
} from "../schemas/order.schema";

/** Order payload as returned by the backend (Mongo `_id`, dates as ISO strings). */
type RawOrderItem = Partial<CustomerOrderItem> & { _id?: string };
type RawOrder = {
  _id?: string;
  id?: string;
  orderNo?: string;
  status?: ORDER_STATUS_ENUM;
  source?: ORDER_SOURCE_ENUM;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  notes?: string;
  packageName?: string;
  deliveryDay?: DayName;
  deliveryDate?: string | Date;
  items?: RawOrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  total?: number;
  totalMeals?: number;
  tenantSlug?: string | null;
  tenantName?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

interface GetOrdersApiResponse {
  message: string;
  orders: RawOrder[];
}

interface GetOrderApiResponse {
  message: string;
  order: RawOrder | null;
}

const toItem = (raw: RawOrderItem): CustomerOrderItem => {
  const quantity = raw.quantity ?? 0;
  const pricePerMeal = raw.pricePerMeal ?? 0;
  return {
    id: raw.id ?? raw._id ?? crypto.randomUUID(),
    packageId: raw.packageId ?? "",
    packageName: raw.packageName ?? "",
    variantName: raw.variantName ?? "",
    items: raw.items ?? [],
    quantity,
    pricePerMeal,
    subtotal: raw.subtotal ?? quantity * pricePerMeal,
  };
};

const toOrder = (raw: RawOrder): CustomerOrder => ({
  id: raw._id ?? raw.id ?? "",
  orderNo: raw.orderNo ?? "",
  status: raw.status as CustomerOrder["status"],
  source: raw.source as CustomerOrder["source"],
  customerName: raw.customerName ?? "",
  customerPhone: raw.customerPhone ?? "",
  deliveryAddress: raw.deliveryAddress ?? "",
  notes: raw.notes ?? "",
  packageName: raw.packageName ?? "",
  deliveryDay: (raw.deliveryDay ?? "Sun") as DayName,
  deliveryDate: raw.deliveryDate ? new Date(raw.deliveryDate) : new Date(),
  items: (raw.items ?? []).map(toItem),
  subtotal: raw.subtotal ?? 0,
  deliveryFee: raw.deliveryFee ?? 0,
  total: raw.total ?? 0,
  totalMeals: raw.totalMeals ?? 0,
  tenantSlug: raw.tenantSlug ?? null,
  tenantName: raw.tenantName ?? null,
  createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
  updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : new Date(),
});

/**
 * The signed-in customer's own orders. The backend scopes `/orders` to the
 * session user, so no client-side filter is needed. Newest first.
 */
export const getMyOrders = async (): Promise<CustomerOrdersResult> => {
  const { data } = await apiClient.get<GetOrdersApiResponse>("/orders?sort=-createdAt&limit=100");
  const orders = (data.orders ?? [])
    .map(toOrder)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return { orders };
};

export const getMyOrder = async (id: string): Promise<CustomerOrderResult> => {
  const { data } = await apiClient.get<GetOrderApiResponse>(`/orders/${id}`);
  return { order: toOrder(data.order as RawOrder) };
};
