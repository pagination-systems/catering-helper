import { useQuery } from "@tanstack/react-query";
import { getTenant } from "@/features/admin/tenants/api/tenant.api";
import { TENANT_KEYS } from "@/features/admin/tenants/queries/tenant.keys";

/**
 * Delivery fee is owned by the tenant. This mirrors the backend's authoritative
 * value so the order form preview matches what will be saved. Returns 0 when no
 * tenant is in context (e.g. the global orders page before an order is placed).
 */
export const useTenantDeliveryFee = (tenantId?: string): number => {
  const { data } = useQuery({
    queryKey: TENANT_KEYS.detail(tenantId as string),
    queryFn: () => getTenant(tenantId as string),
    enabled: !!tenantId,
  });

  return data?.deliveryFee ?? 0;
};
