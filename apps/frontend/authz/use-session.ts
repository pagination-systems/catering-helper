"use client";

import { type ISession, USER_ROLE_ENUM } from "@catering/types";
import { useMemo } from "react";

export const useSession = (): ISession => {
  const session = useMemo(
    () => ({
      user: {
        id: "user-1",
        phone: "01790362665",
        name: "Catering Admin",
        role: USER_ROLE_ENUM.CATERING_ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      tenantId: undefined,
    }),
    [],
  );

  return session;
};
