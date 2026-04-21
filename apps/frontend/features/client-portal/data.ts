export type DayName = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type MenuVariant = {
  id: string;
  name: string;
  items: string[];
  note: string;
  available?: boolean;
};

export type DayMenu = {
  day: DayName;
  variants: MenuVariant[];
};

export type CateringPackage = {
  id: string;
  name: string;
  pricePerMeal: number;
  description: string;
  popular?: boolean;
  days: DayMenu[];
};

export const dayOrder: DayName[] = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const dayShortLabelBn: Record<DayName, string> = {
  Sat: "শনি",
  Sun: "রবি",
  Mon: "সোম",
  Tue: "মঙ্গল",
  Wed: "বুধ",
  Thu: "বৃহস্পতি",
  Fri: "শুক্র",
};

export const bdt = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

export const packages: CateringPackage[] = [
  {
    id: "daily-basic",
    name: "ডেইলি বেসিক প্যাকেজ",
    pricePerMeal: 120,
    description: "সাশ্রয়ী দৈনন্দিন অফিস মিল, সহজ ও পরিচিত খাবার।",
    popular: true,
    days: dayOrder.map((day) => ({
      day,
      variants: [
        {
          id: `${day}-fish-basic`,
          name: "মাছ ভাত সেট",
          note: "বাংলাদেশি ক্লাসিক খাবার।",
          items: ["ভাত", "মাছের ঝোল", "ডাল", "ভর্তা"],
        },
        {
          id: `${day}-chicken-basic`,
          name: "মুরগি ভাত সেট",
          note: "অফিসের জনপ্রিয় খাবার।",
          items: ["ভাত", "মুরগির ঝোল", "সবজি", "সালাদ"],
        },
        {
          id: `${day}-veg-basic`,
          name: "সবজি সেট",
          note: "হালকা নিরামিষ খাবার।",
          items: ["খিচুড়ি", "মিশ্র সবজি", "ডাল", "আচার"],
        },
      ],
    })),
  },

  {
    id: "standard",
    name: "স্ট্যান্ডার্ড প্যাকেজ",
    pricePerMeal: 130,
    description: "সুষম ও কিছুটা উন্নত মানের অফিস মিল।",
    days: dayOrder.map((day) => ({
      day,
      variants: [
        {
          id: `${day}-fish-standard`,
          name: "রুই মাছ সেট",
          note: "পরিচিত ও জনপ্রিয় মাছ।",
          items: ["ভাত", "রুই মাছের ঝোল", "মসুর ডাল", "আলু ভর্তা"],
        },
        {
          id: `${day}-chicken-standard`,
          name: "চিকেন ভুনা সেট",
          note: "মাঝারি মসলাযুক্ত সুস্বাদু খাবার।",
          items: ["পোলাও", "চিকেন ভুনা", "সবজি", "সালাদ"],
        },
        {
          id: `${day}-egg-standard`,
          name: "ডিম কারি সেট",
          note: "সাশ্রয়ী ও পুষ্টিকর।",
          items: ["ভাত", "ডিম কারি", "ডাল", "ভাজি"],
        },
      ],
    })),
  },

  {
    id: "premium",
    name: "প্রিমিয়াম প্যাকেজ",
    pricePerMeal: 150,
    description: "উন্নত মানের খাবার, মিটিং ও বিশেষ দিনের জন্য উপযুক্ত।",
    days: dayOrder.map((day) => ({
      day,
      variants: [
        {
          id: `${day}-fish-premium`,
          name: "ইলিশ সেট",
          note: "প্রিমিয়াম মাছের আইটেম।",
          items: ["লেবু ভাত", "ইলিশ ভাপা", "ডাল", "ভর্তা"],
        },
        {
          id: `${day}-chicken-premium`,
          name: "চিকেন রোস্ট সেট",
          note: "মিটিং ও বিশেষ অনুষ্ঠানের জন্য।",
          items: ["জাফরান পোলাও", "চিকেন রোস্ট", "সবজি", "রায়তা"],
        },
        {
          id: `${day}-beef-premium`,
          name: "গরুর মাংস ভুনা সেট",
          note: "হেভি মিলের জন্য উপযুক্ত।",
          items: ["পোলাও", "গরুর ভুনা", "ডাল", "বোরহানি"],
        },
      ],
    })),
  },
];
