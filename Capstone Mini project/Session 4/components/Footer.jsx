import React from 'react';

/**
 * Q3: Reusable Footer Component (Flipkart-style)
 * @param {Array} socialLinks - Array of social link objects { platform, url, icon }
 * @param {string} companyName - Company name for copyright notice
 */
export default function Footer({
  socialLinks = [
    { platform: 'Facebook', url: 'https://facebook.com', icon: '🌐' },
    { platform: 'Twitter / X', url: 'https://twitter.com', icon: '🐦' },
    { platform: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    { platform: 'Instagram', url: 'https://instagram.com', icon: '📷' },
  ],
  companyName = 'Flipkart Internet Pvt Ltd',
}) {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* About Section */}
        <div style={styles.section}>
          <h4 style={styles.heading}>ABOUT</h4>
          <ul style={styles.list}>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Flipkart Stories</li>
          </ul>
        </div>

        {/* Help Section */}
        <div style={styles.section}>
          <h4 style={styles.heading}>HELP</h4>
          <ul style={styles.list}>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Social Links Section (Passed as Props) */}
        <div style={styles.section}>
          <h4 style={styles.heading}>CONNECT WITH US</h4>
          <div style={styles.socialGrid}>
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={styles.socialLink}
                title={item.platform}
              >
                <span style={styles.socialIcon}>{item.icon}</span>
                <span style={styles.socialLabel}>{item.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.copyright}>
        <p>© 2026 {companyName}. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: { backgroundColor: '#172337', color: '#878787', padding: '30px 20px 10px', fontSize: '13px' },
  container: { maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' },
  section: { display: 'flex', flexDirection: 'column', gap: '10px' },
  heading: { color: '#878787', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.5px' },
  list: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#ffffff' },
  socialGrid: { display: 'flex', flexDirection: 'column', gap: '8px' },
  socialLink: { display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', textDecoration: 'none', fontSize: '13px' },
  socialIcon: { fontSize: '16px' },
  socialLabel: { color: '#ffffff' },
  copyright: { borderTop: '1px solid #454d5e', marginTop: '30px', paddingTop: '15px', textAlign: 'center', fontSize: '12px' },
};
