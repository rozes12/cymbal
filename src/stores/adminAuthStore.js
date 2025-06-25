// import { create } from "zustand";

// export const useAdminAuthStore = create((set) => ({
//   isAdmin: false,
//   login: (email, password) => {
//     if (email === "admin@cymbal.com" && password === "password123") {
//       set({ isAdmin: true });
//       return true;
//     }
//     return false;
//   },
//   logout: () => set({ isAdmin: false }),
// }));

import { create } from 'zustand';

export const useAdminAuthStore = create((set) => ({ // <-- Use 'export const' here
  adminToken: localStorage.getItem('adminToken') || null,
  isAdmin: false,

  setAdminToken: (token) => {
    set({ adminToken: token, isAdmin: !!token });
    if (token) {
      localStorage.setItem('adminToken', token);
    } else {
      localStorage.removeItem('adminToken');
    }
  },

  setIsAdmin: (status) => set({ isAdmin: status }),

  adminLogout: () => {
    set({ adminToken: null, isAdmin: false });
    localStorage.removeItem('adminToken');
  },

  initialize: () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      set({ adminToken: token, isAdmin: true });
    }
  },
}));

// Similar note as above regarding auto-initialization
useAdminAuthStore.getState().initialize();



// import { create } from "zustand";
// import db from '../../db'; // Adjust path if db.js is not in root
// import bcrypt from 'bcryptjs';

// export const useAdminAuthStore = create((set) => ({
//   isAdmin: false,
//   // Make login an async function to handle database operations
//   login: async (email, password) => {
//     try {
//       // Query the database to find the user by email and check if they are an admin
//       // Using .promise() for async/await syntax
//       const [rows] = await db.promise().query(
//         'SELECT password, is_admin FROM users WHERE email = ?',
//         [email]
//       );

//       if (rows.length === 0) {
//         console.log("Admin login failed: User not found.");
//         return false; // User not found
//       }

//       const user = rows[0];

//       // Compare the provided password with the hashed password from the database
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (passwordMatch && user.is_admin) {
//         set({ isAdmin: true });
//         console.log("Admin login successful.");
//         return true;
//       } else {
//         console.log("Admin login failed: Incorrect password or not an admin.");
//         return false;
//       }
//     } catch (error) {
//       console.error("Error during admin login:", error);
//       // Depending on the error, you might want more specific handling
//       return false;
//     }
//   },
//   logout: () => set({ isAdmin: false }),
// }));