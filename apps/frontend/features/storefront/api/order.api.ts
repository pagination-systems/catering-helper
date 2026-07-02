import { apiClient } from "@/lib/axios";

export type PublicOrderItem = {
  packageId: string;
  variantName: string;
  quantity: number;
  items: string[];
};

export type PlaceOrderPayload = {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes?: string;
  packageName: string;
  deliveryDate: string;
  deliveryFee?: number;
  items: PublicOrderItem[];
};

/** Place a storefront order for a tenant, resolved by its public slug. */
export const placeOrder = async (slug: string, payload: PlaceOrderPayload): Promise<{ message: string }> => {
  const { data } = await apiClient.post<{ message: string }>(`/storefront/tenants/${slug}/orders`, payload);
  return { message: data.message };
};
