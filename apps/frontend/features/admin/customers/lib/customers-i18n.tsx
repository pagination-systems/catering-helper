import { useLanguage } from "@/providers/language-provider";

type CustomersContent = {
  title: string;
  description: string;
  toolbar: {
    searchPlaceholder: string;
    role: string;
    status: string;
    createCustomer: string;
  };
  table: {
    name: string;
    phone: string;
    role: string;
    created: string;
    lastUpdated: string;
    actions: string;
    idLabel: string;
    noCustomers: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    createCustomer: string;
    saveChanges: string;
    validation: {
      nameMin: string;
      phoneMin: string;
    };
  };
  details: {
    contact: string;
    phoneNumber: string;
    systemInfo: string;
    userId: string;
    roleLabel: string;
    activity: string;
    createdLabel: string;
    lastUpdatedLabel: string;
    noCustomer: string;
    title: string;
  };
  sheet: {
    createTitle: string;
    createDescription: string;
    editTitle: string;
    editDescription: string;
    viewTitle: string;
    viewDescription: string;
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
    edit: string;
    delete: string;
    openActionsFor: string;
  };
};

const content: Record<string, CustomersContent> = {
  en: {
    title: "Customers",
    description: "Manage customer information, contact details, and access.",
    toolbar: {
      searchPlaceholder: "Search by name, phone, or id",
      role: "Role",
      status: "Status",
      createCustomer: "Create Customer",
    },
    table: {
      name: "Name",
      phone: "Phone",
      role: "Role",
      created: "Created",
      lastUpdated: "Last Updated",
      actions: "Actions",
      idLabel: "ID:",
      noCustomers: "No customers found for your current query and filters.",
    },
    form: {
      nameLabel: "Full Name",
      namePlaceholder: "Enter full name",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter phone number",
      createCustomer: "Create Customer",
      saveChanges: "Save Changes",
      validation: {
        nameMin: "Name must be at least 2 characters.",
        phoneMin: "Phone number must be at least 10 characters.",
      },
    },
    details: {
      contact: "Contact",
      phoneNumber: "Phone Number",
      systemInfo: "System Information",
      userId: "User ID",
      roleLabel: "Role",
      activity: "Activity",
      createdLabel: "Created",
      lastUpdatedLabel: "Last Updated",
      noCustomer: "No customer found.",
      title: "Customer Details",
    },
    sheet: {
      createTitle: "Create Customer",
      createDescription: "Add a new customer to the system.",
      editTitle: "Edit Customer",
      editDescription: "Update customer details and role access.",
      viewTitle: "Customer Details",
      viewDescription: "Review the selected customer's profile and role access.",
    },
    delete: {
      title: "Delete customer?",
      confirmMessage: "Are you sure you want to delete {{name}}? This action cannot be undone.",
      confirmMessageGeneric: "Are you sure you want to delete this customer? This action cannot be undone.",
      confirmText: "Type delete-customer to confirm.",
      confirmKeyword: "delete-customer",
      cancel: "Cancel",
      confirm: "Yes, Delete",
    },
    actions: {
      view: "View",
      edit: "Edit",
      delete: "Delete",
      openActionsFor: "Open actions for {{name}}",
    },
  },
  bn: {
    title: "গ্রাহক",
    description: "গ্রাহকের তথ্য, যোগাযোগের বিবরণ এবং অ্যাক্সেস পরিচালনা করুন।",
    toolbar: {
      searchPlaceholder: "নাম, ফোন বা আইডি দিয়ে অনুসন্ধান করুন",
      role: "ভূমিকা",
      status: "স্ট্যাটাস",
      createCustomer: "গ্রাহক তৈরি করুন",
    },
    table: {
      name: "নাম",
      phone: "ফোন নম্বর",
      role: "ভূমিকা",
      created: "তৈরির তারিখ",
      lastUpdated: "সর্বশেষ আপডেট",
      actions: "অ্যাকশন",
      idLabel: "আইডি:",
      noCustomers: "আপনার অনুসন্ধান বা ফিল্টার অনুযায়ী কোনো গ্রাহক পাওয়া যায়নি।",
    },
    form: {
      nameLabel: "পূর্ণ নাম",
      namePlaceholder: "পূর্ণ নাম লিখুন",
      phoneLabel: "ফোন নম্বর",
      phonePlaceholder: "ফোন নম্বর লিখুন",
      createCustomer: "গ্রাহক তৈরি করুন",
      saveChanges: "পরিবর্তন সংরক্ষণ করুন",
      validation: {
        nameMin: "নাম কমপক্ষে ২ অক্ষরের হতে হবে।",
        phoneMin: "ফোন নম্বর কমপক্ষে ১০ অক্ষরের হতে হবে।",
      },
    },
    details: {
      contact: "যোগাযোগ",
      phoneNumber: "ফোন নম্বর",
      systemInfo: "সিস্টেম তথ্য",
      userId: "ব্যবহারকারী আইডি",
      roleLabel: "ভূমিকা",
      activity: "কার্যক্রম",
      createdLabel: "তৈরির তারিখ",
      lastUpdatedLabel: "সর্বশেষ আপডেট",
      noCustomer: "কোনো গ্রাহক পাওয়া যায়নি।",
      title: "গ্রাহকের বিস্তারিত",
    },
    sheet: {
      createTitle: "গ্রাহক তৈরি করুন",
      createDescription: "সিস্টেমে নতুন গ্রাহক যুক্ত করুন।",
      editTitle: "গ্রাহক সম্পাদনা করুন",
      editDescription: "গ্রাহকের তথ্য এবং ভূমিকা আপডেট করুন।",
      viewTitle: "গ্রাহকের বিস্তারিত",
      viewDescription: "নির্বাচিত গ্রাহকের তথ্য এবং ভূমিকা পর্যালোচনা করুন।",
    },
    delete: {
      title: "গ্রাহক মুছে ফেলতে চান?",
      confirmMessage: "আপনি কি {{name}} মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmMessageGeneric: "আপনি কি এই গ্রাহক মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmText: "নিশ্চিত করতে delete-customer লিখুন।",
      confirmKeyword: "delete-customer",
      cancel: "বাতিল করুন",
      confirm: "হ্যাঁ, মুছে ফেলুন",
    },
    actions: {
      view: "দেখুন",
      edit: "সম্পাদনা করুন",
      delete: "মুছে ফেলুন",
      openActionsFor: "{{name}} এর জন্য অ্যাকশন খুলুন",
    },
  },
};

export const useCustomersI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getCustomersContent = (lang: string) => {
  return content[lang] ?? content.en;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
