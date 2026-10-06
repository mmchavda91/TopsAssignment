import Head from "next/head";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <div style={pageWrapperStyle}>
      <Head>
        <title>Contact Us - Session 7</title>
      </Head>

      {/* Navbar at top using Link from next/link */}
      <Navbar />

      <main style={containerStyle}>
        <div style={cardStyle}>
          <div style={badgeStyle}>Route: /contact</div>
          <h1 style={headingStyle}>📞 Get in Touch With Us!</h1>
          <p style={paragraphStyle}>
            Welcome to the <strong>Contact Page</strong>! Feel free to reach out to us. 
            Notice how clicking through the Navbar smoothly transitions without refreshing the browser!
          </p>

          <div style={infoBoxStyle}>
            <h3>Contact Details:</h3>
            <p style={{ margin: "6px 0" }}>📧 <strong>Email:</strong> support@nextapp.com</p>
            <p style={{ margin: "6px 0" }}>🌐 <strong>Website:</strong> www.nextapp.com</p>
            <p style={{ margin: "6px 0" }}>📍 <strong>Office:</strong> Ahmedabad, Gujarat</p>
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
  backgroundColor: "#f59e0b",
  color: "#fff",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const headingStyle = {
  fontSize: "2.3rem",
  margin: "0 0 15px 0",
  background: "linear-gradient(135deg, #f59e0b, #ef4444)",
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
  background: "rgba(245, 158, 11, 0.1)",
  border: "1px solid rgba(245, 158, 11, 0.3)",
  textAlign: "left",
};
