"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/lib/toast";
import * as authApi from "../api/auth.api";
import type { LoginValues } from "../schemas/login.schema";
import { useAuthStore } from "../store/useStore";

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
      router.replace("/admin/dashboard");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Invalid email or password.");
    },
  });

  const login = (values: LoginValues) => mutation.mutate(values);

  return { login, isSubmitting: mutation.isPending };
};

export const useLogout = () => {
  const router = useRouter();
  const clear = useAuthStore((s) => s.clear);

  const mutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clear();
      router.replace("/admin/login");
    },
  });

  return { logout: () => mutation.mutate(), isLoggingOut: mutation.isPending };
};
