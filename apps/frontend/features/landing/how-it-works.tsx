"use client";

import { motion } from "framer-motion";

import type { LandingCopy } from "@/lib/i18n";

type HowItWorksProps = {
  copy: LandingCopy["howItWorks"];
};

export function HowItWorksSection({ copy }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h2 className="mb-14 text-center text-[14px] font-medium tracking-[-0.01em] text-[hsl(var(--landing-text-strong))]">
        {copy.title}
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {copy.steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card-bg))] text-[20px] font-medium text-primary">
              {index + 1}
            </div>
            <h3 className="text-[31px] font-medium tracking-[-0.02em] text-[hsl(var(--landing-heading))]">
              {step.title}
            </h3>
            <p className="mx-auto mt-2 max-w-[270px] text-[12px] leading-6 text-[hsl(var(--landing-text))]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
