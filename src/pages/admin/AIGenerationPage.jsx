// src/pages/admin/AIGenerationPage.jsx
import React, { useState } from "react";
import { useProductStore } from "@/stores/productStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AIGenerationPage() {
  const { products, approveProduct, deleteProduct } = useProductStore();
  const [activeTab, setActiveTab] = useState('generate'); // Default to 'generate' when on this page

  const pendingProducts = products.filter(p => !p.approved).slice(0, 20);

  return (
    <div className="p-8 flex-grow bg-gray-100"> {/* Added bg-gray-100 for overall page background */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">AI Generation Tools</h2>

      {/* Tab Navigation for Sections */}
      <div className="mb-6 flex space-x-4 border-b pb-2">
        <Button
          onClick={() => setActiveTab('generate')}
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
        <div className="mb-4 p-6 bg-white rounded-lg shadow-md border border-gray-200"> {/* Added styling */}
          <h3 className="text-2xl font-bold mb-4 text-gray-700">Product Generation Tools</h3>
          <p className="text-gray-600 mb-6">Utilize AI to generate new product attributes and enhance images.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/admin/category-section-from-image">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-md">
                Attribute Generation Prompting
              </Button>
            </Link>
            <Link to="/admin/image-editor">
              <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-md">
                AI Image Editor
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Content for 'Product Approvals' Tab */}
      {activeTab === 'approvals' && (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200"> {/* Added styling */}
          <h3 className="text-2xl font-bold mb-4 text-gray-700">Pending Product Approvals</h3>
          {pendingProducts.length === 0 ? (
            <p className="text-gray-600">No pending products to review at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Adjusted grid */}
              {pendingProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white flex flex-col"> {/* Added styling */}
                  <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-50 rounded-lg mb-3">
                    <img src={product.image} alt={product.name} className="max-h-full object-contain" />
                  </div>
                  <h4 className="text-lg font-semibold truncate mb-1 text-gray-800">{product.name}</h4>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-2">{product.description}</p>
                  <p className="text-blue-700 font-bold mt-auto mb-3">${product.price}</p> {/* mt-auto pushes price to bottom */}
                  <div className="mt-auto space-x-2 flex justify-end"> {/* Pushed buttons to end */}
                    <Button onClick={() => approveProduct(product.id)} className="bg-green-500 hover:bg-green-600 text-white">Approve</Button>
                    <Button variant="destructive" onClick={() => deleteProduct(product.id)} className="bg-red-500 hover:bg-red-600 text-white">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}