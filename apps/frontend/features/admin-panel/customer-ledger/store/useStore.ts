import { create } from "zustand";
import type {
  GetCustomerLedgerResponse,
  ICustomerLedger,
  UpdateLedgerPaymentValues,
} from "../schemas/customer-ledger.schema";

type CustomerLedgerStoreState = {
  list: GetCustomerLedgerResponse;
  query: string;
  isEditSheetOpen: boolean;
  selectedItem: ICustomerLedger | null;
  setQuery: (query: string) => void;
  setEditSheetOpen: (open: boolean) => void;
  openEdit: (item: ICustomerLedger) => void;
  closeEditSheet: () => void;
  updatePaidAmount: (ledgerId: ICustomerLedger["id"], values: UpdateLedgerPaymentValues) => void;
};

const buildPagination = (totalDocs: number): GetCustomerLedgerResponse["meta"]["pagination"] => ({
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

const hydrateLedger = (item: Omit<ICustomerLedger, "dueAmount">): ICustomerLedger => ({
  ...item,
  dueAmount: Math.max(0, item.totalAmount - item.totalPaidAmount),
});

const initialLedgers: ICustomerLedger[] = [
  {
    id: "ledger-1",
    customerName: "Rahim Uddin",
    customerPhone: "01711000001",
    totalAmount: 5200,
    totalPaidAmount: 3400,
    createdAt: new Date("2026-04-15T10:00:00Z"),
    updatedAt: new Date("2026-04-20T09:30:00Z"),
  },
  {
    id: "ledger-2",
    customerName: "Nafisa Karim",
    customerPhone: "01822000002",
    totalAmount: 7800,
    totalPaidAmount: 5000,
    createdAt: new Date("2026-04-14T11:20:00Z"),
    updatedAt: new Date("2026-04-22T08:45:00Z"),
  },
  {
    id: "ledger-3",
    customerName: "Aman Group Ltd",
    customerPhone: "01933000003",
    totalAmount: 13200,
    totalPaidAmount: 8000,
    createdAt: new Date("2026-04-11T09:15:00Z"),
    updatedAt: new Date("2026-04-23T12:10:00Z"),
  },
  {
    id: "ledger-4",
    customerName: "Mehedi Hasan",
    customerPhone: "01644000004",
    totalAmount: 4100,
    totalPaidAmount: 4100,
    createdAt: new Date("2026-04-10T08:40:00Z"),
    updatedAt: new Date("2026-04-19T13:00:00Z"),
  },
  {
    id: "ledger-5",
    customerName: "Shamim Enterprise",
    customerPhone: "01555000005",
    totalAmount: 9600,
    totalPaidAmount: 6200,
    createdAt: new Date("2026-04-12T14:25:00Z"),
    updatedAt: new Date("2026-04-24T10:50:00Z"),
  },
  {
    id: "ledger-6",
    customerName: "Arifa Sultana",
    customerPhone: "01366000006",
    totalAmount: 3700,
    totalPaidAmount: 2100,
    createdAt: new Date("2026-04-13T16:35:00Z"),
    updatedAt: new Date("2026-04-21T11:05:00Z"),
  },
  {
    id: "ledger-7",
    customerName: "Zaman Trading",
    customerPhone: "01777000007",
    totalAmount: 11800,
    totalPaidAmount: 9000,
    createdAt: new Date("2026-04-09T07:50:00Z"),
    updatedAt: new Date("2026-04-22T15:25:00Z"),
  },
  {
    id: "ledger-8",
    customerName: "Rifat Chowdhury",
    customerPhone: "01488000008",
    totalAmount: 4400,
    totalPaidAmount: 2200,
    createdAt: new Date("2026-04-16T13:10:00Z"),
    updatedAt: new Date("2026-04-25T09:40:00Z"),
  },
].map(hydrateLedger);

export const useCustomerLedgerStore = create<CustomerLedgerStoreState>((set) => ({
  list: {
    data: initialLedgers,
    meta: {
      pagination: buildPagination(initialLedgers.length),
    },
  },
  query: "",
  isEditSheetOpen: false,
  selectedItem: null,
  setQuery: (query) => set({ query }),
  setEditSheetOpen: (open) =>
    set((state) => ({
      isEditSheetOpen: open,
      selectedItem: open ? state.selectedItem : null,
    })),
  openEdit: (item) =>
    set({
      isEditSheetOpen: true,
      selectedItem: item,
    }),
  closeEditSheet: () => set({ isEditSheetOpen: false, selectedItem: null }),
  updatePaidAmount: (ledgerId, values) =>
    set((state) => ({
      list: {
        ...state.list,
        data: state.list.data.map((ledger) => {
          if (ledger.id !== ledgerId) return ledger;

          const payableDue = Math.max(0, ledger.totalAmount - ledger.totalPaidAmount);
          const safePaidAmount = Math.min(payableDue, Math.max(0, values.paidAmount));
          const nextPaidAmount = ledger.totalPaidAmount + safePaidAmount;

          return {
            ...ledger,
            totalPaidAmount: nextPaidAmount,
            dueAmount: Math.max(0, ledger.totalAmount - nextPaidAmount),
            updatedAt: new Date(),
          };
        }),
      },
    })),
}));
