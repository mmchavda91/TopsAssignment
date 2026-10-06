# Session 9 Assignment: Next.js Authentication with NextAuth.js

**Student:** Mamta Chavda  
**Topic:** Authentication with NextAuth.js, Google Provider, Environment Variables, Protected Routes, Profile Page, and SignOut

---

## 1. Task 1: Next.js App with NextAuth.js & Google Provider
- Installed `next-auth` library.
- Configured Google Provider inside `/pages/api/auth/[...nextauth].js`.
- Wrapped application with `<SessionProvider>` inside `/pages/_app.js`.
- **Homepage (`pages/index.js`):** Displays the logged-in user's **Name** and **Email** automatically once authenticated:
  ```jsx
  const { data: session } = useSession();
  {session && (
    <div>
      <h2>Welcome, {session.user?.name}!</h2>
      <p>Email: {session.user?.email}</p>
    </div>
  )}
  ```

---

## 2. Task 2: Environment Variables (`.env.local`)
Created `.env.local` to store sensitive credentials securely instead of hardcoding:
```env
NEXTAUTH_SECRET=supersecretnextauthkey2026session9demo
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=108239847291-exampleclientid12345.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-examplegooglesecret67890abcdef
```

Used inside `/pages/api/auth/[...nextauth].js`:
```javascript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})
```

---

## 3. Task 3: Protected API Route (`/api/secret`)
Protected the `/api/secret` endpoint so unauthenticated users receive a **401 Unauthorized** response:

```javascript
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      error: "401 Unauthorized",
      message: "Access Denied: You must be logged in to view this secret data.",
      authenticated: false,
    });
  }

  return res.status(200).json({
    message: "Welcome to the Protected Secret Route! 🔐",
    authenticated: true,
    user: session.user,
  });
}
```

---

## 4. Task 4: Protected Profile Page (`pages/profile.js`)
- Uses `useSession()` from `next-auth/react` to check authentication.
- If the user is unauthenticated, automatically redirects them to `/login` using `useRouter`:

```javascript
const { data: session, status } = useSession();
const router = useRouter();

useEffect(() => {
  if (status === "unauthenticated") {
    router.push("/login");
  }
}, [status, router]);
```

---

## 5. Task 5: AI-Generated Logout Function
* **AI Tool Used:** **GitHub Copilot / ChatGPT**
* **Prompt Given:** *"Write a Next.js function using next-auth/react that logs out the user and redirects them back to the homepage."*

* **Generated & Integrated Code:**
```javascript
import { signOut } from "next-auth/react";

const handleLogout = async () => {
  // Signs out the active user session and redirects to the homepage ("/")
  await signOut({ callbackUrl: "/" });
};
```
