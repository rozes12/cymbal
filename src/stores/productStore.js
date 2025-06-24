// import { create } from "zustand";
// import productsFromJSON from "@/data/products.json";
// import productsFromJSON from "@/data/merged_products.json";

// export const useProductStore = create((set) => ({
//   products: productsFromJSON,
//   approveProduct: (id) =>
//     set((state) => ({
//       products: state.products.map((p) =>
//         p.id === id ? { ...p, approved: true } : p
//       ),
//     })),
//   deleteProduct: (id) =>
//     set((state) => ({
//       products: state.products.filter((p) => p.id !== id),
//     })),
// }));


// 🔁 OLD
// import productsFromJSON from "@/data/merged_products.json";

import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  loading: true,
  approveProduct: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, approved: true } : p
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  fetchProducts: async () => {
    try {
      const res = await fetch(
        "https://storage.googleapis.com/cymre/data/merged_products.json"
      );
      const data = await res.json();
      set({ products: data, loading: false });
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
      set({ loading: false });
    }
  },
}));
