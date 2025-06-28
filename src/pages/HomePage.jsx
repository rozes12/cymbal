// // HomePage.jsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useProductStore } from "@/stores/productStore";

// export default function HomePage() {
//   const products = useProductStore((state) => state.products);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Shuffle products and take 6
//   const featuredProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 6);

//   // Carousel slides data
//   const slides = [
//     {
//       title: "Discover the Latest Products at Cymbal Store",
//       subtitle: "Shop quality items across fashion, furniture, jewelry, and more.",
//       description: "Affordable prices and fast delivery.",
//       buttonText: "Browse Products",
//       buttonLink: "/products",
//       background: "bg-gradient-to-r from-purple-600 to-purple-800"
//     },
//     {
//       title: "50% OFF",
//       subtitle: "THE HOME OF BRANDS",
//       description: "Limited time offer on selected categories. Don't miss out!",
//       buttonText: "Shop Now",
//       buttonLink: "/products?category=Fashion",
//       background: "bg-gradient-to-r from-red-500 to-pink-600"
//     },
//     {
//       title: "New Arrivals",
//       subtitle: "Fresh styles just for you",
//       description: "Discover the latest trends and must-have items in our newest collection.",
//       buttonText: "Shop Now",
//       buttonLink: "/products",
//       background: "bg-gradient-to-r from-green-500 to-teal-600"
//     }
//   ];

//   // Auto-slide effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000); // Change slide every 4 seconds

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <div>
//       {/* Hero Carousel Section */}
//       <section className="relative h-96 overflow-hidden">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
//               index === currentSlide ? 'translate-x-0' : 
//               index < currentSlide ? '-translate-x-full' : 'translate-x-full'
//             }`}
//           >
//             <div className={`${slide.background} h-full flex items-center justify-center text-white relative`}>
//               <div className="text-center px-6 max-w-4xl mx-auto">
//                 <h1 className="text-4xl md:text-6xl font-bold mb-4">
//                   {slide.title}
//                 </h1>
//                 <p className="text-lg md:text-xl mb-2">
//                   {slide.subtitle}
//                 </p>
//                 <p className="text-base md:text-lg mb-8 opacity-90">
//                   {slide.description}
//                 </p>
//                 <Link to={slide.buttonLink}>
//                   <button className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
//                     {slide.buttonText}
//                   </button>
//                 </Link>
//               </div>
              
//               {/* Optional: Add decorative elements for specific slides */}
//               {index === 1 && (
//                 <div className="absolute top-4 right-4 text-6xl font-bold opacity-20">
//                   50%
//                 </div>
//               )}
//               {index === 2 && (
//                 <div className="absolute bottom-4 left-4 text-2xl opacity-30">
//                   ✨ NEW
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
        
//         {/* Slide Indicators */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                 index === currentSlide ? 'bg-white' : 'bg-white/50'
//               }`}
//             />
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         <button
//           onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors duration-300"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <button
//           onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors duration-300"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </section>

//       {/* Categories Section */}
//       <section className="py-12 px-6 max-w-7xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Shop by Category</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
//           {/* Fashion */}
//           <Link to="/products?category=Fashion" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
//               alt="Fashion"
//               className="w-16 h-16 mb-4"
//             />
//             <h3 className="text-xl font-semibold text-gray-800">Fashion</h3>
//           </Link>

//           {/* Home Essentials */}
//           <Link to="/products?category=Home Essentials" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3082/3082031.png"
//               alt="Furniture"
//               className="w-16 h-16 mb-4"
//             />
//             <h3 className="text-xl font-semibold text-gray-800">Home Essentials</h3>
//           </Link>

//           {/* Jewelry & Fashion Accessories */}
//           <Link to="/products?category=Jewelry & Fashion Accessories" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
//               alt="Jewelry"
//               className="w-16 h-16 mb-4"
//             />
//             <h3 className="text-xl font-semibold text-gray-800">Jewelry & Fashion Accessories</h3>
//           </Link>
//         </div>
//       </section>

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

//       {/* Why Shop With Us Section */}
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
//       </section>
//     </div>
//   );
// }

// // HomePage.jsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useProductStore } from "@/stores/productStore";

// export default function HomePage() {
//   const products = useProductStore((state) => state.products);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [saleCategory, setSaleCategory] = useState('Fashion');
//   const [currentSaleIndex, setCurrentSaleIndex] = useState(0);

//   // Shuffle products and take 6
//   const featuredProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 6);

//   // Carousel slides data
//   const slides = [
//     {
//       title: "Discover the Latest Products at Cymbal Store",
//       subtitle: "Shop quality items across fashion, furniture, jewelry, and more.",
//       description: "Affordable prices and fast delivery.",
//       buttonText: "Browse Products",
//       buttonLink: "/products",
//       background: "bg-gradient-to-r from-purple-600 to-purple-800"
//     },
//     {
//       title: "50% OFF",
//       subtitle: "THE HOME OF BRANDS",
//       description: "Limited time offer on selected categories. Don't miss out!",
//       buttonText: "Shop Now",
//       buttonLink: "/products#sale",
//       background: "bg-gradient-to-r from-red-500 to-pink-600"
//     },
//     {
//       title: "New Arrivals",
//       subtitle: "Fresh styles just for you",
//       description: "Discover the latest trends and must-have items in our newest collection.",
//       buttonText: "Shop Now",
//       buttonLink: "/products#new-arrivals",
//       background: "bg-gradient-to-r from-green-500 to-teal-600"
//     }
//   ];

//   // Auto-slide effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   // Sale categories
//   const saleCategories = ['Fashion', 'Home Essentials', 'Jewelry & Fashion Accessories'];
  
//   // Get sale products for current category
//   const getSaleProducts = (category) => {
//     const categoryProducts = products.filter(product => 
//       product.category?.toLowerCase().includes(category.toLowerCase()) ||
//       product.category === category
//     );
//     return categoryProducts.slice(0, 8); // Show 8 products in sale row
//   };

//   const currentSaleProducts = getSaleProducts(saleCategory);
//   const productsPerView = 4;
//   const maxSaleIndex = Math.max(0, currentSaleProducts.length - productsPerView);

//   // Generate random discount percentage
//   const getRandomDiscount = () => {
//     const discounts = [10, 15, 20, 25, 30, 35, 40, 50];
//     return discounts[Math.floor(Math.random() * discounts.length)];
//   };

//   return (
//     <div>
//       {/* Hero Carousel Section */}
//       <section className="relative h-96 overflow-hidden">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
//               index === currentSlide ? 'translate-x-0' : 
//               index < currentSlide ? '-translate-x-full' : 'translate-x-full'
//             }`}
//           >
//             <div className={`${slide.background} h-full flex items-center justify-center text-white relative`}>
//               <div className="text-center px-6 max-w-4xl mx-auto">
//                 <h1 className="text-4xl md:text-6xl font-bold mb-4">
//                   {slide.title}
//                 </h1>
//                 <p className="text-lg md:text-xl mb-2">
//                   {slide.subtitle}
//                 </p>
//                 <p className="text-base md:text-lg mb-8 opacity-90">
//                   {slide.description}
//                 </p>
//                 <Link to={slide.buttonLink}>
//                   <button className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
//                     {slide.buttonText}
//                   </button>
//                 </Link>
//               </div>
              
//               {/* Optional: Add decorative elements for specific slides */}
//               {index === 1 && (
//                 <div className="absolute top-4 right-4 text-6xl font-bold opacity-20">
//                   50%
//                 </div>
//               )}
//               {index === 2 && (
//                 <div className="absolute bottom-4 left-4 text-2xl opacity-30">
//                   ✨ NEW
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
        
//         {/* Slide Indicators */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                 index === currentSlide ? 'bg-white' : 'bg-white/50'
//               }`}
//             />
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         <button
//           onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors duration-300"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <button
//           onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors duration-300"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </section>

//       {/* SALE Section */}
//       <section id="sale" className="py-12 px-6 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">🔥 SALE</h2>
        
//         {/* Category Tabs */}
//         <div className="flex justify-center mb-6">
//           <div className="flex space-x-4 bg-gray-100 rounded-lg p-1">
//             {saleCategories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => {
//                   setSaleCategory(category);
//                   setCurrentSaleIndex(0);
//                 }}
//                 className={`px-4 py-2 rounded-md font-medium transition-colors ${
//                   saleCategory === category
//                     ? 'bg-red-500 text-white'
//                     : 'text-gray-600 hover:text-red-500'
//                 }`}
//               >
//                 {category.replace(' & Fashion Accessories', '')}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Products Carousel */}
//         <div className="relative">
//           <div className="overflow-hidden">
//             <div 
//               className="flex transition-transform duration-300 ease-in-out"
//               style={{ transform: `translateX(-${currentSaleIndex * (100 / productsPerView)}%)` }}
//             >
//               {currentSaleProducts.map((product) => {
//                 const discount = getRandomDiscount();
//                 const originalPrice = product.price;
//                 const salePrice = (originalPrice * (1 - discount / 100)).toFixed(2);
                
//                 return (
//                   <div key={product.id} className="flex-shrink-0 w-1/4 px-2">
//                     <Link
//                       to={`/products/${product.id}`}
//                       className="block bg-white border-2 border-red-200 rounded-lg shadow hover:shadow-lg transition-shadow"
//                     >
//                       <div className="relative">
//                         <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold z-10">
//                           -{discount}%
//                         </div>
//                         <div className="bg-white p-4 flex items-center justify-center rounded-t-lg h-[200px]">
//                           <img
//                             src={product.image}
//                             alt={product.name}
//                             className="object-contain max-h-full max-w-full"
//                           />
//                         </div>
//                       </div>
//                       <div className="p-4">
//                         <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
//                         <div className="flex items-center space-x-2">
//                           <span className="text-red-600 font-bold text-lg">${salePrice}</span>
//                           <span className="text-gray-500 line-through text-sm">${originalPrice}</span>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Navigation Arrows */}
//           {currentSaleIndex > 0 && (
//             <button
//               onClick={() => setCurrentSaleIndex(prev => Math.max(0, prev - 1))}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//           )}
          
//           {currentSaleIndex < maxSaleIndex && (
//             <button
//               onClick={() => setCurrentSaleIndex(prev => Math.min(maxSaleIndex, prev + 1))}
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           )}
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="py-12 px-6 max-w-7xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Shop by Category</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
//           {/* Fashion */}
//           <Link to="/products?category=Fashion" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
//               alt="Fashion"
//               className="w-16 h-16 mb-4"
//             />
//             <h3 className="text-xl font-semibold text-gray-800">Fashion</h3>
//           </Link>

//           {/* Home Essentials */}
//           <Link to="/products?category=Home Essentials" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3082/3082031.png"
//               alt="Furniture"
//               className="w-16 h-16 mb-4"
//             />
//             <h3 className="text-xl font-semibold text-gray-800">Home Essentials</h3>
//           </Link>

//           {/* Jewelry & Fashion Accessories */}
//           <Link to="/products?category=Jewelry & Fashion Accessories" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
//               alt="Jewelry"
//               className="w-16 h-16 mb-4"
//             />
//             <h3 className="text-xl font-semibold text-gray-800">Jewelry & Fashion Accessories</h3>
//           </Link>
//         </div>
//       </section>

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

//       {/* Why Shop With Us Section */}
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