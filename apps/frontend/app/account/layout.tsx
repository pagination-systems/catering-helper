import type { ReactNode } from "react";
import { AccountShell } from "@/components/layouts/account/account-shell";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <AccountShell>{children}</AccountShell>;
}
