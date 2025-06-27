// // HomePage.jsx
// import React from "react";
// import HomeHero from "@/components/ui/HomeHero";
// import { Link } from "react-router-dom";
// import { useProductStore } from "@/stores/productStore";

// export default function HomePage() {
//   const products = useProductStore((state) => state.products);

//   // Shuffle products and take 6
//   const featuredProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 6);

//   return (
//     <div>
//       <HomeHero />

    
//  {/* Categories Section */}
// <section className="py-12 px-6 max-w-7xl mx-auto">
//   <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Shop by Category</h2>
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
//     {/* Fashion */}
//     <Link to="/products?category=Fashion" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
//         alt="Fashion"
//         className="w-16 h-16 mb-4"
//       />
//       <h3 className="text-xl font-semibold text-gray-800">Fashion</h3>
//     </Link>

//     {/* Home Essentials */}
//     <Link to="/products?category=Home Essentials" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/3082/3082031.png"
//         alt="Furniture"
//         className="w-16 h-16 mb-4"
//       />
//       <h3 className="text-xl font-semibold text-gray-800">Home Essentials</h3>
//     </Link>

//     {/* Jewelry & Fashion Accessories */}
//     <Link to="/products?category=Jewelry & Fashion Accessories" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
//         alt="Jewelry"
//         className="w-16 h-16 mb-4"
//       />
//       <h3 className="text-xl font-semibold text-gray-800">Jewelry & Fashion Accessories</h3>
//     </Link>
//   </div>
// </section>

//       {/* Featured Products Section */}
//       <section className="py-12 px-6 max-w-7xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {featuredProducts.map((product) => (
//             <Link
//               to={`/products/${product.id}`}
//               key={product.id}
//               className="bg-white p-4 border rounded-lg shadow hover:shadow-md transition"
//             >
//               <div className="bg-white border p-2 flex items-center justify-center rounded-md h-[200px]">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-contain max-h-full max-w-full"
//                   style={{ imageRendering: "auto" }}
//                 />
//               </div>
//               <h3 className="mt-4 text-lg font-bold text-gray-800">{product.name}</h3>
//               <p className="text-gray-600">${product.price}</p>
//             </Link>
//           ))}
//         </div>

//         <div className="mt-8 text-center">
//           <Link to="/products">
//             <button className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded hover:bg-indigo-700 transition">
//               View All Products
//             </button>
//           </Link>
//         </div>
//       </section>

     
//   {/* Why Shop With Us Section */}
//       <section className="py-12 px-6 max-w-7xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Shop With Us?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
//             <p className="text-gray-600">We deliver quickly and reliably across the country.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2">Great Quality</h3>
//             <p className="text-gray-600">Our products are handpicked to ensure top-tier quality.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
//             <p className="text-gray-600">Get more for less with amazing deals all year round.</p>
//           </div>
//         </div>
//       </section>


//       {/* Final CTA Section */}
//       <section className="py-12 px-6 bg-gray-100 text-center">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Start Shopping Now</h2>
//         <Link to="/products">
//           <button className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded hover:bg-indigo-700 transition">
//             View All Products
//           </button>
//         </Link>
//         {/* The AI Image Editor button is removed from here */}
//       </section>
//     </div>
//   );
// }

// HomePage.jsx
import React from "react";
import HomeHero from "@/components/ui/HomeHero";
import { Link } from "react-router-dom";
import { useProductStore } from "@/stores/productStore";

export default function HomePage() {
  const products = useProductStore((state) => state.products);

  // Shuffle products and take 6 approved products for featured display
  const featuredProducts = [...products]
    .filter(p => p.approved) // Ensure only approved products are featured
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <div className="bg-gray-50 min-h-screen"> {/* Added a subtle background color for the whole page */}
      <HomeHero />

      {/* Categories Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto"> {/* Increased padding, adjusted max-width and horizontal padding */}
        <h2 className="text-4xl font-extrabold mb-10 text-gray-900 text-center">Shop by Category</h2> {/* Larger, bolder heading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center"> {/* Increased gap */}
          {/* Fashion */}
          <Link
            to="/products?category=Fashion"
            className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center border border-gray-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
              alt="Fashion Icon"
              className="w-20 h-20 mb-6 transition-transform duration-300 group-hover:scale-110" // Larger icon, hover effect
            />
            <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Fashion</h3> {/* Larger text, hover color */}
          </Link>

          {/* Home Essentials */}
          <Link
            to="/products?category=Home Essentials"
            className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center border border-gray-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3082/3082031.png"
              alt="Home Essentials Icon"
              className="w-20 h-20 mb-6 transition-transform duration-300 group-hover:scale-110"
            />
            <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Home Essentials</h3>
          </Link>

          {/* Jewelry & Fashion Accessories */}
          <Link
            to="/products?category=Jewelry & Fashion Accessories"
            className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center border border-gray-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
              alt="Jewelry Icon"
              className="w-20 h-20 mb-6 transition-transform duration-300 group-hover:scale-110"
            />
            <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Jewelry & Fashion Accessories</h3>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-white rounded-xl shadow-lg my-12"> {/* Added background, rounded corners, shadow, and margin */}
        <h2 className="text-4xl font-extrabold mb-10 text-gray-900 text-center">Our Featured Products</h2> {/* Larger, bolder heading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"> {/* Adjusted grid columns */}
          {featuredProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="group bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-full h-[250px] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center mb-4 border border-gray-200"> {/* Taller image container */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-2 text-xl font-bold text-gray-800 truncate w-full px-2 group-hover:text-indigo-600 transition-colors duration-300">{product.name}</h3> {/* Truncate long names, hover color */}
              <p className="text-gray-700 text-2xl font-semibold mt-1">${product.price}</p> {/* Larger price, bolder */}
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center"> {/* Increased top margin */}
          <Link to="/products">
            <button className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 text-lg shadow-lg"> {/* Larger, rounded button with shadow */}
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* Why Shop With Us Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto"> {/* Increased padding */}
        <h2 className="text-4xl font-extrabold mb-10 text-gray-900 text-center">Why Shop With Us?</h2> {/* Larger, bolder heading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"> {/* Increased gap */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Fast Shipping</h3> {/* Larger heading */}
            <p className="text-gray-600 text-lg">We deliver quickly and reliably across the country, ensuring your items arrive on time.</p> {/* Larger text */}
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Great Quality</h3>
            <p className="text-gray-600 text-lg">Our products are handpicked and rigorously inspected to ensure top-tier quality and durability.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Affordable Prices</h3>
            <p className="text-gray-600 text-lg">Get more for less with amazing deals and competitive pricing all year round, without compromising on quality.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-indigo-700 text-white text-center rounded-t-3xl shadow-inner mt-12"> {/* Vibrant background, increased padding, rounded top, inner shadow */}
        <h2 className="text-4xl font-extrabold mb-6">Ready to Discover Your Next Favorite?</h2> {/* Larger, bolder heading */}
        <p className="text-xl mb-10 opacity-90">Explore our vast collection and find exactly what you're looking for.</p> {/* Larger text */}
        <Link to="/products">
          <button className="bg-white text-indigo-700 font-bold py-5 px-12 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-xl shadow-lg"> {/* Inverted colors, larger, more prominent */}
            Start Shopping Now
          </button>
        </Link>
      </section>
    </div>
  );
}