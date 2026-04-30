import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

export type SettingsContent = {
  title: string;
  description: string;
  branding: {
    sectionLabel: string;
    cardTitle: string;
    cardDescription: string;
    nameLabel: string;
    namePlaceholder: string;
    nameDescription: string;
    headlineLabel: string;
    headlinePlaceholder: string;
    headlineDescription: string;
    logoUrlLabel: string;
    logoUrlPlaceholder: string;
    logoUrlDescription: string;
    menuUrlLabel: string;
    menuUrlPlaceholder: string;
    menuUrlDescription: string;
    deliveryFeeLabel: string;
    deliveryFeePlaceholder: string;
    deliveryFeeDescription: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    descriptionDescription: string;
    lastOrderTimeLabel: string;
    lastOrderTimePlaceholder: string;
    lastOrderTimeDescription: string;
  };
  contact: {
    sectionLabel: string;
    cardTitle: string;
    cardDescription: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailDescription: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneDescription: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    whatsappDescription: string;
    addressLabel: string;
    addressPlaceholder: string;
    addressDescription: string;
  };
  social: {
    sectionLabel: string;
    cardTitle: string;
    cardDescription: string;
    facebookLabel: string;
    facebookPlaceholder: string;
    instagramLabel: string;
    instagramPlaceholder: string;
    youtubeLabel: string;
    youtubePlaceholder: string;
  };
  form: {
    reviewMessage: string;
    reviewDescription: string;
    submitLabel: string;
  };
};

const content: Record<Language, SettingsContent> = {
  en: {
    title: "Settings",
    description: "Update tenant profile, contact details, and social links.",
    branding: {
      sectionLabel: "Branding",
      cardTitle: "Storefront identity",
      cardDescription: "Shape the name, message, and links customers see first.",
      nameLabel: "Store Name",
      namePlaceholder: "Uttara Catering",
      nameDescription: "Shown across the admin and customer-facing screens.",
      headlineLabel: "Headline",
      headlinePlaceholder: "Premium Menus, Frictionless Customization",
      headlineDescription: "A short line that supports your brand promise.",
      logoUrlLabel: "Logo URL",
      logoUrlPlaceholder: "https://example.com/logo.png",
      logoUrlDescription: "Use a direct image link so the logo loads reliably.",
      menuUrlLabel: "Menu URL",
      menuUrlPlaceholder: "https://example.com/menu",
      menuUrlDescription: "Link to the public menu, brochure, or ordering page.",
      deliveryFeeLabel: "Delivery Fee",
      deliveryFeePlaceholder: "0",
      deliveryFeeDescription: "Shown at checkout before add-ons or taxes.",
      lastOrderTimeLabel: "Last Order Time",
      lastOrderTimePlaceholder: "17:30",
      lastOrderTimeDescription: "The latest time customers can place orders (local time).",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Describe your tenant proposition and service promise.",
      descriptionDescription: "Explain what makes the service different in a concise, customer-friendly way.",
    },
    contact: {
      sectionLabel: "Contact",
      cardTitle: "Support details",
      cardDescription: "Keep these current so customers can contact you without friction.",
      emailLabel: "Contact Email",
      emailPlaceholder: "info@company.com",
      emailDescription: "Best for order questions and admin follow-ups.",
      phoneLabel: "Contact Phone",
      phonePlaceholder: "+880 1711-000000",
      phoneDescription: "Use the number customers should call first.",
      whatsappLabel: "WhatsApp",
      whatsappPlaceholder: "+880 1711-000000",
      whatsappDescription: "Helpful for quick customer communication.",
      addressLabel: "Address",
      addressPlaceholder: "123 Corporate Area, Gulshan 1, Dhaka",
      addressDescription: "Shown on invoices and contact pages when relevant.",
    },
    social: {
      sectionLabel: "Social",
      cardTitle: "Public channels",
      cardDescription: "Keep your most visible social links consistent and easy to find.",
      facebookLabel: "Facebook",
      facebookPlaceholder: "https://facebook.com/your-page",
      instagramLabel: "Instagram",
      instagramPlaceholder: "https://instagram.com/your-handle",
      youtubeLabel: "YouTube",
      youtubePlaceholder: "https://youtube.com/@your-channel",
    },
    form: {
      reviewMessage: "Review the details before saving.",
      reviewDescription: "These settings update your tenant profile, contact paths, and social presence.",
      submitLabel: "Save Settings",
    },
  },
  bn: {
    title: "সেটিংস",
    description: "টেন্যান্ট প্রোফাইল, যোগাযোগের তথ্য এবং সোশ্যাল মিডিয়া লিঙ্ক আপডেট করুন।",

    branding: {
      sectionLabel: "ব্র্যান্ডিং",
      cardTitle: "স্টোরফ্রন্ট পরিচিতি",
      cardDescription: "গ্রাহকদের সামনে আপনার ব্র্যান্ড কীভাবে উপস্থাপন হবে তা নির্ধারণ করুন।",

      nameLabel: "স্টোরের নাম",
      namePlaceholder: "উত্তরা ক্যাটারিং",
      nameDescription: "অ্যাডমিন ও গ্রাহক—উভয় জায়গায় এই নামটি দেখানো হবে।",

      headlineLabel: "হেডলাইন",
      headlinePlaceholder: "প্রিমিয়াম মেনু, সহজ অর্ডারিং অভিজ্ঞতা",
      headlineDescription: "আপনার ব্র্যান্ডকে সংক্ষেপে উপস্থাপন করার একটি শক্তিশালী বাক্য।",

      logoUrlLabel: "লোগো URL",
      logoUrlPlaceholder: "https://example.com/logo.png",
      logoUrlDescription: "লোগো দেখানোর জন্য একটি সরাসরি ইমেজ লিংক দিন।",

      menuUrlLabel: "মেনু লিংক",
      menuUrlPlaceholder: "https://example.com/menu",
      menuUrlDescription: "পাবলিক মেনু বা অর্ডার পেজের লিংক দিন।",

      deliveryFeeLabel: "ডেলিভারি চার্জ",
      deliveryFeePlaceholder: "0",
      deliveryFeeDescription: "চেকআউটের আগে এই চার্জ দেখানো হবে।",

      lastOrderTimeLabel: "শেষ অর্ডারের সময়",
      lastOrderTimePlaceholder: "১৭:৩০",
      lastOrderTimeDescription: "এই সময়ের পর নতুন অর্ডার গ্রহণ করা হবে না।",

      descriptionLabel: "বিবরণ",
      descriptionPlaceholder: "আপনার সেবা এবং বিশেষত্ব সম্পর্কে সংক্ষেপে লিখুন।",
      descriptionDescription: "গ্রাহকদের জন্য আপনার সার্ভিস কীভাবে আলাদা তা সহজভাবে ব্যাখ্যা করুন।",
    },

    contact: {
      sectionLabel: "যোগাযোগ",
      cardTitle: "যোগাযোগের তথ্য",
      cardDescription: "গ্রাহকদের সাথে সহজ যোগাযোগের জন্য তথ্যগুলো আপডেট রাখুন।",

      emailLabel: "ইমেইল",
      emailPlaceholder: "info@company.com",
      emailDescription: "অর্ডার ও প্রশাসনিক যোগাযোগের জন্য ব্যবহৃত হবে।",

      phoneLabel: "ফোন নম্বর",
      phonePlaceholder: "+880 1711-000000",
      phoneDescription: "গ্রাহকদের প্রধান যোগাযোগ নম্বর।",

      whatsappLabel: "হোয়াটসঅ্যাপ",
      whatsappPlaceholder: "+880 1711-000000",
      whatsappDescription: "দ্রুত যোগাযোগের জন্য ব্যবহার করুন।",

      addressLabel: "ঠিকানা",
      addressPlaceholder: "১২৩ কর্পোরেট এরিয়া, গুলশান ১, ঢাকা",
      addressDescription: "ইনভয়েস এবং যোগাযোগ পৃষ্ঠায় দেখানো হবে।",
    },

    social: {
      sectionLabel: "সোশ্যাল মিডিয়া",
      cardTitle: "অনলাইন উপস্থিতি",
      cardDescription: "আপনার সোশ্যাল মিডিয়া লিংকগুলো এক জায়গায় রাখুন।",

      facebookLabel: "ফেসবুক",
      facebookPlaceholder: "https://facebook.com/your-page",

      instagramLabel: "ইনস্টাগ্রাম",
      instagramPlaceholder: "https://instagram.com/your-handle",

      youtubeLabel: "ইউটিউব",
      youtubePlaceholder: "https://youtube.com/@your-channel",
    },

    form: {
      reviewMessage: "সংরক্ষণ করার আগে তথ্যগুলো যাচাই করুন।",
      reviewDescription: "এই সেটিংসগুলো আপনার টেন্যান্ট প্রোফাইল ও কাস্টমার এক্সপেরিয়েন্সে প্রভাব ফেলবে।",
      submitLabel: "সংরক্ষণ করুন",
    },
  },
} as const;

export const useSettingsI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getSettingsContent = (lang: Language) => {
  return content[lang] ?? content.en;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
