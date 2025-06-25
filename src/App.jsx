

// // import React from "react";
// import React, { useEffect } from "react";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "@/components/ui/Navbar";
// import Footer from "@/components/ui/Footer";
// import { Button } from "@/components/ui/button";
// import HomePage from "@/pages/HomePage";
// import ProductsPage from "@/pages/ProductPage";
// import ProductDetailsPage from "@/pages/ProductDetailsPage";
// import CartPage from "@/pages/CartPage";
// import AccountPage from "@/pages/AccountPage";
// import AdminLoginPage from "@/pages/AdminLoginPage";
// import AdminDashboardPage from "@/pages/AdminDashboardPage";
// import { useProductStore } from "@/stores/productStore";

// export default function App() {
//     const fetchProducts = useProductStore((state) => state.fetchProducts);

//   useEffect(() => {
//     fetchProducts(); // fetch from GCS on app load
//   }, []);
//   return (
//     <Router>
//        {/* This is the key wrapper div for the sticky footer */}
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         {/* The main content area that will grow */}
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/products" element={<ProductsPage />} />
//             <Route path="/products/:id" element={<ProductDetailsPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/account" element={<AccountPage />} />
//             <Route path="/admin-login" element={<AdminLoginPage />} />
//             <Route path="/admin" element={<AdminDashboardPage />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }



import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import CartPage from "@/pages/CartPage";
import AccountPage from "@/pages/AccountPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import { useProductStore } from "@/stores/productStore";

export default function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts(); // ✅ Fetch product data from GCS
  }, []);

  useEffect(() => {
  // Prevent multiple script injections and element registration
  if (document.querySelector("df-messenger") || document.querySelector('script[src*="df-messenger.js"]')) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src =
    "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
  script.async = true;
  document.body.appendChild(script);

  const messenger = document.createElement("df-messenger");
  messenger.setAttribute("project-id", "carbide-bongo-463902-u1");
  messenger.setAttribute("agent-id", "2fdea9e0-498d-44c1-a9b3-5a9292395424");
  messenger.setAttribute("language-code", "en");

  const bubble = document.createElement("df-messenger-chat-bubble");
  bubble.setAttribute("chat-title", "Cymple2Use2");
  messenger.appendChild(bubble);

  document.body.appendChild(messenger);

  const style = document.createElement("style");
  style.innerHTML = `
    df-messenger {
      z-index: 999;
      position: fixed;
      --df-messenger-font-color: #000;
      --df-messenger-font-family: Google Sans;
      --df-messenger-chat-background: #f3f6fc;
      --df-messenger-message-user-background: #d3e3fd;
      --df-messenger-message-bot-background: #fff;
      bottom: 16px;
      right: 16px;
    }
  `;
  document.head.appendChild(style);
}, []);


  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
