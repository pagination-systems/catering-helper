"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { getAdminContent } from "@/lib/admin-i18n";
import { useLanguage } from "@/providers/language-provider";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * Split-screen shell for the authentication pages: a branded panel on large
 * screens and the form card on the right. Shared by login and forgot-password.
 */
export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  const { language } = useLanguage();
  const t = getAdminContent(language).auth;
  const highlights = [t.highlights.orders, t.highlights.finances, t.highlights.customers];

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Brand panel — hidden on small screens */}
      <div className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, rgba(255,255,255,0.22), transparent 45%), radial-gradient(circle at 85% 78%, rgba(0,0,0,0.28), transparent 52%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/10 blur-2xl"
        />

        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-sm font-bold backdrop-blur-sm">
            CH
          </span>
          <span className="text-base font-semibold tracking-tight">{t.brandName}</span>
        </Link>

        <div className="relative z-10 max-w-md space-y-4">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">{t.brandTagline}</h2>
          <p className="text-sm leading-relaxed text-primary-foreground/80">{t.brandDescription}</p>
          <ul className="space-y-2.5 pt-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-primary-foreground/90">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} {t.brandName}. {t.rights}
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-muted/30 px-4 py-12 sm:px-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              CH
            </span>
            <span className="text-base font-semibold tracking-tight text-foreground">{t.brandName}</span>
          </Link>

          <div className="mb-8 space-y-1.5 text-center lg:text-left">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
