"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Globe, LaptopMinimal, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LandingCopy } from "@/lib/i18n";

const themeOrder = ["system", "light", "dark"] as const;

const themeIcons = {
  system: LaptopMinimal,
  light: Sun,
  dark: Moon,
} as const;

type NavbarProps = {
  copy: LandingCopy["nav"];
};

export function LandingNavbar({ copy }: NavbarProps) {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme =
    mounted && theme && themeOrder.includes(theme as (typeof themeOrder)[number])
      ? (theme as (typeof themeOrder)[number])
      : "system";

  const ThemeIcon = themeIcons[activeTheme];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#" className="text-lg font-bold tracking-tight text-foreground">
          Catering Helper
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          <Link href="#features" className="text-muted-foreground transition hover:text-foreground">
            {copy.features}
          </Link>
          <Link href="#how-it-works" className="text-muted-foreground transition hover:text-foreground">
            {copy.howItWorks}
          </Link>
          <Link href="#pricing" className="text-muted-foreground transition hover:text-foreground">
            {copy.pricing}
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" aria-label={copy.theme}>
                <ThemeIcon className="h-4 w-4" />
                {copy.modes[activeTheme]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{copy.theme}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>{copy.modes.light}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>{copy.modes.dark}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>{copy.modes.system}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" aria-label={copy.language}>
                <Globe className="h-4 w-4" />
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{copy.language}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage("en")}>EN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("bn")}>BN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm">
            {copy.login}
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            {copy.startFreeTrial}
          </Button>
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label={copy.menu}>
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{copy.menu}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="#features">{copy.features}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#how-it-works">{copy.howItWorks}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#pricing">{copy.pricing}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>{copy.modes.light}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>{copy.modes.dark}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>{copy.modes.system}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage("en")}>EN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("bn")}>BN</DropdownMenuItem>
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
