import React, { useState } from 'react';

/**
 * Question 2:
 * Switch DevTools to tablet and desktop modes, then list 2 layout
 * or UI differences you observe between these views in your React app.
 * Hint: Look for changes in menu, images, or button placements.
 */
export default function TabletDesktopComparison() {
  const [selectedMode, setSelectedMode] = useState('both'); // 'both' | 'tablet' | 'desktop'

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.badge}>Question 2: Responsive Breakpoint Analysis</span>
        <h2 style={styles.title}>💻 Tablet vs Desktop Mode Comparison</h2>
        <p style={styles.subtitle}>
          Analysis of UI layout, menu structure, and button placements across 768px (Tablet) and 1280px (Desktop) viewports.
        </p>
      </div>

      {/* Mode View Switcher */}
      <div style={styles.toggleBar}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: '#9ca3af' }}>View Comparison:</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['both', 'desktop', 'tablet'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMode(m)}
              style={{
                ...styles.modeBtn,
                backgroundColor: selectedMode === m ? '#3b82f6' : '#1f2937',
                color: selectedMode === m ? '#ffffff' : '#9ca3af',
                fontWeight: selectedMode === m ? '700' : '500'
              }}
            >
              {m === 'both' && '⚖️ Side-by-Side'}
              {m === 'desktop' && '🖥️ Desktop (1280px)'}
              {m === 'tablet' && '📱 Tablet (768px iPad)'}
            </button>
          ))}
        </div>
      </div>

      {/* The 2 Primary Differences Listed (Q2 Requirement) */}
      <div style={styles.differencesBox}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', color: '#60a5fa' }}>
          🔍 2 Key Layout & UI Differences Observed:
        </h3>

        <div style={styles.diffItem}>
          <div style={styles.diffNumber}>01</div>
          <div>
            <h4 style={styles.diffTitle}>Navigation Menu & Header Layout</h4>
            <p style={styles.diffDesc}>
              <strong>Desktop (1280px):</strong> Displays an expanded horizontal navbar containing brand logo, inline navigation links (Home, Playlists, Artists, Library), search bar, and full user email badge.<br />
              <strong>Tablet (768px):</strong> Collapses secondary links into a responsive icon menu / hamburger toggle to prevent horizontal overflow on smaller screens.
            </p>
          </div>
        </div>

        <div style={styles.diffItem}>
          <div style={styles.diffNumber}>02</div>
          <div>
            <h4 style={styles.diffTitle}>Card Grid Columns & Button Placements</h4>
            <p style={styles.diffDesc}>
              <strong>Desktop (1280px):</strong> Displays a spacious <strong>4-column grid</strong> (`grid-template-columns: repeat(4, 1fr)`) with floating circular play buttons on hover.<br />
              <strong>Tablet (768px):</strong> Automatically shifts to a <strong>2-column grid</strong> (`repeat(2, 1fr)`) with larger touch targets and full-width buttons optimized for touch gestures.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Live Viewport Previews */}
      <div style={styles.previewsContainer}>
        {/* Desktop View Card */}
        {(selectedMode === 'both' || selectedMode === 'desktop') && (
          <div style={styles.previewBox}>
            <div style={styles.previewHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🖥️</span>
                <strong>Desktop Mode (1280px × 800px)</strong>
              </div>
              <span style={styles.specBadge}>4 Columns • Expanded Nav</span>
            </div>

            <div style={styles.desktopSimulation}>
              {/* Full Desktop Navbar */}
              <div style={styles.simNavDesktop}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#1db954', fontWeight: '800' }}>Spotify Desktop</span>
                  <div style={styles.navLinksRow}>
                    <span style={{ color: '#1db954', fontWeight: '700' }}>Home</span>
                    <span>Browse</span>
                    <span>Radio</span>
                    <span>Library</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>user@spotify.com</span>
                  <button style={styles.miniBtn}>Sign Out</button>
                </div>
              </div>

              {/* 4-Column Grid Simulation */}
              <div style={{ padding: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#d1d5db' }}>Popular Playlists (4 Columns)</span>
                <div style={styles.simGrid4}>
                  {['Bollywood Hits', 'Lo-Fi Chill', 'Gym Beast', 'Punjabi 100'].map((name, i) => (
                    <div key={i} style={styles.simCardDesktop}>
                      <div style={styles.simThumbnail}>🎵</div>
                      <div style={{ fontSize: '11px', fontWeight: '700' }}>{name}</div>
                      <div style={{ fontSize: '10px', color: '#9ca3af' }}>Curated for you</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tablet View Card */}
        {(selectedMode === 'both' || selectedMode === 'tablet') && (
          <div style={styles.previewBox}>
            <div style={styles.previewHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>📱</span>
                <strong>Tablet Mode (768px × 1024px iPad)</strong>
              </div>
              <span style={styles.specBadgeTablet}>2 Columns • Condensed Nav</span>
            </div>

            <div style={styles.tabletSimulation}>
              {/* Condensed Tablet Navbar */}
              <div style={styles.simNavTablet}>
                <span style={{ color: '#1db954', fontWeight: '800' }}>Spotify Tablet</span>
                <span style={{ fontSize: '18px' }}>☰</span>
              </div>

              {/* 2-Column Grid Simulation */}
              <div style={{ padding: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#d1d5db' }}>Popular Playlists (2 Columns Touch)</span>
                <div style={styles.simGrid2}>
                  {['Bollywood Hits', 'Lo-Fi Chill', 'Gym Beast', 'Punjabi 100'].map((name, i) => (
                    <div key={i} style={styles.simCardTablet}>
                      <div style={styles.simThumbnailTablet}>🎵</div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '700' }}>{name}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>24 Songs • Tap to play</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#111827',
    color: '#ffffff',
    borderRadius: '16px',
    padding: '26px',
    border: '1px solid #1f2937',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
  },
  header: {
    marginBottom: '18px'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    border: '1px solid rgba(59, 130, 246, 0.4)'
  },
  title: {
    margin: '0 0 6px',
    fontSize: '22px',
    fontWeight: '800'
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#9ca3af'
  },
  toggleBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#1f2937',
    padding: '10px 16px',
    borderRadius: '10px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  modeBtn: {
    padding: '6px 14px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  differencesBox: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '18px',
    border: '1px solid #334155',
    marginBottom: '22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  diffItem: {
    display: 'flex',
    gap: '14px',
    backgroundColor: '#0f172a',
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #1e293b'
  },
  diffNumber: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    width: '38px',
    height: '38px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  diffTitle: {
    margin: '0 0 6px',
    fontSize: '14px',
    fontWeight: '700',
    color: '#f8fafc'
  },
  diffDesc: {
    margin: 0,
    fontSize: '13px',
    lineHeight: 1.6,
    color: '#cbd5e1'
  },
  previewsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '20px'
  },
  previewBox: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    border: '1px solid #374151',
    overflow: 'hidden'
  },
  previewHeader: {
    padding: '12px 16px',
    backgroundColor: '#111827',
    borderBottom: '1px solid #374151',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px'
  },
  specBadge: {
    fontSize: '11px',
    backgroundColor: '#1e3a8a',
    color: '#93c5fd',
    padding: '2px 8px',
    borderRadius: '10px',
    fontWeight: '700'
  },
  specBadgeTablet: {
    fontSize: '11px',
    backgroundColor: '#4c1d95',
    color: '#c4b5fd',
    padding: '2px 8px',
    borderRadius: '10px',
    fontWeight: '700'
  },
  desktopSimulation: {
    backgroundColor: '#0f172a',
    minHeight: '260px'
  },
  tabletSimulation: {
    backgroundColor: '#0f172a',
    minHeight: '260px'
  },
  simNavDesktop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    fontSize: '12px'
  },
  navLinksRow: {
    display: 'flex',
    gap: '12px',
    fontSize: '11px',
    color: '#9ca3af'
  },
  miniBtn: {
    backgroundColor: '#dc2626',
    color: '#fff',
    border: 'none',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 'bold'
  },
  simNavTablet: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    fontSize: '13px'
  },
  simGrid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginTop: '10px'
  },
  simGrid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginTop: '10px'
  },
  simCardDesktop: {
    backgroundColor: '#1e293b',
    padding: '10px',
    borderRadius: '6px',
    textAlign: 'center'
  },
  simThumbnail: {
    height: '60px',
    backgroundColor: '#0f172a',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '6px'
  },
  simCardTablet: {
    backgroundColor: '#1e293b',
    padding: '12px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  simThumbnailTablet: {
    width: '45px',
    height: '45px',
    backgroundColor: '#0f172a',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px'
  }
};
