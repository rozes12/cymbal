// src/pages/admin/OrdersPage.jsx
import React from 'react';

export default function OrdersPage() {
  return (
    <div className="p-8 flex-grow">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h2>
      <p className="text-gray-600">View and manage customer orders.</p>
      {/* Add your order listing, details, and fulfillment tools here */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Recent Orders</h3>
        <p>List of recent orders will go here.</p>
      </div>
    </div>
  );
}