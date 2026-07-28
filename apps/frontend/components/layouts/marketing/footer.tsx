"use client";

import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type LandingContent, landingContent } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

export function Footer() {
  const { language } = useLanguage();
  const content = (landingContent[language] as LandingContent).footer;
  const whatsappLink = `https://wa.me/${content.whatsapp.replace(/[^0-9]/g, "")}`;

  const columns = [
    {
      title: content.productTitle,
      links: [
        { label: content.solution, href: "/#solution" },
        { label: content.features, href: "/#features" },
        { label: content.howItWorks, href: "/#how-it-works" },
        { label: content.pricing, href: "/#pricing" },
      ],
    },
    {
      title: content.companyTitle,
      links: [
        { label: content.blog, href: "/blog" },
        { label: content.contact, href: "/contact" },
      ],
    },
    {
      title: content.supportTitle,
      links: [
        { label: content.privacy, href: "/privacy" },
        { label: content.terms, href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt={`${content.brand} Logo`} width={32} height={32} className="h-9 w-auto" />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">{content.brand}</span>
            </Link>
            <p className="max-w-xs text-[12px] leading-relaxed text-muted-foreground">{content.description}</p>

            {/* Social / Contact */}
            <div className="flex items-center gap-3 pt-1">
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
                aria-label={content.facebookLabel}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span className="sr-only">{content.facebookLabel}</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.title} className="flex flex-col gap-3.5">
              <p className="text-[13px] font-semibold text-foreground">{column.title}</p>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-muted-foreground transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border/50 pt-6">
          <p className="text-center text-[11px] text-muted-foreground">{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
