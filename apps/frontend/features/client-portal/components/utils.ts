import type { DayName } from "../data";

export function getUpcomingDays(): { day: DayName; dateLabel: string; isToday: boolean }[] {
  const daysByJsIndex: DayName[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      day: daysByJsIndex[d.getDay()],
      dateLabel: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      isToday: i === 0,
    };
  });
}
