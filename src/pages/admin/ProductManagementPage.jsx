// src/pages/admin/ProductManagementPage.jsx
import React, { useState, useEffect } from "react";
import { useProductStore } from "@/stores/productStore";
import { Link, useLocation } from "react-router-dom";

// Define the URL for your highLevelCategoryMap.json in the GCP bucket
// IMPORTANT: Replace 'your-gcp-bucket-name' with your actual bucket name if it's different.
// Example: "https://storage.googleapis.com/cym1/data/highLevelCategoryMap.json"
const GCS_CATEGORY_MAP_URL = "https://storage.googleapis.com/cymre/data/highLevelCategoryMap.json";

const categoryAliasMap = {
  jewelry: "Jewelry & Fashion Accessories",
  jewellery: "Jewelry & Fashion Accessories",
  fashion: "Fashion",
  // Add more aliases as needed
};

export default function ProductManagementPage() { // Renamed from ProductsPage
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
    <div className="p-8 flex-grow bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Product Management</h2>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">All Products List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Adjusted grid */}
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              // Link to product details, assuming /products/:id route exists
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="border border-gray-200 p-4 rounded-xl shadow-sm block hover:bg-gray-50 transition-colors duration-200 flex flex-col"
              >
                <div className="aspect-[4/3] w-full bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
                <h4 className="text-lg font-bold truncate text-gray-800 mb-1">{product.name}</h4>
                <p className="text-gray-600 font-semibold">${product.price}</p>
                {/* You might want to add "Edit" or "Delete" buttons here for admin functionality */}
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
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}