"use client";

import { motion } from "framer-motion";
import { BarChart3, CreditCard, FileText, Package, Smartphone, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingContent } from "@/lib/i18n";

type FeaturesGridProps = {
  content: LandingContent["features"];
};

const featureIcons = [Package, CreditCard, BarChart3, Smartphone, FileText, Users];

const featureAccents = [
  "bg-primary/10 text-primary",
  "bg-accent/10 text-accent",
  "bg-blue-500/10 text-blue-600",
  "bg-purple-500/10 text-purple-600",
  "bg-orange-500/10 text-orange-600",
  "bg-teal-500/10 text-teal-600",
];

export function FeaturesGridSection({ content }: FeaturesGridProps) {
  return (
    <section id="features" className="border-y border-border/50 bg-secondary py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[46px]">
            {content.title}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{content.subtitle}</p>
        </div>

        {/* 6-FEATURE GRID */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const Icon = featureIcons[index];
            const accent = featureAccents[index];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Card className="group h-full rounded-2xl border border-border bg-card shadow-none transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-[16px] leading-6 text-foreground">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[13px] leading-6 text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
