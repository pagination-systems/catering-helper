export const languageStorageKey = 'catering:language';

export const siteNames = {
  en: 'Catering Helper',
  bn: 'ক্যাটারিং হেল্পার',
} as const;

export type Language = keyof typeof siteNames;

export const defaultLanguage: Language = 'en';

export const siteName = siteNames[defaultLanguage];

export const landingCopy = {
  en: {
    nav: {
      solution: 'Solution',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      login: 'Login',
      startFreeTrial: 'Start Free Trial',
      language: 'Language',
      theme: 'Theme',
      menu: 'Menu',
      modes: {
        system: 'System',
        light: 'Light',
        dark: 'Dark',
      },
    },
    hero: {
      headline:
        'Automate Your Catering Business. Eliminate the WhatsApp Chaos.',
      subheadline:
        'Transform manual orders and scattered messages into a beautifully orchestrated, high-end digital experience for both you and your clients.',
      primaryCta: 'Start Your 1-Month Free Trial',
      secondaryCta: 'View Demo',
      mobileTitle: 'Client Mobile Portal',
      mobileMealTitle: 'Admin Dashboard',
      mobileMealDescription: 'Generated Bazar List',
      mobileOrderLabel: 'Premium Rice (Miniket)',
      mobileOrderBy: 'Order before 10:00 AM',
      dashboardTitle: 'Client Portal',
      bazarTitle: 'Daily kitchen control',
      bazarItems: ['35 Kg', '25 Kg', '8 Liters', '150 portions'],
      orderSummary: 'Export to PDF',
    },
    problemSolution: {
      title: 'From WhatsApp Confusion to Operational Clarity',
      oldWayTitle: 'The Old Way',
      oldWayPoints: [
        'Endless scrolling through messy WhatsApp groups to find order changes.',
        "Manual data entry at midnight to calculate tomorrow's ingredient needs.",
        'Lost revenue due to missed messages or misunderstood quantity requests.',
      ],
      newWayTitle: 'The Catering Helper Way',
      newWayPoints: [
        'Clients select from a branded, polished digital portal.',
        'Aggregated Bazar list generates automatically in seconds.',
        'Perfect accuracy, leading to exact portions and higher profit margins.',
      ],
    },
    features: {
      title: 'Architectural Control Over Every Meal.',
      items: [
        {
          title: 'Dedicated Client Portal',
          description:
            'Provide your corporate and event clients with a seamless, white-labeled interface to view menus, adjust headcount, and confirm orders without a single phone call.',
        },
        {
          title: "Automated 'Bazar' Estimation",
          description:
            "Our algorithm reads tomorrow's orders and instantly outputs precise ingredient quantities required for the market run.",
        },
        {
          title: 'Financial & Profit Tracking',
          description:
            'Monitor daily expenses against revenue totals and your actual profit per meal, per client, effortlessly.',
        },
      ],
    },
    howItWorks: {
      title: 'The Workflow.',
      steps: [
        {
          title: 'Set the Menu',
          description:
            'Publish your daily or weekly offerings in the master dashboard. Define recipes and default ratios.',
        },
        {
          title: 'Clients Order',
          description:
            'Clients log into their clean portal, input their numbers, and submit before your cutoff time.',
        },
        {
          title: 'Export at 10:01 AM',
          description:
            'The moment the cutoff hits, generate a precise, aggregated Bazar list for your procurement team.',
        },
      ],
    },
    pricing: {
      title: 'Simple Pricing for Growing Caterers',
      description: 'No hidden fees. Full access to all features.',
      price: 'BDT 0',
      period: 'first month',
      features: [
        'Unlimited Client Portals',
        'Automated Bazar Lists',
        'Profit & Loss Analytics',
      ],
      cta: 'Claim Your Free Month',
      subtext: 'Cancel anytime. No credit card required upfront.',
    },
    footer: {
      brand: 'Catering Helper',
      copyright: '© 2026 Catering Helper. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact Us',
      blog: 'Blog',
    },
  },
  bn: {
    nav: {
      solution: 'সমাধান',
      howItWorks: 'কিভাবে কাজ করে',
      pricing: 'মূল্য',
      company: 'কোম্পানি',
      login: 'লগইন',
      startFreeTrial: 'ফ্রি ট্রায়াল শুরু করুন',
      language: 'ভাষা',
      theme: 'থিম',
      menu: 'মেনু',
      modes: {
        system: 'সিস্টেম',
        light: 'লাইট',
        dark: 'ডার্ক',
      },
    },
    hero: {
      headline:
        'আপনার ক্যাটারিং ব্যবসা অটোমেট করুন। WhatsApp-এর বিশৃঙ্খলা দূর করুন।',
      subheadline:
        "ক্যাটারিং কোম্পানির জন্য বিশেষভাবে তৈরি একটি অল-ইন-ওয়ান অর্ডারিং পোর্টাল এবং স্বয়ংক্রিয় 'বাজার' লিস্ট জেনারেটর।",
      primaryCta: '১ মাসের ফ্রি ট্রায়াল শুরু করুন',
      secondaryCta: 'ডেমো দেখুন',
      mobileTitle: 'ক্লায়েন্ট মোবাইল পোর্টাল',
      mobileMealTitle: 'অ্যাডমিন ড্যাশবোর্ড',
      mobileMealDescription: 'ভাত, মাছের তরকারি, ডাল, সালাদ',
      mobileOrderLabel: 'অর্ডার পরিমাণ',
      mobileOrderBy: 'সকাল ১০:০০টার আগে অর্ডার করুন',
      dashboardTitle: 'ক্লায়েন্ট পোর্টাল',
      bazarTitle: 'আজকের বাজার লিস্ট',
      bazarItems: [
        '১৫ কেজি মুরগি',
        '৩ লিটার তেল',
        '২৪ কেজি চাল',
        '৮ কেজি পেঁয়াজ',
      ],
      orderSummary: 'মোট নিশ্চিত মিল: ২৮০',
    },
    problemSolution: {
      title: 'WhatsApp-এর বিশৃঙ্খলা থেকে অপারেশনাল স্বচ্ছতায়',
      oldWayTitle: 'পুরনো পদ্ধতি',
      oldWayPoints: [
        'এলোমেলো WhatsApp থ্রেড',
        'ম্যানুয়াল ডেটা এন্ট্রি',
        'ভুল রান্নার পরিমাণ',
        'সকাল ১০টার ডেডলাইন মিস',
      ],
      newWayTitle: 'Catering Helper পদ্ধতি',
      newWayPoints: [
        'স্ট্রাকচার্ড ক্লায়েন্ট অর্ডারিং পোর্টাল',
        'স্বয়ংক্রিয় অর্ডার একত্রিকরণ',
        'নির্ভুল উপকরণ হিসাব',
        'শূন্য মিসড অর্ডার',
      ],
    },
    features: {
      title: 'মূল ফিচারসমূহ',
      items: [
        {
          title: 'ডেডিকেটেড ক্লায়েন্ট পোর্টাল',
          description:
            'আপনার ক্লায়েন্টরা সহজ ওয়েব অ্যাপে দৈনিক মেনু (১২০/১৫০/১৮০ টাকা টিয়ার) দেখে সকাল ১০:০০টার অটো লক-আউটের আগে অর্ডার দিতে পারে।',
        },
        {
          title: "স্বয়ংক্রিয় 'বাজার' অনুমান",
          description:
            "এখন আর আন্দাজ নয়। আপনার কাস্টম 'রেসিপি-টু-কোয়ান্টিটি' ম্যাপিং ব্যবহার করে সিস্টেম মোট অর্ডারের ভিত্তিতে কত কেজি মাংস, চাল ও তেল লাগবে তা নির্ভুলভাবে হিসাব করে।",
        },
        {
          title: 'ফাইন্যান্স ও প্রফিট ট্র্যাকিং',
          description:
            'দৈনিক বাজার খরচ ও মোট আয় ইনপুট দিন এবং সহজে দৈনিক ও মাসিক প্রফিট মার্জিন ট্র্যাক করুন।',
        },
      ],
    },
    howItWorks: {
      title: 'কিভাবে কাজ করে (৩টি সহজ ধাপ)',
      steps: [
        {
          title: 'মেনু সেট করুন',
          description:
            'মাস্টার ড্যাশবোর্ডে আপনার দৈনিক বা সাপ্তাহিক মেনু প্রকাশ করুন।',
        },
        {
          title: 'ক্লায়েন্ট অর্ডার দেয়',
          description:
            'ক্লায়েন্টরা তাদের পোর্টালে সংখ্যা দিয়ে কাট-অফের আগে সাবমিট করে।',
        },
        {
          title: '১০:০১ এ এক্সপোর্ট',
          description:
            'কাট-অফের সাথে সাথে সুনির্দিষ্ট সমন্বিত বাজার লিস্ট জেনারেট করুন।',
        },
      ],
    },
    pricing: {
      title: 'বর্ধনশীল ক্যাটারারদের জন্য সহজ মূল্য',
      description: 'কোনো গোপন চার্জ নেই। সব ফিচারে পূর্ণ অ্যাক্সেস।',
      price: 'BDT 0',
      period: 'প্রথম মাসের জন্য।',
      features: [
        'আনলিমিটেড অর্ডার',
        'স্বয়ংক্রিয় বাজার লিস্ট',
        'ফাইন্যান্সিয়াল ট্র্যাকিং',
        'নিরাপদ মাল্টি-টেন্যান্ট ডেটা আইসোলেশন',
      ],
      cta: 'ফ্রি মাসটি ক্লেইম করুন',
      subtext: 'শুরু করতে ক্রেডিট কার্ড লাগবে না',
    },
    footer: {
      brand: 'Catering Helper',
      copyright: '© ২০২৬ Catering Helper. সর্বস্বত্ব সংরক্ষিত।',
      privacy: 'প্রাইভেসি পলিসি',
      terms: 'টার্মস অব সার্ভিস',
      contact: 'যোগাযোগ',
      blog: 'ব্লগ',
    },
  },
} as const;

export type LandingCopy = (typeof landingCopy)[Language];
