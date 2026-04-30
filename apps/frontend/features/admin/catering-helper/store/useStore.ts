import { type IUser, USER_ROLE_ENUM } from "@catering/types";
import { create } from "zustand";
import type { GetSentInvitationsResponse, GetUsersResponse, SentInvitation } from "../schemas/user.schema";

type UsersStoreState = {
  list: GetUsersResponse;
  sentInvitations: GetSentInvitationsResponse;
  query: string;
  isInvitationSheetOpen: boolean;
  isInvitationHistorySheetOpen: boolean;
  isViewSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedViewItem: IUser | null;
  selectedDeleteItem: IUser | null;
  setQuery: (query: string) => void;
  setInvitationSheetOpen: (open: boolean) => void;
  setInvitationHistorySheetOpen: (open: boolean) => void;
  setViewSheetOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  openInvitation: () => void;
  closeInvitationSheet: () => void;
  openInvitationHistory: () => void;
  closeInvitationHistorySheet: () => void;
  openView: (item: IUser) => void;
  closeViewSheet: () => void;
  openDeleteDialog: (item: IUser) => void;
  closeDeleteDialog: () => void;
  deleteUser: (userId: IUser["id"]) => void;
  resendInvitation: (invitationId: SentInvitation["id"]) => void;
  deleteInvitation: (invitationId: SentInvitation["id"]) => void;
};

export const useUsersStore = create<UsersStoreState>((set) => {
  const seedUsers: IUser[] = [
    {
      id: "1",
      name: "Harun Or Rashid",
      phone: "01790362665",
      role: USER_ROLE_ENUM.PLATFORM_ADMIN,
      createdAt: new Date("2024-01-15T10:00:00Z"),
      updatedAt: new Date("2024-06-01T12:00:00Z"),
    },
    {
      id: "2",
      name: "Khairul Bashar",
      phone: "01790362666",
      role: USER_ROLE_ENUM.PLATFORM_ADMIN,
      createdAt: new Date("2024-02-20T14:30:00Z"),
      updatedAt: new Date("2024-06-05T09:45:00Z"),
    },
    {
      id: "3",
      name: "Md. Jewel Rana",
      phone: "01790362667",
      role: USER_ROLE_ENUM.PLATFORM_ADMIN,
      createdAt: new Date("2024-03-10T08:15:00Z"),
      updatedAt: new Date("2024-06-10T16:20:00Z"),
    },
    {
      id: "4",
      name: "Sayem Abedin",
      phone: "01790362668",
      role: USER_ROLE_ENUM.PLATFORM_ADMIN,
      createdAt: new Date("2024-04-02T09:00:00Z"),
      updatedAt: new Date("2024-06-12T11:30:00Z"),
    },
  ];

  const seedInvitations: SentInvitation[] = [
    {
      id: "inv-1",
      phone: "01790362671",
      lastSentAt: new Date("2026-04-28T10:45:00Z"),
    },
    {
      id: "inv-2",
      phone: "01790362672",
      lastSentAt: new Date("2026-04-27T15:20:00Z"),
    },
    {
      id: "inv-3",
      phone: "01790362673",
      lastSentAt: new Date("2026-04-25T08:30:00Z"),
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
    sentInvitations: {
      data: seedInvitations,
      meta: {
        pagination: {
          totalDocs: seedInvitations.length,
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
    isInvitationSheetOpen: false,
    isInvitationHistorySheetOpen: false,
    isViewSheetOpen: false,
    isDeleteDialogOpen: false,
    selectedViewItem: null,
    selectedDeleteItem: null,
    setQuery: (query) => set({ query }),
    setInvitationSheetOpen: (open) =>
      set({
        isInvitationSheetOpen: open,
      }),
    setInvitationHistorySheetOpen: (open) =>
      set({
        isInvitationHistorySheetOpen: open,
      }),

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
    openInvitation: () =>
      set({
        isInvitationSheetOpen: true,
        isInvitationHistorySheetOpen: false,
        isViewSheetOpen: false,
        selectedViewItem: null,
      }),
    closeInvitationSheet: () => set({ isInvitationSheetOpen: false }),
    openInvitationHistory: () =>
      set({
        isInvitationHistorySheetOpen: true,
        isInvitationSheetOpen: false,
        isViewSheetOpen: false,
        selectedViewItem: null,
      }),
    closeInvitationHistorySheet: () => set({ isInvitationHistorySheetOpen: false }),

    openView: (item) =>
      set({
        isViewSheetOpen: true,
        isInvitationHistorySheetOpen: false,
        isInvitationSheetOpen: false,
        selectedViewItem: item,
      }),
    closeViewSheet: () => set({ isViewSheetOpen: false, selectedViewItem: null }),
    openDeleteDialog: (item) => set({ isDeleteDialogOpen: true, selectedDeleteItem: item }),
    closeDeleteDialog: () => set({ isDeleteDialogOpen: false, selectedDeleteItem: null }),
    deleteUser: (userId) =>
      set((state) => ({
        list: {
          ...state.list,
          data: state.list.data.filter((user) => user.id !== userId),
        },
      })),
    resendInvitation: (invitationId) =>
      set((state) => ({
        sentInvitations: {
          ...state.sentInvitations,
          data: state.sentInvitations.data.map((invitation) =>
            invitation.id === invitationId ? { ...invitation, lastSentAt: new Date() } : invitation,
          ),
        },
      })),
    deleteInvitation: (invitationId) =>
      set((state) => ({
        sentInvitations: {
          ...state.sentInvitations,
          data: state.sentInvitations.data.filter((invitation) => invitation.id !== invitationId),
        },
      })),
  };
});
