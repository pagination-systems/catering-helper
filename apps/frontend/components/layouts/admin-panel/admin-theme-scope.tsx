"use client";

import { useEffect } from "react";

export function AdminThemeScope() {
  useEffect(() => {
    document.body.dataset.appTheme = "admin";

    return () => {
      if (document.body.dataset.appTheme === "admin") {
        delete document.body.dataset.appTheme;
      }
    };
  }, []);

  return null;
}
