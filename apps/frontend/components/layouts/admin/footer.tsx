"use client";

import Link from "next/link";
import { getAdminContent } from "@/lib/admin-i18n";
import { useLanguage } from "@/providers/language-provider";

export function Footer() {
  const { language } = useLanguage();
  const t = getAdminContent(language);

  return (
    <footer className="mt-auto border-t border-border bg-background/70">
      <div className="flex h-[var(--admin-footer-height)] flex-wrap items-center justify-between gap-2 px-3 text-xs text-muted-foreground sm:px-4 lg:px-6">
        <p>
          &copy; {new Date().getFullYear()} Catering Helper. {t.footer.copyrightSuffix}
        </p>
        <div className="flex items-center gap-3">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            {t.footer.privacy}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            {t.footer.terms}
          </Link>
          <span className="text-[11px]">{t.footer.version}</span>
        </div>
      </div>
    </footer>
  );
}
