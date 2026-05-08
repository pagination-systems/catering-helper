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
      headlinePrimary: "Simplify Your Catering Business.",
      headlineAccent: "Eliminate the WhatsApp Chaos.",
      subheadline:
        "The all-in-one platform built for Bangladeshi caterers. Manage orders, payments, and deliveries — all in one place.",
      primaryCta: "Get Started Free",
      secondaryCta: "Book Demo",
      trustBadge: "Trusted by 500+ caterers in Bangladesh",
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
        "Payment confusion with manual bKash & Nagad transaction tracking.",
      ],
      newWayTitle: "The Catering Helper Way",
      newWayPoints: [
        "Clients order from a branded digital portal — no more WhatsApp chaos.",
        "Aggregated Bazar list generates automatically in seconds.",
        "bKash & Nagad payments tracked and reconciled automatically.",
        "Perfect accuracy, leading to exact portions and higher profit margins.",
      ],
    },
    features: {
      title: "Everything You Need to Run Your Catering Business",
      subtitle: "Powerful tools designed for the Bangladeshi catering market.",
      items: [
        {
          title: "Order Management",
          description:
            "Track every order in real-time. Handle Eid, wedding, and corporate orders with ease from one dashboard.",
        },
        {
          title: "bKash & Nagad Payments",
          description:
            "Accept local mobile payments seamlessly. Auto-reconcile bKash and Nagad transactions in your accounts.",
        },
        {
          title: "Sales Analytics",
          description:
            "Get clear insights on daily revenue, top-selling packages, and profit per meal. Make data-driven decisions.",
        },
        {
          title: "Mobile Admin Panel",
          description:
            "Manage your entire catering operation from your phone. Works smoothly even on slow internet connections.",
        },
        {
          title: "Invoice Generation",
          description:
            "Generate professional invoices instantly in Bangla and English. Share as PDF or WhatsApp link.",
        },
        {
          title: "Customer Management",
          description:
            "Keep a complete record of all clients — corporate accounts, event planners, and regular households.",
        },
      ],
    },
    localizedBenefits: {
      badge: "Built for Bangladesh",
      title: "Designed for Bangladeshi Caterers",
      subtitle:
        "We understand the unique challenges of running a catering business in Bangladesh. That's why we built Catering Helper specifically for you.",
      items: [
        {
          title: "Handle Eid & Wedding Events",
          description:
            "Easily manage the surge of orders during Eid, wedding season, and corporate events with automated booking flows.",
        },
        {
          title: "Local Payment Methods",
          description:
            "Accept bKash, Nagad, and Rocket payments directly. No more manual tracking or payment confusion.",
        },
        {
          title: "Works on Slow Internet",
          description:
            "Optimized for Bangladesh's network conditions. The platform works smoothly even on 3G or slower connections.",
        },
        {
          title: "Bangla & English Support",
          description:
            "Full Bangla language support throughout the platform. Invoices, menus, and communications in both languages.",
        },
      ],
    },
    testimonials: {
      badge: "Trusted by Local Businesses",
      title: "What Caterers Across Bangladesh Say",
      subtitle:
        "Join hundreds of catering businesses who have transformed their operations with Catering Helper.",
      items: [
        {
          quote:
            "This system saved me hours every day during wedding season. I used to spend 3 hours on WhatsApp every night — now it's 15 minutes.",
          author: "Rahim Ahmed",
          business: "Rahim Caterers",
          location: "Dhaka",
          rating: 5,
        },
        {
          quote:
            "The bKash payment integration alone was worth it. No more calling clients to confirm payments — everything is tracked automatically.",
          author: "Fatema Khatun",
          business: "Al-Noor Catering",
          location: "Chittagong",
          rating: 5,
        },
        {
          quote:
            "We handle corporate lunches for 5 offices in Sylhet. The order management feature made it so easy to keep track of everything.",
          author: "Mohammad Karim",
          business: "Sylhet Corporate Meals",
          location: "Sylhet",
          rating: 5,
        },
      ],
    },
    howItWorks: {
      badge: "Simple Setup",
      title: "Get Started in 4 Simple Steps",
      steps: [
        {
          title: "Sign Up",
          description: "Create your free account in 2 minutes. No credit card required.",
        },
        {
          title: "Add Your Menu",
          description:
            "Upload your catering packages, recipes, and pricing. Works for daily meals, events, and weddings.",
        },
        {
          title: "Receive Orders",
          description:
            "Share your portal link with clients. They order directly — no WhatsApp, no missed messages.",
        },
        {
          title: "Manage & Deliver",
          description:
            "View all orders in your dashboard, generate your bazar list, and track payments automatically.",
        },
      ],
    },
    pricing: {
      badge: "Simple Pricing",
      title: "Choose the Right Plan for Your Business",
      subtitle: "All plans include a 1-month free trial. No credit card required.",
      tiers: [
        {
          name: "Starter",
          description: "Perfect for small catering businesses just getting started.",
          price: "৳499",
          period: "month",
          tierBadge: "",
          highlight: false,
          features: [
            "Up to 50 orders/month",
            "1 Client Portal",
            "Basic order management",
            "bKash & Nagad payments",
            "PDF invoice generation",
            "Email support",
          ],
          cta: "Start Free Trial",
        },
        {
          name: "Growth",
          description: "For growing catering businesses with more clients.",
          price: "৳999",
          period: "month",
          tierBadge: "Most Popular",
          highlight: true,
          features: [
            "Unlimited orders",
            "5 Client Portals",
            "Advanced order management",
            "bKash, Nagad & Rocket payments",
            "Sales analytics dashboard",
            "Automated Bazar list",
            "Priority support",
          ],
          cta: "Start Free Trial",
        },
        {
          name: "Pro",
          description: "For large catering operations and enterprises.",
          price: "৳1,999",
          period: "month",
          tierBadge: "",
          highlight: false,
          features: [
            "Unlimited orders",
            "Unlimited Client Portals",
            "Full analytics & reporting",
            "All payment methods",
            "Custom branding",
            "API access",
            "Dedicated account manager",
            "24/7 WhatsApp support",
          ],
          cta: "Contact Sales",
        },
      ],
      subtext: "All prices in BDT. Cancel anytime. No hidden fees.",
    },
    ctaSection: {
      badge: "Start Today",
      title: "Start Growing Your Catering Business Today",
      subtitle:
        "Join 500+ catering businesses in Bangladesh who trust Catering Helper. Get 1 month free — no credit card needed.",
      primaryCta: "Start Free",
      secondaryCta: "Talk to Sales on WhatsApp",
      whatsappNumber: "+8801700000000",
    },
    footer: {
      brand: "Catering Helper",
      tagline: "Made for Bangladesh 🇧🇩",
      copyright: "© 2026 Catering Helper. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact Us",
      blog: "Blog",
      whatsapp: "+8801700000000",
      facebook: "https://facebook.com/cateringhelperbd",
      whatsappLabel: "WhatsApp Us",
      facebookLabel: "Follow on Facebook",
    },
  },
  bn: {
    nav: {
      solution: "সমাধান",
      features: "ফিচারসমূহ",
      howItWorks: "কার্যপ্রণালী",
      pricing: "প্যাকেজ ও মূল্য",
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
      headlinePrimary: "ক্যাটারিং ব্যবসাকে সহজ করুন।",
      headlineAccent: "হোয়াটসঅ্যাপের বিশৃঙ্খলা দূর করুন।",
      subheadline:
        "বাংলাদেশী ক্যাটারারদের জন্য তৈরি সম্পূর্ণ প্ল্যাটফর্ম। অর্ডার, পেমেন্ট ও ডেলিভারি — সব একটিতে।",
      primaryCta: "বিনামূল্যে শুরু করুন",
      secondaryCta: "ডেমো বুক করুন",
      trustBadge: "বাংলাদেশের ৫০০+ ক্যাটারার বিশ্বাস করেন",
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
      title: "হোয়াটসঅ্যাপের বিভ্রান্তি থেকে পরিচালনায় স্বচ্ছতায় উত্তরণ",
      oldWayTitle: "পুরনো পদ্ধতি",
      oldWayPoints: [
        "অর্ডারের পরিবর্তন খুঁজতে হোয়াটসঅ্যাপ গ্রুপে অবিরাম স্ক্রল করা।",
        "আগামীকালের বাজারের হিসাব মেলাতে মাঝরাতে ম্যানুয়াল ডেটা এন্ট্রি।",
        "মিসড মেসেজ বা পরিমাণের ভুলের কারণে ব্যবসায়িক ক্ষতি।",
        "ম্যানুয়াল বিকাশ ও নগদ ট্র্যাকিংয়ে পেমেন্ট বিভ্রান্তি।",
      ],
      newWayTitle: "ক্যাটারিং হেল্পারের আধুনিক পদ্ধতি",
      newWayPoints: [
        "ক্লায়েন্টরা ব্র্যান্ডেড ডিজিটাল পোর্টাল থেকে অর্ডার করেন।",
        "মাত্র কয়েক সেকেন্ডে স্বয়ংক্রিয়ভাবে বাজারের তালিকা তৈরি হয়।",
        "বিকাশ ও নগদ পেমেন্ট ড্যাশবোর্ডে স্বয়ংক্রিয়ভাবে ট্র্যাক হয়।",
        "নির্ভুল হিসাবের মাধ্যমে সঠিক পরিমাণ খাবার ও বেশি মুনাফা।",
      ],
    },
    features: {
      title: "ক্যাটারিং ব্যবসা চালাতে সব কিছু এক জায়গায়",
      subtitle: "বাংলাদেশের ক্যাটারিং বাজারের জন্য তৈরি শক্তিশালী টুলস।",
      items: [
        {
          title: "অর্ডার ম্যানেজমেন্ট",
          description:
            "রিয়েল-টাইমে প্রতিটি অর্ডার ট্র্যাক করুন। ঈদ, বিয়ে ও কর্পোরেট অর্ডার সহজেই পরিচালনা করুন।",
        },
        {
          title: "বিকাশ ও নগদ পেমেন্ট",
          description:
            "স্থানীয় মোবাইল পেমেন্ট সহজে গ্রহণ করুন। বিকাশ ও নগদ ট্রান্জেকশন স্বয়ংক্রিয়ভাবে হিসাবভুক্ত হয়।",
        },
        {
          title: "বিক্রয় বিশ্লেষণ",
          description:
            "দৈনিক আয়, সেরা বিক্রিত প্যাকেজ এবং প্রতি মিলের মুনাফার স্পষ্ট তথ্য পান।",
        },
        {
          title: "মোবাইল অ্যাডমিন প্যানেল",
          description:
            "ফোন থেকেই পুরো ক্যাটারিং অপারেশন পরিচালনা করুন। ধীর ইন্টারনেটেও মসৃণভাবে কাজ করে।",
        },
        {
          title: "ইনভয়েস তৈরি",
          description:
            "তাৎক্ষণিকভাবে বাংলা ও ইংরেজিতে পেশাদার ইনভয়েস তৈরি করুন। পিডিএফ বা হোয়াটসঅ্যাপে শেয়ার করুন।",
        },
        {
          title: "গ্রাহক ব্যবস্থাপনা",
          description:
            "সকল ক্লায়েন্টের সম্পূর্ণ রেকর্ড রাখুন — কর্পোরেট অ্যাকাউন্ট, ইভেন্ট প্ল্যানার ও নিয়মিত গ্রাহক।",
        },
      ],
    },
    localizedBenefits: {
      badge: "বাংলাদেশের জন্য তৈরি",
      title: "বাংলাদেশী ক্যাটারারদের জন্য বিশেষভাবে ডিজাইন করা",
      subtitle:
        "বাংলাদেশে ক্যাটারিং ব্যবসা চালানোর অনন্য চ্যালেঞ্জ আমরা বুঝি। তাই ক্যাটারিং হেল্পার বিশেষভাবে আপনার জন্য তৈরি।",
      items: [
        {
          title: "ঈদ ও বিয়ের ইভেন্ট সামলান",
          description:
            "ঈদ, বিয়ের মৌসুম ও কর্পোরেট ইভেন্টে অর্ডারের ঢল সহজেই পরিচালনা করুন।",
        },
        {
          title: "স্থানীয় পেমেন্ট পদ্ধতি",
          description:
            "সরাসরি বিকাশ, নগদ ও রকেট পেমেন্ট গ্রহণ করুন। ম্যানুয়াল ট্র্যাকিং বা বিভ্রান্তি আর নয়।",
        },
        {
          title: "ধীর ইন্টারনেটেও কাজ করে",
          description:
            "বাংলাদেশের নেটওয়ার্ক পরিস্থিতির জন্য অপ্টিমাইজড। ৩জি বা ধীর সংযোগেও মসৃণভাবে চলে।",
        },
        {
          title: "বাংলা ও ইংরেজি সাপোর্ট",
          description:
            "পুরো প্ল্যাটফর্মে সম্পূর্ণ বাংলা ভাষা সাপোর্ট। ইনভয়েস, মেনু ও যোগাযোগ উভয় ভাষায়।",
        },
      ],
    },
    testimonials: {
      badge: "স্থানীয় ব্যবসার আস্থা",
      title: "সারা বাংলাদেশের ক্যাটারাররা কী বলছেন",
      subtitle:
        "শত শত ক্যাটারিং ব্যবসার সাথে যোগ দিন যারা ক্যাটারিং হেল্পার দিয়ে তাদের কার্যক্রম পরিবর্তন করেছেন।",
      items: [
        {
          quote:
            "এই সিস্টেম বিয়ের মৌসুমে আমার প্রতিদিন ঘণ্টার পর ঘণ্টা বাঁচিয়ে দিচ্ছে। আগে প্রতিরাতে ৩ ঘণ্টা হোয়াটসঅ্যাপে কাটাতাম — এখন মাত্র ১৫ মিনিট।",
          author: "রহিম আহমেদ",
          business: "রহিম ক্যাটারার্স",
          location: "ঢাকা",
          rating: 5,
        },
        {
          quote:
            "শুধু বিকাশ পেমেন্ট ইন্টিগ্রেশনই যথেষ্ট ছিল। ক্লায়েন্টদের পেমেন্ট কনফার্ম করতে আর ফোন করতে হয় না — সব স্বয়ংক্রিয়ভাবে ট্র্যাক হয়।",
          author: "ফাতেমা খাতুন",
          business: "আল-নূর ক্যাটারিং",
          location: "চট্টগ্রাম",
          rating: 5,
        },
        {
          quote:
            "সিলেটে ৫টি অফিসের কর্পোরেট লাঞ্চ পরিচালনা করি। অর্ডার ম্যানেজমেন্ট ফিচার সব কিছু ট্র্যাক রাখা অনেক সহজ করে দিয়েছে।",
          author: "মোহাম্মদ করিম",
          business: "সিলেট কর্পোরেট মিলস",
          location: "সিলেট",
          rating: 5,
        },
      ],
    },
    howItWorks: {
      badge: "সহজ সেটআপ",
      title: "মাত্র ৪টি ধাপে শুরু করুন",
      steps: [
        {
          title: "সাইন আপ করুন",
          description: "২ মিনিটে বিনামূল্যে অ্যাকাউন্ট খুলুন। কোনো ক্রেডিট কার্ড লাগবে না।",
        },
        {
          title: "মেনু যোগ করুন",
          description:
            "ক্যাটারিং প্যাকেজ, রেসিপি ও মূল্য আপলোড করুন। দৈনিক খাবার, ইভেন্ট ও বিয়ের জন্য কাজ করে।",
        },
        {
          title: "অর্ডার পান",
          description:
            "ক্লায়েন্টদের পোর্টাল লিংক শেয়ার করুন। তারা সরাসরি অর্ডার করবেন।",
        },
        {
          title: "পরিচালনা ও ডেলিভারি",
          description:
            "ড্যাশবোর্ডে সব অর্ডার দেখুন, বাজারের তালিকা তৈরি করুন এবং পেমেন্ট ট্র্যাক করুন।",
        },
      ],
    },
    pricing: {
      badge: "সহজ মূল্য পরিকল্পনা",
      title: "আপনার ব্যবসার জন্য সঠিক প্ল্যান বেছে নিন",
      subtitle: "সব প্ল্যানে ১ মাসের ফ্রি ট্রায়াল। কোনো ক্রেডিট কার্ড লাগবে না।",
      tiers: [
        {
          name: "স্টার্টার",
          description: "ছোট ক্যাটারিং ব্যবসার জন্য একদম সঠিক।",
          price: "৳499",
          period: "মাস",
          tierBadge: "",
          highlight: false,
          features: [
            "প্রতি মাসে ৫০টি অর্ডার পর্যন্ত",
            "১টি ক্লায়েন্ট পোর্টাল",
            "বেসিক অর্ডার ম্যানেজমেন্ট",
            "বিকাশ ও নগদ পেমেন্ট",
            "পিডিএফ ইনভয়েস তৈরি",
            "ইমেইল সাপোর্ট",
          ],
          cta: "ফ্রি ট্রায়াল শুরু করুন",
        },
        {
          name: "গ্রোথ",
          description: "আরও বেশি ক্লায়েন্ট সহ বর্ধনশীল ক্যাটারিং ব্যবসার জন্য।",
          price: "৳999",
          period: "মাস",
          tierBadge: "সবচেয়ে জনপ্রিয়",
          highlight: true,
          features: [
            "আনলিমিটেড অর্ডার",
            "৫টি ক্লায়েন্ট পোর্টাল",
            "অ্যাডভান্সড অর্ডার ম্যানেজমেন্ট",
            "বিকাশ, নগদ ও রকেট পেমেন্ট",
            "বিক্রয় বিশ্লেষণ ড্যাশবোর্ড",
            "স্বয়ংক্রিয় বাজার তালিকা",
            "প্রায়রিটি সাপোর্ট",
          ],
          cta: "ফ্রি ট্রায়াল শুরু করুন",
        },
        {
          name: "প্রো",
          description: "বড় ক্যাটারিং অপারেশন ও এন্টারপ্রাইজের জন্য।",
          price: "৳1,999",
          period: "মাস",
          tierBadge: "",
          highlight: false,
          features: [
            "আনলিমিটেড অর্ডার",
            "আনলিমিটেড ক্লায়েন্ট পোর্টাল",
            "সম্পূর্ণ বিশ্লেষণ ও রিপোর্টিং",
            "সব পেমেন্ট পদ্ধতি",
            "কাস্টম ব্র্যান্ডিং",
            "এপিআই এক্সেস",
            "ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার",
            "২৪/৭ হোয়াটসঅ্যাপ সাপোর্ট",
          ],
          cta: "সেলসে যোগাযোগ করুন",
        },
      ],
      subtext: "সব মূল্য বাংলাদেশী টাকায়। যেকোনো সময় বাতিল করুন। কোনো লুকানো চার্জ নেই।",
    },
    ctaSection: {
      badge: "আজই শুরু করুন",
      title: "আজই আপনার ক্যাটারিং ব্যবসা বাড়ানো শুরু করুন",
      subtitle:
        "বাংলাদেশের ৫০০+ ক্যাটারিং ব্যবসার সাথে যোগ দিন যারা ক্যাটারিং হেল্পার বিশ্বাস করেন। ১ মাস বিনামূল্যে।",
      primaryCta: "বিনামূল্যে শুরু করুন",
      secondaryCta: "হোয়াটসঅ্যাপে সেলসের সাথে কথা বলুন",
      whatsappNumber: "+8801700000000",
    },
    footer: {
      brand: "Catering Helper",
      tagline: "Made for Bangladesh 🇧🇩",
      copyright: "© ২০২৬ ক্যাটারিং হেল্পার। সর্বস্বত্ব সংরক্ষিত।",
      privacy: "গোপনীয়তা নীতিমালা",
      terms: "ব্যবহারের শর্তাবলী",
      contact: "যোগাযোগ করুন",
      blog: "ব্লগ",
      whatsapp: "+8801700000000",
      facebook: "https://facebook.com/cateringhelperbd",
      whatsappLabel: "হোয়াটসঅ্যাপে যোগাযোগ করুন",
      facebookLabel: "ফেসবুকে ফলো করুন",
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

export type ClientPortalContent = (typeof clientPortalContent)[Language];
export type LandingContent = (typeof landingContent)[Language];
