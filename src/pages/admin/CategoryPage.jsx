// src/pages/admin/CategoryPage.jsx
import React from 'react';

export default function CategoryPage() {
  return (
    <div className="p-8 flex-grow">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Category Management</h2>
      <p className="text-gray-600">Manage product categories here.</p>
      {/* Add your category listing, creation, and editing tools here */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Product Categories</h3>
        <p>List of categories will go here.</p>
      </div>
    </div>
  );
}