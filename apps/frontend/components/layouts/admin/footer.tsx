import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background/70">
      <div className="flex h-[var(--admin-footer-height)] flex-wrap items-center justify-between gap-2 px-3 text-xs text-muted-foreground sm:px-4 lg:px-6">
        <p>&copy; {new Date().getFullYear()} Catering Helper. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <span className="text-[11px]">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
