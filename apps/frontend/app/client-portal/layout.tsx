import React from "react";
import { ClientPortalNavbar } from "@/features/client-portal/components/client-portal-navbar";
import { ClientPortalFooter } from "@/features/client-portal/components/client-portal-footer";

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={
        {
          ["--cater-bg" as string]: "34 44% 97%",
          ["--cater-surface" as string]: "0 0% 100%",
          ["--cater-surface-soft" as string]: "37 70% 95%",
          ["--cater-primary" as string]: "22 91% 56%",
          ["--cater-primary-strong" as string]: "16 84% 48%",
          ["--cater-accent" as string]: "152 44% 42%",
          ["--cater-ink" as string]: "24 26% 16%",
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-none fixed inset-0 z-[-10] overflow-hidden">
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-[hsl(var(--cater-primary))/0.16] blur-3xl" />
        <div className="absolute top-32 right-[-120px] h-80 w-80 rounded-full bg-[hsl(var(--cater-accent))/0.14] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-amber-200/50 blur-3xl" />
      </div>

      <ClientPortalNavbar />
      {children}
      <ClientPortalFooter />
    </div>
  );
}
