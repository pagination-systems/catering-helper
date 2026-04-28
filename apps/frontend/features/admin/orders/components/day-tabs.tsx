import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DayName } from "../schemas/order.schema";
import type { DaySlot } from "../store/useStore";

type DayTabsProps = {
  upcomingDays: DaySlot[];
  activeDay: DayName | "all";
  onChange: (day: DayName | "all") => void;
  counts: Partial<Record<DayName, number>>;
};

export const DayTabs = ({ upcomingDays, activeDay, onChange, counts }: DayTabsProps) => {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex min-w-full gap-2">
        <Button
          type="button"
          variant={activeDay === "all" ? "default" : "outline"}
          className="h-auto rounded-full px-4 py-2"
          onClick={() => onChange("all")}
        >
          All
        </Button>

        {upcomingDays.map((day) => (
          <Button
            key={`${day.day}-${day.dateLabel}`}
            type="button"
            variant={activeDay === day.day ? "default" : "outline"}
            className="h-auto rounded-full px-4 py-2"
            onClick={() => onChange(day.day)}
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span>{day.isToday ? "Today" : day.day}</span>
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
