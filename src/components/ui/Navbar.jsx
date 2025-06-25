

// import React from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart, User, Home, Package } from "lucide-react"; // Added Home and Package icons
// import { useCartStore } from "@/stores/cartStore";
// import { useAdminAuthStore } from "@/stores/adminAuthStore";

// export default function Navbar() {
//   const cart = useCartStore((state) => state.cart);
//   const isAdmin = useAdminAuthStore((state) => state.isAdmin);
//   const logout = useAdminAuthStore((state) => state.logout);

//   return (
//     <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
//         {/* Brand/Logo */}
//         <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-300 transition duration-300 ease-in-out">
//           {/* You could add a small logo image here */}
//           <Home className="h-6 w-6" />
//           <span className="text-2xl font-extrabold tracking-tight">Cymbal Store</span>
//         </Link>

//         {/* Navigation Links */}
//         <div className="flex items-center space-x-6 md:space-x-8">
//           <Link
//             to="/products"
//             className="text-gray-300 hover:text-white transition duration-300 ease-in-out flex items-center space-x-1 group"
//           >
//             <Package className="h-5 w-5 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">Products</span>
//           </Link>

//           <Link
//             to="/cart"
//             className="relative text-gray-300 hover:text-white transition duration-300 ease-in-out flex items-center space-x-1 group"
//           >
//             <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 animate-pulse">
//                 {cart.length}
//               </span>
//             )}
//             <span className="font-medium hidden md:inline">Cart</span> {/* Optional text for larger screens */}
//           </Link>

//           <Link
//             to="/account"
//             className="text-gray-300 hover:text-white transition duration-300 ease-in-out flex items-center space-x-1 group"
//           >
//             <User className="h-6 w-6 group-hover:scale-110 transition-transform" />
//             <span className="font-medium hidden md:inline">Account</span> {/* Optional text for larger screens */}
//           </Link>

//           {/* Admin Links */}
//           {isAdmin ? (
//             <>
//               <Link
//                 to="/admin"
//                 className="text-gray-300 hover:text-white transition duration-300 ease-in-out font-medium"
//               >
//                 Admin Dashboard
//               </Link>
//               <button
//                 onClick={logout}
//                 className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition duration-300 ease-in-out text-sm font-medium"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               to="/admin-login"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-sm font-medium"
//             >
//               Admin Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Home, Package } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useAdminAuthStore } from "@/stores/adminAuthStore"; // Import admin store
import { useUserAuthStore } from "@/stores/userAuthStore";   // Import user store

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  // Admin-specific state and actions
  const isAdmin = useAdminAuthStore((state) => state.isAdmin);
  const adminLogout = useAdminAuthStore((state) => state.adminLogout); // Renamed logout

  // User-specific state and actions
  const isLoggedIn = useUserAuthStore((state) => state.isLoggedIn); // Check if a general user is logged in
  const userLogout = useUserAuthStore((state) => state.userLogout); // Added userLogout

  // Determine if any user (admin or general) is logged in for the Account link
  const anyUserLoggedIn = isLoggedIn || isAdmin;

  // Decide which logout function to call based on who is logged in
  const handleLogout = () => {
    if (isAdmin) {
      adminLogout();
    } else if (isLoggedIn) {
      userLogout();
    }
    // You might also want to navigate to the home or login page after any logout
    // For this, you would use `useNavigate` here as well, if the Navbar is within a Router context.
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-300 transition duration-300 ease-in-out">
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
            <span className="font-medium hidden md:inline">Cart</span>
          </Link>

          {/* Account/User Profile Link - changes based on login status */}
          {anyUserLoggedIn ? (
            <Link
              to="/profile" // Or a more generic user dashboard page
              className="text-gray-300 hover:text-white transition duration-300 ease-in-out flex items-center space-x-1 group"
            >
              <User className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium hidden md:inline">My Profile</span>
            </Link>
          ) : (
            <Link
              to="/account" // Link to the user login/registration page
              className="text-gray-300 hover:text-white transition duration-300 ease-in-out flex items-center space-x-1 group"
            >
              <User className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium hidden md:inline">Account</span>
            </Link>
          )}


          {/* Admin Links & Logout */}
          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out font-medium"
              >
                Admin Dashboard
              </Link>
              <button
                onClick={handleLogout} // Calls the combined logout handler
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition duration-300 ease-in-out text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            // Only show Admin Login if no general user is logged in
            !isLoggedIn && (
              <Link
                to="/admin-login" // This should be a separate AdminLoginPage.jsx
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-sm font-medium"
              >
                Admin Login
              </Link>
            )
          )}
          {/* Show a general logout button if a non-admin user is logged in */}
          {!isAdmin && isLoggedIn && (
             <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition duration-300 ease-in-out text-sm font-medium"
              >
                Logout
              </button>
          )}
        </div>
      </div>
    </nav>
  );
}