import React from "react";
import { Link } from "react-router-dom";

export default function HomeHero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Discover the Latest Products at Cymbal Store
      </h1>
      <p className="text-lg mb-6 max-w-xl mx-auto">
        Shop quality items across fashion, furniture, jewelry, and more. Affordable prices and fast delivery.
      </p>
      <Link to="/products">
        <button className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded hover:bg-gray-200 transition">
          Browse Products
        </button>
      </Link>
    </section>
  );
}
