import type { PaginationMeta } from "@catering/types";
import { apiClient } from "@/lib/axios";
import type { GetTenantsResponse, ITenant } from "../schemas/tenant.schema";

/** Tenant document as returned by the backend (Mongo `_id`, dates as ISO strings). */
type RawTenant = {
  _id?: string;
  id?: string;
  name?: string;
  phone?: string;
  status: ITenant["status"];
  description?: string;
  headline?: string;
  logoUrl?: string;
  menuUrl?: string;
  deliveryFee?: number;
  lastOrderDate?: string | Date | null;
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactAddress?: string;
  socialFacebookUrl?: string;
  socialInstagramUrl?: string;
  socialYoutubeUrl?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

interface GetTenantsApiResponse {
  message: string;
  tenants: RawTenant[];
  pagination: PaginationMeta;
}

const toTenant = (raw: RawTenant): ITenant => ({
  id: raw._id ?? raw.id ?? "",
  name: raw.name ?? "",
  phone: raw.phone ?? "",
  status: raw.status,
  description: raw.description ?? "",
  headline: raw.headline ?? "",
  logoUrl: raw.logoUrl ?? "",
  menuUrl: raw.menuUrl ?? "",
  deliveryFee: raw.deliveryFee ?? 0,
  lastOrderDate: raw.lastOrderDate ? new Date(raw.lastOrderDate) : null,
  contactEmail: raw.contactEmail ?? "",
  contactPhone: raw.contactPhone ?? "",
  contactWhatsapp: raw.contactWhatsapp ?? "",
  contactAddress: raw.contactAddress ?? "",
  socialFacebookUrl: raw.socialFacebookUrl ?? "",
  socialInstagramUrl: raw.socialInstagramUrl ?? "",
  socialYoutubeUrl: raw.socialYoutubeUrl ?? "",
  createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
  updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : new Date(),
});

export const getTenants = async (query?: string): Promise<GetTenantsResponse> => {
  const { data } = await apiClient.get<GetTenantsApiResponse>(query ? `/tenants?${query}` : "/tenants");

  return {
    data: data.tenants.map(toTenant),
    meta: { pagination: data.pagination },
  };
};

export const getTenant = async (id: string): Promise<ITenant> => {
  const { data } = await apiClient.get<{ tenant: RawTenant }>(`/tenants/${id}`);
  return toTenant(data.tenant);
};
