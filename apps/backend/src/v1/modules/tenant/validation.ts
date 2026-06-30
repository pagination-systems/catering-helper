import { TENANT_STATUS_ENUMS } from "@catering/types";
import Joi from "joi";
import { objectIdValidation } from "../../../common/helper";

// Bangladesh mobile number, e.g. 01712345678
const bdPhoneRegex = /^01[3-9]\d{8}$/;
// kebab-case storefront slug, e.g. "uttara-catering"
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const optionalUrl = Joi.string().trim().uri().allow("");

export const idParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidation).required().label("ID"),
});

export const slugParamsSchema = Joi.object({
  slug: Joi.string().trim().lowercase().pattern(slugRegex).required().label("Slug").messages({
    "string.pattern.base": "Slug may only contain lowercase letters, numbers and hyphens.",
  }),
});

export const createTenantBodySchema = Joi.object({
  // Profile
  name: Joi.string().trim().min(2).max(80).required().label("Name"),
  slug: Joi.string().trim().lowercase().pattern(slugRegex).min(2).max(80).required().label("Slug").messages({
    "string.pattern.base": "Slug may only contain lowercase letters, numbers and hyphens.",
  }),
  headline: Joi.string().trim().max(120).allow("").label("Headline"),
  description: Joi.string().trim().max(500).allow("").label("Description"),
  status: Joi.string()
    .valid(...Object.values(TENANT_STATUS_ENUMS))
    .default(TENANT_STATUS_ENUMS.ACTIVE)
    .label("Status"),
  phone: Joi.string().trim().pattern(bdPhoneRegex).required().label("Phone").messages({
    "string.pattern.base": "Enter a valid Bangladesh phone number.",
  }),

  // Discovery / listing card
  coverImageUrl: optionalUrl.label("Cover image URL"),
  logoUrl: optionalUrl.label("Logo URL"),
  menuUrl: optionalUrl.label("Menu URL"),
  location: Joi.string().trim().max(120).allow("").label("Location"),
  area: Joi.string().trim().max(60).allow("").label("Area"),
  cuisines: Joi.array().items(Joi.string().trim().max(40)).default([]).label("Cuisines"),
  startingPrice: Joi.number().min(0).default(0).label("Starting price"),
  minimumOrder: Joi.number().integer().min(0).default(0).label("Minimum order"),
  deliveryFee: Joi.number().min(0).default(0).label("Delivery fee"),
  popular: Joi.boolean().default(false).label("Popular"),

  // Contact
  contactEmail: Joi.string().trim().email().allow("").label("Contact email"),
  contactPhone: Joi.string().trim().pattern(bdPhoneRegex).allow("").label("Contact phone").messages({
    "string.pattern.base": "Enter a valid Bangladesh phone number.",
  }),
  contactWhatsapp: Joi.string().trim().pattern(bdPhoneRegex).allow("").label("Contact WhatsApp").messages({
    "string.pattern.base": "Enter a valid Bangladesh phone number.",
  }),
  contactAddress: Joi.string().trim().max(240).allow("").label("Contact address"),

  // Social
  socialFacebookUrl: optionalUrl.label("Facebook URL"),
  socialInstagramUrl: optionalUrl.label("Instagram URL"),
  socialYoutubeUrl: optionalUrl.label("YouTube URL"),
});
