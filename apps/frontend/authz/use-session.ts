"use client";

import { ACCOUNT_TYPE_ENUMS, type ISession } from "@catering/types";
import { useMemo } from "react";
import type { AuthUser } from "@/features/auth/store/useStore";
import { useAuthStore } from "@/features/auth/store/useStore";

const buildName = (user: AuthUser): string => {
  if (user.fullName?.trim()) return user.fullName;
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.email;
};

/**
 * Derives the CASL `ISession` from the authenticated user held in the auth
 * store. Returns `null` while unauthenticated so `AbilityProvider` falls back
 * to an empty ability set.
 *
 * Note: the access token is an httpOnly cookie and is intentionally not exposed
 * to the client; authorization rules rely on `user.type` / `tenantId` only.
 */
export const useSession = (): ISession | null => {
  const user = useAuthStore((s) => s.user);

  return useMemo(() => {
    if (!user) return null;

    return {
      accessToken: "",
      tenantId: user.tenantId ?? undefined,
      user: {
        _id: user.id,
        id: user.id,
        phone: "",
        name: buildName(user),
        email: user.email,
        type: user.type ?? ACCOUNT_TYPE_ENUMS.CUSTOMER,
        role: user.role ?? undefined,
        emailVerificationStatus: user.emailVerificationStatus,
        tenantId: user.tenantId ?? "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }, [user]);
};
