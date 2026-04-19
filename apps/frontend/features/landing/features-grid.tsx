"use client";

import { motion } from "framer-motion";
import { Calculator, Coins, Store } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingCopy } from "@/lib/i18n";

const featureIcons = [Store, Calculator, Coins] as const;

type FeaturesGridProps = {
  copy: LandingCopy["features"];
};

export function FeaturesGridSection({ copy }: FeaturesGridProps) {
  return (
    <section id="features" className="bg-secondary/30 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{copy.title}</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item, index) => {
            const Icon = featureIcons[index] ?? Store;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full border-border/70 bg-background">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
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
