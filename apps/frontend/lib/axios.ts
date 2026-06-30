import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "@/features/auth/store/useStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

type RetryableRequestConfig = AxiosRequestConfig & { _retry?: boolean };

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Rotate tokens using the httpOnly refresh cookie, then replay the request.
        // Uses a bare axios call so it doesn't recurse through this interceptor.
        await axios.get(`${API_BASE_URL}/auth/refresh-access-token`, { withCredentials: true });

        return apiClient(originalRequest);
      } catch (refreshError) {
        // Session is gone — let the auth-aware UI redirect to the login screen.
        useAuthStore.getState().clear();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
