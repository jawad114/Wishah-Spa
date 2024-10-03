'use client'; 
import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "react-hot-toast";
const LoginPage: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login with", { email, password });
    toast.success("Login successful",
      {style:{
        backgroundColor:"#F05F97",
        border: "1px solid green",
        color: "green",
      },
      iconTheme: {
        primary: 'pinkCustom',
        secondary: 'green',
      },}
    );

    
    setTimeout(() => {
      router.push("/dashboard"); 
    }, 1000);

  };
  

  return (
    <div className="flex min-h-screen">
  
      <div className="flex-1 bg-cover bg-center " style={{ flex: '0 0 45%', backgroundImage: "url('/wishahmain.png')" }}>
        
      </div>

      {/* Right Column with Login Form (60% width) */}
      <div className="flex-1 flex bg-pinkCustom flex-col justify-center items-center p-6" style={{ flex: '0 0 55%' }}>
        <img src="/wishahLogo.png" alt="Logo" className="mb-16 h-40 w-48 ml-12 " /> {/* Logo */}
        <h2 className="text-5xl font-bold text-white text-center mb-4 ml-14">Welcome to SPA <br />CMS</h2> {/* Title */}
        <form className="w-full max-w-sm gap-20">
          <div className="mb-4">
        
            <input 
              type="email" 
              id="email" 
              className="border border-gray-300 p-2 bg-white rounded-lg w-full py-3   shadow-[0px_6px_0px_0px_rgba(0,0,0,0.1)]"
              value={email}
              style={{ width: '120%' }}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between">

           
            </div>
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

               
                <div className="flex items-center justify-around mt-2">
                <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2 bg-pinkCustom" />
                    <label htmlFor="remember" className="text-white" style={{ flex: '0 0 50%'}}>Remember Me</label>
                    <a href="#" className="text-sm text-white  ml-32" style={{ flex: '0 0 50%'}}>Forgot Password?</a>
                </div>
                
                </div>

          </div>
          <Button type="button" onClick={handleLogin} className="w-72 items-center ml-24 bg-green-400 text-white p-2 rounded">Login</Button>
        </form>
        <p className="mt-4 text-white ml-28">
          Not registered? <a href="/register" className="text-green-500">Register</a>
        </p>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default LoginPage;
