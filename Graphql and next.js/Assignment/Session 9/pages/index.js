import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

// ==============================================================
// SESSION 9 - Task 1, 2, 4, 5 on Homepage
// Task 1: After logging in, displays user's name and email
// Task 5: Logout function and redirect to homepage
// ==============================================================

export default function Home() {
  const { data: session, status } = useSession();

  // Task 5: AI-generated logout function
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Home - NextAuth Authentication</title>
      </Head>

      <main style={mainStyle}>
        <div style={badgeStyle}>Session 9: NextAuth.js + Google Provider</div>
        <h1 style={titleStyle}>Next.js Authentication Portal</h1>

        {/* Task 1: Check authentication status */}
        {status === "loading" ? (
          <div style={cardStyle}>
            <p style={{ color: "#38bdf8" }}>⏳ Loading session details...</p>
          </div>
        ) : session ? (
          /* When Logged In: Task 1 displays user's name and email */
          <div style={cardStyle}>
            <div style={statusBadgeStyle("#22c55e")}>● Logged In (Authenticated)</div>

            <div style={avatarStyle}>
              {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <h2 style={userNameHeadingStyle}>
              Welcome back, <span style={{ color: "#38bdf8" }}>{session.user?.name}</span>! 🎉
            </h2>

            <div style={userInfoBoxStyle}>
              <p style={detailTextStyle}>
                👤 <strong>User Name:</strong> {session.user?.name}
              </p>
              <p style={detailTextStyle}>
                📧 <strong>User Email:</strong> {session.user?.email}
              </p>
              <p style={detailTextStyle}>
                🔐 <strong>Auth Provider:</strong> Google OAuth / NextAuth.js
              </p>
            </div>

            <div style={btnGridStyle}>
              <Link href="/profile" style={profileBtnStyle}>
                👤 View Profile Page (Task 4)
              </Link>
              <a
                href="/api/secret"
                target="_blank"
                rel="noreferrer"
                style={secretBtnStyle}
              >
                🔐 Access /api/secret (Task 3)
              </a>
              <button onClick={handleLogout} style={logoutBtnStyle}>
                🚪 Sign Out & Logout (Task 5)
              </button>
            </div>
          </div>
        ) : (
          /* When NOT Logged In: Shows Login Prompt */
          <div style={cardStyle}>
            <div style={statusBadgeStyle("#f59e0b")}>● Not Authenticated</div>
            <h2 style={{ fontSize: "1.5rem", margin: "14px 0", color: "#f8fafc" }}>
              You are currently signed out
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: "1.6", marginBottom: "24px" }}>
              Sign in with your Google Account or Demo Login to display your name, email, access your profile, and unlock protected API endpoints.
            </p>

            <div style={btnGridStyle}>
              <Link href="/login" style={loginBtnStyle}>
                🚀 Go to Login Page (Task 1 & 2)
              </Link>
              <Link href="/profile" style={profileBtnStyle}>
                🔒 Test Profile Page Protection (Task 4)
              </Link>
              <a
                href="/api/secret"
                target="_blank"
                rel="noreferrer"
                style={secretBtnStyle}
              >
                🔒 Test /api/secret without Auth (401 Demo)
              </a>
            </div>
          </div>
        )}

        {/* Overview of Tasks 1 to 5 */}
        <div style={overviewCardStyle}>
          <h3 style={{ fontSize: "16px", color: "#38bdf8", marginBottom: "12px" }}>
            Session 9 Implementation Overview:
          </h3>
          <ul style={{ paddingLeft: "20px", color: "#cbd5e1", lineHeight: "1.8", margin: 0, fontSize: "14px" }}>
            <li><strong>Task 1:</strong> Displays user's name & email on homepage when session exists.</li>
            <li><strong>Task 2:</strong> <code>.env.local</code> stores <code>GOOGLE_CLIENT_ID</code> & <code>GOOGLE_CLIENT_SECRET</code>.</li>
            <li><strong>Task 3:</strong> <code>/api/secret</code> returns <strong>401 Unauthorized</strong> if unauthenticated.</li>
            <li><strong>Task 4:</strong> <code>/profile</code> page checks session using <code>useSession()</code> and redirects to <code>/login</code> if logged out.</li>
            <li><strong>Task 5:</strong> AI-generated <code>signOut({"{"} callbackUrl: "/" {"}"})</code> function logs user out and redirects to home.</li>
          </ul>
        </div>
      </main>
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
  padding: "30px 20px",
};

const mainStyle = {
  maxWidth: "750px",
  width: "100%",
  textAlign: "center",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 14px",
  backgroundColor: "rgba(59, 130, 246, 0.2)",
  border: "1px solid #3b82f6",
  color: "#60a5fa",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "14px",
};

const titleStyle = {
  fontSize: "2.4rem",
  margin: "0 0 24px 0",
  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const cardStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "16px",
  padding: "36px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.35)",
  marginBottom: "24px",
};

const statusBadgeStyle = (color) => ({
  display: "inline-block",
  padding: "4px 12px",
  backgroundColor: `${color}20`,
  border: `1px solid ${color}`,
  color: color,
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "16px",
});

const avatarStyle = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  backgroundColor: "#3b82f6",
  color: "#fff",
  fontSize: "30px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto 16px auto",
  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.5)",
};

const userNameHeadingStyle = {
  fontSize: "1.8rem",
  margin: "0 0 16px 0",
};

const userInfoBoxStyle = {
  backgroundColor: "#0f172a",
  borderRadius: "10px",
  padding: "16px",
  textAlign: "left",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  marginBottom: "24px",
};

const detailTextStyle = {
  margin: "8px 0",
  fontSize: "14px",
  color: "#cbd5e1",
};

const btnGridStyle = {
  display: "flex",
  gap: "12px",
  justifyContent: "center",
  flexWrap: "wrap",
};

const loginBtnStyle = {
  padding: "12px 24px",
  backgroundColor: "#3b82f6",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "14px",
};

const profileBtnStyle = {
  padding: "12px 20px",
  backgroundColor: "#334155",
  color: "#f8fafc",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "14px",
};

const secretBtnStyle = {
  padding: "12px 20px",
  backgroundColor: "rgba(34, 197, 94, 0.15)",
  border: "1px solid #22c55e",
  color: "#4ade80",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "14px",
};

const logoutBtnStyle = {
  padding: "12px 20px",
  backgroundColor: "#ef4444",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  fontWeight: "bold",
  fontSize: "14px",
  cursor: "pointer",
};

const overviewCardStyle = {
  backgroundColor: "rgba(30, 41, 59, 0.6)",
  borderRadius: "12px",
  padding: "20px",
  textAlign: "left",
  border: "1px solid rgba(255, 255, 255, 0.06)",
};
