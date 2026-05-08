"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { LandingContent } from "@/lib/i18n";

type PricingProps = {
  content: LandingContent["pricing"];
};

export function PricingSection({ content }: PricingProps) {
  return (
    <section id="pricing" className="relative overflow-hidden border-t border-border/50 bg-background py-16 sm:py-20 lg:py-24">
      {/* Soft glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-primary">
            {content.badge}
          </span>
          <h2 className="mt-4 text-[38px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[44px]">
            {content.title}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{content.subtitle}</p>
        </motion.div>

        {/* PRICING TIERS */}
        <div className="grid gap-6 md:grid-cols-3">
          {content.tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={tier.highlight ? "md:-mt-4 md:mb-4" : ""}
            >
              <Card
                className={[
                  "relative h-full rounded-2xl shadow-none",
                  tier.highlight
                    ? "border-2 border-primary bg-card shadow-lg shadow-primary/10"
                    : "border border-border bg-card",
                ].join(" ")}
              >
                {/* Popular badge */}
                {tier.tierBadge ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground shadow-md">
                      {tier.tierBadge}
                    </span>
                  </div>
                ) : null}

                <CardHeader className="px-6 pb-4 pt-7">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                    {tier.name}
                  </p>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-[40px] font-bold tracking-tight text-foreground">{tier.price}</span>
                    <span className="mb-2 text-[13px] text-muted-foreground">/{tier.period}</span>
                  </div>
                  <p className="text-[13px] text-muted-foreground">{tier.description}</p>
                </CardHeader>

                <CardContent className="px-6 py-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[13px]">
                        <div
                          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                            tier.highlight ? "bg-primary/15" : "bg-emerald-500/10"
                          }`}
                        >
                          <Check
                            className={`h-3.5 w-3.5 ${tier.highlight ? "text-primary" : "text-emerald-600"}`}
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-6 pb-7 pt-4">
                  <Button
                    className={[
                      "h-11 w-full rounded-xl text-[13px] font-medium",
                      tier.highlight
                        ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                        : "border border-border bg-card text-foreground hover:bg-muted",
                    ].join(" ")}
                    variant={tier.highlight ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* SUBTEXT */}
        <p className="mt-8 text-center text-[12px] text-muted-foreground">{content.subtext}</p>
      </div>
    </section>
  );
}
