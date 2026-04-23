'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ChefHat,
  ChevronDown,
  Clock,
  Globe,
  LaptopMinimal,
  Minus,
  Moon,
  Plus,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';

import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type PortalPackage = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  highlight?: boolean;
  mealsByDay: Array<{ day: string; items: string }>;
};

type ClientPortalPageProps = {
  tenant?: string;
};

const portalPackages: PortalPackage[] = [
  {
    id: 'p-1',
    name: 'Package 1',
    tagline: 'Nourishing essentials crafted for daily momentum.',
    price: 250,
    mealsByDay: [
      { day: 'Saturday', items: 'White Rice, Chicken Curry, Mixed Veg' },
      { day: 'Sunday', items: 'Roti, Beef Bhuna, Dal' },
      { day: 'Monday', items: 'White Rice, Fish Curry, Spinach' },
      { day: 'Tuesday', items: 'Khichuri, Egg Curry, Cucumber Salad' },
      { day: 'Wednesday', items: 'Naan, Chicken Korma, Mixed Grill' },
      { day: 'Thursday', items: 'White Rice, Lentil Soup, Fried Eggplant' },
      { day: 'Friday', items: 'Pulao, Beef Curry, Green Beans' },
    ],
  },
  {
    id: 'p-2',
    name: 'Package 2',
    tagline: 'Elevated classics for a refined daily palate.',
    price: 400,
    highlight: true,
    mealsByDay: [
      { day: 'Saturday', items: 'Polao, Roast Chicken, Salad, Dessert' },
      { day: 'Sunday', items: 'Khichuri, Mutton Rezala, Begun Bhaja' },
      { day: 'Monday', items: 'Naan, Butter Chicken, Mixed Grill' },
      { day: 'Tuesday', items: 'Pulao, Beef Bhuna, Cucumber Raita' },
      { day: 'Wednesday', items: 'White Rice, Fish Curry, Spinach' },
      { day: 'Thursday', items: 'Khichuri, Egg Curry, Cucumber Salad' },
      { day: 'Friday', items: 'Naan, Chicken Korma, Mixed Veg' },
    ],
  },
  {
    id: 'p-3',
    name: 'Package 3',
    tagline: 'Gastronomic excellence with premium ingredients.',
    price: 750,
    mealsByDay: [
      { day: 'Saturday', items: 'Kacchi Biryani, Borhani, Jali Kebab, Firni' },
      { day: 'Sunday', items: 'Grilled Salmon, Asparagus, Saffron Rice' },
      {
        day: 'Monday',
        items: 'Beef Steak (Medium Rare), Mashed Potatoes, Glazed Carrots',
      },
      { day: 'Tuesday', items: 'Lamb Chops, Mint Chutney, Jeera Rice' },
      {
        day: 'Wednesday',
        items: 'Prawn Malai Curry, Coconut Rice, Cucumber Salad',
      },
      {
        day: 'Thursday',
        items: 'Chicken Tikka Masala, Garlic Naan, Mixed Grill',
      },
      {
        day: 'Friday',
        items: 'Grilled Sea Bass, Lemon Butter Sauce, Steamed Veggies',
      },
    ],
  },
];

const themeOrder = ['system', 'light', 'dark'] as const;

const themeIcons = {
  system: LaptopMinimal,
  light: Sun,
  dark: Moon,
} as const;

const currency = new Intl.NumberFormat('en-BD', {
  style: 'currency',
  currency: 'BDT',
  maximumFractionDigits: 0,
});

function QuantityControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-2 py-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted"
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-medium text-foreground">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function ClientPortalPage({ tenant }: ClientPortalPageProps) {
  const [selected, setSelected] = useState<Record<string, number>>({
    standard: 1,
  });
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    () => Object.fromEntries(portalPackages.map((item) => [item.id, true])),
  );
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

  const orderRows = useMemo(
    () =>
      portalPackages
        .map((item) => ({
          id: item.id,
          label: item.name,
          qty: selected[item.id] ?? 0,
          subtotal: item.price * (selected[item.id] ?? 0),
        }))
        .filter((row) => row.qty > 0),
    [selected],
  );

  const total = orderRows.reduce((acc, row) => acc + row.subtotal, 0);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_hsl(var(--landing-alt-bg))_0%,_hsl(var(--background))_42%,_hsl(var(--background))_100%)] text-foreground">
      <header className="border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <nav className="mx-auto flex h-16 w-full max-w-[1220px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Uttara Catering
          </Link>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  aria-label="Toggle language"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 border-border bg-background/98 text-foreground shadow-xl backdrop-blur"
              >
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={cn(language === 'en' && 'bg-muted/60')}
                >
                  EN
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('bn')}
                  className={cn(language === 'bn' && 'bg-muted/60')}
                >
                  BN
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              <ThemeIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden h-9 px-3 text-sm sm:inline-flex"
            >
              Login
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1220px] px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-xs font-medium text-white shadow-sm">
            <Clock className="h-4 w-4 text-blue-300" />
            <span>
              Order before <strong className="text-blue-300">10:00 AM</strong>{' '}
              for today&apos;s delivery
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Today&apos;s Menu
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Curated daily selections for your team. Select your preferred tier
            and adjust quantities below to build your office catering order.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            {portalPackages.map((item) => {
              const qty = selected[item.id] ?? 0;
              const active = qty > 0;
              const mealsExpanded = expandedMenus[item.id] ?? true;
              return (
                <Card
                  key={item.id}
                  className={cn(
                    'overflow-hidden border-border/70 bg-card/95 shadow-sm',
                    item.highlight && 'ring-1 ring-primary/40',
                  )}
                >
                  <CardHeader className="flex flex-col gap-4 border-b border-border/70 bg-muted/20 p-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-3xl font-semibold leading-tight tracking-tight sm:text-[2rem]">
                        {item.name}
                      </CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.tagline}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/70 bg-background/80 px-3 py-2">
                      <p className="text-xl font-semibold tracking-tight text-foreground">
                        {currency.format(item.price)}
                      </p>
                      <span className="text-xs uppercase tracking-[0.06em] text-muted-foreground">
                        / day
                      </span>
                      <QuantityControl
                        value={qty}
                        onChange={(next) => {
                          setSelected((prev) => ({ ...prev, [item.id]: next }));
                        }}
                      />
                      <Button
                        size="sm"
                        className="h-8 rounded-md px-3 text-xs font-semibold uppercase tracking-[0.08em]"
                        variant={active ? 'default' : 'outline'}
                      >
                        {active ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 p-5 mt-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-left text-sm font-medium text-foreground transition hover:bg-muted/40"
                      aria-expanded={mealsExpanded}
                      aria-controls={`menu-${item.id}`}
                      onClick={() => {
                        setExpandedMenus((prev) => ({
                          ...prev,
                          [item.id]: !mealsExpanded,
                        }));
                      }}
                    >
                      <span>Weekly meal plan</span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform',
                          mealsExpanded && 'rotate-180',
                        )}
                      />
                    </button>

                    {mealsExpanded ? (
                      <div id={`menu-${item.id}`} className="space-y-2">
                        {item.mealsByDay.map((menu) => (
                          <div
                            key={`${item.id}-${menu.day}`}
                            className="grid gap-2 rounded-lg border border-border/60 bg-muted/25 px-3 py-3 sm:grid-cols-[100px_1fr] sm:items-center"
                          >
                            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                              {menu.day}
                            </span>
                            <p className="text-sm font-medium text-foreground/90">
                              {menu.items}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <aside className="h-fit space-y-4 lg:sticky lg:top-8">
            <Card className="border-border/70 bg-card/95 shadow-sm">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <ChefHat className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Drafting your experience
                </p>
              </CardHeader>
              <CardContent className="space-y-3 p-5 pt-0">
                {orderRows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No package selected yet.
                  </p>
                ) : (
                  orderRows.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-start justify-between gap-3 text-sm border-b border-border/70 pb-3"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {row.label}
                        </p>
                        <p className="text-muted-foreground">
                          {currency.format(row.subtotal / row.qty)} x {row.qty}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        {currency.format(row.subtotal)}
                      </p>
                    </div>
                  ))
                )}
                <div className="pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">
                      Total
                    </p>
                    <p className="text-xl font-bold tracking-tight text-primary">
                      {currency.format(total)}
                    </p>
                  </div>
                </div>
                <Button className="h-11 w-full rounded-lg text-sm font-semibold uppercase tracking-[0.08em]">
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </aside>
        </section>
      </main>
    </div>
  );
}
