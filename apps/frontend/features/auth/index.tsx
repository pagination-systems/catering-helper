"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAdminContent } from "@/lib/admin-i18n";
import { useLanguage } from "@/providers/language-provider";
import { AuthShell } from "./components/auth-shell";
import { ForgotPasswordForm } from "./components/forgot-password-form";
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
    <AuthShell title={t.title} subtitle={t.subtitle}>
      <LoginForm />
    </AuthShell>
  );
};

export const ForgotPassword = () => {
  const { language } = useLanguage();
  const t = getAdminContent(language).forgotPassword;

  return (
    <AuthShell title={t.title} subtitle={t.subtitle}>
      <ForgotPasswordForm />
    </AuthShell>
  );
};
