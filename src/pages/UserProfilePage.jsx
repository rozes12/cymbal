// import React from 'react';
// import { useUserAuthStore } from '@/stores/userAuthStore';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';

// export default function UserProfilePage() {
//   const userLogout = useUserAuthStore((state) => state.userLogout);
//   const userToken = useUserAuthStore((state) => state.userToken); // Example: access token

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     userLogout();
//     navigate('/'); // Redirect to home after logout
//   };

//   return (
//     <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-10 text-center">
//       <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Welcome, User!</h2>
//       <p className="text-gray-700 mb-4">This is your personal profile page.</p>
//       {/* You can display user-specific data here */}
//       {userToken && <p className="text-sm text-gray-500 break-words">Your token: {userToken.substring(0, 30)}...</p>}
//       <Button onClick={handleLogout} className="mt-6 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md">
//         Logout
//       </Button>
//     </div>
//   );
// }

import React from 'react';
import { useUserAuthStore } from '@/stores/userAuthStore';
import { Button } from '@/components/ui/button'; // Assuming Shadcn Button
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming Shadcn Card
import { useNavigate } from 'react-router-dom';

export default function UserProfilePage() {
  const userLogout = useUserAuthStore((state) => state.userLogout);
  const userToken = useUserAuthStore((state) => state.userToken);

  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4"> {/* Center content vertically and horizontally */}
      <Card className="w-full max-w-md shadow-2xl"> {/* Use Shadcn Card for better styling */}
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold text-gray-900 mb-2">Welcome, User!</CardTitle>
          <CardDescription className="text-gray-600">This is your personal profile page.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Explore your personalized content and manage your account settings here.
          </p>

          {/* Optional: Display a message if token exists */}
          {userToken && (
            <div className="mb-6 p-3 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-600">Your session token (first 30 chars):</p>
              <p className="text-xs text-gray-800 break-all font-mono mt-1">{userToken.substring(0, 30)}...</p>
            </div>
          )}

          <Button
            onClick={handleLogout}
            className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-lg transition-colors duration-200 ease-in-out"
          >
            Logout
          </Button>

          {/* Example of adding more profile actions */}
          <div className="mt-4 space-y-2">
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}