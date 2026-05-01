import { VISIBILITY_ENUM } from "@catering/types";
import Joi, { type CustomHelpers } from "joi";
import mongoose from "mongoose";
import { modelNames } from "../../../models/constants";
import type { AwsStorageTemplate } from "../../../models/templates/aws-storage.template";

const objectIdValidation = (value: string, helpers: CustomHelpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    const path = helpers.state.path?.join(".") ?? "value";
    return helpers.message({ custom: `"${path}" must be a valid ObjectId` });
  }
  return value;
};

const validModelNames = Object.values(modelNames);
const validVisibilities = Object.values(VISIBILITY_ENUM);

export const createBodySchema = Joi.object({
  collectionName: Joi.string()
    .valid(...validModelNames)
    .required()
    .label("Collection Name"),

  collectionDocument: Joi.string().required().custom(objectIdValidation).label("Collection Document"),

  storageInformation: Joi.object<AwsStorageTemplate>({
    Name: Joi.string().required(),
    Key: Joi.string().required(),
    Bucket: Joi.string().required(),
  })
    .required()
    .label("Storage Information"),

  thumbnail: Joi.object<AwsStorageTemplate>({
    Name: Joi.string().required(),
    Key: Joi.string().required(),
    Bucket: Joi.string().required(),
  })
    .optional()
    .label("Thumbnail"),

  visibility: Joi.string()
    .valid(...validVisibilities)
    .required()
    .label("Visibility"),
});

export const updateBodySchema = Joi.object({
  collectionName: Joi.string()
    .valid(...validModelNames)
    .optional()
    .label("Collection Name"),

  collectionDocument: Joi.string().optional().custom(objectIdValidation).label("Collection Document"),

  storageInformation: Joi.object<AwsStorageTemplate>({
    Name: Joi.string(),
    Key: Joi.string(),
    Bucket: Joi.string(),
  })
    .optional()
    .label("Storage Information"),

  thumbnail: Joi.object<AwsStorageTemplate>({
    Name: Joi.string(),
    Key: Joi.string(),
    Bucket: Joi.string(),
  })
    .optional()
    .label("Thumbnail"),

  visibility: Joi.string()
    .valid(...validVisibilities)
    .optional()
    .label("Visibility"),
});

export const idParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidation).required().label("ID"),
});
