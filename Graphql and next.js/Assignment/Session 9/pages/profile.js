import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

// ==============================================================
// SESSION 9 - Task 4 & Task 5:
// Task 4: Profile page that checks session and redirects unauthenticated users to /login
// Task 5: Logout function that redirects the user to the homepage
// ==============================================================

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Task 4: Redirect unauthenticated user to login page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Task 5: Logout function generated via AI (GitHub Copilot / ChatGPT)
  // that signs out the user and redirects them directly to the homepage
  const handleLogout = async () => {
    // signOut from next-auth/react with redirect to "/"
    await signOut({ callbackUrl: "/" });
  };

  // Loading state while checking session
  if (status === "loading") {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={{ color: "#38bdf8" }}>⏳ Checking authentication status...</h2>
        </div>
      </div>
    );
  }

  // If not authenticated, the useEffect redirects to /login
  if (!session) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={{ color: "#f87171" }}>🔒 Access Denied</h2>
          <p style={{ color: "#94a3b8" }}>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Head>
        <title>User Profile - Session 9</title>
      </Head>

      <div style={cardStyle}>
        <div style={badgeStyle}>👤 Protected Profile View (Task 4)</div>

        <div style={avatarStyle}>
          {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h1 style={titleStyle}>{session.user?.name || "Authenticated User"}</h1>
        <p style={emailStyle}>📧 {session.user?.email}</p>

        <div style={infoBoxStyle}>
          <h3 style={{ fontSize: "14px", color: "#38bdf8", marginBottom: "8px" }}>Session Details:</h3>
          <p style={detailTextStyle}><strong>Auth Status:</strong> <span style={{ color: "#22c55e" }}>Authenticated ✔</span></p>
          <p style={detailTextStyle}><strong>User Name:</strong> {session.user?.name}</p>
          <p style={detailTextStyle}><strong>User Email:</strong> {session.user?.email}</p>
          <p style={detailTextStyle}><strong>Provider:</strong> Google OAuth / NextAuth</p>
        </div>

        {/* Secret API tester link */}
        <div style={{ margin: "20px 0" }}>
          <a
            href="/api/secret"
            target="_blank"
            rel="noreferrer"
            style={apiLinkStyle}
          >
            🔐 Test /api/secret Route (Task 3)
          </a>
        </div>

        {/* Task 5 Logout Button */}
        <div style={btnRowStyle}>
          <button onClick={handleLogout} style={logoutBtnStyle}>
            🚪 Sign Out & Go Home (Task 5)
          </button>
          <Link href="/" style={homeLinkStyle}>
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Styling
const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const cardStyle = {
  maxWidth: "540px",
  width: "100%",
  backgroundColor: "#1e293b",
  borderRadius: "16px",
  padding: "36px",
  textAlign: "center",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 12px",
  backgroundColor: "rgba(56, 189, 248, 0.2)",
  border: "1px solid #38bdf8",
  color: "#38bdf8",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const avatarStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#3b82f6",
  color: "#fff",
  fontSize: "36px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto 16px auto",
  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.5)",
};

const titleStyle = {
  fontSize: "1.8rem",
  margin: "0 0 6px 0",
};

const emailStyle = {
  color: "#94a3b8",
  fontSize: "1rem",
  margin: "0 0 20px 0",
};

const infoBoxStyle = {
  backgroundColor: "#0f172a",
  borderRadius: "10px",
  padding: "16px",
  textAlign: "left",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  marginBottom: "16px",
};

const detailTextStyle = {
  margin: "6px 0",
  fontSize: "14px",
  color: "#cbd5e1",
};

const apiLinkStyle = {
  display: "inline-block",
  padding: "8px 16px",
  backgroundColor: "rgba(34, 197, 94, 0.15)",
  border: "1px solid #22c55e",
  color: "#4ade80",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: "600",
};

const btnRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "16px",
};

const logoutBtnStyle = {
  padding: "12px 20px",
  backgroundColor: "#ef4444",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
  transition: "opacity 0.2s",
};

const homeLinkStyle = {
  padding: "10px",
  color: "#94a3b8",
  textDecoration: "none",
  fontSize: "14px",
};
