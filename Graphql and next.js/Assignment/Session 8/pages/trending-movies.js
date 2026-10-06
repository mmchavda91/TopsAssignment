import Head from "next/head";
import Navbar from "../components/Navbar";

// ==============================================================
// QUESTION 1: trending-movies.js
// Fetches trending movies from a mock API using getStaticProps
// Displays titles and poster images at build time
// ==============================================================

export default function TrendingMovies({ movies, buildTime }) {
  return (
    <div style={containerStyle}>
      <Head>
        <title>Trending Movies - SSG (getStaticProps)</title>
      </Head>

      <Navbar />

      <main style={mainStyle}>
        <div style={badgeStyle}>⚡ Static Site Generation (getStaticProps)</div>
        <h1 style={titleStyle}>🎬 Trending Movies Today</h1>
        <p style={subtitleStyle}>
          Pre-rendered at build time on <strong>{buildTime}</strong>. HTML is generated once and served instantly from CDN!
        </p>

        <div style={gridStyle}>
          {movies.map((movie) => (
            <div key={movie.id} style={cardStyle}>
              <div style={posterStyle}>
                <span style={{ fontSize: "50px" }}>{movie.emoji}</span>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={genreBadgeStyle}>{movie.genre}</div>
                <h3 style={movieTitleStyle}>{movie.title}</h3>
                <p style={metaStyle}>⭐ {movie.rating} • {movie.releaseYear}</p>
                <p style={descStyle}>{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// getStaticProps: Fetches movie data at build time
// -------------------------------------------------------------
export async function getStaticProps() {
  // Mock API data simulating TMDB / IMDb trending movies endpoint
  const mockMoviesApi = [
    {
      id: 1,
      title: "Interstellar: Beyond Time",
      genre: "Sci-Fi / Adventure",
      rating: "8.7 / 10",
      releaseYear: "2024",
      emoji: "🚀",
      overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      id: 2,
      title: "Inception: The Dream",
      genre: "Action / Sci-Fi",
      rating: "8.8 / 10",
      releaseYear: "2023",
      emoji: "🌀",
      overview: "A thief who steals corporate secrets through dream-sharing technology is given an inverse task of planting an idea.",
    },
    {
      id: 3,
      title: "The Dark Knight Returns",
      genre: "Action / Crime",
      rating: "9.0 / 10",
      releaseYear: "2024",
      emoji: "🦇",
      overview: "Batman faces his greatest psychological and physical test against the anarchist known as the Joker.",
    },
    {
      id: 4,
      title: "Avatar: The Way of Water",
      genre: "Action / Fantasy",
      rating: "7.9 / 10",
      releaseYear: "2023",
      emoji: "🌊",
      overview: "Jake Sully lives with his newfound family on the extrasolar moon Pandora, defending their home against ancient threats.",
    },
    {
      id: 5,
      title: "Spider-Man: Across the Multiverse",
      genre: "Animation / Action",
      rating: "8.9 / 10",
      releaseYear: "2024",
      emoji: "🕷️",
      overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
    },
    {
      id: 6,
      title: "Oppenheimer",
      genre: "Biography / Drama",
      rating: "8.9 / 10",
      releaseYear: "2023",
      emoji: "⚛️",
      overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    },
  ];

  return {
    props: {
      movies: mockMoviesApi,
      buildTime: new Date().toLocaleTimeString(),
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
  padding: "4px 12px",
  backgroundColor: "rgba(59, 130, 246, 0.2)",
  border: "1px solid #3b82f6",
  color: "#60a5fa",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "2.4rem",
  margin: "0 0 10px 0",
  background: "linear-gradient(135deg, #f43f5e, #fb923c)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitleStyle = {
  fontSize: "1rem",
  color: "#94a3b8",
  marginBottom: "30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "14px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
};

const posterStyle = {
  height: "160px",
  background: "linear-gradient(135deg, #1e1b4b, #312e81)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const genreBadgeStyle = {
  display: "inline-block",
  padding: "2px 8px",
  backgroundColor: "rgba(244, 63, 94, 0.2)",
  color: "#fb7185",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "600",
  marginBottom: "8px",
};

const movieTitleStyle = {
  fontSize: "1.2rem",
  margin: "0 0 6px 0",
  color: "#f8fafc",
};

const metaStyle = {
  fontSize: "0.9rem",
  color: "#38bdf8",
  fontWeight: "600",
  margin: "0 0 10px 0",
};

const descStyle = {
  fontSize: "0.88rem",
  color: "#94a3b8",
  lineHeight: "1.6",
  margin: 0,
};
