import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingCopy } from "@/lib/i18n";

type PricingProps = {
  copy: LandingCopy["pricing"];
};

export function PricingSection({ copy }: PricingProps) {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-border/50 bg-[hsl(var(--landing-bg))] py-20 sm:py-24"
    >
      {/* Subtle Background Accents */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,hsl(var(--landing-chip-bg-soft))_0%,transparent_100%)] opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <Card className="mx-auto flex w-full max-w-[480px] flex-col overflow-hidden rounded-[24px] border border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card-bg))] shadow-xl sm:max-w-[520px]">
          <CardHeader className="items-center px-8 pb-8 pt-10 text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
              1 Month Launch Offer
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[hsl(var(--landing-heading))] sm:text-4xl">
              {copy.title}
            </h2>

            <p className="mt-3 max-w-[85%] text-sm leading-relaxed text-[hsl(var(--landing-text-muted))]">
              {copy.description}
            </p>

            <div className="mt-8 flex items-baseline gap-1.5">
              <CardTitle className="text-5xl font-extrabold tracking-tight text-[hsl(var(--landing-heading))] sm:text-6xl">
                {copy.price}
              </CardTitle>
              <p className="text-sm font-medium text-[hsl(var(--landing-text-muted))]">/ {copy.period}</p>
            </div>
          </CardHeader>

          <CardContent className="px-8 py-6 sm:px-10">
            <div className="mb-5 text-[12px] font-semibold uppercase tracking-wider text-[hsl(var(--landing-text-muted))]">
              What&apos;s included
            </div>

            {/* Vertical Line-by-Line Features */}
            <ul className="flex flex-col space-y-4">
              {copy.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-[hsl(var(--landing-text-strong))] transition-colors hover:text-[hsl(var(--landing-heading))]"
                >
                  {/* Green Badge Tick */}
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          {/* Delineated Footer Area */}
          <CardFooter className="flex-col items-center gap-4 bg-[hsl(var(--landing-chip-bg-soft))]/40 px-8 pb-10 pt-8 sm:px-10">
            <Button className="h-12 w-full rounded-xl bg-primary text-[13px] font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 dark:bg-white dark:text-zinc-950 dark:shadow-none dark:hover:bg-zinc-200">
              {copy.cta}
            </Button>
            <p className="text-center text-[11px] font-medium uppercase tracking-wider text-[hsl(var(--landing-text-muted))]">
              {copy.subtext}
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
