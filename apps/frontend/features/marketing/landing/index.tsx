"use client";

import { useLanguage } from "@/components/language-provider";
import { type LandingContent, landingContent } from "@/lib/i18n";

import { FeaturesGridSection } from "./components/features-grid";
import { HeroSection } from "./components/hero";
import { HowItWorksSection } from "./components/how-it-works";
import { PricingSection } from "./components/pricing";
import { ProblemSolutionSection } from "./components/problem-solution";

export const Landing = () => {
  const { language } = useLanguage();
  const { hero, problemSolution, features, howItWorks, pricing } = landingContent[language] as LandingContent;

  return (
    <>
      <HeroSection content={hero} />
      <ProblemSolutionSection content={problemSolution} />
      <FeaturesGridSection content={features} />
      <HowItWorksSection content={howItWorks} />
      <PricingSection content={pricing} />
    </>
  );
};
