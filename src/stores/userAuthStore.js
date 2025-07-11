// // src/stores/userAuthStore.js
// import { create } from 'zustand';

// export const useUserAuthStore = create((set) => ({
//   userToken: localStorage.getItem('userToken') || null,
//   isLoggedIn: false, // Initial state, will be true if userToken exists on load

//   // Action to set the user's token after successful login
//   setUserToken: (token) => {
//     set({ userToken: token, isLoggedIn: !!token });
//     if (token) {
//       localStorage.setItem('userToken', token);
//     } else {
//       localStorage.removeItem('userToken');
//     }
//   },

//   // Action to log out the user
//   userLogout: () => {
//     set({ userToken: null, isLoggedIn: false });
//     localStorage.removeItem('userToken');
//     // You might want to navigate to the home or login page here
//     // If you do, you'll need `useNavigate` from react-router-dom
//     // import { useNavigate } from 'react-router-dom';
//     // const navigate = useNavigate(); // Inside a component
//     // navigate('/');
//   },

//   // Initialize isLoggedIn based on userToken presence on store creation
//   // This is a common pattern for re-hydrating state from localStorage
//   initialize: () => {
//     const token = localStorage.getItem('userToken');
//     if (token) {
//       set({ userToken: token, isLoggedIn: true });
//     }
//   },
// }));

// // Call initialize when the store is created to check for existing token
// // This ensures that on page reload, if a token exists, isLoggedIn is correctly set.
// useUserAuthStore.getState().initialize();





import { create } from 'zustand';

export const useUserAuthStore = create((set) => ({ // <-- Use 'export const' here
  userToken: localStorage.getItem('userToken') || null,
  isLoggedIn: false,

  setUserToken: (token) => {
    set({ userToken: token, isLoggedIn: !!token });
    if (token) {
      localStorage.setItem('userToken', token);
    } else {
      localStorage.removeItem('userToken');
    }
  },

  userLogout: () => {
    set({ userToken: null, isLoggedIn: false });
    localStorage.removeItem('userToken');
  },

  initialize: () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      set({ userToken: token, isLoggedIn: true });
    }
  },
}));

// The line below is a common pattern to auto-initialize on module load,
// but ensure it doesn't cause hydration issues if you're using SSR.
// If you've already called initialize in App.jsx's useEffect, you might remove this.
// For client-side only apps, it's generally fine.
useUserAuthStore.getState().initialize();