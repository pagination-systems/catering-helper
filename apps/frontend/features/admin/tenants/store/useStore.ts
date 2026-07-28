import { TENANT_STATUS_ENUMS } from "@catering/types";
import { create } from "zustand";

export type TenantListTab = TENANT_STATUS_ENUMS.ACTIVE | TENANT_STATUS_ENUMS.TERMINATED | TENANT_STATUS_ENUMS.SUSPENDED;

export type TenantDetailsTab = "tab-1" | "tab-2" | "tab-3" | "tab-4" | "tab-5" | "tab-6";

type TenantsStoreState = {
  query: string;
  activeTab: TenantListTab;
  activeDetailsTab: TenantDetailsTab;
  setQuery: (query: string) => void;
  setActiveTab: (tab: TenantListTab) => void;
  setActiveDetailsTab: (tab: TenantDetailsTab) => void;
  resetDetailsTab: () => void;
};

export const useTenantsStore = create<TenantsStoreState>((set) => ({
  query: "",
  activeTab: TENANT_STATUS_ENUMS.ACTIVE,
  activeDetailsTab: "tab-1",
  setQuery: (query) => set({ query }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setActiveDetailsTab: (activeDetailsTab) => set({ activeDetailsTab }),
  resetDetailsTab: () => set({ activeDetailsTab: "tab-1" }),
}));
