"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingCopy } from "@/lib/i18n";

type HeroProps = {
  copy: LandingCopy["hero"];
};

export function HeroSection({ copy }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-4 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {copy.headline}
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">{copy.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
              {copy.primaryCta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline">
              {copy.secondaryCta}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Card className="relative overflow-hidden border-border/70 bg-gradient-to-b from-card to-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">{copy.mobileTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-background p-3">
                <p className="text-sm font-semibold text-foreground">{copy.mobileMealTitle}</p>
                <p className="mt-1 text-xs text-muted-foreground">{copy.mobileMealDescription}</p>
              </div>
              <div className="space-y-2 rounded-lg border border-border bg-background p-3">
                <p className="text-xs text-muted-foreground">{copy.mobileOrderLabel}</p>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 w-2/3 rounded-full bg-primary" />
                </div>
                <p className="text-xs font-medium text-foreground">4 meals</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary">
                <CheckCircle2 className="h-4 w-4" />
                {copy.mobileOrderBy}
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border/70 bg-gradient-to-b from-card to-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">{copy.dashboardTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-background p-3">
                <p className="text-sm font-semibold text-foreground">{copy.bazarTitle}</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {copy.bazarItems.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm font-semibold text-foreground">
                {copy.orderSummary}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
