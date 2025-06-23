// import { create } from "zustand";

// export const useCartStore = create((set) => ({
//   cart: [],
//   addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
//   clearCart: () => set({ cart: [] }),
// }));

// // export default useCartStore;

// stores/cartStore.js

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      total: 0, // It's good practice to manage total here or derive it in components

      // Add item to cart or update quantity if it exists
      addToCart: (product) =>
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.id === product.id
          );

          if (existingItemIndex > -1) {
            // Item exists, increase quantity
            const newCart = [...state.cart];
            newCart[existingItemIndex] = {
              ...newCart[existingItemIndex],
              quantity: newCart[existingItemIndex].quantity + 1,
            };
            return { cart: newCart };
          } else {
            // Item does not exist, add it with quantity 1
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
          }
        }),

      // New: Increase quantity of an item
      increaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // New: Decrease quantity of an item
      decreaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === itemId
                ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Ensure quantity doesn't go below 1
                : item
            )
            .filter((item) => item.quantity > 0), // Remove item if quantity becomes 0 (after decrement)
        })),

      // Remove item completely from cart
      removeItem: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // You might want to update the total automatically in the store, or derive it in components.
      // For simplicity, we'll continue to derive it in the component for now.
    }
  )
);