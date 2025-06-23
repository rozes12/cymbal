

// import React from "react";
// import { useParams } from "react-router-dom";
// import { useProductStore } from "@/stores/productStore";
// import { useCartStore } from "@/stores/cartStore";
// import { Button } from "@/components/ui/button";

// export default function ProductDetailsPage() {
//   const { id } = useParams();
//   const products = useProductStore((state) => state.products);
//   const addToCart = useCartStore((state) => state.addToCart);
//   const product = products.find((p) => p.id.toString() === id);

//   if (!product) {
//     return <div className="p-8">Product not found.</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
//       {/* <div className="bg-white rounded-xl border p-4 flex items-center justify-center">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="object-contain max-h-full min-w-600"
//           style={{ imageRendering: "auto" }}
//         />
//       </div> */}
//       <div className="bg-white border p-4 flex items-center justify-center rounded-lg h-[300px] sm:h-[350px] md:h-[400px]">
//   <img
//     src={product.image}
//     alt={product.name}
//     className="object-contain max-h-full max-w-full"
//     style={{ imageRendering: "auto" }}
//   />
// </div>

//            {/* <div className="aspect-[4/3] w-full bg-white border rounded overflow-hidden flex items-center justify-center">
//          <img src={product.image} alt={product.name} className="object-contain max-w-full max-h-full" />
//        </div> */}

//       <div>
//         <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//         <p className="text-gray-700 mb-4 whitespace-pre-line">{product.description}</p>
//         <p className="text-2xl text-indigo-600 font-semibold mb-6">${product.price}</p>
//         <Button onClick={() => addToCart(product)} size="lg">
//           Add to Cart
//         </Button>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/stores/productStore"; // To get product details
import { useCartStore } from "@/stores/cartStore"; // To add to cart
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // For a loading spinner

export default function ProductDetailsPage() {
  const { id } = useParams(); // Get product ID from URL
  const product = useProductStore((state) =>
    state.products.find((p) => p.id === id)
  ); // Find the product by ID
  const addItemToCart = useCartStore((state) => state.addItem); // Your cart store action

  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    // If product is not immediately available (e.g., direct link),
    // you might need to fetch it or ensure your product store is populated.
    // For now, let's assume useProductStore already has it or it will be fetched globally.
    if (product) {
      setLoading(false);
    } else {
      // If product isn't found, handle it (e.g., redirect, show error)
      // In a real app, you might trigger a specific fetch for this product here
      // if it wasn't loaded by the global fetchProducts on App load.
      setLoading(false); // For now, just stop loading and show not found
      setError("Product not found.");
    }
  }, [id, product]); // Re-run if ID or product changes

  const handleAddToCart = () => {
    if (product) {
      console.log("--- PRODUCT DETAILS PAGE: Adding to cart ---");
      console.log("Product object being passed:", product);
      console.log("Product ID:", product.id);
      console.log("Product Name:", product.name);
      console.log("Product Image URL:", product.imageUrl); // <--- CRITICAL CHECK HERE
      console.log("------------------------------------------");
      addItemToCart(product);
      alert(`${product.name} added to cart!`); // Simple feedback
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <p className="ml-2 text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        <p>{error}</p>
        <Link to="/products" className="text-blue-600 hover:underline">Go back to products</Link>
      </div>
    );
  }

  // If product is null/undefined after loading, means not found
  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        <p>Product not found.</p>
        <Link to="/products" className="text-blue-600 hover:underline">Go back to products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Product Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={product.imageUrl} // Use product.imageUrl directly
            alt={product.name}
            className="max-w-full h-auto max-h-96 object-contain rounded-lg shadow-lg border border-gray-200"
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-green-700">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            {product.description || "No detailed description available for this product."}
          </p>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full lg:w-auto px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Add to Cart
          </Button>

          {/* More Details/Specs (Optional) */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Specifications</h3>
            <ul className="text-gray-600 space-y-2 text-base">
              {/* Example specs - replace with your actual product spec data */}
              <li><span className="font-semibold">Material:</span> B20 Bronze</li>
              <li><span className="font-semibold">Type:</span> Crash Cymbal</li>
              <li><span className="font-semibold">Size:</span> 18 inch</li>
              <li><span className="font-semibold">Finish:</span> Brilliant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}