import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
    >
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain max-h-full max-w-full"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h2>
        <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
      </div>
    </Link>
  );
}
