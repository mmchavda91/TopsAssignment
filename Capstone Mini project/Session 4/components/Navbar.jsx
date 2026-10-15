import React from 'react';

/**
 * Q1: Reusable Navbar Component (Zomato-style)
 * @param {string} activeTab - The currently active tab ('home' | 'orders' | 'cart' | 'profile')
 * @param {function} onTabChange - Callback function triggered when a tab is clicked
 */
export default function Navbar({ activeTab = 'home', onTabChange }) {
  const navLinks = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'cart', label: 'Cart', icon: '🛒', badge: 2 },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav style={styles.nav}>
      {/* Brand Logo */}
      <div style={styles.logo}>
        <span style={styles.logoRed}>zomato</span>
      </div>

      {/* Navigation Links */}
      <ul style={styles.navList}>
        {navLinks.map((link) => {
          const isActive = activeTab.toLowerCase() === link.id;
          return (
            <li key={link.id}>
              <button
                onClick={() => onTabChange && onTabChange(link.id)}
                style={{
                  ...styles.navButton,
                  ...(isActive ? styles.activeButton : {}),
                }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
                {link.badge && <span style={styles.badge}>{link.badge}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  logo: { fontSize: '24px', fontWeight: 'bold' },
  logoRed: { color: '#E23744', letterSpacing: '-1px' },
  navList: { display: 'flex', listStyle: 'none', gap: '12px', margin: 0, padding: 0 },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: 'transparent',
    color: '#4f4f4f',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activeButton: {
    backgroundColor: '#E23744',
    color: '#ffffff',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(226, 55, 68, 0.3)',
  },
  badge: {
    backgroundColor: '#ffffff',
    color: '#E23744',
    borderRadius: '10px',
    padding: '2px 6px',
    fontSize: '11px',
    fontWeight: 'bold',
  },
};
