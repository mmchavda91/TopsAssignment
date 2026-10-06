import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

// ==============================================================
// SESSION 9 - Task 3: Protected API Route (/api/secret)
// Returns 401 Unauthorized if user is not authenticated
// Returns secret data if user is logged in
// ==============================================================

export default async function handler(req, res) {
  // Check the session using getServerSession
  const session = await getServerSession(req, res, authOptions);

  // If no session exists, return 401 Unauthorized
  if (!session) {
    return res.status(401).json({
      error: "401 Unauthorized",
      message: "Access Denied: You must be logged in to view this secret data.",
      authenticated: false,
    });
  }

  // If authenticated, return the protected secret data
  return res.status(200).json({
    status: 200,
    message: "Welcome to the Protected Secret Route! 🔐",
    authenticated: true,
    user: {
      name: session.user?.name,
      email: session.user?.email,
    },
    secretData: {
      confidentialCode: "TOP-SECRET-2026-NEXTJS-AUTH",
      serverTimestamp: new Date().toISOString(),
      authorizedRole: "Verified Google Member",
    },
  });
}
