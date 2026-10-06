import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// ==============================================================
// SESSION 9 - Tasks 1 & 2: NextAuth.js Configuration
// Uses process.env.GOOGLE_CLIENT_ID and process.env.GOOGLE_CLIENT_SECRET
// Plus a Demo Credentials provider for instant local testing!
// ==============================================================

export const authOptions = {
  providers: [
    // 1. Google Provider configured using environment variables (Task 1 & 2)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // 2. Demo Credentials Provider so user can also test instant 1-click login without live Google API keys
    CredentialsProvider({
      id: "demo-login",
      name: "Demo Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mamta@example.com" },
        name: { label: "Full Name", type: "text", placeholder: "Mamta Chavda" },
      },
      async authorize(credentials) {
        if (credentials?.email) {
          return {
            id: "user-101",
            name: credentials.name || "Mamta Chavda",
            email: credentials.email,
            image: "https://lh3.googleusercontent.com/a/default-user",
          };
        }
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_mode",

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
