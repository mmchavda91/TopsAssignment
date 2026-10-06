import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

// Pre-defined database for build-time generation
const playlistsData = {
  "101": {
    name: "Bollywood Acoustic Hits",
    creator: "Mamta Chavda",
    likes: "450,210",
    songs: [
      { title: "Kesariya", artist: "Arijit Singh", duration: "4:28" },
      { title: "Raataan Lambiyan", artist: "Jubin Nautiyal", duration: "3:50" },
      { title: "Apna Bana Le", artist: "Arijit Singh", duration: "4:21" },
    ],
  },
  "202": {
    name: "Global Top Chart 2026",
    creator: "Spotify Official",
    likes: "2,840,110",
    songs: [
      { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
      { title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
      { title: "Stay", artist: "The Kid LAROI", duration: "2:21" },
    ],
  },
  "303": {
    name: "Deep Focus & Study",
    creator: "Lofi Beats",
    likes: "1,120,400",
    songs: [
      { title: "Morning Rain", artist: "ChillHop", duration: "2:45" },
      { title: "Coffee & Code", artist: "Lofi Dreamer", duration: "3:10" },
      { title: "Midnight Calm", artist: "Study Pulse", duration: "2:55" },
    ],
  },
};

export default function PlaylistDetail({ playlist, playlistId }) {
  if (!playlist) {
    return (
      <div style={containerStyle}>
        <Navbar />
        <main style={{ padding: "40px", textAlign: "center", color: "#fff" }}>
          <h2>Playlist not found</h2>
          <Link href="/home" style={{ color: "#38bdf8" }}>Back to Home</Link>
        </main>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Head>
        <title>{playlist.name} - Playlist #{playlistId}</title>
      </Head>

      <Navbar />

      <main style={mainWrapperStyle}>
        <div style={spotifyCardStyle}>
          {/* Static Pre-Rendering Badge */}
          <div style={badgeStyle}>
            ⚡ Static Site Generation (SSG): Pre-rendered at Build Time
          </div>

          <div style={headerStyle}>
            <div style={coverArtStyle}>🎵</div>
            <div>
              <span style={playlistLabelStyle}>PRE-RENDERED PLAYLIST</span>
              <h1 style={titleStyle}>{playlist.name}</h1>
              <p style={metaStyle}>
                Playlist ID: <strong style={{ color: "#1db954" }}>#{playlistId}</strong>
              </p>
              <p style={subMetaStyle}>
                Curated by <strong>{playlist.creator}</strong> • {playlist.likes} saves • {playlist.songs.length} tracks
              </p>
            </div>
          </div>

          <div style={actionRowStyle}>
            <button style={playBtnStyle}>▶ Play</button>
            <button style={heartBtnStyle}>♥ Save</button>
          </div>

          <div style={songTableStyle}>
            <div style={tableHeaderStyle}>
              <span style={{ width: "30px" }}>#</span>
              <span style={{ flex: 1 }}>TITLE</span>
              <span style={{ flex: 1 }}>ARTIST</span>
              <span style={{ width: "60px", textAlign: "right" }}>⏱</span>
            </div>

            {playlist.songs.map((song, index) => (
              <div key={index} style={songRowStyle}>
                <span style={{ width: "30px", color: "#64748b" }}>{index + 1}</span>
                <span style={{ flex: 1, fontWeight: "600", color: "#f8fafc" }}>{song.title}</span>
                <span style={{ flex: 1, color: "#94a3b8" }}>{song.artist}</span>
                <span style={{ width: "60px", textAlign: "right", color: "#64748b" }}>{song.duration}</span>
              </div>
            ))}
          </div>

          {/* Quick links to the pre-rendered pages */}
          <div style={quickLinksStyle}>
            <span style={{ fontSize: "14px", color: "#94a3b8" }}>
              Only these 3 IDs are pre-rendered at build time:
            </span>
            <Link href="/playlists/101" style={pillStyle}>/playlists/101</Link>
            <Link href="/playlists/202" style={pillStyle}>/playlists/202</Link>
            <Link href="/playlists/303" style={pillStyle}>/playlists/303</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// QUESTION 4: getStaticPaths
// Specify ONLY three IDs (101, 202, 303) to be pre-rendered at build time
// -------------------------------------------------------------
export async function getStaticPaths() {
  const paths = [
    { params: { playlistId: "101" } },
    { params: { playlistId: "202" } },
    { params: { playlistId: "303" } },
  ];

  return {
    paths,
    // fallback: false ensures any other ID returns a 404 page
    fallback: false,
  };
}

// -------------------------------------------------------------
// QUESTION 4: getStaticProps
// Fetch data at build time for the specified playlistId
// -------------------------------------------------------------
export async function getStaticProps({ params }) {
  const { playlistId } = params;
  const playlist = playlistsData[playlistId] || null;

  return {
    props: {
      playlist,
      playlistId,
    },
  };
}

// Styles
const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#121212",
  color: "#ffffff",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  display: "flex",
  flexDirection: "column",
};

const mainWrapperStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 20px",
};

const spotifyCardStyle = {
  maxWidth: "850px",
  width: "100%",
  background: "linear-gradient(180deg, #1e3a2b 0%, #121212 300px)",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 14px",
  backgroundColor: "rgba(29, 185, 84, 0.2)",
  border: "1px solid #1db954",
  color: "#1db954",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: "600",
  marginBottom: "20px",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  flexWrap: "wrap",
};

const coverArtStyle = {
  width: "140px",
  height: "140px",
  backgroundColor: "#282828",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "55px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
};

const playlistLabelStyle = {
  fontSize: "12px",
  fontWeight: "bold",
  letterSpacing: "1px",
  color: "#cbd5e1",
};

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "800",
  margin: "4px 0 10px 0",
};

const metaStyle = {
  fontSize: "1.1rem",
  margin: "4px 0",
  color: "#e2e8f0",
};

const subMetaStyle = {
  fontSize: "0.95rem",
  color: "#94a3b8",
  margin: "6px 0 0 0",
};

const actionRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  margin: "24px 0",
};

const playBtnStyle = {
  backgroundColor: "#1db954",
  color: "#000",
  border: "none",
  padding: "10px 24px",
  borderRadius: "9999px",
  fontWeight: "bold",
  fontSize: "14px",
  cursor: "pointer",
};

const heartBtnStyle = {
  backgroundColor: "transparent",
  border: "1px solid #64748b",
  color: "#fff",
  padding: "8px 18px",
  borderRadius: "9999px",
  cursor: "pointer",
};

const songTableStyle = {
  borderTop: "1px solid rgba(255,255,255,0.1)",
  marginTop: "16px",
};

const tableHeaderStyle = {
  display: "flex",
  padding: "12px 10px",
  color: "#64748b",
  fontSize: "12px",
  fontWeight: "bold",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const songRowStyle = {
  display: "flex",
  alignItems: "center",
  padding: "12px 10px",
  borderRadius: "6px",
  fontSize: "14px",
  borderBottom: "1px solid rgba(255,255,255,0.03)",
};

const quickLinksStyle = {
  marginTop: "25px",
  paddingTop: "16px",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const pillStyle = {
  padding: "4px 12px",
  backgroundColor: "#282828",
  color: "#38bdf8",
  borderRadius: "6px",
  fontSize: "13px",
  textDecoration: "none",
};
