import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOrdersI18n } from "../lib/orders-i18n";
import type { DayName } from "../schemas/order.schema";

export function DayTab({
  day,
  dateLabel,
  isToday,
  active,
  onClick,
}: {
  day: DayName;
  dateLabel: string;
  isToday: boolean;
  active: boolean;
  onClick: () => void;
}) {
  const i18n = useOrdersI18n();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "group min-w-[74px] flex-none rounded-2xl border px-2.5 py-2 text-left transition-all duration-200 sm:px-3",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-md ring-1 ring-primary hover:bg-primary hover:text-primary-foreground"
          : "border-border/70 bg-background/70 hover:border-primary/40 hover:bg-muted",
      )}
    >
      <p
        className={cn(
          "text-[8px] font-semibold uppercase tracking-[0.12em] sm:text-[10px]",
          active ? "text-primary-foreground/90" : "text-muted-foreground",
        )}
      >
        {dateLabel}
      </p>
      <p className={cn("mt-0.5 text-xs font-semibold sm:text-sm", active ? "text-primary-foreground" : "")}>
        {isToday ? i18n.dayTabs.today : i18n.dayLabels[day]}
      </p>
    </Button>
  );
}
