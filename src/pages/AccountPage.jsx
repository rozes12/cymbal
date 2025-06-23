import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    alert("Logged in with email: " + email);
    navigate("/");
  };

  const handleGoogleLogin = () => {
    alert("Google login clicked");
    navigate("/");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border rounded" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 p-2 border rounded" />
      <Button onClick={handleLogin} className="w-full mb-2">Login</Button>
      <Button onClick={handleGoogleLogin} variant="outline" className="w-full">Login with Google</Button>
    </div>
  );
}
