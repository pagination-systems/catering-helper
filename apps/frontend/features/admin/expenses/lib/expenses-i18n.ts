import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

export type ExpensesContent = {
  title: string;
  description: string;
  sheet: {
    createTitle: string;
    createDescription: string;
    editTitle: string;
    editDescription: string;
    detailsTitle: string;
    detailsDescription: string;
    noExpenseSelected: string;
  };
  toolbar: {
    searchPlaceholder: string;
    filter: string;
    category: string;
    resetFilters: string;
    download: string;
    downloadPreparing: string;
    addExpense: string;
  };
  table: {
    label: string;
    category: string;
    amount: string;
    date: string;
    actions: string;
    noExpenses: string;
  };
  details: {
    label: string;
    category: string;
    date: string;
    amount: string;
    description: string;
  };
  form: {
    label: string;
    labelPlaceholder: string;
    date: string;
    datePlaceholder: string;
    category: string;
    amount: string;
    amountPlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    submitCreate: string;
    submitSave: string;
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
  pdf: {
    title: string;
    phone: string;
    totalRecords: string;
    generated: string;
    date: string;
    label: string;
    category: string;
    description: string;
    amount: string;
    total: string;
    pageOf: string;
  };
};

const content: Record<Language, ExpensesContent> = {
  en: {
    title: "Expenses",
    description: "Log and review admin expenses.",
    sheet: {
      createTitle: "Add Expense",
      createDescription: "Enter expense details below.",
      editTitle: "Edit Expense",
      editDescription: "Update the expense details below.",
      detailsTitle: "Expense Details",
      detailsDescription: "Review the selected expense.",
      noExpenseSelected: "No expense selected.",
    },
    toolbar: {
      searchPlaceholder: "Search by label, description, category",
      filter: "Filter",
      category: "Category",
      resetFilters: "Reset Filters",
      download: "Download",
      downloadPreparing: "Preparing...",
      addExpense: "Add Expense",
    },
    table: {
      label: "Label",
      category: "Category",
      amount: "Amount",
      date: "Date",
      actions: "Actions",
      noExpenses: "No expenses found for your current query and filters.",
    },
    details: {
      label: "Label",
      category: "Category",
      date: "Date",
      amount: "Amount",
      description: "Description",
    },
    form: {
      label: "Label",
      labelPlaceholder: "Expense label",
      date: "Date",
      datePlaceholder: "Pick a date",
      category: "Category",
      amount: "Amount",
      amountPlaceholder: "Enter amount",
      description: "Description",
      descriptionPlaceholder: "Optional description",
      submitCreate: "Add Expense",
      submitSave: "Save Changes",
    },
    delete: {
      title: "Delete expense?",
      confirmMessage: "Are you sure you want to delete {{label}}? This action cannot be undone.",
      confirmMessageGeneric: "Are you sure you want to delete this expense? This action cannot be undone.",
      confirmText: "Type delete-expense to confirm.",
      confirmKeyword: "delete-expense",
      cancel: "Cancel",
      confirm: "Yes, Delete",
    },
    actions: {
      view: "View",
      edit: "Edit",
      delete: "Delete",
      openActionsFor: "Open actions for {{label}}",
    },
    pdf: {
      title: "Expenses Report",
      phone: "Phone",
      totalRecords: "Total Records",
      generated: "Generated",
      date: "Date",
      label: "Label",
      category: "Category",
      description: "Description",
      amount: "Amount",
      total: "Total",
      pageOf: "Page {{page}} of {{total}}",
    },
  },
  bn: {
    title: "খরচ",
    description: "অ্যাডমিনের সকল খরচ সংরক্ষণ ও পর্যালোচনা করুন।",

    sheet: {
      createTitle: "খরচ যোগ করুন",
      createDescription: "নতুন খরচের বিস্তারিত তথ্য দিন।",
      editTitle: "খরচ সম্পাদনা করুন",
      editDescription: "বিদ্যমান খরচের তথ্য আপডেট করুন।",
      detailsTitle: "খরচের বিস্তারিত",
      detailsDescription: "নির্বাচিত খরচের সম্পূর্ণ তথ্য দেখুন।",
      noExpenseSelected: "কোনো খরচ নির্বাচন করা হয়নি।",
    },

    toolbar: {
      searchPlaceholder: "লেবেল, বিবরণ বা ক্যাটাগরি দিয়ে খুঁজুন",
      filter: "ফিল্টার",
      category: "ক্যাটাগরি",
      resetFilters: "ফিল্টার রিসেট করুন",
      download: "ডাউনলোড",
      downloadPreparing: "ফাইল প্রস্তুত হচ্ছে...",
      addExpense: "খরচ যোগ করুন",
    },

    table: {
      label: "লেবেল",
      category: "ক্যাটাগরি",
      amount: "পরিমাণ",
      date: "তারিখ",
      actions: "অ্যাকশন",
      noExpenses: "আপনার অনুসন্ধান অনুযায়ী কোনো খরচ পাওয়া যায়নি।",
    },

    details: {
      label: "লেবেল",
      category: "ক্যাটাগরি",
      date: "তারিখ",
      amount: "পরিমাণ",
      description: "বিবরণ",
    },

    form: {
      label: "লেবেল",
      labelPlaceholder: "খরচের লেবেল লিখুন",
      date: "তারিখ",
      datePlaceholder: "তারিখ নির্বাচন করুন",
      category: "ক্যাটাগরি",
      amount: "পরিমাণ",
      amountPlaceholder: "পরিমাণ লিখুন",
      description: "বিবরণ",
      descriptionPlaceholder: "ঐচ্ছিক বিবরণ লিখুন",
      submitCreate: "খরচ যোগ করুন",
      submitSave: "পরিবর্তন সংরক্ষণ করুন",
    },

    delete: {
      title: "খরচ মুছবেন?",
      confirmMessage: "{{label}} মুছতে চান কি? এই কাজটি আর ফেরত আনা যাবে না।",
      confirmMessageGeneric: "এই খরচটি মুছতে চান কি? এই কাজটি আর ফেরত আনা যাবে না।",
      confirmText: "নিশ্চিত করতে delete-expense লিখুন।",
      confirmKeyword: "delete-expense",
      cancel: "বাতিল",
      confirm: "মুছে ফেলুন",
    },

    actions: {
      view: "দেখুন",
      edit: "সম্পাদনা করুন",
      delete: "মুছুন",
      openActionsFor: "{{label}} এর জন্য অ্যাকশন খুলুন",
    },

    pdf: {
      title: "খরচ রিপোর্ট",
      phone: "ফোন",
      totalRecords: "মোট রেকর্ড",
      generated: "তৈরি হয়েছে",
      date: "তারিখ",
      label: "লেবেল",
      category: "ক্যাটাগরি",
      description: "বিবরণ",
      amount: "পরিমাণ",
      total: "মোট",
      pageOf: "পৃষ্ঠা {{page}} / {{total}}",
    },
  },
};

export const useExpensesI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getExpensesContent = (lang: Language) => {
  return content[lang] ?? content.en;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
