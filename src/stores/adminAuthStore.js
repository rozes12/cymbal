import { create } from "zustand";

export const useAdminAuthStore = create((set) => ({
  isAdmin: false,
  login: (email, password) => {
    if (email === "admin@cymbal.com" && password === "password123") {
      set({ isAdmin: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAdmin: false }),
}));
