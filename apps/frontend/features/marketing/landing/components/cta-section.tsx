"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { LandingContent } from "@/lib/i18n";

type CtaSectionProps = {
  content: LandingContent["ctaSection"];
};

export function CtaSection({ content }: CtaSectionProps) {
  const whatsappLink = `https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-20 lg:py-24">
      {/* Texture overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12)_0%,_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,0,0,0.08)_0%,_transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/90">
            {content.badge}
          </span>

          <h2 className="mt-5 text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[46px]">
            {content.title}
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-white/80">{content.subtitle}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="group h-12 rounded-[8px] bg-white px-8 text-[13px] font-semibold text-primary shadow-lg hover:bg-white/90"
            >
              {content.primaryCta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 gap-2 rounded-[8px] border border-white/25 px-6 text-[13px] font-medium text-white hover:bg-white/10 hover:text-white"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 fill-current" />
                {content.secondaryCta}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
