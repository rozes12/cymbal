

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button"; // Adjust if needed

// // --- Global Message Component (to replace alert) ---
// function MessageDisplay({ message, type }) {
//   if (!message) return null;

//   const baseClasses = "p-3 rounded-md mb-4 text-center";
//   const typeClasses = {
//     error: "bg-red-100 text-red-700 border border-red-400",
//     success: "bg-green-100 text-green-700 border border-green-400",
//     info: "bg-blue-100 text-blue-700 border border-blue-400",
//   };

//   return (
//     <div className={`${baseClasses} ${typeClasses[type || 'info']}`}>
//       {message}
//     </div>
//   );
// }

// export default function AccountPage({ onLoginSuccess }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');


//   const API_BASE = import.meta.env.VITE_REACT_APP_API_URL;
//   const handleLogin = async () => {
//     setErrorMessage('');
//     setSuccessMessage('');

//     if (!email || !password) {
//       setErrorMessage('Please enter both email and password.');
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE}/api/login`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSuccessMessage(data.message || 'Login successful!');
//         onLoginSuccess?.();
//       } else {
//         setErrorMessage(data.error || 'Login failed.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setErrorMessage('An error occurred. Please try again.');
//     }
//   };

//   const handleRegister = async () => {
//     setErrorMessage('');
//     setSuccessMessage('');

//     if (!email || !password) {
//       setErrorMessage('Please enter both email and password for registration.');
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE}/api/register`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSuccessMessage(data.message || 'Registration successful! You can now log in.');
//         setEmail('');
//         setPassword('');
//       } else {
//         setErrorMessage(data.error || 'Registration failed.');
//       }
//     } catch (error) {
//       console.error('Register error:', error);
//       setErrorMessage('An error occurred. Please try again.');
//     }
//   };

//   const handleGoogleLogin = () => {
//     setErrorMessage('Google login is not yet implemented.');
//   };

//   return (
//     <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-10">
//       <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">User Account</h2>

//       {errorMessage && <MessageDisplay message={errorMessage} type="error" />}
//       {successMessage && <MessageDisplay message={successMessage} type="success" />}

//       <div className="space-y-4">
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
//         />
//       </div>

//       <div className="flex flex-col space-y-3 mt-6">
//         <Button onClick={handleLogin} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-200">
//           Login
//         </Button>
//         <Button onClick={handleRegister} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition duration-200">
//           Register
//         </Button>
//         <Button
//           onClick={handleGoogleLogin}
//           variant="outline"
//           className="w-full py-2 border border-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-50 transition duration-200 flex items-center justify-center"
//         >
//           <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M22.47 12.28c0-.79-.07-1.57-.21-2.34H12v4.47h6.05c-.26 1.42-1.04 2.65-2.22 3.46v2.92h3.76c2.21-2.03 3.49-5.06 3.49-8.51z" fill="#4285F4"/>
//             <path d="M12 23c3.24 0 5.95-1.07 7.93-2.92l-3.76-2.92c-1.04.7-2.38 1.12-3.95 1.12-3.03 0-5.58-2.05-6.49-4.8l-3.86 2.99c1.94 3.86 6.03 6.55 10.12 6.55z" fill="#34A853"/>
//             <path d="M5.51 14.1c-.24-.7-.38-1.44-.38-2.19s.14-1.49.38-2.19V6.82L1.65 3.83C.61 5.92 0 8.36 0 10.89c0 2.54.61 4.97 1.65 7.06L5.51 14.1z" fill="#FBBC05"/>
//             <path d="M12 4.94c1.77 0 3.35.61 4.6 1.76l3.35-3.35C17.95 1.76 15.24 0 12 0 7.88 0 4.2 2.45 2.26 6.32l3.86 2.99c.92-2.75 3.47-4.8 6.49-4.8z" fill="#EA4335"/>
//           </svg>
//           Login with Google
//         </Button>
//       </div>
//     </div>
//   );
// }


// src/pages/AccountPage.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useUserAuthStore } from "@/stores/userAuthStore"; // Import the new user store

// --- Global Message Component (to replace alert) ---
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

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const setUserToken = useUserAuthStore((state) => state.setUserToken); // Get setUserToken from user store

  const API_BASE = import.meta.env.VITE_REACT_APP_API_URL;

  const handleLogin = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message || 'Login successful!');
        if (data.token) {
          setUserToken(data.token); // Use user store's setUserToken
          navigate('/'); // Redirect to the home page after user login
        } else {
            setErrorMessage('Login successful, but no authentication token was received.');
        }
      } else {
        setErrorMessage(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An unexpected error occurred during login. Please try again.');
    }
  };

  const handleRegister = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password for registration.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message || 'Registration successful! You can now log in.');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(data.error || 'Registration failed. ' + (data.error || ''));
      }
    } catch (error) {
      console.error('Register error:', error);
      setErrorMessage('An unexpected error occurred during registration. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    setErrorMessage('Google login is not yet implemented.');
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">User Account</h2>

      {errorMessage && <MessageDisplay message={errorMessage} type="error" />}
      {successMessage && <MessageDisplay message={successMessage} type="success" />}

      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>

      <div className="flex flex-col space-y-3 mt-6">
        <Button onClick={handleLogin} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-200">
          Login
        </Button>
        <Button onClick={handleRegister} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition duration-200">
          Register
        </Button>
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full py-2 border border-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-50 transition duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.47 12.28c0-.79-.07-1.57-.21-2.34H12v4.47h6.05c-.26 1.42-1.04 2.65-2.22 3.46v2.92h3.76c2.21-2.03 3.49-5.06 3.49-8.51z" fill="#4285F4"/>
            <path d="M12 23c3.24 0 5.95-1.07 7.93-2.92l-3.76-2.92c-1.04.7-2.38 1.12-3.95 1.12-3.03 0-5.58-2.05-6.49-4.8l-3.86 2.99c1.94 3.86 6.03 6.55 10.12 6.55z" fill="#34A853"/>
            <path d="M5.51 14.1c-.24-.7-.38-1.44-.38-2.19s.14-1.49.38-2.19V6.82L1.65 3.83C.61 5.92 0 8.36 0 10.89c0 2.54.61 4.97 1.65 7.06L5.51 14.1z" fill="#FBBC05"/>
            <path d="M12 4.94c1.77 0 3.35.61 4.6 1.76l3.35-3.35C17.95 1.76 15.24 0 12 0 7.88 0 4.2 2.45 2.26 6.32l3.86 2.99c.92-2.75 3.47-4.8 6.49-4.8z" fill="#EA4335"/>
          </svg>
          Login with Google
        </Button>
      </div>
    </div>
  );
}