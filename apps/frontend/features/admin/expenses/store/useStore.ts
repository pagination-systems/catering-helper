import type { EXPENSE_CATEGORY_ENUM } from "@catering/types";
import { create } from "zustand";
import type { IExpense } from "../schemas/expense.schema";

type CategoryFilter = "all" | EXPENSE_CATEGORY_ENUM;

type ExpensesStoreState = {
  categoryFilter: CategoryFilter;
  isCreateSheetOpen: boolean;
  isEditSheetOpen: boolean;
  isViewSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedItem: IExpense | null;
  selectedViewItem: IExpense | null;
  selectedDeleteItem: IExpense | null;
  setCategoryFilter: (category: CategoryFilter) => void;
  setCreateSheetOpen: (open: boolean) => void;
  setEditSheetOpen: (open: boolean) => void;
  setViewSheetOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  openCreate: () => void;
  closeCreateSheet: () => void;
  openEdit: (item: IExpense) => void;
  closeEditSheet: () => void;
  openView: (item: IExpense) => void;
  closeViewSheet: () => void;
  openDeleteDialog: (item: IExpense) => void;
  closeDeleteDialog: () => void;
};

export const useExpensesStore = create<ExpensesStoreState>((set) => ({
  categoryFilter: "all",
  isCreateSheetOpen: false,
  isEditSheetOpen: false,
  isViewSheetOpen: false,
  isDeleteDialogOpen: false,
  selectedItem: null,
  selectedViewItem: null,
  selectedDeleteItem: null,

  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),

  setCreateSheetOpen: (open) => set({ isCreateSheetOpen: open }),

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
}));
