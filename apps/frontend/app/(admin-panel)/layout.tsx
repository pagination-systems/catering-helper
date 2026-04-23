import type { ReactNode } from "react";

import { AdminShell } from "@/components/layouts/admin-panel/shell";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
