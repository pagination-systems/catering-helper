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
      nameLabel: "Tenant Name",
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
    description: "টেন্যান্ট প্রোফাইল, যোগাযোগের বিবরণ এবং সোশ্যাল লিঙ্ক আপডেট করুন।",
    branding: {
      sectionLabel: "ব্র্যান্ডিং",
      cardTitle: "স্টোরফ্রন্ট পরিচয়",
      cardDescription: "গ্রাহকরা প্রথমে যে নাম, বার্তা এবং লিঙ্ক দেখেন তা আকার দিন।",
      nameLabel: "টেন্যান্ট নাম",
      namePlaceholder: "উত্তরা ক্যাটারিং",
      nameDescription: "প্রশাসন এবং গ্রাহক-মুখী সমস্ত স্ক্রিনে প্রদর্শিত হয়।",
      headlineLabel: "হেডলাইন",
      headlinePlaceholder: "প্রিমিয়াম মেনু, ঘর্ষণহীন কাস্টমাইজেশন",
      headlineDescription: "একটি ছোট লাইন যা আপনার ব্র্যান্ড প্রতিশ্রুতি সমর্থন করে।",
      logoUrlLabel: "লোগো URL",
      logoUrlPlaceholder: "https://example.com/logo.png",
      logoUrlDescription: "লোগো নির্ভরযোগ্যভাবে লোড হওয়ার জন্য একটি সরাসরি ছবির লিঙ্ক ব্যবহার করুন।",
      menuUrlLabel: "মেনু URL",
      menuUrlPlaceholder: "https://example.com/menu",
      menuUrlDescription: "জনসাধারণের মেনু, ব্রোশিওর বা অর্ডারিং পৃষ্ঠার লিঙ্ক।",
      deliveryFeeLabel: "ডেলিভারি ফি",
      deliveryFeePlaceholder: "0",
      deliveryFeeDescription: "চেকআউটে অ্যাড-অন বা ট্যাক্সের আগে প্রদর্শিত হয়।",
      lastOrderTimeLabel: "শেষ অর্ডারের সময়",
      lastOrderTimePlaceholder: "১৭:৩০",
      lastOrderTimeDescription: "গ্রাহকরা সর্বশেষ কখন অর্ডার করতে পারবে (স্থানীয় সময়)।",
      descriptionLabel: "বিবরণ",
      descriptionPlaceholder: "আপনার টেন্যান্ট প্রস্তাব এবং সেবা প্রতিশ্রুতি বর্ণনা করুন।",
      descriptionDescription: "সংক্ষিপ্ত, গ্রাহক-বান্ধব উপায়ে সেবা কী করে তোলে তা ব্যাখ্যা করুন।",
    },
    contact: {
      sectionLabel: "যোগাযোগ",
      cardTitle: "সহায়তা বিবরণ",
      cardDescription: "এগুলি বর্তমান রাখুন যাতে গ্রাহকরা আপনার সাথে সহজেই যোগাযোগ করতে পারেন।",
      emailLabel: "যোগাযোগ ইমেল",
      emailPlaceholder: "info@company.com",
      emailDescription: "অর্ডার প্রশ্ন এবং প্রশাসনিক অনুসরণের জন্য সেরা।",
      phoneLabel: "যোগাযোগ ফোন",
      phonePlaceholder: "+880 1711-000000",
      phoneDescription: "গ্রাহকদের প্রথমে যোগাযোগ করার সংখ্যা ব্যবহার করুন।",
      whatsappLabel: "হোয়াটসঅ্যাপ",
      whatsappPlaceholder: "+880 1711-000000",
      whatsappDescription: "দ্রুত গ্রাহক যোগাযোগের জন্য সহায়ক।",
      addressLabel: "ঠিকানা",
      addressPlaceholder: "১২৩ কর্পোরেট এলাকা, গুলশান ১, ঢাকা",
      addressDescription: "প্রাসঙ্গিক হলে চালান এবং যোগাযোগ পৃষ্ঠায় প্রদর্শিত হয়।",
    },
    social: {
      sectionLabel: "সোশ্যাল",
      cardTitle: "সর্বজনীন চ্যানেল",
      cardDescription: "আপনার সবচেয়ে দৃশ্যমান সোশ্যাল লিঙ্কগুলি সামঞ্জস্যপূর্ণ এবং খুঁজে পাওয়া সহজ রাখুন।",
      facebookLabel: "ফেসবুক",
      facebookPlaceholder: "https://facebook.com/your-page",
      instagramLabel: "ইনস্টাগ্রাম",
      instagramPlaceholder: "https://instagram.com/your-handle",
      youtubeLabel: "ইউটিউব",
      youtubePlaceholder: "https://youtube.com/@your-channel",
    },
    form: {
      reviewMessage: "সংরক্ষণের আগে বিবরণ পর্যালোচনা করুন।",
      reviewDescription: "এই সেটিংসগুলি আপনার টেন্যান্ট প্রোফাইল, যোগাযোগ পথ এবং সোশ্যাল উপস্থিতি আপডেট করে।",
      submitLabel: "সেটিংস সংরক্ষণ করুন",
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
