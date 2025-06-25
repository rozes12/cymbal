



// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "@/components/ui/Navbar";
// import Footer from "@/components/ui/Footer";
// import HomePage from "@/pages/HomePage";
// import ProductsPage from "@/pages/ProductPage";
// import ProductDetailsPage from "@/pages/ProductDetailsPage";
// import CartPage from "@/pages/CartPage";
// import AccountPage from "@/pages/AccountPage";
// import AdminLoginPage from "@/pages/AdminLoginPage";
// import AdminDashboardPage from "@/pages/AdminDashboardPage";
// import CategorySectionPage from "@/CategorySectionPage"; // <--- NEW IMPORT for the Category Section Page
// import { useProductStore } from "@/stores/productStore";

// export default function App() {
//   const fetchProducts = useProductStore((state) => state.fetchProducts);

//   useEffect(() => {
//     fetchProducts(); // ✅ Fetch product data from GCS
//   }, []);

//   useEffect(() => {
//   // Prevent multiple script injections and element registration
//   if (document.querySelector("df-messenger") || document.querySelector('script[src*="df-messenger.js"]')) return;

//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href =
//     "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
//   document.head.appendChild(link);

//   const script = document.createElement("script");
//   script.src =
//     "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
//   script.async = true;
//   document.body.appendChild(script);

//   const messenger = document.createElement("df-messenger");
//   messenger.setAttribute("project-id", "carbide-bongo-463902-u1");
//   messenger.setAttribute("agent-id", "2fdea9e0-498d-44c1-a9b3-5a9292395424");
//   messenger.setAttribute("language-code", "en");

//   const bubble = document.createElement("df-messenger-chat-bubble");
//   bubble.setAttribute("chat-title", "Cymple2Use2");
//   messenger.appendChild(bubble);

//   document.body.appendChild(messenger);

//   const style = document.createElement("style");
//   style.innerHTML = `
//     df-messenger {
//       z-index: 999;
//       position: fixed;
//       --df-messenger-font-color: #000;
//       --df-messenger-font-family: Google Sans;
//       --df-messenger-chat-background: #f3f6fc;
//       --df-messenger-message-user-background: #d3e3fd;
//       --df-messenger-message-bot-background: #fff;
//       bottom: 16px;
//       right: 16px;
//     }
//   `;
//   document.head.appendChild(style);
// }, []);


//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/products" element={<ProductsPage />} />
//             <Route path="/products/:id" element={<ProductDetailsPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/account" element={<AccountPage />} />
//             <Route path="/admin-login" element={<AdminLoginPage />} />
//             <Route path="/admin" element={<AdminDashboardPage />} />
//             {/* NEW ROUTE for Category Section Page */}
//             <Route path="/admin/category-section" element={<CategorySectionPage />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }


import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import CartPage from "@/pages/CartPage";
import AccountPage from "@/pages/AccountPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import CategorySectionPage from "@/CategorySectionPage";

// --- NEW IMPORTS for Authentication ---
import UserProfilePage from "@/pages/UserProfilePage"; // You need to create this component
import { useProductStore } from "@/stores/productStore";
import { useUserAuthStore } from "@/stores/userAuthStore"; // Import your user authentication store
import { useAdminAuthStore } from "@/stores/adminAuthStore"; // Import your admin authentication store

export default function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  // Get authentication states from your stores
  const isLoggedIn = useUserAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAdminAuthStore((state) => state.isAdmin);

  // Effect to fetch products (existing)
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Added fetchProducts to dependency array for best practice

  // Effect to initialize authentication stores on app load
  // This re-hydrates the state from localStorage if a token exists
  useEffect(() => {
    useUserAuthStore.getState().initialize();
    useAdminAuthStore.getState().initialize();
  }, []); // Empty dependency array means this runs once on mount

  // Effect for Dialogflow Messenger (existing)
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
            {/* Public Routes - Accessible to everyone */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Note: CheckoutPage might need user login protection in a real app */}

            {/* User Authentication Routes */}
            {/* If user is already logged in, redirect them from /account to their profile. */}
            <Route
              path="/account"
              element={isLoggedIn ? <Navigate to="/profile" replace /> : <AccountPage />}
            />
            {/* User Profile/Dashboard Route - Protected */}
            {/* If user is NOT logged in, redirect them to the /account page. */}
            <Route
              path="/profile"
              element={isLoggedIn ? <UserProfilePage /> : <Navigate to="/account" replace />}
            />

            {/* Admin Authentication Routes */}
            {/* If an admin is already logged in, redirect them from /admin-login to the admin dashboard. */}
            <Route
              path="/admin-login"
              element={isAdmin ? <Navigate to="/admin" replace /> : <AdminLoginPage />}
            />
            {/* Admin Dashboard Route - Protected */}
            {/* If not an admin, redirect them to the /admin-login page. */}
            <Route
              path="/admin"
              element={isAdmin ? <AdminDashboardPage /> : <Navigate to="/admin-login" replace />}
            />
            {/* Admin Category Section Page - Protected for Admin */}
            {/* If not an admin, redirect them to the /admin-login page. */}
            <Route
              path="/admin/category-section"
              element={isAdmin ? <CategorySectionPage /> : <Navigate to="/admin-login" replace />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}