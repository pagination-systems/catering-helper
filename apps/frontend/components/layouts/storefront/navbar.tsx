"use client";

import { Globe, LaptopMinimal, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { TenantData } from "@/app/(storefront)/data";
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
import { type ClientPortalContent, clientPortalContent } from "@/lib/i18n";
import { formatDateTime } from "@/lib/utils";

const themeOrder = ["system", "light", "dark"] as const;

const themeIcons = {
  system: LaptopMinimal,
  light: Sun,
  dark: Moon,
} as const;

export function Navbar({ tenant }: { tenant: TenantData }) {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const content = clientPortalContent[language] as ClientPortalContent;

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme =
    mounted && theme && themeOrder.includes(theme as (typeof themeOrder)[number])
      ? (theme as (typeof themeOrder)[number])
      : "system";

  const ThemeIcon = themeIcons[activeTheme];

  const toggleTheme = () => {
    const currentIndex = themeOrder.indexOf(activeTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setTheme(nextTheme);
  };

  return (
    <header className="border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <nav className="mx-auto flex h-16 w-full max-w-[1260px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-base sm:text-lg font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Image
              src={tenant.logoUrl}
              alt={`${tenant.name} logo`}
              width={40}
              height={40}
              className="h-8 w-8 rounded-full object-cover"
            />
          </span>
          {tenant.name}
        </Link>

        <div className="flex items-center gap-2">
          <p className="hidden text-xs font-medium text-muted-foreground sm:block">
            {language === "bn" ? `আজ: ${formatDateTime(new Date())}` : `Today: ${formatDateTime(new Date())}`}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={content.nav.language} className="h-9 w-9 rounded-full">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 border-border bg-background/98 text-foreground shadow-xl backdrop-blur"
            >
              <DropdownMenuLabel>{content.nav.language}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage("en")}>EN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("bn")}>BN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            aria-label={content.nav.theme}
            onClick={toggleTheme}
          >
            <ThemeIcon className="h-4 w-4" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
