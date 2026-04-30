"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AdminLayoutStore = {
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
};

const SIDEBAR_STORAGE_KEY = "admin:sidebar-collapsed";

export const useAdminLayout = create<AdminLayoutStore>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      isMobileSidebarOpen: false,
      toggleSidebarCollapsed: () => {
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed }));
      },
      setSidebarCollapsed: (collapsed) => {
        set({ isSidebarCollapsed: collapsed });
      },
      openMobileSidebar: () => {
        set({ isMobileSidebarOpen: true });
      },
      closeMobileSidebar: () => {
        set({ isMobileSidebarOpen: false });
      },
      toggleMobileSidebar: () => {
        set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen }));
      },
    }),
    {
      name: SIDEBAR_STORAGE_KEY,
      storage: typeof window !== "undefined" ? createJSONStorage(() => window.localStorage) : undefined,
      partialize: (state) => ({ isSidebarCollapsed: state.isSidebarCollapsed }),
      skipHydration: true,
    },
  ),
);
