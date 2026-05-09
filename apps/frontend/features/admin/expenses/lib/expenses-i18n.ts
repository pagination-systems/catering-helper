import { EXPENSE_CATEGORY_ENUM } from "@catering/types";
import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";
import type { ExpenseValidationMessages } from "../schemas/expense.schema";

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
  categories: Record<EXPENSE_CATEGORY_ENUM, string>;
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
    validation: ExpenseValidationMessages;
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
    footerModule: string;
    filePrefix: string;
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
    categories: {
      [EXPENSE_CATEGORY_ENUM.FOOD_AND_RAW_MATERIALS]: "Food & Raw Materials",
      [EXPENSE_CATEGORY_ENUM.LABOR]: "Labor",
      [EXPENSE_CATEGORY_ENUM.TRANSPORT]: "Transport",
      [EXPENSE_CATEGORY_ENUM.RENT]: "Rent",
      [EXPENSE_CATEGORY_ENUM.UTILITIES]: "Utilities",
      [EXPENSE_CATEGORY_ENUM.MARKETING_AND_SALES]: "Marketing & Sales",
      [EXPENSE_CATEGORY_ENUM.SOFTWARE]: "Software",
      [EXPENSE_CATEGORY_ENUM.OTHER]: "Other",
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
      validation: {
        labelRequired: "Label is required.",
        dateRequired: "Date is required.",
        dateFuture: "Date cannot be in the future.",
        amountNumber: "Amount must be a number.",
        amountFinite: "Amount must be a valid number.",
        amountGtZero: "Amount must be greater than 0.",
      },
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
      title: "Expenses",
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
      footerModule: "Expenses",
      filePrefix: "expenses",
    },
  },
  bn: {
    title: "খরচসমূহ",
    description: "অ্যাডমিন খরচ লগ করুন এবং পর্যালোচনা করুন।",
    sheet: {
      createTitle: "খরচ যোগ করুন",
      createDescription: "নিচে খরচের বিস্তারিত তথ্য লিখুন।",
      editTitle: "খরচ সম্পাদনা করুন",
      editDescription: "নিচে খরচের তথ্য আপডেট করুন।",
      detailsTitle: "খরচের বিবরণ",
      detailsDescription: "নির্বাচিত খরচটি পর্যালোচনা করুন।",
      noExpenseSelected: "কোনো খরচ নির্বাচন করা হয়নি।",
    },
    toolbar: {
      searchPlaceholder: "লেবেল, বিবরণ, ক্যাটাগরি দিয়ে অনুসন্ধান করুন",
      filter: "ফিল্টার",
      category: "ক্যাটাগরি",
      resetFilters: "ফিল্টার রিসেট করুন",
      download: "ডাউনলোড",
      downloadPreparing: "প্রস্তুত করছে...",
      addExpense: "খরচ যোগ করুন",
    },
    categories: {
      [EXPENSE_CATEGORY_ENUM.FOOD_AND_RAW_MATERIALS]: "খাদ্য ও কাঁচামাল",
      [EXPENSE_CATEGORY_ENUM.LABOR]: "শ্রম",
      [EXPENSE_CATEGORY_ENUM.TRANSPORT]: "পরিবহন",
      [EXPENSE_CATEGORY_ENUM.RENT]: "ভাড়া",
      [EXPENSE_CATEGORY_ENUM.UTILITIES]: "ইউটিলিটি",
      [EXPENSE_CATEGORY_ENUM.MARKETING_AND_SALES]: "মার্কেটিং ও বিক্রয়",
      [EXPENSE_CATEGORY_ENUM.SOFTWARE]: "সফটওয়্যার",
      [EXPENSE_CATEGORY_ENUM.OTHER]: "অন্যান্য",
    },
    table: {
      label: "লেবেল",
      category: "ক্যাটাগরি",
      amount: "পরিমাণ",
      date: "তারিখ",
      actions: "ক্রিয়া",
      noExpenses: "আপনার বর্তমান অনুসন্ধান এবং ফিল্টারের জন্য কোনো খরচ পাওয়া যায়নি।",
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
      labelPlaceholder: "খরচের লেবেল",
      date: "তারিখ",
      datePlaceholder: "তারিখ নির্বাচন করুন",
      category: "ক্যাটাগরি",
      amount: "পরিমাণ",
      amountPlaceholder: "পরিমাণ লিখুন",
      description: "বিবরণ",
      descriptionPlaceholder: "ঐচ্ছিক বিবরণ",
      submitCreate: "খরচ যোগ করুন",
      submitSave: "পরিবর্তন সংরক্ষণ করুন",
      validation: {
        labelRequired: "লেবেল আবশ্যক।",
        dateRequired: "তারিখ আবশ্যক।",
        dateFuture: "তারিখ ভবিষ্যতে হতে পারবে না।",
        amountNumber: "পরিমাণ অবশ্যই একটি সংখ্যা হতে হবে।",
        amountFinite: "পরিমাণ একটি বৈধ সংখ্যা হতে হবে।",
        amountGtZero: "পরিমাণ অবশ্যই ০ এর বেশি হতে হবে।",
      },
    },
    delete: {
      title: "খরচ মুছবেন?",
      confirmMessage: "আপনি কি নিশ্চিতভাবে {{label}} মুছতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmMessageGeneric: "আপনি কি নিশ্চিতভাবে এই খরচ মুছতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmText: "নিশ্চিত করতে delete-expense টাইপ করুন।",
      confirmKeyword: "delete-expense",
      cancel: "বাতিল",
      confirm: "হ্যাঁ, মুছুন",
    },
    actions: {
      view: "দেখুন",
      edit: "সম্পাদনা করুন",
      delete: "মুছুন",
      openActionsFor: "{{label}} এর জন্য ক্রিয়া খুলুন",
    },
    pdf: {
      title: "খরচসমূহ",
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
      footerModule: "খরচসমূহ",
      filePrefix: "expenses",
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
