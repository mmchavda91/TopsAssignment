import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from '../firebase';

/**
 * Question 2 & Question 4:
 * React Context API to store the current user's login state,
 * display user email across components, and persist session across reloads.
 */
const AuthContext = createContext({
  currentUser: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children, authInstance = auth }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Question 4: Persist login session using Firebase Auth's onAuthStateChanged observer
  useEffect(() => {
    // onAuthStateChanged automatically restores session from browser storage (IndexedDB/localStorage)
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL || null
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authInstance]);

  // Login with Email & Password (Q1)
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    return userCredential.user;
  };

  // Sign up / Register
  const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    return userCredential.user;
  };

  // Logout (Q5)
  const logout = async () => {
    await signOut(authInstance);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
