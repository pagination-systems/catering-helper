import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

export type AccountContent = {
  tabs: { orders: string; profile: string; settings: string };
  orders: {
    title: string;
    description: string;
    loading: string;
    error: string;
    empty: { title: string; description: string; browse: string };
    active: { heading: string; badge: string };
    history: { heading: string; empty: string };
    status: { confirmed: string; cancelled: string };
    timeline: { placed: string; confirmed: string; delivery: string; cancelled: string };
    card: {
      deliveryOn: string;
      meals: string;
      total: string;
      viewDetails: string;
      reorder: string;
    };
    detail: {
      back: string;
      order: string;
      placedOn: string;
      tracking: string;
      deliveryDetails: string;
      recipient: string;
      phone: string;
      deliveryAddress: string;
      deliveryDay: string;
      notes: string;
      items: string;
      perMeal: string;
      subtotal: string;
      deliveryFee: string;
      grandTotal: string;
      meals: string;
      notFound: string;
    };
    reorderDialog: {
      title: string;
      description: string;
      confirm: string;
      cancel: string;
      reordering: string;
    };
  };
  profile: {
    title: string;
    description: string;
    overview: {
      title: string;
      accountType: string;
      emailVerified: string;
      emailUnverified: string;
    };
    accountTypes: { customer: string; caterer: string; admin: string };
    personal: {
      cardTitle: string;
      cardDescription: string;
      firstNameLabel: string;
      firstNamePlaceholder: string;
      lastNameLabel: string;
      lastNamePlaceholder: string;
      emailLabel: string;
      emailNote: string;
      save: string;
      saving: string;
      reset: string;
    };
    security: {
      cardTitle: string;
      cardDescription: string;
      currentPasswordLabel: string;
      newPasswordLabel: string;
      confirmPasswordLabel: string;
      passwordPlaceholder: string;
      save: string;
      saving: string;
    };
  };
  settings: {
    title: string;
    description: string;
    appearance: {
      cardTitle: string;
      cardDescription: string;
      themeLabel: string;
      themeDescription: string;
      system: string;
      light: string;
      dark: string;
    };
    language: {
      cardTitle: string;
      cardDescription: string;
      languageLabel: string;
      languageDescription: string;
      english: string;
      bangla: string;
    };
  };
};

const content: Record<Language, AccountContent> = {
  en: {
    tabs: { orders: "Orders", profile: "Profile", settings: "Settings" },
    orders: {
      title: "My Orders",
      description: "Track your current order and revisit past deliveries.",
      loading: "Loading your orders…",
      error: "We couldn't load your orders. Please try again.",
      empty: {
        title: "No orders yet",
        description: "When you place an order from a caterer, it will show up here.",
        browse: "Browse caterers",
      },
      active: { heading: "Current order", badge: "In progress" },
      history: { heading: "Order history", empty: "No past orders yet." },
      status: { confirmed: "Confirmed", cancelled: "Cancelled" },
      timeline: {
        placed: "Order placed",
        confirmed: "Confirmed",
        delivery: "Delivery",
        cancelled: "Cancelled",
      },
      card: {
        deliveryOn: "Delivery",
        meals: "meals",
        total: "Total",
        viewDetails: "View details",
        reorder: "Reorder",
      },
      detail: {
        back: "Back to orders",
        order: "Order",
        placedOn: "Placed on",
        tracking: "Order tracking",
        deliveryDetails: "Delivery details",
        recipient: "Recipient",
        phone: "Phone",
        deliveryAddress: "Delivery address",
        deliveryDay: "Delivery day",
        notes: "Notes",
        items: "Items",
        perMeal: "per meal",
        subtotal: "Subtotal",
        deliveryFee: "Delivery fee",
        grandTotal: "Total",
        meals: "meals",
        notFound: "We couldn't find this order.",
      },
      reorderDialog: {
        title: "Place this order again?",
        description:
          "We'll create a new order with the same items from {{caterer}} for the next {{day}}. Prices reflect the caterer's current menu.",
        confirm: "Reorder",
        cancel: "Cancel",
        reordering: "Placing…",
      },
    },
    profile: {
      title: "My Profile",
      description: "Manage your personal information and account security.",
      overview: {
        title: "Account overview",
        accountType: "Account type",
        emailVerified: "Email verified",
        emailUnverified: "Email not verified",
      },
      accountTypes: { customer: "Customer", caterer: "Caterer", admin: "Admin" },
      personal: {
        cardTitle: "Personal information",
        cardDescription: "Update the name shown on your orders.",
        firstNameLabel: "First name",
        firstNamePlaceholder: "Rahim",
        lastNameLabel: "Last name",
        lastNamePlaceholder: "Uddin",
        emailLabel: "Email",
        emailNote: "Your email is used to sign in and can't be changed here.",
        save: "Save changes",
        saving: "Saving…",
        reset: "Reset",
      },
      security: {
        cardTitle: "Password",
        cardDescription: "Change the password you use to sign in.",
        currentPasswordLabel: "Current password",
        newPasswordLabel: "New password",
        confirmPasswordLabel: "Confirm new password",
        passwordPlaceholder: "••••••••",
        save: "Update password",
        saving: "Updating…",
      },
    },
    settings: {
      title: "Settings",
      description: "Personalise how the app looks and reads for you.",
      appearance: {
        cardTitle: "Appearance",
        cardDescription: "Choose a light, dark, or system-matched theme.",
        themeLabel: "Theme",
        themeDescription: "Applies across your browser on this device.",
        system: "System",
        light: "Light",
        dark: "Dark",
      },
      language: {
        cardTitle: "Language",
        cardDescription: "Set your preferred language for the interface.",
        languageLabel: "Language",
        languageDescription: "Menus and labels will use this language.",
        english: "English",
        bangla: "বাংলা",
      },
    },
  },
  bn: {
    tabs: { orders: "অর্ডার", profile: "প্রোফাইল", settings: "সেটিংস" },
    orders: {
      title: "আমার অর্ডার",
      description: "আপনার চলমান অর্ডার ট্র্যাক করুন এবং আগের ডেলিভারি দেখুন।",
      loading: "আপনার অর্ডার লোড হচ্ছে…",
      error: "আপনার অর্ডার লোড করা যায়নি। আবার চেষ্টা করুন।",
      empty: {
        title: "এখনও কোনো অর্ডার নেই",
        description: "আপনি কোনো ক্যাটারারের কাছে অর্ডার করলে সেটি এখানে দেখা যাবে।",
        browse: "ক্যাটারার দেখুন",
      },
      active: { heading: "বর্তমান অর্ডার", badge: "চলমান" },
      history: { heading: "অর্ডার হিস্ট্রি", empty: "এখনও কোনো পুরনো অর্ডার নেই।" },
      status: { confirmed: "নিশ্চিত", cancelled: "বাতিল" },
      timeline: {
        placed: "অর্ডার করা হয়েছে",
        confirmed: "নিশ্চিত",
        delivery: "ডেলিভারি",
        cancelled: "বাতিল",
      },
      card: {
        deliveryOn: "ডেলিভারি",
        meals: "মিল",
        total: "মোট",
        viewDetails: "বিস্তারিত দেখুন",
        reorder: "আবার অর্ডার",
      },
      detail: {
        back: "অর্ডারে ফিরে যান",
        order: "অর্ডার",
        placedOn: "অর্ডারের তারিখ",
        tracking: "অর্ডার ট্র্যাকিং",
        deliveryDetails: "ডেলিভারির বিবরণ",
        recipient: "গ্রাহক",
        phone: "ফোন",
        deliveryAddress: "ডেলিভারি ঠিকানা",
        deliveryDay: "ডেলিভারির দিন",
        notes: "নোট",
        items: "আইটেম",
        perMeal: "প্রতি মিল",
        subtotal: "সাবটোটাল",
        deliveryFee: "ডেলিভারি ফি",
        grandTotal: "মোট",
        meals: "মিল",
        notFound: "এই অর্ডারটি খুঁজে পাওয়া যায়নি।",
      },
      reorderDialog: {
        title: "এই অর্ডারটি আবার করবেন?",
        description:
          "{{caterer}} থেকে একই আইটেম দিয়ে পরবর্তী {{day}} এর জন্য নতুন অর্ডার তৈরি হবে। দাম ক্যাটারারের বর্তমান মেনু অনুযায়ী হবে।",
        confirm: "আবার অর্ডার",
        cancel: "বাতিল",
        reordering: "অর্ডার হচ্ছে…",
      },
    },
    profile: {
      title: "আমার প্রোফাইল",
      description: "আপনার ব্যক্তিগত তথ্য ও অ্যাকাউন্ট নিরাপত্তা পরিচালনা করুন।",
      overview: {
        title: "অ্যাকাউন্ট সারসংক্ষেপ",
        accountType: "অ্যাকাউন্টের ধরন",
        emailVerified: "ইমেইল যাচাইকৃত",
        emailUnverified: "ইমেইল যাচাই করা হয়নি",
      },
      accountTypes: { customer: "গ্রাহক", caterer: "ক্যাটারার", admin: "অ্যাডমিন" },
      personal: {
        cardTitle: "ব্যক্তিগত তথ্য",
        cardDescription: "আপনার অর্ডারে প্রদর্শিত নাম পরিবর্তন করুন।",
        firstNameLabel: "নামের প্রথম অংশ",
        firstNamePlaceholder: "রহিম",
        lastNameLabel: "নামের শেষ অংশ",
        lastNamePlaceholder: "উদ্দিন",
        emailLabel: "ইমেইল",
        emailNote: "আপনার ইমেইল সাইন ইনের জন্য ব্যবহৃত হয় এবং এখানে পরিবর্তন করা যায় না।",
        save: "সংরক্ষণ করুন",
        saving: "সংরক্ষণ হচ্ছে…",
        reset: "রিসেট",
      },
      security: {
        cardTitle: "পাসওয়ার্ড",
        cardDescription: "সাইন ইনের পাসওয়ার্ড পরিবর্তন করুন।",
        currentPasswordLabel: "বর্তমান পাসওয়ার্ড",
        newPasswordLabel: "নতুন পাসওয়ার্ড",
        confirmPasswordLabel: "নতুন পাসওয়ার্ড নিশ্চিত করুন",
        passwordPlaceholder: "••••••••",
        save: "পাসওয়ার্ড আপডেট করুন",
        saving: "আপডেট হচ্ছে…",
      },
    },
    settings: {
      title: "সেটিংস",
      description: "অ্যাপের চেহারা ও ভাষা আপনার পছন্দমতো সাজান।",
      appearance: {
        cardTitle: "থিম",
        cardDescription: "লাইট, ডার্ক বা সিস্টেম থিম বেছে নিন।",
        themeLabel: "থিম",
        themeDescription: "এই ডিভাইসের ব্রাউজারে প্রযোজ্য হবে।",
        system: "সিস্টেম",
        light: "লাইট",
        dark: "ডার্ক",
      },
      language: {
        cardTitle: "ভাষা",
        cardDescription: "ইন্টারফেসের জন্য পছন্দের ভাষা নির্ধারণ করুন।",
        languageLabel: "ভাষা",
        languageDescription: "মেনু ও লেবেল এই ভাষায় দেখানো হবে।",
        english: "English",
        bangla: "বাংলা",
      },
    },
  },
};

export const useAccountI18n = (): AccountContent => {
  const { language } = useLanguage();
  return content[language];
};
