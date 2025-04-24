"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/db/UserDB.js";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await registerUser(name, email, password);
      setSuccess("User registered successfully.");
      setName("");
      setError("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      router.push("/");
    } catch (err) {
      setError(err.message || "An error occurred while registering.");
      setSuccess("");
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
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-purple-500/50 focus:outline-none text-white placeholder-white/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-4">
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

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-white/90 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-purple-500/50 focus:outline-none text-white placeholder-white/50"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-300 text-sm mb-4">{error}</p>}

          {/* Success Message */}
          {success && <p className="text-green-300 text-sm mb-4">{success}</p>}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-3 px-6 rounded-md hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-white/80 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
