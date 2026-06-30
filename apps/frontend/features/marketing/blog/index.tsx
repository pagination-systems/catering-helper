"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { type MarketingPagesContent, marketingPagesContent } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

import { PageHeader } from "../components/page-header";

export const Blog = () => {
  const { language } = useLanguage();
  const content = (marketingPagesContent[language] as MarketingPagesContent).blog;

  return (
    <>
      <PageHeader badge={content.badge} title={content.title} subtitle={content.subtitle} />

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <p className="mb-10 text-center text-[14px] text-muted-foreground">{content.note}</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.posts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <Card className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-none transition hover:shadow-md">
                  {/* Cover */}
                  <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-background">
                    <span className="rounded-full border border-border bg-background/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
                      {content.comingSoon}
                    </span>
                  </div>

                  <CardContent className="p-5">
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {post.category}
                    </span>

                    <h2 className="mt-3 text-[16px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{post.excerpt}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                      <span className="text-[11px] text-muted-foreground">
                        {post.date} · {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                        {content.readMore}
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
