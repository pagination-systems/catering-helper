import { ORDER_SOURCE_ENUM, ORDER_STATUS_ENUM } from "@catering/types";
import Joi from "joi";
import { objectIdValidation } from "../../../common/helper";

const bdPhoneRegex = /^01[3-9]\d{8}$/;

// `pricePerMeal`, `subtotal` and the authoritative `packageName` are resolved
// server-side from the referenced package — clients only send the reference,
// the chosen variant, quantity, and a food-item snapshot.
const orderItemSchema = Joi.object({
  id: Joi.string().trim().max(80).label("Item ID"),
  packageId: Joi.string().custom(objectIdValidation).required().label("Package"),
  packageName: Joi.string().trim().max(100).label("Package name"),
  variantName: Joi.string().trim().min(2).max(100).required().label("Variant name"),
  items: Joi.array().items(Joi.string().trim().min(1).max(120).label("Food item")).default([]).label("Food items"),
  quantity: Joi.number().integer().min(1).max(500).required().label("Quantity"),
}).label("Order item");

const itemsSchema = Joi.array().items(orderItemSchema).min(1).required().label("Items");

export const idParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidation).required().label("ID"),
});

// Fields shared by admin create/update and the public storefront create endpoint.
const baseOrderFields = {
  customerName: Joi.string().trim().min(2).max(80).label("Customer name"),
  customerPhone: Joi.string().trim().pattern(bdPhoneRegex).label("Customer phone").messages({
    "string.pattern.base": "Enter a valid Bangladesh phone number.",
  }),
  deliveryAddress: Joi.string().trim().min(8).max(240).label("Delivery address"),
  notes: Joi.string().trim().max(300).allow("").default("").label("Notes"),
  packageName: Joi.string().trim().min(2).max(100).label("Package name"),
  // Accepts full ISO timestamps and `YYYY-MM-DD` (parsed as UTC midnight).
  deliveryDate: Joi.date().label("Delivery date"),
  deliveryFee: Joi.number().min(0).max(100000).label("Delivery fee"),
  items: itemsSchema,
};

export const createOrderBodySchema = Joi.object({
  ...baseOrderFields,
  customerName: baseOrderFields.customerName.required(),
  customerPhone: baseOrderFields.customerPhone.required(),
  deliveryAddress: baseOrderFields.deliveryAddress.required(),
  packageName: baseOrderFields.packageName.required(),
  deliveryDate: baseOrderFields.deliveryDate.required(),
  source: Joi.string()
    .valid(...Object.values(ORDER_SOURCE_ENUM))
    .default(ORDER_SOURCE_ENUM.ADMIN_PANEL)
    .label("Source"),
  status: Joi.string()
    .valid(...Object.values(ORDER_STATUS_ENUM))
    .default(ORDER_STATUS_ENUM.CONFIRMED)
    .label("Status"),
  tenantId: Joi.string().custom(objectIdValidation).allow(null).label("Tenant"),
});

export const updateOrderBodySchema = Joi.object({
  id: Joi.string().custom(objectIdValidation).required().label("ID"),
  ...baseOrderFields,
  source: Joi.string()
    .valid(...Object.values(ORDER_SOURCE_ENUM))
    .label("Source"),
  status: Joi.string()
    .valid(...Object.values(ORDER_STATUS_ENUM))
    .label("Status"),
})
  .min(2)
  .messages({
    "object.min": "Provide at least one field to update.",
  });

// Public storefront create — tenant is resolved from the URL slug, source/status forced server-side.
export const createPublicOrderBodySchema = Joi.object({
  customerName: baseOrderFields.customerName.required(),
  customerPhone: baseOrderFields.customerPhone.required(),
  deliveryAddress: baseOrderFields.deliveryAddress.required(),
  notes: baseOrderFields.notes,
  packageName: baseOrderFields.packageName.required(),
  deliveryDate: baseOrderFields.deliveryDate.required(),
  deliveryFee: baseOrderFields.deliveryFee,
  items: itemsSchema,
});
