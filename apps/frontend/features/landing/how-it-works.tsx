"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingCopy } from "@/lib/i18n";

type HowItWorksProps = {
  copy: LandingCopy["howItWorks"];
};

export function HowItWorksSection({ copy }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{copy.title}</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {copy.steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <Card className="h-full border-border/70 bg-card">
              <CardHeader>
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <CardTitle className="text-lg">Step {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{step}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
