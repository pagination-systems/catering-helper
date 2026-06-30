"use client";

import { motion } from "framer-motion";

type PageHeaderProps = {
  badge: string;
  title: string;
  subtitle: string;
  meta?: string;
};

export function PageHeader({ badge, title, subtitle, meta }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-1/2 top-[-140px] h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] right-[-60px] h-44 w-44 rounded-full bg-muted opacity-60 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {badge}
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-[38px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[46px]">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">{subtitle}</p>
          {meta ? <p className="mt-4 text-[12px] text-muted-foreground">{meta}</p> : null}
        </motion.div>
      </div>
    </section>
  );
}
