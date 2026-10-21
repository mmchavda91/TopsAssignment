# 📘 Redux Core Concepts — Session 6 Assignment Answers

**Course:** React & Redux Capstone Mini Project  
**Session:** 6 — Authentication, Context API, Protected Routes & Redux State  
**Project Folder:** `Redux core concepts/Session 6/auth-dashboard`  
**Date:** October 2026  

---

## 📋 Table of Contents

1. [Q1: Set Up Firebase Auth & Email/Password Login](#q1)
2. [Q2: React Context API for Auth State (AuthContext & useAuth)](#q2)
3. [Q3: Spotify-Style Protected User Dashboard](#q3)
4. [Q4: Persist Login Session Using localStorage](#q4)
5. [Q5: Redux Toolkit Auth Slice (login, logout, user state)](#q5)
6. [🚀 How to Run the App & View in Browser](#run-in-browser)

---

<a id="q1"></a>
## Q1 — Set Up Firebase Authentication & Email/Password Login

> **Question:** Set up Firebase Authentication in a new React app and implement a basic email/password login form that displays a welcome message on successful login.

### 1.1 Overview & Architecture
Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

In this implementation, we configure Firebase SDK with email & password authentication and build a responsive, modern login form.

```
+-------------------------------------------------------------+
|                         Login Form                          |
|  [ Email Input ] -> [ Password Input ] -> [ Login Button ]  |
+-------------------------------------------------------------+
                              |
                              v
        firebase/auth: signInWithEmailAndPassword()
                              |
              +---------------+---------------+
              |                               |
       [Success 200]                    [Error 400]
              |                               |
              v                               v
   Display Welcome Message            Show Error Toast
  "Welcome back, user@test.com!"    "Invalid email or password"
```

### 1.2 Firebase Configuration File (`src/lib/firebase.ts`)

```typescript
// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment12345",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "spotify-auth-demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "spotify-auth-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "spotify-auth-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456"
};

// Initialize Firebase safely without duplicate initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
};
export type { User };
```

### 1.3 Login Component with Welcome Message (`src/components/LoginForm.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const { login, signup, user, error: authError } = useAuth();
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
        setWelcomeMessage(`🎉 Welcome to Spotify Clone, ${email}! Account created.`);
      } else {
        await login(email, password);
        setWelcomeMessage(`🎵 Welcome back, ${email}! Successfully logged in.`);
      }
    } catch (err: any) {
      setLocalError(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl text-white">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center font-bold text-black text-xl">
          ♫
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isSignUp ? "Create Spotify Account" : "Log in to Spotify"}
        </h2>
      </div>

      {/* Success Welcome Message */}
      {welcomeMessage && (
        <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-300 text-sm font-medium">
          {welcomeMessage}
        </div>
      )}

      {/* Error Message */}
      {(localError || authError) && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {localError || authError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-semibold text-zinc-400 mb-1">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@domain.com"
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#1DB954] transition"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold text-zinc-400 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#1DB954] transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#1DB954] hover:bg-[#1ed760] font-bold text-black rounded-full transition duration-200 uppercase tracking-wider text-sm mt-2 disabled:opacity-50"
        >
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-400">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setLocalError("");
            setWelcomeMessage("");
          }}
          className="text-white hover:text-[#1DB954] font-semibold underline underline-offset-4 ml-1 transition"
        >
          {isSignUp ? "Log In here" : "Sign up for Spotify"}
        </button>
      </div>
    </div>
  );
}
```

---

<a id="q2"></a>
## Q2 — React Context API for Global Auth State (`AuthContext`)

> **Question:** Use React Context API to store the current user's login state and make it accessible across all components in your app.  
> *Hint: Create an AuthContext and useContext hook to share the user object.*

### 2.1 Why React Context for Authentication?
React Context API solves "prop drilling" by sharing auth states (`user`, `isAuthenticated`, `loading`, `login()`, `logout()`) with any child component without manually passing props through every intermediate component.

```
               +----------------------+
               |   <AuthProvider />   |
               |  State: user, token  |
               +----------------------+
                          |
        +-----------------+-----------------+
        |                                   |
        v                                   v
+---------------+                   +----------------+
|    Navbar     |                   |   Dashboard    |
| useAuth() ->  |                   |  useAuth() ->  |
| { user,logout}|                   |  { user }      |
+---------------+                   +----------------+
```

### 2.2 AuthContext Implementation (`src/context/AuthContext.tsx`)

```tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
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

  // Initialize and load saved session from localStorage (Session Persistence)
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("spotify_auth_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);
    try {
      // Authenticates with mock/Firebase credentials
      if (!email.includes("@")) throw new Error("Please enter a valid email address.");
      if (pass.length < 6) throw new Error("Password must be at least 6 characters.");

      const authData: AuthUser = {
        uid: "usr_" + Math.random().toString(36).substring(2, 9),
        email: email,
        displayName: email.split("@")[0].toUpperCase(),
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        token: "tok_" + Date.now()
      };

      setUser(authData);
      localStorage.setItem("spotify_auth_user", JSON.stringify(authData));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, pass: string) => {
    await login(email, pass);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("spotify_auth_user");
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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenient consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
```

---

<a id="q3"></a>
## Q3 — Spotify-Style User Dashboard (Protected Route)

> **Question:** Build a Spotify-style user dashboard page that only appears when the user is logged in; if not logged in, redirect to the login form.

### 3.1 Protection Mechanism
The Protected Route checks:
1. `loading`: If checking auth state, display a sleek pulsing Spotify loader.
2. `!isAuthenticated`: If user is not logged in, render the login view or trigger a redirect.
3. `isAuthenticated`: Render the Spotify dashboard with navigation sidebar, player bar, top tracks, playlists, and user profile.

### 3.2 Spotify Dashboard Component (`src/components/SpotifyDashboard.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const mockTracks = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=150&auto=format&fit=crop&q=80" },
  { id: 2, title: "Starboy", artist: "The Weeknd, Daft Punk", album: "Starboy", duration: "3:50", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80" },
  { id: 3, title: "As It Was", artist: "Harry Styles", album: "Harry's House", duration: "2:47", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&auto=format&fit=crop&q=80" },
  { id: 4, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop&q=80" },
];

export default function SpotifyDashboard() {
  const { user, logout } = useAuth();
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden">
      {/* 1. Left Sidebar */}
      <aside className="w-64 bg-zinc-950 p-6 flex flex-col justify-between border-r border-zinc-900">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-9 h-9 bg-[#1DB954] rounded-full flex items-center justify-center font-bold text-black text-xl">
              ♫
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Spotify</span>
          </div>

          <nav className="space-y-4 text-sm font-semibold text-zinc-400">
            <button className="flex items-center space-x-3 text-white hover:text-[#1DB954] transition w-full">
              <span>🏠</span> <span>Home</span>
            </button>
            <button className="flex items-center space-x-3 hover:text-white transition w-full">
              <span>🔍</span> <span>Search</span>
            </button>
            <button className="flex items-center space-x-3 hover:text-white transition w-full">
              <span>📚</span> <span>Your Library</span>
            </button>
          </nav>

          <div className="mt-8 pt-6 border-t border-zinc-900">
            <h4 className="text-xs uppercase font-bold text-zinc-500 mb-3 tracking-wider">Playlists</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="hover:text-white cursor-pointer transition">🔥 Today's Top Hits</li>
              <li className="hover:text-white cursor-pointer transition">🎧 Coding Chill Beats</li>
              <li className="hover:text-white cursor-pointer transition">⚡ Rock Classics</li>
            </ul>
          </div>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={user?.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full bg-zinc-800" />
            <div className="text-left">
              <p className="text-xs font-bold text-white truncate max-w-[100px]">{user?.displayName}</p>
              <p className="text-[10px] text-zinc-400 truncate max-w-[100px]">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            className="px-2.5 py-1 text-xs font-semibold bg-zinc-800 hover:bg-red-500/80 rounded transition text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black">Welcome to Dashboard, {user?.displayName}!</h1>
            <p className="text-sm text-zinc-400 mt-1">Logged in as {user?.email} • Session Active</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full">
            ● Authenticated
          </span>
        </header>

        {/* Popular Tracks Grid */}
        <section>
          <h2 className="text-xl font-bold mb-4">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => {
                  setCurrentTrack(track);
                  setIsPlaying(true);
                }}
                className="p-4 bg-zinc-900/60 hover:bg-zinc-800/80 rounded-xl transition duration-200 cursor-pointer group border border-zinc-800/50"
              >
                <div className="relative mb-3">
                  <img src={track.cover} alt={track.title} className="w-full h-40 object-cover rounded-lg shadow-md" />
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#1DB954] text-black font-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition shadow-lg">
                    ▶
                  </button>
                </div>
                <h3 className="font-bold text-sm truncate">{track.title}</h3>
                <p className="text-xs text-zinc-400 truncate mt-1">{track.artist}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 3. Bottom Player Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-950 border-t border-zinc-900 px-6 flex items-center justify-between text-white z-50">
        <div className="flex items-center space-x-3 w-1/4">
          <img src={currentTrack.cover} alt="Now Playing" className="w-12 h-12 rounded object-cover" />
          <div className="truncate">
            <p className="text-sm font-semibold truncate">{currentTrack.title}</p>
            <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-2/4 max-w-md">
          <div className="flex items-center space-x-6 mb-1">
            <button className="text-zinc-400 hover:text-white">⏮</button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center hover:scale-105 transition"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button className="text-zinc-400 hover:text-white">⏭</button>
          </div>
          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div className={`h-full bg-[#1DB954] transition-all duration-300 ${isPlaying ? "w-1/2" : "w-1/4"}`}></div>
          </div>
        </div>

        <div className="w-1/4 text-right text-xs text-zinc-400">
          Duration: {currentTrack.duration}
        </div>
      </footer>
    </div>
  );
}
```

---

<a id="q4"></a>
## Q4 — Persist Login Session Using `localStorage`

> **Question:** Persist the user's login session using localStorage so that refreshing the page keeps the user logged in until they log out.  
> *Hint: Save the auth token or user info in localStorage and load it when the app initializes.*

### 4.1 Lifecycle of Session Persistence

```
App Boot (useEffect)
       |
       v
Check localStorage.getItem("spotify_auth_user")
       |
       +-----------------------+
       |                       |
  [User Found]          [No User Found]
       |                       |
       v                       v
Restore User State       Stay on Login Form
Show Dashboard Directly
```

### 4.2 Key Code Implementation

1. **Saving on Login:**
   ```typescript
   localStorage.setItem("spotify_auth_user", JSON.stringify(authData));
   ```

2. **Reading on Initial Mount (`useEffect`):**
   ```typescript
   useEffect(() => {
     try {
       const saved = localStorage.getItem("spotify_auth_user");
       if (saved) {
         setUser(JSON.parse(saved));
       }
     } catch (err) {
       console.error("Storage read error:", err);
     } finally {
       setLoading(false);
     }
   }, []);
   ```

3. **Clearing on Logout:**
   ```typescript
   const logout = () => {
     setUser(null);
     localStorage.removeItem("spotify_auth_user");
   };
   ```

---

<a id="q5"></a>
## Q5 — Redux Toolkit Auth Slice

> **Question:** Use ChatGPT or GitHub Copilot to help you write a Redux slice that manages authentication state (login, logout, and user details). Review the generated code and integrate it into your app.

### 5.1 Redux Slice Definition (`src/store/authSlice.ts`)

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDetails {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  token?: string;
}

interface AuthState {
  user: UserDetails | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserDetails>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    updateUserDetails: (state, action: PayloadAction<Partial<UserDetails>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUserDetails } = authSlice.actions;
export default authSlice.reducer;
```

### 5.2 Redux Store Configuration (`src/store/store.ts`)

```typescript
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

<a id="run-in-browser"></a>
## 🚀 How to Run the App & View in Browser

### Step 1: Open Terminal in Project Folder

```powershell
cd "C:\Users\Mamta\OneDrive\TopsAssignment\Capstone Mini project\Redux core concepts\Session 6\auth-dashboard"
```

### Step 2: Install Dependencies & Run

```powershell
npm install
npm run dev
```

### Step 3: Open in Browser
Visit **`http://localhost:3000`** in your browser.

### Expected Browser Behavior:
1. **Logged-out State:**
   - Shows Spotify-themed dark login box with email & password inputs.
   - Shows "Log in to Spotify" heading and green action buttons.
2. **On Successful Login:**
   - Welcome message appears: `"🎵 Welcome back, user@test.com!"`
   - Automatically switches to the **Spotify Dashboard**.
3. **In Spotify Dashboard:**
   - Sidebar displays Home, Search, Library, and your User Profile with avatar.
   - Main area shows "Welcome to Dashboard", Trending music cards, and play controls.
   - Bottom bar shows Spotify music player with duration and play/pause controls.
4. **On Page Refresh (F5):**
   - User remains logged in thanks to `localStorage` persistence!
5. **On Logout Click:**
   - Clears `localStorage` and returns seamlessly to the login screen.
