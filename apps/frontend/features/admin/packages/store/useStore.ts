import { PACKAGE_STATUS_ENUM } from "@catering/types";
import { create } from "zustand";
import {
  type CreatePackageValues,
  type DayName,
  dayOrder,
  type GetPackagesResponse,
  type ICateringPackage,
} from "../schemas/package.schema";

type StatusFilter = "all" | (typeof PACKAGE_STATUS_ENUM)[keyof typeof PACKAGE_STATUS_ENUM];

type PackagesStoreState = {
  list: GetPackagesResponse;
  query: string;
  statusFilter: StatusFilter;
  isCreateSheetOpen: boolean;
  isEditSheetOpen: boolean;
  isViewSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedItem: ICateringPackage | null;
  selectedViewItem: ICateringPackage | null;
  selectedDeleteItem: ICateringPackage | null;
  setQuery: (query: string) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setCreateSheetOpen: (open: boolean) => void;
  setEditSheetOpen: (open: boolean) => void;
  setViewSheetOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  openCreate: () => void;
  closeCreateSheet: () => void;
  openEdit: (item: ICateringPackage) => void;
  closeEditSheet: () => void;
  openView: (item: ICateringPackage) => void;
  closeViewSheet: () => void;
  openDeleteDialog: (item: ICateringPackage) => void;
  closeDeleteDialog: () => void;
  addItem: (item: ICateringPackage) => void;
  deletePackage: (packageId: ICateringPackage["id"]) => void;
  updatePackage: (packageId: ICateringPackage["id"], values: CreatePackageValues) => void;
};

const now = new Date();

const packageSeed: ICateringPackage[] = [
  {
    id: "daily-basic-0",
    name: "ডেইলি বেসিক প্যাকেজ",
    description: "সাশ্রয়ী দৈনন্দিন অফিস মিল, সহজ ও পরিচিত খাবার।",
    pricePerMeal: 120,
    status: PACKAGE_STATUS_ENUM.ACTIVE,
    days: [
      {
        day: "Sat",
        variants: [
          {
            id: "sat-fish",
            name: "মাছ ভাত সেট",
            note: "ক্লাসিক বাঙালি খাবার।",
            items: ["ভাত", "তেলাপিয়া মাছ", "ডাল", "ভর্তা"],
          },
          {
            id: "sat-chicken",
            name: "মুরগি ঝোল সেট",
            note: "অফিস স্পেশাল।",
            items: ["ভাত", "মুরগির ঝোল", "সবজি"],
          },
          {
            id: "sat-veg",
            name: "সবজি সেট",
            note: "হালকা নিরামিষ।",
            items: ["খিচুড়ি", "মিক্স সবজি", "ডাল"],
            available: false,
          },
        ],
      },
      {
        day: "Sun",
        variants: [
          {
            id: "sun-khichuri",
            name: "খিচুড়ি সেট",
            note: "হালকা খাবার।",
            items: ["খিচুড়ি", "ডিম ভাজি"],
          },
          {
            id: "sun-fish",
            name: "মাছ সেট",
            note: "ঘরোয়া স্বাদ।",
            items: ["ভাত", "মাছ", "ডাল"],
          },
        ],
      },
      {
        day: "Mon",
        variants: [
          {
            id: "mon-chicken",
            name: "চিকেন ভুনা",
            note: "স্ট্যান্ডার্ড মিল।",
            items: ["ভাত", "চিকেন ভুনা", "সবজি"],
          },
          {
            id: "mon-egg",
            name: "ডিম কারি",
            note: "সাশ্রয়ী প্রোটিন।",
            items: ["ভাত", "ডিম কারি", "ডাল"],
          },
        ],
      },
      {
        day: "Tue",
        variants: [
          {
            id: "tue-fish",
            name: "রুই মাছ সেট",
            note: "ক্লাসিক অপশন।",
            items: ["ভাত", "রুই মাছ", "ডাল"],
          },
          {
            id: "tue-veg",
            name: "সবজি প্লেট",
            note: "নিরামিষ।",
            items: ["ভাত", "সবজি", "আচার"],
          },
          {
            id: "tue-chicken",
            name: "চিকেন সেট",
            note: "মাঝারি স্পাইসি।",
            items: ["ভাত", "চিকেন কারি"],
          },
        ],
      },
      {
        day: "Wed",
        variants: [
          {
            id: "wed-egg",
            name: "ডিম ভাজি সেট",
            note: "সহজ ও দ্রুত।",
            items: ["ভাত", "ডিম ভাজি", "ডাল"],
          },
          {
            id: "wed-fish",
            name: "ফিশ কারি",
            note: "হালকা স্বাদ।",
            items: ["ভাত", "ফিশ কারি"],
          },
        ],
      },
      {
        day: "Thu",
        variants: [
          {
            id: "thu-chicken",
            name: "চিকেন ঝোল",
            note: "ঘরোয়া খাবার।",
            items: ["ভাত", "চিকেন ঝোল"],
          },
          {
            id: "thu-veg",
            name: "সবজি সেট",
            note: "হেলদি অপশন।",
            items: ["ভাত", "সবজি", "ডাল"],
          },
        ],
      },
      {
        day: "Fri",
        variants: [
          {
            id: "fri-special",
            name: "স্পেশাল জুমা মিল",
            note: "সপ্তাহ শেষ স্পেশাল।",
            items: ["বিরিয়ানি", "চিকেন", "ডেজার্ট"],
          },
          {
            id: "fri-fish",
            name: "ফিশ প্লেট",
            note: "হালকা ফ্রাইডে মিল।",
            items: ["ভাত", "মাছ", "ডাল"],
          },
          {
            id: "fri-veg",
            name: "ভেজিটেরিয়ান সেট",
            note: "নিরামিষ স্পেশাল।",
            items: ["খিচুড়ি", "সবজি", "আচার"],
          },
        ],
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "standard-1",
    name: "স্ট্যান্ডার্ড প্যাকেজ",
    description: "সুষম ও কিছুটা উন্নত মানের অফিস মিল।",
    pricePerMeal: 130,
    status: PACKAGE_STATUS_ENUM.ACTIVE,
    days: dayOrder.map((day) => ({
      day: day as DayName,
      variants: [
        {
          id: `${day}-fish-standard`,
          name: "রুই মাছ সেট",
          note: "পরিচিত ও জনপ্রিয় মাছ।",
          items: ["ভাত", "রুই মাছের ঝোল", "মসুর ডাল", "আলু ভর্তা"],
        },
        {
          id: `${day}-chicken-standard`,
          name: "চিকেন ভুনা সেট",
          note: "মাঝারি মসলাযুক্ত সুস্বাদু খাবার।",
          items: ["পোলাও", "চিকেন ভুনা", "সবজি", "সালাদ"],
        },
        {
          id: `${day}-egg-standard`,
          name: "ডিম কারি সেট",
          note: "সাশ্রয়ী ও পুষ্টিকর।",
          items: ["ভাত", "ডিম কারি", "ডাল", "ভাজি"],
        },
      ],
    })),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "premium-2",
    name: "প্রিমিয়াম প্যাকেজ",
    description: "উন্নত মানের খাবার, মিটিং ও বিশেষ দিনের জন্য উপযুক্ত।",
    pricePerMeal: 150,
    status: PACKAGE_STATUS_ENUM.ACTIVE,
    days: dayOrder.map((day) => ({
      day: day as DayName,
      variants: [
        {
          id: `${day}-fish-premium`,
          name: "ইলিশ সেট",
          note: "প্রিমিয়াম মাছের আইটেম।",
          items: ["লেবু ভাত", "ইলিশ ভাপা", "ডাল", "ভর্তা"],
        },
        {
          id: `${day}-chicken-premium`,
          name: "চিকেন রোস্ট সেট",
          note: "মিটিং ও বিশেষ অনুষ্ঠানের জন্য।",
          items: ["জাফরান পোলাও", "চিকেন রোস্ট", "সবজি", "রায়তা"],
        },
        {
          id: `${day}-beef-premium`,
          name: "গরুর মাংস ভুনা সেট",
          note: "হেভি মিলের জন্য উপযুক্ত।",
          items: ["পোলাও", "গরুর ভুনা", "ডাল", "বোরহানি"],
        },
      ],
    })),
    createdAt: now,
    updatedAt: now,
  },
];

const initialData: ICateringPackage[] = packageSeed.map((item) => ({
  ...item,
  days: item.days.map((day) => ({
    day: day.day,
    variants: day.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      note: variant.note,
      items: [...variant.items],
      available: variant.available ?? true,
    })),
  })),
}));

const buildPagination = (totalDocs: number): GetPackagesResponse["meta"]["pagination"] => ({
  totalDocs,
  limit: 10,
  hasPrevPage: false,
  hasNextPage: false,
  page: 1,
  totalPages: Math.max(1, Math.ceil(totalDocs / 10)),
  prevPage: null,
  nextPage: null,
  pagingCounter: 1,
});

export const usePackagesStore = create<PackagesStoreState>((set) => ({
  list: {
    data: initialData,
    meta: {
      pagination: buildPagination(initialData.length),
    },
  },
  query: "",
  statusFilter: "all",
  isCreateSheetOpen: false,
  isEditSheetOpen: false,
  isViewSheetOpen: false,
  isDeleteDialogOpen: false,
  selectedItem: null,
  selectedViewItem: null,
  selectedDeleteItem: null,
  setQuery: (query) => set({ query }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setCreateSheetOpen: (open) =>
    set({
      isCreateSheetOpen: open,
    }),
  setEditSheetOpen: (open) =>
    set((state) => ({
      isEditSheetOpen: open,
      selectedItem: open ? state.selectedItem : null,
    })),
  setViewSheetOpen: (open) =>
    set((state) => ({
      isViewSheetOpen: open,
      selectedViewItem: open ? state.selectedViewItem : null,
    })),
  setDeleteDialogOpen: (open) =>
    set((state) => ({
      isDeleteDialogOpen: open,
      selectedDeleteItem: open ? state.selectedDeleteItem : null,
    })),
  openCreate: () =>
    set({
      isCreateSheetOpen: true,
      isEditSheetOpen: false,
      isViewSheetOpen: false,
      selectedItem: null,
      selectedViewItem: null,
    }),
  closeCreateSheet: () => set({ isCreateSheetOpen: false }),
  openEdit: (item) =>
    set({
      isEditSheetOpen: true,
      isCreateSheetOpen: false,
      isViewSheetOpen: false,
      selectedItem: item,
      selectedViewItem: null,
    }),
  closeEditSheet: () => set({ isEditSheetOpen: false, selectedItem: null }),
  openView: (item) =>
    set({
      isViewSheetOpen: true,
      isCreateSheetOpen: false,
      isEditSheetOpen: false,
      selectedViewItem: item,
      selectedItem: null,
    }),
  closeViewSheet: () => set({ isViewSheetOpen: false, selectedViewItem: null }),
  openDeleteDialog: (item) => set({ isDeleteDialogOpen: true, selectedDeleteItem: item }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false, selectedDeleteItem: null }),
  addItem: (item) =>
    set((state) => {
      const nextData = [...state.list.data, item];

      return {
        list: {
          ...state.list,
          data: nextData,
          meta: {
            pagination: buildPagination(nextData.length),
          },
        },
      };
    }),
  deletePackage: (packageId) =>
    set((state) => {
      const nextData = state.list.data.filter((pkg) => pkg.id !== packageId);

      return {
        list: {
          ...state.list,
          data: nextData,
          meta: {
            pagination: buildPagination(nextData.length),
          },
        },
      };
    }),
  updatePackage: (packageId, values) =>
    set((state) => ({
      list: {
        ...state.list,
        data: state.list.data.map((pkg) =>
          pkg.id === packageId
            ? {
                ...pkg,
                ...values,
                days: values.days.map((day) => ({
                  day: day.day,
                  variants: day.variants.map((variant) => ({
                    id: variant.id ?? crypto.randomUUID(),
                    name: variant.name,
                    note: variant.note,
                    items: [...variant.items],
                    available: variant.available ?? true,
                  })),
                })),
                updatedAt: new Date(),
              }
            : pkg,
        ),
      },
    })),
}));
