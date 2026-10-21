import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Question 3:
 * Build a Spotify-style user dashboard page that only appears after
 * successful login, and redirect users back to the login page if they
 * are not authenticated.
 * Hint: Use React Router for navigation and protect the dashboard route
 * based on user state from Context.
 */
export default function SpotifyDashboard({ onRedirectToLogin }) {
  const { currentUser } = useAuth();
  const [currentPlaying, setCurrentPlaying] = useState('Kesariya — Brahmastra');
  const [isPlaying, setIsPlaying] = useState(false);

  // Protected Route Check (Q3 Constraint):
  // If not authenticated, redirect users back to login page
  if (!currentUser) {
    return (
      <div style={styles.protectedNotice}>
        <div style={styles.lockIcon}>🔒</div>
        <h3 style={styles.noticeTitle}>Access Restricted: Protected Route (Q3)</h3>
        <p style={styles.noticeText}>
          You must be signed in with Firebase Authentication to access the Spotify Dashboard.
        </p>
        <button
          onClick={() => onRedirectToLogin && onRedirectToLogin()}
          style={styles.loginRedirectBtn}
        >
          ← Go to Sign In Page
        </button>
      </div>
    );
  }

  const playlists = [
    { title: 'Bollywood Top Hits 2024', tracks: '24 Songs', cover: '🎵', desc: 'Arijit Singh, Pritam, Jasleen Royal' },
    { title: 'Late Night Chill & Lo-Fi', tracks: '18 Songs', cover: '🌙', desc: 'Slowed + Reverb Indian beats' },
    { title: 'Workout & Gym Energy', tracks: '32 Songs', cover: '⚡', desc: 'High BPM Punjabi & Hip-hop hits' },
    { title: 'Gujarati Folk & Garba', tracks: '15 Songs', cover: '🪕', desc: 'Sachin-Jigar, Aditya Gadhvi' }
  ];

  const recentTracks = [
    { name: 'Kesariya', artist: 'Arijit Singh, Pritam', album: 'Brahmastra', duration: '4:28' },
    { name: 'Apna Bana Le', artist: 'Arijit Singh, Sachin-Jigar', album: 'Bhediya', duration: '4:21' },
    { name: 'Chaleya', artist: 'Anirudh, Arijit Singh', album: 'Jawan', duration: '3:20' },
    { name: 'Heeriye', artist: 'Jasleen Royal, Arijit Singh', album: 'Single', duration: '3:15' }
  ];

  const artists = [
    { name: 'Arijit Singh', role: 'Artist • 38M Monthly Listeners', img: '🎙️' },
    { name: 'Shreya Ghoshal', role: 'Artist • 24M Monthly Listeners', img: '🎼' },
    { name: 'Diljit Dosanjh', role: 'Artist • 22M Monthly Listeners', img: '🎤' },
    { name: 'Sachin-Jigar', role: 'Music Directors', img: '🎹' }
  ];

  return (
    <div style={styles.dashboard}>
      {/* Welcome Banner */}
      <div style={styles.banner}>
        <div style={styles.badge}>Question 3: Protected Route Dashboard</div>
        <h2 style={styles.welcomeTitle}>
          Good Evening, {currentUser.displayName || currentUser.email.split('@')[0]}! 👋
        </h2>
        <p style={styles.welcomeSub}>
          Signed in as: <strong style={{ color: '#1db954' }}>{currentUser.email}</strong> • Session Active & Protected
        </p>
      </div>

      {/* Playlists Grid */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>🎶 Your Curated Playlists</h3>
        <div style={styles.playlistGrid}>
          {playlists.map((pl, i) => (
            <div key={i} style={styles.playlistCard}>
              <div style={styles.playlistCover}>
                <span style={{ fontSize: '36px' }}>{pl.cover}</span>
              </div>
              <h4 style={styles.cardTitle}>{pl.title}</h4>
              <p style={styles.cardDesc}>{pl.desc}</p>
              <span style={styles.cardBadge}>{pl.tracks}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played List */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>⏱️ Recently Played Tracks</h3>
        <div style={styles.trackList}>
          {recentTracks.map((track, i) => {
            const isThisPlaying = currentPlaying.startsWith(track.name);
            return (
              <div
                key={i}
                onClick={() => {
                  setCurrentPlaying(`${track.name} — ${track.album}`);
                  setIsPlaying(true);
                }}
                style={{
                  ...styles.trackRow,
                  backgroundColor: isThisPlaying ? '#282828' : 'transparent'
                }}
              >
                <div style={styles.trackIndex}>
                  {isThisPlaying && isPlaying ? '🔊' : i + 1}
                </div>
                <div style={styles.trackDetails}>
                  <div style={{ ...styles.trackName, color: isThisPlaying ? '#1db954' : '#ffffff' }}>
                    {track.name}
                  </div>
                  <div style={styles.trackArtist}>{track.artist}</div>
                </div>
                <div style={styles.trackAlbum}>{track.album}</div>
                <div style={styles.trackDuration}>{track.duration}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Artists */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>⭐ Artists You Follow</h3>
        <div style={styles.artistGrid}>
          {artists.map((art, i) => (
            <div key={i} style={styles.artistCard}>
              <div style={styles.artistAvatar}>{art.img}</div>
              <h4 style={styles.artistName}>{art.name}</h4>
              <p style={styles.artistRole}>{art.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Music Player Bar Simulation */}
      <div style={styles.playerBar}>
        <div style={styles.nowPlaying}>
          <span style={{ fontSize: '24px' }}>🎵</span>
          <div>
            <div style={styles.playerTitle}>{currentPlaying}</div>
            <div style={styles.playerSubtitle}>Playing in Spotify Web Player</div>
          </div>
        </div>

        <div style={styles.playerControls}>
          <button style={styles.ctrlBtn}>⏮</button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={styles.playPauseBtn}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button style={styles.ctrlBtn}>⏭</button>
        </div>

        <div style={styles.sessionStatus}>
          <span style={styles.greenPulse}></span>
          <span>Firebase Session Persisted</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    color: '#ffffff',
    fontFamily: 'Inter, system-ui, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    paddingBottom: '80px'
  },
  protectedNotice: {
    backgroundColor: '#181818',
    borderRadius: '16px',
    padding: '40px 24px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '40px auto',
    border: '1px solid #333'
  },
  lockIcon: {
    fontSize: '44px',
    marginBottom: '12px'
  },
  noticeTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#ef4444',
    margin: '0 0 8px'
  },
  noticeText: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: '0 0 20px',
    lineHeight: 1.5
  },
  loginRedirectBtn: {
    backgroundColor: '#1db954',
    color: '#000000',
    border: 'none',
    padding: '10px 22px',
    borderRadius: '24px',
    fontWeight: '800',
    fontSize: '14px',
    cursor: 'pointer'
  },
  banner: {
    background: 'linear-gradient(135deg, #1e3a29 0%, #121212 100%)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #282828'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
    color: '#1db954',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  welcomeTitle: {
    margin: '0 0 6px',
    fontSize: '24px',
    fontWeight: '800'
  },
  welcomeSub: {
    margin: 0,
    fontSize: '13px',
    color: '#b3b3b3'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  sectionTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700'
  },
  playlistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px'
  },
  playlistCard: {
    backgroundColor: '#181818',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #282828',
    transition: 'transform 0.15s ease',
    cursor: 'pointer'
  },
  playlistCover: {
    height: '130px',
    borderRadius: '8px',
    backgroundColor: '#282828',
    background: 'linear-gradient(135deg, #1db954 0%, #0f172a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px'
  },
  cardTitle: {
    margin: '0 0 4px',
    fontSize: '15px',
    fontWeight: '700'
  },
  cardDesc: {
    margin: '0 0 8px',
    fontSize: '12px',
    color: '#9ca3af'
  },
  cardBadge: {
    fontSize: '11px',
    backgroundColor: '#242424',
    color: '#1db954',
    padding: '2px 8px',
    borderRadius: '10px',
    fontWeight: '600'
  },
  trackList: {
    backgroundColor: '#181818',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #282828'
  },
  trackRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    borderBottom: '1px solid #242424',
    cursor: 'pointer',
    transition: 'background-color 0.1s'
  },
  trackIndex: {
    width: '32px',
    fontSize: '13px',
    color: '#9ca3af'
  },
  trackDetails: {
    flex: '2 1 200px'
  },
  trackName: {
    fontSize: '14px',
    fontWeight: '600'
  },
  trackArtist: {
    fontSize: '12px',
    color: '#9ca3af'
  },
  trackAlbum: {
    flex: '1 1 120px',
    fontSize: '13px',
    color: '#9ca3af'
  },
  trackDuration: {
    fontSize: '13px',
    color: '#9ca3af',
    width: '45px',
    textAlign: 'right'
  },
  artistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px'
  },
  artistCard: {
    backgroundColor: '#181818',
    borderRadius: '12px',
    padding: '18px',
    textAlign: 'center',
    border: '1px solid #282828'
  },
  artistAvatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#242424',
    margin: '0 auto 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px'
  },
  artistName: {
    margin: '0 0 4px',
    fontSize: '14px',
    fontWeight: '700'
  },
  artistRole: {
    margin: 0,
    fontSize: '11px',
    color: '#9ca3af'
  },
  playerBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#121212',
    borderTop: '1px solid #282828',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 90
  },
  nowPlaying: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  playerTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#ffffff'
  },
  playerSubtitle: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  playerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  ctrlBtn: {
    background: 'none',
    border: 'none',
    color: '#b3b3b3',
    fontSize: '18px',
    cursor: 'pointer'
  },
  playPauseBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px'
  },
  sessionStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#10b981',
    fontWeight: '600'
  },
  greenPulse: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 6px #10b981'
  }
};
