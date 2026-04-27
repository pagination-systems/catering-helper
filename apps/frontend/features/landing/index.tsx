"use client";

import { useLanguage } from "@/components/language-provider";
import { type LandingContent, landingContent } from "@/lib/i18n";

import { FeaturesGridSection } from "./features-grid";
import { HeroSection } from "./hero";
import { HowItWorksSection } from "./how-it-works";
import { PricingSection } from "./pricing";
import { ProblemSolutionSection } from "./problem-solution";

export const LandingPage = () => {
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
