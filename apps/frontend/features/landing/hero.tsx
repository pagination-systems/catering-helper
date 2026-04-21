"use client";

import { motion } from "framer-motion";
import { ArrowRight, Dot } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { LandingContent } from "@/lib/i18n";

type HeroProps = {
  content: LandingContent["hero"];
};

export function HeroSection({ content }: HeroProps) {
  const accentIndex = content.headline.indexOf("Eliminate");
  const primaryLine = accentIndex > -1 ? content.headline.slice(0, accentIndex).trim() : content.headline;
  const accentLine = accentIndex > -1 ? content.headline.slice(accentIndex).trim() : "";

  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-[hsl(var(--landing-bg))]">
      <div className="pointer-events-none absolute right-0 top-0 h-[360px] w-[48%] rounded-bl-[120px] bg-[hsl(var(--landing-alt-bg))]" />

      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 space-y-6"
        >
          <h1 className="max-w-xl text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.02em] text-[hsl(var(--landing-heading))] sm:text-6xl">
            {primaryLine}
            {accentLine ? <span className="mt-2 block text-primary">{accentLine}</span> : null}
          </h1>
          <p className="max-w-md text-pretty text-[15px] leading-7 text-[hsl(var(--landing-subheading))]">
            {content.subheadline}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="group h-11 rounded-[6px] bg-primary px-6 text-[10px] font-semibold uppercase tracking-[0.06em] text-primary-foreground shadow-[0_8px_20px_rgba(54,73,255,0.24)] hover:bg-primary/90"
            >
              {content.primaryCta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-11 gap-2 rounded-[6px] px-4 text-[13px] font-medium text-foreground"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-[10px]">
                <Dot className="h-4 w-4" />
              </span>
              {content.secondaryCta}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex min-h-[280px] items-center justify-center lg:min-h-[340px]"
        >
          <div className="absolute right-2 top-0 hidden w-[210px] rounded-2xl border border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card-bg))] p-4 shadow-[0_18px_42px_rgba(var(--landing-shadow-rgb),0.12)] md:block">
            <p className="text-[12px] font-medium text-[hsl(var(--landing-text-strong))]">{content.dashboardTitle}</p>
            <div className="mt-3 space-y-2 text-[11px] text-[hsl(var(--landing-text-muted))]">
              <div className="h-8 rounded-md bg-[hsl(var(--landing-chip-bg-soft))]" />
              <div className="h-8 rounded-md bg-[hsl(var(--landing-chip-bg-soft))]" />
            </div>
          </div>

          <div className="relative z-10 w-full max-w-[360px] rounded-2xl border border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card-bg))] p-5 shadow-[0_24px_50px_rgba(var(--landing-shadow-rgb),0.14)]">
            <p className="text-[12px] font-medium text-[hsl(var(--landing-text-strong))]">{content.mobileMealTitle}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.08em] text-[hsl(var(--landing-text-soft))]">
              {content.mobileMealDescription}
            </p>

            <div className="mt-4 space-y-3 text-[12px]">
              <div className="flex items-center justify-between border-b border-[hsl(var(--landing-rule))] pb-2">
                <span className="text-[hsl(var(--landing-text))]">{content.mobileOrderLabel}</span>
                <span className="font-medium text-[hsl(var(--landing-text-strong))]">{content.bazarItems[0]}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[hsl(var(--landing-rule))] pb-2">
                <span className="text-[hsl(var(--landing-text))]">Whole Chicken</span>
                <span className="font-medium text-[hsl(var(--landing-text-strong))]">{content.bazarItems[1]}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[hsl(var(--landing-rule))] pb-2">
                <span className="text-[hsl(var(--landing-text))]">Cooking Oil (Soybean)</span>
                <span className="font-medium text-[hsl(var(--landing-text-strong))]">{content.bazarItems[2]}</span>
              </div>
              <Button className="mt-1 w-full h-8 text-[11px] font-medium bg-[hsl(var(--landing-chip-bg))] text-[hsl(var(--landing-text-strong))] hover:bg-[hsl(var(--landing-chip-bg-soft))]">
                {content.orderSummary}
              </Button>
              <div className="text-center text-[10px] text-[hsl(var(--landing-text-soft))]">
                {content.mobileOrderBy}
              </div>
            </div>
          </div>

          <div className="absolute -right-2 bottom-8 hidden w-[145px] rounded-xl border border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card-bg))] p-3 shadow-[0_16px_36px_rgba(var(--landing-shadow-rgb),0.12)] md:block">
            <p className="text-[11px] font-medium text-[hsl(var(--landing-text-strong))]">{content.mobileTitle}</p>
            <div className="mt-2 space-y-2">
              <div className="h-3 rounded bg-[hsl(var(--landing-chip-bg-soft))]" />
              <div className="h-3 rounded bg-[hsl(var(--landing-chip-bg-soft))]" />
              <div className="h-3 w-2/3 rounded bg-[hsl(var(--landing-chip-bg-soft))]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
