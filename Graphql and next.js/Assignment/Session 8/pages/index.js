import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  const cards = [
    {
      title: "Q1: Trending Movies (SSG)",
      route: "/trending-movies",
      method: "getStaticProps",
      tagColor: "#34d399",
      desc: "Fetches trending movies from a mock API at build time and renders poster images and titles.",
      icon: "🎬",
    },
    {
      title: "Q2: My Food Orders (SSR)",
      route: "/my-orders",
      method: "getServerSideProps",
      tagColor: "#f87171",
      desc: "Simulates Zomato/Swiggy food orders fetched dynamically on every single page request.",
      icon: "🍕",
    },
    {
      title: "Q3: Flipkart Products (SSG + Dynamic)",
      route: "/products/1",
      method: "getStaticPaths + getStaticProps",
      tagColor: "#38bdf8",
      desc: "Pre-generates 5 Flipkart product detail pages at build time from a local hardcoded array.",
      icon: "🛍️",
    },
    {
      title: "Q4: Latest Music Albums (GraphQL + SSG)",
      route: "/latest-albums",
      method: "GraphQL in getStaticProps",
      tagColor: "#a855f7",
      desc: "Runs a GraphQL query inside getStaticProps to display 5 latest Spotify albums.",
      icon: "🎵",
    },
    {
      title: "Q5: SSR vs SSG Diagram & Comparison",
      route: "/rendering-comparison",
      method: "Infographic Diagram",
      tagColor: "#fbbf24",
      desc: "Visual diagram comparing data fetching lifecycle, caching, and use cases.",
      icon: "📊",
    },
  ];

  return (
    <div style={containerStyle}>
      <Head>
        <title>Session 8 - Data Fetching in Next.js</title>
      </Head>

      <Navbar />

      <main style={mainStyle}>
        <div style={badgeStyle}>Session 8 Assignment Overview</div>
        <h1 style={titleStyle}>Data Fetching Strategies in Next.js</h1>
        <p style={subtitleStyle}>
          Practical implementations of <code>getStaticProps</code>, <code>getServerSideProps</code>, <code>getStaticPaths</code>, and <code>GraphQL</code>.
        </p>

        <div style={gridStyle}>
          {cards.map((c, i) => (
            <Link key={i} href={c.route} style={cardStyle}>
              <div style={cardHeaderStyle}>
                <span style={{ fontSize: "36px" }}>{c.icon}</span>
                <span style={methodBadgeStyle(c.tagColor)}>{c.method}</span>
              </div>
              <h3 style={cardTitleStyle}>{c.title}</h3>
              <p style={cardDescStyle}>{c.desc}</p>
              <div style={{ marginTop: "16px", color: "#38bdf8", fontSize: "14px", fontWeight: "600" }}>
                Open Demo &rarr;
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

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
  maxWidth: "1150px",
  width: "100%",
  margin: "0 auto",
  padding: "40px 20px",
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
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "2.5rem",
  margin: "0 0 10px 0",
  background: "linear-gradient(135deg, #a855f7, #38bdf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitleStyle = {
  fontSize: "1.05rem",
  color: "#94a3b8",
  marginBottom: "35px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  backgroundColor: "#1e293b",
  padding: "26px",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  textDecoration: "none",
  color: "inherit",
  transition: "all 0.25s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
};

const methodBadgeStyle = (color) => ({
  display: "inline-block",
  padding: "3px 10px",
  backgroundColor: `${color}18`,
  border: `1px solid ${color}`,
  color: color,
  borderRadius: "9999px",
  fontSize: "11px",
  fontWeight: "bold",
});

const cardTitleStyle = {
  fontSize: "1.3rem",
  margin: "0 0 8px 0",
  color: "#f8fafc",
};

const cardDescStyle = {
  fontSize: "0.92rem",
  color: "#94a3b8",
  lineHeight: "1.6",
  margin: 0,
};
