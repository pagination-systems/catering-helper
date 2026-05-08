import type { IPackage } from "../schemas/package.schema";

export const getTotalVariants = (item?: IPackage) => {
  if (!item) return 0;

  return item.days.reduce((sum, day) => sum + day.variants.length, 0);
};

export const getTotalFoodItems = (item?: IPackage) => {
  if (!item) return 0;

  return item.days.reduce(
    (sum, day) => sum + day.variants.reduce((variantSum, variant) => variantSum + variant.items.length, 0),
    0,
  );
};
