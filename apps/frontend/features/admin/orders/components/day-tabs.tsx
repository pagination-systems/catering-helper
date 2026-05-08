import { If } from "@/components/if";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOrdersI18n } from "../lib/orders-i18n";
import type { DayName } from "../schemas/order.schema";
import type { DaySlot } from "../store/useStore";

type DayTabsProps = {
  upcomingDays: DaySlot[];
  activeDay: DayName | "all";
  onChange: (daySlot: DaySlot | "all") => void;
  counts: Partial<Record<DayName, number>>;
};

export const DayTabs = ({ upcomingDays, activeDay, onChange, counts }: DayTabsProps) => {
  const i18n = useOrdersI18n();

  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex min-w-full gap-2">
        <Button
          type="button"
          variant={activeDay === "all" ? "default" : "outline"}
          className="h-auto rounded-full px-4 py-2"
          onClick={() => onChange("all")}
        >
          {i18n.dayTabs.all}
        </Button>

        {upcomingDays.map((day) => (
          <Button
            key={`${day.day}-${day.dateLabel}`}
            type="button"
            variant={activeDay === day.day ? "default" : "outline"}
            className="h-auto rounded-full px-4 py-2"
            onClick={() => onChange(day)}
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              <If expression={day.isToday} fallback={<span>{i18n.dayLabels[day.day]}</span>}>
                <span>{i18n.dayTabs.today}</span>
              </If>
              <span className="text-xs opacity-80">{day.dateLabel}</span>
              <Badge
                variant="secondary"
                className="grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] leading-none tabular-nums"
              >
                {counts[day.day] ?? 0}
              </Badge>
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
