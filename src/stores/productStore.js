import { create } from "zustand";
// import productsFromJSON from "@/data/products.json";
import productsFromJSON from "@/data/merged_products.json";

export const useProductStore = create((set) => ({
  products: productsFromJSON,
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
}));
