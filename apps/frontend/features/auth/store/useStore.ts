import { create } from "zustand";

type AuthStoreState = {
  isAuthenticated: boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  isAuthenticated: true,
  logout: () => set({ isAuthenticated: false }),
}));
