import { PACKAGE_STATUS_ENUM } from "@catering/types";
import Joi from "joi";
import { objectIdValidation } from "../../../common/helper";
import { PACKAGE_DAY_ENUMS } from "../../../models/package";

const menuVariantSchema = Joi.object({
  id: Joi.string().trim().max(80).label("Variant ID"),
  name: Joi.string().trim().min(2).max(80).required().label("Variant name"),
  note: Joi.string().trim().max(160).allow("").default("").label("Variant note"),
  items: Joi.array().items(Joi.string().trim().min(1).max(80).label("Food item")).min(1).required().label("Food items"),
  available: Joi.boolean().default(true).label("Available"),
});

const dayPlanSchema = Joi.object({
  day: Joi.string()
    .valid(...PACKAGE_DAY_ENUMS)
    .required()
    .label("Day"),
  variants: Joi.array().items(menuVariantSchema).min(1).required().label("Variants"),
});

// Exactly one plan per day of the week, with no duplicate days.
const daysSchema = Joi.array()
  .items(dayPlanSchema)
  .length(PACKAGE_DAY_ENUMS.length)
  .unique("day")
  .label("Days")
  .messages({
    "array.length": `Provide a plan for each of the ${PACKAGE_DAY_ENUMS.length} days.`,
    "array.unique": "Each day may only appear once.",
  });

export const idParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidation).required().label("ID"),
});

export const createPackageBodySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().label("Name"),
  description: Joi.string().trim().min(8).max(300).required().label("Description"),
  pricePerMeal: Joi.number().integer().min(1).max(100000).required().label("Price per meal"),
  status: Joi.string()
    .valid(...Object.values(PACKAGE_STATUS_ENUM))
    .default(PACKAGE_STATUS_ENUM.ACTIVE)
    .label("Status"),
  days: daysSchema.required(),
  tenantId: Joi.string().custom(objectIdValidation).required().label("Tenant"),
});

export const updatePackageBodySchema = Joi.object({
  id: Joi.string().custom(objectIdValidation).required().label("ID"),
  name: Joi.string().trim().min(2).max(100).label("Name"),
  description: Joi.string().trim().min(8).max(300).label("Description"),
  pricePerMeal: Joi.number().integer().min(1).max(100000).label("Price per meal"),
  status: Joi.string()
    .valid(...Object.values(PACKAGE_STATUS_ENUM))
    .label("Status"),
  days: daysSchema,
})
  .min(2)
  .messages({
    "object.min": "Provide at least one field to update.",
  });
