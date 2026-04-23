"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingContent } from "@/lib/i18n";

type ProblemSolutionProps = {
  content: LandingContent["problemSolution"];
};

export function ProblemSolutionSection({ content }: ProblemSolutionProps) {
  return (
    <section
      id="solution"
      className="relative overflow-hidden border-y border-border/50 bg-background py-16 sm:py-20 lg:py-24"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute left-[-120px] top-10 h-56 w-56 rounded-full bg-muted opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 right-[-80px] h-44 w-44 rounded-full bg-primary/10 opacity-70 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-12 max-w-2xl text-center text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[46px]"
        >
          {content.title}
        </motion.h2>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* OLD WAY */}
          <Card className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                </span>
                {content.oldWayTitle}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-1">
              <ul className="space-y-2.5 text-[13px] leading-6 text-foreground">
                {content.oldWayPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* NEW WAY */}
          <Card className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                {content.newWayTitle}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-1">
              <ul className="space-y-2.5 text-[13px] leading-6 text-foreground">
                {content.newWayPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-lg border border-border bg-primary/5 px-3 py-2"
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
