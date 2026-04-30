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
    date: string;
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
      date: "Date",
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
    },
  },
  bn: {
    title: "গ্রাহক লেজার",
    description: "গ্রাহকের মোট, পরিশোধিত এবং বকেয়া হিসাব ট্র্যাক করুন। শুধুমাত্র পেমেন্ট আপডেট করা যাবে।",
    sheet: {
      title: "পেমেন্ট আপডেট করুন",
      description: "নির্বাচিত গ্রাহকের প্রাপ্ত অর্থ যোগ করুন। বকেয়া পরিমাণ স্বয়ংক্রিয়ভাবে আপডেট হবে।",
    },
    placeholders: {
      unknownCustomer: "অপরিচিত গ্রাহক",
      noPhone: "প্রযোজ্য নয়",
    },
    toolbar: {
      searchPlaceholder: "গ্রাহকের নাম বা ফোন নম্বর দিয়ে অনুসন্ধান করুন",
      download: "ডাউনলোড করুন",
      downloadPreparing: "প্রস্তুত হচ্ছে...",
    },
    table: {
      customer: "গ্রাহক",
      phoneNumber: "ফোন নম্বর",
      totalAmount: "মোট হিসাব",
      totalPaid: "পরিশোধিত",
      dueAmount: "বকেয়া",
      lastUpdated: "সর্বশেষ আপডেট",
      actions: "অ্যাকশন",
      noEntries: "আপনার অনুসন্ধান অনুযায়ী কোনো লেজার পাওয়া যায়নি।",
      updatePaymentFor: "{{customerName}} এর পেমেন্ট আপডেট করুন",
    },
    rowActions: {
      openActionsFor: "{{customerName}} এর জন্য অ্যাকশন খুলুন",
      updatePayment: "পেমেন্ট আপডেট করুন",
    },
    form: {
      customerName: "গ্রাহকের নাম",
      phoneNumber: "ফোন নম্বর",
      currentDueAmount: "বর্তমান বকেয়া",
      remainingAfterPayment: "এই পেমেন্টের পর বকেয়া: {{amount}}",
      payAmount: "পরিশোধের পরিমাণ",
      paidAmountPlaceholder: "পরিমাণ লিখুন",
      savePayment: "পেমেন্ট সংরক্ষণ করুন",
      validation: {
        amountCannotExceedDueAmount: "পরিশোধের পরিমাণ বকেয়ার ({{amount}}) বেশি হতে পারবে না।",
        paidAmountNumber: "পরিমাণ অবশ্যই সংখ্যা হতে হবে।",
        paidAmountFinite: "একটি বৈধ সংখ্যা প্রদান করুন।",
        paidAmountPositive: "পরিমাণ ০ এর বেশি হতে হবে।",
      },
    },
    pdf: {
      title: "গ্রাহক লেজার",
      date: "তারিখ",
      phone: "ফোন",
      totalCustomers: "মোট গ্রাহক",
      generated: "তৈরি করা হয়েছে",
      customer: "গ্রাহক",
      phoneNumber: "ফোন নম্বর",
      totalAmount: "মোট হিসাব",
      paidAmount: "পরিশোধিত",
      dueAmount: "বকেয়া",
      totals: "সর্বমোট",
      pageOf: "পৃষ্ঠা {{pageNumber}} / {{totalPages}}",
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
