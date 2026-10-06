import Head from "next/head";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div style={containerStyle}>
      <Head>
        <title>Session 7 - File-Based Routing</title>
      </Head>

      <main style={mainStyle}>
        <h1 style={headingStyle}>Session 7: Next.js File-Based Routing</h1>
        <p style={subheadingStyle}>
          Click below to navigate between different pages and confirm file-based routing:
        </p>

        <div style={gridStyle}>
          <Link href="/home" style={cardStyle}>
            <div style={badgeStyle("#3b82f6")}>/home</div>
            <h3>🏠 Home Page &rarr;</h3>
            <p>Heading: "Welcome to Home Page!"</p>
          </Link>

          <Link href="/explore" style={cardStyle}>
            <div style={badgeStyle("#10b981")}>/explore</div>
            <h3>🚀 Explore Page &rarr;</h3>
            <p>Heading: "Explore New Destinations & Features!"</p>
          </Link>

          <Link href="/contact" style={cardStyle}>
            <div style={badgeStyle("#f59e0b")}>/contact</div>
            <h3>📞 Contact Page &rarr;</h3>
            <p>Heading: "Get in Touch With Us!"</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  padding: "20px",
};

const mainStyle = {
  textAlign: "center",
  maxWidth: "800px",
  width: "100%",
};

const headingStyle = {
  fontSize: "2.5rem",
  marginBottom: "10px",
  background: "linear-gradient(135deg, #a855f7, #3b82f6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subheadingStyle = {
  fontSize: "1.1rem",
  color: "#94a3b8",
  marginBottom: "30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#1e293b",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.1)",
  textDecoration: "none",
  color: "inherit",
  textAlign: "left",
  transition: "transform 0.2s, border-color 0.2s",
};

const badgeStyle = (bgColor) => ({
  display: "inline-block",
  padding: "4px 10px",
  backgroundColor: bgColor,
  color: "#fff",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "12px",
});
