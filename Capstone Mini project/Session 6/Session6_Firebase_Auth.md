# Session 6: Firebase Authentication & React Context API

**Capstone Mini Project — Assignment Solutions & Practical Guide (Q1 to Q5)**

---

## 📌 સત્ર સારાંશ (Session Overview)
આ Session માં આપણે **Firebase Authentication** અને **React Context API** નું સંપૂર્ણ integration શીખીશું:
1. **Firebase Auth Setup & Login Form**: Email અને Password વડે authentication implementation.
2. **React Context API**: Logged-in user નો global state store કરવો અને page ના ટોપ પર યુઝરનો ઈમેલ (`user.email`) display કરવો.
3. **Protected Routes & Spotify Dashboard**: માત્ર login થયેલા users જ Dashboard જોઈ શકે, અનઓથેન્ટિકેટેડ users ને Login page પર redirect કરવા.
4. **Session Persistence**: Browser refresh કરવા છતાં user logout ન થાય તે માટે Firebase Auth ની `browserLocalPersistence` અને `onAuthStateChanged` વાપરવી.
5. **ChatGPT Generated Logout Button**: ChatGPT પાસેથી React logout button બનાવડાવી Context state રીસેટ કરી user ને signOut કરવો.

---

## 📋 Table of Contents
- [Q1: Firebase Authentication & Login Form](#q1-firebase-authentication--login-form)
- [Q2: React Context API & Display User Email](#q2-react-context-api--display-user-email)
- [Q3: Spotify Protected Dashboard & Route Guard](#q3-spotify-protected-dashboard--route-guard)
- [Q4: Session Persistence on Browser Refresh](#q4-session-persistence-on-browser-refresh)
- [Q5: ChatGPT Generated Logout Button](#q5-chatgpt-generated-logout-button)
- [🌐 Browser માં કેવી રીતે Run કરવું (How to Run)](#-browser-માં-કેવી-રીતે-run-કરવું)

---

## Q1: Firebase Authentication & Login Form

### 🎯 પ્રશ્ન (Question):
> *Set up Firebase Authentication in a new React app and implement a simple login form that lets users sign in with their email and password.*

### 💡 Concept:
- **Firebase Auth Setup**: `getAuth(app)` વડે Auth instance initialize થાય છે.
- **`signInWithEmailAndPassword(auth, email, password)`**: આ method Firebase server પર credentials verify કરે છે અને successful login પર `UserCredential` object return કરે છે.

### 💻 Code Implementation (`Q1_LoginForm.jsx`):
```jsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log('Logged in user:', userCredential.user);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-card">
      <h2>Sign In with Firebase</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

---

## Q2: React Context API & Display User Email

### 🎯 પ્રશ્ન (Question):
> *Use React Context API to store the current user's login state and display the user's email at the top of the page when logged in.*

### 💡 Concept:
- **`createContext()`**: Global authentication context બનાવે છે જેથી prop drilling વગર કોઈપણ component માંથી user ની વિગતો મળી શકે.
- **Top Bar Email Display**: જ્યારે `currentUser` સત્ય (truthy) હોય ત્યારે navbar / header માં `currentUser.email` દર્શાવવામાં આવે છે.

### 💻 Code Implementation:

#### 1. Auth Context (`context/AuthContext.jsx`):
```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    const auth = getAuth();
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
```

#### 2. Navbar Header displaying Email (`Q2_NavbarUserHeader.jsx`):
```jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <header className="navbar">
      <div className="brand">🎧 Spotify Stream</div>
      <div className="user-info">
        {currentUser ? (
          <span>👤 Logged in as: <strong>{currentUser.email}</strong></span>
        ) : (
          <span>Guest (Please Login)</span>
        )}
      </div>
    </header>
  );
}
```

---

## Q3: Spotify Protected Dashboard & Route Guard

### 🎯 પ્રશ્ન (Question):
> *Build a Spotify-style user dashboard page that only appears after successful login, and redirect users back to the login page if they are not authenticated.*  
> *Hint: Use React Router for navigation and protect the dashboard route based on user state from Context.*

### 💡 Concept:
- **Route Guard / Protected Route**: `currentUser` null હોય તો વપરાશકર્તાને Dashboard જોવા દેવાને બદલે Login page તરફ redirect કરવામાં આવે છે.
- Dashboard માં Spotify-style Playlists, Recently Played Songs, અને Web Music Player દર્શાવાય છે.

### 💻 Code Implementation (`Q3_SpotifyDashboard.jsx`):
```jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function SpotifyDashboard({ onGoToLogin }) {
  const { currentUser } = useAuth();

  // Q3 Protected Route Check
  if (!currentUser) {
    return (
      <div className="access-denied">
        <h3>🔒 Access Restricted</h3>
        <p>You must sign in to view the Spotify Dashboard.</p>
        <button onClick={onGoToLogin}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="spotify-dashboard">
      <h2>Welcome back, {currentUser.displayName || currentUser.email}! 🎵</h2>
      <div className="playlists-grid">
        <div className="card">🎶 Bollywood Hits 2024</div>
        <div className="card">🌙 Late Night Lo-Fi Beats</div>
        <div className="card">⚡ Gym Workout Beast</div>
      </div>
    </div>
  );
}
```

---

## Q4: Session Persistence on Browser Refresh

### 🎯 પ્રશ્ન (Question):
> *Persist the user's login session using Firebase Auth so that refreshing the browser does not log out the user automatically.*

### 💡 Concept:
- Firebase Auth બાય ડિફોલ્ટ `browserLocalPersistence` નો ઉપયોગ કરે છે, જે session token ને બ્રાઉઝરના **IndexedDB / LocalStorage** માં સાચવે છે.
- જ્યારે page refresh (F5) થાય છે, ત્યારે `onAuthStateChanged(auth, callback)` background માં સાચવેલા token ને verify કરી context ના `currentUser` state ને પુનઃસ્થાપિત (restore) કરે છે.

### 💻 Code Implementation:
```javascript
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
// Explicitly ensure Local Persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Session persistence enabled: user stays logged in across refreshes.");
  });

// onAuthStateChanged automatically restores user on reload:
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Restored persistent session for:", user.email);
  }
});
```

---

## Q5: ChatGPT Generated Logout Button

### 🎯 પ્રશ્ન (Question):
> *Use ChatGPT to generate a logout button component that updates the Context state and signs out the user from Firebase Auth, then test and integrate it into your app.*  
> *Hint: Ask ChatGPT for a React logout button that works with Firebase Auth and Context API.*

### 1. ChatGPT ને પૂછાયેલો Prompt:
> **"Generate a React logout button component that updates the Context state and signs out the user from Firebase Auth."**

### 2. ChatGPT નો Generated કોડ (`Q5_ChatGPTLogoutButton.jsx`):
```jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function LogoutButton({ onLoggedOut }) {
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      // 1. Firebase Auth signOut()
      // 2. React Context state reset (currentUser -> null)
      await logout();
      if (onLoggedOut) onLoggedOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!currentUser) return null;

  return (
    <button onClick={handleLogout} className="btn-logout">
      🚪 Sign Out
    </button>
  );
}
```

---

## 🌐 Browser માં કેવી રીતે Run કરવું (How to Run)

તમે આ પ્રોજેક્ટને 2 રીતોથી ચલાવી શકો છો:

### રીત 1: ટર્મિનલ દ્વારા (`npm start`)
```powershell
cd "c:\Users\Mamta\OneDrive\TopsAssignment\Capstone Mini project\Session 6"
npm start
```
ટર્મિનલમાં દેખાશે:
`👉 http://localhost:3001`
અને તમારા બ્રાઉઝરમાં તે ખોલો.

### રીત 2: સીધું ડબલ-ક્લિક કરીને (Direct File Open)
`Session 6` ફોલ્ડરમાં રહેલી **`index.html`** અથવા **`preview.html`** ફાઇલ પર ડબલ-ક્લિક કરો. તે સીધી જ Google Chrome કે Edge માં ખૂલી જશે.
