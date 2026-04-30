/**
 * Production Requirements Schema
 *
 * Defines data structures for today's production summary
 * Shows what needs to be produced by package and variant
 */

export interface VariantRequirement {
  variantName: string;
  items: string[];
  totalQuantity: number;
}

export interface PackageRequirement {
  packageName: string;
  packageId: string;
  packagePrice: number;
  totalMeals: number;
  variants: VariantRequirement[];
}

export interface ProductionRequirementsData {
  date: Date;
  dayName: string;
  totalMeals: number;
  packages: PackageRequirement[];
}
