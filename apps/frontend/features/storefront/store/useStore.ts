import { create } from "zustand";
import { type CateringPackage, type DayName, dayOrder } from "../data";

export type PackageSelectionState = {
  activeDay: DayName;
  quantities: Record<string, number>;
};

type ClientPortalState = {
  packages: CateringPackage[];
  activePackageId: string;
  customizerOpen: boolean;
  mobileSummaryOpen: boolean;
  recentlyUpdatedKey: string | null;
  packageSelections: Record<string, PackageSelectionState>;

  // Actions
  initializePackages: (packages: CateringPackage[]) => void;
  setActivePackageId: (id: string) => void;
  setCustomizerOpen: (open: boolean) => void;
  setMobileSummaryOpen: (open: boolean) => void;
  setRecentlyUpdatedKey: (key: string | null) => void;

  pickPackage: (packageId: string) => void;
  setActiveDay: (pkgId: string, day: DayName) => void;
  updateQuantity: (pkgId: string, day: DayName, variantId: string, next: number) => void;
};

function getTodayDayName(): DayName {
  const daysByJsIndex: DayName[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysByJsIndex[new Date().getDay()];
}

export function createQuantityKey(day: DayName, variantId: string): string {
  return `${day}::${variantId}`;
}

function createInitialSelection(menuPackage: CateringPackage): PackageSelectionState {
  const today = getTodayDayName();
  const fallbackDay = menuPackage.days[0]?.day ?? dayOrder[0];

  return {
    activeDay: menuPackage.days.some((day) => day.day === today) ? today : fallbackDay,
    quantities: {},
  };
}

export const useStorefrontStore = create<ClientPortalState>((set) => ({
  packages: [],
  activePackageId: "",
  customizerOpen: true,
  mobileSummaryOpen: false,
  recentlyUpdatedKey: null,
  packageSelections: {},

  // Hydrate the store with the tenant's real packages. Preserves any existing
  // selections (by package id) so switching languages / remounting keeps the cart.
  initializePackages: (packages) =>
    set((state) => {
      const packageSelections: Record<string, PackageSelectionState> = {};
      packages.forEach((pkg) => {
        packageSelections[pkg.id] = state.packageSelections[pkg.id] ?? createInitialSelection(pkg);
      });

      const activeStillValid = packages.some((pkg) => pkg.id === state.activePackageId);
      const activePackageId = activeStillValid
        ? state.activePackageId
        : (packages.find((pkg) => pkg.popular)?.id ?? packages[0]?.id ?? "");

      return { packages, packageSelections, activePackageId };
    }),

  setActivePackageId: (id) => set({ activePackageId: id }),
  setCustomizerOpen: (open) => set({ customizerOpen: open }),
  setMobileSummaryOpen: (open) => set({ mobileSummaryOpen: open }),
  setRecentlyUpdatedKey: (key) => set({ recentlyUpdatedKey: key }),

  pickPackage: (packageId) => {
    set({ activePackageId: packageId, customizerOpen: true });
  },

  setActiveDay: (pkgId, day) => {
    set((state) => {
      const pkg = state.packages.find((p) => p.id === pkgId);
      const currentSelection =
        state.packageSelections[pkgId] ?? (pkg ? createInitialSelection(pkg) : { activeDay: day, quantities: {} });
      return {
        packageSelections: {
          ...state.packageSelections,
          [pkgId]: {
            ...currentSelection,
            activeDay: day,
          },
        },
      };
    });
  },

  updateQuantity: (pkgId, day, variantId, next) => {
    const safe = Math.max(0, Math.min(500, next));
    const key = createQuantityKey(day, variantId);

    set((state) => {
      const pkgDefinition = state.packages.find((p) => p.id === pkgId);
      if (!pkgDefinition) return state;

      const currentPkgSelection = state.packageSelections[pkgId] ?? createInitialSelection(pkgDefinition);

      return {
        recentlyUpdatedKey: `${pkgId}::${key}`,
        packageSelections: {
          ...state.packageSelections,
          [pkgId]: {
            ...currentPkgSelection,
            quantities:
              safe === 0
                ? Object.fromEntries(
                    Object.entries(currentPkgSelection.quantities).filter(([quantityKey]) => quantityKey !== key),
                  )
                : {
                    ...currentPkgSelection.quantities,
                    [key]: safe,
                  },
          },
        },
      };
    });
  },
}));
