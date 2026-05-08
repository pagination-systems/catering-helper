"use client";

import { motion } from "framer-motion";

import type { LandingContent } from "@/lib/i18n";

type HowItWorksProps = {
  content: LandingContent["howItWorks"];
};

export function HowItWorksSection({ content }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-xl text-center">
          <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {content.badge}
          </span>
          <h2 className="mt-4 text-[38px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[44px]">
            {content.title}
          </h2>
        </div>

        {/* STEPS */}
        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connecting line (desktop only) */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-border md:block" />

          {content.steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="relative text-center"
            >
              {/* STEP NUMBER */}
              <div className="relative z-10 mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-background text-[18px] font-semibold text-primary shadow-sm">
                {index + 1}
              </div>

              {/* TITLE */}
              <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-foreground">{step.title}</h3>

              {/* DESCRIPTION */}
              <p className="mx-auto mt-2 max-w-[200px] text-[12px] leading-6 text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
