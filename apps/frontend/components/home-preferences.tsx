'use client';

import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { siteNames } from '@/lib/i18n';

export function HomePreferences() {
  const { language, setLanguage } = useLanguage();

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="w-full max-w-xl space-y-8 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            {siteNames[language]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose language and theme. Your selections are saved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            onClick={() => setLanguage('en')}
            aria-label="Select English"
          >
            <Languages className="h-4 w-4" />
            English
          </Button>
          <Button
            variant={language === 'bn' ? 'default' : 'outline'}
            onClick={() => setLanguage('bn')}
            aria-label="Select Bangla"
          >
            <Languages className="h-4 w-4" />
            বাংলা
          </Button>
          <ThemeToggle />
        </div>
      </section>
    </main>
  );
}
