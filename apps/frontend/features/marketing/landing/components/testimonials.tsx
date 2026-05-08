"use client";

import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { LandingContent } from "@/lib/i18n";

type TestimonialsProps = {
  content: LandingContent["testimonials"];
};

export function TestimonialsSection({ content }: TestimonialsProps) {
  return (
    <section className="border-y border-border/50 bg-secondary py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-primary">
            {content.badge}
          </span>
          <h2 className="mt-4 text-[38px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[44px]">
            {content.title}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{content.subtitle}</p>
        </motion.div>

        {/* TESTIMONIAL CARDS */}
        <div className="grid gap-5 md:grid-cols-3">
          {content.items.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full rounded-2xl border border-border bg-card shadow-none">
                <CardContent className="flex h-full flex-col p-6">
                  {/* Stars */}
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="flex-1 text-[14px] leading-7 text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-[14px] font-semibold text-foreground">{item.author}</p>
                    <p className="text-[12px] text-muted-foreground">{item.business}</p>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
