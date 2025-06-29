// // import { create } from "zustand";
// // import productsFromJSON from "@/data/products.json";
// // import productsFromJSON from "@/data/merged_products.json";

// // export const useProductStore = create((set) => ({
// //   products: productsFromJSON,
// //   approveProduct: (id) =>
// //     set((state) => ({
// //       products: state.products.map((p) =>
// //         p.id === id ? { ...p, approved: true } : p
// //       ),
// //     })),
// //   deleteProduct: (id) =>
// //     set((state) => ({
// //       products: state.products.filter((p) => p.id !== id),
// //     })),
// // }));


// // 🔁 OLD
// // import productsFromJSON from "@/data/merged_products.json";

// import { create } from "zustand";

// export const useProductStore = create((set) => ({
//   products: [],
//   loading: true,
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
//   fetchProducts: async () => {
//     try {
//       const res = await fetch(
//         "https://storage.googleapis.com/cymre/data/merged_products.json"
//       );
//       const data = await res.json();
//       set({ products: data, loading: false });
//     } catch (err) {
//       console.error("❌ Failed to fetch products:", err);
//       set({ loading: false });
//     }
//   },
// }));

// stores/productStore.js
import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: true,
  error: null,
  
  // Actions
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
    
  // Enhanced fetch with better error handling and debugging
  fetchProducts: async () => {
    console.log("🔄 Starting to fetch products...");
    set({ loading: true, error: null });
    
    try {
      // Add timestamp to prevent caching issues
      const timestamp = new Date().getTime();
      const url = `https://storage.googleapis.com/cymre/data/merged_products.json?v=${timestamp}`;
      
      console.log("📡 Fetching from:", url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      console.log("📨 Response status:", response.status);
      console.log("📨 Response headers:", Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      
      const rawText = await response.text();
      console.log("📄 Raw response length:", rawText.length);
      console.log("📄 First 200 chars:", rawText.substring(0, 200));
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error("❌ JSON Parse Error:", parseError);
        throw new Error(`Invalid JSON response: ${parseError.message}`);
      }
      
      console.log("✅ Parsed data type:", typeof data);
      console.log("✅ Data is array:", Array.isArray(data));
      
      if (Array.isArray(data)) {
        console.log("✅ Products count:", data.length);
        console.log("✅ First product sample:", data[0]);
        
        // Validate product structure
        const validProducts = data.filter(product => {
          const isValid = product && 
                         typeof product === 'object' && 
                         product.id && 
                         product.name && 
                         product.price;
          
          if (!isValid) {
            console.warn("⚠️ Invalid product found:", product);
          }
          
          return isValid;
        });
        
        console.log("✅ Valid products count:", validProducts.length);
        
        // Set approved status for products that don't have it
        const processedProducts = validProducts.map(product => ({
          ...product,
          approved: product.approved !== false // Default to true unless explicitly false
        }));
        
        set({ 
          products: processedProducts, 
          loading: false, 
          error: null 
        });
        
        console.log("✅ Products successfully loaded to store");
        
      } else {
        throw new Error("Response is not an array");
      }
      
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      
      // Provide fallback data for development
      const fallbackProducts = [
        {
          id: "1",
          name: "Sample Product 1",
          price: "29.99",
          category: "Fashion",
          image: "https://via.placeholder.com/300x300?text=Sample+Product+1",
          description: "This is a sample product for testing",
          approved: true
        },
        {
          id: "2", 
          name: "Sample Product 2",
          price: "49.99",
          category: "Home Essentials",
          image: "https://via.placeholder.com/300x300?text=Sample+Product+2",
          description: "This is another sample product for testing",
          approved: true
        },
        {
          id: "3",
          name: "Sample Jewelry",
          price: "79.99", 
          category: "Jewelry & Fashion Accessories",
          image: "https://via.placeholder.com/300x300?text=Sample+Jewelry",
          description: "This is a sample jewelry item for testing",
          approved: true
        }
      ];
      
      console.log("🔄 Using fallback products for development");
      
      set({ 
        products: fallbackProducts, 
        loading: false, 
        error: error.message 
      });
    }
  },
  
  // Helper to get approved products
  getApprovedProducts: () => {
    const state = get();
    return state.products.filter(p => p.approved !== false);
  },
  
  // Helper to get products by category
  getProductsByCategory: (category) => {
    const state = get();
    return state.products.filter(p => {
      if (p.approved === false) return false;
      
      const productCategory = p.category?.toLowerCase() || '';
      const targetCategory = category.toLowerCase();
      
      return productCategory.includes(targetCategory);
    });
  }
}));