import React from 'react';

/**
 * Q2: Reusable Card Component (Spotify-style)
 * @param {string} title - Name of the playlist
 * @param {number} songCount - Total number of songs in the playlist
 * @param {string} image - Cover image URL
 * @param {string} curator - Name of creator/curator
 * @param {string} category - Category tag
 */
export function PlaylistCard({ title, songCount, image, curator, category }) {
  return (
    <div style={cardStyles.card}>
      <div style={cardStyles.imageContainer}>
        <img src={image} alt={title} style={cardStyles.image} />
        <button style={cardStyles.playButton} title="Play">▶</button>
      </div>
      <div style={cardStyles.info}>
        <span style={cardStyles.category}>{category}</span>
        <h4 style={cardStyles.title}>{title}</h4>
        <p style={cardStyles.meta}>
          By {curator} • <span style={cardStyles.songCount}>{songCount} songs</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Demo list rendering 3 different playlists using props
 */
export default function PlaylistSection() {
  const playlists = [
    {
      id: 1,
      title: 'Bollywood Romance Top 50',
      songCount: 50,
      curator: 'Spotify India',
      category: 'Romantic',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80',
    },
    {
      id: 2,
      title: 'Coding & Chill Beats',
      songCount: 38,
      curator: 'Lo-Fi Lounge',
      category: 'Focus',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80',
    },
    {
      id: 3,
      title: 'Gujarati Garba Hits',
      songCount: 45,
      curator: 'Dandiya Vibes',
      category: 'Folk & Festive',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80',
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#121212', borderRadius: '12px', color: '#fff' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>🎧 Featured Playlists</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {playlists.map((pl) => (
          <PlaylistCard
            key={pl.id}
            title={pl.title}
            songCount={pl.songCount}
            image={pl.image}
            curator={pl.curator}
            category={pl.category}
          />
        ))}
      </div>
    </div>
  );
}

const cardStyles = {
  card: {
    backgroundColor: '#181818',
    padding: '16px',
    borderRadius: '8px',
    transition: 'transform 0.2s ease, background 0.2s ease',
    cursor: 'pointer',
  },
  imageContainer: { position: 'relative', width: '100%', aspectRatio: '1/1', marginBottom: '12px' },
  image: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' },
  playButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#1DB954',
    color: '#000000',
    border: 'none',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  },
  info: { display: 'flex', flexDirection: 'column', gap: '4px' },
  category: { fontSize: '11px', textTransform: 'uppercase', color: '#1DB954', fontWeight: 'bold' },
  title: { color: '#ffffff', fontSize: '15px', margin: 0, fontWeight: '600' },
  meta: { color: '#b3b3b3', fontSize: '12px', margin: 0 },
  songCount: { color: '#ffffff' },
};
