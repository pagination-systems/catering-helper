export function canAccessTenant(requestedTenantId: string, allowedTenantIds: string[]): boolean {
  return allowedTenantIds.includes(requestedTenantId);
}

export * from "./user";
