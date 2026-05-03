import { TASK_PRIORITY_ENUMS, TASK_STATUS_ENUMS } from "@catering/types";
import Joi, { type CustomHelpers } from "joi";
import mongoose from "mongoose";

const objectIdValidation = (value: string, helpers: CustomHelpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message({ custom: `"${helpers.state.path?.join(".")}" must be a valid ObjectId` });
  }
  return value;
};

export const idParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidation).required().label("ID"),
});

export const createBodySchema = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().optional().allow(null).label("Description"),
  assignedTo: Joi.string().custom(objectIdValidation).optional().allow(null).label("Assigned To"),
  status: Joi.string()
    .valid(...Object.values(TASK_STATUS_ENUMS))
    .optional()
    .allow(null)
    .label("Status"),
  priority: Joi.string()
    .valid(...Object.values(TASK_PRIORITY_ENUMS))
    .optional()
    .allow(null)
    .label("Priority"),
  dueDate: Joi.date().optional().allow(null).label("Due Date"),
});

export const updateBodySchema = Joi.object({
  title: Joi.string().optional().label("Title"),
  description: Joi.string().optional().allow(null).label("Description"),
  assignedTo: Joi.string().custom(objectIdValidation).optional().allow(null).label("Assigned To"),
  status: Joi.string()
    .valid(...Object.values(TASK_STATUS_ENUMS))
    .optional()
    .allow(null)
    .label("Status"),
  priority: Joi.string()
    .valid(...Object.values(TASK_PRIORITY_ENUMS))
    .optional()
    .allow(null)
    .label("Priority"),
  dueDate: Joi.date().optional().allow(null).label("Due Date"),
});
