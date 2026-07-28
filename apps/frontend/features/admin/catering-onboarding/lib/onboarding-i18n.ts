import { TENANT_STATUS_ENUMS } from "@catering/types";
import { useLanguage } from "@/providers/language-provider";

type FieldText = { label: string; placeholder: string };

type OnboardingContent = {
  title: string;
  description: string;
  sections: {
    account: string;
    accountHint: string;
    profile: string;
    profileHint: string;
    discovery: string;
    discoveryHint: string;
    branding: string;
    brandingHint: string;
    contact: string;
    contactHint: string;
    social: string;
    socialHint: string;
  };
  fields: {
    ownerFirstName: FieldText;
    ownerLastName: FieldText;
    ownerEmail: FieldText;
    ownerPassword: FieldText;
    name: FieldText;
    slug: FieldText;
    headline: FieldText;
    description: FieldText;
    status: FieldText;
    phone: FieldText;
    coverImageUrl: FieldText;
    location: FieldText;
    area: FieldText;
    cuisines: FieldText;
    startingPrice: FieldText;
    minimumOrder: FieldText;
    deliveryFee: FieldText;
    popular: { label: string; hint: string };
    logoUrl: FieldText;
    menuUrl: FieldText;
    contactEmail: FieldText;
    contactPhone: FieldText;
    contactWhatsapp: FieldText;
    contactAddress: FieldText;
    socialFacebookUrl: FieldText;
    socialInstagramUrl: FieldText;
    socialYoutubeUrl: FieldText;
  };
  statusLabels: Record<TENANT_STATUS_ENUMS, string>;
  cuisineAdd: string;
  areaPlaceholder: string;
  submit: string;
  submitting: string;
  reset: string;
};

const content: Record<string, OnboardingContent> = {
  en: {
    title: "Catering Onboarding",
    description: "Register a new caterer with everything needed for their directory listing and storefront.",
    sections: {
      account: "Owner login",
      accountHint: "Credentials the caterer uses to sign in to their admin panel.",
      profile: "Profile",
      profileHint: "Core identity and storefront URL.",
      discovery: "Discovery & listing",
      discoveryHint: "How the caterer appears on the public directory.",
      branding: "Branding & menu",
      brandingHint: "Logo and menu shown on the storefront.",
      contact: "Contact",
      contactHint: "How customers reach the caterer.",
      social: "Social links",
      socialHint: "Optional social profiles.",
    },
    fields: {
      ownerFirstName: { label: "Owner first name", placeholder: "e.g. Karim" },
      ownerLastName: { label: "Owner last name", placeholder: "e.g. Rahman" },
      ownerEmail: { label: "Login email", placeholder: "owner@example.com" },
      ownerPassword: { label: "Temporary password", placeholder: "At least 8 characters" },
      name: { label: "Caterer name", placeholder: "e.g. Uttara Catering" },
      slug: { label: "Storefront URL (slug)", placeholder: "uttara-catering" },
      headline: { label: "Headline", placeholder: "Premium menus, frictionless customization" },
      description: { label: "Description", placeholder: "Short summary shown on the listing card and storefront." },
      status: { label: "Status", placeholder: "Select status" },
      phone: { label: "Phone", placeholder: "01XXXXXXXXX" },
      coverImageUrl: { label: "Cover image URL", placeholder: "https://…" },
      location: { label: "Location", placeholder: "Gulshan, Dhaka" },
      area: { label: "Area", placeholder: "Select area" },
      cuisines: { label: "Cuisines", placeholder: "Add a cuisine and press Enter" },
      startingPrice: { label: "Starting price (per meal)", placeholder: "120" },
      minimumOrder: { label: "Minimum order (meals)", placeholder: "10" },
      deliveryFee: { label: "Delivery fee", placeholder: "60" },
      popular: { label: "Featured as popular", hint: "Highlight this caterer on the directory." },
      logoUrl: { label: "Logo URL", placeholder: "https://…" },
      menuUrl: { label: "Menu URL", placeholder: "https://…" },
      contactEmail: { label: "Contact email", placeholder: "info@example.com" },
      contactPhone: { label: "Contact phone", placeholder: "01XXXXXXXXX" },
      contactWhatsapp: { label: "WhatsApp", placeholder: "01XXXXXXXXX" },
      contactAddress: { label: "Address", placeholder: "House, road, area, city" },
      socialFacebookUrl: { label: "Facebook", placeholder: "https://facebook.com/…" },
      socialInstagramUrl: { label: "Instagram", placeholder: "https://instagram.com/…" },
      socialYoutubeUrl: { label: "YouTube", placeholder: "https://youtube.com/@…" },
    },
    statusLabels: {
      [TENANT_STATUS_ENUMS.ACTIVE]: "Active",
      [TENANT_STATUS_ENUMS.TERMINATED]: "Terminated",
      [TENANT_STATUS_ENUMS.SUSPENDED]: "Suspended",
    },
    cuisineAdd: "Add",
    areaPlaceholder: "Select area",
    submit: "Onboard caterer",
    submitting: "Onboarding…",
    reset: "Reset",
  },
  bn: {
    title: "ক্যাটারিং অনবোর্ডিং",
    description: "ডিরেক্টরি লিস্টিং ও স্টোরফ্রন্টের জন্য প্রয়োজনীয় সব তথ্যসহ একজন নতুন ক্যাটারার নিবন্ধন করুন।",
    sections: {
      account: "মালিকের লগইন",
      accountHint: "ক্যাটারার যে তথ্য দিয়ে তার অ্যাডমিন প্যানেলে সাইন ইন করবেন।",
      profile: "প্রোফাইল",
      profileHint: "মূল পরিচিতি ও স্টোরফ্রন্ট URL।",
      discovery: "ডিসকভারি ও লিস্টিং",
      discoveryHint: "পাবলিক ডিরেক্টরিতে ক্যাটারার যেভাবে দেখাবে।",
      branding: "ব্র্যান্ডিং ও মেনু",
      brandingHint: "স্টোরফ্রন্টে দেখানো লোগো ও মেনু।",
      contact: "যোগাযোগ",
      contactHint: "গ্রাহকরা যেভাবে ক্যাটারারের সাথে যোগাযোগ করবেন।",
      social: "সোশ্যাল লিংক",
      socialHint: "ঐচ্ছিক সোশ্যাল প্রোফাইল।",
    },
    fields: {
      ownerFirstName: { label: "মালিকের নামের প্রথম অংশ", placeholder: "যেমন করিম" },
      ownerLastName: { label: "মালিকের নামের শেষ অংশ", placeholder: "যেমন রহমান" },
      ownerEmail: { label: "লগইন ইমেইল", placeholder: "owner@example.com" },
      ownerPassword: { label: "অস্থায়ী পাসওয়ার্ড", placeholder: "কমপক্ষে ৮ অক্ষর" },
      name: { label: "ক্যাটারারের নাম", placeholder: "যেমন উত্তরা ক্যাটারিং" },
      slug: { label: "স্টোরফ্রন্ট URL (slug)", placeholder: "uttara-catering" },
      headline: { label: "হেডলাইন", placeholder: "প্রিমিয়াম মেনু, সহজ কাস্টমাইজেশন" },
      description: { label: "বিবরণ", placeholder: "লিস্টিং কার্ড ও স্টোরফ্রন্টে দেখানো সংক্ষিপ্ত বিবরণ।" },
      status: { label: "স্ট্যাটাস", placeholder: "স্ট্যাটাস নির্বাচন করুন" },
      phone: { label: "ফোন", placeholder: "01XXXXXXXXX" },
      coverImageUrl: { label: "কভার ইমেজ URL", placeholder: "https://…" },
      location: { label: "অবস্থান", placeholder: "গুলশান, ঢাকা" },
      area: { label: "এলাকা", placeholder: "এলাকা নির্বাচন করুন" },
      cuisines: { label: "কুইজিন", placeholder: "একটি কুইজিন লিখে Enter চাপুন" },
      startingPrice: { label: "শুরুর মূল্য (প্রতি মিল)", placeholder: "120" },
      minimumOrder: { label: "ন্যূনতম অর্ডার (মিল)", placeholder: "10" },
      deliveryFee: { label: "ডেলিভারি ফি", placeholder: "60" },
      popular: { label: "জনপ্রিয় হিসেবে ফিচার করুন", hint: "ডিরেক্টরিতে এই ক্যাটারারকে হাইলাইট করুন।" },
      logoUrl: { label: "লোগো URL", placeholder: "https://…" },
      menuUrl: { label: "মেনু URL", placeholder: "https://…" },
      contactEmail: { label: "যোগাযোগ ইমেইল", placeholder: "info@example.com" },
      contactPhone: { label: "যোগাযোগ ফোন", placeholder: "01XXXXXXXXX" },
      contactWhatsapp: { label: "হোয়াটসঅ্যাপ", placeholder: "01XXXXXXXXX" },
      contactAddress: { label: "ঠিকানা", placeholder: "বাসা, রোড, এলাকা, শহর" },
      socialFacebookUrl: { label: "ফেসবুক", placeholder: "https://facebook.com/…" },
      socialInstagramUrl: { label: "ইনস্টাগ্রাম", placeholder: "https://instagram.com/…" },
      socialYoutubeUrl: { label: "ইউটিউব", placeholder: "https://youtube.com/@…" },
    },
    statusLabels: {
      [TENANT_STATUS_ENUMS.ACTIVE]: "সক্রিয়",
      [TENANT_STATUS_ENUMS.TERMINATED]: "বন্ধ",
      [TENANT_STATUS_ENUMS.SUSPENDED]: "স্থগিত",
    },
    cuisineAdd: "যোগ করুন",
    areaPlaceholder: "এলাকা নির্বাচন করুন",
    submit: "ক্যাটারার অনবোর্ড করুন",
    submitting: "অনবোর্ড করা হচ্ছে…",
    reset: "রিসেট",
  },
};

export const useOnboardingI18n = (): OnboardingContent => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};
