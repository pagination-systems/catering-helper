import { ACCOUNT_TYPE_ENUMS, EMAIL_VERIFICATION_STATUS_ENUMS, USER_ROLE_ENUMS } from "@catering/types";
import { type AggregatePaginateModel, type Document, type Model, model, type PaginateModel, Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoosePaginate from "mongoose-paginate-v2";
import { modelNames } from "./constants";

import { type IPasswordHashDoc, type PasswordHashInput, passwordHashPlugin } from "./plugins/password-hash.plugin";
import { type ISoftDeleteDoc, type ISoftDeleteModel, softDeletePlugin } from "./plugins/soft-delete.plugin";
import { type ITenantDoc, type ITenantModel, type TenantInput, tenantDataPlugin } from "./plugins/tenant-data.plugin";

/*
  @description UserInput interface
  @fields
  - role: system role of the user
  - type: tenant role of the user - admin, caterer, customer etc
*/
export interface UserInput extends PasswordHashInput, TenantInput {
  firstName: string;
  lastName: string;
  email: string;
  // profileImageId?: Types.ObjectId;
  role?: USER_ROLE_ENUMS;
  type?: ACCOUNT_TYPE_ENUMS;
}

// Define an interface for User document
export interface IUserDoc extends UserInput, IPasswordHashDoc, ITenantDoc, ISoftDeleteDoc, Document {
  emailVerificationStatus: EMAIL_VERIFICATION_STATUS_ENUMS;
  createdAt: Date;
  updatedAt: Date;
}

// Define an interface for User model with static methods
interface IUserModel
  extends Model<IUserDoc>,
    ISoftDeleteModel<IUserDoc>,
    PaginateModel<IUserDoc>,
    AggregatePaginateModel<IUserDoc>,
    ITenantModel<IUserDoc> {}

// Define the schema for User
const userSchema = new Schema<IUserDoc>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    // profileImageId: {
    //   type: Schema.Types.ObjectId,
    //   ref: modelNames.FILE_MEDIA,
    // },
    type: {
      type: String,
      enum: Object.values(ACCOUNT_TYPE_ENUMS),
      default: null,
    },
    emailVerificationStatus: {
      type: String,
      enum: Object.values(EMAIL_VERIFICATION_STATUS_ENUMS),
      default: EMAIL_VERIFICATION_STATUS_ENUMS.UNVERIFIED,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE_ENUMS),
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Apply plugins
userSchema.plugin(tenantDataPlugin);
userSchema.plugin(passwordHashPlugin);
userSchema.plugin(softDeletePlugin);
userSchema.plugin(mongoosePaginate);
userSchema.plugin(aggregatePaginate);

// Define the User model
const User = model<IUserDoc, IUserModel>(modelNames.USER, userSchema);

export { User };
