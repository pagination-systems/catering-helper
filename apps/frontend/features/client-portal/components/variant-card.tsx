import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MenuVariant } from "../data";
import { MealItemPill } from "./meal-item-pill";
import { If } from "@/components/if";
import { Button } from "@/components/ui/button";

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
          ? "hover:-translate-y-0.5 hover:shadow-md bg-card"
          : "cursor-not-allowed border-dashed bg-muted/25 opacity-70 grayscale",
        active ? "border-primary/40 ring-1 ring-primary/40" : "border-border/70",
        pulse && "animate-pulse",
      )}
    >
      <div className="flex flex-1 flex-col min-w-0">
        <h4 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
          {variant.name}
        </h4>
        <p className="mt-0.5 text-sm font-medium text-muted-foreground">
          <b>BDT {price}</b> {mealSuffix}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {variant.items.map((item, idx) => (
            <MealItemPill key={idx} label={item} />
          ))}
        </div>

        <If expression={!available}>
          <span className="inline-flex mt-2 items-center gap-1 rounded-full bg-red-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-red-700 w-fit">
            {unavailableLabel}
          </span>
        </If>
      </div>

      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"
          alt={variant.name}
          className="h-full w-full object-cover"
        />
        <If expression={available}>
          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2">
            <If
              expression={quantity === 0}
              fallback={
                <div className="flex h-7 sm:h-8 items-center gap-1 sm:gap-2 rounded-full px-1 bg-zinc-900 shadow-md shadow-black/10">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onQuantityChange(quantity - 1)}
                    className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white text-black hover:bg-zinc-100 transition"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>

                  <span className="min-w-[12px] sm:min-w-[16px] text-center text-xs sm:text-sm font-semibold text-white">
                    {quantity}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white text-black hover:bg-zinc-100 transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              }
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onQuantityChange(1)}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white text-black shadow-md shadow-black/10 transition hover:bg-zinc-100"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </If>
          </div>
        </If>
      </div>
    </article>
  );
}
