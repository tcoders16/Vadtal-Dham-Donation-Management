import React, { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import Logo from "../components/Logo";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";

// This is the admin login page for the donation management system
export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });

    try {
      const response = await fetch("http://localhost:3000/app/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("DATA:", data);

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/add-donation");
      } else {
        alert(data.message || "Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Server error. Please try again later.");
    }
  };

  // 🔑 You can add your logic to handle this action later
  const handleGenerateNewPassword = () => {
    alert("Redirecting to password reset flow...");
    // For example:
     navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="absolute top-0 left-0 w-full h-64 flex items-center justify-center">
        <Heading
          title="Vadtal Dham Toronto Donation Management"
          tagline="Serve with Faith & Transparency"
        />
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo src="/images/logo.png" size={100} />
        </div>

        <h1 className="text-3xl mb-8 text-center text-indigo-700 poppins-bold">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-gray-700 poppins-semibold">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 poppins-regular"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700 poppins-semibold">
              Password
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {/* 👉 New: Generate New Password link */}
            <button
              type="button"
              onClick={handleGenerateNewPassword}
              className="mt-2 text-sm text-indigo-600 hover:underline focus:outline-none"
            >
              Generate a new password
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 poppins-medium"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}