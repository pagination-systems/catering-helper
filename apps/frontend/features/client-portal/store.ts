import { create } from "zustand";
import { type CateringPackage, type DayName, packages } from "./data";

export type PackageSelectionState = {
  activeDay: DayName;
  quantities: Record<string, number>;
};

type ClientPortalState = {
  activePackageId: string;
  customizerOpen: boolean;
  mobileSummaryOpen: boolean;
  recentlyUpdatedKey: string | null;
  packageSelections: Record<string, PackageSelectionState>;

  // Actions
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
  const fallbackDay = menuPackage.days[0]?.day ?? "Saturday";

  return {
    activeDay: menuPackage.days.some((day) => day.day === today) ? today : fallbackDay,
    quantities: {},
  };
}

export const useClientPortalStore = create<ClientPortalState>((set) => ({
  activePackageId: packages.find((pkg) => pkg.popular)?.id ?? packages[0]?.id ?? "",
  customizerOpen: true,
  mobileSummaryOpen: false,
  recentlyUpdatedKey: null,
  packageSelections: Object.fromEntries(packages.map((pkg) => [pkg.id, createInitialSelection(pkg)])),

  setActivePackageId: (id) => set({ activePackageId: id }),
  setCustomizerOpen: (open) => set({ customizerOpen: open }),
  setMobileSummaryOpen: (open) => set({ mobileSummaryOpen: open }),
  setRecentlyUpdatedKey: (key) => set({ recentlyUpdatedKey: key }),

  pickPackage: (packageId) => {
    set({ activePackageId: packageId, customizerOpen: true });
  },

  setActiveDay: (pkgId, day) => {
    set((state) => {
      const currentSelection =
        state.packageSelections[pkgId] || createInitialSelection(packages.find((p) => p.id === pkgId)!);
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
      const pkgDefinition = packages.find((p) => p.id === pkgId);
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
