import Head from "next/head";
import Navbar from "../components/Navbar";

// ==============================================================
// QUESTION 5: rendering-comparison.js
// Diagram comparing SSR (getServerSideProps) vs SSG (getStaticProps)
// Shows when data is fetched, how users get the page, and use cases
// ==============================================================

export default function RenderingComparison() {
  return (
    <div style={containerStyle}>
      <Head>
        <title>SSR vs SSG Comparison - Next.js</title>
      </Head>

      <Navbar />

      <main style={mainStyle}>
        <div style={badgeStyle}>📊 Architecture & Rendering Strategy</div>
        <h1 style={titleStyle}>SSR vs SSG in Next.js</h1>
        <p style={subtitleStyle}>
          Comparing <strong>Server-Side Rendering (getServerSideProps)</strong> vs <strong>Static Site Generation (getStaticProps)</strong>.
        </p>

        {/* Infographic Diagram Display */}
        <div style={diagramWrapperStyle}>
          <img
            src="/ssr_vs_ssg_diagram.jpg"
            alt="Next.js SSR vs SSG Comparison Diagram"
            style={diagramImageStyle}
          />
        </div>

        {/* Explanation Card as requested in Q5 */}
        <div style={explanationCardStyle}>
          <h2 style={{ fontSize: "1.4rem", color: "#38bdf8", marginTop: 0 }}>
            📝 Key Differences Explained (In Plain Words):
          </h2>
          <p style={explanationTextStyle}>
            1. <strong>When Data is Fetched:</strong> In <strong>SSG (getStaticProps)</strong>, data is fetched once at <em>build time</em>, producing pre-rendered static HTML that gets cached on CDNs for lightning-fast delivery. In <strong>SSR (getServerSideProps)</strong>, data is fetched dynamically on the server on <em>every single incoming user request</em>.
          </p>
          <p style={explanationTextStyle}>
            2. <strong>How Users Get the Page:</strong> With SSG, users receive pre-built static HTML directly from the nearest CDN Edge in milliseconds (~20ms). With SSR, the server must first execute your database queries and generate fresh HTML before sending the response back.
          </p>
          <p style={explanationTextStyle}>
            3. <strong>Example Use Cases:</strong> Use <strong>SSG</strong> for content that stays mostly identical for all users (e.g. <em>Trending Movies, Blog posts, Product Catalog</em>). Use <strong>SSR</strong> for private or frequently changing real-time data (e.g. <em>Zomato Live Food Orders, Personalized User Feeds, Checkout screens</em>).
          </p>
        </div>

        {/* Comparison Table */}
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr style={tableHeaderRowStyle}>
                <th style={thStyle}>Feature</th>
                <th style={{ ...thStyle, color: "#34d399" }}>SSG (getStaticProps)</th>
                <th style={{ ...thStyle, color: "#f87171" }}>SSR (getServerSideProps)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={tableRowStyle}>
                <td style={tdStyle}><strong>Execution Timing</strong></td>
                <td style={tdStyle}>At Build Time (`next build`)</td>
                <td style={tdStyle}>At Request Time (on every page visit)</td>
              </tr>
              <tr style={tableRowStyle}>
                <td style={tdStyle}><strong>Speed / TTFB</strong></td>
                <td style={tdStyle}>Instant (~20-50ms) via Global CDN</td>
                <td style={tdStyle}>Depends on server computation & DB speed</td>
              </tr>
              <tr style={tableRowStyle}>
                <td style={tdStyle}><strong>Server Load</strong></td>
                <td style={tdStyle}>Zero server load (Static CDN hosting)</td>
                <td style={tdStyle}>Continuous server CPU & memory load</td>
              </tr>
              <tr style={tableRowStyle}>
                <td style={tdStyle}><strong>Best For</strong></td>
                <td style={tdStyle}>Public content, blogs, movie catalogs</td>
                <td style={tdStyle}>Personalized dashboards, cart & live orders</td>
              </tr>
            </tbody>
          </table>
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
  flexDirection: "column",
};

const mainStyle = {
  flex: 1,
  maxWidth: "1050px",
  width: "100%",
  margin: "0 auto",
  padding: "40px 20px",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 14px",
  backgroundColor: "rgba(168, 85, 247, 0.2)",
  border: "1px solid #a855f7",
  color: "#c084fc",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "2.4rem",
  margin: "0 0 10px 0",
  background: "linear-gradient(135deg, #a855f7, #38bdf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitleStyle = {
  fontSize: "1rem",
  color: "#94a3b8",
  marginBottom: "30px",
};

const diagramWrapperStyle = {
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
  marginBottom: "35px",
};

const diagramImageStyle = {
  width: "100%",
  height: "auto",
  display: "block",
};

const explanationCardStyle = {
  backgroundColor: "#1e293b",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "14px",
  padding: "26px",
  marginBottom: "30px",
};

const explanationTextStyle = {
  fontSize: "1rem",
  lineHeight: "1.75",
  color: "#cbd5e1",
  margin: "12px 0",
};

const tableWrapperStyle = {
  overflowX: "auto",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#1e293b",
  textAlign: "left",
};

const tableHeaderRowStyle = {
  backgroundColor: "#0f172a",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const thStyle = {
  padding: "14px 18px",
  fontSize: "13px",
  fontWeight: "bold",
  letterSpacing: "0.5px",
};

const tableRowStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.05)",
};

const tdStyle = {
  padding: "14px 18px",
  fontSize: "14px",
  color: "#cbd5e1",
};
