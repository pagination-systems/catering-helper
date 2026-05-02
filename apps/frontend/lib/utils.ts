import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale: string = "en-BD", currency: string = "BDT") {
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatDecimal(amount: number, locale: string = "en-BD") {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(
  date: Date | string,
  locale: string = "en-BD",
  options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" },
) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

export function formatTime(
  date: Date | string,
  locale: string = "en-BD",
  options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" },
) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

export function formatDateTime(
  date: Date | string,
  locale: string = "en-BD",
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  },
) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

export function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
