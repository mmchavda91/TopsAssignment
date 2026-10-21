"use client";

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import SpotifyDashboard from "@/components/SpotifyDashboard";

function AppContent() {
  const { user, isAuthenticated, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show Spotify pulsing loader until client mount & auth check complete
  if (!mounted || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="w-16 h-16 bg-[#1DB954] text-black font-black rounded-full flex items-center justify-center text-3xl animate-bounce shadow-2xl shadow-[#1DB954]/50 mb-4">
          ♫
        </div>
        <p className="text-sm font-semibold tracking-wider text-zinc-400 animate-pulse">
          Connecting to Spotify Session...
        </p>
      </div>
    );
  }

  // Question 3: Protected Route Logic
  // Authenticated user -> Spotify Dashboard
  // Unauthenticated user -> Login Form
  return isAuthenticated && user ? (
    <SpotifyDashboard />
  ) : (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-950 to-emerald-950/40 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
}
