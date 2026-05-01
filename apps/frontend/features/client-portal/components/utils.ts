import type { Language } from "@/lib/i18n";
import type { DayName } from "../data";

export function getUpcomingDays(language: Language): { day: DayName; dateLabel: string; isToday: boolean }[] {
  const daysByJsIndex: DayName[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const locale = language === "bn" ? "bn-BD" : "en-GB";

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      day: daysByJsIndex[d.getDay()],
      dateLabel: d.toLocaleDateString(locale, { day: "numeric", month: "short" }),
      isToday: i === 0,
    };
  });
}
