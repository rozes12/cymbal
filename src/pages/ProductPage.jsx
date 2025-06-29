

// import React, { useState } from "react";
// import { useProductStore } from "@/stores/productStore";
// import { Link, useLocation } from "react-router-dom";
// import categoryMap from "@/data/highLevelCategoryMap.json";

// const categoryAliasMap = {
//   jewelry: "Jewelry & Fashion Accessories",
//   jewellery: "Jewelry & Fashion Accessories",
//   fashion: "Fashion",
//   // Add more aliases as needed
// };

// export default function ProductsPage() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const rawCategory = params.get("category")?.toLowerCase().trim() || "";
//   const selectedCategory = categoryAliasMap[rawCategory] || params.get("category");

//   const allProducts = useProductStore((state) => state.products);
//   const [visibleCount, setVisibleCount] = useState(10); // 👈 Show only 10 products at first

//   let filteredProducts = [];

//   if (selectedCategory && categoryMap[selectedCategory]) {
//     const validCategories = categoryMap[selectedCategory].map((c) =>
//       c.toLowerCase().trim()
//     );

//     filteredProducts = allProducts.filter((p) => {
//       const fullCategory = p.category?.toLowerCase().trim();
//       return fullCategory && validCategories.some((valid) => fullCategory.includes(valid));
//     });

//     // Shuffle and take 20 random products
//     filteredProducts = filteredProducts.sort(() => Math.random() - 0.5).slice(0, 20);
//   } else {
//     // No category selected → show all approved products
//     filteredProducts = allProducts.filter((p) => p.approved);
//   }

//   // Only show visibleCount products
//   const visibleProducts = filteredProducts.slice(0, visibleCount);
//   const hasMore = visibleCount < filteredProducts.length;

//   return (
//     <div className="p-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {visibleProducts.length > 0 ? (
//           visibleProducts.map((product) => (
//             <Link
//               to={`/products/${product.id}`}
//               key={product.id}
//               className="border p-4 rounded-xl shadow block hover:bg-gray-50"
//             >
//               <div className="aspect-[4/3] w-full bg-white border rounded overflow-hidden flex items-center justify-center">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-contain max-w-full max-h-full"
//                 />
//               </div>
//               <h2 className="text-xl font-bold">{product.name}</h2>
//               <p className="text-gray-600">${product.price}</p>
//             </Link>
//           ))
//         ) : (
//           <p className="text-gray-600 text-lg col-span-full">No products found in this category.</p>
//         )}
//       </div>

//       {hasMore && (
//         <div className="mt-8 flex justify-center">
//           <button
//             onClick={() => setVisibleCount((prev) => prev + 10)}
//             className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// //Dissa's version
// import React, { useState, useEffect } from "react";
// import { useProductStore } from "@/stores/productStore";
// import { Link, useLocation } from "react-router-dom";

// // Define the URL for your highLevelCategoryMap.json in the GCP bucket
// // IMPORTANT: Replace 'your-gcp-bucket-name' with your actual bucket name
// // and 'path/to/your/file' if your file is in a subfolder.
// const GCS_CATEGORY_MAP_URL = "https://storage.googleapis.com/cymre/data/highLevelCategoryMap.json";
// // Example: "https://storage.googleapis.com/cym1/data/highLevelCategoryMap.json" if it's in the 'data' subfolder

// const categoryAliasMap = {
//   jewelry: "Jewelry & Fashion Accessories",
//   jewellery: "Jewelry & Fashion Accessories",
//   fashion: "Fashion",
//   // Add more aliases as needed
// };

// export default function ProductsPage() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const rawCategory = params.get("category")?.toLowerCase().trim() || "";
//   const selectedCategory = categoryAliasMap[rawCategory] || params.get("category");

//   const allProducts = useProductStore((state) => state.products);
//   const [visibleCount, setVisibleCount] = useState(10); // Show only 10 products at first

//   // New state for the category map fetched from GCS
//   const [categoryMap, setCategoryMap] = useState(null);
//   const [loadingCategoryMap, setLoadingCategoryMap] = useState(true);
//   const [errorCategoryMap, setErrorCategoryMap] = useState(null);

//   // --- Effect to fetch highLevelCategoryMap.json from GCS ---
//   useEffect(() => {
//     const fetchCategoryMap = async () => {
//       try {
//         setLoadingCategoryMap(true);
//         setErrorCategoryMap(null); // Clear previous errors

//         const response = await fetch(GCS_CATEGORY_MAP_URL);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setCategoryMap(data);
//       } catch (error) {
//         console.error("Failed to fetch high-level category map:", error);
//         setErrorCategoryMap(error);
//       } finally {
//         setLoadingCategoryMap(false);
//       }
//     };

//     fetchCategoryMap();
//   }, []); // Empty dependency array means this runs once on mount

//   let filteredProducts = [];

//   // Only proceed with filtering if categoryMap is loaded and valid
//   if (selectedCategory && categoryMap && categoryMap[selectedCategory]) {
//     const validCategories = categoryMap[selectedCategory].map((c) =>
//       c.toLowerCase().trim()
//     );

//     filteredProducts = allProducts.filter((p) => {
//       const fullCategory = p.category?.toLowerCase().trim();
//       return fullCategory && validCategories.some((valid) => fullCategory.includes(valid));
//     });

//     // Shuffle and take 20 random products
//     filteredProducts = filteredProducts.sort(() => Math.random() - 0.5).slice(0, 20);
//   } else if (!selectedCategory) {
//     // No category selected -> show all approved products (once categoryMap is loaded, otherwise it's still loading)
//     filteredProducts = allProducts.filter((p) => p.approved);
//   }
//   // If selectedCategory is present but categoryMap is still loading or has an error,
//   // filteredProducts will remain empty, which is handled by the loading/error states below.


//   // Only show visibleCount products
//   const visibleProducts = filteredProducts.slice(0, visibleCount);
//   const hasMore = visibleCount < filteredProducts.length;

//   // --- Render Logic with Loading/Error States ---
//   if (loadingCategoryMap) {
//     return <div className="p-8 text-center text-lg">Loading categories...</div>;
//   }

//   if (errorCategoryMap) {
//     return (
//       <div className="p-8 text-center text-lg text-red-600">
//         Error loading categories: {errorCategoryMap.message}. Please try again later.
//       </div>
//     );
//   }

//   // If categoryMap is loaded and no error, proceed with rendering
//   return (
//     <div className="p-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {visibleProducts.length > 0 ? (
//           visibleProducts.map((product) => (
//             <Link
//               to={`/products/${product.id}`}
//               key={product.id}
//               className="border p-4 rounded-xl shadow block hover:bg-gray-50"
//             >
//               <div className="aspect-[4/3] w-full bg-white border rounded overflow-hidden flex items-center justify-center">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-contain max-w-full max-h-full"
//                 />
//               </div>
//               <h2 className="text-xl font-bold">{product.name}</h2>
//               <p className="text-gray-600">${product.price}</p>
//             </Link>
//           ))
//         ) : (
//           <p className="text-gray-600 text-lg col-span-full">
//             No products found in this category or category data is unavailable.
//           </p>
//         )}
//       </div>

//       {hasMore && (
//         <div className="mt-8 flex justify-center">
//           <button
//             onClick={() => setVisibleCount((prev) => prev + 10)}
//             className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// //2nd update
// import React, { useState, useEffect } from "react";
// import { useProductStore } from "@/stores/productStore";
// import { Link, useLocation } from "react-router-dom";

// const GCS_CATEGORY_MAP_URL = "https://storage.googleapis.com/cymre/data/highLevelCategoryMap.json";

// const categoryAliasMap = {
//   jewelry: "Jewelry & Fashion Accessories",
//   jewellery: "Jewelry & Fashion Accessories", 
//   fashion: "Fashion",
//   // Add more aliases as needed
// };

// export default function ProductsPage() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const rawCategory = params.get("category")?.toLowerCase().trim() || "";
//   const selectedCategory = categoryAliasMap[rawCategory] || params.get("category");
//   const searchParam = params.get("search") || "";

//   const allProducts = useProductStore((state) => state.products);
//   const [categoryMap, setCategoryMap] = useState(null);
//   const [loadingCategoryMap, setLoadingCategoryMap] = useState(true);
//   const [errorCategoryMap, setErrorCategoryMap] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(searchParam);
//   const [activeTab, setActiveTab] = useState(0);

//   // Fetch category map from GCS
//   useEffect(() => {
//     const fetchCategoryMap = async () => {
//       try {
//         setLoadingCategoryMap(true);
//         setErrorCategoryMap(null);

//         const response = await fetch(GCS_CATEGORY_MAP_URL);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setCategoryMap(data);
//       } catch (error) {
//         console.error("Failed to fetch high-level category map:", error);
//         setErrorCategoryMap(error);
//       } finally {
//         setLoadingCategoryMap(false);
//       }
//     };

//     fetchCategoryMap();
//   }, []);

//   // Update search query when URL changes
//   useEffect(() => {
//     setSearchQuery(searchParam);
//   }, [searchParam]);

//   // Filter products based on search and category
//   const getFilteredProducts = () => {
//     let filtered = allProducts.filter((p) => p.approved);

//     // Apply search filter
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter((product) =>
//         product.name.toLowerCase().includes(query) ||
//         product.category?.toLowerCase().includes(query) ||
//         product.description?.toLowerCase().includes(query)
//       );
//     }

//     // Apply category filter
//     if (selectedCategory && categoryMap && categoryMap[selectedCategory]) {
//       const validCategories = categoryMap[selectedCategory].map((c) =>
//         c.toLowerCase().trim()
//       );
//       filtered = filtered.filter((p) => {
//         const fullCategory = p.category?.toLowerCase().trim();
//         return fullCategory && validCategories.some((valid) => fullCategory.includes(valid));
//       });
//     }

//     return filtered;
//   };

//   // Get products by category for sections
//   const getProductsByCategory = (categoryName, limit = 10) => {
//     if (!categoryMap || !categoryMap[categoryName]) return [];
    
//     const validCategories = categoryMap[categoryName].map((c) => c.toLowerCase().trim());
//     const categoryProducts = allProducts
//       .filter((p) => p.approved)
//       .filter((p) => {
//         const fullCategory = p.category?.toLowerCase().trim();
//         return fullCategory && validCategories.some((valid) => fullCategory.includes(valid));
//       })
//       .sort(() => Math.random() - 0.5)
//       .slice(0, limit);
    
//     return categoryProducts;
//   };

//   // Get top 10 products (random selection)
//   const getTop10Products = () => {
//     return allProducts
//       .filter((p) => p.approved)
//       .sort(() => Math.random() - 0.5)
//       .slice(0, 10);
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
//     }
//   };

//   // Sale categories for rotating display
//   const saleCategories = ["Fashion", "Home Essentials", "Jewelry & Fashion Accessories"];
//   const currentSaleCategory = saleCategories[activeTab];
//   const saleProducts = getProductsByCategory(currentSaleCategory, 6);

//   // Add random discounts for sale items
//   const addSalePrice = (product) => ({
//     ...product,
//     originalPrice: product.price,
//     discount: Math.floor(Math.random() * 50) + 10, // 10-60% off
//     salePrice: (product.price * (1 - (Math.floor(Math.random() * 50) + 10) / 100)).toFixed(2)
//   });

//   const ProductCard = ({ product, showSale = false }) => {
//     const saleProduct = showSale ? addSalePrice(product) : product;
    
//     return (
//       <Link
//         to={`/products/${product.id}`}
//         className="flex-shrink-0 w-48 bg-white border rounded-lg shadow hover:shadow-md transition-shadow"
//       >
//         <div className="aspect-square w-full bg-gray-50 rounded-t-lg overflow-hidden flex items-center justify-center p-2">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="object-contain max-w-full max-h-full"
//           />
//         </div>
//         <div className="p-3">
//           <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2">
//             {product.name}
//           </h3>
//           <div className="flex items-center gap-2">
//             {showSale ? (
//               <>
//                 <span className="text-lg font-bold text-red-600">${saleProduct.salePrice}</span>
//                 <span className="text-sm text-gray-500 line-through">${product.price}</span>
//                 <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
//                   {saleProduct.discount}% OFF
//                 </span>
//               </>
//             ) : (
//               <span className="text-lg font-bold text-gray-800">${product.price}</span>
//             )}
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   const HorizontalProductRow = ({ products, showSale = false }) => (
//     <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} showSale={showSale} />
//       ))}
//     </div>
//   );

//   if (loadingCategoryMap) {
//     return <div className="p-8 text-center text-lg">Loading categories...</div>;
//   }

//   if (errorCategoryMap) {
//     return (
//       <div className="p-8 text-center text-lg text-red-600">
//         Error loading categories: {errorCategoryMap.message}. Please try again later.
//       </div>
//     );
//   }

//   const filteredProducts = getFilteredProducts();
//   const top10Products = getTop10Products();
//   const newArrivals = allProducts.filter(p => p.approved).sort(() => Math.random() - 0.5).slice(0, 10);

//   // If there's a search query or selected category, show filtered results
//   if (searchQuery.trim() || selectedCategory) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Search Bar */}
//         <div className="bg-white shadow-sm border-b">
//           <div className="max-w-7xl mx-auto px-6 py-4">
//             <form onSubmit={handleSearch} className="flex gap-4 items-center">
//               <div className="flex-1">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search products..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Results */}
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <h1 className="text-2xl font-bold mb-6">
//             {searchQuery ? `Search results for "${searchQuery}"` : 
//              selectedCategory ? `${selectedCategory} Products` : 'All Products'}
//           </h1>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <Link
//                   to={`/products/${product.id}`}
//                   key={product.id}
//                   className="bg-white border rounded-lg shadow hover:shadow-md transition-shadow"
//                 >
//                   <div className="aspect-square w-full bg-gray-50 rounded-t-lg overflow-hidden flex items-center justify-center p-4">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="object-contain max-w-full max-h-full"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h2 className="font-semibold text-gray-800 line-clamp-2 mb-2">{product.name}</h2>
//                     <p className="text-lg font-bold text-gray-900">${product.price}</p>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <p className="text-gray-600 text-lg col-span-full text-center">
//                 No products found matching your criteria.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Default view with sections
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Search Bar */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <form onSubmit={handleSearch} className="flex gap-4 items-center justify-end">
//             <div className="w-96">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Top 10 Products */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Top 10 Products Today</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
//             {top10Products.map((product, index) => (
//               <Link
//                 to={`/products/${product.id}`}
//                 key={product.id}
//                 className="relative bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
//               >
//                 <div className="absolute top-2 left-2 bg-black text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center z-10">
//                   {index + 1}
//                 </div>
//                 <div className="aspect-square w-full bg-gray-50 flex items-center justify-center p-2">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="object-contain max-w-full max-h-full"
//                   />
//                 </div>
//                 <div className="p-2">
//                   <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
//                     {product.name}
//                   </h3>
//                   <p className="text-sm font-bold text-gray-900">${product.price}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Sale Section */}
//         <section className="mb-12" id="sale-section">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-bold text-red-600">SALE</h2>
//             <div className="flex gap-2">
//               {saleCategories.map((category, index) => (
//                 <button
//                   key={category}
//                   onClick={() => setActiveTab(index)}
//                   className={`px-4 py-2 rounded-lg font-medium transition ${
//                     activeTab === index
//                       ? 'bg-red-600 text-white'
//                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                   }`}
//                 >
//                   {category === "Jewelry & Fashion Accessories" ? "Jewelry" : category}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <HorizontalProductRow products={saleProducts} showSale={true} />
//         </section>

//         {/* New Arrivals */}
//         <section className="mb-12" id="new-arrivals">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">New Arrivals</h2>
//           <HorizontalProductRow products={newArrivals} />
//         </section>

//         {/* Other Categories */}
//         {categoryMap && Object.keys(categoryMap).map((categoryName) => {
//           if (saleCategories.includes(categoryName)) return null; // Skip sale categories
          
//           const categoryProducts = getProductsByCategory(categoryName, 8);
//           if (categoryProducts.length === 0) return null;

//           return (
//             <section key={categoryName} className="mb-12">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">{categoryName}</h2>
//                 <Link
//                   to={`/products?category=${encodeURIComponent(categoryName)}`}
//                   className="text-indigo-600 hover:text-indigo-700 font-medium"
//                 >
//                   View All
//                 </Link>
//               </div>
//               <HorizontalProductRow products={categoryProducts} />
//             </section>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useProductStore } from "@/stores/productStore";
import { Link, useLocation } from "react-router-dom";
import highLevelCategoryMap from "@/data/highLevelCategoryMap.json";

const categoryAliasMap = {
  jewelry: "Jewelry & Fashion Accessories",
  jewellery: "Jewelry & Fashion Accessories",
  fashion: "Fashion",
  // Add more aliases as needed
};

export default function ProductsPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const rawCategory = params.get("category")?.toLowerCase().trim() || "";
  const selectedCategory = categoryAliasMap[rawCategory] || params.get("category");
  const searchQuery = params.get("search") || "";

  const allProducts = useProductStore((state) => state.products);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [saleCategories] = useState(["Fashion", "Home Essentials", "Jewelry & Fashion Accessories"]);
  const [activeSaleCategory, setActiveSaleCategory] = useState("Fashion");
  const [saleScrollIndex, setSaleScrollIndex] = useState(0);

  // Auto-scroll for sale section
  useEffect(() => {
    const timer = setInterval(() => {
      setSaleScrollIndex(prev => prev + 4);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeSaleCategory]);

  // Filter products based on search and category
  useEffect(() => {
    let products = allProducts.filter(p => p.approved);

    if (searchQuery) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedCategory && highLevelCategoryMap[selectedCategory]) {
      const validCategories = highLevelCategoryMap[selectedCategory].map(c =>
        c.toLowerCase().trim()
      );
      products = products.filter(p => {
        const fullCategory = p.category?.toLowerCase().trim();
        return fullCategory && validCategories.some(valid => fullCategory.includes(valid));
      });
      // Shuffle and take 20 random products
      products = products.sort(() => Math.random() - 0.5).slice(0, 20);
    }

    setFilteredProducts(products);
  }, [allProducts, searchQuery, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchInput)}`;
    }
  };

  // Get products for specific category
  const getProductsByCategory = (category, limit = 20) => {
    if (!highLevelCategoryMap[category]) return [];
    
    const validCategories = highLevelCategoryMap[category].map(c => c.toLowerCase().trim());
    const products = allProducts.filter(p => {
      const fullCategory = p.category?.toLowerCase().trim();
      return fullCategory && validCategories.some(valid => fullCategory.includes(valid));
    });
    
    return products.sort(() => Math.random() - 0.5).slice(0, limit);
  };

  // Get top 10 products (highest rated or random selection)
  const getTop10Products = () => {
    return [...allProducts]
      .filter(p => p.approved)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  };

  // Get new arrivals (most recent products)
  const getNewArrivals = () => {
    return [...allProducts]
      .filter(p => p.approved)
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);
  };

  // Get sale products for active category
  const getSaleProducts = () => {
    const products = getProductsByCategory(activeSaleCategory, 20);
    return products.map(product => ({
      ...product,
      salePrice: (product.price * (Math.random() * 0.4 + 0.4)).toFixed(2), // 40-80% of original price
      discount: Math.floor(Math.random() * 40) + 20 // 20-60% off
    }));
  };

  const saleProducts = getSaleProducts();
  const visibleSaleProducts = saleProducts.slice(saleScrollIndex % saleProducts.length, (saleScrollIndex % saleProducts.length) + 4);

  // Scroll functions
  const scrollSale = (direction) => {
    setSaleScrollIndex(prev => {
      if (direction === 'left') {
        return Math.max(0, prev - 4);
      } else {
        return prev + 4;
      }
    });
  };

  const ProductCard = ({ product, showSale = false }) => (
    <Link
      to={`/products/${product.id}`}
      className="flex-shrink-0 w-48 border rounded-xl shadow hover:shadow-lg transition-shadow bg-white"
    >
      <div className="aspect-square w-full bg-white border-b rounded-t-xl overflow-hidden flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
        {showSale ? (
          <div className="mt-1">
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold">${product.salePrice}</span>
              <span className="text-gray-400 line-through text-sm">${product.price}</span>
            </div>
            <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded mt-1">
              {product.discount}% OFF
            </span>
          </div>
        ) : (
          <p className="text-gray-600 mt-1">${product.price}</p>
        )}
      </div>
    </Link>
  );

  const CategoryRow = ({ title, products, showNumbers = false }) => (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products.map((product, index) => (
          <div key={product.id} className="relative">
            {showNumbers && (
              <div className="absolute -top-2 -left-2 z-10 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
            )}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );

  // Only show visibleCount products for the main filtered results
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {searchQuery ? `Search results for "${searchQuery}"` : 
               selectedCategory ? selectedCategory : "All Products"}
            </h1>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Show category sections only if no search and no specific category selected */}
        {!searchQuery && !selectedCategory && (
          <>
            {/* Top 10 Products */}
            <CategoryRow title="🏆 Top 10 in Cymbal Store Today" products={getTop10Products()} showNumbers={true} />

            {/* Sale Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">🔥 SALE</h2>
              
              {/* Category Tabs */}
              <div className="flex gap-4 mb-4">
                {saleCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveSaleCategory(category);
                      setSaleScrollIndex(0);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeSaleCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category === "Jewelry & Fashion Accessories" ? "Jewelry" : category}
                  </button>
                ))}
              </div>

              {/* Sale Products with Auto-scroll */}
              <div className="relative">
                <div className="flex gap-4 overflow-hidden">
                  {visibleSaleProducts.map(product => (
                    <ProductCard key={`${product.id}-${saleScrollIndex}`} product={product} showSale={true} />
                  ))}
                </div>
                
                {/* Manual scroll buttons */}
                <button
                  onClick={() => scrollSale('left')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => scrollSale('right')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  →
                </button>
              </div>
            </section>

            {/* New Arrivals */}
            <CategoryRow title="✨ New Arrivals" products={getNewArrivals()} />

            {/* Other Categories */}
            {Object.keys(highLevelCategoryMap).map(category => {
              if (saleCategories.includes(category)) return null;
              const products = getProductsByCategory(category, 10);
              if (products.length === 0) return null;
              
              return (
                <CategoryRow key={category} title={category} products={products} />
              );
            })}
          </>
        )}

        {/* Main Product Grid (for search results or specific category) */}
        {(searchQuery || selectedCategory) && (
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.length > 0 ? (
                visibleProducts.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="border p-4 rounded-xl shadow hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="aspect-[4/3] w-full bg-white border rounded overflow-hidden flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                    <h2 className="text-xl font-bold mt-3">{product.name}</h2>
                    <p className="text-gray-600">${product.price}</p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-600 text-lg col-span-full text-center py-12">
                  No products found {searchQuery ? `for "${searchQuery}"` : 'in this category'}.
                </p>
              )}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}