import React, { useState } from 'react';

/**
 * Question 1:
 * Open your React app in Chrome, use DevTools to simulate a mobile device
 * (like iPhone X), and take a screenshot showing your homepage layout on mobile.
 */
export default function MobileSimulator() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [deviceModel, setDeviceModel] = useState('iPhone X (375 × 812)');
  const [scale, setScale] = useState(1);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.badge}>Question 1: Mobile Device Emulation</span>
        <h2 style={styles.title}>📱 Chrome DevTools Mobile View (iPhone X Simulation)</h2>
        <p style={styles.subtitle}>
          Simulates the React app homepage inside an iPhone X viewport (375px width) demonstrating responsive layout adjustments.
        </p>
      </div>

      {/* DevTools Emulation Toolbar */}
      <div style={styles.devToolsBar}>
        <div style={styles.devToolsControls}>
          <div style={styles.toolItem}>
            <span style={styles.toolLabel}>Dimensions:</span>
            <select
              value={deviceModel}
              onChange={(e) => setDeviceModel(e.target.value)}
              style={styles.select}
            >
              <option value="iPhone X (375 × 812)">iPhone X (375 × 812) — DPR 3.0</option>
              <option value="iPhone 14 Pro (393 × 852)">iPhone 14 Pro (393 × 852)</option>
              <option value="Pixel 7 (412 × 915)">Pixel 7 (412 × 915)</option>
            </select>
          </div>
          <div style={styles.toolItem}>
            <span style={styles.toolLabel}>Throttle:</span>
            <span style={styles.pill}>Fast 4G</span>
          </div>
          <div style={styles.toolItem}>
            <span style={styles.toolLabel}>User Agent:</span>
            <span style={styles.userAgent}>Mobile Safari / Chrome Mobile</span>
          </div>
        </div>

        <div style={styles.instructionBox}>
          <strong>💡 Chrome DevTools Steps to reproduce:</strong>
          <span>Press <code>Ctrl + Shift + I</code> → Click Device Toggle (<code>Ctrl + Shift + M</code>) → Select <strong>iPhone X</strong> from top dropdown.</span>
        </div>
      </div>

      {/* Live iPhone X Frame */}
      <div style={styles.deviceWrapper}>
        <div style={styles.iphoneX}>
          {/* Notch & Speaker */}
          <div style={styles.notch}>
            <div style={styles.speaker}></div>
            <div style={styles.camera}></div>
          </div>

          {/* iOS Status Bar */}
          <div style={styles.statusBar}>
            <span style={styles.statusTime}>9:41</span>
            <div style={styles.statusIcons}>
              <span>📶</span>
              <span>5G</span>
              <span>🔋 100%</span>
            </div>
          </div>

          {/* Mobile Screen App Content */}
          <div style={styles.screenContent}>
            {/* Mobile Header with Hamburger */}
            <header style={styles.mobileHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🎧</span>
                <span style={{ fontWeight: '800', fontSize: '15px', color: '#1db954' }}>Spotify</span>
              </div>
              <div style={styles.hamburger}>☰</div>
            </header>

            {/* Mobile Hero Banner */}
            <div style={styles.mobileHero}>
              <span style={styles.heroTag}>Mobile Optimized</span>
              <h3 style={styles.heroTitle}>Music for Every Mood</h3>
              <p style={styles.heroSub}>Curated for touch devices</p>
              <button style={styles.mobilePlayBtn}>▶ Listen Now</button>
            </div>

            {/* Mobile 1-Column Stacking Cards */}
            <div style={styles.sectionHeader}>
              <span style={{ fontSize: '14px', fontWeight: '700' }}>Featured Playlists</span>
              <span style={{ fontSize: '11px', color: '#1db954' }}>See All</span>
            </div>

            <div style={styles.mobileCardsList}>
              {[
                { title: 'Bollywood Romantic Hits', count: '28 tracks', icon: '💖' },
                { title: 'Late Night Lo-Fi Beats', count: '16 tracks', icon: '🌙' },
                { title: 'Gym Workout Energy', count: '32 tracks', icon: '⚡' }
              ].map((card, i) => (
                <div key={i} style={styles.mobileCard}>
                  <div style={styles.cardThumbnail}>{card.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={styles.mobileCardTitle}>{card.title}</h4>
                    <p style={styles.mobileCardSub}>{card.count} • Updated Today</p>
                  </div>
                  <button style={styles.mobilePlayCircle}>▶</button>
                </div>
              ))}
            </div>

            {/* Bottom Navigation Bar */}
            <nav style={styles.bottomNav}>
              <div style={{ ...styles.navItem, color: '#1db954' }}>
                <span>🏠</span>
                <span>Home</span>
              </div>
              <div style={styles.navItem}>
                <span>🔍</span>
                <span>Search</span>
              </div>
              <div style={styles.navItem}>
                <span>📚</span>
                <span>Library</span>
              </div>
              <div style={styles.navItem}>
                <span>👤</span>
                <span>Profile</span>
              </div>
            </nav>
          </div>

          {/* iPhone Home Indicator Bar */}
          <div style={styles.homeIndicator}></div>
        </div>
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
  devToolsBar: {
    backgroundColor: '#1f2937',
    borderRadius: '10px',
    padding: '12px 16px',
    marginBottom: '20px',
    border: '1px solid #374151',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  devToolsControls: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  toolItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  toolLabel: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '600'
  },
  select: {
    padding: '5px 10px',
    borderRadius: '6px',
    border: '1px solid #4b5563',
    backgroundColor: '#111827',
    color: '#fff',
    fontSize: '12px',
    outline: 'none'
  },
  pill: {
    backgroundColor: '#065f46',
    color: '#6ee7b7',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '700'
  },
  userAgent: {
    fontSize: '11px',
    color: '#d1d5db',
    fontFamily: 'monospace'
  },
  instructionBox: {
    fontSize: '12px',
    color: '#93c5fd',
    backgroundColor: '#1e3a8a33',
    padding: '8px 12px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  deviceWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0'
  },
  iphoneX: {
    width: '375px',
    height: '740px',
    backgroundColor: '#000000',
    borderRadius: '44px',
    border: '12px solid #2d3748',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 2px #4a5568',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  notch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '180px',
    height: '24px',
    backgroundColor: '#2d3748',
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  speaker: {
    width: '45px',
    height: '4px',
    backgroundColor: '#1a202c',
    borderRadius: '2px'
  },
  camera: {
    width: '8px',
    height: '8px',
    backgroundColor: '#1a202c',
    borderRadius: '50%'
  },
  statusBar: {
    height: '36px',
    padding: '6px 20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: '700',
    color: '#ffffff',
    zIndex: 90
  },
  statusTime: {
    fontSize: '12px'
  },
  statusIcons: {
    display: 'flex',
    gap: '6px',
    fontSize: '11px'
  },
  screenContent: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#121212',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingBottom: '60px'
  },
  mobileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #282828'
  },
  hamburger: {
    fontSize: '20px',
    cursor: 'pointer',
    color: '#ffffff'
  },
  mobileHero: {
    background: 'linear-gradient(135deg, #1db954 0%, #0f172a 100%)',
    padding: '18px 16px',
    borderRadius: '12px',
    margin: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  heroTag: {
    fontSize: '10px',
    textTransform: 'uppercase',
    fontWeight: '800',
    color: '#dcfce7'
  },
  heroTitle: {
    margin: '2px 0',
    fontSize: '17px',
    fontWeight: '800'
  },
  heroSub: {
    margin: 0,
    fontSize: '11px',
    color: '#e2e8f0'
  },
  mobilePlayBtn: {
    marginTop: '8px',
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '16px',
    fontSize: '11px',
    fontWeight: '800'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px'
  },
  mobileCardsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 14px'
  },
  mobileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#181818',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #282828'
  },
  cardThumbnail: {
    width: '42px',
    height: '42px',
    borderRadius: '6px',
    backgroundColor: '#282828',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  mobileCardTitle: {
    margin: 0,
    fontSize: '13px',
    fontWeight: '700'
  },
  mobileCardSub: {
    margin: '2px 0 0',
    fontSize: '11px',
    color: '#9ca3af'
  },
  mobilePlayCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#1db954',
    color: '#000',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#121212',
    borderTop: '1px solid #282828',
    height: '52px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 10px'
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '10px',
    color: '#9ca3af',
    gap: '2px'
  },
  homeIndicator: {
    position: 'absolute',
    bottom: '6px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '130px',
    height: '4px',
    backgroundColor: '#ffffff',
    borderRadius: '2px',
    zIndex: 100
  }
};
