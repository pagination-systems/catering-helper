import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DayTab({
  dayLabel,
  dateLabel,
  active,
  mealCount,
  isToday,
  onClick,
}: {
  dayLabel: string;
  dateLabel: string;
  active: boolean;
  mealCount?: number;
  isToday?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative inline-flex w-full">
      <Button
        type="button"
        variant="ghost"
        onClick={onClick}
        className={cn(
          "w-full rounded-xl border px-3 py-2.5 text-left transition-all duration-200 flex flex-col items-start h-auto",
          active
            ? "border-primary bg-primary text-primary-foreground shadow-md hover:bg-primary hover:text-primary-foreground"
            : "border-border/60 bg-background hover:border-primary/30 hover:bg-muted/50",
        )}
      >
        <p
          className={cn(
            "text-[9px] font-semibold uppercase tracking-widest leading-none",
            active ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {dateLabel}
        </p>
        <p className={cn("mt-1 text-sm font-semibold leading-none", active ? "text-primary-foreground" : "")}>
          {dayLabel}
        </p>
        {isToday && !active && (
          <p className="mt-0.5 text-[9px] font-semibold text-primary leading-none">Today</p>
        )}
      </Button>

      {(mealCount ?? 0) > 0 && (
        <span className="absolute -top-1.5 -right-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground ring-1 ring-background">
          {mealCount}
        </span>
      )}
    </div>
  );
}
