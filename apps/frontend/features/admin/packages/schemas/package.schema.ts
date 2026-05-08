import { PACKAGE_STATUS_ENUM, type PaginationMeta } from "@catering/types";
import { z } from "zod";

export const dayOrder = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;

export type DayName = (typeof dayOrder)[number];

export interface IMenuVariant {
  id: string;
  name: string;
  note: string;
  items: string[];
  available?: boolean;
}

export interface IDayPlan {
  day: DayName;
  variants: IMenuVariant[];
}

export interface IPackage {
  id: string;
  name: string;
  description: string;
  pricePerMeal: number;
  status: PACKAGE_STATUS_ENUM;
  days: IDayPlan[];
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetPackagesResponse {
  packages: IPackage[];
  meta: {
    pagination: PaginationMeta;
  };
}

interface ApiEnvelope {
  message: string;
  statusCode: number;
}

export interface GetPackagesApiResponse extends ApiEnvelope {
  packages: IPackage[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface GetPackageApiResponse extends ApiEnvelope {
  package: IPackage;
}

export interface CreatePackageApiResponse extends ApiEnvelope {
  package: IPackage;
}

export interface UpdatePackageApiResponse extends ApiEnvelope {
  package: IPackage;
}

export interface DeletePackageApiResponse extends ApiEnvelope {
  package: null;
}

export interface PackagesCache {
  packages: IPackage[];
  pagination: PaginationMeta;
}

export interface PackageCache {
  package: IPackage;
}

export interface PackageMutationResult {
  package: IPackage;
  message: string;
}

export type PackageValidationMessages = {
  packageNameMin: string;
  packageNameMax: string;
  descriptionMin: string;
  descriptionMax: string;
  priceMin: string;
  priceMax: string;
  variantNameMin: string;
  variantNameMax: string;
  foodItemRequired: string;
  foodItemTooLong: string;
  addAtLeastOneFoodItem: string;
  eachDayNeedsAtLeastOneVariant: string;
  exactlySevenDayPlans: string;
  eachDayOnce: string;
};

export const packageFormSchema = (messages: PackageValidationMessages) =>
  z
    .object({
      name: z.string().trim().min(2, messages.packageNameMin).max(100, messages.packageNameMax),
      description: z.string().trim().min(8, messages.descriptionMin).max(300, messages.descriptionMax),
      pricePerMeal: z.number().int().min(1, messages.priceMin).max(100000, messages.priceMax),
      days: z
        .array(
          z.object({
            day: z.enum(dayOrder),
            variants: z
              .array(
                z.object({
                  id: z.string().optional(),
                  name: z.string().trim().min(2, messages.variantNameMin).max(80, messages.variantNameMax),
                  note: z.string().trim().max(160),
                  items: z
                    .array(z.string().trim().min(1, messages.foodItemRequired).max(80, messages.foodItemTooLong))
                    .min(1, messages.addAtLeastOneFoodItem),
                  available: z.boolean().optional(),
                }),
              )
              .min(1, messages.eachDayNeedsAtLeastOneVariant),
          }),
        )
        .length(dayOrder.length, messages.exactlySevenDayPlans),
    })
    .superRefine((value, ctx) => {
      const uniqueDays = new Set(value.days.map((day) => day.day));

      if (uniqueDays.size !== dayOrder.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["days"],
          message: messages.eachDayOnce,
        });
      }
    });

export const updatePackageSchema = (messages: PackageValidationMessages) =>
  z
    .object({
      name: z.string().trim().min(2, messages.packageNameMin).max(100, messages.packageNameMax),
      description: z.string().trim().min(8, messages.descriptionMin).max(300, messages.descriptionMax),
      pricePerMeal: z.number().int().min(1, messages.priceMin).max(100000, messages.priceMax),
      status: z.enum(PACKAGE_STATUS_ENUM),
      days: z
        .array(
          z.object({
            day: z.enum(dayOrder),
            variants: z
              .array(
                z.object({
                  id: z.string().optional(),
                  name: z.string().trim().min(2, messages.variantNameMin).max(80, messages.variantNameMax),
                  note: z.string().trim().max(160),
                  items: z
                    .array(z.string().trim().min(1, messages.foodItemRequired).max(80, messages.foodItemTooLong))
                    .min(1, messages.addAtLeastOneFoodItem),
                  available: z.boolean().optional(),
                }),
              )
              .min(1, messages.eachDayNeedsAtLeastOneVariant),
          }),
        )
        .length(dayOrder.length, messages.exactlySevenDayPlans),
    })
    .superRefine((value, ctx) => {
      const uniqueDays = new Set(value.days.map((day) => day.day));

      if (uniqueDays.size !== dayOrder.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["days"],
          message: messages.eachDayOnce,
        });
      }
    });

export type packageFormInput = z.infer<ReturnType<typeof packageFormSchema>>;
export type UpdatePackageInput = z.infer<ReturnType<typeof updatePackageSchema>>;
