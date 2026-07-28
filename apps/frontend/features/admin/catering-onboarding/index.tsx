"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "../components/section-header";
import { OnboardingForm } from "./components/onboarding-form";
import { useOnboardingI18n } from "./lib/onboarding-i18n";

export const CateringOnboarding = () => {
  const i18n = useOnboardingI18n();

  return (
    <section className="space-y-4" aria-labelledby="catering-onboarding-title">
      <SectionHeader title={i18n.title} description={i18n.description} titleId="catering-onboarding-title" />

      <Card>
        <CardContent className="pt-6">
          <OnboardingForm />
        </CardContent>
      </Card>
    </section>
  );
};
