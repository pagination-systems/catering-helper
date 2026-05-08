"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { LandingContent } from "@/lib/i18n";

type HeroProps = {
  content: LandingContent["hero"];
};

export function HeroSection({ content }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background">
      {/* Decorative background blob */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[52%] rounded-bl-[140px] bg-secondary" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 space-y-6"
        >
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1.5 text-[11px] font-medium text-accent">
            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
            {content.trustBadge}
          </div>

          <h1 className="max-w-xl text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.02em] text-foreground sm:text-6xl">
            {content.headlinePrimary}
            <span className="mt-2 block text-primary">{content.headlineAccent}</span>
          </h1>

          <p className="max-w-md text-pretty text-[15px] leading-7 text-muted-foreground">{content.subheadline}</p>

          {/* Food emoji accent row */}
          <div className="flex items-center gap-2 text-xl">
            <span title="Kacchi Biryani">🍛</span>
            <span title="Wedding Platter">🥘</span>
            <span title="Polao">🍚</span>
            <span title="Beef Rezala">🫕</span>
            <span className="ml-1 text-[11px] text-muted-foreground">Biryani · Kacchi · Polao · Rezala</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="group h-11 rounded-[6px] bg-primary px-6 text-[10px] font-semibold uppercase tracking-[0.06em] text-primary-foreground shadow-md hover:bg-primary/90"
            >
              {content.primaryCta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="h-11 gap-2 rounded-[6px] px-4 text-[13px] font-medium text-foreground"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Play className="h-3 w-3 fill-current" />
              </span>
              {content.secondaryCta}
            </Button>
          </div>
        </motion.div>

        {/* RIGHT UI MOCK */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex min-h-[280px] items-center justify-center lg:min-h-[340px]"
        >
          {/* TOP FLOAT CARD */}
          <div className="absolute right-2 top-0 hidden w-[210px] rounded-2xl border border-border bg-card p-4 shadow-lg md:block">
            <p className="text-[12px] font-medium text-foreground">{content.dashboardTitle}</p>
            <div className="mt-3 space-y-2 text-[11px] text-muted-foreground">
              <div className="h-8 rounded-md bg-muted" />
              <div className="h-8 rounded-md bg-muted" />
            </div>
          </div>

          {/* MAIN CARD */}
          <div className="relative z-10 w-full max-w-[360px] rounded-2xl border border-border bg-card p-5 shadow-xl">
            <p className="text-[12px] font-medium text-foreground">{content.mobileMealTitle}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              {content.mobileMealDescription}
            </p>

            <div className="mt-4 space-y-3 text-[12px]">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">{content.mobileOrderLabel}</span>
                <span className="font-medium text-foreground">{content.bazarItems[0]}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Whole Chicken</span>
                <span className="font-medium text-foreground">{content.bazarItems[1]}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Cooking Oil (Soybean)</span>
                <span className="font-medium text-foreground">{content.bazarItems[2]}</span>
              </div>

              <Button className="mt-1 h-8 w-full text-[11px] font-medium bg-secondary text-foreground hover:bg-muted">
                {content.orderSummary}
              </Button>

              <div className="text-center text-[10px] text-muted-foreground">{content.mobileOrderBy}</div>
            </div>
          </div>

          {/* BOTTOM FLOAT CARD */}
          <div className="absolute -right-2 bottom-8 hidden w-[145px] rounded-xl border border-border bg-card p-3 shadow-lg md:block">
            <p className="text-[11px] font-medium text-foreground">{content.mobileTitle}</p>
            <div className="mt-2 space-y-2">
              <div className="h-3 rounded bg-muted" />
              <div className="h-3 rounded bg-muted" />
              <div className="h-3 w-2/3 rounded bg-muted" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
