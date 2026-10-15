// pages/index.js
// This is the main homepage of the Spotify Playlist Viewer app

// Q3: Logging the Spotify API Key from .env.local
console.log("Spotify API Key:", process.env.NEXT_PUBLIC_SPOTIFY_API_KEY);

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🎵 Spotify Playlist Viewer</h1>
      <p>Welcome to the Spotify Playlist Viewer built with Next.js!</p>
      <p>
        <strong>API Key (from .env.local):</strong>{" "}
        {process.env.NEXT_PUBLIC_SPOTIFY_API_KEY || "Not found"}
      </p>
    </main>
  );
}
