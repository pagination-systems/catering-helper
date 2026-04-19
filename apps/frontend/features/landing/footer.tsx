import Link from "next/link";

import type { LandingCopy } from "@/lib/i18n";

type FooterProps = {
  copy: LandingCopy["footer"];
};

export function LandingFooter({ copy }: FooterProps) {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6 lg:px-8">
        <p className="text-muted-foreground">{copy.brand}</p>
        <div className="flex items-center gap-5">
          <Link href="#" className="text-muted-foreground transition hover:text-foreground">
            {copy.privacy}
          </Link>
          <Link href="#" className="text-muted-foreground transition hover:text-foreground">
            {copy.terms}
          </Link>
          <Link href="#" className="text-muted-foreground transition hover:text-foreground">
            {copy.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
