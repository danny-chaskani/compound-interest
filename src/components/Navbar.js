import React from 'react';

const styles = {
  nav: {
    background: 'rgba(13,15,20,0.97)',
    borderBottom: '0.5px solid rgba(255,255,255,0.07)',
    padding: '0 2rem',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '34px',
    height: '34px',
    background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.1,
  },
  logoMain: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '17px',
    color: '#F0EDE6',
    fontWeight: 700,
  },
  logoSub: {
    fontSize: '10px',
    color: '#8A8A9A',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.05em',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: '#8A8A9A',
    textDecoration: 'none',
    fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'color 0.2s',
  },
};

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logoWrap}>
        <div style={styles.logoIcon}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 14 L6 8 L10 11 L14 4 L16 6" stroke="#0D0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="4" r="1.5" fill="#0D0F14"/>
          </svg>
        </div>
        <div style={styles.logoText}>
          <span style={styles.logoMain}>ריבית חכמה</span>
          <span style={styles.logoSub}>מחשבונים פיננסיים</span>
        </div>
      </div>
      <ul style={styles.ul}>
        <li><a href="#calculator" style={styles.link}>מחשבונים</a></li>
        <li><a href="#about" style={styles.link}>אודות</a></li>
      </ul>
    </nav>
  );
}
