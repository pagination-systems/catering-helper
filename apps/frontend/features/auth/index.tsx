"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAdminContent } from "@/lib/admin-i18n";
import { useLanguage } from "@/providers/language-provider";
import { AuthShell } from "./components/auth-shell";
import { ForgotPasswordForm } from "./components/forgot-password-form";
import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";
import { getPostLoginPath } from "./hooks/useAuth";
import { useAuthStore } from "./store/useStore";

export const Login = () => {
  const { language } = useLanguage();
  const t = getAdminContent(language).login;
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Already signed in — send them to their role's home instead of the form.
  useEffect(() => {
    if (isAuthenticated && user) router.replace(getPostLoginPath(user));
  }, [isAuthenticated, user, router]);

  return (
    <AuthShell title={t.title} subtitle={t.subtitle}>
      <LoginForm />
    </AuthShell>
  );
};

export const Register = () => {
  const { language } = useLanguage();
  const t = getAdminContent(language).register;
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && user) router.replace(getPostLoginPath(user));
  }, [isAuthenticated, user, router]);

  return (
    <AuthShell title={t.title} subtitle={t.subtitle}>
      <RegisterForm />
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
