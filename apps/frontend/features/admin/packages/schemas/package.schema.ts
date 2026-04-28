import { z } from "zod";

export const dayOrder = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;

export type DayName = (typeof dayOrder)[number];

export enum PackageStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export interface PaginationMeta {
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page?: number | undefined;
  totalPages: number;
  prevPage?: number | null | undefined;
  nextPage?: number | null | undefined;
  pagingCounter: number;
}

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

export interface ICateringPackage {
  id: string;
  name: string;
  description: string;
  pricePerMeal: number;
  status: PackageStatus;
  days: IDayPlan[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GetPackagesResponse {
  data: ICateringPackage[];
  meta: {
    pagination: PaginationMeta;
  };
}

const foodItemSchema = z.string().trim().min(1, "Food item is required.").max(80, "Food item is too long.");

const menuVariantSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Variant name must be at least 2 characters.").max(80),
  note: z.string().trim().max(160),
  items: z.array(foodItemSchema).min(1, "Add at least one food item."),
  available: z.boolean().optional(),
});

const dayPlanSchema = z.object({
  day: z.enum(dayOrder),
  variants: z.array(menuVariantSchema).min(1, "Each day needs at least one variant."),
});

export const createPackageSchema = z
  .object({
    name: z.string().trim().min(2, "Package name must be at least 2 characters.").max(100),
    description: z.string().trim().min(8, "Description must be at least 8 characters.").max(300),
    pricePerMeal: z.number().int().min(1, "Price must be at least 1 BDT.").max(100000),
    status: z.enum(PackageStatus),
    days: z.array(dayPlanSchema).length(dayOrder.length, "A package must have exactly 7 day plans."),
  })
  .superRefine((value, ctx) => {
    const uniqueDays = new Set(value.days.map((day) => day.day));

    if (uniqueDays.size !== dayOrder.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["days"],
        message: "Each day from Sat to Fri must be configured exactly once.",
      });
    }
  });

export type CreatePackageValues = z.infer<typeof createPackageSchema>;
