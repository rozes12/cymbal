

import React from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const products = useProductStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addToCart);
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <div className="p-8">Product not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* <div className="bg-white rounded-xl border p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain max-h-full min-w-600"
          style={{ imageRendering: "auto" }}
        />
      </div> */}
      <div className="bg-white border p-4 flex items-center justify-center rounded-lg h-[300px] sm:h-[350px] md:h-[400px]">
  <img
    src={product.image}
    alt={product.name}
    className="object-contain max-h-full max-w-full"
    style={{ imageRendering: "auto" }}
  />
</div>

           {/* <div className="aspect-[4/3] w-full bg-white border rounded overflow-hidden flex items-center justify-center">
         <img src={product.image} alt={product.name} className="object-contain max-w-full max-h-full" />
       </div> */}

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4 whitespace-pre-line">{product.description}</p>
        <p className="text-2xl text-indigo-600 font-semibold mb-6">${product.price}</p>
        <Button onClick={() => addToCart(product)} size="lg">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

