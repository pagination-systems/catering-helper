import { getAdminContent } from "@/lib/admin-i18n";
import { useLanguage } from "@/providers/language-provider";

export const usePackagesI18n = () => {
  const { language } = useLanguage();
  const content = getAdminContent(language);
  return content.packages;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
