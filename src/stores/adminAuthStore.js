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

// import { create } from 'zustand';

// export const useAdminAuthStore = create((set) => ({ // <-- Use 'export const' here
//   adminToken: localStorage.getItem('adminToken') || null,
//   isAdmin: false,

//   setAdminToken: (token) => {
//     set({ adminToken: token, isAdmin: !!token });
//     if (token) {
//       localStorage.setItem('adminToken', token);
//     } else {
//       localStorage.removeItem('adminToken');
//     }
//   },

//   setIsAdmin: (status) => set({ isAdmin: status }),

//   adminLogout: () => {
//     set({ adminToken: null, isAdmin: false });
//     localStorage.removeItem('adminToken');
//   },

//   initialize: () => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       set({ adminToken: token, isAdmin: true });
//     }
//   },
// }));

// // Similar note as above regarding auto-initialization
// useAdminAuthStore.getState().initialize();


