import { PACKAGE_STATUS_ENUM } from "@catering/types";
import { useQuery } from "@tanstack/react-query";
import { getPackages } from "@/features/admin/packages/api/package.api";

export type OrderCatalogVariant = {
  name: string;
  items: string[];
};

export type OrderCatalogPackage = {
  id: string;
  name: string;
  pricePerMeal: number;
  variants: OrderCatalogVariant[];
};

/**
 * Loads the tenant's active packages and flattens them into a package → variant
 * catalog for the order form. Variants are de-duplicated by name across the
 * weekly menu; price is taken from the package (the single source of truth).
 */
export const usePackageCatalog = (tenantId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders", "package-catalog", tenantId ?? "all"],
    queryFn: () => {
      const params = new URLSearchParams({ status: PACKAGE_STATUS_ENUM.ACTIVE, limit: "100" });
      if (tenantId) params.set("tenantId", tenantId);
      return getPackages(params.toString());
    },
  });

  const catalog: OrderCatalogPackage[] = (data?.packages ?? []).map((pkg) => {
    const variantsByName = new Map<string, string[]>();
    for (const day of pkg.days) {
      for (const variant of day.variants) {
        if (variant.available !== false && !variantsByName.has(variant.name)) {
          variantsByName.set(variant.name, variant.items);
        }
      }
    }

    return {
      id: pkg.id,
      name: pkg.name,
      pricePerMeal: pkg.pricePerMeal,
      variants: [...variantsByName].map(([name, items]) => ({ name, items })),
    };
  });

  return { catalog, isLoading };
};
