

import React, { useState } from "react";
import { useProductStore } from "@/stores/productStore";
import { Link, useLocation } from "react-router-dom";
import categoryMap from "@/data/highLevelCategoryMap.json";

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
  const [visibleCount, setVisibleCount] = useState(10); // 👈 Show only 10 products at first

  let filteredProducts = [];

  if (selectedCategory && categoryMap[selectedCategory]) {
    const validCategories = categoryMap[selectedCategory].map((c) =>
      c.toLowerCase().trim()
    );

    filteredProducts = allProducts.filter((p) => {
      const fullCategory = p.category?.toLowerCase().trim();
      return fullCategory && validCategories.some((valid) => fullCategory.includes(valid));
    });

    // Shuffle and take 20 random products
    filteredProducts = filteredProducts.sort(() => Math.random() - 0.5).slice(0, 20);
  } else {
    // No category selected → show all approved products
    filteredProducts = allProducts.filter((p) => p.approved);
  }

  // Only show visibleCount products
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

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
          <p className="text-gray-600 text-lg col-span-full">No products found in this category.</p>
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
