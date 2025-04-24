"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { loginUser } from "@/db/UserDB.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await loginUser(email, password);

      // Navigate to home page
      router.push("/");
    } catch (err) {
      setError(err.message || "An error occurred while logging in.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white relative">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-10 w-1/4 h-1/4 bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-1/5 h-1/5 bg-teal-600/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Form container */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-xl w-full max-w-md p-8 border border-white/20 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-purple-500/50 focus:outline-none text-white placeholder-white/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-purple-500/50 focus:outline-none text-white placeholder-white/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-300 text-sm mb-4">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-3 px-6 rounded-md hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-white/80 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-purple-300 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
