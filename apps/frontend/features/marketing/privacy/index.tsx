"use client";

import { type MarketingPagesContent, marketingPagesContent } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

import { LegalPage } from "../components/legal-page";

export const Privacy = () => {
  const { language } = useLanguage();
  const content = (marketingPagesContent[language] as MarketingPagesContent).privacy;

  return <LegalPage content={content} />;
};
