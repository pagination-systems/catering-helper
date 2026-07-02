import type { ORDER_SOURCE_ENUM, ORDER_STATUS_ENUM, PaginationMeta } from "@catering/types";
import { apiClient } from "@/lib/axios";
import type {
  DayName,
  IOrder,
  IOrderItem,
  OrderCache,
  OrderFormInput,
  OrderMutationResult,
  OrdersCache,
  UpdateOrderInput,
} from "../schemas/order.schema";

/** Order payload as returned by the backend (Mongo `_id`, dates as ISO strings). */
type RawOrderItem = Partial<IOrderItem> & { _id?: string };
type RawOrder = {
  _id?: string;
  id?: string;
  tenantId?: string;
  orderNo?: string;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  notes?: string;
  packageName?: string;
  source?: ORDER_SOURCE_ENUM;
  status?: ORDER_STATUS_ENUM;
  deliveryDay?: DayName;
  deliveryDate?: string | Date;
  items?: RawOrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  total?: number;
  totalMeals?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

interface ApiEnvelope {
  message: string;
  statusCode: number;
}

interface GetOrdersApiResponse extends ApiEnvelope {
  orders: RawOrder[];
  pagination: PaginationMeta;
}

interface OrderApiResponse extends ApiEnvelope {
  order: RawOrder | null;
}

type OrderItemPayload = {
  packageId: string;
  variantName: string;
  quantity: number;
  items: string[];
};

const toItem = (raw: RawOrderItem): IOrderItem => {
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

const toOrder = (raw: RawOrder): IOrder => ({
  id: raw._id ?? raw.id ?? "",
  tenantId: raw.tenantId ?? "",
  orderNo: raw.orderNo ?? "",
  customerName: raw.customerName ?? "",
  customerPhone: raw.customerPhone ?? "",
  deliveryAddress: raw.deliveryAddress ?? "",
  notes: raw.notes ?? "",
  packageName: raw.packageName ?? "",
  source: raw.source as IOrder["source"],
  status: raw.status as IOrder["status"],
  deliveryDay: (raw.deliveryDay ?? "Sun") as DayName,
  deliveryDate: raw.deliveryDate ? new Date(raw.deliveryDate) : new Date(),
  items: (raw.items ?? []).map(toItem),
  subtotal: raw.subtotal ?? 0,
  deliveryFee: raw.deliveryFee ?? 0,
  total: raw.total ?? 0,
  totalMeals: raw.totalMeals ?? 0,
  createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
  updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : new Date(),
});

/**
 * Send only the package reference, chosen variant, quantity and a food snapshot.
 * The backend resolves the authoritative price/name from the package catalog.
 */
const buildItems = (items: OrderFormInput["items"]): OrderItemPayload[] =>
  items.map((item) => ({
    packageId: item.packageId,
    variantName: item.variantName,
    quantity: item.quantity,
    items: item.items ?? [],
  }));

export const getOrders = async (query?: string): Promise<OrdersCache> => {
  const { data } = await apiClient.get<GetOrdersApiResponse>(query ? `/orders?${query}` : "/orders");
  return {
    orders: (data.orders ?? []).map(toOrder),
    pagination: data.pagination,
  };
};

export const getOrder = async (id: string): Promise<OrderCache> => {
  const { data } = await apiClient.get<OrderApiResponse>(`/orders/${id}`);
  return { order: toOrder(data.order as RawOrder) };
};

export const createOrder = async (payload: OrderFormInput & { tenantId?: string }): Promise<OrderMutationResult> => {
  const { tenantId, items, ...rest } = payload;
  const { data } = await apiClient.post<OrderApiResponse>("/orders", {
    ...rest,
    ...(tenantId ? { tenantId } : {}),
    items: buildItems(items),
  });
  return { order: toOrder(data.order as RawOrder), message: data.message };
};

export const updateOrder = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<UpdateOrderInput>;
}): Promise<OrderMutationResult> => {
  const { items, ...rest } = payload;
  const body: Record<string, unknown> = { id, ...rest };
  if (items) {
    body.items = buildItems(items);
  }

  const { data } = await apiClient.put<OrderApiResponse>("/orders", body);
  return { order: toOrder(data.order as RawOrder), message: data.message };
};

export const softDeleteOrder = async (id: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<OrderApiResponse>(`/orders/${id}`);
  return { message: data.message };
};

export const hardDeleteOrder = async (id: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<OrderApiResponse>(`/orders/${id}`);
  return { message: data.message };
};
