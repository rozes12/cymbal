// src/pages/admin/ProductManagementPage.jsx
import React from 'react';

export default function ProductManagementPage() {
  return (
    <div className="p-8 flex-grow">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Product Management</h2>
      <p className="text-gray-600">Manage all your products here: view, edit, add, delete.</p>
      {/* Add your product listing, editing forms, etc. here */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">All Products List</h3>
        <p>List of all products will go here.</p>
      </div>
    </div>
  );
}