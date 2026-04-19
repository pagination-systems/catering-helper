"use client";

import { useLanguage } from "@/components/language-provider";
import { landingCopy } from "@/lib/i18n";

import { FeaturesGridSection } from "./features-grid";
import { LandingFooter } from "./footer";
import { HeroSection } from "./hero";
import { HowItWorksSection } from "./how-it-works";
import { LandingNavbar } from "./navbar";
import { PricingSection } from "./pricing";
import { ProblemSolutionSection } from "./problem-solution";

export const LandingPage = () => {
  const { language } = useLanguage();
  const copy = landingCopy[language];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNavbar copy={copy.nav} />
      <main>
        <HeroSection copy={copy.hero} />
        <ProblemSolutionSection copy={copy.problemSolution} />
        <FeaturesGridSection copy={copy.features} />
        <HowItWorksSection copy={copy.howItWorks} />
        <PricingSection copy={copy.pricing} />
      </main>
      <LandingFooter copy={copy.footer} />
    </div>
  );
};
