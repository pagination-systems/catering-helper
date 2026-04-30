import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

export type ProfileContent = {
  pageTitle: string;
  pageDescription: string;
  personal: {
    cardTitle: string;
    cardDescription: string;
    nameLabel: string;
    namePlaceholder: string;
    nameDescription: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailDescription: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneDescription: string;
  };
  security: {
    cardTitle: string;
    cardDescription: string;
    currentPasswordLabel: string;
    currentPasswordPlaceholder: string;
    newPasswordLabel: string;
    newPasswordPlaceholder: string;
    newPasswordDescription: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
  };
  buttons: {
    reset: string;
    savePersonal: string;
    saveSecurity: string;
    saving: string;
  };
};

const content: Record<Language, ProfileContent> = {
  en: {
    pageTitle: "My Profile",
    pageDescription: "Manage your account settings and preferences.",
    personal: {
      cardTitle: "Personal Information",
      cardDescription: "Update your basic profile information.",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      nameDescription: "This is your public display name.",
      emailLabel: "Email Address",
      emailPlaceholder: "your.email@example.com",
      emailDescription: "We'll use this for important account notifications.",
      phoneLabel: "Phone Number",
      phonePlaceholder: "01XXXXXXXXX",
      phoneDescription: "Use a valid Bangladesh phone number format (e.g., 01XXXXXXXXX).",
    },
    security: {
      cardTitle: "Security Settings",
      cardDescription: "Update your account password.",
      currentPasswordLabel: "Current Password",
      currentPasswordPlaceholder: "Enter your current password",
      newPasswordLabel: "New Password",
      newPasswordPlaceholder: "Enter your new password",
      newPasswordDescription: "Must be at least 8 characters with uppercase, lowercase, and numbers.",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your new password",
    },
    buttons: {
      reset: "Reset",
      savePersonal: "Save Personal Info",
      saveSecurity: "Save Security Settings",
      saving: "Saving...",
    },
  },
  bn: {
    pageTitle: "আমার প্রোফাইল",
    pageDescription: "আপনার অ্যাকাউন্ট সেটিংস এবং পছন্দসমূহ পরিচালনা করুন।",
    personal: {
      cardTitle: "ব্যক্তিগত তথ্য",
      cardDescription: "আপনার বেসিক প্রোফাইল তথ্য আপডেট করুন।",
      nameLabel: "পুরো নাম",
      namePlaceholder: "আপনার পুরো নাম লিখুন",
      nameDescription: "এটি আপনার পাবলিক ডিসপ্লে নাম হবে।",
      emailLabel: "ইমেইল ঠিকানা",
      emailPlaceholder: "your.email@example.com",
      emailDescription: "গুরুত্বপূর্ণ অ্যাকাউন্ট নোটিফিকেশনের জন্য ব্যবহার করা হবে।",
      phoneLabel: "ফোন নম্বর",
      phonePlaceholder: "01XXXXXXXXX",
      phoneDescription: "বাংলাদেশ ফোন নম্বর ফরম্যাট ব্যবহার করুন (যেমন 01XXXXXXXXX)।",
    },
    security: {
      cardTitle: "সিকিউরিটি সেটিংস",
      cardDescription: "আপনার অ্যাকাউন্ট পাসওয়ার্ড আপডেট করুন।",
      currentPasswordLabel: "বর্তমান পাসওয়ার্ড",
      currentPasswordPlaceholder: "আপনার বর্তমান পাসওয়ার্ড লিখুন",
      newPasswordLabel: "নতুন পাসওয়ার্ড",
      newPasswordPlaceholder: "নতুন পাসওয়ার্ড লিখুন",
      newPasswordDescription: "কমপক্ষে ৮ অক্ষর, বড় হাতের, ছোট হাতের এবং সংখ্যাগুলো থাকা উচিত।",
      confirmPasswordLabel: "পাসওয়ার্ড নিশ্চিত করুন",
      confirmPasswordPlaceholder: "নতুন পাসওয়ার্ড নিশ্চিত করুন",
    },
    buttons: {
      reset: "রিসেট",
      savePersonal: "ব্যক্তিগত তথ্য সংরক্ষণ করুন",
      saveSecurity: "সিকিউরিটি সেটিংস সংরক্ষণ করুন",
      saving: "সংরক্ষিত হচ্ছে...",
    },
  },
} as const;

export const useProfileI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getProfileContent = (lang: Language) => {
  return content[lang] ?? content.en;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
