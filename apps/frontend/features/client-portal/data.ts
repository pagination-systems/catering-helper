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

export const dailyBasicVariants: Record<DayName, MenuVariant[]> = {
  Sat: [
    {
      id: "sat-fish",
      name: "মাছ ভাত সেট",
      note: "ক্লাসিক বাঙালি খাবার।",
      items: ["ভাত", "তেলাপিয়া মাছ", "ডাল", "ভর্তা"],
    },
    {
      id: "sat-chicken",
      name: "মুরগি ঝোল সেট",
      note: "অফিস স্পেশাল।",
      items: ["ভাত", "মুরগির ঝোল", "সবজি"],
    },
    {
      id: "sat-veg",
      name: "সবজি সেট",
      note: "হালকা নিরামিষ।",
      items: ["খিচুড়ি", "মিক্স সবজি", "ডাল"],
    },
  ],

  Sun: [
    {
      id: "sun-khichuri",
      name: "খিচুড়ি সেট",
      note: "হালকা খাবার।",
      items: ["খিচুড়ি", "ডিম ভাজি"],
    },
    {
      id: "sun-fish",
      name: "মাছ সেট",
      note: "ঘরোয়া স্বাদ।",
      items: ["ভাত", "মাছ", "ডাল"],
    },
  ],

  Mon: [
    {
      id: "mon-chicken",
      name: "চিকেন ভুনা",
      note: "স্ট্যান্ডার্ড মিল।",
      items: ["ভাত", "চিকেন ভুনা", "সবজি"],
    },
    {
      id: "mon-egg",
      name: "ডিম কারি",
      note: "সাশ্রয়ী প্রোটিন।",
      items: ["ভাত", "ডিম কারি", "ডাল"],
    },
  ],

  Tue: [
    {
      id: "tue-fish",
      name: "রুই মাছ সেট",
      note: "ক্লাসিক অপশন।",
      items: ["ভাত", "রুই মাছ", "ডাল"],
    },
    {
      id: "tue-veg",
      name: "সবজি প্লেট",
      note: "নিরামিষ।",
      items: ["ভাত", "সবজি", "আচার"],
    },
    {
      id: "tue-chicken",
      name: "চিকেন সেট",
      note: "মাঝারি স্পাইসি।",
      items: ["ভাত", "চিকেন কারি"],
    },
  ],

  Wed: [
    {
      id: "wed-egg",
      name: "ডিম ভাজি সেট",
      note: "সহজ ও দ্রুত।",
      items: ["ভাত", "ডিম ভাজি", "ডাল"],
    },
    {
      id: "wed-fish",
      name: "ফিশ কারি",
      note: "হালকা স্বাদ।",
      items: ["ভাত", "ফিশ কারি"],
    },
  ],

  Thu: [
    {
      id: "thu-chicken",
      name: "চিকেন ঝোল",
      note: "ঘরোয়া খাবার।",
      items: ["ভাত", "চিকেন ঝোল"],
    },
    {
      id: "thu-veg",
      name: "সবজি সেট",
      note: "হেলদি অপশন।",
      items: ["ভাত", "সবজি", "ডাল"],
    },
  ],

  Fri: [
    {
      id: "fri-special",
      name: "স্পেশাল জুমা মিল",
      note: "সপ্তাহ শেষ স্পেশাল।",
      items: ["বিরিয়ানি", "চিকেন", "ডেজার্ট"],
    },
    {
      id: "fri-fish",
      name: "ফিশ প্লেট",
      note: "হালকা ফ্রাইডে মিল।",
      items: ["ভাত", "মাছ", "ডাল"],
    },
    {
      id: "fri-veg",
      name: "ভেজিটেরিয়ান সেট",
      note: "নিরামিষ স্পেশাল।",
      items: ["খিচুড়ি", "সবজি", "আচার"],
    },
  ],
};

export const packages: CateringPackage[] = [
  {
    id: "daily-basic",
    name: "ডেইলি বেসিক প্যাকেজ",
    pricePerMeal: 120,
    description: "সাশ্রয়ী দৈনন্দিন অফিস মিল, সহজ ও পরিচিত খাবার।",
    popular: true,
    days: dayOrder.map((day) => ({
      day,
      variants: dailyBasicVariants[day],
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
