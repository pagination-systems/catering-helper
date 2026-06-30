"use client";

import { type MarketingPagesContent, marketingPagesContent } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

import { LegalPage } from "../components/legal-page";

export const Terms = () => {
  const { language } = useLanguage();
  const content = (marketingPagesContent[language] as MarketingPagesContent).terms;

  return <LegalPage content={content} />;
};
