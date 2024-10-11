'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Frontend validation for confirming passwords
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // Send only email and password to the backend
      const response = await axios.post("https://wishah-spa-server.onrender.com/auth/register", {
        email,
        password,
      });

      console.log("Response from server:", response.data);

      if ((response.status === 200 || response.status === 201) && response.data && response.data.message) {
        toast.success("Registration successful");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-cover bg-center" style={{ flex: '0 0 45%', backgroundImage: "url('/wishahmain.png')" }}></div>

      {/* Right Column with Register Form */}
      <div className="flex-1 flex bg-pinkCustom flex-col justify-center items-center p-6" style={{ flex: '0 0 55%' }}>
        <img src="/wishahLogo.png" alt="Logo" className="mb-16 h-40 w-48 ml-12 " /> {/* Logo */}
        <h2 className="text-5xl font-bold text-white text-center mb-4 ml-14">Register for SPA CMS</h2> {/* Title */}
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="border border-gray-300 p-2 bg-white rounded-lg w-full py-3 shadow-[0px_6px_0px_0px_rgba(0,0,0,0.1)]"
              value={email}
              style={{ width: '120%' }}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              style={{ width: '120%' }}
              className="border border-gray-300 bg-white p-2 rounded-lg py-3 w-full shadow-[0px_6px_0px_0px_rgba(0,0,0,0.1)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="confirmPassword"
              style={{ width: '120%' }}
              className="border border-gray-300 bg-white p-2 rounded-lg py-3 w-full shadow-[0px_6px_0px_0px_rgba(0,0,0,0.1)]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          <Button type="button" onClick={handleRegister} className="w-72 items-center ml-24 bg-green-400 text-white p-2 rounded">Register</Button>
        </form>
        <p className="mt-4 text-white ml-28">
          Already have an account? <a href="/login" className="text-green-500">Login</a>
        </p>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default RegisterPage;
