"use client";

import { ACCOUNT_TYPE_ENUMS } from "@catering/types";
import { Globe, LaptopMinimal, LayoutDashboard, LogOut, Moon, Settings, ShoppingBag, Sun, UserCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { TenantData } from "@/app/(storefront)/data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthBootstrap, useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store/useStore";
import { type ClientPortalContent, clientPortalContent, type LandingContent, landingContent } from "@/lib/i18n";
import { formatDateTime } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

const themeOrder = ["system", "light", "dark"] as const;

const themeIcons = {
  system: LaptopMinimal,
  light: Sun,
  dark: Moon,
} as const;

const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

export function Navbar({ tenant }: { tenant: TenantData }) {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const content = clientPortalContent[language] as ClientPortalContent;
  const nav = (landingContent[language] as LandingContent).nav;

  useAuthBootstrap();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { logout } = useLogout();

  // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const displayName =
    user?.fullName?.trim() || [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() || user?.email || "";
  // Admins / caterers get a quick link back to their panel instead of orders.
  const isStaff = !!user && user.type !== ACCOUNT_TYPE_ENUMS.CUSTOMER;

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

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 items-center gap-2 rounded-full px-1.5 hover:bg-muted"
                  aria-label={nav.myAccount}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">
                    {getInitials(displayName)}
                  </span>
                  <span className="hidden max-w-[120px] truncate text-[12px] font-medium text-foreground lg:inline">
                    {displayName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border-border bg-background/98 text-foreground shadow-xl backdrop-blur"
              >
                <DropdownMenuLabel className="flex flex-col gap-0.5">
                  <span>{nav.myAccount}</span>
                  {user.email && <span className="text-xs font-normal text-muted-foreground">{user.email}</span>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!isStaff && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/account/orders">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      {nav.orders}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/account/profile">
                    <UserCircle2 className="mr-2 h-4 w-4" />
                    {nav.profile}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/account/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    {nav.settings}
                  </Link>
                </DropdownMenuItem>
                {isStaff && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/admin/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {nav.dashboard}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onSelect={(event) => {
                    event.preventDefault();
                    logout("/");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {nav.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-[12px] font-medium text-foreground">
                <Link href="/admin/login">{nav.login}</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="h-8 rounded-md bg-primary px-3 text-[12px] font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/admin/register">{nav.signUp}</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
