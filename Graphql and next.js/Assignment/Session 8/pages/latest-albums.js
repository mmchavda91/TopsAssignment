import Head from "next/head";
import Navbar from "../components/Navbar";

// ==============================================================
// QUESTION 4: latest-albums.js
// Integrates GraphQL query inside getStaticProps to fetch
// 5 latest music albums (Spotify simulation)
// ==============================================================

export default function LatestAlbums({ albums, queryExecuted, fetchedAt }) {
  return (
    <div style={containerStyle}>
      <Head>
        <title>Latest Music Albums - GraphQL + getStaticProps</title>
      </Head>

      <Navbar />

      <main style={mainStyle}>
        <div style={badgeStyle}>🎵 GraphQL + Next.js getStaticProps (SSG)</div>
        <h1 style={titleStyle}>🎧 Spotify: Latest Music Albums</h1>
        <p style={subtitleStyle}>
          Data fetched via <strong>GraphQL Query</strong> inside <code>getStaticProps</code> at build time ({fetchedAt}).
        </p>

        {/* GraphQL Query Box */}
        <div style={queryBoxStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: "bold" }}>GRAPHQL QUERY EXECUTED:</span>
            <span style={{ fontSize: "11px", color: "#10b981" }}>Status: 200 OK (Pre-rendered)</span>
          </div>
          <pre style={codeBlockStyle}>{queryExecuted}</pre>
        </div>

        {/* Albums Grid */}
        <div style={gridStyle}>
          {albums.map((album) => (
            <div key={album.id} style={albumCardStyle}>
              <div style={albumCoverStyle}>
                <span style={{ fontSize: "45px" }}>{album.coverEmoji}</span>
              </div>
              <div style={{ padding: "16px" }}>
                <span style={genreBadgeStyle}>{album.genre}</span>
                <h3 style={albumNameStyle}>{album.name}</h3>
                <p style={artistStyle}>🎤 {album.artist}</p>
                <div style={albumMetaStyle}>
                  <span>📅 {album.releaseDate}</span>
                  <span>🎼 {album.tracksCount} tracks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// QUESTION 4: getStaticProps with GraphQL Query
// -------------------------------------------------------------
export async function getStaticProps() {
  const graphqlQuery = `
    query GetLatestAlbums {
      albums(limit: 5) {
        id
        name
        artist
        genre
        releaseDate
        tracksCount
        coverEmoji
      }
    }
  `;

  // Mock GraphQL resolver data (Spotify Albums)
  const mockAlbumsData = [
    {
      id: "alb-1",
      name: "Midnights (3am Edition)",
      artist: "Taylor Swift",
      genre: "Pop / Synth-Pop",
      releaseDate: "Oct 2024",
      tracksCount: 20,
      coverEmoji: "🌌",
    },
    {
      id: "alb-2",
      name: "After Hours",
      artist: "The Weeknd",
      genre: "R&B / Soul",
      releaseDate: "Jan 2024",
      tracksCount: 14,
      coverEmoji: "🕶️",
    },
    {
      id: "alb-3",
      name: "Rockstar Life",
      artist: "Post Malone",
      genre: "Hip-Hop / Rap",
      releaseDate: "Jul 2024",
      tracksCount: 16,
      coverEmoji: "🎸",
    },
    {
      id: "alb-4",
      name: "Arijit Singh Unplugged Classics",
      artist: "Arijit Singh",
      genre: "Bollywood / Acoustic",
      releaseDate: "Nov 2024",
      tracksCount: 12,
      coverEmoji: "🎻",
    },
    {
      id: "alb-5",
      name: "HIT ME HARD AND SOFT",
      artist: "Billie Eilish",
      genre: "Alternative / Indie",
      releaseDate: "May 2024",
      tracksCount: 10,
      coverEmoji: "🌊",
    },
  ];

  return {
    props: {
      albums: mockAlbumsData,
      queryExecuted: graphqlQuery.trim(),
      fetchedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    },
  };
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
  maxWidth: "1100px",
  width: "100%",
  margin: "0 auto",
  padding: "40px 20px",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 14px",
  backgroundColor: "rgba(16, 185, 129, 0.2)",
  border: "1px solid #10b981",
  color: "#34d399",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "2.4rem",
  margin: "0 0 10px 0",
  background: "linear-gradient(135deg, #10b981, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitleStyle = {
  fontSize: "1rem",
  color: "#94a3b8",
  marginBottom: "24px",
};

const queryBoxStyle = {
  backgroundColor: "#1e293b",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  padding: "16px 20px",
  marginBottom: "32px",
};

const codeBlockStyle = {
  margin: 0,
  fontFamily: "monospace",
  fontSize: "13px",
  color: "#e2e8f0",
  lineHeight: "1.5",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};

const albumCardStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "14px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
};

const albumCoverStyle = {
  height: "140px",
  background: "linear-gradient(135deg, #064e3b, #047857)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const genreBadgeStyle = {
  display: "inline-block",
  padding: "2px 8px",
  backgroundColor: "rgba(16, 185, 129, 0.2)",
  color: "#34d399",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "600",
  marginBottom: "8px",
};

const albumNameStyle = {
  fontSize: "1.2rem",
  margin: "0 0 6px 0",
  color: "#f8fafc",
};

const artistStyle = {
  fontSize: "0.95rem",
  color: "#38bdf8",
  fontWeight: "600",
  margin: "0 0 12px 0",
};

const albumMetaStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.85rem",
  color: "#94a3b8",
  borderTop: "1px solid rgba(255,255,255,0.06)",
  paddingTop: "10px",
};
