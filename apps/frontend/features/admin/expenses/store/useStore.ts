import { create } from "zustand";
import { type CreateExpenseValues, EXPENSE_CATEGORY_ENUM, type IExpense } from "../schemas/expense.schema";

type CategoryFilter = "all" | EXPENSE_CATEGORY_ENUM;

type ExpensesStore = {
  list: IExpense[];
  query: string;
  categoryFilter: CategoryFilter;
  isCreateSheetOpen: boolean;
  isEditSheetOpen: boolean;
  isViewSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedItem: IExpense | null;
  selectedViewItem: IExpense | null;
  selectedDeleteItem: IExpense | null;
  setQuery: (query: string) => void;
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
  addExpense: (values: CreateExpenseValues) => void;
  updateExpense: (expenseId: IExpense["id"], values: CreateExpenseValues) => void;
  deleteExpense: (expenseId: IExpense["id"]) => void;
};

const initial: IExpense[] = [
  {
    id: crypto.randomUUID(),
    label: "Office Rent",
    description: "Monthly office rent payment",
    date: new Date("2024-05-01"),
    category: EXPENSE_CATEGORY_ENUM.RENT,
    amount: 1500,
    createdAt: new Date("2024-05-01T10:00:00Z"),
    updatedAt: new Date("2024-05-01T10:00:00Z"),
  },
  {
    id: crypto.randomUUID(),
    label: "Team Lunch",
    description: "Lunch for the team after project completion",
    date: new Date("2024-05-15"),
    category: EXPENSE_CATEGORY_ENUM.FOOD_AND_RAW_MATERIALS,
    amount: 300,
    createdAt: new Date("2024-05-15T12:00:00Z"),
    updatedAt: new Date("2024-05-15T12:00:00Z"),
  },
  {
    id: crypto.randomUUID(),
    label: "Software Subscription",
    description: "Monthly subscription for project management software",
    date: new Date("2024-05-20"),
    category: EXPENSE_CATEGORY_ENUM.SOFTWARE,
    amount: 50,
    createdAt: new Date("2024-05-20T09:00:00Z"),
    updatedAt: new Date("2024-05-20T09:00:00Z"),
  },
];

export const useExpensesStore = create<ExpensesStore>((set) => ({
  list: initial,
  query: "",
  categoryFilter: "all",
  isCreateSheetOpen: false,
  isEditSheetOpen: false,
  isViewSheetOpen: false,
  isDeleteDialogOpen: false,
  selectedItem: null,
  selectedViewItem: null,
  selectedDeleteItem: null,
  setQuery: (query) => set({ query }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  setCreateSheetOpen: (isCreateSheetOpen) => set({ isCreateSheetOpen }),
  setEditSheetOpen: (isEditSheetOpen) => set({ isEditSheetOpen }),
  setViewSheetOpen: (isViewSheetOpen) => set({ isViewSheetOpen }),
  setDeleteDialogOpen: (isDeleteDialogOpen) => set({ isDeleteDialogOpen }),
  openCreate: () =>
    set({ isCreateSheetOpen: true, isEditSheetOpen: false, isViewSheetOpen: false, selectedItem: null }),
  closeCreateSheet: () => set({ isCreateSheetOpen: false }),
  openEdit: (item) =>
    set({ isEditSheetOpen: true, selectedItem: item, isCreateSheetOpen: false, isViewSheetOpen: false }),
  closeEditSheet: () => set({ isEditSheetOpen: false, selectedItem: null }),
  openView: (item) =>
    set({ isViewSheetOpen: true, selectedViewItem: item, isCreateSheetOpen: false, isEditSheetOpen: false }),
  closeViewSheet: () => set({ isViewSheetOpen: false, selectedViewItem: null }),
  openDeleteDialog: (item) => set({ isDeleteDialogOpen: true, selectedDeleteItem: item }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false, selectedDeleteItem: null }),
  addExpense: (values) =>
    set((state) => {
      const now = new Date();
      const next: IExpense = {
        id: crypto.randomUUID(),
        label: values.label,
        description: values.description,
        date: new Date(values.date),
        category: values.category,
        amount: values.amount,
        createdAt: now,
        updatedAt: now,
      };

      return { list: [next, ...state.list] };
    }),
  updateExpense: (expenseId, values) =>
    set((state) => {
      const now = new Date();
      return {
        list: state.list.map((expense) =>
          expense.id === expenseId
            ? {
                ...expense,
                label: values.label,
                description: values.description,
                date: new Date(values.date),
                category: values.category,
                amount: values.amount,
                updatedAt: now,
              }
            : expense,
        ),
      };
    }),
  deleteExpense: (expenseId) =>
    set((state) => ({
      list: state.list.filter((expense) => expense.id !== expenseId),
    })),
}));
