import React from "react";
import { useProductStore } from "@/stores/productStore";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const { products, approveProduct, deleteProduct } = useProductStore();
  const pendingProducts = products.filter(p => !p.approved).slice(0, 20);

  return (
    <div className="p-8">
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
    </div>
  );
}
