


import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useAdminAuthStore } from "@/stores/adminAuthStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const isAdmin = useAdminAuthStore((state) => state.isAdmin);
  const logout = useAdminAuthStore((state) => state.logout);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-gray-800">Cymbal Store</Link>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/products">Products</Link>
        <Link to="/cart" className="relative">
          <ShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cart.length}
            </span>
          )}
        </Link>
        <Link to="/account"><User /></Link>
        {isAdmin ? (
          <>
            <Link to="/admin">Admin</Link>
            <button onClick={logout} className="text-sm text-red-600">Logout</button>
          </>
        ) : (
          <Link to="/admin-login">Admin Login</Link>
        )}
      </div>
    </nav>
  );
}
