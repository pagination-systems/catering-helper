import { getAdminContent } from "@/lib/admin-i18n";
import { useLanguage } from "@/providers/language-provider";

export const useCustomersI18n = () => {
  const { language } = useLanguage();
  const content = getAdminContent(language);
  return content.customers;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
