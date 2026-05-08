import { ACCOUNT_TYPE_ENUMS, EMAIL_VERIFICATION_STATUS_ENUMS, type IUser } from "@catering/types";
import { create } from "zustand";
import type { CreateCustomerValues, GetUsersResponse } from "../schemas/customer.schema";

type CustomersStoreState = {
  list: GetUsersResponse;
  query: string;
  isCreateSheetOpen: boolean;
  isEditSheetOpen: boolean;
  isViewSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedItem: IUser | null;
  selectedViewItem: IUser | null;
  selectedDeleteItem: IUser | null;
  setQuery: (query: string) => void;
  setCreateSheetOpen: (open: boolean) => void;
  setEditSheetOpen: (open: boolean) => void;
  setViewSheetOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  openCreate: () => void;
  closeCreateSheet: () => void;
  openEdit: (item: IUser) => void;
  closeEditSheet: () => void;
  openView: (item: IUser) => void;
  closeViewSheet: () => void;
  openDeleteDialog: (item: IUser) => void;
  closeDeleteDialog: () => void;
  addItem: (item: IUser) => void;
  deleteUser: (userId: IUser["id"]) => void;
  updateUser: (userId: IUser["id"], values: CreateCustomerValues) => void;
};

export const useCustomersStore = create<CustomersStoreState>((set) => {
  const seedUsers: IUser[] = [
    {
      _id: "user-1",
      id: "1",
      name: "Customer 1",
      phone: "01700000001",
      email: "customer1@example.com",
      emailVerificationStatus: EMAIL_VERIFICATION_STATUS_ENUMS.VERIFIED,
      type: ACCOUNT_TYPE_ENUMS.CUSTOMER,
      tenantId: "tenant-1",
      createdAt: new Date("2024-01-15T10:00:00Z"),
      updatedAt: new Date("2024-06-01T12:00:00Z"),
    },
  ];

  return {
    list: {
      data: seedUsers,
      meta: {
        pagination: {
          totalDocs: seedUsers.length,
          limit: 10,
          hasPrevPage: false,
          hasNextPage: false,
          page: 1,
          totalPages: 1,
          prevPage: null,
          nextPage: null,
          pagingCounter: 1,
        },
      },
    },
    query: "",
    isCreateSheetOpen: false,
    isEditSheetOpen: false,
    isViewSheetOpen: false,
    isDeleteDialogOpen: false,
    selectedItem: null,
    selectedViewItem: null,
    selectedDeleteItem: null,
    setQuery: (query) => set({ query }),
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
      set((state) => ({
        list: {
          ...state.list,
          data: [...state.list.data, item],
        },
      })),
    deleteUser: (userId) =>
      set((state) => ({
        list: {
          ...state.list,
          data: state.list.data.filter((user) => user.id !== userId),
        },
      })),
    updateUser: (userId, values) =>
      set((state) => ({
        list: {
          ...state.list,
          data: state.list.data.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  ...values,
                  updatedAt: new Date(),
                }
              : user,
          ),
        },
      })),
  };
});
