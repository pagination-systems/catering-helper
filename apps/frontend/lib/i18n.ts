export const languageStorageKey = "catering:language";

export const siteNames = {
  en: "Catering Helper",
  bn: "ক্যাটারিং হেল্পার",
} as const;

export type Language = keyof typeof siteNames;

export const defaultLanguage: Language = "en";

export const siteName = siteNames[defaultLanguage];

export const landingCopy = {
  en: {
    nav: {
      features: "Features",
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
        "The all-in-one ordering portal and automated 'Bazar' list generator built specifically for catering companies.",
      primaryCta: "Start Your 1-Month Free Trial",
      secondaryCta: "View Demo",
      mobileTitle: "Client Mobile Portal",
      mobileMealTitle: "150 BDT Fish Meal",
      mobileMealDescription: "Steamed rice, fish curry, lentils, salad",
      mobileOrderLabel: "Order quantity",
      mobileOrderBy: "Order before 10:00 AM",
      dashboardTitle: "Admin Dashboard",
      bazarTitle: "Bazar List (Today)",
      bazarItems: ["15kg Chicken", "3L Oil", "24kg Rice", "8kg Onion"],
      orderSummary: "Total confirmed meals: 280",
    },
    problemSolution: {
      title: "From WhatsApp Confusion to Operational Clarity",
      oldWayTitle: "The Old Way",
      oldWayPoints: [
        "Messy WhatsApp threads",
        "Manual data entry",
        "Incorrect cooking quantities",
        "Missed 10 AM deadlines",
      ],
      newWayTitle: "The Catering Helper Way",
      newWayPoints: [
        "Structured client ordering portal",
        "Automated order aggregation",
        "Precise ingredient calculations",
        "Zero missed orders",
      ],
    },
    features: {
      title: "Core Features",
      items: [
        {
          title: "Dedicated Client Portal",
          description:
            "Your clients get a simple web app to browse daily menus (120/150/180 BDT tiers) and place orders before the automated 10:00 AM lock-out.",
        },
        {
          title: "Automated 'Bazar' Estimation",
          description:
            "Stop guessing. Our engine uses your custom 'Recipe-to-Quantity' mapping to calculate exactly how many kg of meat, rice, and oil you need based on total daily orders.",
        },
        {
          title: "Financial & Profit Tracking",
          description:
            "Input your daily market costs against your total revenue to track daily and monthly profit margins effortlessly.",
        },
      ],
    },
    howItWorks: {
      title: "How It Works (3 Simple Steps)",
      steps: [
        "Set your daily menu and price tiers.",
        "Clients place their orders through your unique branded portal.",
        "At 10:01 AM, export your automated Bazar list and start cooking.",
      ],
    },
    pricing: {
      title: "Simple Pricing for Growing Caterers",
      price: "$0",
      period: "for the first month.",
      features: [
        "Unlimited orders",
        "Automated Bazar lists",
        "Financial tracking",
        "Secure multi-tenant data isolation",
      ],
      cta: "Claim Your Free Month",
      subtext: "No credit card required to start",
    },
    footer: {
      brand: "Catering Helper by HSA Technology.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact Support",
    },
  },
  bn: {
    nav: {
      features: "ফিচার",
      howItWorks: "কাজ করার ধাপ",
      pricing: "মূল্য",
      login: "লগইন",
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
      headline: "আপনার ক্যাটারিং ব্যবসা অটোমেট করুন। WhatsApp-এর বিশৃঙ্খলা দূর করুন।",
      subheadline:
        "ক্যাটারিং কোম্পানির জন্য বিশেষভাবে তৈরি একটি অল-ইন-ওয়ান অর্ডারিং পোর্টাল এবং স্বয়ংক্রিয় 'বাজার' লিস্ট জেনারেটর।",
      primaryCta: "১ মাসের ফ্রি ট্রায়াল শুরু করুন",
      secondaryCta: "ডেমো দেখুন",
      mobileTitle: "ক্লায়েন্ট মোবাইল পোর্টাল",
      mobileMealTitle: "১৫০ টাকা ফিশ মিল",
      mobileMealDescription: "ভাত, মাছের তরকারি, ডাল, সালাদ",
      mobileOrderLabel: "অর্ডার পরিমাণ",
      mobileOrderBy: "সকাল ১০:০০টার আগে অর্ডার করুন",
      dashboardTitle: "অ্যাডমিন ড্যাশবোর্ড",
      bazarTitle: "আজকের বাজার লিস্ট",
      bazarItems: ["১৫ কেজি মুরগি", "৩ লিটার তেল", "২৪ কেজি চাল", "৮ কেজি পেঁয়াজ"],
      orderSummary: "মোট নিশ্চিত মিল: ২৮০",
    },
    problemSolution: {
      title: "WhatsApp-এর বিশৃঙ্খলা থেকে অপারেশনাল স্বচ্ছতায়",
      oldWayTitle: "পুরনো পদ্ধতি",
      oldWayPoints: [
        "এলোমেলো WhatsApp থ্রেড",
        "ম্যানুয়াল ডেটা এন্ট্রি",
        "ভুল রান্নার পরিমাণ",
        "সকাল ১০টার ডেডলাইন মিস",
      ],
      newWayTitle: "Catering Helper পদ্ধতি",
      newWayPoints: [
        "স্ট্রাকচার্ড ক্লায়েন্ট অর্ডারিং পোর্টাল",
        "স্বয়ংক্রিয় অর্ডার একত্রিকরণ",
        "নির্ভুল উপকরণ হিসাব",
        "শূন্য মিসড অর্ডার",
      ],
    },
    features: {
      title: "মূল ফিচারসমূহ",
      items: [
        {
          title: "ডেডিকেটেড ক্লায়েন্ট পোর্টাল",
          description:
            "আপনার ক্লায়েন্টরা সহজ ওয়েব অ্যাপে দৈনিক মেনু (১২০/১৫০/১৮০ টাকা টিয়ার) দেখে সকাল ১০:০০টার অটো লক-আউটের আগে অর্ডার দিতে পারে।",
        },
        {
          title: "স্বয়ংক্রিয় 'বাজার' অনুমান",
          description:
            "এখন আর আন্দাজ নয়। আপনার কাস্টম 'রেসিপি-টু-কোয়ান্টিটি' ম্যাপিং ব্যবহার করে সিস্টেম মোট অর্ডারের ভিত্তিতে কত কেজি মাংস, চাল ও তেল লাগবে তা নির্ভুলভাবে হিসাব করে।",
        },
        {
          title: "ফাইন্যান্স ও প্রফিট ট্র্যাকিং",
          description: "দৈনিক বাজার খরচ ও মোট আয় ইনপুট দিন এবং সহজে দৈনিক ও মাসিক প্রফিট মার্জিন ট্র্যাক করুন।",
        },
      ],
    },
    howItWorks: {
      title: "কিভাবে কাজ করে (৩টি সহজ ধাপ)",
      steps: [
        "দৈনিক মেনু এবং প্রাইস টিয়ার সেট করুন।",
        "ক্লায়েন্টরা আপনার ইউনিক ব্র্যান্ডেড পোর্টালে অর্ডার দেয়।",
        "সকাল ১০:০১-এ স্বয়ংক্রিয় বাজার লিস্ট এক্সপোর্ট করে রান্না শুরু করুন।",
      ],
    },
    pricing: {
      title: "বর্ধনশীল ক্যাটারারদের জন্য সহজ মূল্য",
      price: "$0",
      period: "প্রথম মাসের জন্য।",
      features: [
        "আনলিমিটেড অর্ডার",
        "স্বয়ংক্রিয় বাজার লিস্ট",
        "ফাইন্যান্সিয়াল ট্র্যাকিং",
        "নিরাপদ মাল্টি-টেন্যান্ট ডেটা আইসোলেশন",
      ],
      cta: "ফ্রি মাসটি ক্লেইম করুন",
      subtext: "শুরু করতে ক্রেডিট কার্ড লাগবে না",
    },
    footer: {
      brand: "HSA Technology-এর Catering Helper।",
      privacy: "প্রাইভেসি পলিসি",
      terms: "টার্মস অব সার্ভিস",
      contact: "সাপোর্টে যোগাযোগ",
    },
  },
} as const;

export type LandingCopy = (typeof landingCopy)[Language];
