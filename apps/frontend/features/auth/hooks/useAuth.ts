"use client";

import { ACCOUNT_TYPE_ENUMS } from "@catering/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/lib/toast";
import * as authApi from "../api/auth.api";
import type { LoginValues } from "../schemas/login.schema";
import type { RegisterValues } from "../schemas/register.schema";
import { type AuthUser, useAuthStore } from "../store/useStore";

/** Landing route after authentication, based on the user's account type. */
export const getPostLoginPath = (user: AuthUser): string =>
  user.type === ACCOUNT_TYPE_ENUMS.CUSTOMER ? "/" : "/admin/dashboard";

/**
 * Hydrates the auth store from the session cookie on first mount. Safe to call
 * from any always-mounted client component inside the authenticated area.
 */
export const useAuthBootstrap = () => {
  const status = useAuthStore((s) => s.status);
  const setStatus = useAuthStore((s) => s.setStatus);
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clear);

  useEffect(() => {
    if (status !== "idle") return;

    setStatus("loading");
    authApi
      .getMe()
      .then((user) => setUser(user))
      .catch(() => clear());
  }, [status, setStatus, setUser, clear]);
};

export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      setUser(user);
      toast.success("Signed in successfully.");
      router.replace(getPostLoginPath(user));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Invalid email or password.");
    },
  });

  const login = (values: LoginValues) => mutation.mutate(values);

  return { login, isSubmitting: mutation.isPending };
};

export const useRegister = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const mutation = useMutation({
    mutationFn: async ({ confirmPassword: _confirmPassword, ...values }: RegisterValues) => {
      await authApi.register(values);
      // Sign in immediately so the new customer gets an active session.
      return authApi.login({ email: values.email, password: values.password });
    },
    onSuccess: (user) => {
      setUser(user);
      toast.success("Account created successfully.");
      router.replace(getPostLoginPath(user));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Could not create your account.");
    },
  });

  const register = (values: RegisterValues) => mutation.mutate(values);

  return { register, isSubmitting: mutation.isPending };
};

export const useUpdateProfile = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const mutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (user) => {
      setUser(user);
      toast.success("Profile updated successfully.");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Could not update your profile.");
    },
  });

  return { updateProfile: mutation.mutateAsync, isSaving: mutation.isPending };
};

export const useChangePassword = () => {
  const mutation = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Could not change your password.");
    },
  });

  return { changePassword: mutation.mutateAsync, isSaving: mutation.isPending };
};

export const useLogout = () => {
  const router = useRouter();
  const clear = useAuthStore((s) => s.clear);

  const mutation = useMutation({
    mutationFn: authApi.logout,
  });

  const logout = (redirectTo = "/admin/login") =>
    mutation.mutate(undefined, {
      onSettled: () => {
        clear();
        router.replace(redirectTo);
      },
    });

  return { logout, isLoggingOut: mutation.isPending };
};
