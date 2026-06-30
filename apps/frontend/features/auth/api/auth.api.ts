import { apiClient } from "@/lib/axios";
import type { AuthUser } from "../store/useStore";
import type { LoginValues } from "../schemas/login.schema";

type UserResponse = {
  message: string;
  user: AuthUser & { accessToken?: string; refreshToken?: string };
};

/**
 * Authenticates with email/password. The backend sets httpOnly `__imsat__` /
 * `__imsrt__` cookies on the response, so the browser stores the session for us
 * — we only keep the returned user in memory.
 */
export const login = async (payload: LoginValues): Promise<AuthUser> => {
  const { data } = await apiClient.post<UserResponse>("/auth/login", payload);
  return data.user;
};

/** Hydrates the current session from the httpOnly cookies. */
export const getMe = async (): Promise<AuthUser> => {
  const { data } = await apiClient.get<UserResponse>("/auth/me");
  return data.user;
};

/** Clears the session server-side (revokes tokens and clears cookies). */
export const logout = async (): Promise<void> => {
  await apiClient.delete("/auth/logout");
};
