import type { ACCOUNT_TYPE_ENUMS, EMAIL_VERIFICATION_STATUS_ENUMS, USER_ROLE_ENUMS } from "@catering/types";
import { create } from "zustand";

/** Authenticated user as returned by the backend auth endpoints. */
export type AuthUser = {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  emailVerificationStatus: EMAIL_VERIFICATION_STATUS_ENUMS;
  type: ACCOUNT_TYPE_ENUMS;
  role?: USER_ROLE_ENUMS | null;
  tenantId?: string | null;
  jobProfileId?: string | null;
};

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type AuthStoreState = {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  setStatus: (status: AuthStatus) => void;
  setUser: (user: AuthUser) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  status: "idle",
  isAuthenticated: false,
  setStatus: (status) => set({ status }),
  setUser: (user) => set({ user, status: "authenticated", isAuthenticated: true }),
  clear: () => set({ user: null, status: "unauthenticated", isAuthenticated: false }),
}));
