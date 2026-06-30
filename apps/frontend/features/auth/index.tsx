"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAdminContent } from "@/lib/admin-i18n";
import { useLanguage } from "@/providers/language-provider";
import { LoginForm } from "./components/login-form";
import { useAuthStore } from "./store/useStore";

export const Login = () => {
  const { language } = useLanguage();
  const t = getAdminContent(language).login;
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Already signed in — don't show the login form again.
  useEffect(() => {
    if (isAuthenticated) router.replace("/admin/dashboard");
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 space-y-1.5 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t.title}</h1>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
