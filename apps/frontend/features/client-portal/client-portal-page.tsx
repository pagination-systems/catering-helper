"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CheckCircle2,
  ChefHat,
  Clock,
  EggFried,
  Fish,
  Globe,
  LaptopMinimal,
  Leaf,
  Minus,
  Moon,
  Plus,
  Sparkles,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type DayName = "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type MealItem = {
  label: string;
  included?: boolean;
};

type SwapDay = {
  day: DayName;
  kind: "swap";
  title: string;
  intro: string;
  baseItems: MealItem[];
  swapLabel: string;
  defaultSwap: string;
  swapOptions: string[];
};

type VariantDay = {
  day: DayName;
  kind: "cards";
  title: string;
  intro: string;
  variants: Array<{
    id: string;
    title: string;
    items: MealItem[];
    badge: string;
  }>;
  defaultVariantId: string;
};

type PortalPackage = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  highlight?: boolean;
  bullets: string[];
  days: Array<SwapDay | VariantDay>;
};

type ClientPortalPageProps = {
  tenant?: string;
};

type PackageSelectionState = {
  activeDay: DayName;
  quantities: Record<string, number>;
};

const dayOrder: DayName[] = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const dayShortLabels: Record<DayName, string> = {
  Saturday: "Sat",
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
};

const themeOrder = ["system", "light", "dark"] as const;

const themeIcons = {
  system: LaptopMinimal,
  light: Sun,
  dark: Moon,
} as const;

const currency = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

function createInitialSelection(menuPackage: PortalPackage): PackageSelectionState {
  const today = getTodayDayName();

  return {
    activeDay: menuPackage.days.some((day) => day.day === today) ? today : (menuPackage.days[0]?.day ?? "Saturday"),
    quantities: {},
  };
}

function getTodayDayName(): DayName {
  const daysByJsIndex: DayName[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysByJsIndex[new Date().getDay()];
}

type DayVariant = {
  id: string;
  title: string;
  badge: string;
  items: MealItem[];
};

function normalizeVariantId(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "-");
}

function getDayVariants(day: SwapDay | VariantDay): DayVariant[] {
  if (day.kind === "cards") {
    return day.variants;
  }

  return day.swapOptions.map((option) => ({
    id: normalizeVariantId(option),
    title: option,
    badge: "Included",
    items: [...day.baseItems, { label: option, included: true }],
  }));
}

function createVariantQuantityKey(day: DayName, variantId: string): string {
  return `${day}::${variantId}`;
}

function getMealIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();

  if (normalized.includes("fish") || normalized.includes("salmon") || normalized.includes("sea bass")) {
    return Fish;
  }

  if (normalized.includes("egg")) {
    return EggFried;
  }

  if (
    normalized.includes("veg") ||
    normalized.includes("salad") ||
    normalized.includes("spinach") ||
    normalized.includes("cucumber") ||
    normalized.includes("beans") ||
    normalized.includes("asparagus") ||
    normalized.includes("carrot") ||
    normalized.includes("eggplant") ||
    normalized.includes("begun")
  ) {
    return Leaf;
  }

  if (
    normalized.includes("rice") ||
    normalized.includes("roti") ||
    normalized.includes("naan") ||
    normalized.includes("pulao") ||
    normalized.includes("khichuri") ||
    normalized.includes("biryani")
  ) {
    return Sparkles;
  }

  return ChefHat;
}

function MealRow({ item }: { item: MealItem }) {
  const Icon = getMealIcon(item.label);

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/80 p-3">
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-foreground">{item.label}</p>
          {item.included ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              Included
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function QuantityControl({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border/70 bg-background/90 px-1 py-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted"
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-foreground">{value}</span>
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

function DayChip({ day, active, onClick }: { day: DayName; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-w-20 flex-col items-center rounded-2xl border px-3 py-2 text-center transition",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border/70 bg-background/70 text-foreground hover:bg-muted/50",
      )}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {dayShortLabels[day]}
      </span>
      <span className="text-sm font-semibold">{day}</span>
    </button>
  );
}

function VariantCard({
  variant,
  quantity,
  onQuantityChange,
}: {
  variant: { id: string; title: string; items: MealItem[]; badge: string };
  quantity: number;
  onQuantityChange: (next: number) => void;
}) {
  const selected = quantity > 0;

  return (
    <div
      className={cn(
        "group flex h-full flex-col rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        selected ? "border-primary bg-primary/5 shadow-md shadow-primary/10" : "border-border/70 bg-background/80",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold tracking-tight text-foreground">{variant.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">A complete meal set for this day.</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
            selected ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-muted text-muted-foreground",
          )}
        >
          {selected ? <CheckCircle2 className="h-3.5 w-3.5" /> : <BadgeCheck className="h-3.5 w-3.5" />}
          {variant.badge}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {variant.items.map((item) => (
          <MealRow key={item.label} item={item} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Quantity</p>
        <QuantityControl value={quantity} onChange={onQuantityChange} />
      </div>
    </div>
  );
}

const portalPackages: PortalPackage[] = [
  {
    id: "p-1",
    name: "Corporate Lunch",
    tagline: "Balanced office meals with quick swaps and familiar daily favorites.",
    price: 250,
    bullets: ["5 days a week", "2 protein swaps", "Best for routine office lunches"],
    days: [
      {
        day: "Saturday",
        kind: "swap",
        title: "Saturday lunch",
        intro: "Keep the base plate steady and swap the protein without changing the price.",
        baseItems: [
          { label: "Plain rice", included: true },
          { label: "Mixed veg", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Fish",
        swapOptions: ["Fish", "Egg"],
      },
      {
        day: "Sunday",
        kind: "cards",
        title: "Sunday rotation",
        intro: "Choose the meal set that best fits the team mood.",
        defaultVariantId: "standard",
        variants: [
          {
            id: "standard",
            title: "Option A",
            badge: "Included",
            items: [{ label: "Roti" }, { label: "Beef bhuna" }, { label: "Dal" }],
          },
          {
            id: "light",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Khichuri" }, { label: "Chicken curry" }, { label: "Salad" }],
          },
        ],
      },
      {
        day: "Monday",
        kind: "swap",
        title: "Monday reset",
        intro: "A familiar base with a single protein swap for variety.",
        baseItems: [
          { label: "White rice", included: true },
          { label: "Spinach", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Fish",
        swapOptions: ["Fish", "Egg"],
      },
      {
        day: "Tuesday",
        kind: "cards",
        title: "Tuesday menu",
        intro: "Pick a full plate when the team wants a different direction.",
        defaultVariantId: "balanced",
        variants: [
          {
            id: "balanced",
            title: "Option A",
            badge: "Included",
            items: [{ label: "Khichuri" }, { label: "Egg curry" }, { label: "Cucumber salad" }],
          },
          {
            id: "comfort",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Pulao" }, { label: "Chicken roast" }, { label: "Dal" }],
          },
        ],
      },
      {
        day: "Wednesday",
        kind: "swap",
        title: "Wednesday lunch",
        intro: "A slightly richer plate with a simple swap control.",
        baseItems: [
          { label: "Naan", included: true },
          { label: "Mixed veg", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Chicken",
        swapOptions: ["Chicken", "Fish"],
      },
      {
        day: "Thursday",
        kind: "cards",
        title: "Thursday menu",
        intro: "Switch between two clearly different meal sets.",
        defaultVariantId: "classic",
        variants: [
          {
            id: "classic",
            title: "Option A",
            badge: "Included",
            items: [{ label: "White rice" }, { label: "Lentil soup" }, { label: "Fried eggplant" }],
          },
          {
            id: "fresh",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Naan" }, { label: "Egg curry" }, { label: "Salad" }],
          },
        ],
      },
      {
        day: "Friday",
        kind: "swap",
        title: "Friday finish",
        intro: "Keep Friday easy to review and easy to repeat next week.",
        baseItems: [
          { label: "Pulao", included: true },
          { label: "Green beans", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Beef",
        swapOptions: ["Beef", "Fish"],
      },
    ],
  },
  {
    id: "p-2",
    name: "Executive Plan",
    tagline: "A stronger premium line-up with more full-meal variants for busy teams.",
    price: 400,
    highlight: true,
    bullets: ["7-day menu rotation", "Full meal swaps", "Popular premium choice"],
    days: [
      {
        day: "Saturday",
        kind: "cards",
        title: "Saturday spread",
        intro: "Start the week with a clear premium choice.",
        defaultVariantId: "roast",
        variants: [
          {
            id: "roast",
            title: "Option A",
            badge: "Included",
            items: [{ label: "Polao" }, { label: "Roast chicken" }, { label: "Salad" }, { label: "Dessert" }],
          },
          {
            id: "kacchi",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Kacchi wrap" }, { label: "Raita" }, { label: "Fruit cup" }],
          },
        ],
      },
      {
        day: "Sunday",
        kind: "swap",
        title: "Sunday lunch",
        intro: "A soft swap interface for the protein portion.",
        baseItems: [
          { label: "Khichuri", included: true },
          { label: "Begun bhaja", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Mutton",
        swapOptions: ["Mutton", "Egg"],
      },
      {
        day: "Monday",
        kind: "cards",
        title: "Monday premium",
        intro: "Choose between two distinctly different lunch sets.",
        defaultVariantId: "butter",
        variants: [
          {
            id: "butter",
            title: "Option A",
            badge: "Included",
            items: [{ label: "Naan" }, { label: "Butter chicken" }, { label: "Mixed grill" }],
          },
          {
            id: "steam",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Steamed rice" }, { label: "Fish tikka" }, { label: "Salad" }],
          },
        ],
      },
      {
        day: "Tuesday",
        kind: "swap",
        title: "Tuesday lunch",
        intro: "Keep the meal structure steady while swapping the main protein.",
        baseItems: [
          { label: "Pulao", included: true },
          { label: "Cucumber raita", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Beef",
        swapOptions: ["Beef", "Chicken"],
      },
      {
        day: "Wednesday",
        kind: "cards",
        title: "Wednesday rotation",
        intro: "Use cards when the entire meal changes, not just one ingredient.",
        defaultVariantId: "fish",
        variants: [
          {
            id: "fish",
            title: "Option A",
            badge: "Included",
            items: [{ label: "White rice" }, { label: "Fish curry" }, { label: "Spinach" }],
          },
          {
            id: "egg",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "White rice" }, { label: "Egg curry" }, { label: "Mixed veg" }],
          },
        ],
      },
      {
        day: "Thursday",
        kind: "swap",
        title: "Thursday lunch",
        intro: "A quick dropdown keeps repeat decisions out of the way.",
        baseItems: [
          { label: "Khichuri", included: true },
          { label: "Cucumber salad", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Egg",
        swapOptions: ["Egg", "Fish"],
      },
      {
        day: "Friday",
        kind: "cards",
        title: "Friday closing menu",
        intro: "Finalize the week with a stronger visual meal choice.",
        defaultVariantId: "korma",
        variants: [
          {
            id: "korma",
            title: "Option A",
            badge: "Included",
            items: [{ label: "Naan" }, { label: "Chicken korma" }, { label: "Mixed veg" }],
          },
          {
            id: "grill",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Garlic rice" }, { label: "Beef bhuna" }, { label: "Salad" }],
          },
        ],
      },
    ],
  },
  {
    id: "p-3",
    name: "Signature Catering",
    tagline: "Chef-led premium menus for client-facing lunches and larger team moments.",
    price: 750,
    bullets: ["Chef-style premium dishes", "Client-ready presentation", "Ideal for team celebrations"],
    days: [
      {
        day: "Saturday",
        kind: "cards",
        title: "Saturday signature",
        intro: "Choose between two premium plates with equal pricing.",
        defaultVariantId: "kacchi",
        variants: [
          {
            id: "kacchi",
            title: "Option A",
            badge: "Included",
            items: [{ label: "Kacchi biryani" }, { label: "Borhani" }, { label: "Jali kebab" }, { label: "Firni" }],
          },
          {
            id: "roast",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Special roast" }, { label: "Saffron rice" }, { label: "Firni" }],
          },
        ],
      },
      {
        day: "Sunday",
        kind: "swap",
        title: "Sunday premium swap",
        intro: "Use the dropdown to swap the headline protein only.",
        baseItems: [
          { label: "Saffron rice", included: true },
          { label: "Asparagus", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Grilled salmon",
        swapOptions: ["Grilled salmon", "Herb chicken"],
      },
      {
        day: "Monday",
        kind: "cards",
        title: "Monday signature",
        intro: "Switch the whole menu for bigger guest-facing days.",
        defaultVariantId: "steak",
        variants: [
          {
            id: "steak",
            title: "Option A",
            badge: "Included",
            items: [{ label: "Beef steak" }, { label: "Mashed potatoes" }, { label: "Glazed carrots" }],
          },
          {
            id: "lamb",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Lamb chops" }, { label: "Mint chutney" }, { label: "Jeera rice" }],
          },
        ],
      },
      {
        day: "Tuesday",
        kind: "swap",
        title: "Tuesday premium swap",
        intro: "A simple control for the headline protein on a lighter day.",
        baseItems: [
          { label: "Jeera rice", included: true },
          { label: "Cucumber salad", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Prawn malai curry",
        swapOptions: ["Prawn malai curry", "Lamb chops"],
      },
      {
        day: "Wednesday",
        kind: "cards",
        title: "Wednesday signature",
        intro: "Compare two premium seafood-forward plates.",
        defaultVariantId: "prawn",
        variants: [
          {
            id: "prawn",
            title: "Option A",
            badge: "Included",
            items: [{ label: "Prawn malai curry" }, { label: "Coconut rice" }, { label: "Cucumber salad" }],
          },
          {
            id: "fish",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Fish curry" }, { label: "Lemon rice" }, { label: "Leafy greens" }],
          },
        ],
      },
      {
        day: "Thursday",
        kind: "swap",
        title: "Thursday premium swap",
        intro: "Use one control when only the protein should change.",
        baseItems: [
          { label: "Garlic naan", included: true },
          { label: "Mixed grill", included: true },
        ],
        swapLabel: "Protein",
        defaultSwap: "Chicken tikka masala",
        swapOptions: ["Chicken tikka masala", "Sea bass"],
      },
      {
        day: "Friday",
        kind: "cards",
        title: "Friday closing menu",
        intro: "End the week with a premium plate selection.",
        defaultVariantId: "sea-bass",
        variants: [
          {
            id: "sea-bass",
            title: "Option A",
            badge: "Included",
            items: [{ label: "Grilled sea bass" }, { label: "Lemon butter sauce" }, { label: "Steamed veggies" }],
          },
          {
            id: "salmon",
            title: "Option B",
            badge: "+$0.00",
            items: [{ label: "Salmon steak" }, { label: "Asparagus" }, { label: "Saffron rice" }],
          },
        ],
      },
    ],
  },
];

export function ClientPortalPage({ tenant: _tenant }: ClientPortalPageProps) {
  const customizerRef = useRef<HTMLElement | null>(null);
  const [activePackageId, setActivePackageId] = useState(
    () => portalPackages.find((item) => item.highlight)?.id ?? portalPackages[0]?.id ?? "p-1",
  );
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [packageSelections, setPackageSelections] = useState<Record<string, PackageSelectionState>>(() =>
    Object.fromEntries(portalPackages.map((item) => [item.id, createInitialSelection(item)])),
  );
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

  const activePackage = useMemo(
    () => portalPackages.find((item) => item.id === activePackageId) ?? portalPackages[0],
    [activePackageId],
  );

  const activeSelection = packageSelections[activePackage.id] ?? createInitialSelection(activePackage);

  const activeDayMenu = useMemo(
    () => activePackage.days.find((day) => day.day === activeSelection.activeDay) ?? activePackage.days[0],
    [activePackage, activeSelection.activeDay],
  );

  const activeDayVariants = useMemo(() => {
    if (!activeDayMenu) {
      return [] as DayVariant[];
    }

    return getDayVariants(activeDayMenu);
  }, [activeDayMenu]);

  const previewItems = useMemo(() => {
    if (!activeDayMenu) {
      return [];
    }

    const selectedVariants = activeDayVariants
      .filter(
        (variant) => (activeSelection.quantities[createVariantQuantityKey(activeDayMenu.day, variant.id)] ?? 0) > 0,
      )
      .flatMap((variant) => variant.items);

    if (selectedVariants.length > 0) {
      return selectedVariants;
    }

    return activeDayVariants[0]?.items ?? [];
  }, [activeDayMenu, activeDayVariants, activeSelection.quantities]);

  const orderRows = useMemo(() => {
    const rows: Array<{
      key: string;
      day: DayName;
      label: string;
      qty: number;
      subtotal: number;
    }> = [];

    const orderedDays = [...activePackage.days].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

    orderedDays.forEach((day) => {
      const variants = getDayVariants(day);
      variants.forEach((variant) => {
        const key = createVariantQuantityKey(day.day, variant.id);
        const qty = activeSelection.quantities[key] ?? 0;

        if (qty > 0) {
          rows.push({
            key,
            day: day.day,
            label: variant.title,
            qty,
            subtotal: qty * activePackage.price,
          });
        }
      });
    });

    return rows;
  }, [activePackage, activeSelection.quantities]);

  const total = useMemo(() => orderRows.reduce((sum, row) => sum + row.subtotal, 0), [orderRows]);

  const toggleTheme = () => {
    const currentIndex = themeOrder.indexOf(activeTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setTheme(nextTheme);
  };

  const handlePackagePick = (packageId: string) => {
    setActivePackageId(packageId);
    setIsCustomizerOpen(true);
    window.requestAnimationFrame(() => {
      customizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleDayChange = (day: DayName) => {
    setPackageSelections((previous) => ({
      ...previous,
      [activePackage.id]: {
        ...activeSelection,
        activeDay: day,
      },
    }));
  };

  const handleApplyToAllWeeks = () => {
    if (!activeDayMenu) {
      return;
    }

    const sourceVariants = getDayVariants(activeDayMenu);

    setPackageSelections((previous) => {
      const currentSelection = previous[activePackage.id] ?? createInitialSelection(activePackage);
      const nextQuantities = { ...currentSelection.quantities };

      activePackage.days.forEach((day) => {
        const dayVariants = getDayVariants(day);
        dayVariants.forEach((targetVariant) => {
          const sourceVariant = sourceVariants.find((item) => item.id === targetVariant.id);
          const nextQty = sourceVariant
            ? (currentSelection.quantities[createVariantQuantityKey(activeDayMenu.day, sourceVariant.id)] ?? 0)
            : 0;

          nextQuantities[createVariantQuantityKey(day.day, targetVariant.id)] = nextQty;
        });
      });

      return {
        ...previous,
        [activePackage.id]: {
          ...currentSelection,
          quantities: nextQuantities,
        },
      };
    });
  };

  const handleResetToDefault = () => {
    setPackageSelections((previous) => ({
      ...previous,
      [activePackage.id]: createInitialSelection(activePackage),
    }));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_hsl(var(--landing-alt-bg))_0%,_hsl(var(--background))_42%,_hsl(var(--background))_100%)] text-foreground">
      <header className="border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <nav className="mx-auto flex h-16 w-full max-w-[1220px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
            Uttara Catering
          </Link>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" aria-label="Toggle language">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 border-border bg-background/98 text-foreground shadow-xl backdrop-blur"
              >
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLanguage("en")} className={cn(language === "en" && "bg-muted/60")}>
                  EN
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("bn")} className={cn(language === "bn" && "bg-muted/60")}>
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
            <Button variant="ghost" size="sm" className="hidden h-9 px-3 text-sm sm:inline-flex">
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
              Order before <strong className="text-blue-300">10:00 AM</strong> for today&apos;s delivery
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">Menu first, then customize</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Pick a package, then refine one day at a time with day tabs, inline swaps, or full meal variant cards.
          </p>
        </section>

        <section className="space-y-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {portalPackages.map((item) => {
              const active = item.id === activePackage.id;

              return (
                <Card
                  key={item.id}
                  className={cn(
                    "overflow-hidden border-border/70 bg-card/95 shadow-sm transition duration-200",
                    active ? "border-primary/40 ring-1 ring-primary/30" : "hover:-translate-y-0.5 hover:shadow-lg",
                  )}
                >
                  <CardHeader className="space-y-4 border-b border-border/70 bg-muted/20 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-3xl font-semibold leading-tight tracking-tight">
                          {item.name}
                        </CardTitle>
                        <p className="mt-2 text-sm text-muted-foreground">{item.tagline}</p>
                      </div>
                      {item.highlight ? (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                          Popular
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-end gap-2">
                      <p className="text-4xl font-bold tracking-tight text-foreground">{currency.format(item.price)}</p>
                      <span className="pb-1 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                        / day
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 p-5">
                    <ul className="space-y-2">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2 text-sm text-foreground/90">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="h-11 w-full rounded-lg text-sm font-semibold uppercase tracking-[0.08em]"
                      variant={active ? "outline" : "default"}
                      onClick={() => handlePackagePick(item.id)}
                    >
                      {active ? "Viewing menu" : "View Menu & Customize"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {isCustomizerOpen ? (
            <section ref={customizerRef} id="customizer" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="space-y-6">
                <Card className="overflow-hidden border-border/70 bg-card/95 shadow-sm">
                  <CardHeader className="space-y-4 border-b border-border/70 bg-muted/20 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <CardTitle className="text-3xl font-semibold leading-tight tracking-tight">
                          {activePackage.name}
                        </CardTitle>
                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{activePackage.tagline}</p>
                      </div>
                      <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Package price
                        </p>
                        <div className="mt-1 flex items-end gap-2">
                          <p className="text-3xl font-bold tracking-tight text-foreground">
                            {currency.format(activePackage.price)}
                          </p>
                          <span className="pb-1 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                            / day
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Select one or multiple variants with your own quantity for each day.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
                      {activePackage.days.map((day) => (
                        <DayChip
                          key={day.day}
                          day={day.day}
                          active={activeSelection.activeDay === day.day}
                          onClick={() => handleDayChange(day.day)}
                        />
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={handleApplyToAllWeeks}>
                        Apply to all weeks
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleResetToDefault}>
                        Reset to default
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 p-5">
                    {activeDayMenu ? (
                      <div className="rounded-3xl border border-border/70 bg-background/70 p-5 shadow-sm">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              {activeDayMenu.day}
                            </p>
                            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                              {activeDayMenu.title}
                            </h3>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                              {activeDayMenu.intro}
                            </p>
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Same price variants
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                          {activeDayVariants.map((variant) => {
                            const qtyKey = createVariantQuantityKey(activeDayMenu.day, variant.id);
                            const qty = activeSelection.quantities[qtyKey] ?? 0;

                            return (
                              <VariantCard
                                key={variant.id}
                                variant={variant}
                                quantity={qty}
                                onQuantityChange={(next) => {
                                  setPackageSelections((previous) => ({
                                    ...previous,
                                    [activePackage.id]: {
                                      ...activeSelection,
                                      quantities: {
                                        ...activeSelection.quantities,
                                        [qtyKey]: next,
                                      },
                                    },
                                  }));
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </div>

              <aside className="h-fit space-y-4 lg:sticky lg:top-8">
                <Card className="border-border/70 bg-card/95 shadow-sm">
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                      <ChefHat className="h-5 w-5 text-primary" />
                      Sticky Summary
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Current package, day, and checkout stay visible here.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 p-5 pt-0">
                    <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Selected package
                      </p>
                      <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">{activePackage.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {activeDayMenu ? `${activeDayMenu.day} · ${activeDayMenu.title}` : "Pick a day to customize"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Meal preview
                      </p>
                      {previewItems.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No variants selected yet.</p>
                      ) : null}
                      {previewItems.map((item, index) => (
                        <MealRow key={`${item.label}-${index}`} item={item} />
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Order summary
                      </p>
                      {orderRows.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No variants selected yet.</p>
                      ) : (
                        orderRows.map((row) => (
                          <div key={row.key} className="rounded-xl border border-border/70 bg-background/70 p-3">
                            <p className="text-sm font-semibold text-foreground">
                              {row.day} · {row.label}
                            </p>
                            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                              <span>
                                {currency.format(activePackage.price)} x {row.qty}
                              </span>
                              <span className="font-semibold text-foreground">{currency.format(row.subtotal)}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-muted/25 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground">Total</p>
                        <p className="text-2xl font-bold tracking-tight text-primary">{currency.format(total)}</p>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Total is based on selected variants and quantities.
                      </p>
                    </div>

                    <Button className="h-11 w-full rounded-lg text-sm font-semibold uppercase tracking-[0.08em]">
                      Checkout
                    </Button>
                  </CardContent>
                </Card>
              </aside>
            </section>
          ) : null}
        </section>
      </main>
    </div>
  );
}
