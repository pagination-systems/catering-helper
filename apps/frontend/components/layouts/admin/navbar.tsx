"use client";

import {
  Globe,
  LaptopMinimal,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Sun,
  UserCircle2,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store/useStore";
import { getAdminContent } from "@/lib/admin-i18n";
import { useLanguage } from "@/providers/language-provider";
import { useAdminLayout } from "./store/useStore";

const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

const themeOrder = ["system", "light", "dark"] as const;

const themeIcons = {
  system: LaptopMinimal,
  light: Sun,
  dark: Moon,
} as const;

type NavbarProps = {
  onSearch?: (query: string) => void;
};

export function Navbar({ onSearch }: NavbarProps) {
  const { isSidebarCollapsed, toggleSidebarCollapsed, toggleMobileSidebar } = useAdminLayout();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = getAdminContent(language);
  const user = useAuthStore((s) => s.user);
  const { logout, isLoggingOut } = useLogout();

  const displayName =
    user?.fullName?.trim() ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    user?.email ||
    "Admin";
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      onSearch?.(query);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [onSearch, query]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="flex h-[var(--admin-navbar-height)] items-center gap-3 px-3 sm:px-4 lg:px-6">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileSidebar}
          aria-label={t.navbar.aria.openSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="hidden md:inline-flex"
          onClick={toggleSidebarCollapsed}
          aria-label={isSidebarCollapsed ? t.navbar.aria.expandSidebar : t.navbar.aria.collapseSidebar}
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>

        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.navbar.searchPlaceholder}
            className="pl-9"
            aria-label={t.navbar.aria.sidebarMenu}
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t.navbar.aria.language} className="h-9 w-9 rounded-full">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>{t.navbar.language}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage("en")}>EN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("bn")}>BN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t.navbar.aria.toggleTheme}
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full"
          >
            <ThemeIcon className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-10 items-center gap-2 rounded-full px-1.5 hover:bg-muted"
                aria-label={t.navbar.aria.userMenu}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {getInitials(displayName)}
                </span>
                <span className="hidden text-sm font-medium text-foreground sm:inline">{displayName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>{t.navbar.userMenu.myAccount}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/profile" className="cursor-pointer">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  {t.navbar.userMenu.profile}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  {t.navbar.userMenu.settings}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                disabled={isLoggingOut}
                onSelect={(event) => {
                  event.preventDefault();
                  logout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t.navbar.userMenu.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
