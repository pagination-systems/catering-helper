export const TENANT_KEYS = {
  all: ["tenants"] as const,
  lists: (filters?: Record<string, unknown>) =>
    filters ? ([...TENANT_KEYS.all, "list", filters] as const) : ([...TENANT_KEYS.all, "list"] as const),
  details: () => [...TENANT_KEYS.all, "detail"] as const,
  detail: (id: string) => [...TENANT_KEYS.details(), id] as const,
};
