"use client";

import { motion } from "framer-motion";
import { CalendarDays, Languages, Wallet, Wifi } from "lucide-react";

import type { LandingContent } from "@/lib/i18n";

type LocalizedBenefitsProps = {
  content: LandingContent["localizedBenefits"];
};

const benefitIcons = [CalendarDays, Wallet, Wifi, Languages];

export function LocalizedBenefitsSection({ content }: LocalizedBenefitsProps) {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-[-60px] top-10 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
            {content.badge}
          </span>
          <h2 className="mt-4 text-[38px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[44px]">
            {content.title}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{content.subtitle}</p>
        </motion.div>

        {/* BENEFITS GRID */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, index) => {
            const Icon = benefitIcons[index];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-foreground">{item.title}</h3>
                <p className="text-[13px] leading-6 text-muted-foreground">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bangladesh identity strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="h-px flex-1 bg-border" />
          <span className="text-[13px] font-medium text-muted-foreground">
            🇧🇩 Dhaka · Chittagong · Sylhet · And Beyond
          </span>
          <div className="h-px flex-1 bg-border" />
        </motion.div>
      </div>
    </section>
  );
}
