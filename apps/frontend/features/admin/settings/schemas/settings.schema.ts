import { z } from "zod";

const requiredUrlMessage = "Enter a valid URL including http:// or https://.";

export interface ITenant {
  name: string;
  title: string;
  logoUrl: string;
  menuUrl: string;
  description: string;
  deliveryFee: number;
  lastOrderTime: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  address: string;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}

export const updateTenantSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  title: z.string().trim().min(6, "Title must be at least 6 characters."),
  logoUrl: z.string().trim().url(requiredUrlMessage),
  menuUrl: z.string().trim().url(requiredUrlMessage),
  description: z.string().trim().min(20, "Description must be at least 20 characters."),
  deliveryFee: z.number().int().min(0, "Delivery fee cannot be negative."),
  lastOrderTime: z
    .string()
    .optional()
    .refine((val) => !!val, {
      message: "Last order time is required.",
    })
    .refine((val) => /^([01]\d|2[0-3]):?([0-5]\d)$/.test(val!), {
      message: "Enter time in HH:mm format.",
    }),
  contactEmail: z.string().trim().email("Enter a valid email address."),
  contactPhone: z.string().trim().min(7, "Phone number must be at least 7 characters."),
  contactWhatsapp: z.string().trim().min(7, "WhatsApp number must be at least 7 characters."),
  address: z.string().trim().min(10, "Address must be at least 10 characters."),
  social: z.object({
    facebook: z.string().trim().url(requiredUrlMessage),
    instagram: z.string().trim().url(requiredUrlMessage),
    youtube: z.string().trim().url(requiredUrlMessage),
  }),
});

export type UpdateTenantValues = z.infer<typeof updateTenantSchema>;
