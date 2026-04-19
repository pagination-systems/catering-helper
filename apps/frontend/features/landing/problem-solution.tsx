"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingCopy } from "@/lib/i18n";

type ProblemSolutionProps = {
  copy: LandingCopy["problemSolution"];
};

export function ProblemSolutionSection({ copy }: ProblemSolutionProps) {
  return (
    <section
      id="solution"
      className="relative overflow-hidden border-y border-border/50 bg-[hsl(var(--landing-bg))] py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute left-[-120px] top-10 h-56 w-56 rounded-full bg-[hsl(var(--landing-chip-bg-soft))] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 right-[-80px] h-44 w-44 rounded-full bg-[hsl(var(--landing-icon-bg))] opacity-70 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-12 max-w-2xl text-center text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-[hsl(var(--landing-heading))] sm:text-[46px]"
        >
          {copy.title}
        </motion.h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="relative overflow-hidden rounded-2xl border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card-soft-bg))] shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-[15px] font-semibold text-[hsl(var(--landing-text-strong))]">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--landing-chip-bg-soft))] text-[hsl(var(--landing-text-muted))]">
                  <AlertCircle className="h-4 w-4" />
                </span>
                {copy.oldWayTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-1">
              <ul className="space-y-2.5 text-[13px] leading-6 text-[hsl(var(--landing-text))]">
                {copy.oldWayPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-lg border border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card-bg))] px-3 py-2"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-2xl border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-card-bg))] shadow-[0_14px_30px_rgba(var(--landing-shadow-rgb),0.08)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-[15px] font-semibold text-[hsl(var(--landing-text-strong))]">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--landing-chip-bg))] text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                {copy.newWayTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-1">
              <ul className="space-y-2.5 text-[13px] leading-6 text-[hsl(var(--landing-text))]">
                {copy.newWayPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-lg border border-[hsl(var(--landing-card-border))] bg-[hsl(var(--landing-chip-bg-soft))] px-3 py-2"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
