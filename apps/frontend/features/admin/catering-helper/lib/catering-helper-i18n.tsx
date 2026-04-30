import { useLanguage } from "@/providers/language-provider";

type CateringHelperContent = {
  title: string;
  description: string;
  toolbar: {
    searchPlaceholder: string;
    viewInvitations: string;
    inviteAdmin: string;
  };
  table: {
    name: string;
    phone: string;
    role: string;
    created: string;
    lastUpdated: string;
    actions: string;
    noUsers: string;
  };
  details: {
    contact: string;
    emailAddress: string;
    systemInfo: string;
    userId: string;
    roleLabel: string;
    activity: string;
    createdLabel: string;
    lastUpdatedLabel: string;
    noUser: string;
    title: string;
  };
  invitation: {
    title: string;
    description: string;
    phoneLabel: string;
    phonePlaceholder: string;
    sendInvitation: string;
  };
  sentInvitations: {
    title: string;
    description: string;
    phone: string;
    lastSent: string;
    actions: string;
    noInvitations: string;
    resend: string;
    copyLink: string;
  };
  delete: {
    title: string;
    confirmMessage: string;
    confirmMessageGeneric: string;
    confirmText: string;
    confirmKeyword: string;
    cancel: string;
    confirm: string;
  };
  actions: {
    view: string;
    delete: string;
    openActionsFor: string;
  };
};

const content: Record<string, CateringHelperContent> = {
  en: {
    title: "Platform Admins",
    description: "Manage platform administrators and their permissions.",
    toolbar: {
      searchPlaceholder: "Search by name, email or id",
      viewInvitations: "View Sent Invitations",
      inviteAdmin: "Invite Platform Admin",
    },
    table: {
      name: "Name",
      phone: "Phone",
      role: "Role",
      created: "Created",
      lastUpdated: "Last Updated",
      actions: "Actions",
      noUsers: "No users found for your current query and filters.",
    },
    details: {
      contact: "Contact",
      emailAddress: "Email Address",
      systemInfo: "System Information",
      userId: "User ID",
      roleLabel: "Role",
      activity: "Activity",
      createdLabel: "Created",
      lastUpdatedLabel: "Last Updated",
      noUser: "No user found.",
      title: "User Details",
    },
    invitation: {
      title: "Invite New Platform Admin",
      description: "Add a new platform admin and assign role access.",
      phoneLabel: "Phone",
      phonePlaceholder: "Enter phone number",
      sendInvitation: "Send Invitation",
    },
    sentInvitations: {
      title: "Sent Invitations",
      description: "Review recently invited users, resend invitations, or remove them from the list.",
      phone: "Phone",
      lastSent: "Last Sent",
      actions: "Actions",
      noInvitations: "No sent invitations yet.",
      resend: "Resend",
      copyLink: "Copy link",
    },
    delete: {
      title: "Delete Platform Admin?",
      confirmMessage: "Are you sure you want to delete {{name}}? This action cannot be undone.",
      confirmMessageGeneric: "Are you sure you want to delete this platform admin? This action cannot be undone.",
      confirmText: "Type delete-platform-admin to confirm.",
      confirmKeyword: "delete-platform-admin",
      cancel: "Cancel",
      confirm: "Yes, Delete",
    },
    actions: {
      view: "View",
      delete: "Delete",
      openActionsFor: "Open actions for {{name}}",
    },
  },
  bn: {
    title: "প্ল্যাটফর্ম অ্যাডমিন",
    description: "প্ল্যাটফর্ম অ্যাডমিন এবং তাদের অনুমতিসমূহ পরিচালনা করুন।",
    toolbar: {
      searchPlaceholder: "নাম, ইমেইল বা আইডি দিয়ে অনুসন্ধান করুন",
      viewInvitations: "পাঠানো আমন্ত্রণসমূহ দেখুন",
      inviteAdmin: "প্ল্যাটফর্ম অ্যাডমিন আমন্ত্রণ জানান",
    },
    table: {
      name: "নাম",
      phone: "ফোন নম্বর",
      role: "ভূমিকা",
      created: "তৈরির তারিখ",
      lastUpdated: "সর্বশেষ আপডেট",
      actions: "অ্যাকশন",
      noUsers: "আপনার অনুসন্ধান বা ফিল্টার অনুযায়ী কোনো ব্যবহারকারী পাওয়া যায়নি।",
    },
    details: {
      contact: "যোগাযোগ",
      emailAddress: "ইমেইল ঠিকানা",
      systemInfo: "সিস্টেম তথ্য",
      userId: "ব্যবহারকারী আইডি",
      roleLabel: "ভূমিকা",
      activity: "কার্যক্রম",
      createdLabel: "তৈরির তারিখ",
      lastUpdatedLabel: "সর্বশেষ আপডেট",
      noUser: "কোনো ব্যবহারকারী পাওয়া যায়নি।",
      title: "ব্যবহারকারীর বিস্তারিত",
    },
    invitation: {
      title: "নতুন প্ল্যাটফর্ম অ্যাডমিন আমন্ত্রণ জানান",
      description: "নতুন প্ল্যাটফর্ম অ্যাডমিন যোগ করুন এবং প্রয়োজনীয় ভূমিকা নির্ধারণ করুন।",
      phoneLabel: "ফোন নম্বর",
      phonePlaceholder: "ফোন নম্বর লিখুন",
      sendInvitation: "আমন্ত্রণ পাঠান",
    },
    sentInvitations: {
      title: "পাঠানো আমন্ত্রণসমূহ",
      description: "সাম্প্রতিক আমন্ত্রিত ব্যবহারকারীদের দেখুন, পুনরায় আমন্ত্রণ পাঠান অথবা তালিকা থেকে সরান।",
      phone: "ফোন নম্বর",
      lastSent: "সর্বশেষ পাঠানো",
      actions: "অ্যাকশন",
      noInvitations: "এখনও কোনো আমন্ত্রণ পাঠানো হয়নি।",
      resend: "পুনরায় পাঠান",
      copyLink: "লিঙ্ক কপি করুন",
    },
    delete: {
      title: "প্ল্যাটফর্ম অ্যাডমিন মুছতে চান?",
      confirmMessage: "আপনি কি {{name}} মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmMessageGeneric: "আপনি কি এই প্ল্যাটফর্ম অ্যাডমিন মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmText: "নিশ্চিত করতে delete-platform-admin লিখুন।",
      confirmKeyword: "delete-platform-admin",
      cancel: "বাতিল করুন",
      confirm: "হ্যাঁ, মুছে ফেলুন",
    },
    actions: {
      view: "দেখুন",
      delete: "মুছে ফেলুন",
      openActionsFor: "{{name}} এর জন্য অ্যাকশন খুলুন",
    },
  },
};

export const useCateringHelperI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getCateringHelperContent = (lang: string) => {
  return content[lang] ?? content.en;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
