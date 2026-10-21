"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure, logout as reduxLogout } from "@/store/authSlice";

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  token?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Load persisted session on initial app boot
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("spotify_auth_user");
      if (savedUser) {
        const parsed: AuthUser = JSON.parse(savedUser);
        setUser(parsed);
        dispatch(loginSuccess(parsed));
      }
    } catch (e) {
      console.error("Failed to restore auth session from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const login = async (email: string, pass: string) => {
    setError(null);
    dispatch(loginStart());

    try {
      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address.");
      }
      if (pass.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      // Simulated network authentication latency
      await new Promise((res) => setTimeout(res, 500));

      const authData: AuthUser = {
        uid: "usr_" + Math.random().toString(36).substring(2, 9),
        email: email,
        displayName: email.split("@")[0].toUpperCase(),
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
        token: "jwt_token_" + Date.now(),
      };

      setUser(authData);
      localStorage.setItem("spotify_auth_user", JSON.stringify(authData));
      dispatch(loginSuccess(authData));
    } catch (err: any) {
      const message = err.message || "Failed to log in. Please check credentials.";
      setError(message);
      dispatch(loginFailure(message));
      throw err;
    }
  };

  const signup = async (email: string, pass: string) => {
    await login(email, pass);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("spotify_auth_user");
    dispatch(reduxLogout());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
