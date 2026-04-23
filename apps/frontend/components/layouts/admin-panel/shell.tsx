"use client";

import type { ReactNode } from "react";

import { AdminLayoutProvider } from "./admin-layout-context";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <AdminLayoutProvider>
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
