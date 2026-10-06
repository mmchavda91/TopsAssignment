import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [demoName, setDemoName] = useState("Mamta Chavda");
  const [demoEmail, setDemoEmail] = useState("mamta.chavda@example.com");

  // If already logged in, redirect to profile
  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    signIn("demo-login", {
      name: demoName,
      email: demoEmail,
      callbackUrl: "/",
    });
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Login - NextAuth Google Provider</title>
      </Head>

      <div style={cardStyle}>
        <div style={badgeStyle}>NextAuth.js Authentication</div>
        <h1 style={titleStyle}>Sign In to Account</h1>
        <p style={subtitleStyle}>Choose your preferred login method below:</p>

        {/* 1. Google Provider Sign-in (Task 1 & 2) */}
        <button onClick={handleGoogleLogin} style={googleBtnStyle}>
          <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Continue with Google (Task 1 & 2)
        </button>

        <div style={dividerStyle}>
          <span style={dividerTextStyle}>OR QUICK DEMO LOGIN</span>
        </div>

        {/* 2. Instant Local Demo Login (Allows testing all flow without Google Cloud keys) */}
        <form onSubmit={handleDemoLogin} style={formStyle}>
          <div style={{ textAlign: "left", marginBottom: "12px" }}>
            <label style={labelStyle}>Full Name:</label>
            <input
              type="text"
              value={demoName}
              onChange={(e) => setDemoName(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "16px" }}>
            <label style={labelStyle}>Email Address:</label>
            <input
              type="email"
              value={demoEmail}
              onChange={(e) => setDemoEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <button type="submit" style={demoBtnStyle}>
            ⚡ Instant Sign In & View Home Details
          </button>
        </form>

        <div style={{ marginTop: "24px" }}>
          <Link href="/" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none" }}>
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
  maxWidth: "460px",
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
  backgroundColor: "rgba(59, 130, 246, 0.2)",
  border: "1px solid #3b82f6",
  color: "#60a5fa",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const titleStyle = {
  fontSize: "1.8rem",
  margin: "0 0 8px 0",
};

const subtitleStyle = {
  fontSize: "0.95rem",
  color: "#94a3b8",
  marginBottom: "24px",
};

const googleBtnStyle = {
  width: "100%",
  padding: "12px 18px",
  backgroundColor: "#ffffff",
  color: "#1e293b",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};

const dividerStyle = {
  margin: "24px 0 20px 0",
  position: "relative",
  borderTop: "1px solid rgba(255,255,255,0.1)",
};

const dividerTextStyle = {
  position: "absolute",
  top: "-10px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#1e293b",
  padding: "0 12px",
  fontSize: "11px",
  color: "#64748b",
  fontWeight: "bold",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  color: "#94a3b8",
  marginBottom: "4px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "#0f172a",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "14px",
  boxSizing: "border-box",
};

const demoBtnStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "14px",
  cursor: "pointer",
  marginTop: "8px",
};
