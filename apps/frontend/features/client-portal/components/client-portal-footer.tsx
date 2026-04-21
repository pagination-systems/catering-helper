import Link from "next/link";
import { ChefHat, Mail, MapPin, Phone } from "lucide-react";

export function ClientPortalFooter() {
  return (
    <footer className="mt-28 border-t border-border/70 pt-16 pb-8">
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--cater-primary))/0.12] text-[hsl(var(--cater-primary-strong))]">
                <ChefHat className="h-4 w-4" />
              </span>
              Bengal Serve Cloud
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium corporate catering platform. Healthy, balanced, and perfectly on time for your team's success.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[hsl(var(--cater-primary-strong))]" />
                +880 1711-000000
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 -mr-1 shrink-0 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 3.4L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v.5a5 5 0 0 0 5 5h.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0 0 1" />
                </svg>
                +880 1711-000000
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[hsl(var(--cater-primary-strong))]" />
                contact@bengalserve.com
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Location</h4>
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
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Follow Us</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground transition hover:text-[hsl(var(--cater-primary-strong))]">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground transition hover:opacity-80">
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5 text-pink-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground transition hover:text-red-500">
                <span className="sr-only">YouTube</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 7.1c.1-1.2 1-2.1 2.2-2.2C7 4.7 12 4.7 12 4.7s5 0 7.3.2c1.2.1 2.1 1 2.2 2.2.2 2.3.2 4.9.2 4.9s0 2.6-.2 4.9c-.1 1.2-1 2.1-2.2 2.2-2.3.2-7.3.2-7.3.2s-5 0-7.3-.2c-1.2-.1-2.1-1-2.2-2.2-.2-2.3-.2-4.9-.2-4.9s0-2.6.2-4.9z" />
                  <path d="M10 15l5-3-5-3v6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border/40 pt-8 text-center sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Bengal Serve Cloud. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs font-medium text-muted-foreground sm:mt-0">
            <Link href="#" className="hover:text-foreground transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
