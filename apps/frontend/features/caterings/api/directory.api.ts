import { apiClient } from "@/lib/axios";
import type { CateringListing } from "../data";

/** Fallback cover image for tenants that haven't uploaded one yet. */
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60";

/** Tenant document fields the public directory cares about. */
type RawTenant = {
  slug: string;
  name?: string;
  description?: string;
  headline?: string;
  coverImageUrl?: string;
  logoUrl?: string;
  location?: string;
  area?: string;
  startingPrice?: number;
  minimumOrder?: number;
  rating?: number;
  reviews?: number;
  cuisines?: string[];
  popular?: boolean;
};

interface GetTenantsApiResponse {
  message: string;
  tenants: RawTenant[];
}

const toListing = (raw: RawTenant): CateringListing => ({
  slug: raw.slug,
  name: raw.name ?? "",
  description: raw.description || raw.headline || "",
  imageUrl: raw.coverImageUrl || raw.logoUrl || FALLBACK_IMAGE,
  location: raw.location ?? "",
  area: raw.area ?? "",
  startingPrice: raw.startingPrice ?? 0,
  minimumOrder: raw.minimumOrder ?? 0,
  rating: raw.rating ?? 0,
  reviews: raw.reviews ?? 0,
  cuisines: raw.cuisines ?? [],
  popular: raw.popular ?? false,
});

export const getCaterings = async (): Promise<CateringListing[]> => {
  const { data } = await apiClient.get<GetTenantsApiResponse>("/storefront/tenants?limit=100");
  return data.tenants.map(toListing);
};
