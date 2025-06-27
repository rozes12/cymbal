// src/pages/admin/UsersPage.jsx
import React from 'react';

export default function UsersPage() {
  return (
    <div className="p-8 flex-grow">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">User Management</h2>
      <p className="text-gray-600">Manage user accounts and roles.</p>
      {/* Add your user listing, profile editing, and role management here */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Registered Users</h3>
        <p>List of registered users will go here.</p>
      </div>
    </div>
  );
}