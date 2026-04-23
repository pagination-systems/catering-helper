'use client';

import { useEffect, useState } from 'react';
import { LaptopMinimal, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

const themeOrder = ['system', 'light', 'dark'] as const;

const themeIcons = {
  system: LaptopMinimal,
  light: Sun,
  dark: Moon,
} as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const activeTheme =
    theme && themeOrder.includes(theme as (typeof themeOrder)[number])
      ? theme
      : 'system';
  const nextTheme =
    themeOrder[
      (themeOrder.indexOf(activeTheme as (typeof themeOrder)[number]) + 1) %
        themeOrder.length
    ];
  const Icon = themeIcons[activeTheme as keyof typeof themeIcons];

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch theme to ${nextTheme}`}
      title={`Theme: ${activeTheme}`}
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">Switch theme</span>
    </Button>
  );
}
