

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import CartPage from "@/pages/CartPage";
import AccountPage from "@/pages/AccountPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
}
