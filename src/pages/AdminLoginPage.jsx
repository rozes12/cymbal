// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAdminAuthStore } from "@/stores/adminAuthStore";
// import { Button } from "@/components/ui/button";

// export default function AdminLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const login = useAdminAuthStore((state) => state.login);
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     const success = login(email, password);
//     if (success) navigate("/admin");
//     else alert("Invalid admin credentials.");
//   };

//   return (
//     <div className="p-8 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email" className="w-full mb-2 p-2 border rounded" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 p-2 border rounded" />
//       <Button onClick={handleSubmit} className="w-full">Login as Admin</Button>
//     </div>
//   );
// }


// src/pages/AdminLoginPage.jsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from "@/stores/adminAuthStore"; // Import admin store

// Global Message Component (same as in AccountPage)
function MessageDisplay({ message, type }) {
  if (!message) return null;
  const baseClasses = "p-3 rounded-md mb-4 text-center";
  const typeClasses = {
    error: "bg-red-100 text-red-700 border border-red-400",
    success: "bg-green-100 text-green-700 border border-green-400",
    info: "bg-blue-100 text-blue-700 border border-blue-400",
  };
  return (
    <div className={`${baseClasses} ${typeClasses[type || 'info']}`}>
      {message}
    </div>
  );
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const adminLogin = useAdminAuthStore((state) => state.login); // Get the hardcoded login method

  const handleAdminLogin = () => {
    setErrorMessage(''); // Clear previous error

    // Call the hardcoded login method
    const loginSuccess = adminLogin(email, password);

    if (loginSuccess) {
      navigate('/admin'); // Redirect to admin dashboard on success
    } else {
      setErrorMessage('Invalid admin credentials.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Admin Login</h2>

      {errorMessage && <MessageDisplay message={errorMessage} type="error" />}

      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>

      <div className="flex flex-col space-y-3 mt-6">
        <Button onClick={handleAdminLogin} className="w-full py-2  text-white font-semibold rounded-md shadow-md transition duration-200">
          Login as Admin
        </Button>
      </div>
    </div>
  );
}