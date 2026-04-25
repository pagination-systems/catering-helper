"use client";

import { motion } from "framer-motion";
import { Calculator, Coins, Store } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingContent } from "@/lib/i18n";

type FeaturesGridProps = {
  content: LandingContent["features"];
};

export function FeaturesGridSection({ content }: FeaturesGridProps) {
  const [portalFeature, bazarFeature, financeFeature] = content.items;

  return (
    <section id="features" className="border-y border-border/50 bg-secondary py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 max-w-2xl mx-auto text-center text-[50px] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
          {content.title}
        </h2>

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-[1.25fr_0.85fr]">
          {/* BIG CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="h-full rounded-2xl border border-border bg-card shadow-none">
              <CardHeader>
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-primary">
                  <Store className="h-4 w-4" />
                </div>
                <CardTitle className="text-[18px] text-foreground">{portalFeature.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="max-w-[620px] text-[13px] leading-6 text-muted-foreground">
                  {portalFeature.description}
                </p>

                <div className="grid max-w-[280px] grid-cols-3 gap-2">
                  <div className="h-10 rounded-md bg-muted" />
                  <div className="h-10 rounded-md bg-muted" />
                  <div className="h-10 rounded-md bg-muted" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* TALL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="md:row-span-2"
          >
            <Card className="h-full rounded-2xl border border-border bg-card shadow-none">
              <CardHeader>
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-primary">
                  <Calculator className="h-4 w-4" />
                </div>
                <CardTitle className="text-[16px] leading-6 text-foreground">
                  {bazarFeature.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-[13px] leading-6 text-muted-foreground">
                  {bazarFeature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* SMALL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <Card className="h-full rounded-2xl border border-border bg-card shadow-none">
              <CardHeader>
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-primary">
                  <Coins className="h-4 w-4" />
                </div>
                <CardTitle className="text-[16px] leading-6 text-foreground">
                  {financeFeature.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-[13px] leading-6 text-muted-foreground">
                  {financeFeature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* MEDIA CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            <div className="relative h-full min-h-[170px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/80 to-accent/70">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

              <p className="absolute bottom-5 left-5 text-[20px] font-semibold text-white">
                Built for Professional Environments
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
