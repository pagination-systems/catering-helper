import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

export type CustomerLedgerContent = {
  title: string;
  description: string;
  sheet: {
    title: string;
    description: string;
  };
  placeholders: {
    unknownCustomer: string;
    noPhone: string;
  };
  toolbar: {
    searchPlaceholder: string;
    download: string;
    downloadPreparing: string;
  };
  table: {
    customer: string;
    phoneNumber: string;
    totalAmount: string;
    totalPaid: string;
    dueAmount: string;
    lastUpdated: string;
    actions: string;
    noEntries: string;
    updatePaymentFor: string;
  };
  rowActions: {
    openActionsFor: string;
    updatePayment: string;
  };
  form: {
    customerName: string;
    phoneNumber: string;
    currentDueAmount: string;
    remainingAfterPayment: string;
    payAmount: string;
    paidAmountPlaceholder: string;
    savePayment: string;
    validation: {
      amountCannotExceedDueAmount: string;
      paidAmountNumber: string;
      paidAmountFinite: string;
      paidAmountPositive: string;
    };
  };
  pdf: {
    title: string;
    phone: string;
    totalCustomers: string;
    generated: string;
    customer: string;
    phoneNumber: string;
    totalAmount: string;
    paidAmount: string;
    dueAmount: string;
    totals: string;
    pageOf: string;
    footerTitle: string;
    fileNamePrefix: string;
  };
};

const content: Record<Language, CustomerLedgerContent> = {
  en: {
    title: "Customer Ledger",
    description: "Track customer total, paid, and due balances. Update only payment entries with validation.",
    sheet: {
      title: "Update Paid Amount",
      description: "Add received payment for the selected customer. Due amount will be reduced automatically.",
    },
    placeholders: {
      unknownCustomer: "Unknown customer",
      noPhone: "N/A",
    },
    toolbar: {
      searchPlaceholder: "Search by customer name or phone",
      download: "Download",
      downloadPreparing: "Preparing...",
    },
    table: {
      customer: "Customer",
      phoneNumber: "Phone Number",
      totalAmount: "Total Amount",
      totalPaid: "Total Paid",
      dueAmount: "Due Amount",
      lastUpdated: "Last Updated",
      actions: "Actions",
      noEntries: "No ledger entries found for your current query.",
      updatePaymentFor: "Update payment for {{customerName}}",
    },
    rowActions: {
      openActionsFor: "Open actions for {{customerName}}",
      updatePayment: "Update Payment",
    },
    form: {
      customerName: "Customer Name",
      phoneNumber: "Phone Number",
      currentDueAmount: "Current Due Amount",
      remainingAfterPayment: "Remaining after this payment: {{amount}}",
      payAmount: "Pay Amount",
      paidAmountPlaceholder: "Enter paid amount",
      savePayment: "Save Payment",
      validation: {
        amountCannotExceedDueAmount: "Amount cannot exceed due amount ({{amount}}).",
        paidAmountNumber: "Pay amount must be a number.",
        paidAmountFinite: "Pay amount must be a valid number.",
        paidAmountPositive: "Pay amount must be greater than 0.",
      },
    },
    pdf: {
      title: "Customer Ledger",
      phone: "Phone",
      totalCustomers: "Total Customers",
      generated: "Generated",
      customer: "Customer",
      phoneNumber: "Phone Number",
      totalAmount: "Total Amount",
      paidAmount: "Paid Amount",
      dueAmount: "Due Amount",
      totals: "Totals",
      pageOf: "Page {{pageNumber}} of {{totalPages}}",
      footerTitle: "Customer Ledger",
      fileNamePrefix: "customer-ledger",
    },
  },
  bn: {
    title: "কাস্টমার লেজার",
    description: "কাস্টমারের মোট, প্রদত্ত এবং বকেয়া ব্যালেন্স ট্র্যাক করুন। ভ্যালিডেশনসহ শুধুমাত্র পেমেন্ট এন্ট্রি আপডেট করুন।",
    sheet: {
      title: "প্রদত্ত পরিমাণ আপডেট করুন",
      description: "নির্বাচিত কাস্টমারের প্রাপ্ত পেমেন্ট যোগ করুন। বকেয়া পরিমাণ স্বয়ংক্রিয়ভাবে কমে যাবে।",
    },
    placeholders: {
      unknownCustomer: "অপরিচিত কাস্টমার",
      noPhone: "প্রযোজ্য নয়",
    },
    toolbar: {
      searchPlaceholder: "কাস্টমারের নাম বা ফোন নম্বর দিয়ে অনুসন্ধান করুন",
      download: "ডাউনলোড",
      downloadPreparing: "প্রস্তুত করছে...",
    },
    table: {
      customer: "কাস্টমার",
      phoneNumber: "ফোন নম্বর",
      totalAmount: "মোট পরিমাণ",
      totalPaid: "মোট প্রদত্ত",
      dueAmount: "বকেয়া পরিমাণ",
      lastUpdated: "সর্বশেষ আপডেট",
      actions: "ক্রিয়া",
      noEntries: "আপনার বর্তমান অনুসন্ধানের জন্য কোনো লেজার এন্ট্রি পাওয়া যায়নি।",
      updatePaymentFor: "{{customerName}} এর জন্য পেমেন্ট আপডেট করুন",
    },
    rowActions: {
      openActionsFor: "{{customerName}} এর জন্য ক্রিয়া খুলুন",
      updatePayment: "পেমেন্ট আপডেট করুন",
    },
    form: {
      customerName: "কাস্টমারের নাম",
      phoneNumber: "ফোন নম্বর",
      currentDueAmount: "বর্তমান বকেয়া পরিমাণ",
      remainingAfterPayment: "এই পেমেন্টের পর বকেয়া: {{amount}}",
      payAmount: "প্রদানের পরিমাণ",
      paidAmountPlaceholder: "প্রদত্ত পরিমাণ লিখুন",
      savePayment: "পেমেন্ট সংরক্ষণ করুন",
      validation: {
        amountCannotExceedDueAmount: "প্রদত্ত পরিমাণ বকেয়া পরিমাণ ({{amount}}) এর বেশি হতে পারবে না।",
        paidAmountNumber: "প্রদানের পরিমাণ অবশ্যই সংখ্যা হতে হবে।",
        paidAmountFinite: "প্রদানের পরিমাণ একটি বৈধ সংখ্যা হতে হবে।",
        paidAmountPositive: "প্রদানের পরিমাণ ০ এর বেশি হতে হবে।",
      },
    },
    pdf: {
      title: "কাস্টমার লেজার",
      phone: "ফোন",
      totalCustomers: "মোট কাস্টমার",
      generated: "তৈরি হয়েছে",
      customer: "কাস্টমার",
      phoneNumber: "ফোন নম্বর",
      totalAmount: "মোট পরিমাণ",
      paidAmount: "প্রদত্ত পরিমাণ",
      dueAmount: "বকেয়া পরিমাণ",
      totals: "সর্বমোট",
      pageOf: "পৃষ্ঠা {{pageNumber}} / {{totalPages}}",
      footerTitle: "কাস্টমার লেজার",
      fileNamePrefix: "customer-ledger",
    },
  },
};

export const useCustomerLedgerI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getCustomerLedgerContent = (lang: Language) => {
  return content[lang] ?? content.en;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
