import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuthStore } from "@/stores/adminAuthStore";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAdminAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const success = login(email, password);
    if (success) navigate("/admin");
    else alert("Invalid admin credentials.");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email" className="w-full mb-2 p-2 border rounded" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 p-2 border rounded" />
      <Button onClick={handleSubmit} className="w-full">Login as Admin</Button>
    </div>
  );
}
