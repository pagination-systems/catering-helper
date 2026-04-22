"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { landingContent, type LandingContent } from "@/lib/i18n";

export function Footer() {
  const { language } = useLanguage();
  const content = (landingContent[language] as LandingContent).footer;

  return (
    <footer className="bg-[hsl(var(--landing-bg))]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-end sm:px-6 lg:px-8">
        <div className="space-y-3">
          <p className="text-[12px] font-medium text-[hsl(var(--landing-footer-heading))]">{content.brand}</p>
          <p className="text-[10px] text-[hsl(var(--landing-footer-text))]">{content.copyright}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-[11px]">
          <Link href="/privacy" className="text-[hsl(var(--landing-footer-text))] transition hover:text-foreground">
            {content.privacy}
          </Link>
          <Link href="/terms" className="text-[hsl(var(--landing-footer-text))] transition hover:text-foreground">
            {content.terms}
          </Link>
          <Link href="/contact" className="text-[hsl(var(--landing-footer-text))] transition hover:text-foreground">
            {content.contact}
          </Link>
          <Link href="#" className="text-[hsl(var(--landing-footer-text))] transition hover:text-foreground">
            {content.blog}
          </Link>
        </div>
      </div>
    </footer>
  );
}
