import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DayTab({
  dayLabel,
  dateLabel,
  active,
  onClick,
}: {
  dayLabel: string;
  dateLabel: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "group min-w-[74px] flex-1 sm:flex-none rounded-2xl border px-2.5 sm:px-3 py-2 text-left transition-all duration-200",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-md ring-1 ring-primary hover:bg-primary hover:text-primary-foreground"
          : "border-border/70 bg-background/70 hover:border-primary/40 hover:bg-muted",
      )}
    >
      <p
        className={cn(
          "text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.12em]",
          active ? "text-primary-foreground/90" : "text-muted-foreground",
        )}
      >
        {dateLabel}
      </p>
      <p
        className={cn(
          "mt-0.5 text-xs sm:text-sm font-semibold",
          active ? "text-primary-foreground" : "",
        )}
      >
        {dayLabel}
      </p>
    </Button>
  );
}
