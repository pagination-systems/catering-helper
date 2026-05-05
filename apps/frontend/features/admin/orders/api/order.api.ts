import { apiClient } from "@/lib/axios";
import type {
  CreateOrderApiResponse,
  DeleteOrderApiResponse,
  GetOrderApiResponse,
  GetOrdersApiResponse,
  OrderCache,
  OrderFormInput,
  OrderMutationResult,
  OrdersCache,
  UpdateOrderApiResponse,
  UpdateOrderInput,
} from "../schemas/order.schema";

export const getOrders = async (query?: string): Promise<OrdersCache> => {
  const { data } = await apiClient.get<GetOrdersApiResponse>(query ? `/orders?${query}` : "/orders");
  return {
    orders: data.orders,
    pagination: data.meta.pagination,
  };
};

export const getOrder = async (id: string): Promise<OrderCache> => {
  const { data } = await apiClient.get<GetOrderApiResponse>(`/orders/${id}`);
  return { order: data.order };
};

export const createOrder = async (payload: OrderFormInput): Promise<OrderMutationResult> => {
  const { data } = await apiClient.post<CreateOrderApiResponse>("/orders", payload);
  return { order: data.order, message: data.message };
};

export const updateOrder = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<UpdateOrderInput>;
}): Promise<OrderMutationResult> => {
  const { data } = await apiClient.put<UpdateOrderApiResponse>("/orders", { id, ...payload });
  return { order: data.order, message: data.message };
};

export const softDeleteOrder = async (id: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<DeleteOrderApiResponse>(`/orders/${id}`);
  return { message: data.message };
};

export const hardDeleteOrder = async (id: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<DeleteOrderApiResponse>(`/orders/${id}`);
  return { message: data.message };
};
