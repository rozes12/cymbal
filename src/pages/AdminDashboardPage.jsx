// AdminDashboardPage.jsx
import React, { useState } from "react"; // Import useState
import { useProductStore } from "@/stores/productStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Import Link

export default function AdminDashboardPage() {
  const { products, approveProduct, deleteProduct } = useProductStore();
  const [activeTab, setActiveTab] = useState('generate'); // Default to 'generate' or 'approvals' as preferred

  const pendingProducts = products.filter(p => !p.approved).slice(0, 20);

  return (
    <div className="p-8">
      {/* Tab Navigation for Sections */}
      <div className="mb-6 flex space-x-4 border-b pb-2">
        <Button
          onClick={() => setActiveTab('generate')}
          // Use variant to visually indicate active tab (assuming shadcn Button supports 'default' and 'outline')
          variant={activeTab === 'generate' ? "default" : "outline"}
        >
          Generate Products
        </Button>
        <Button
          onClick={() => setActiveTab('approvals')}
          variant={activeTab === 'approvals' ? "default" : "outline"}
        >
          Product Approvals
        </Button>
      </div>

      {/* Content for 'Generate Products' Tab */}
      {activeTab === 'generate' && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Product Generation Tools</h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Existing "Go to Category Section" Button */}
            <Link to="/admin/category-section">
              <Button className="w-full sm:w-auto">Go to Category Section (Attribute Gen)</Button>
            </Link>

            {/* NEW "Try AI Image Editor" Button */}
            {/* IMPORTANT: Use <a> tag for external HTML files */}
            <a
              href="/imagen.html" // Path relative to your public directory
              target="_blank"    // Opens in a new tab
              rel="noopener noreferrer" // Recommended for target="_blank" for security
            >
              <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
                Try AI Image Editor
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Content for 'Product Approvals' Tab */}
      {activeTab === 'approvals' && (
        <>
          <h2 className="text-2xl font-bold mb-4">Pending Product Approvals</h2>
          {pendingProducts.length === 0 ? (
            <p>No pending products.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingProducts.map((product) => (
                <div key={product.id} className="border rounded p-4 shadow">
                  <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-white border rounded">
                    <img src={product.image} alt={product.name} className="max-h-full object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                  <p  className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                  <p className="text-blue-700 font-bold mt-1">${product.price}</p>
                  <div className="mt-2 space-x-2">
                    <Button onClick={() => approveProduct(product.id)}>Approve</Button>
                    <Button variant="destructive" onClick={() => deleteProduct(product.id)}>Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}