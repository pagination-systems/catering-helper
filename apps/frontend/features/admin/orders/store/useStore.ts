import { create } from "zustand";
import { formatDateTime } from "@/lib/utils";
import { getPriceByPackageName } from "../data/package-catalog";
import {
  type CreateOrderValues,
  type DayName,
  dayOrder,
  type GetOrdersResponse,
  type IOrder,
  type IOrderItem,
  isOrderLocked,
  OrderStatus,
} from "../schemas/order.schema";

export type DaySlot = {
  day: DayName;
  date: Date;
  dateLabel: string;
  tabLabel: string;
  isToday: boolean;
};

type StatusFilter = "all" | OrderStatus;
type DayFilter = "all" | DayName;

type OrdersStoreState = {
  list: GetOrdersResponse;
  upcomingDays: DaySlot[];
  query: string;
  statusFilter: StatusFilter;
  dayFilter: DayFilter;
  isCreateSheetOpen: boolean;
  isEditSheetOpen: boolean;
  isViewSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  isCancelDialogOpen: boolean;
  selectedItem: IOrder | null;
  selectedViewItem: IOrder | null;
  selectedDeleteItem: IOrder | null;
  selectedCancelItem: IOrder | null;
  setQuery: (query: string) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setDayFilter: (day: DayFilter) => void;
  setCreateSheetOpen: (open: boolean) => void;
  setEditSheetOpen: (open: boolean) => void;
  setViewSheetOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  setCancelDialogOpen: (open: boolean) => void;
  openCreate: () => void;
  closeCreateSheet: () => void;
  openEdit: (item: IOrder) => void;
  closeEditSheet: () => void;
  openView: (item: IOrder) => void;
  closeViewSheet: () => void;
  openDeleteDialog: (item: IOrder) => void;
  closeDeleteDialog: () => void;
  openCancelDialog: (item: IOrder) => void;
  closeCancelDialog: () => void;
  cancelOrder: (orderId: IOrder["id"], reason: string) => void;
  addItem: (item: IOrder) => void;
  deleteOrder: (orderId: IOrder["id"]) => void;
  updateOrder: (orderId: IOrder["id"], values: CreateOrderValues) => void;
};

const dayByJsIndex: DayName[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getUpcomingDays = (): DaySlot[] => {
  const today = new Date();

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() + index);

    const day = dayByJsIndex[date.getDay()] ?? dayOrder[0];

    return {
      day,
      date,
      dateLabel: formatDateTime(date),
      tabLabel: index === 0 ? `Today (${day})` : day,
      isToday: index === 0,
    };
  });
};

const upcomingDays = getUpcomingDays();

const formatDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDeliverySlotFromValue = (deliveryDate: string) => {
  return upcomingDays.find((slot) => formatDateValue(slot.date) === deliveryDate) ?? upcomingDays[0];
};

const buildPagination = (totalDocs: number): GetOrdersResponse["meta"]["pagination"] => ({
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

const hydrateTotals = (order: Omit<IOrder, "subtotal" | "total" | "totalMeals">): IOrder => {
  const subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalMeals = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    ...order,
    subtotal,
    totalMeals,
    total: subtotal + order.deliveryFee,
  };
};

type SeedOrderInput = {
  seed: number;
  customerName: string;
  customerPhone: string;
  address: string;
  notes?: string;
  status: OrderStatus;
  dayOffset: number;
  createdHoursAgo: number;
  items: Array<{
    packageName: string;
    variantName: string;
    quantity: number;
    pricePerMeal: number;
    items: string[];
  }>;
};

const buildSeedOrder = (input: SeedOrderInput): IOrder => {
  const deliverySlot = upcomingDays[input.dayOffset] ?? upcomingDays[0];
  const now = new Date();
  const createdAt = new Date(now.getTime() - input.createdHoursAgo * 60 * 60 * 1000);

  const seededItems: IOrderItem[] = input.items.map((item, index) => ({
    id: `seed-item-${input.seed}-${index + 1}`,
    packageName: item.packageName,
    variantName: item.variantName,
    quantity: item.quantity,
    pricePerMeal: item.pricePerMeal,
    items: item.items,
    subtotal: item.quantity * item.pricePerMeal,
    deliveryDate: deliverySlot.date,
  }));

  return hydrateTotals({
    id: `seed-order-${input.seed}`,
    orderNo: `ORD-${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${2000 + input.seed}`,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    address: input.address,
    notes: input.notes ?? "",
    source: "Client Portal",
    status: input.status,
    deliveryDay: deliverySlot.day,
    deliveryDate: deliverySlot.date,
    items: seededItems,
    deliveryFee: 60,
    createdAt,
    updatedAt: createdAt,
  });
};

const seedOrderBlueprints: Omit<SeedOrderInput, "seed">[] = [
  {
    customerName: "Rahim Uddin",
    customerPhone: "01711000001",
    address: "House 14, Road 7, Dhanmondi, Dhaka",
    status: OrderStatus.Confirmed,
    dayOffset: 0,
    createdHoursAgo: 1,
    items: [
      {
        packageName: "Daily Basic Package",
        variantName: "Khichuri Set",
        quantity: 8,
        pricePerMeal: 120,
        items: ["Khichuri", "Egg fry"],
      },
      {
        packageName: "Standard Package",
        variantName: "Chicken Bhuna Set",
        quantity: 5,
        pricePerMeal: 130,
        items: ["Polao", "Chicken", "Salad"],
      },
    ],
  },
  {
    customerName: "Nafisa Karim",
    customerPhone: "01822000002",
    address: "House 22, Gulshan 1, Dhaka",
    notes: "Call before delivery",
    status: OrderStatus.Confirmed,
    dayOffset: 0,
    createdHoursAgo: 3,
    items: [
      {
        packageName: "Premium Package",
        variantName: "Chicken Roast Set",
        quantity: 12,
        pricePerMeal: 150,
        items: ["Polao", "Chicken roast", "Raita"],
      },
    ],
  },
  {
    customerName: "Aman Group Ltd",
    customerPhone: "01933000003",
    address: "Tejgaon Industrial Area, Dhaka",
    status: OrderStatus.Confirmed,
    dayOffset: 1,
    createdHoursAgo: 6,
    items: [
      {
        packageName: "Standard Package",
        variantName: "Fish Set",
        quantity: 20,
        pricePerMeal: 130,
        items: ["Rice", "Fish curry", "Dal"],
      },
    ],
  },
  {
    customerName: "Mehedi Hasan",
    customerPhone: "01644000004",
    address: "Mirpur DOHS, Dhaka",
    status: OrderStatus.Cancelled,
    dayOffset: 2,
    createdHoursAgo: 12,
    items: [
      {
        packageName: "Daily Basic Package",
        variantName: "Fish Rice Set",
        quantity: 6,
        pricePerMeal: 120,
        items: ["Rice", "Tilapia fish", "Dal"],
      },
    ],
  },
  {
    customerName: "Shamim Enterprise",
    customerPhone: "01555000005",
    address: "Banani, Dhaka",
    status: OrderStatus.Confirmed,
    dayOffset: 3,
    createdHoursAgo: 28,
    items: [
      {
        packageName: "Premium Package",
        variantName: "Beef Bhuna Set",
        quantity: 15,
        pricePerMeal: 150,
        items: ["Polao", "Beef bhuna", "Borhani"],
      },
    ],
  },
  {
    customerName: "Arifa Sultana",
    customerPhone: "01366000006",
    address: "Uttara Sector 11, Dhaka",
    status: OrderStatus.Cancelled,
    dayOffset: 4,
    createdHoursAgo: 32,
    items: [
      {
        packageName: "Daily Basic Package",
        variantName: "Chicken Jhol Set",
        quantity: 9,
        pricePerMeal: 120,
        items: ["Rice", "Chicken jhol", "Vegetable"],
      },
    ],
  },
  {
    customerName: "Zaman Trading",
    customerPhone: "01777000007",
    address: "Moghbazar, Dhaka",
    status: OrderStatus.Confirmed,
    dayOffset: 5,
    createdHoursAgo: 10,
    items: [
      {
        packageName: "Standard Package",
        variantName: "Egg Curry Set",
        quantity: 18,
        pricePerMeal: 130,
        items: ["Rice", "Egg curry", "Dal"],
      },
    ],
  },
  {
    customerName: "Rifat Chowdhury",
    customerPhone: "01488000008",
    address: "Badda, Dhaka",
    status: OrderStatus.Confirmed,
    dayOffset: 6,
    createdHoursAgo: 2,
    items: [
      {
        packageName: "Premium Package",
        variantName: "Ilish Set",
        quantity: 4,
        pricePerMeal: 150,
        items: ["Lebu rice", "Ilish", "Dal"],
      },
    ],
  },
];

const initialOrders: IOrder[] = Array.from({ length: 50 }, (_, index) => {
  const blueprint = seedOrderBlueprints[index % seedOrderBlueprints.length];

  return buildSeedOrder({
    seed: index + 1,
    ...blueprint,
  });
});

export const useOrdersStore = create<OrdersStoreState>((set) => ({
  list: {
    data: initialOrders,
    meta: {
      pagination: buildPagination(initialOrders.length),
    },
  },
  upcomingDays,
  query: "",
  statusFilter: "all",
  dayFilter: upcomingDays[0]?.day ?? "all",
  isCreateSheetOpen: false,
  isEditSheetOpen: false,
  isViewSheetOpen: false,
  isDeleteDialogOpen: false,
  isCancelDialogOpen: false,
  selectedItem: null,
  selectedViewItem: null,
  selectedDeleteItem: null,
  selectedCancelItem: null,
  setQuery: (query) => set({ query }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setDayFilter: (dayFilter) => set({ dayFilter }),
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
  setCancelDialogOpen: (open) =>
    set((state) => ({
      isCancelDialogOpen: open,
      selectedCancelItem: open ? state.selectedCancelItem : null,
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
  openEdit: (item) => {
    if (isOrderLocked(item.status)) return;

    set({
      isEditSheetOpen: true,
      isCreateSheetOpen: false,
      isViewSheetOpen: false,
      selectedItem: item,
      selectedViewItem: null,
    });
  },
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
  openDeleteDialog: (item) => {
    if (isOrderLocked(item.status)) return;

    set({ isDeleteDialogOpen: true, selectedDeleteItem: item });
  },
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false, selectedDeleteItem: null }),
  openCancelDialog: (item) => {
    if (isOrderLocked(item.status)) return;

    set({ isCancelDialogOpen: true, selectedCancelItem: item });
  },
  closeCancelDialog: () => set({ isCancelDialogOpen: false, selectedCancelItem: null }),
  cancelOrder: (orderId, reason) =>
    set((state) => {
      const trimmedReason = reason.trim();

      const nextData = state.list.data.map((order) => {
        if (order.id !== orderId) return order;
        if (isOrderLocked(order.status)) return order;

        const cancelNote = trimmedReason ? `\n[Cancelled] ${trimmedReason}` : "";

        return {
          ...order,
          status: OrderStatus.Cancelled,
          notes: `${order.notes}${cancelNote}`.trim(),
          updatedAt: new Date(),
        };
      });

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
  addItem: (item) =>
    set((state) => {
      const nextData = [item, ...state.list.data];

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
  deleteOrder: (orderId) =>
    set((state) => {
      const current = state.list.data.find((order) => order.id === orderId);
      if (!current || isOrderLocked(current.status)) return state;

      const nextData = state.list.data.filter((order) => order.id !== orderId);

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
  updateOrder: (orderId, values) =>
    set((state) => {
      const nextData = state.list.data.map((order) => {
        if (order.id !== orderId) return order;
        if (isOrderLocked(order.status)) return order;
        const deliverySlot = getDeliverySlotFromValue(values.deliveryDate);

        const nextItems = values.items.map((item, index) => {
          const itemDeliverySlot = getDeliverySlotFromValue(item.deliveryDate);
          const pricePerMeal = getPriceByPackageName(item.packageName);
          const existingItem =
            order.items.find(
              (currentItem) =>
                currentItem.packageName === item.packageName &&
                currentItem.variantName === item.variantName &&
                formatDateValue(currentItem.deliveryDate) === item.deliveryDate,
            ) ?? order.items[index];

          return {
            id: existingItem?.id ?? crypto.randomUUID(),
            packageName: item.packageName,
            variantName: item.variantName,
            quantity: item.quantity,
            pricePerMeal,
            subtotal: item.quantity * pricePerMeal,
            items: existingItem?.items ?? ["Rice", "Dal", "Salad"],
            deliveryDate: itemDeliverySlot?.date ?? deliverySlot?.date ?? order.deliveryDate,
          };
        });

        return hydrateTotals({
          ...order,
          customerName: values.customerName,
          customerPhone: values.customerPhone,
          address: values.address,
          notes: values.notes ?? "",
          deliveryDay: deliverySlot?.day ?? order.deliveryDay,
          deliveryDate: deliverySlot?.date ?? order.deliveryDate,
          items: nextItems,
          updatedAt: new Date(),
        });
      });

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
}));
