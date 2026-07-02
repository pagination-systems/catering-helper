import { CheckCircle2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import type { MenuVariant } from "../data";
import { MealItemPill } from "./meal-item-pill";

export function VariantCard({
  variant,
  quantity,
  price,
  mealSuffix,
  unavailableLabel,
  pulse,
  onQuantityChange,
}: {
  variant: MenuVariant;
  quantity: number;
  price: number;
  mealSuffix: string;
  unavailableLabel: string;
  pulse: boolean;
  onQuantityChange: (next: number) => void;
}) {
  const active = quantity > 0;
  const available = variant.available ?? true;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border transition-all duration-200 flex gap-3 p-3 sm:p-4",
        available
          ? "bg-card hover:-translate-y-0.5 hover:shadow-md"
          : "cursor-not-allowed bg-muted/25 opacity-70 grayscale",
        active ? "border-l-4 border-primary bg-primary/[0.03]" : "border-border/70",
        pulse && "animate-pulse",
      )}
    >
      {/* Content column */}
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex items-start gap-1.5">
          <h4 className="flex-1 text-base font-bold tracking-tight text-foreground truncate">{variant.name}</h4>
          {active && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />}
        </div>

        <p className="mt-0.5 text-xs font-medium text-muted-foreground">
          <strong>{formatCurrency(price)}</strong> {mealSuffix}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {variant.items.map((item) => (
            <MealItemPill key={item} label={item} />
          ))}
        </div>

        {/* Stepper — pushed to bottom of content column */}
        <div className="mt-auto pt-3">
          {available &&
            (quantity === 0 ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 gap-1 rounded-full text-xs font-semibold"
                onClick={() => onQuantityChange(1)}
              >
                <Plus className="h-3 w-3" />
                Add
              </Button>
            ) : (
              <div className="inline-flex h-7 items-center gap-1 rounded-full bg-foreground px-1 shadow-sm">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onQuantityChange(quantity - 1)}
                  className="h-5 w-5 rounded-full bg-background text-foreground hover:bg-muted"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="min-w-[20px] text-center text-xs font-bold text-background">{quantity}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onQuantityChange(quantity + 1)}
                  className="h-5 w-5 rounded-full bg-background text-foreground hover:bg-muted"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            ))}
        </div>
      </div>

      {/* Image */}
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"
          alt={variant.name}
          className="h-full w-full object-cover"
          width={112}
          height={112}
        />
        {!available && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/55">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white">{unavailableLabel}</span>
          </div>
        )}
      </div>
    </article>
  );
}
