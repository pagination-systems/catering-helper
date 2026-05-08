"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { type LandingContent, landingContent } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

export function Footer() {
  const { language } = useLanguage();
  const content = (landingContent[language] as LandingContent).footer;
  const whatsappLink = `https://wa.me/${content.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* Brand */}
          <div className="space-y-1.5">
            <p className="text-[14px] font-semibold text-foreground">{content.brand}</p>
            <p className="text-[12px] text-muted-foreground">{content.tagline}</p>
            <p className="text-[10px] text-muted-foreground">{content.copyright}</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-5 text-[11px]">
            <Link href="/privacy" className="text-muted-foreground transition hover:text-foreground">
              {content.privacy}
            </Link>
            <Link href="/terms" className="text-muted-foreground transition hover:text-foreground">
              {content.terms}
            </Link>
            <Link href="/contact" className="text-muted-foreground transition hover:text-foreground">
              {content.contact}
            </Link>
            <Link href="#" className="text-muted-foreground transition hover:text-foreground">
              {content.blog}
            </Link>
          </div>

          {/* Social / Contact */}
          <div className="flex items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.whatsappLabel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{content.whatsappLabel}</span>
            </a>
            <a
              href={content.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span className="sr-only">{content.facebookLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
