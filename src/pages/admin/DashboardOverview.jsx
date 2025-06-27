// src/pages/admin/DashboardOverview.jsx
import React from 'react';

export default function DashboardOverview() {
  return (
    <div className="p-8 flex-grow">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for charts/widgets */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Orders Overview</h3>
          <p className="text-gray-600">Total orders: 1,234</p>
          <p className="text-gray-600">Pending orders: 45</p>
          <p className="text-gray-600">Revenue this month: $12,345</p>
          {/* You would integrate actual chart libraries here, e.g., Recharts, Chart.js */}
          <div className="mt-4 h-32 bg-blue-100 rounded flex items-center justify-center text-blue-700">
            [Orders Chart Placeholder]
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Product Statistics</h3>
          <p className="text-gray-600">Total products: 567</p>
          <p className="text-gray-600">Top selling product: T-Shirt</p>
          <p className="text-gray-600">Products in stock: 450</p>
          <div className="mt-4 h-32 bg-green-100 rounded flex items-center justify-center text-green-700">
            [Products Chart Placeholder]
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">User Activity</h3>
          <p className="text-gray-600">New users this week: 89</p>
          <p className="text-gray-600">Active users today: 210</p>
          <p className="text-gray-600">Total users: 2,500</p>
          <div className="mt-4 h-32 bg-yellow-100 rounded flex items-center justify-center text-yellow-700">
            [Users Chart Placeholder]
          </div>
        </div>

        {/* Add more widgets as needed */}
      </div>
    </div>
  );
}