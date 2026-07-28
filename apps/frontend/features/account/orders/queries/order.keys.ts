export const CUSTOMER_ORDER_KEYS = {
  all: ["account", "orders"] as const,
  lists: () => [...CUSTOMER_ORDER_KEYS.all, "list"] as const,
  details: () => [...CUSTOMER_ORDER_KEYS.all, "detail"] as const,
  detail: (id: string) => [...CUSTOMER_ORDER_KEYS.details(), id] as const,
};
