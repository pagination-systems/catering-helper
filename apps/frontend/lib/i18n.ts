export const languageStorageKey = "catering:language";

export const siteNames = {
  en: "Catering Helper",
  bn: "ক্যাটারিং হেল্পার",
} as const;

export type Language = keyof typeof siteNames;

export const defaultLanguage: Language = "en";

export const siteName = siteNames[defaultLanguage];

export const landingContent = {
  en: {
    nav: {
      solution: "Solution",
      howItWorks: "How It Works",
      pricing: "Pricing",
      login: "Login",
      startFreeTrial: "Start Free Trial",
      language: "Language",
      theme: "Theme",
      menu: "Menu",
      modes: {
        system: "System",
        light: "Light",
        dark: "Dark",
      },
    },
    hero: {
      headline: "Automate Your Catering Business. Eliminate the WhatsApp Chaos.",
      subheadline:
        "Transform manual orders and scattered messages into a beautifully orchestrated, high-end digital experience for both you and your clients.",
      primaryCta: "Start Your 1-Month Free Trial",
      secondaryCta: "View Demo",
      mobileTitle: "Client Mobile Portal",
      mobileMealTitle: "Admin Dashboard",
      mobileMealDescription: "Generated Bazar List",
      mobileOrderLabel: "Premium Rice (Miniket)",
      mobileOrderBy: "Order before 10:00 AM",
      dashboardTitle: "Client Portal",
      bazarTitle: "Daily kitchen control",
      bazarItems: ["35 Kg", "25 Kg", "8 Liters", "150 portions"],
      orderSummary: "Export to PDF",
    },
    problemSolution: {
      title: "From WhatsApp Confusion to Operational Clarity",
      oldWayTitle: "The Old Way",
      oldWayPoints: [
        "Endless scrolling through messy WhatsApp groups to find order changes.",
        "Manual data entry at midnight to calculate tomorrow's ingredient needs.",
        "Lost revenue due to missed messages or misunderstood quantity requests.",
      ],
      newWayTitle: "The Catering Helper Way",
      newWayPoints: [
        "Clients select from a branded, polished digital portal.",
        "Aggregated Bazar list generates automatically in seconds.",
        "Perfect accuracy, leading to exact portions and higher profit margins.",
      ],
    },
    features: {
      title: "Architectural Control Over Every Meal.",
      items: [
        {
          title: "Dedicated Client Portal",
          description:
            "Provide your corporate and event clients with a seamless, white-labeled interface to view menus, adjust headcount, and confirm orders without a single phone call.",
        },
        {
          title: "Automated 'Bazar' Estimation",
          description:
            "Our algorithm reads tomorrow's orders and instantly outputs precise ingredient quantities required for the market run.",
        },
        {
          title: "Financial & Profit Tracking",
          description:
            "Monitor daily expenses against revenue totals and your actual profit per meal, per client, effortlessly.",
        },
      ],
    },
    howItWorks: {
      title: "The Workflow.",
      steps: [
        {
          title: "Set the Menu",
          description:
            "Publish your daily or weekly offerings in the master dashboard. Define recipes and default ratios.",
        },
        {
          title: "Clients Order",
          description: "Clients log into their clean portal, input their numbers, and submit before your cutoff time.",
        },
        {
          title: "Export at 10:01 AM",
          description:
            "The moment the cutoff hits, generate a precise, aggregated Bazar list for your procurement team.",
        },
      ],
    },
    pricing: {
      badge: "1 Month Launch Offer",
      title: "Simple Pricing for Growing Caterers",
      description: "No hidden fees. Full access to all features.",
      price: "BDT 0",
      period: "first month",
      features: ["Unlimited Client Portals", "Automated Bazar Lists", "Profit & Loss Analytics"],
      cta: "Claim Your Free Month",
      subtext: "Cancel anytime. No credit card required upfront.",
    },
    footer: {
      brand: "Catering Helper",
      copyright: "© 2026 Catering Helper. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact Us",
      blog: "Blog",
    },
  },
  bn: {
    nav: {
      solution: "সমাধান",
      howItWorks: "কার্যপ্রণালী",
      pricing: "প্যাকেজ ও মূল্য",
      company: "কোম্পানি",
      login: "লগ-ইন",
      startFreeTrial: "ফ্রি ট্রায়াল শুরু করুন",
      language: "ভাষা",
      theme: "থিম",
      menu: "মেনু",
      modes: {
        system: "সিস্টেম",
        light: "লাইট",
        dark: "ডার্ক",
      },
    },
    hero: {
      headline: "ক্যাটারিং ব্যবসাকে করুন স্বয়ংক্রিয়। হোয়াটসঅ্যাপের বিশৃঙ্খলা থেকে পান মুক্তি।",
      subheadline:
        "ম্যানুয়াল অর্ডার এবং এলোমেলো মেসেজগুলোকে রূপান্তর করুন একটি সুশৃঙ্খল, আধুনিক ও ডিজিটাল অভিজ্ঞতায়; যা আপনার এবং আপনার গ্রাহক—উভয়ের জন্যই সুবিধাজনক।",
      primaryCta: "১ মাসের ফ্রি ট্রায়াল শুরু করুন",
      secondaryCta: "ডেমো দেখুন",
      mobileTitle: "ক্লায়েন্ট মোবাইল পোর্টাল",
      mobileMealTitle: "অ্যাডমিন ড্যাশবোর্ড",
      mobileMealDescription: "স্বয়ংক্রিয় বাজার তালিকা",
      mobileOrderLabel: "প্রিমিয়াম চাল (মিনিকেট)",
      mobileOrderBy: "সকাল ১০:০০ টার আগে অর্ডার করুন",
      dashboardTitle: "ক্লায়েন্ট পোর্টাল",
      bazarTitle: "দৈনিক কিচেন কন্ট্রোল",
      bazarItems: ["৩৫ কেজি", "২৫ কেজি", "৮ লিটার", "১৫০ জনের খাবার"],
      orderSummary: "পিডিএফ আকারে সেভ করুন",
    },
    problemSolution: {
      title: "হোয়াটসঅ্যাপের বিভ্রান্তি থেকে অপারেশনাল স্বচ্ছতায় উত্তরণ",
      oldWayTitle: "সেকেলে বা গতানুগতিক পদ্ধতি",
      oldWayPoints: [
        "অর্ডারের পরিবর্তন খুঁজতে হোয়াটসঅ্যাপ গ্রুপে অবিরাম স্ক্রল করা।",
        "আগামীকালের বাজারের হিসাব মেলাতে মাঝরাতে ম্যানুয়াল ডেটা এন্ট্রি।",
        "মিসড মেসেজ বা পরিমাণের ভুল বোঝাবুঝির কারণে ব্যবসায়িক ক্ষতি।",
      ],
      newWayTitle: "ক্যাটারিং হেল্পার-এর আধুনিক পদ্ধতি",
      newWayPoints: [
        "ক্লায়েন্টরা একটি আধুনিক ও ব্র্যান্ডেড ডিজিটাল পোর্টাল থেকে অর্ডার করতে পারবেন।",
        "মাত্র কয়েক সেকেন্ডে স্বয়ংক্রিয়ভাবে বাজারের চূড়ান্ত তালিকা তৈরি হয়ে যাবে।",
        "নির্ভুল হিসাবের মাধ্যমে সঠিক পরিমাণ খাবার রান্না এবং মুনাফা বৃদ্ধি।",
      ],
    },
    features: {
      title: "প্রতিটি মিলের ওপর আপনার সম্পূর্ণ নিয়ন্ত্রণ",
      items: [
        {
          title: "ডেডিকেটেড ক্লায়েন্ট পোর্টাল",
          description:
            "আপনার কর্পোরেট এবং ইভেন্ট ক্লায়েন্টদের জন্য একটি হোয়াইট-লেবেলড প্ল্যাটফর্ম প্রদান করুন। কোনো ফোন কল ছাড়াই তারা মেনু দেখতে, লোকসংখ্যা আপডেট করতে এবং অর্ডার কনফার্ম করতে পারবেন।",
        },
        {
          title: "স্বয়ংক্রিয় 'বাজার' এস্টিমেশন",
          description:
            "আমাদের অ্যালগরিদম আগামীকালের অর্ডারের হিসাব করে নিমেষেই বাজারের জন্য প্রয়োজনীয় কাঁচামালের নির্ভুল পরিমাণ জানিয়ে দেয়।",
        },
        {
          title: "আর্থিক এবং মুনাফা ট্র্যাকিং",
          description: "মোট আয়ের বিপরীতে দৈনন্দিন খরচ এবং প্রতিটি ক্লায়েন্টের মিল প্রতি আপনার প্রকৃত মুনাফা অনায়াসে ট্র্যাক করুন।",
        },
      ],
    },
    howItWorks: {
      title: "আমাদের কার্যপ্রণালী",
      steps: [
        {
          title: "মেনু নির্ধারণ করুন",
          description: "মাস্টার ড্যাশবোর্ডে আপনার দৈনিক বা সাপ্তাহিক মেনু পাবলিশ করুন। রেসিপি এবং ডিফল্ট রেশিও সেট করে দিন।",
        },
        {
          title: "ক্লায়েন্টের অর্ডার",
          description:
            "ক্লায়েন্টরা তাদের নিজস্ব পোর্টালে লগ-ইন করে লোকসংখ্যা নির্ধারণ করবেন এবং নির্ধারিত সময়ের আগেই অর্ডার সাবমিট করবেন।",
        },
        {
          title: "সকাল ১০:০১-এ এক্সপোর্ট",
          description:
            "নির্ধারিত সময় পার হওয়ার সাথে সাথেই আপনার প্রকিউরমেন্ট টিমের জন্য বাজারের একটি নির্ভুল ও সমন্বিত তালিকা জেনারেট করুন।",
        },
      ],
    },
    pricing: {
      badge: "১ মাসের লঞ্চ অফার",
      title: "বিকাশমান ক্যাটারিং ব্যবসার জন্য সহজ প্রাইসিং",
      description: "কোনো হিডেন চার্জ নেই। সব ফিচারে পাচ্ছেন পূর্ণ এক্সেস।",
      price: "০ টাকা",
      period: "প্রথম মাসের জন্য",
      features: ["আনলিমিটেড ক্লায়েন্ট পোর্টাল", "স্বয়ংক্রিয় বাজার তালিকা", "প্রফিট এবং লস অ্যানালিটিক্স"],
      cta: "আপনার ফ্রি মাসটি বুঝে নিন",
      subtext: "যেকোনো সময় বাতিল করার সুযোগ। শুরুতে কোনো ক্রেডিট কার্ডের প্রয়োজন নেই।",
    },
    footer: {
      brand: "Catering Helper",
      copyright: "© ২০২৬ ক্যাটারিং হেল্পার। সর্বস্বত্ব সংরক্ষিত।",
      privacy: "গোপনীয়তা নীতিমালা",
      terms: "ব্যবহারের শর্তাবলী",
      contact: "যোগাযোগ করুন",
      blog: "ব্লগ",
    },
  },
} as const;

export const clientPortalContent = {
  en: {
    nav: {
      language: "Language",
      theme: "Theme",
      modes: {
        system: "System",
        light: "Light",
        dark: "Dark",
      },
    },
    badge: "Corporate Catering Platform",
    packageLabel: "Choose a Catering Package",
    packageDescription: "Pick one or more packages, customize each menu, and review everything in one summary.",
    mostPopular: "Most popular",
    selectedPackage: "Selected Package",
    viewPackage: "View Package",
    mealSelected: "meal selected",
    mealSuffix: "/ meal",
    customizeTitle: "Customize Day-by-Day",
    perMealSuffix: "per meal.",
    dayLabel: "Day",
    orderSummaryTitle: "Order Summary",
    deliveryFee: "Delivery Fee",
    finalTotal: "Final Total",
    noItemsSelected: "No items selected yet",
    total: "Total",
    meals: "meals",
    checkout: "Checkout",
    summary: "Summary",
    hide: "Hide",
    unavailable: "Unavailable",
    dayShortLabel: {
      Sat: "Sat",
      Sun: "Sun",
      Mon: "Mon",
      Tue: "Tue",
      Wed: "Wed",
      Thu: "Thu",
      Fri: "Fri",
    },
    footer: {
      contact: "Contact",
      location: "Location",
      followUs: "Follow Us",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
  bn: {
    nav: {
      language: "ভাষা",
      theme: "থিম",
      modes: {
        system: "সিস্টেম",
        light: "লাইট",
        dark: "ডার্ক",
      },
    },
    badge: "কর্পোরেট ক্যাটারিং প্ল্যাটফর্ম",
    packageLabel: "একটি ক্যাটারিং প্যাকেজ নির্বাচন করুন",
    packageDescription: "একটি বা একাধিক প্যাকেজ নির্বাচন করুন, প্রতিটি মেনু কাস্টমাইজ করুন, এবং সবকিছু একসাথে একটি সারাংশে পর্যালোচনা করুন।",
    mostPopular: "সর্বাধিক জনপ্রিয়",
    selectedPackage: "নির্বাচিত প্যাকেজ",
    viewPackage: "প্যাকেজ দেখুন",
    mealSelected: "টি মিল নির্বাচিত",
    mealSuffix: "/ মিল",
    customizeTitle: "দিনভিত্তিক কাস্টমাইজ করুন",
    perMealSuffix: "প্রতি মিল।",
    dayLabel: "দিন",
    orderSummaryTitle: "অর্ডার সারাংশ",
    deliveryFee: "ডেলিভারি ফি",
    finalTotal: "সর্বমোট",
    noItemsSelected: "এখনও কোনো আইটেম নির্বাচন করা হয়নি",
    total: "মোট",
    meals: "টি মিল",
    checkout: "চেকআউট",
    summary: "সারাংশ",
    hide: "লুকান",
    unavailable: "অনুপলব্ধ",
    dayShortLabel: {
      Sat: "শনি",
      Sun: "রবি",
      Mon: "সোম",
      Tue: "মঙ্গল",
      Wed: "বুধ",
      Thu: "বৃহস্পতি",
      Fri: "শুক্র",
    },
    footer: {
      contact: "যোগাযোগ",
      location: "অবস্থান",
      followUs: "আমাদের অনুসরণ করুন",
      rights: "সর্বস্বত্ব সংরক্ষিত।",
      privacy: "গোপনীয়তা নীতিমালা",
      terms: "ব্যবহারের শর্তাবলী",
    },
  },
} as const;

export const cateringDirectoryContent = {
  en: {
    badge: "Order Meals in Dhaka",
    title: "Order Fresh Meals from Caterers Near You",
    subtitle: "Browse trusted home-style and corporate caterers across Dhaka, compare packages, and order meals your whole team will love.",
    searchPlaceholder: "Search by caterer or cuisine",
    searchCta: "Search",
    statCaterers: "Verified caterers",
    statAreas: "Areas in Dhaka",
    statRating: "Avg. rating",
    filtersLabel: "Filters",
    moreFilters: "More filters",
    locationLabel: "Location",
    allLocations: "All areas",
    cuisineAll: "All cuisines",
    priceLabel: "Max price per meal",
    anyPrice: "Any price",
    minOrderLabel: "Minimum order",
    anyMinOrder: "Any quantity",
    sortLabel: "Sort by",
    sortRecommended: "Recommended",
    sortTopRated: "Top rated",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    clearFilters: "Clear filters",
    clearAll: "Clear all",
    resultsLabel: "caterers available",
    ratingsSuffix: "ratings",
    startingFrom: "From",
    perMeal: "/ meal",
    minOrderCardLabel: "Min. order",
    mealsUnit: "meals",
    viewMenu: "View Menu",
    popular: "Popular",
    emptyTitle: "No caterers match your filters",
    emptyDescription: "Try adjusting or clearing your filters to see more options.",
  },
  bn: {
    badge: "ঢাকায় খাবার অর্ডার করুন",
    title: "আপনার কাছাকাছি ক্যাটারার থেকে তাজা খাবার অর্ডার করুন",
    subtitle: "ঢাকার বিশ্বস্ত ঘরোয়া ও কর্পোরেট ক্যাটারার দেখুন, প্যাকেজ তুলনা করুন এবং আপনার পুরো টিমের পছন্দের খাবার অর্ডার করুন।",
    searchPlaceholder: "ক্যাটারার বা কুইজিন খুঁজুন",
    searchCta: "খুঁজুন",
    statCaterers: "যাচাইকৃত ক্যাটারার",
    statAreas: "ঢাকার এলাকা",
    statRating: "গড় রেটিং",
    filtersLabel: "ফিল্টার",
    moreFilters: "আরও ফিল্টার",
    locationLabel: "অবস্থান",
    allLocations: "সব এলাকা",
    cuisineAll: "সব কুইজিন",
    priceLabel: "প্রতি মিল সর্বোচ্চ মূল্য",
    anyPrice: "যেকোনো মূল্য",
    minOrderLabel: "সর্বনিম্ন অর্ডার",
    anyMinOrder: "যেকোনো পরিমাণ",
    sortLabel: "সাজান",
    sortRecommended: "প্রস্তাবিত",
    sortTopRated: "সর্বোচ্চ রেটিং",
    sortPriceLow: "মূল্য: কম থেকে বেশি",
    sortPriceHigh: "মূল্য: বেশি থেকে কম",
    clearFilters: "ফিল্টার মুছুন",
    clearAll: "সব মুছুন",
    resultsLabel: "টি ক্যাটারার পাওয়া গেছে",
    ratingsSuffix: "রেটিং",
    startingFrom: "শুরু",
    perMeal: "/ মিল",
    minOrderCardLabel: "সর্বনিম্ন অর্ডার",
    mealsUnit: "টি মিল",
    viewMenu: "মেনু দেখুন",
    popular: "জনপ্রিয়",
    emptyTitle: "আপনার ফিল্টারের সাথে কোনো ক্যাটারার মেলেনি",
    emptyDescription: "আরও অপশন দেখতে ফিল্টার পরিবর্তন করুন বা মুছে ফেলুন।",
  },
} as const;

export type ClientPortalContent = (typeof clientPortalContent)[Language];
export type LandingContent = (typeof landingContent)[Language];
export type CateringDirectoryContent = (typeof cateringDirectoryContent)[Language];
