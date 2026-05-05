import { type PaginationMeta, TENANT_STATUS_ENUM } from "@catering/types";
import { z } from "zod";

export interface ITenant {
  id: string;
  name: string;
  phone: string;
  status: TENANT_STATUS_ENUM;
  description: string;
  headline: string;
  logoUrl: string;
  menuUrl: string;
  deliveryFee: number;
  lastOrderDate: Date | null;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  contactAddress: string;
  socialFacebookUrl: string;
  socialInstagramUrl: string;
  socialYoutubeUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetTenantsResponse {
  data: ITenant[];
  meta: {
    pagination: PaginationMeta;
  };
}

const bdPhoneRegex = /^01[3-9]\d{8}$/;

export const createTenantSchema = z.object({
  name: z.string().trim().min(2, "Tenant name must be at least 2 characters.").max(80),
  phone: z
    .string()
    .trim()
    .regex(bdPhoneRegex, "Enter a valid Bangladesh phone number.")
    .min(10, "Phone number must be at least 10 digits.")
    .max(20, "Phone number is too long."),
  status: z.nativeEnum(TENANT_STATUS_ENUM),
  description: z.string().trim().max(240),
  headline: z.string().trim().max(100),
  logoUrl: z.string().trim().url("Enter a valid logo URL."),
  menuUrl: z.string().trim().url("Enter a valid menu URL."),
  deliveryFee: z.number().min(0, "Delivery fee must be a positive number."),
  contactEmail: z.string().trim().email("Enter a valid email address."),
  contactPhone: z.string().trim().regex(bdPhoneRegex, "Enter a valid Bangladesh phone number."),
  contactWhatsapp: z.string().trim().regex(bdPhoneRegex, "Enter a valid Bangladesh phone number."),
  contactAddress: z.string().trim().min(8, "Address must be at least 8 characters.").max(240),
  socialFacebookUrl: z.string().trim().url("Enter a valid Facebook URL."),
  socialInstagramUrl: z.string().trim().url("Enter a valid Instagram URL."),
  socialYoutubeUrl: z.string().trim().url("Enter a valid YouTube URL."),
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

export type CreateTenantValues = z.infer<typeof createTenantSchema>;
