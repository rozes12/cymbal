// // AdminDashboardPage.jsx
// import React, { useState } from "react";
// import { useProductStore } from "@/stores/productStore";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// export default function AdminDashboardPage() {
//   const { products, approveProduct, deleteProduct } = useProductStore();
//   const [activeTab, setActiveTab] = useState('generate'); // Default to 'generate'

//   const pendingProducts = products.filter(p => !p.approved).slice(0, 20);

//   return (
//     <div className="p-8">
//       {/* Tab Navigation for Sections */}
//       <div className="mb-6 flex space-x-4 border-b pb-2">
//         <Button
//           onClick={() => setActiveTab('generate')}
//           variant={activeTab === 'generate' ? "default" : "outline"}
//         >
//           Generate Products
//         </Button>
//         <Button
//           onClick={() => setActiveTab('approvals')}
//           variant={activeTab === 'approvals' ? "default" : "outline"}
//         >
//           Product Approvals
//         </Button>
//       </div>

//       {/* Content for 'Generate Products' Tab */}
//       {activeTab === 'generate' && (
//         <div className="mb-4">
//           <h2 className="text-2xl font-bold mb-4">Product Generation Tools</h2>
//           <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//             {/* Renamed "Go to Category Section" */}
//             <Link to="/admin/category-section">
//               <Button className="w-full sm:w-auto">Attribute Generation Prompting</Button>
//             </Link>

//             {/* Renamed "Try AI Image Editor" */}
            
//             <Link to="/admin/image-editor">
//               <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
//                 AI Image Editor
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Content for 'Product Approvals' Tab (unchanged) */}
//       {activeTab === 'approvals' && (
//         <>
//           <h2 className="text-2xl font-bold mb-4">Pending Product Approvals</h2>
//           {pendingProducts.length === 0 ? (
//             <p>No pending products.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {pendingProducts.map((product) => (
//                 <div key={product.id} className="border rounded p-4 shadow">
//                   <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-white border rounded">
//                     <img src={product.image} alt={product.name} className="max-h-full object-contain" />
//                   </div>
//                   <h3 className="text-lg font-semibold truncate">{product.name}</h3>
//                   <p  className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
//                   <p className="text-blue-700 font-bold mt-1">${product.price}</p>
//                   <div className="mt-2 space-x-2">
//                     <Button onClick={() => approveProduct(product.id)}>Approve</Button>
//                     <Button variant="destructive" onClick={() => deleteProduct(product.id)}>Reject</Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// src/pages/AdminDashboardPage.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom"; // Import Outlet and useLocation

export default function AdminDashboardPage() {
  const location = useLocation(); // Hook to get current URL location

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Products", path: "/admin/products" },
    { name: "AI Generation", path: "/admin/ai-generation" }, // This will contain your previous tab content
    { name: "Category", path: "/admin/category" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navbar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
        <div className="text-2xl font-bold mb-8 text-center text-indigo-300">
          Admin Panel
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  to={item.path}
                  // Highlight the active link based on the current path
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200
                              ${location.pathname === item.path
                                ? 'bg-indigo-600 text-white shadow'
                                : 'hover:bg-gray-700 text-gray-300'}`
                            }
                >
                  {/* You can add icons here */}
                  <span className="ml-3 text-lg">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto text-sm text-gray-400 text-center">
          © 2024 Your Company
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* The Outlet renders the content of the nested route */}
        <Outlet />
      </div>
    </div>
  );
}