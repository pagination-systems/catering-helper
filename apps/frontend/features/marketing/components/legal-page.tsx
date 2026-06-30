"use client";

import { motion } from "framer-motion";

import { PageHeader } from "./page-header";

type LegalPageContent = {
  badge: string;
  title: string;
  subtitle: string;
  updated: string;
  sections: ReadonlyArray<{ heading: string; paragraphs: ReadonlyArray<string> }>;
};

export function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <>
      <PageHeader
        badge={content.badge}
        title={content.title}
        subtitle={content.subtitle}
        meta={content.updated}
      />

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {content.sections.map((section, index) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-foreground">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-[14px] leading-7 text-muted-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
