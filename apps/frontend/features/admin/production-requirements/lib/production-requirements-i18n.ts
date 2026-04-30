import { useLanguage } from "@/providers/language-provider";

type ProductionRequirementsContent = {
  title: string;
  description: string;
  toolbar: {
    download: string;
    downloadPreparing: string;
  };
  summary: {
    title: string;
    totalMealsLabel: string;
  };
  empty: {
    noOrdersTitle: string;
    noOrdersDescription: string;
  };
  packageCard: {
    variantsSingular: string;
    variantsPlural: string;
    totalMealsLabel: string;
  };
  table: {
    variant: string;
    foodItems: string;
    meals: string;
  };
  pdf: {
    title: string;
    subtitle: string;
    dateLabel: string;
    dayLabel: string;
    packages: string;
    variants: string;
    totalMeals: string;
    mealsLabel: string;
    generated: string;
  };
};

const content: Record<string, ProductionRequirementsContent> = {
  en: {
    title: "Production Requirements",
    description: "Today's meal requirements by package and variant",
    toolbar: {
      download: "Download PDF",
      downloadPreparing: "Preparing...",
    },
    summary: {
      title: "Daily Summary",
      totalMealsLabel: "Total Meals",
    },
    empty: {
      noOrdersTitle: "No orders for today",
      noOrdersDescription:
        "No confirmed orders found for today. Production requirements will appear here once orders are placed.",
    },
    packageCard: {
      variantsSingular: "variant",
      variantsPlural: "variants",
      totalMealsLabel: "Total Meals",
    },
    table: {
      variant: "Variant",
      foodItems: "Food Items",
      meals: "Meals",
    },
    pdf: {
      title: "Production Requirements",
      subtitle: "Clean production summary by package and variant",
      dateLabel: "Date",
      dayLabel: "Day",
      packages: "Packages",
      variants: "Variants",
      totalMeals: "Total Meals",
      mealsLabel: "Meals",
      generated: "Generated",
    },
  },
  bn: {
    title: "প্রোডাকশন রিকোয়ারমেন্ট",
    description: "প্যাকেজ ও ভ্যারিয়েন্ট অনুযায়ী আজকের মিল রিকোয়ারমেন্ট",
    toolbar: {
      download: "PDF ডাউনলোড",
      downloadPreparing: "প্রস্তুত করছে...",
    },
    summary: {
      title: "দৈনিক সারসংক্ষেপ",
      totalMealsLabel: "মোট মিল",
    },
    empty: {
      noOrdersTitle: "আজ কোনো অর্ডার নেই",
      noOrdersDescription: "আজকের কোনো কনফার্মড অর্ডার পাওয়া যায়নি। অর্ডার এলে প্রোডাকশন রিকোয়ারমেন্ট এখানে দেখাবে।",
    },
    packageCard: {
      variantsSingular: "ভ্যারিয়েন্ট",
      variantsPlural: "ভ্যারিয়েন্টসমূহ",
      totalMealsLabel: "মোট মিল",
    },
    table: {
      variant: "ভ্যারিয়েন্ট",
      foodItems: "খাবারের আইটেম",
      meals: "মিল",
    },
    pdf: {
      title: "প্রোডাকশন রিকোয়ারমেন্ট",
      subtitle: "প্যাকেজ ও ভ্যারিয়েন্ট অনুযায়ী পরিষ্কার প্রোডাকশন সারসংক্ষেপ",
      dateLabel: "তারিখ",
      dayLabel: "দিন",
      packages: "প্যাকেজসমূহ",
      variants: "ভ্যারিয়েন্ট",
      totalMeals: "মোট মিল",
      mealsLabel: "মিল",
      generated: "উত্পন্ন করা হয়েছে",
    },
  },
};

export const useProductionRequirementsI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getProductionRequirementsContent = (lang: string) => {
  return content[lang] ?? content.en;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
