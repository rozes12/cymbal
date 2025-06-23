

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



import React, { useState, useEffect } from "react";
import { useProductStore } from "@/stores/productStore";
import { Link, useLocation } from "react-router-dom";

// Define the URL for your highLevelCategoryMap.json in the GCP bucket
// IMPORTANT: Replace 'your-gcp-bucket-name' with your actual bucket name
// and 'path/to/your/file' if your file is in a subfolder.
const GCS_CATEGORY_MAP_URL = "https://storage.googleapis.com/cym1/data/highLevelCategoryMap.json";
// Example: "https://storage.googleapis.com/cym1/data/highLevelCategoryMap.json" if it's in the 'data' subfolder

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

  const allProducts = useProductStore((state) => state.products);
  const [visibleCount, setVisibleCount] = useState(10); // Show only 10 products at first

  // New state for the category map fetched from GCS
  const [categoryMap, setCategoryMap] = useState(null);
  const [loadingCategoryMap, setLoadingCategoryMap] = useState(true);
  const [errorCategoryMap, setErrorCategoryMap] = useState(null);

  // --- Effect to fetch highLevelCategoryMap.json from GCS ---
  useEffect(() => {
    const fetchCategoryMap = async () => {
      try {
        setLoadingCategoryMap(true);
        setErrorCategoryMap(null); // Clear previous errors

        const response = await fetch(GCS_CATEGORY_MAP_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategoryMap(data);
      } catch (error) {
        console.error("Failed to fetch high-level category map:", error);
        setErrorCategoryMap(error);
      } finally {
        setLoadingCategoryMap(false);
      }
    };

    fetchCategoryMap();
  }, []); // Empty dependency array means this runs once on mount

  let filteredProducts = [];

  // Only proceed with filtering if categoryMap is loaded and valid
  if (selectedCategory && categoryMap && categoryMap[selectedCategory]) {
    const validCategories = categoryMap[selectedCategory].map((c) =>
      c.toLowerCase().trim()
    );

    filteredProducts = allProducts.filter((p) => {
      const fullCategory = p.category?.toLowerCase().trim();
      return fullCategory && validCategories.some((valid) => fullCategory.includes(valid));
    });

    // Shuffle and take 20 random products
    filteredProducts = filteredProducts.sort(() => Math.random() - 0.5).slice(0, 20);
  } else if (!selectedCategory) {
    // No category selected -> show all approved products (once categoryMap is loaded, otherwise it's still loading)
    filteredProducts = allProducts.filter((p) => p.approved);
  }
  // If selectedCategory is present but categoryMap is still loading or has an error,
  // filteredProducts will remain empty, which is handled by the loading/error states below.


  // Only show visibleCount products
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  // --- Render Logic with Loading/Error States ---
  if (loadingCategoryMap) {
    return <div className="p-8 text-center text-lg">Loading categories...</div>;
  }

  if (errorCategoryMap) {
    return (
      <div className="p-8 text-center text-lg text-red-600">
        Error loading categories: {errorCategoryMap.message}. Please try again later.
      </div>
    );
  }

  // If categoryMap is loaded and no error, proceed with rendering
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="border p-4 rounded-xl shadow block hover:bg-gray-50"
            >
              <div className="aspect-[4/3] w-full bg-white border rounded overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 text-lg col-span-full">
            No products found in this category or category data is unavailable.
          </p>
        )}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}