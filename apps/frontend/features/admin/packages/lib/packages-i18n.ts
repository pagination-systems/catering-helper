import { useLanguage } from "@/providers/language-provider";

type PackagesContent = {
  title: string;
  description: string;
  dayLabels: {
    Sat: string;
    Sun: string;
    Mon: string;
    Tue: string;
    Wed: string;
    Thu: string;
    Fri: string;
  };
  toolbar: {
    searchPlaceholder: string;
    filter: string;
    status: string;
    resetFilters: string;
    createPackage: string;
  };
  table: {
    package: string;
    pricePerMeal: string;
    variantsPerWeek: string;
    status: string;
    lastUpdated: string;
    actions: string;
    idLabel: string;
    noPackages: string;
  };
  details: {
    title: string;
    package: string;
    packageId: string;
    viewDescription: string;
    created: string;
    lastUpdated: string;
    pricePerMeal: string;
    daysCovered: string;
    weeklyVariants: string;
    foodItems: string;
    weeklyMenuPlan: string;
    variantsInTotal: string;
    variants: string;
    available: string;
    unavailable: string;
    noDescription: string;
    noNote: string;
    noPackage: string;
  };
  form: {
    createTitle: string;
    createDescription: string;
    editTitle: string;
    editDescription: string;
    overviewTitle: string;
    overviewDescription: string;
    packageNameLabel: string;
    packageNamePlaceholder: string;
    priceLabel: string;
    statusLabel: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    menuPlanTitle: string;
    menuPlanDescription: string;
    variantLabel: string;
    variantsLabel: string;
    variantPrefix: string;
    removeVariant: string;
    variantNameLabel: string;
    variantNamePlaceholder: string;
    variantNoteLabel: string;
    variantNotePlaceholder: string;
    availableLabel: string;
    availableDescription: string;
    foodItemsLabel: string;
    addItem: string;
    itemPlaceholder: string;
    addVariant: string;
    submitCreate: string;
    submitSave: string;
    validation: {
      packageNameMin: string;
      packageNameMax: string;
      descriptionMin: string;
      descriptionMax: string;
      priceMin: string;
      priceMax: string;
      variantNameMin: string;
      variantNameMax: string;
      foodItemRequired: string;
      foodItemTooLong: string;
      addAtLeastOneFoodItem: string;
      eachDayNeedsAtLeastOneVariant: string;
      exactlySevenDayPlans: string;
      eachDayOnce: string;
    };
  };
  delete: {
    title: string;
    confirmMessage: string;
    confirmMessageGeneric: string;
    confirmText: string;
    confirmKeyword: string;
    cancel: string;
    confirm: string;
  };
  actions: {
    view: string;
    edit: string;
    delete: string;
    openActionsFor: string;
  };
};

const content: Record<string, PackagesContent> = {
  en: {
    title: "Packages",
    description: "Manage package pricing, day plans, variants, and food items.",
    dayLabels: {
      Sat: "Saturday",
      Sun: "Sunday",
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
    },
    toolbar: {
      searchPlaceholder: "Search by package name, id, or description",
      filter: "Filter",
      status: "Status",
      resetFilters: "Reset Filters",
      createPackage: "Create Package",
    },
    table: {
      package: "Package",
      pricePerMeal: "Price / Meal",
      variantsPerWeek: "Variants / Week",
      status: "Status",
      lastUpdated: "Last Updated",
      actions: "Actions",
      idLabel: "ID:",
      noPackages: "No packages found for your current query and filters.",
    },
    details: {
      title: "Package Details",
      package: "Package",
      packageId: "Package ID",
      viewDescription: "Review the selected package, its day plans, and all configured variants.",
      created: "Created",
      lastUpdated: "Last Updated",
      pricePerMeal: "Price / Meal",
      daysCovered: "Days Covered",
      weeklyVariants: "Weekly Variants",
      foodItems: "Food Items",
      weeklyMenuPlan: "Weekly Menu Plan",
      variantsInTotal: "variants in total",
      variants: "variants",
      available: "Available",
      unavailable: "Unavailable",
      noDescription: "No description",
      noNote: "No note",
      noPackage: "No package found.",
    },
    form: {
      createTitle: "Create Package",
      createDescription: "Create a package and configure variants for each day of the week.",
      editTitle: "Edit Package",
      editDescription: "Update package details, day plans, variants, and food items.",
      overviewTitle: "Package Overview",
      overviewDescription: "Define the core pricing and positioning of this package.",
      packageNameLabel: "Package Name",
      packageNamePlaceholder: "Daily Basic Package",
      priceLabel: "Price / Meal (BDT)",
      statusLabel: "Status",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Affordable weekday office meals with familiar favorites.",
      menuPlanTitle: "7-Day Menu Plan",
      menuPlanDescription: "Configure one or more variants per day and edit food items quickly.",
      variantLabel: "variant",
      variantsLabel: "variants",
      variantPrefix: "Variant",
      removeVariant: "Remove variant",
      variantNameLabel: "Variant Name",
      variantNamePlaceholder: "Chicken Bhuna Set",
      variantNoteLabel: "Variant Note",
      variantNotePlaceholder: "Mild spice, office favorite",
      availableLabel: "Available",
      availableDescription: "Toggle this variant on or off for client orders.",
      foodItemsLabel: "Food Items",
      addItem: "Add Item",
      itemPlaceholder: "Rice",
      addVariant: "Add Variant",
      submitCreate: "Create Package",
      submitSave: "Save Changes",
      validation: {
        packageNameMin: "Package name must be at least 2 characters.",
        packageNameMax: "Package name must be 100 characters or less.",
        descriptionMin: "Description must be at least 8 characters.",
        descriptionMax: "Description must be 300 characters or less.",
        priceMin: "Price must be at least 1 BDT.",
        priceMax: "Price must be 100000 BDT or less.",
        variantNameMin: "Variant name must be at least 2 characters.",
        variantNameMax: "Variant name must be 80 characters or less.",
        foodItemRequired: "Food item is required.",
        foodItemTooLong: "Food item is too long.",
        addAtLeastOneFoodItem: "Add at least one food item.",
        eachDayNeedsAtLeastOneVariant: "Each day needs at least one variant.",
        exactlySevenDayPlans: "A package must have exactly 7 day plans.",
        eachDayOnce: "Each day from Sat to Fri must be configured exactly once.",
      },
    },
    delete: {
      title: "Delete package?",
      confirmMessage: "Are you sure you want to delete {{name}}? This action cannot be undone.",
      confirmMessageGeneric: "Are you sure you want to delete this package? This action cannot be undone.",
      confirmText: "Type delete-package to confirm.",
      confirmKeyword: "delete-package",
      cancel: "Cancel",
      confirm: "Delete",
    },
    actions: {
      view: "View",
      edit: "Edit",
      delete: "Delete",
      openActionsFor: "Open actions for {{name}}",
    },
  },
  bn: {
    title: "প্যাকেজসমূহ",
    description: "প্যাকেজের মূল্য, দিনের পরিকল্পনা, ভ্যারিয়েন্ট এবং খাবারের আইটেম পরিচালনা করুন।",
    dayLabels: {
      Sat: "শনিবার",
      Sun: "রবিবার",
      Mon: "সোমবার",
      Tue: "মঙ্গলবার",
      Wed: "বুধবার",
      Thu: "বৃহস্পতিবার",
      Fri: "শুক্রবার",
    },
    toolbar: {
      searchPlaceholder: "প্যাকেজের নাম, আইডি বা বিবরণ দ্বারা অনুসন্ধান করুন",
      filter: "ফিল্টার",
      status: "স্ট্যাটাস",
      resetFilters: "ফিল্টার রিসেট করুন",
      createPackage: "প্যাকেজ তৈরি করুন",
    },
    table: {
      package: "প্যাকেজ",
      pricePerMeal: "প্রতি মিল মূল্য",
      variantsPerWeek: "সাপ্তাহিক ভ্যারিয়েন্ট",
      status: "স্ট্যাটাস",
      lastUpdated: "শেষ আপডেট",
      actions: "ক্রিয়া",
      idLabel: "আইডি:",
      noPackages: "আপনার বর্তমান অনুসন্ধান এবং ফিল্টারের জন্য কোনো প্যাকেজ পাওয়া যায়নি।",
    },
    details: {
      title: "প্যাকেজ বিবরণ",
      package: "প্যাকেজ",
      packageId: "প্যাকেজ আইডি",
      viewDescription: "নির্বাচিত প্যাকেজ, এর দিনের পরিকল্পনা এবং কনফিগার করা সব ভ্যারিয়েন্ট পর্যালোচনা করুন।",
      created: "তৈরি",
      lastUpdated: "শেষ আপডেট",
      pricePerMeal: "প্রতি মিল মূল্য",
      daysCovered: "আচ্ছাদিত দিন",
      weeklyVariants: "সাপ্তাহিক ভ্যারিয়েন্ট",
      foodItems: "খাবারের আইটেম",
      weeklyMenuPlan: "সাপ্তাহিক মেনু পরিকল্পনা",
      variantsInTotal: "মোট ভ্যারিয়েন্ট",
      variants: "ভ্যারিয়েন্ট",
      available: "উপলব্ধ",
      unavailable: "অনুপলব্ধ",
      noDescription: "কোনো বিবরণ নেই",
      noNote: "কোনো নোট নেই",
      noPackage: "কোনো প্যাকেজ পাওয়া যায়নি।",
    },
    form: {
      createTitle: "প্যাকেজ তৈরি করুন",
      createDescription: "একটি প্যাকেজ তৈরি করুন এবং সপ্তাহের প্রতিটি দিনের জন্য ভ্যারিয়েন্ট কনফিগার করুন।",
      editTitle: "প্যাকেজ সম্পাদনা করুন",
      editDescription: "প্যাকেজের বিবরণ, দিনের পরিকল্পনা, ভ্যারিয়েন্ট এবং খাবারের আইটেম আপডেট করুন।",
      overviewTitle: "প্যাকেজ ওভারভিউ",
      overviewDescription: "এই প্যাকেজের মূল মূল্য এবং অবস্থান নির্ধারণ করুন।",
      packageNameLabel: "প্যাকেজের নাম",
      packageNamePlaceholder: "ডেইলি বেসিক প্যাকেজ",
      priceLabel: "প্রতি মিল মূল্য (BDT)",
      statusLabel: "স্ট্যাটাস",
      descriptionLabel: "বিবরণ",
      descriptionPlaceholder: "সাশ্রয়ী সপ্তাহের দিনের অফিস মিল, সহজ ও পরিচিত খাবার।",
      menuPlanTitle: "৭ দিনের মেনু পরিকল্পনা",
      menuPlanDescription: "প্রতিদিনের জন্য এক বা একাধিক ভ্যারিয়েন্ট কনফিগার করুন এবং দ্রুত খাবারের আইটেম সম্পাদনা করুন।",
      variantLabel: "ভ্যারিয়েন্ট",
      variantsLabel: "ভ্যারিয়েন্ট",
      variantPrefix: "ভ্যারিয়েন্ট",
      removeVariant: "ভ্যারিয়েন্ট মুছুন",
      variantNameLabel: "ভ্যারিয়েন্টের নাম",
      variantNamePlaceholder: "চিকেন ভুনা সেট",
      variantNoteLabel: "ভ্যারিয়েন্ট নোট",
      variantNotePlaceholder: "হালকা মসলাযুক্ত, অফিসের পছন্দ",
      availableLabel: "উপলব্ধ",
      availableDescription: "ক্লায়েন্ট অর্ডারের জন্য এই ভ্যারিয়েন্ট চালু বা বন্ধ করুন।",
      foodItemsLabel: "খাবারের আইটেম",
      addItem: "আইটেম যোগ করুন",
      itemPlaceholder: "ভাত",
      addVariant: "ভ্যারিয়েন্ট যোগ করুন",
      submitCreate: "প্যাকেজ তৈরি করুন",
      submitSave: "পরিবর্তন সংরক্ষণ করুন",
      validation: {
        packageNameMin: "প্যাকেজের নাম কমপক্ষে ২ অক্ষরের হতে হবে।",
        packageNameMax: "প্যাকেজের নাম ১০০ অক্ষর বা কম হতে হবে।",
        descriptionMin: "বিবরণ কমপক্ষে ৮ অক্ষরের হতে হবে।",
        descriptionMax: "বিবরণ ৩০০ অক্ষর বা কম হতে হবে।",
        priceMin: "মূল্য কমপক্ষে ১ BDT হতে হবে।",
        priceMax: "মূল্য ১০০০০০ BDT বা কম হতে হবে।",
        variantNameMin: "ভ্যারিয়েন্টের নাম কমপক্ষে ২ অক্ষরের হতে হবে।",
        variantNameMax: "ভ্যারিয়েন্টের নাম ৮০ অক্ষর বা কম হতে হবে।",
        foodItemRequired: "খাবারের আইটেম প্রয়োজন।",
        foodItemTooLong: "খাবারের আইটেমটি খুব দীর্ঘ।",
        addAtLeastOneFoodItem: "কমপক্ষে একটি খাবারের আইটেম যোগ করুন।",
        eachDayNeedsAtLeastOneVariant: "প্রতিদিনের জন্য কমপক্ষে একটি ভ্যারিয়েন্ট প্রয়োজন।",
        exactlySevenDayPlans: "একটি প্যাকেজে অবশ্যই ৭টি দিনের পরিকল্পনা থাকতে হবে।",
        eachDayOnce: "শনিবার থেকে শুক্রবার পর্যন্ত প্রতিটি দিন একবার করে কনফিগার করতে হবে।",
      },
    },
    delete: {
      title: "প্যাকেজ মুছবেন?",
      confirmMessage: "আপনি কি {{name}} মুছতে চান? এই পদক্ষেপটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmMessageGeneric: "আপনি কি এই প্যাকেজ মুছতে চান? এই পদক্ষেপটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmText: "নিশ্চিত করতে delete-package টাইপ করুন।",
      confirmKeyword: "delete-package",
      cancel: "বাতিল",
      confirm: "মুছুন",
    },
    actions: {
      view: "দেখুন",
      edit: "সম্পাদনা করুন",
      delete: "মুছুন",
      openActionsFor: "{{name}} এর জন্য ক্রিয়া খুলুন",
    },
  },
};

export const usePackagesI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getPackagesContent = (lang: string) => {
  return content[lang] ?? content.en;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
