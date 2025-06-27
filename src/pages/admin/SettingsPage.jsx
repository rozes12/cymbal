// src/pages/admin/SettingsPage.jsx
import React from 'react';

export default function SettingsPage() {
  return (
    <div className="p-8 flex-grow">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Settings</h2>
      <p className="text-gray-600">Configure dashboard settings.</p>
      {/* Add your general settings, API keys, etc. here */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">General Settings</h3>
        <p>Configuration options will go here.</p>
      </div>
    </div>
  );
}