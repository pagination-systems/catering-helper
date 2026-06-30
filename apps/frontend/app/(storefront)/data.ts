import { cache } from "react";

export type TenantData = {
  slug: string;
  name: string;
  title: string;
  logoUrl: string;
  menuUrl: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  address: string;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
};

type TenantRecord = Omit<TenantData, "slug">;

const defaultTenantRecord: TenantRecord = {
  name: "Uttara Catering",
  title: "Premium Menus, Frictionless Customization",
  logoUrl:
    "https://images.unsplash.com/photo-1575395311793-ad870d50fbd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGxvZ298ZW58MHx8MHx8fDA%3D",
  menuUrl: "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22",
  description: "Premium corporate catering platform. Healthy, balanced, and perfectly on time for your team's success.",
  contactEmail: "info@uttaracatering.com",
  contactPhone: "+880 1711-000000",
  contactWhatsapp: "+880 1711-000000",
  address: "123 Corporate Area, Gulshan 1, Dhaka 1212, Bangladesh",
  social: {
    facebook: "https://www.facebook.com/uttaracatering",
    instagram: "https://www.instagram.com/uttaracatering",
    youtube: "https://www.youtube.com/@uttaracatering",
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9027/api/v1";

/** Tenant document fields the storefront renders. */
type RawTenant = {
  slug: string;
  name?: string;
  headline?: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  menuUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactAddress?: string;
  socialFacebookUrl?: string;
  socialInstagramUrl?: string;
  socialYoutubeUrl?: string;
};

const toTenantData = (raw: RawTenant): TenantData => ({
  slug: raw.slug,
  name: raw.name ?? "",
  title: raw.headline || defaultTenantRecord.title,
  logoUrl: raw.logoUrl || defaultTenantRecord.logoUrl,
  // Hero image: prefer the cover, then the menu image, then a sensible default.
  menuUrl: raw.coverImageUrl || raw.menuUrl || defaultTenantRecord.menuUrl,
  description: raw.description || "",
  contactEmail: raw.contactEmail ?? "",
  contactPhone: raw.contactPhone ?? "",
  contactWhatsapp: raw.contactWhatsapp ?? "",
  address: raw.contactAddress ?? "",
  social: {
    facebook: raw.socialFacebookUrl ?? "",
    instagram: raw.socialInstagramUrl ?? "",
    youtube: raw.socialYoutubeUrl ?? "",
  },
});

/**
 * Fetch a tenant's public storefront data by slug. Memoized per request so the
 * layout and page share a single backend call. Returns `null` when the tenant
 * does not exist (callers should render a 404).
 */
export const getTenantData = cache(async (slug: string): Promise<TenantData | null> => {
  try {
    const response = await fetch(`${API_URL}/storefront/tenants/${slug.toLowerCase()}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;

    const json = (await response.json()) as { tenant?: RawTenant };
    if (!json.tenant) return null;

    return toTenantData(json.tenant);
  } catch {
    return null;
  }
});
