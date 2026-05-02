export function canAccessTenant(requestedTenantId: string, allowedTenantIds: string[]): boolean {
  return allowedTenantIds.includes(requestedTenantId);
}

export * from "./customer-ledger.authz";
export * from "./expense.authz";
export * from "./order.authz";
export * from "./package.authz";
export * from "./production-requirement.authz";
export * from "./tenant.authz";
// export * from "./user";
export * from "./user.authz";
