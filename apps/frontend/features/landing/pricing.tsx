import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingCopy } from "@/lib/i18n";

type PricingProps = {
  copy: LandingCopy["pricing"];
};

export function PricingSection({ copy }: PricingProps) {
  return (
    <section id="pricing" className="bg-secondary/30 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{copy.title}</h2>

        <Card className="mx-auto w-full max-w-xl border-primary/30 bg-background shadow-lg shadow-primary/10">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-5xl font-black tracking-tight text-primary">{copy.price}</CardTitle>
            <p className="text-sm font-medium text-muted-foreground">{copy.period}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {copy.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex-col items-center gap-2">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">{copy.cta}</Button>
            <p className="text-xs text-muted-foreground">{copy.subtext}</p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
