import { UtensilsCrossed } from "lucide-react";

export function MealItemPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-xs text-foreground/90">
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[hsl(var(--cater-primary-strong))]">
        <UtensilsCrossed className="h-3 w-3" />
      </span>
      <span>{label}</span>
    </div>
  );
}
