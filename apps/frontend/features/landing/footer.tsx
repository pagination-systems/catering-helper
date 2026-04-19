import Link from "next/link";

import type { LandingCopy } from "@/lib/i18n";

type FooterProps = {
  copy: LandingCopy["footer"];
};

export function LandingFooter({ copy }: FooterProps) {
  return (
    <footer className="bg-[hsl(var(--landing-bg))]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-end sm:px-6 lg:px-8">
        <div className="space-y-3">
          <p className="text-[12px] font-medium text-[hsl(var(--landing-footer-heading))]">{copy.brand}</p>
          <p className="text-[10px] text-[hsl(var(--landing-footer-text))]">{copy.copyright}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-[11px]">
          <Link href="#" className="text-[hsl(var(--landing-footer-text))] transition hover:text-foreground">
            {copy.privacy}
          </Link>
          <Link href="#" className="text-[hsl(var(--landing-footer-text))] transition hover:text-foreground">
            {copy.terms}
          </Link>
          <Link href="#" className="text-[hsl(var(--landing-footer-text))] transition hover:text-foreground">
            {copy.contact}
          </Link>
          <Link href="#" className="text-[hsl(var(--landing-footer-text))] transition hover:text-foreground">
            {copy.blog}
          </Link>
        </div>
      </div>
    </footer>
  );
}
