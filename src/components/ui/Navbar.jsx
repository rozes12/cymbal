


// import React from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart, User } from "lucide-react";
// import { useCartStore } from "@/stores/cartStore";
// import { useAdminAuthStore } from "@/stores/adminAuthStore";

// export default function Navbar() {
//   const cart = useCartStore((state) => state.cart);
//   const isAdmin = useAdminAuthStore((state) => state.isAdmin);
//   const logout = useAdminAuthStore((state) => state.logout);

//   return (
//     <nav className="bg-white shadow sticky top-0 z-50">
//       <Link to="/" className="text-xl font-bold text-gray-800">Cymbal Store</Link>
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/products">Products</Link>
//         <Link to="/cart" className="relative">
//           <ShoppingCart />
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
//               {cart.length}
//             </span>
//           )}
//         </Link>
//         <Link to="/account"><User /></Link>
//         {isAdmin ? (
//           <>
//             <Link to="/admin">Admin</Link>
//             <button onClick={logout} className="text-sm text-red-600">Logout</button>
//           </>
//         ) : (
//           <Link to="/admin-login">Admin Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Home, Package } from "lucide-react"; // Added Home and Package icons
import { useCartStore } from "@/stores/cartStore";
import { useAdminAuthStore } from "@/stores/adminAuthStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const isAdmin = useAdminAuthStore((state) => state.isAdmin);
  const logout = useAdminAuthStore((state) => state.logout);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-300 transition duration-300 ease-in-out">
          {/* You could add a small logo image here */}
          <Home className="h-6 w-6" />
          <span className="text-2xl font-extrabold tracking-tight">Cymbal Store</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 md:space-x-8">
          <Link
            to="/products"
            className="text-gray-300 hover:text-white transition duration-300 ease-in-out flex items-center space-x-1 group"
          >
            <Package className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Products</span>
          </Link>

          <Link
            to="/cart"
            className="relative text-gray-300 hover:text-white transition duration-300 ease-in-out flex items-center space-x-1 group"
          >
            <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 animate-pulse">
                {cart.length}
              </span>
            )}
            <span className="font-medium hidden md:inline">Cart</span> {/* Optional text for larger screens */}
          </Link>

          <Link
            to="/account"
            className="text-gray-300 hover:text-white transition duration-300 ease-in-out flex items-center space-x-1 group"
          >
            <User className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="font-medium hidden md:inline">Account</span> {/* Optional text for larger screens */}
          </Link>

          {/* Admin Links */}
          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out font-medium"
              >
                Admin Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition duration-300 ease-in-out text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin-login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-sm font-medium"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}