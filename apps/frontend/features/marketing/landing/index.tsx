"use client";

import { type LandingContent, landingContent } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

import { CtaSection } from "./components/cta-section";
import { FeaturesGridSection } from "./components/features-grid";
import { HeroSection } from "./components/hero";
import { HowItWorksSection } from "./components/how-it-works";
import { LocalizedBenefitsSection } from "./components/localized-benefits";
import { PricingSection } from "./components/pricing";
import { ProblemSolutionSection } from "./components/problem-solution";
import { TestimonialsSection } from "./components/testimonials";

export const Landing = () => {
  const { language } = useLanguage();
  const {
    hero,
    problemSolution,
    features,
    localizedBenefits,
    testimonials,
    howItWorks,
    pricing,
    ctaSection,
  } = landingContent[language] as LandingContent;

  return (
    <>
      <HeroSection content={hero} />
      <ProblemSolutionSection content={problemSolution} />
      <FeaturesGridSection content={features} />
      <LocalizedBenefitsSection content={localizedBenefits} />
      <HowItWorksSection content={howItWorks} />
      <TestimonialsSection content={testimonials} />
      <PricingSection content={pricing} />
      <CtaSection content={ctaSection} />
    </>
  );
};
