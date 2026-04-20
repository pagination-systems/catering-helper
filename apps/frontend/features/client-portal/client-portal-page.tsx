"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarDays,
  ChefHat,
  Clock3,
  Fish,
  Flame,
  LaptopMinimal,
  Leaf,
  Minus,
  Moon,
  Plus,
  Sparkles,
  Sun,
  UtensilsCrossed,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DayName = "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type MenuVariant = {
  id: string;
  name: string;
  items: string[];
  note: string;
  available?: boolean;
};

type DayMenu = {
  day: DayName;
  title: string;
  description: string;
  variants: MenuVariant[];
};

type PackageFeature = {
  icon: LucideIcon;
  label: string;
};

type CateringPackage = {
  id: string;
  name: string;
  pricePerMeal: number;
  description: string;
  popular?: boolean;
  features: PackageFeature[];
  days: DayMenu[];
};

type ClientPortalPageProps = {
  tenant?: string;
};

type PackageSelectionState = {
  activeDay: DayName;
  quantities: Record<string, number>;
};

const dayOrder: DayName[] = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const dayShortLabel: Record<DayName, string> = {
  Saturday: "Sat",
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
};

const bdt = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const themeOrder = ["system", "light", "dark"] as const;

const themeIcons = {
  system: LaptopMinimal,
  light: Sun,
  dark: Moon,
} as const;

function getTodayDayName(): DayName {
  const daysByJsIndex: DayName[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysByJsIndex[new Date().getDay()];
}

function createQuantityKey(day: DayName, variantId: string): string {
  return `${day}::${variantId}`;
}

function createInitialSelection(menuPackage: CateringPackage): PackageSelectionState {
  const today = getTodayDayName();
  const fallbackDay = menuPackage.days[0]?.day ?? "Saturday";

  return {
    activeDay: menuPackage.days.some((day) => day.day === today) ? today : fallbackDay,
    quantities: {},
  };
}

function getMealIcon(itemLabel: string): LucideIcon {
  const label = itemLabel.toLowerCase();

  if (label.includes("fish") || label.includes("ilish") || label.includes("rui") || label.includes("prawn")) {
    return Fish;
  }

  if (label.includes("dal") || label.includes("bhorta") || label.includes("vegetable") || label.includes("salad")) {
    return Leaf;
  }

  if (label.includes("roast") || label.includes("kacchi") || label.includes("curry") || label.includes("bhuna")) {
    return Flame;
  }

  return UtensilsCrossed;
}

function DayTab({ day, active, onClick }: { day: DayName; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group min-w-[78px] rounded-2xl border px-3 py-2 text-left transition-all duration-200",
        active
          ? "border-[hsl(var(--cater-primary))] bg-[hsl(var(--cater-primary))/0.14] text-foreground shadow-sm"
          : "border-border/70 bg-background/70 hover:border-[hsl(var(--cater-primary))/0.4] hover:bg-muted",
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {dayShortLabel[day]}
      </p>
      <p className="mt-0.5 text-sm font-semibold">{day}</p>
    </button>
  );
}

function QuantityStepper({
  value,
  disabled,
  onChange,
}: {
  value: number;
  disabled?: boolean;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/90 p-1">
      <button
        type="button"
        disabled={disabled}
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-foreground">{value}</span>
      <button
        type="button"
        disabled={disabled}
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function MealItemPill({ label }: { label: string }) {
  const Icon = getMealIcon(label);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-xs text-foreground/90">
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[hsl(var(--cater-primary-strong))]">
        <Icon className="h-3 w-3" />
      </span>
      <span>{label}</span>
    </div>
  );
}

function VariantCard({
  variant,
  quantity,
  pulse,
  onQuantityChange,
}: {
  variant: MenuVariant;
  quantity: number;
  pulse: boolean;
  onQuantityChange: (next: number) => void;
}) {
  const active = quantity > 0;
  const available = variant.available ?? true;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl border p-4 transition-all duration-200",
        available
          ? "hover:-translate-y-0.5 hover:shadow-lg"
          : "cursor-not-allowed border-dashed bg-muted/25 opacity-70 grayscale",
        active
          ? "border-[hsl(var(--cater-primary))/0.5] bg-[hsl(var(--cater-primary))/0.08] shadow-[0_8px_26px_-16px_hsl(var(--cater-primary))]"
          : "border-border/70 bg-card/90",
        pulse && "animate-pulse",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold tracking-tight text-foreground">{variant.name}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{variant.note}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]",
            available ? "bg-emerald-500/12 text-emerald-700" : "bg-red-500/12 text-red-700",
          )}
        >
          <Clock3 className="h-3.5 w-3.5" />
          {available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {variant.items.map((item) => (
          <MealItemPill key={`${variant.id}-${item}`} label={item} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Quantity</p>
        <QuantityStepper value={quantity} disabled={!available} onChange={onQuantityChange} />
      </div>

      {!available ? (
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-muted/30" />
      ) : null}
    </article>
  );
}

const packages: CateringPackage[] = [
  {
    id: "corporate-lunch",
    name: "Corporate Lunch",
    pricePerMeal: 290,
    description: "Reliable daily office meals with familiar Bangladeshi comfort and clean presentation.",
    features: [
      { icon: ChefHat, label: "7-day menu" },
      { icon: CalendarDays, label: "Day-wise custom" },
      { icon: Leaf, label: "Balanced nutrition" },
    ],
    days: [
      {
        day: "Saturday",
        title: "Saturday Kickoff",
        description: "A familiar opener for teams getting back into rhythm.",
        variants: [
          {
            id: "sat-fish",
            name: "Rui Fish Combo",
            note: "Best for teams who prefer classic lunch plates.",
            items: ["Plain Rice", "Rui Fish Curry", "Masoor Dal", "Aloo Bhorta"],
          },
          {
            id: "sat-chicken",
            name: "Chicken Bhuna Combo",
            note: "A richer option with balanced sides.",
            items: ["Polao", "Chicken Bhuna", "Moong Dal", "Cucumber Salad"],
          },
          {
            id: "sat-egg",
            name: "Egg Curry Combo",
            note: "Cost-friendly and office-friendly.",
            items: ["Steamed Rice", "Egg Curry", "Pumpkin Bhaji", "Tomato Chutney"],
          },
        ],
      },
      {
        day: "Sunday",
        title: "Sunday Team Fuel",
        description: "Fast moving weekday service with quick quantity controls.",
        variants: [
          {
            id: "sun-fish",
            name: "Ilish Light Plate",
            note: "Premium fish-focused set.",
            items: ["Lemon Rice", "Ilish Bhapa", "Musur Dal", "Shutki Bhorta"],
          },
          {
            id: "sun-chicken",
            name: "Chicken Roast Plate",
            note: "Popular for leadership lunch meetings.",
            items: ["Saffron Polao", "Chicken Roast", "Vegetable Mix", "Raita"],
          },
          {
            id: "sun-veg",
            name: "Vegetable Harmony",
            note: "Vegetarian-friendly with local flavor.",
            items: ["Khichuri", "Mixed Vegetable Curry", "Begun Bhaja", "Dal"],
          },
        ],
      },
      {
        day: "Monday",
        title: "Monday Reset",
        description: "Keep Monday simple and highly predictable.",
        variants: [
          {
            id: "mon-fish",
            name: "Fish Office Classic",
            note: "Familiar and clean profile for weekly consistency.",
            items: ["White Rice", "Fish Curry", "Cholar Dal", "Seasonal Salad"],
          },
          {
            id: "mon-chicken",
            name: "Chicken Curry Bowl",
            note: "Balanced protein with mild spices.",
            items: ["Basmati Rice", "Chicken Curry", "Lau Bhaji", "Lebu"],
          },
          {
            id: "mon-egg",
            name: "Egg Masala Plate",
            note: "Quick service and broad team acceptance.",
            items: ["Rice", "Egg Masala", "Red Lentil Dal", "Achar"],
            available: false,
          },
        ],
      },
      {
        day: "Tuesday",
        title: "Tuesday Balance",
        description: "Choose from bold, light, or vegetarian rhythms.",
        variants: [
          {
            id: "tue-fish",
            name: "Pabda Special",
            note: "Chef-prepared traditional fish dish.",
            items: ["Rice", "Pabda Jhal", "Dal", "Potol Bhaji"],
          },
          {
            id: "tue-chicken",
            name: "Chicken Rezala",
            note: "Soft-spice premium option.",
            items: ["Naan", "Chicken Rezala", "Cucumber Salad", "Firni"],
          },
          {
            id: "tue-veg",
            name: "Veg Comfort",
            note: "Gentle and low-oil lunch option.",
            items: ["Khichuri", "Mixed Veg", "Masoor Dal", "Pepe Bhorta"],
          },
        ],
      },
      {
        day: "Wednesday",
        title: "Midweek Energy",
        description: "A little richer for busy project days.",
        variants: [
          {
            id: "wed-fish",
            name: "Fish Kalia Set",
            note: "Traditional curry profile with office-safe spice level.",
            items: ["Polao", "Fish Kalia", "Motor Dal", "Shosha Salad"],
          },
          {
            id: "wed-chicken",
            name: "Chicken Jhal Fry Set",
            note: "Popular for bigger team orders.",
            items: ["Jeera Rice", "Chicken Jhal Fry", "Vegetable Bhaji", "Achar"],
          },
          {
            id: "wed-egg",
            name: "Egg Bhuna Set",
            note: "Simple and cost-effective backup option.",
            items: ["Rice", "Egg Bhuna", "Masoor Dal", "Alu Bhorta"],
          },
        ],
      },
      {
        day: "Thursday",
        title: "Thursday Comfort",
        description: "Familiar combinations before Friday events.",
        variants: [
          {
            id: "thu-fish",
            name: "Fish Curry Office",
            note: "Steady and widely accepted profile.",
            items: ["Rice", "Fish Curry", "Dal", "Begun Bhorta"],
          },
          {
            id: "thu-chicken",
            name: "Chicken Roast Comfort",
            note: "A soft premium touch.",
            items: ["Polao", "Chicken Roast", "Vegetable", "Borhani"],
          },
          {
            id: "thu-veg",
            name: "Shobji Delight",
            note: "Vegetarian-friendly classic.",
            items: ["Khichuri", "Labra", "Dal", "Tomato Salad"],
          },
        ],
      },
      {
        day: "Friday",
        title: "Friday Signature",
        description: "Close the week with celebration-friendly choices.",
        variants: [
          {
            id: "fri-fish",
            name: "Prawn Malai Special",
            note: "Premium seafood profile for key gatherings.",
            items: ["Saffron Rice", "Prawn Malai Curry", "Dal", "Dessert Cup"],
          },
          {
            id: "fri-chicken",
            name: "Chicken Korma Festive",
            note: "High-conversion event favorite.",
            items: ["Kacchi Polao", "Chicken Korma", "Salad", "Firni"],
          },
          {
            id: "fri-beef",
            name: "Beef Bhuna Classic",
            note: "Hearty option for larger groups.",
            items: ["Pulao", "Beef Bhuna", "Cholar Dal", "Borhani"],
          },
        ],
      },
    ],
  },
  {
    id: "executive",
    name: "Executive Plan",
    pricePerMeal: 430,
    description: "Premium meal variety designed for client meetings, HR events, and leadership floors.",
    popular: true,
    features: [
      { icon: Sparkles, label: "Most popular" },
      { icon: ChefHat, label: "Chef-curated menu" },
      { icon: BadgeCheck, label: "Priority prep" },
    ],
    days: dayOrder.map((day) => ({
      day,
      title: `${day} Executive Menu`,
      description: "Premium day-wise choices with polished presentation.",
      variants: [
        {
          id: `${day.toLowerCase()}-signature-fish`,
          name: "Signature Fish Line",
          note: "Great for senior team lunches.",
          items: ["Lemon Rice", "Grilled Fish", "Dal", "Mixed Salad"],
        },
        {
          id: `${day.toLowerCase()}-signature-chicken`,
          name: "Signature Chicken Line",
          note: "Reliable crowd favorite for meetings.",
          items: ["Saffron Polao", "Chicken Roast", "Vegetable", "Raita"],
        },
        {
          id: `${day.toLowerCase()}-signature-egg`,
          name: "Executive Egg Line",
          note: "Affordable premium backup option.",
          items: ["Rice", "Egg Curry", "Dal", "Bhorta"],
        },
      ],
    })),
  },
  {
    id: "signature-catering",
    name: "Signature Catering",
    pricePerMeal: 690,
    description: "Event-grade plating and high-end local dishes for external guests and celebrations.",
    features: [
      { icon: Flame, label: "Event menu" },
      { icon: CalendarDays, label: "Dedicated setup" },
      { icon: BadgeCheck, label: "Presentation add-on" },
    ],
    days: dayOrder.map((day) => ({
      day,
      title: `${day} Celebration Table`,
      description: "High-impact menu for premium occasions.",
      variants: [
        {
          id: `${day.toLowerCase()}-kacchi`,
          name: "Kacchi Premium",
          note: "Classic celebratory option with proven demand.",
          items: ["Kacchi Biryani", "Borhani", "Jali Kebab", "Firni"],
        },
        {
          id: `${day.toLowerCase()}-seafood`,
          name: "Seafood Premium",
          note: "Sophisticated plate for client hosting.",
          items: ["Butter Rice", "Prawn Malai", "Fresh Salad", "Dessert Cup"],
        },
        {
          id: `${day.toLowerCase()}-mixed-grill`,
          name: "Mixed Grill Premium",
          note: "Bold option for evening team events.",
          items: ["Garlic Naan", "Mixed Grill", "Mint Yogurt", "Lemon"],
        },
      ],
    })),
  },
  {
    id: "daily-smart",
    name: "Smart Daily Saver",
    pricePerMeal: 240,
    description: "Value-focused daily office meals with quick quantity control and easy repeats.",
    features: [
      { icon: Clock3, label: "Fast dispatch" },
      { icon: Leaf, label: "Healthy mix" },
      { icon: CalendarDays, label: "Repeat patterns" },
    ],
    days: dayOrder.map((day) => ({
      day,
      title: `${day} Smart Menu`,
      description: "Simple and affordable options for everyday teams.",
      variants: [
        {
          id: `${day.toLowerCase()}-smart-fish`,
          name: "Smart Fish Set",
          note: "Comfort and familiarity.",
          items: ["Rice", "Fish Curry", "Dal", "Bhorta"],
        },
        {
          id: `${day.toLowerCase()}-smart-chicken`,
          name: "Smart Chicken Set",
          note: "Reliable office favorite.",
          items: ["Rice", "Chicken Curry", "Vegetable", "Salad"],
        },
        {
          id: `${day.toLowerCase()}-smart-veg`,
          name: "Smart Veg Set",
          note: "Vegetarian-friendly day option.",
          items: ["Khichuri", "Mixed Veg", "Dal", "Achar"],
        },
      ],
    })),
  },
];

export function ClientPortalPage({ tenant: _tenant }: ClientPortalPageProps) {
  const customizerRef = useRef<HTMLElement | null>(null);
  const [activePackageId, setActivePackageId] = useState(
    () => packages.find((pkg) => pkg.popular)?.id ?? packages[0]?.id,
  );
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [recentlyUpdatedKey, setRecentlyUpdatedKey] = useState<string | null>(null);
  const [packageSelections, setPackageSelections] = useState<Record<string, PackageSelectionState>>(() =>
    Object.fromEntries(packages.map((pkg) => [pkg.id, createInitialSelection(pkg)])),
  );

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!recentlyUpdatedKey) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setRecentlyUpdatedKey(null);
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [recentlyUpdatedKey]);

  const activeTheme =
    mounted && theme && themeOrder.includes(theme as (typeof themeOrder)[number])
      ? (theme as (typeof themeOrder)[number])
      : "system";

  const ThemeIcon = themeIcons[activeTheme];

  const activePackage = useMemo(
    () => packages.find((pkg) => pkg.id === activePackageId) ?? packages[0],
    [activePackageId],
  );

  const activeSelection = packageSelections[activePackage.id] ?? createInitialSelection(activePackage);

  const activeDay = useMemo(
    () => activePackage.days.find((day) => day.day === activeSelection.activeDay) ?? activePackage.days[0],
    [activePackage, activeSelection.activeDay],
  );

  const packageSelectionTotals = useMemo(() => {
    return Object.fromEntries(
      packages.map((pkg) => {
        const selection = packageSelections[pkg.id] ?? createInitialSelection(pkg);
        const selected = Object.values(selection.quantities).reduce((acc, qty) => acc + (qty > 0 ? qty : 0), 0);
        return [pkg.id, selected];
      }),
    ) as Record<string, number>;
  }, [packageSelections]);

  const orderRows = useMemo(() => {
    const rows: Array<{
      key: string;
      packageName: string;
      day: DayName;
      label: string;
      items: string[];
      quantity: number;
      subtotal: number;
    }> = [];

    packages.forEach((pkg) => {
      const selection = packageSelections[pkg.id] ?? createInitialSelection(pkg);

      pkg.days.forEach((day) => {
        day.variants.forEach((variant) => {
          const quantityKey = createQuantityKey(day.day, variant.id);
          const qty = selection.quantities[quantityKey] ?? 0;

          if (qty > 0) {
            rows.push({
              key: `${pkg.id}::${quantityKey}`,
              packageName: pkg.name,
              day: day.day,
              label: variant.name,
              items: variant.items,
              quantity: qty,
              subtotal: qty * pkg.pricePerMeal,
            });
          }
        });
      });
    });

    return rows.sort((a, b) => {
      if (a.packageName !== b.packageName) {
        return a.packageName.localeCompare(b.packageName);
      }

      return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    });
  }, [packageSelections]);

  const total = useMemo(() => orderRows.reduce((acc, row) => acc + row.subtotal, 0), [orderRows]);
  const totalQuantity = useMemo(() => orderRows.reduce((acc, row) => acc + row.quantity, 0), [orderRows]);

  const localizedText = {
    heroTag: "Corporate Catering Platform",
    heroTitle: "Premium Menus, Frictionless Customization",
    heroSubtitle:
      "Built for office admins and HR teams to select packages, customize meals day-by-day, and manage orders in real time.",
    packageTitle: "Choose a Catering Package",
    customizeTitle: "Customize Day-by-Day Menus",
    summaryTitle: "Order Summary",
    checkout: "Checkout",
    noItems: "No items selected yet",
  };

  const toggleTheme = () => {
    const currentIndex = themeOrder.indexOf(activeTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setTheme(nextTheme);
  };

  const pickPackage = (packageId: string) => {
    setActivePackageId(packageId);
    setCustomizerOpen(true);

    window.requestAnimationFrame(() => {
      customizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const updateQuantity = (day: DayName, variantId: string, next: number) => {
    const safe = Math.max(0, Math.min(500, next));
    const key = createQuantityKey(day, variantId);

    setPackageSelections((prev) => ({
      ...prev,
      [activePackage.id]: {
        ...activeSelection,
        quantities: {
          ...activeSelection.quantities,
          [key]: safe,
        },
      },
    }));

    setRecentlyUpdatedKey(`${activePackage.id}::${key}`);
  };

  const setActiveDay = (day: DayName) => {
    setPackageSelections((prev) => ({
      ...prev,
      [activePackage.id]: {
        ...activeSelection,
        activeDay: day,
      },
    }));
  };

  const resetSelection = () => {
    setPackageSelections((prev) => ({
      ...prev,
      [activePackage.id]: createInitialSelection(activePackage),
    }));
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={
        {
          ["--cater-bg" as string]: "34 44% 97%",
          ["--cater-surface" as string]: "0 0% 100%",
          ["--cater-surface-soft" as string]: "37 70% 95%",
          ["--cater-primary" as string]: "22 91% 56%",
          ["--cater-primary-strong" as string]: "16 84% 48%",
          ["--cater-accent" as string]: "152 44% 42%",
          ["--cater-ink" as string]: "24 26% 16%",
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-[hsl(var(--cater-primary))/0.16] blur-3xl" />
        <div className="absolute top-32 right-[-120px] h-80 w-80 rounded-full bg-[hsl(var(--cater-accent))/0.14] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-amber-200/50 blur-3xl" />
      </div>

      <header className="border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <nav className="mx-auto flex h-16 w-full max-w-[1260px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--cater-primary))/0.12] text-[hsl(var(--cater-primary-strong))]">
              <ChefHat className="h-4 w-4" />
            </span>
            Bengal Serve Cloud
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              <ThemeIcon className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1260px] px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-10">
        <section className="mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--cater-primary))/0.3] bg-[hsl(var(--cater-primary))/0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[hsl(var(--cater-primary-strong))]">
              <Clock3 className="h-3.5 w-3.5" />
              {localizedText.heroTag}
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {localizedText.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {localizedText.heroSubtitle}
            </p>
          </div>
        </section>

        <section className="space-y-7">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {localizedText.packageTitle}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick one or more packages, customize each menu, and review everything in one summary.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg) => {
              const active = pkg.id === activePackage.id;

              return (
                <Card
                  key={pkg.id}
                  className={cn(
                    "relative overflow-hidden border-border/70 bg-card/95 transition duration-200",
                    active
                      ? "border-[hsl(var(--cater-primary))/0.45] shadow-[0_16px_30px_-24px_hsl(var(--cater-primary))]"
                      : "hover:-translate-y-0.5 hover:shadow-lg",
                  )}
                >
                  {/* top center the badge */}
                  {pkg.popular ? (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 rounded-full bg-[hsl(var(--cater-primary))] px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white">
                      Most popular
                    </div>
                  ) : null}

                  <CardHeader className="space-y-3 p-5">
                    <CardTitle className="text-2xl font-semibold leading-tight tracking-tight">{pkg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-bold tracking-tight text-foreground">
                        {bdt.format(pkg.pricePerMeal)}
                      </p>
                      <span className="pb-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        / meal
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 p-5 pt-0">
                    <div className="space-y-2">
                      {pkg.features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                          <div key={feature.label} className="flex items-center gap-2 text-sm text-foreground/90">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[hsl(var(--cater-primary-strong))]">
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            {feature.label}
                          </div>
                        );
                      })}
                    </div>

                    <Button
                      className="h-11 w-full rounded-xl bg-[hsl(var(--cater-primary))] text-white hover:bg-[hsl(var(--cater-primary-strong))]"
                      onClick={() => pickPackage(pkg.id)}
                    >
                      {active ? "Customize This Package" : "View Menu & Customize"}
                    </Button>

                    {packageSelectionTotals[pkg.id] > 0 ? (
                      <p className="text-xs font-medium text-[hsl(var(--cater-primary-strong))]">
                        {packageSelectionTotals[pkg.id]} meal selected in this package
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {customizerOpen ? (
          <section ref={customizerRef} className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <Card className="border-border/70 bg-card/96 shadow-sm">
                <CardHeader className="space-y-5 border-b border-border/70 bg-muted/40 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-3xl font-semibold tracking-tight text-foreground">
                        {localizedText.customizeTitle}
                      </CardTitle>
                      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        {activePackage.name} - {bdt.format(activePackage.pricePerMeal)} per meal.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--cater-accent))/0.3] bg-[hsl(var(--cater-accent))/0.1] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[hsl(var(--cater-accent))]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Real-time pricing
                    </div>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {activePackage.days.map((day) => (
                      <DayTab
                        key={day.day}
                        day={day.day}
                        active={activeSelection.activeDay === day.day}
                        onClick={() => setActiveDay(day.day)}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" onClick={resetSelection}>
                      Reset
                    </Button>
                  </div>
                </CardHeader>

                {activeDay ? (
                  <CardContent className="p-5 mt-2">
                    <div className="animate-in fade-in-0 slide-in-from-right-2 duration-300" key={activeDay.day}>
                      <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {activeDay.day}
                        </p>
                        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                          {activeDay.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">{activeDay.description}</p>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {activeDay.variants.map((variant) => {
                          const key = createQuantityKey(activeDay.day, variant.id);
                          const quantity = activeSelection.quantities[key] ?? 0;

                          return (
                            <VariantCard
                              key={variant.id}
                              variant={variant}
                              quantity={quantity}
                              pulse={recentlyUpdatedKey === `${activePackage.id}::${key}`}
                              onQuantityChange={(next) => updateQuantity(activeDay.day, variant.id, next)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                ) : null}
              </Card>
            </div>

            <aside className="hidden h-fit lg:sticky lg:top-6 lg:block">
              <Card className="border-border/70 bg-card/96 shadow-sm">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
                    {localizedText.summaryTitle}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">All selected items from all packages are listed here.</p>
                </CardHeader>
                <CardContent className="space-y-4 p-5 pt-0">
                  <div className="max-h-[360px] space-y-2 overflow-auto pr-1">
                    {orderRows.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-border bg-background/70 p-4 text-sm text-muted-foreground">
                        {localizedText.noItems}
                      </div>
                    ) : (
                      orderRows.map((row) => (
                        <div
                          key={row.key}
                          className={cn(
                            "rounded-xl border border-border/70 bg-background/75 p-3 transition",
                            recentlyUpdatedKey === row.key && "ring-1 ring-[hsl(var(--cater-primary))/0.35]",
                          )}
                        >
                          <p className="text-sm font-semibold text-foreground">
                            {row.packageName} - {row.day} - {row.label}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{row.items.join(", ")}</p>
                          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{row.quantity} meal</span>
                            <span className="font-semibold text-foreground">{bdt.format(row.subtotal)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-muted/65 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Total</p>
                      <p className="text-2xl font-bold tracking-tight text-[hsl(var(--cater-primary-strong))]">
                        {bdt.format(total)}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{totalQuantity} total meal selected</p>
                  </div>

                  <Button className="h-11 w-full rounded-xl bg-[hsl(var(--cater-primary))] text-white hover:bg-[hsl(var(--cater-primary-strong))]">
                    {localizedText.checkout}
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </section>
        ) : null}
      </main>

      {customizerOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-background/95 px-4 py-3 shadow-2xl backdrop-blur lg:hidden">
          <div className="mx-auto w-full max-w-[1260px]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 shrink-0 items-center rounded-xl border border-border/80 px-3 text-sm font-semibold"
                onClick={() => setMobileSummaryOpen((prev) => !prev)}
              >
                {mobileSummaryOpen ? "Hide Summary" : "View Summary"}
              </button>

              <div className="min-w-0 flex-1 rounded-xl border border-border/80 bg-muted/65 px-3 py-2">
                <p className="truncate text-xs text-muted-foreground">{totalQuantity} meal selected</p>
                <p className="text-lg font-semibold tracking-tight text-[hsl(var(--cater-primary-strong))]">
                  {bdt.format(total)}
                </p>
              </div>

              <Button className="h-10 rounded-xl bg-[hsl(var(--cater-primary))] px-4 text-white hover:bg-[hsl(var(--cater-primary-strong))]">
                {localizedText.checkout}
              </Button>
            </div>

            {mobileSummaryOpen ? (
              <div className="mt-3 max-h-64 space-y-2 overflow-auto rounded-2xl border border-border/80 bg-background/98 p-3">
                {orderRows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{localizedText.noItems}</p>
                ) : (
                  orderRows.map((row) => (
                    <div key={row.key} className="rounded-xl border border-border/70 bg-background p-2.5">
                      <p className="text-sm font-semibold">
                        {row.packageName} - {row.day} - {row.label}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{row.items.join(", ")}</p>
                      <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{row.quantity} meal</span>
                        <span className="font-semibold text-foreground">{bdt.format(row.subtotal)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
