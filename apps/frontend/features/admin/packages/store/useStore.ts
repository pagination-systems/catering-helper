import type { PACKAGE_STATUS_ENUM } from "@catering/types";
import { create } from "zustand";
import type { IPackage } from "../schemas/package.schema";

type StatusFilter = "all" | (typeof PACKAGE_STATUS_ENUM)[keyof typeof PACKAGE_STATUS_ENUM];

type PackagesStoreState = {
  query: string;
  statusFilter: StatusFilter;
  isCreateSheetOpen: boolean;
  isEditSheetOpen: boolean;
  isViewSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedItem: IPackage | null;
  selectedViewItem: IPackage | null;
  selectedDeleteItem: IPackage | null;
  setQuery: (query: string) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setCreateSheetOpen: (open: boolean) => void;
  setEditSheetOpen: (open: boolean) => void;
  setViewSheetOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  openCreate: () => void;
  closeCreateSheet: () => void;
  openEdit: (item: IPackage) => void;
  closeEditSheet: () => void;
  openView: (item: IPackage) => void;
  closeViewSheet: () => void;
  openDeleteDialog: (item: IPackage) => void;
  closeDeleteDialog: () => void;
};

export const usePackagesStore = create<PackagesStoreState>((set) => ({
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
}));
