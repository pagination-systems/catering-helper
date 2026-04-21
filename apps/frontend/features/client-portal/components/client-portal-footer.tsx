"use client";

import Link from "next/link";
import { ChefHat, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { clientPortalContent, type ClientPortalContent } from "@/lib/i18n";

export function ClientPortalFooter() {
  const { language } = useLanguage();
  const content = clientPortalContent[language] as ClientPortalContent;

  return (
    <footer className="mt-28 border-t border-border/70 pt-16 pb-8">
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--cater-primary))/0.12] text-[hsl(var(--cater-primary-strong))]">
                <ChefHat className="h-4 w-4" />
              </span>
              Uttara Catering
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium corporate catering platform. Healthy, balanced, and perfectly on time for your team's success.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">{content.footer.contact}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[hsl(var(--cater-primary-strong))]" />
                +880 1711-000000
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-emerald-500" />
                +880 1711-000000
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[hsl(var(--cater-primary-strong))]" />
                contact@bengalserve.com
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">{content.footer.location}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[hsl(var(--cater-primary-strong))]" />
                <span className="leading-relaxed">
                  123 Corporate Area, Gulshan 1<br />
                  Dhaka 1212, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">{content.footer.followUs}</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground transition hover:text-[hsl(var(--cater-primary-strong))]">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.017 4.388 11.006 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.313 0 2.686.235 2.686.235v2.953h-1.513c-1.492 0-1.956.926-1.956 1.875v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.079 24 18.09 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground transition hover:text-red-500">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.75 1.5a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground transition hover:text-red-500">
                <span className="sr-only">YouTube</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M23.498 6.186a2.997 2.997 0 00-2.11-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.566a2.997 2.997 0 00-2.11 2.12A31.448 31.448 0 000 12a31.448 31.448 0 00.502 5.814 2.997 2.997 0 002.11 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.566a2.997 2.997 0 002.11-2.12A31.448 31.448 0 0024 12a31.448 31.448 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border/40 pt-8 text-center sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Uttara Catering. {content.footer.rights}
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs font-medium text-muted-foreground sm:mt-0">
            <Link href="#" className="hover:text-foreground transition">
              {content.footer.privacy}
            </Link>
            <Link href="#" className="hover:text-foreground transition">
              {content.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
