import { create } from "zustand";
import { type CreateUserValues, type GetUsersResponse, type IUser, UserRole } from "../schemas/user.schema";

type UsersStoreState = {
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
  updateUser: (userId: IUser["id"], values: CreateUserValues) => void;
};

export const useUsersStore = create<UsersStoreState>((set) => ({
  list: {
    data: [
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        role: UserRole.Admin,
        createdAt: new Date("2024-01-15T10:00:00Z"),
        updatedAt: new Date("2024-06-01T12:00:00Z"),
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob.smith@example.com",
        role: UserRole.Manager,
        createdAt: new Date("2024-02-20T14:30:00Z"),
        updatedAt: new Date("2024-06-05T09:45:00Z"),
      },
      {
        id: "3",
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        role: UserRole.Support,
        createdAt: new Date("2024-03-10T08:15:00Z"),
        updatedAt: new Date("2024-06-10T16:20:00Z"),
      },
    ],
    meta: {
      pagination: {
        totalDocs: 0,
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
}));
