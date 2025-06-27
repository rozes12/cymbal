// import { create } from "zustand";

// export const useCartStore = create((set) => ({
//   cart: [],
//   addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
//   clearCart: () => set({ cart: [] }),
// }));

// // export default useCartStore;

// stores/cartStore.js

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       cart: [],
//       total: 0, // It's good practice to manage total here or derive it in components

//       // Add item to cart or update quantity if it exists
//       addToCart: (product) =>
//         set((state) => {
//           const existingItemIndex = state.cart.findIndex(
//             (item) => item.id === product.id
//           );

//           if (existingItemIndex > -1) {
//             // Item exists, increase quantity
//             const newCart = [...state.cart];
//             newCart[existingItemIndex] = {
//               ...newCart[existingItemIndex],
//               quantity: newCart[existingItemIndex].quantity + 1,
//             };
//             return { cart: newCart };
//           } else {
//             // Item does not exist, add it with quantity 1
//             return { cart: [...state.cart, { ...product, quantity: 1 }] };
//           }
//         }),

//       // New: Increase quantity of an item
//       increaseQuantity: (itemId) =>
//         set((state) => ({
//           cart: state.cart.map((item) =>
//             item.id === itemId
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           ),
//         })),

//       // New: Decrease quantity of an item
//       decreaseQuantity: (itemId) =>
//         set((state) => ({
//           cart: state.cart
//             .map((item) =>
//               item.id === itemId
//                 ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Ensure quantity doesn't go below 1
//                 : item
//             )
//             .filter((item) => item.quantity > 0), // Remove item if quantity becomes 0 (after decrement)
//         })),

//       // Remove item completely from cart
//       removeItem: (itemId) =>
//         set((state) => ({
//           cart: state.cart.filter((item) => item.id !== itemId),
//         })),

//       clearCart: () => set({ cart: [] }),
//     }),
//     {
//       name: "cart-storage", // name of the item in localStorage
//       storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
//       // You might want to update the total automatically in the store, or derive it in components.
//       // For simplicity, we'll continue to derive it in the component for now.
//     }
//   )
// );

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --- IMPORTANT: Replace this with your actual backend API URL ---
const BACKEND_ADD_TO_CART_API = "http://localhost:3001/api/add-to-cart";
// -----------------------------------------------------------------

export const useCartStore = create(
  persist(
    (set, get) => ({ // 'get' is used to access the current state outside of 'set' calls
      cart: [],
      total: 0, 
      
      // --- START OF NEW ADDITIONS FOR BACKEND CALL AND UI FEEDBACK ---
      isAddingToCart: false, // State to track if an item is currently being added to cart
      addToCartError: null,  // State to store any error messages from the backend call
      // --- END OF NEW ADDITIONS ---

      // Add item to cart or update quantity if it exists
      addToCart: async (product) => { // Made this function 'async'
        set({ isAddingToCart: true, addToCartError: null }); // Set loading state, clear previous errors

        // --- Step 1: Optimistically update local cart state ---
        // This part remains your existing logic for immediate UI feedback
        let quantityToBackend = 1; // Default quantity to send to backend for this action

        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.id === product.id
          );

          if (existingItemIndex > -1) {
            // Item exists, increase quantity locally
            const newCart = [...state.cart];
            newCart[existingItemIndex] = {
              ...newCart[existingItemIndex],
              quantity: newCart[existingItemIndex].quantity + 1,
            };
            // quantityToBackend remains 1 if the backend handles increments.
            // If backend expects the new total quantity, calculate it here:
            // quantityToBackend = newCart[existingItemIndex].quantity; 
            return { cart: newCart };
          } else {
            // Item does not exist, add it with quantity 1 locally
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
          }
        });

        // --- Step 2: Make the backend API call ---
        try {
          const response = await fetch(BACKEND_ADD_TO_CART_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // **IMPORTANT: Add any authentication headers here if your backend requires them**
              // Example for a Bearer token:
              // 'Authorization': Bearer ${localStorage.getItem('userToken')},
              // Example for a custom session ID:
              // 'X-User-Session-ID': localStorage.getItem('userSessionId'),
            },
            body: JSON.stringify({
              productId: product.id,
              quantity: quantityToBackend, // Sending 1 for an 'add' or 'increment' action
              // You can include other product details your backend might need, e.g.:
              // name: product.name,
              // price: product.price,
            })
          });

          if (!response.ok) {
            // If the server response is not OK (e.g., 400, 500 status code)
            const errorData = await response.json(); // Try to parse error message from backend
            console.error('Backend "Add to Cart" failed:', errorData);
            set({ addToCartError: errorData.message || 'Failed to add item to server cart.' });
            
            // OPTIONAL: If your backend is the absolute source of truth for the cart
            // and the API call failed, you might want to revert the optimistic
            // local UI update to keep the local state in sync with the server.
            // You'd need to store the cart state before the local update to revert to it.
            // Example:
            // set({ cart: get().cart.filter(item => item.id !== product.id) }); // Simplified revert for new item
            // OR for quantity increment, re-calculate based on old quantity
          } else {
            // If the backend call was successful
            const data = await response.json(); // Backend might return updated cart, confirmation, etc.
            console.log('Item added to backend cart successfully:', data);
            // OPTIONAL: If your backend returns the definitive, updated cart,
            // you could update your local store's 'cart' state with 'data.updatedCart' here
            // set({ cart: data.updatedCart });
          }

        } catch (error) {
          // This catches network errors (e.g., server unreachable)
          console.error('Network error during "Add to Cart":', error);
          set({ addToCartError: 'Network error: Could not connect to the server.' });
          // OPTIONAL: Revert local state on network error
        } finally {
          set({ isAddingToCart: false }); // Always reset loading state after attempt
        }
      },

      // Other existing cart actions remain unchanged as they are purely client-side
      increaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === itemId
                ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
                : item
            )
            .filter((item) => item.quantity > 0), 
        })),

      removeItem: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", 
      storage: createJSONStorage(() => localStorage), 
      // --- START OF NEW ADDITIONS FOR PERSISTENCE CONTROL ---
      // partialize ensures that transient states like loading/error are NOT saved to localStorage.
      // Only your actual cart data should be persisted.
      partialize: (state) => ({
        cart: state.cart,
        total: state.total,
      }),
      // --- END OF NEW ADDITIONS ---
    }
  )
);