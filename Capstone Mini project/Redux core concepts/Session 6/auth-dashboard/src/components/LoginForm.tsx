"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function LoginForm() {
  const { login, signup, error: authError } = useAuth();
  const reduxState = useSelector((state: RootState) => state.auth);

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setWelcomeMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password);
        setWelcomeMessage(`🎉 Welcome to Spotify, ${email}! Account created successfully.`);
      } else {
        await login(email, password);
        setWelcomeMessage(`🎵 Welcome back, ${email}! Login successful.`);
      }
    } catch (err: any) {
      setLocalError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("spotify.fan@gmail.com");
    setPassword("password123");
  };

  return (
    <div className="w-full max-w-md p-8 bg-zinc-900/90 backdrop-blur border border-zinc-800 rounded-3xl shadow-2xl text-white">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="w-14 h-14 bg-[#1DB954] text-black rounded-full flex items-center justify-center font-black text-2xl shadow-lg mb-3 shadow-[#1DB954]/20">
          ♫
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          {isSignUp ? "Sign Up for Spotify" : "Log In to Spotify"}
        </h2>
        <p className="text-zinc-400 text-xs mt-1">
          Session 6 Capstone • Firebase + Context API + Redux
        </p>
      </div>

      {/* Demo Credentials Helper */}
      <div className="mb-5 p-3 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-xs flex items-center justify-between">
        <span className="text-zinc-300">Quick Demo Credentials</span>
        <button
          type="button"
          onClick={handleDemoFill}
          className="text-[#1DB954] hover:text-[#1ed760] font-semibold underline underline-offset-2"
        >
          Auto Fill
        </button>
      </div>

      {/* Welcome Message banner */}
      {welcomeMessage && (
        <div className="mb-4 p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-emerald-300 text-sm font-medium animate-pulse">
          {welcomeMessage}
        </div>
      )}

      {/* Error Message */}
      {(localError || authError || reduxState.error) && (
        <div className="mb-4 p-3 bg-red-500/15 border border-red-500/40 rounded-xl text-red-300 text-sm">
          {localError || authError || reduxState.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-bold text-zinc-400 mb-1 tracking-wider">
            Email or username
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="e.g. user@spotify.com"
            className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-bold text-zinc-400 mb-1 tracking-wider">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Minimum 6 characters"
            className="w-full px-4 py-3 bg-zinc-800/80 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading || reduxState.isLoading}
          className="w-full py-3.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold rounded-full transition duration-200 tracking-wider text-sm mt-3 shadow-lg shadow-[#1DB954]/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {loading || reduxState.isLoading
            ? "Authenticating..."
            : isSignUp
            ? "Create Account"
            : "Log In"}
        </button>
      </form>

      {/* Switch between login & signup */}
      <div className="mt-6 text-center text-xs text-zinc-400 pt-4 border-t border-zinc-800">
        {isSignUp ? "Already registered?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setLocalError("");
            setWelcomeMessage("");
          }}
          className="text-white hover:text-[#1DB954] font-bold underline underline-offset-4 ml-1 transition"
        >
          {isSignUp ? "Log in instead" : "Sign up free"}
        </button>
      </div>
    </div>
  );
}
