"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";
import { useAccountI18n } from "../lib/account-i18n";

export const CustomerSettings = () => {
  const i18n = useAccountI18n().settings;
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    { label: i18n.appearance.system, value: "system" },
    { label: i18n.appearance.light, value: "light" },
    { label: i18n.appearance.dark, value: "dark" },
  ];

  const languageOptions: { label: string; value: Language }[] = [
    { label: i18n.language.english, value: "en" },
    { label: i18n.language.bangla, value: "bn" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{i18n.title}</h1>
        <p className="text-sm text-muted-foreground">{i18n.description}</p>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>{i18n.appearance.cardTitle}</CardTitle>
          <CardDescription>{i18n.appearance.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2 sm:max-w-sm">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">{i18n.appearance.themeLabel}</p>
              <p className="text-xs text-muted-foreground">{i18n.appearance.themeDescription}</p>
            </div>
            <Select
              options={themeOptions}
              value={mounted ? (theme ?? "system") : "system"}
              onValueChange={(value) => setTheme(value)}
              isSearchable={false}
              aria-label={i18n.appearance.themeLabel}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>{i18n.language.cardTitle}</CardTitle>
          <CardDescription>{i18n.language.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2 sm:max-w-sm">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">{i18n.language.languageLabel}</p>
              <p className="text-xs text-muted-foreground">{i18n.language.languageDescription}</p>
            </div>
            <Select<Language>
              options={languageOptions}
              value={language}
              onValueChange={(value) => setLanguage(value)}
              isSearchable={false}
              aria-label={i18n.language.languageLabel}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
