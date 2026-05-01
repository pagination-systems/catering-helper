import { VISIBILITY_ENUM } from "@catering/types";
import {
  type AggregatePaginateModel,
  type Document,
  type Model,
  model,
  type PaginateModel,
  Schema,
  type Types,
} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoosePaginate from "mongoose-paginate-v2";
import { type ModelNames, modelNames } from "./constants";
import { type ISoftDeleteDoc, type ISoftDeleteModel, softDeletePlugin } from "./plugins/soft-delete.plugin";
import { type AwsStorageTemplate, awsStorageTemplateMongooseDefinition } from "./templates/aws-storage.template";

export interface IFileMediaInput {
  collectionName: ModelNames;
  collectionDocument: Types.ObjectId;
  storageInformation: AwsStorageTemplate;
  visibility: VISIBILITY_ENUM;
}

export interface IFileMediaDoc extends IFileMediaInput, ISoftDeleteDoc, Document {
  createdAt: Date;
  updatedAt: Date;
}

interface IFileMediaModel
  extends Model<IFileMediaDoc>,
    ISoftDeleteModel<IFileMediaDoc>,
    PaginateModel<IFileMediaDoc>,
    AggregatePaginateModel<IFileMediaDoc> {}

const fileMediaSchema = new Schema<IFileMediaDoc>(
  {
    collectionName: {
      type: String,
      required: true,
      index: true,
      enum: Object.values(modelNames),
    },
    collectionDocument: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "collectionName",
    },
    storageInformation: awsStorageTemplateMongooseDefinition,
    visibility: {
      type: String,
      enum: Object.values(VISIBILITY_ENUM),
      required: true,
      default: VISIBILITY_ENUM.PRIVATE,
    },
  },
  {
    timestamps: true,
  },
);

// --- Plugins ---
fileMediaSchema.plugin(softDeletePlugin);
fileMediaSchema.plugin(mongoosePaginate);
fileMediaSchema.plugin(aggregatePaginate);

fileMediaSchema.index({ collectionDocument: 1, collectionName: 1 });

export const FileMedia = model<IFileMediaDoc, IFileMediaModel>(modelNames.FILE_MEDIA, fileMediaSchema);
