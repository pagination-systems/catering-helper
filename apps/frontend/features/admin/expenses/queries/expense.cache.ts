import type { QueryClient } from "@tanstack/react-query";
import type { ExpenseCache, ExpenseFormInput, ExpensesCache, IExpense } from "../schemas/expense.schema";
import { EXPENSE_KEYS } from "./expense.keys";

type UpdateVars = { id: string; payload: Partial<ExpenseFormInput> };
type Previous = [unknown, ExpensesCache | undefined][];

export const expenseCache = {
  optimisticUpdate(queryClient: QueryClient, { id, payload }: UpdateVars) {
    const previous = queryClient.getQueriesData<ExpensesCache>({
      queryKey: EXPENSE_KEYS.lists(),
    }) as Previous;

    const existing = previous
      .flatMap(([, cache]) => cache?.items ?? [])
      .find((item) => item.id === id);

    if (existing) {
      this.update(queryClient, {
        ...existing,
        ...payload,
        date: payload.date ? new Date(payload.date) : existing.date,
        id,
        updatedAt: new Date(),
      });
    }

    return { previous };
  },

  update(queryClient: QueryClient, updated: IExpense) {
    queryClient.setQueriesData<ExpensesCache>({ queryKey: EXPENSE_KEYS.lists() }, (old) => {
      if (!old) return old;
      return { ...old, items: old.items.map((item) => (item.id === updated.id ? updated : item)) };
    });

    queryClient.setQueryData<ExpenseCache>(EXPENSE_KEYS.detail(updated.id), (old) => {
      if (!old) return { item: updated };
      return { ...old, item: updated };
    });
  },

  optimisticHardDelete(queryClient: QueryClient, id: string) {
    const previous = queryClient.getQueriesData<ExpensesCache>({
      queryKey: EXPENSE_KEYS.lists(),
    }) as Previous;

    queryClient.setQueriesData<ExpensesCache>({ queryKey: EXPENSE_KEYS.lists() }, (old) => {
      if (!old) return old;
      return { ...old, items: old.items.filter((item) => item.id !== id) };
    });

    queryClient.removeQueries({ queryKey: EXPENSE_KEYS.detail(id) });

    return { previous };
  },

  rollback(queryClient: QueryClient, previous: Previous | undefined) {
    previous?.forEach(([key, data]) => {
      queryClient.setQueryData(key as Parameters<typeof queryClient.setQueryData>[0], data);
    });
  },
};
