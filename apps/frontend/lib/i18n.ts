export const languageStorageKey = "catering:language";

export const siteNames = {
  en: "Catering Helper",
  bn: "ক্যাটারিং হেল্পার",
} as const;

export type Language = keyof typeof siteNames;

export const defaultLanguage: Language = "en";

export const siteName = siteNames[defaultLanguage];
