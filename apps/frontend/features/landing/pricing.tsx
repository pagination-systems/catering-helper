import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingContent } from "@/lib/i18n";

type PricingProps = {
  content: LandingContent["pricing"];
};

export function PricingSection({ content }: PricingProps) {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-border/50 bg-background py-20 sm:py-24"
    >
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-muted/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[260px] w-[420px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        {/* CENTERED SMALL CARD */}
        <Card className="mx-auto w-full max-w-[420px] rounded-2xl border border-border bg-card shadow-sm">
          {/* HEADER */}
          <CardHeader className="items-center px-6 pb-6 pt-8 text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-primary">
              {content.badge}
            </span>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
              {content.title}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">{content.description}</p>

            {/* PRICE */}
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-semibold tracking-tight text-foreground">
                {content.price}
              </span>
              <span className="pb-1 text-sm text-muted-foreground">/ {content.period}</span>
            </div>
          </CardHeader>

          {/* FEATURES */}
          <CardContent className="px-6 py-4">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Included
            </p>

            <ul className="space-y-3">
              {content.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          {/* FOOTER */}
          <CardFooter className="flex-col gap-3 px-6 pb-7 pt-5">
            <Button className="h-11 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
              {content.cta}
            </Button>

            <p className="text-center text-[11px] text-muted-foreground">{content.subtext}</p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
