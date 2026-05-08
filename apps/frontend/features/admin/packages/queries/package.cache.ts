import type { QueryClient } from "@tanstack/react-query";
import type { IPackage, PackageCache, PackagesCache, packageFormInput } from "../schemas/package.schema";
import { PACKAGE_KEYS } from "./package.keys";

type UpdatePackageVars = {
  id: string;
  payload: Partial<packageFormInput>;
};

export const packageCache = {
  optimisticUpdate(queryClient: QueryClient, { id, payload }: UpdatePackageVars) {
    const previous = queryClient.getQueriesData<PackagesCache>({
      queryKey: PACKAGE_KEYS.lists(),
    });

    const existingPackage = previous.flatMap(([, cache]) => cache?.packages ?? []).find((item) => item.id === id);

    if (existingPackage) {
      const safeDays = payload.days
        ? payload.days.map((day) => ({
            day: day.day,
            variants: day.variants.map((variant) => ({
              id: variant.id ?? crypto.randomUUID(),
              name: variant.name,
              note: variant.note,
              items: [...variant.items],
              available: variant.available ?? true,
            })),
          }))
        : undefined;

      this.update(queryClient, {
        ...existingPackage,
        ...payload,
        days: safeDays ?? existingPackage.days,
        id,
        updatedAt: new Date(),
      });
    }

    return { previous };
  },

  update(queryClient: QueryClient, updatedPackage: IPackage) {
    queryClient.setQueriesData<PackagesCache>({ queryKey: PACKAGE_KEYS.lists() }, (old) => {
      if (!old) return old;

      return {
        ...old,
        packages: old.packages.map((item) => (item.id === updatedPackage.id ? updatedPackage : item)),
      };
    });

    queryClient.setQueryData<PackageCache>(PACKAGE_KEYS.detail(updatedPackage.id), (old) => {
      if (!old) return { package: updatedPackage };
      return { ...old, package: updatedPackage };
    });
  },

  optimisticHardDelete(queryClient: QueryClient, id: string) {
    const previous = queryClient.getQueriesData<PackagesCache>({
      queryKey: PACKAGE_KEYS.lists(),
    });

    queryClient.setQueriesData<PackagesCache>({ queryKey: PACKAGE_KEYS.lists() }, (old) => {
      if (!old) return old;

      return {
        ...old,
        packages: old.packages.filter((item) => item.id !== id),
      };
    });

    queryClient.removeQueries({
      queryKey: PACKAGE_KEYS.detail(id),
    });

    return { previous };
  },

  rollback(queryClient: QueryClient, previous: any) {
    previous?.forEach(([key, data]: any) => {
      queryClient.setQueryData(key, data);
    });
  },
};
