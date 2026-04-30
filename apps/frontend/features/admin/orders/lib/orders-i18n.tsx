import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/providers/language-provider";

export type OrdersContent = {
  title: string;
  description: string;
  dayLabels: Record<string, string>;
  dayTabs: {
    all: string;
    today: string;
  };
  toolbar: {
    searchPlaceholder: string;
    filter: string;
    status: string;
    resetFilters: string;
    download: string;
    downloadPreparing: string;
    createOrder: string;
  };
  table: {
    orderNo: string;
    customer: string;
    phone: string;
    address: string;
    packages: string;
    meals: string;
    amount: string;
    status: string;
    paidAmount: string;
    actions: string;
    noOrders: string;
  };
  details: {
    title: string;
    description: string;
    order: string;
    orderNo: string;
    created: string;
    lastUpdated: string;
    delivery: string;
    customer: string;
    phone: string;
    meals: string;
    grandTotal: string;
    source: string;
    items: string;
    deliveryAddress: string;
    note: string;
    noOrder: string;
  };
  form: {
    createTitle: string;
    createDescription: string;
    editTitle: string;
    editDescription: string;
    customerDetailsTitle: string;
    customerDetailsDescription: string;
    customerNameLabel: string;
    customerNamePlaceholder: string;
    phoneNumberLabel: string;
    phonePlaceholder: string;
    deliveryAddressLabel: string;
    deliveryAddressPlaceholder: string;
    noteLabel: string;
    notePlaceholder: string;
    packageSelectionTitle: string;
    packageSelectionDescription: string;
    deliveryDateSelectionTitle: string;
    deliveryDateSelectionDescription: string;
    activeVariantsTitle: string;
    activeVariantsDescription: string;
    activeVariantsHint: string;
    orderSummaryTitle: string;
    orderSummaryDescription: string;
    pricePerMeal: string;
    deliveryFee: string;
    subtotal: string;
    total: string;
    addVariant: string;
    cancel: string;
    submitCreate: string;
    submitSave: string;
    validation: {
      customerNameMin: string;
      customerNameMax: string;
      phoneMin: string;
      addressMin: string;
      addressMax: string;
      itemsRequired: string;
    };
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
  cancel: {
    title: string;
    confirmMessage: string;
    confirmMessageGeneric: string;
    confirmText: string;
    confirmKeyword: string;
    cancel: string;
    confirm: string;
    lockedOrderMessage: string;
    reasonPrompt: string;
    reasonExample: string;
  };
  actions: {
    view: string;
    edit: string;
    delete: string;
    cancel: string;
    openActionsFor: string;
  };
  pdf: {
    title: string;
    date: string;
    totalOrders: string;
    customer: string;
    deliveryAddress: string;
    packageDetails: string;
    meal: string;
    amount: string;
    paid: string;
    total: string;
  };
};

const content: Record<string, OrdersContent> = {
  en: {
    title: "Orders",
    description: "Track incoming client orders for today and the next 6 days with clear status control.",
    dayLabels: {
      Sat: "Saturday",
      Sun: "Sunday",
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
    },
    dayTabs: {
      all: "All",
      today: "Today",
    },
    toolbar: {
      searchPlaceholder: "Search by order id, customer, phone, package, variant",
      filter: "Filter",
      status: "Status",
      resetFilters: "Reset Filters",
      download: "Download",
      downloadPreparing: "Preparing...",
      createOrder: "Create Order",
    },
    table: {
      orderNo: "Order No",
      customer: "Customer",
      phone: "Phone",
      address: "Address",
      packages: "Packages",
      meals: "Meals",
      amount: "Amount",
      status: "Status",
      paidAmount: "Paid Amount",
      actions: "Actions",
      noOrders: "No orders found for your current query and filters.",
    },
    details: {
      title: "Order Details",
      description: "Review customer, delivery, item and billing breakdown for this order.",
      order: "Order",
      orderNo: "Order No",
      created: "Created",
      lastUpdated: "Last Updated",
      delivery: "Delivery",
      customer: "Customer",
      phone: "Phone",
      meals: "Meals",
      grandTotal: "Grand Total",
      source: "Source",
      items: "Items",
      deliveryAddress: "Delivery Address",
      note: "Note",
      noOrder: "No order found.",
    },
    form: {
      createTitle: "Create Order",
      createDescription: "Add an order for a client. Delivery day is restricted to today and the next 6 days.",
      editTitle: "Update Order",
      editDescription: "Update customer details and order status. Completed and cancelled orders are read-only.",
      customerDetailsTitle: "Customer Details",
      customerDetailsDescription: "Enter customer contact and delivery information.",
      customerNameLabel: "Customer Name",
      customerNamePlaceholder: "Enter customer name",
      phoneNumberLabel: "Phone Number",
      phonePlaceholder: "01XXXXXXXXX",
      deliveryAddressLabel: "Delivery Address",
      deliveryAddressPlaceholder: "Building, road, area and delivery instructions",
      noteLabel: "Note",
      notePlaceholder: "Optional notes for kitchen or rider",
      packageSelectionTitle: "Package Selection",
      packageSelectionDescription: "Select a package to view and add meal variants.",
      deliveryDateSelectionTitle: "Delivery Date Selection",
      deliveryDateSelectionDescription: "Choose the delivery date for this order.",
      activeVariantsTitle: "Selected Variants",
      activeVariantsDescription: "Only added variants are listed here.",
      activeVariantsHint: "Add meal quantities for {{date}}.",
      orderSummaryTitle: "Order Summary",
      orderSummaryDescription: "Review the final amount before creating the order.",
      pricePerMeal: "Price / Meal",
      deliveryFee: "Delivery Fee",
      subtotal: "Subtotal",
      total: "Total",
      addVariant: "Add Variant",
      cancel: "Cancel",
      submitCreate: "Create Order",
      submitSave: "Save Changes",
      validation: {
        customerNameMin: "Customer name must be at least 2 characters.",
        customerNameMax: "Customer name must be 100 characters or less.",
        phoneMin: "Phone number must be at least 10 characters.",
        addressMin: "Address must be at least 5 characters.",
        addressMax: "Address must be 500 characters or less.",
        itemsRequired: "Add at least one item.",
      },
    },
    delete: {
      title: "Delete order?",
      confirmMessage: "Are you sure you want to delete {{orderNo}}? This action cannot be undone.",
      confirmMessageGeneric: "Are you sure you want to delete this order? This action cannot be undone.",
      confirmText: "Type delete-order to confirm.",
      confirmKeyword: "delete-order",
      cancel: "Cancel",
      confirm: "Yes, Delete",
    },
    cancel: {
      title: "Cancel order?",
      confirmMessage: "Are you sure you want to cancel {{orderNo}}? This action cannot be undone.",
      confirmMessageGeneric: "Are you sure you want to cancel this order? This action cannot be undone.",
      confirmText: "Type cancel-order to confirm.",
      confirmKeyword: "cancel-order",
      cancel: "Keep Order",
      confirm: "Cancel Order",
      lockedOrderMessage: "This order is already locked and cannot be changed.",
      reasonPrompt: "Please provide a reason for cancellation.",
      reasonExample: "Example: Client requested cancellation",
    },
    actions: {
      view: "View",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      openActionsFor: "Open actions for {{orderNo}}",
    },
    pdf: {
      title: "Orders Report",
      date: "Date",
      totalOrders: "Total Orders",
      customer: "Customer",
      deliveryAddress: "Delivery Address",
      packageDetails: "Package Details",
      meal: "Meal",
      amount: "Amount",
      paid: "Paid",
      total: "Total",
    },
  },
  bn: {
    title: "অর্ডারসমূহ",
    description: "আজকের এবং পরবর্তী ৬ দিনের ক্লায়েন্ট অর্ডার ট্র্যাক করুন স্পষ্ট স্ট্যাটাস নিয়ন্ত্রণ সহ।",
    dayLabels: {
      Sat: "শনিবার",
      Sun: "রবিবার",
      Mon: "সোমবার",
      Tue: "মঙ্গলবার",
      Wed: "বুধবার",
      Thu: "বৃহস্পতিবার",
      Fri: "শুক্রবার",
    },
    dayTabs: {
      all: "সব",
      today: "আজ",
    },
    toolbar: {
      searchPlaceholder: "অর্ডার আইডি, কাস্টমার, ফোন, প্যাকেজ, ভ্যারিয়েন্ট দ্বারা অনুসন্ধান করুন",
      filter: "ফিল্টার",
      status: "স্ট্যাটাস",
      resetFilters: "ফিল্টার রিসেট করুন",
      download: "ডাউনলোড",
      downloadPreparing: "প্রস্তুত করছে...",
      createOrder: "অর্ডার তৈরি করুন",
    },
    table: {
      orderNo: "অর্ডার নম্বর",
      customer: "কাস্টমার",
      phone: "ফোন",
      address: "ঠিকানা",
      packages: "প্যাকেজসমূহ",
      meals: "খাবার",
      amount: "পরিমাণ",
      status: "স্ট্যাটাস",
      paidAmount: "প্রদত্ত পরিমাণ",
      actions: "ক্রিয়া",
      noOrders: "আপনার বর্তমান অনুসন্ধান এবং ফিল্টারের জন্য কোনো অর্ডার পাওয়া যায়নি।",
    },
    details: {
      title: "অর্ডার বিবরণ",
      description: "এই অর্ডারের কাস্টমার, ডেলিভারি, আইটেম এবং বিলিং বিশ্লেষণ পর্যালোচনা করুন।",
      order: "অর্ডার",
      orderNo: "অর্ডার নম্বর",
      created: "তৈরি",
      lastUpdated: "শেষ আপডেট",
      delivery: "ডেলিভারি",
      customer: "কাস্টমার",
      phone: "ফোন",
      meals: "খাবার",
      grandTotal: "মোট",
      source: "উৎস",
      items: "আইটেম",
      deliveryAddress: "ডেলিভারি ঠিকানা",
      note: "নোট",
      noOrder: "কোনো অর্ডার পাওয়া যায়নি।",
    },
    form: {
      createTitle: "অর্ডার তৈরি করুন",
      createDescription: "একজন ক্লায়েন্টের জন্য একটি অর্ডার যোগ করুন। ডেলিভারি দিন আজ এবং পরবর্তী ৬ দিনের মধ্যে সীমাবদ্ধ।",
      editTitle: "অর্ডার আপডেট করুন",
      editDescription: "কাস্টমারের বিবরণ এবং অর্ডার স্ট্যাটাস আপডেট করুন। সম্পন্ন এবং বাতিল করা অর্ডারগুলি শুধুমাত্র পড়ার যোগ্য।",
      customerDetailsTitle: "কাস্টমারের বিবরণ",
      customerDetailsDescription: "কাস্টমারের যোগাযোগ এবং ডেলিভারি তথ্য প্রবেশ করুন।",
      customerNameLabel: "কাস্টমারের নাম",
      customerNamePlaceholder: "কাস্টমারের নাম প্রবেশ করুন",
      phoneNumberLabel: "ফোন নম্বর",
      phonePlaceholder: "01XXXXXXXXX",
      deliveryAddressLabel: "ডেলিভারি ঠিকানা",
      deliveryAddressPlaceholder: "বিল্ডিং, রাস্তা, এলাকা এবং ডেলিভারি নির্দেশনা",
      noteLabel: "নোট",
      notePlaceholder: "রান্নাঘর বা রাইডারের জন্য ঐচ্ছিক নোট",
      packageSelectionTitle: "প্যাকেজ নির্বাচন",
      packageSelectionDescription: "একটি প্যাকেজ নির্বাচন করুন এবং মিল ভ্যারিয়েন্ট যোগ করুন।",
      deliveryDateSelectionTitle: "ডেলিভারি তারিখ নির্বাচন",
      deliveryDateSelectionDescription: "এই অর্ডারের জন্য ডেলিভারি তারিখ বেছে নিন।",
      activeVariantsTitle: "নির্বাচিত ভ্যারিয়েন্ট",
      activeVariantsDescription: "শুধু যোগ করা ভ্যারিয়েন্টগুলো এখানে দেখানো হয়েছে।",
      activeVariantsHint: "{{date}} এর জন্য মিলের পরিমাণ যোগ করুন।",
      orderSummaryTitle: "অর্ডার সারাংশ",
      orderSummaryDescription: "অর্ডার তৈরি করার আগে চূড়ান্ত পরিমাণ পর্যালোচনা করুন।",
      pricePerMeal: "প্রতি মিল মূল্য",
      deliveryFee: "ডেলিভারি ফি",
      subtotal: "সাবটোটাল",
      total: "মোট",
      addVariant: "ভ্যারিয়েন্ট যোগ করুন",
      cancel: "বাতিল",
      submitCreate: "অর্ডার তৈরি করুন",
      submitSave: "পরিবর্তন সংরক্ষণ করুন",
      validation: {
        customerNameMin: "কাস্টমারের নাম কমপক্ষে ২ অক্ষরের হতে হবে।",
        customerNameMax: "কাস্টমারের নাম ১০০ অক্ষর বা কম হতে হবে।",
        phoneMin: "ফোন নম্বর কমপক্ষে ১০ অক্ষরের হতে হবে।",
        addressMin: "ঠিকানা কমপক্ষে ৫ অক্ষরের হতে হবে।",
        addressMax: "ঠিকানা ৫০০ অক্ষর বা কম হতে হবে।",
        itemsRequired: "কমপক্ষে একটি আইটেম যোগ করুন।",
      },
    },
    delete: {
      title: "অর্ডার মুছবেন?",
      confirmMessage: "আপনি কি {{orderNo}} মুছতে চান? এই পদক্ষেপটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmMessageGeneric: "আপনি কি এই অর্ডার মুছতে চান? এই পদক্ষেপটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmText: "নিশ্চিত করতে delete-order টাইপ করুন।",
      confirmKeyword: "delete-order",
      cancel: "বাতিল",
      confirm: "হ্যাঁ, মুছুন",
    },
    cancel: {
      title: "অর্ডার বাতিল করবেন?",
      confirmMessage: "আপনি কি {{orderNo}} বাতিল করতে চান? এই পদক্ষেপটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmMessageGeneric: "আপনি কি এই অর্ডার বাতিল করতে চান? এই পদক্ষেপটি পূর্বাবস্থায় ফেরানো যাবে না।",
      confirmText: "নিশ্চিত করতে cancel-order টাইপ করুন।",
      confirmKeyword: "cancel-order",
      cancel: "অর্ডার রাখুন",
      confirm: "অর্ডার বাতিল করুন",
      lockedOrderMessage: "এই অর্ডার ইতিমধ্যে লক করা হয়েছে এবং এটি পরিবর্তন করা যাবে না।",
      reasonPrompt: "অনুগ্রহ করে বাতিলের কারণ প্রদান করুন।",
      reasonExample: "উদাহরণ: ক্লায়েন্ট বাতিল অনুরোধ করেছেন",
    },
    actions: {
      view: "দেখুন",
      edit: "সম্পাদনা করুন",
      delete: "মুছুন",
      cancel: "বাতিল",
      openActionsFor: "{{orderNo}} এর জন্য ক্রিয়া খুলুন",
    },
    pdf: {
      title: "অর্ডার রিপোর্ট",
      date: "তারিখ",
      totalOrders: "মোট অর্ডার",
      customer: "কাস্টমার",
      deliveryAddress: "ডেলিভারি ঠিকানা",
      packageDetails: "প্যাকেজ বিবরণ",
      meal: "খাবার",
      amount: "পরিমাণ",
      paid: "প্রদত্ত",
      total: "মোট",
    },
  },
} as const;

export const useOrdersI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getOrdersContent = (lang: Language) => {
  return content[lang] ?? content.en;
};

export const interpolate = (str: string, values: Record<string, string>): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
