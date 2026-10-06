import Head from "next/head";
import Navbar from "../components/Navbar";

export default function ExplorePage() {
  return (
    <div style={pageWrapperStyle}>
      <Head>
        <title>Explore - Session 7</title>
      </Head>

      {/* Navbar at top using Link from next/link */}
      <Navbar />

      <main style={containerStyle}>
        <div style={cardStyle}>
          <div style={badgeStyle}>Route: /explore</div>
          <h1 style={headingStyle}>🚀 Explore New Destinations & Features!</h1>
          <p style={paragraphStyle}>
            Welcome to the <strong>Explore Page</strong>! Navigating across pages via the top navbar uses 
            Next.js client-side transitions powered by <code>&lt;Link /&gt;</code> without any page reload.
          </p>

          <div style={infoBoxStyle}>
            <h3>Key Takeaway:</h3>
            <p>Every file created inside <code>pages/</code> automatically creates a corresponding route in Next.js.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const pageWrapperStyle = {
  minHeight: "100vh",
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  display: "flex",
  flexDirection: "column",
};

const containerStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
};

const cardStyle = {
  maxWidth: "650px",
  width: "100%",
  textAlign: "center",
  background: "#1e293b",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 14px",
  backgroundColor: "#10b981",
  color: "#fff",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const headingStyle = {
  fontSize: "2.3rem",
  margin: "0 0 15px 0",
  background: "linear-gradient(135deg, #34d399, #38bdf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const paragraphStyle = {
  fontSize: "1.1rem",
  color: "#94a3b8",
  lineHeight: "1.7",
};

const infoBoxStyle = {
  marginTop: "24px",
  padding: "16px",
  borderRadius: "10px",
  background: "rgba(16, 185, 129, 0.1)",
  border: "1px solid rgba(16, 185, 129, 0.3)",
  textAlign: "left",
};
