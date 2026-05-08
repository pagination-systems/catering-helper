export const PACKAGE_KEYS = {
  all: ["packages"] as const,
  lists: (filters?: Record<string, any>) =>
    filters ? ([...PACKAGE_KEYS.all, "list", filters] as const) : ([...PACKAGE_KEYS.all, "list"] as const),
  list: (filters?: string) => [...PACKAGE_KEYS.lists(), { filters }] as const,
  details: () => [...PACKAGE_KEYS.all, "detail"] as const,
  detail: (id: string) => [...PACKAGE_KEYS.details(), id] as const,
};
