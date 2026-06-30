import { TENANT_STATUS_ENUMS } from "@catering/types";
import { z } from "zod";

// Bangladesh mobile number, e.g. 01712345678
const bdPhoneRegex = /^01[3-9]\d{8}$/;
// kebab-case storefront slug, e.g. "uttara-catering"
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const optionalUrl = z.union([z.string().trim().url("Enter a valid URL."), z.literal("")]);
const optionalPhone = z.union([
  z.string().trim().regex(bdPhoneRegex, "Enter a valid Bangladesh phone number."),
  z.literal(""),
]);

export const onboardCatererSchema = z.object({
  // Profile
  name: z.string().trim().min(2, "Caterer name must be at least 2 characters.").max(80),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters.")
    .max(80)
    .regex(slugRegex, "Use lowercase letters, numbers and hyphens only."),
  headline: z.string().trim().max(120, "Headline is too long.").default(""),
  description: z.string().trim().max(500, "Description is too long.").default(""),
  status: z.nativeEnum(TENANT_STATUS_ENUMS).default(TENANT_STATUS_ENUMS.ACTIVE),
  phone: z.string().trim().regex(bdPhoneRegex, "Enter a valid Bangladesh phone number."),

  // Discovery / listing card
  coverImageUrl: optionalUrl,
  location: z.string().trim().max(120).default(""),
  area: z.string().trim().max(60).default(""),
  cuisines: z.array(z.string().trim().min(1)).default([]),
  startingPrice: z.coerce.number().min(0, "Must be a positive number."),
  minimumOrder: z.coerce.number().int("Must be a whole number.").min(0, "Must be a positive number."),
  deliveryFee: z.coerce.number().min(0, "Must be a positive number."),
  popular: z.boolean().default(false),

  // Branding & menu
  logoUrl: optionalUrl,
  menuUrl: optionalUrl,

  // Contact
  contactEmail: z.union([z.string().trim().email("Enter a valid email address."), z.literal("")]),
  contactPhone: optionalPhone,
  contactWhatsapp: optionalPhone,
  contactAddress: z.string().trim().max(240).default(""),

  // Social
  socialFacebookUrl: optionalUrl,
  socialInstagramUrl: optionalUrl,
  socialYoutubeUrl: optionalUrl,
});

/** Parsed/validated values (numbers coerced, defaults applied) — what `onSubmit` receives. */
export type OnboardCatererValues = z.infer<typeof onboardCatererSchema>;
/** Raw form-field values before zod coercion — used as the react-hook-form field type. */
export type OnboardCatererInput = z.input<typeof onboardCatererSchema>;

export interface OnboardCatererResponse {
  message: string;
  tenant: {
    id: string;
    slug: string;
    name: string;
  } & Record<string, unknown>;
}
