import { apiClient } from "@/lib/axios";
import type { LoginValues } from "../schemas/login.schema";
import type { RegisterValues } from "../schemas/register.schema";
import type { AuthUser } from "../store/useStore";

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

/** Public sign-up. The backend always creates a customer account. */
export const register = async (payload: Omit<RegisterValues, "confirmPassword">): Promise<AuthUser> => {
  const { data } = await apiClient.post<UserResponse>("/auth/registration", payload);
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

/** Updates the signed-in user's own profile (name). Returns the fresh user. */
export const updateProfile = async (payload: { firstName: string; lastName: string }): Promise<AuthUser> => {
  const { data } = await apiClient.put<UserResponse>("/auth/me", payload);
  return data.user;
};

/** Changes the signed-in user's password after verifying the current one. */
export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const { data } = await apiClient.put<{ message: string }>("/auth/me/password", payload);
  return { message: data.message };
};
