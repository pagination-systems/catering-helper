"use client";

import { ACCOUNT_TYPE_ENUMS } from "@catering/types";
import {
  Globe,
  LaptopMinimal,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  ShoppingBag,
  Sun,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
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
import { type LandingContent, landingContent } from "@/lib/i18n";
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

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useAuthBootstrap();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { logout } = useLogout();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (landingContent[language] as LandingContent).nav;

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
  // Admins / caterers get a quick link back to their panel.
  const isStaff = !!user && user.type !== ACCOUNT_TYPE_ENUMS.CUSTOMER;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <nav className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-[14px] font-medium tracking-tight text-foreground">
          <Image src="/logo.svg" alt="Catering Helper Logo" width={32} height={32} className="h-10 w-auto" />
          Catering Helper
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={content.language} className="h-8 w-8 rounded-full">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 border-border bg-background/98 text-foreground shadow-xl backdrop-blur"
            >
              <DropdownMenuLabel>{content.language}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage("en")}>EN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("bn")}>BN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            aria-label={content.theme}
            onClick={toggleTheme}
            className="h-8 w-8 rounded-full"
          >
            <ThemeIcon className="h-4 w-4" />
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 items-center gap-2 rounded-full px-1.5 hover:bg-muted"
                  aria-label={content.myAccount}
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
                  <span>{content.myAccount}</span>
                  {user.email && <span className="text-xs font-normal text-muted-foreground">{user.email}</span>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!isStaff && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/account/orders">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      {content.orders}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/account/profile">
                    <UserCircle2 className="mr-2 h-4 w-4" />
                    {content.profile}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/account/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    {content.settings}
                  </Link>
                </DropdownMenuItem>
                {isStaff && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/admin/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {content.dashboard}
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
                  {content.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-[11px] font-medium text-foreground">
                <Link href="/admin/login">{content.login}</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="h-8 rounded-md bg-primary px-3 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/admin/register">{content.signUp}</Link>
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label={content.menu} className="bg-background">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 border-border bg-background/98 text-foreground shadow-xl backdrop-blur"
            >
              <DropdownMenuLabel>{content.menu}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/#solution">{content.solution}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/#features">{content.features}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/#how-it-works">{content.howItWorks}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/#pricing">{content.pricing}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>{content.modes.light}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>{content.modes.dark}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>{content.modes.system}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage("en")}>EN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("bn")}>BN</DropdownMenuItem>
              <DropdownMenuSeparator />
              {isAuthenticated && user ? (
                <>
                  {!isStaff && (
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/account/orders">{content.orders}</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/account/profile">{content.profile}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/account/settings">{content.settings}</Link>
                  </DropdownMenuItem>
                  {isStaff && (
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/admin/dashboard">{content.dashboard}</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onSelect={(event) => {
                      event.preventDefault();
                      logout("/");
                    }}
                  >
                    {content.logout}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/admin/login">{content.login}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/admin/register">{content.signUp}</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
