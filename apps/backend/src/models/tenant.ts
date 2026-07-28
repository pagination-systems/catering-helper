import { TENANT_INDUSTRY_ENUMS, TENANT_STATUS_ENUMS, TENANT_TYPE } from "@catering/types";
import { type AggregatePaginateModel, type Document, type Model, model, type PaginateModel, Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoosePaginate from "mongoose-paginate-v2";
import { modelNames } from "./constants";
import { type ISoftDeleteDoc, type ISoftDeleteModel, softDeletePlugin } from "./plugins/soft-delete.plugin";
import { type AwsStorageTemplate, awsStorageTemplateMongooseDefinition } from "./templates/aws-storage.template";

export interface TenantInput {
  name: string;
  description?: string;
  industry?: TENANT_INDUSTRY_ENUMS;
  type?: TENANT_TYPE;
  size?: number;
  phone?: string;
  email?: string;
  logoSquareSrc?: string;
  logoSquareStorage?: AwsStorageTemplate;
  logoRectangleSrc?: string;
  logoRectangleStorage?: AwsStorageTemplate;
  officeAddress?: string;
  addressInMap?: string;
  status?: TENANT_STATUS_ENUMS;
  website?: string;
  linkedIn?: string;

  missionStatement?: string;
  visionStatement?: string;

  coreProducts?: string;
  coreServices?: string;

  // --- Catering storefront / directory listing fields ---
  /** Unique storefront URL segment, e.g. "uttara-catering" -> /uttara-catering */
  slug: string;
  /** Storefront hero title */
  headline?: string;
  /** Listing card cover image */
  coverImageUrl?: string;
  /** Storefront logo */
  logoUrl?: string;
  /** Public menu image / PDF URL */
  menuUrl?: string;
  /** Human readable location, e.g. "Gulshan, Dhaka" */
  location?: string;
  /** Location filter key, e.g. "gulshan" */
  area?: string;
  /** Cuisine / specialty tags */
  cuisines?: string[];
  /** Lowest package price per meal */
  startingPrice?: number;
  /** Minimum number of meals per order */
  minimumOrder?: number;
  /** Flat delivery fee */
  deliveryFee?: number;
  /** Highlighted on the directory */
  popular?: boolean;
  /** Average customer rating (derived, starts at 0) */
  rating?: number;
  /** Number of customer reviews (derived, starts at 0) */
  reviews?: number;

  contactEmail?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactAddress?: string;

  socialFacebookUrl?: string;
  socialInstagramUrl?: string;
  socialYoutubeUrl?: string;
}

// Define an interface for Tenant document
export interface ITenantDoc extends TenantInput, ISoftDeleteDoc, Document {
  id: string;
  addressInMapLat?: number;
  addressInMapLng?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define an interface for Tenant model with static methods
export interface ITenantModel
  extends Model<ITenantDoc>,
    ISoftDeleteModel<ITenantDoc>,
    PaginateModel<ITenantDoc>,
    AggregatePaginateModel<ITenantDoc> {}

// Create the Tenant schema
const tenantSchema = new Schema<ITenantDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    industry: {
      type: String,
      enum: Object.values(TENANT_INDUSTRY_ENUMS),
    },
    size: {
      type: Number,
    },
    type: {
      type: String,
      enum: Object.values(TENANT_TYPE),
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    logoSquareSrc: {
      type: String,
    },
    logoSquareStorage: awsStorageTemplateMongooseDefinition,
    logoRectangleSrc: {
      type: String,
    },
    logoRectangleStorage: awsStorageTemplateMongooseDefinition,

    // Aligned with officeAddress in interface
    officeAddress: {
      type: String,
    },

    addressInMap: {
      type: String,
    },
    addressInMapLat: {
      type: Number,
    },
    addressInMapLng: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(TENANT_STATUS_ENUMS),
      default: TENANT_STATUS_ENUMS.ACTIVE,
    },
    website: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    missionStatement: {
      type: String,
    },
    visionStatement: {
      type: String,
    },
    coreProducts: {
      type: String,
    },
    coreServices: {
      type: String,
    },

    // --- Catering storefront / directory listing fields ---
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    headline: {
      type: String,
    },
    coverImageUrl: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    menuUrl: {
      type: String,
    },
    location: {
      type: String,
    },
    area: {
      type: String,
    },
    cuisines: {
      type: [String],
      default: [],
    },
    startingPrice: {
      type: Number,
      default: 0,
    },
    minimumOrder: {
      type: Number,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
    contactWhatsapp: {
      type: String,
    },
    contactAddress: {
      type: String,
    },
    socialFacebookUrl: {
      type: String,
    },
    socialInstagramUrl: {
      type: String,
    },
    socialYoutubeUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Apply plugins
tenantSchema.plugin(softDeletePlugin);
tenantSchema.plugin(mongoosePaginate);
tenantSchema.plugin(aggregatePaginate);

// Create and export the model
const Tenant = model<ITenantDoc, ITenantModel>(modelNames.TENANT, tenantSchema);

export { Tenant };
