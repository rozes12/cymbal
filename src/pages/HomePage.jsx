// HomePage.jsx
import React from "react";
import HomeHero from "@/components/ui/HomeHero";
import { Link } from "react-router-dom";
import { useProductStore } from "@/stores/productStore";

export default function HomePage() {
  const products = useProductStore((state) => state.products);

  // Shuffle products and take 6
  const featuredProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <div>
      <HomeHero />

    
 {/* Categories Section */}
<section className="py-12 px-6 max-w-7xl mx-auto">
  <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Shop by Category</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
    {/* Fashion */}
    <Link to="/products?category=Fashion" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
        alt="Fashion"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">Fashion</h3>
    </Link>

    {/* Home Essentials */}
    <Link to="/products?category=Home Essentials" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3082/3082031.png"
        alt="Furniture"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">Home Essentials</h3>
    </Link>

    {/* Jewelry & Fashion Accessories */}
    <Link to="/products?category=Jewelry & Fashion Accessories" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
        alt="Jewelry"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">Jewelry & Fashion Accessories</h3>
    </Link>
  </div>
</section>

      {/* Featured Products Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="bg-white p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              <div className="bg-white border p-2 flex items-center justify-center rounded-md h-[200px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain max-h-full max-w-full"
                  style={{ imageRendering: "auto" }}
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/products">
            <button className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded hover:bg-indigo-700 transition">
              View All Products
            </button>
          </Link>
        </div>
      </section>

     
  {/* Why Shop With Us Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-600">We deliver quickly and reliably across the country.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Great Quality</h3>
            <p className="text-gray-600">Our products are handpicked to ensure top-tier quality.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-gray-600">Get more for less with amazing deals all year round.</p>
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="py-12 px-6 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Start Shopping Now</h2>
        <Link to="/products">
          <button className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded hover:bg-indigo-700 transition">
            View All Products
          </button>
        </Link>
        {/* The AI Image Editor button is removed from here */}
      </section>
    </div>
  );
}