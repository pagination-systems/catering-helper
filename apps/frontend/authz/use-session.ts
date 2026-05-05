"use client";

import { ACCOUNT_TYPE_ENUMS, EMAIL_VERIFICATION_STATUS_ENUMS, type ISession } from "@catering/types";
import { useMemo } from "react";

export const useSession = (): ISession => {
  const session = useMemo(
    () => ({
      user: {
        _id: "user-1",
        id: "user-1",
        phone: "01790362665",
        name: "Platform Admin",
        email: "admin@example.com",
        type: ACCOUNT_TYPE_ENUMS.ADMIN,
        emailVerificationStatus: EMAIL_VERIFICATION_STATUS_ENUMS.VERIFIED,
        tenantId: "tenant-1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      accessToken: "mock-access-token",
      tenantId: undefined,
    }),
    [],
  );

  return session;
};
