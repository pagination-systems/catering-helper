import type { ReactNode } from "react";

import { AdminLayoutProvider } from "@/components/layouts/admin-panel/admin-layout-context";
import { AdminThemeScope } from "@/components/layouts/admin-panel/admin-theme-scope";
import { Footer } from "@/components/layouts/admin-panel/footer";
import { Navbar } from "@/components/layouts/admin-panel/navbar";
import { Sidebar } from "@/components/layouts/admin-panel/sidebar";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return (
    <AdminLayoutProvider>
      <AdminThemeScope />

      <div className="flex min-h-screen overflow-x-clip bg-background text-foreground">
        <Sidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Navbar />
          <main className="min-w-0 flex-1 px-[var(--layout-space-inline)] py-[var(--layout-space-block)]">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </AdminLayoutProvider>
  );
}
