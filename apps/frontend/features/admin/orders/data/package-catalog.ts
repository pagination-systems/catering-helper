export type AdminPackageCatalogItem = {
  name: string;
  pricePerMeal: number;
  variants: string[];
};

// Temporary catalog until package/variant options are delivered from API.
export const adminPackageCatalog: AdminPackageCatalogItem[] = [
  {
    name: "Daily Basic Package",
    pricePerMeal: 120,
    variants: ["Khichuri Set", "Fish Rice Set", "Chicken Jhol Set"],
  },
  {
    name: "Standard Package",
    pricePerMeal: 130,
    variants: ["Chicken Bhuna Set", "Fish Set", "Egg Curry Set"],
  },
  {
    name: "Premium Package",
    pricePerMeal: 150,
    variants: ["Chicken Roast Set", "Beef Bhuna Set", "Ilish Set"],
  },
];

export const getPackageByName = (packageName: string) => {
  return adminPackageCatalog.find((item) => item.name === packageName);
};

export const getVariantsByPackageName = (packageName: string) => {
  return getPackageByName(packageName)?.variants ?? [];
};

export const getPriceByPackageName = (packageName: string) => {
  return getPackageByName(packageName)?.pricePerMeal ?? 120;
};
