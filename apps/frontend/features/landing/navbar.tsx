'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Globe, LaptopMinimal, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { LandingCopy } from '@/lib/i18n';

const themeOrder = ['system', 'light', 'dark'] as const;

const themeIcons = {
  system: LaptopMinimal,
  light: Sun,
  dark: Moon,
} as const;

type NavbarProps = {
  copy: LandingCopy['nav'];
};

export function LandingNavbar({ copy }: NavbarProps) {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme =
    mounted &&
    theme &&
    themeOrder.includes(theme as (typeof themeOrder)[number])
      ? (theme as (typeof themeOrder)[number])
      : 'system';

  const ThemeIcon = themeIcons[activeTheme];

  const toggleTheme = () => {
    const currentIndex = themeOrder.indexOf(activeTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setTheme(nextTheme);
  };

  return (
    <header className="border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <nav className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#"
          className="text-[14px] font-medium tracking-tight text-foreground"
        >
          Catering Helper
        </Link>

        <div className="hidden items-center gap-6 text-[11px] font-medium md:flex">
          <Link
            href="#solution"
            className="text-primary underline-offset-4 hover:underline"
          >
            {copy.solution}
          </Link>
          <Link
            href="#how-it-works"
            className="text-muted-foreground transition hover:text-foreground"
          >
            {copy.howItWorks}
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground transition hover:text-foreground"
          >
            {copy.pricing}
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={copy.language}
                className="h-8 w-8 rounded-full"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 border-border bg-background/98 text-foreground shadow-xl backdrop-blur"
            >
              <DropdownMenuLabel>{copy.language}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                EN
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('bn')}>
                BN
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            aria-label={copy.theme}
            onClick={toggleTheme}
            className="h-8 w-8 rounded-full"
          >
            <ThemeIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-[11px] font-medium text-foreground"
          >
            {copy.login}
          </Button>
          <Button
            size="sm"
            className="h-8 rounded-[4px] bg-primary px-3 text-[10px] font-semibold uppercase tracking-[0.04em] text-primary-foreground hover:bg-primary/90"
          >
            {copy.startFreeTrial}
          </Button>
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={copy.menu}
                className="bg-background"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 border-border bg-background/98 text-foreground shadow-xl backdrop-blur"
            >
              <DropdownMenuLabel>{copy.menu}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="#solution">{copy.solution}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="#pricing">{copy.pricing}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="#how-it-works">{copy.howItWorks}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme('light')}>
                {copy.modes.light}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                {copy.modes.dark}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                {copy.modes.system}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                EN
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('bn')}>
                BN
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{copy.login}</DropdownMenuItem>
              <DropdownMenuItem>{copy.startFreeTrial}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
