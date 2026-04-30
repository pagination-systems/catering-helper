import { create } from "zustand";
import type { PackageRequirement, ProductionRequirementsData, VariantRequirement } from "../schemas/production.schema";

type ProductionRequirementsStoreState = {
  data: ProductionRequirementsData;
};

const dayByJsIndex: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Generate seed production data for today
 */
const generateProductionData = (): ProductionRequirementsData => {
  const now = new Date();
  const dayName = dayByJsIndex[now.getDay()] || "Unknown";

  // Seed variant requirements
  const dailyBasicVariants: VariantRequirement[] = [
    {
      variantName: "Khichuri Set",
      items: ["Khichuri", "Egg fry"],
      totalQuantity: 24,
    },
    {
      variantName: "Fish Rice Set",
      items: ["Rice", "Tilapia fish", "Dal"],
      totalQuantity: 18,
    },
    {
      variantName: "Chicken Jhol Set",
      items: ["Rice", "Chicken jhol", "Vegetable"],
      totalQuantity: 15,
    },
  ];

  const standardPackageVariants: VariantRequirement[] = [
    {
      variantName: "Chicken Bhuna Set",
      items: ["Polao", "Chicken", "Salad"],
      totalQuantity: 30,
    },
    {
      variantName: "Fish Set",
      items: ["Rice", "Fish curry", "Dal"],
      totalQuantity: 40,
    },
    {
      variantName: "Mixed Meat Set",
      items: ["Basmati rice", "Mixed meat", "Lentil"],
      totalQuantity: 12,
    },
  ];

  const premiumPackageVariants: VariantRequirement[] = [
    {
      variantName: "Chicken Roast Set",
      items: ["Polao", "Chicken roast", "Raita"],
      totalQuantity: 36,
    },
    {
      variantName: "Beef Bhuna Set",
      items: ["Polao", "Beef bhuna", "Borhani"],
      totalQuantity: 45,
    },
  ];

  // Seed packages
  const packages: PackageRequirement[] = [
    {
      packageName: "Premium Package",
      packageId: "premium-pkg-001",
      packagePrice: 150,
      totalMeals: 81,
      variants: premiumPackageVariants.sort((a, b) => b.totalQuantity - a.totalQuantity),
    },
    {
      packageName: "Standard Package",
      packageId: "standard-pkg-001",
      packagePrice: 130,
      totalMeals: 82,
      variants: standardPackageVariants.sort((a, b) => b.totalQuantity - a.totalQuantity),
    },
    {
      packageName: "Daily Basic Package",
      packageId: "basic-pkg-001",
      packagePrice: 120,
      totalMeals: 57,
      variants: dailyBasicVariants.sort((a, b) => b.totalQuantity - a.totalQuantity),
    },
  ];

  const totalMeals = packages.reduce((sum, pkg) => sum + pkg.totalMeals, 0);

  return {
    date: now,
    dayName,
    totalMeals,
    packages: packages.sort((a, b) => b.totalMeals - a.totalMeals),
  };
};

export const useProductionRequirementsStore = create<ProductionRequirementsStoreState>(() => ({
  data: generateProductionData(),
}));
