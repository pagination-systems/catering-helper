"use client";

import { usePathname } from "next/navigation";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type AdminLayoutContextValue = {
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
};

const SIDEBAR_STORAGE_KEY = "admin:sidebar-collapsed";

const AdminLayoutContext = createContext<AdminLayoutContextValue | null>(null);

export function AdminLayoutProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
      setIsSidebarCollapsed(stored === "true");
    } catch {
      setIsSidebarCollapsed(false);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isSidebarCollapsed));
    } catch {
      // Ignore write errors
    }
  }, [isSidebarCollapsed]);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      setIsMobileSidebarOpen(false);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  const toggleSidebarCollapsed = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  }, []);

  const openMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(true);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isSidebarCollapsed,
      isMobileSidebarOpen,
      toggleSidebarCollapsed,
      setSidebarCollapsed,
      openMobileSidebar,
      closeMobileSidebar,
      toggleMobileSidebar,
    }),
    [
      isSidebarCollapsed,
      isMobileSidebarOpen,
      toggleSidebarCollapsed,
      setSidebarCollapsed,
      openMobileSidebar,
      closeMobileSidebar,
      toggleMobileSidebar,
    ],
  );

  return <AdminLayoutContext.Provider value={value}>{children}</AdminLayoutContext.Provider>;
}

export function useAdminLayout() {
  const context = useContext(AdminLayoutContext);

  if (!context) {
    throw new Error("useAdminLayout must be used within AdminLayoutProvider");
  }

  return context;
}
