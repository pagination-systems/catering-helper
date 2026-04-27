import type { IOrder } from "../../orders/schemas/order.schema";
import type { PackageRequirement, ProductionRequirementsData, VariantRequirement } from "../schemas/production.schema";

const dayByJsIndex: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Aggregates today's confirmed orders into production requirements
 * Groups by package, then by variant within each package
 * Shows total meals needed for each variant
 */
export const aggregateProductionRequirements = (todayOrders: IOrder[]): ProductionRequirementsData => {
  const now = new Date();
  const dayName = dayByJsIndex[now.getDay()] || "Unknown";

  // Filter for confirmed orders only
  const confirmedOrders = todayOrders.filter((order) => order.status === "Confirmed");

  if (confirmedOrders.length === 0) {
    return {
      date: now,
      dayName,
      totalOrders: 0,
      totalMeals: 0,
      packages: [],
    };
  }

  // Map to aggregate by package -> variant
  const packageMap = new Map<string, Map<string, { variant: VariantRequirement; orders: Set<string> }>>();

  let totalMeals = 0;

  confirmedOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (!packageMap.has(item.packageName)) {
        packageMap.set(item.packageName, new Map());
      }

      const variantMap = packageMap.get(item.packageName)!;

      if (!variantMap.has(item.variantName)) {
        variantMap.set(item.variantName, {
          variant: {
            variantName: item.variantName,
            items: item.items,
            totalQuantity: 0,
          },
          orders: new Set(),
        });
      }

      const variantData = variantMap.get(item.variantName)!;
      variantData.variant.totalQuantity += item.quantity;
      variantData.orders.add(order.id);
      totalMeals += item.quantity;
    });
  });

  // Convert map to array structure with proper calculations
  const packages: PackageRequirement[] = Array.from(packageMap.entries()).map(([packageName, variantMap]) => {
    const variants = Array.from(variantMap.entries()).map(([_, variantData]) => {
      return variantData.variant;
    });

    const totalMealsForPackage = variants.reduce((sum, v) => sum + v.totalQuantity, 0);
    const totalOrdersForPackage = new Set(Array.from(variantMap.values()).flatMap((v) => Array.from(v.orders))).size;

    return {
      packageName,
      packageId: packageName, // Using packageName as ID since we don't have direct reference
      totalMeals: totalMealsForPackage,
      totalOrders: totalOrdersForPackage,
      variants: variants.sort((a, b) => b.totalQuantity - a.totalQuantity),
    };
  });

  return {
    date: now,
    dayName,
    totalOrders: confirmedOrders.length,
    totalMeals,
    packages: packages.sort((a, b) => b.totalMeals - a.totalMeals),
  };
};

/**
 * Format date for display (e.g., "27 Apr, 2026")
 */
export const formatProductionDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
