export const EXPENSE_KEYS = {
  all: ["expenses"] as const,
  lists: (filters?: object) =>
    filters ? ([...EXPENSE_KEYS.all, "list", filters] as const) : ([...EXPENSE_KEYS.all, "list"] as const),
  list: (filters?: string) => [...EXPENSE_KEYS.lists(), { filters }] as const,
  details: () => [...EXPENSE_KEYS.all, "detail"] as const,
  detail: (id: string) => [...EXPENSE_KEYS.details(), id] as const,
};
