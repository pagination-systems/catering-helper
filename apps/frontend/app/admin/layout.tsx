import type { ReactNode } from "react";

import { Footer } from "@/components/layouts/admin/footer";
import { Navbar } from "@/components/layouts/admin/navbar";
import { Sidebar } from "@/components/layouts/admin/sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div data-app-theme="admin" className="flex min-h-screen overflow-x-clip bg-background text-foreground">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="min-w-0 flex-1 px-[var(--layout-space-inline)] py-[var(--layout-space-block)]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
