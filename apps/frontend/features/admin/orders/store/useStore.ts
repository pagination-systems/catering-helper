import type { ORDER_STATUS_ENUM } from "@catering/types";
import { create } from "zustand";
import { formatDate } from "@/lib/utils";
import { isOrderLocked } from "../lib/utils";
import type { DayName, IOrder } from "../schemas/order.schema";
import { dayOrder } from "../schemas/order.schema";

export type DaySlot = {
  day: DayName;
  date: Date;
  dateLabel: string;
  tabLabel: string;
  isToday: boolean;
};

type StatusFilter = "all" | ORDER_STATUS_ENUM;
type DayFilter = "all" | DayName;

type OrdersStoreState = {
  query: string;
  statusFilter: StatusFilter;
  dayFilter: DayFilter;
  isCreateSheetOpen: boolean;
  isEditSheetOpen: boolean;
  isViewSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  isCancelDialogOpen: boolean;
  selectedOrder: IOrder | null;
  selectedViewItem: IOrder | null;
  selectedDeleteItem: IOrder | null;
  selectedCancelItem: IOrder | null;
  setQuery: (query: string) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setDayFilter: (day: DayFilter) => void;
  resetOrdersState: () => void;
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
};

const dayByJsIndex: DayName[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getUpcomingDays = (): DaySlot[] => {
  const today = new Date();

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() + index);

    const day = dayByJsIndex[date.getDay()] ?? dayOrder[0];

    return {
      day,
      date,
      dateLabel: formatDate(date),
      tabLabel: index === 0 ? `Today (${day})` : day,
      isToday: index === 0,
    };
  });
};

export const useOrdersStore = create<OrdersStoreState>((set) => ({
  query: "",
  statusFilter: "all",
  dayFilter: "all",
  isCreateSheetOpen: false,
  isEditSheetOpen: false,
  isViewSheetOpen: false,
  isDeleteDialogOpen: false,
  isCancelDialogOpen: false,
  selectedOrder: null,
  selectedViewItem: null,
  selectedDeleteItem: null,
  selectedCancelItem: null,
  setQuery: (query) => set({ query }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setDayFilter: (dayFilter) => set({ dayFilter }),
  resetOrdersState: () =>
    set({
      query: "",
      statusFilter: "all",
      dayFilter: "all",
      isCreateSheetOpen: false,
      isEditSheetOpen: false,
      isViewSheetOpen: false,
      isDeleteDialogOpen: false,
      isCancelDialogOpen: false,
      selectedOrder: null,
      selectedViewItem: null,
      selectedDeleteItem: null,
      selectedCancelItem: null,
    }),
  setCreateSheetOpen: (open) =>
    set({
      isCreateSheetOpen: open,
    }),
  setEditSheetOpen: (open) =>
    set((state) => ({
      isEditSheetOpen: open,
      selectedOrder: open ? state.selectedOrder : null,
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
      selectedOrder: null,
      selectedViewItem: null,
    }),
  closeCreateSheet: () => set({ isCreateSheetOpen: false }),
  openEdit: (item) => {
    if (isOrderLocked(item.status)) return;

    set({
      isEditSheetOpen: true,
      isCreateSheetOpen: false,
      isViewSheetOpen: false,
      selectedOrder: item,
      selectedViewItem: null,
    });
  },
  closeEditSheet: () => set({ isEditSheetOpen: false, selectedOrder: null }),
  openView: (item) =>
    set({
      isViewSheetOpen: true,
      isCreateSheetOpen: false,
      isEditSheetOpen: false,
      selectedViewItem: item,
      selectedOrder: null,
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
}));
