import React from 'react';
import { useUserAuthStore } from '@/stores/userAuthStore';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function UserProfilePage() {
  const userLogout = useUserAuthStore((state) => state.userLogout);
  const userToken = useUserAuthStore((state) => state.userToken); // Example: access token

  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-10 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Welcome, User!</h2>
      <p className="text-gray-700 mb-4">This is your personal profile page.</p>
      {/* You can display user-specific data here */}
      {userToken && <p className="text-sm text-gray-500 break-words">Your token: {userToken.substring(0, 30)}...</p>}
      <Button onClick={handleLogout} className="mt-6 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md">
        Logout
      </Button>
    </div>
  );
}