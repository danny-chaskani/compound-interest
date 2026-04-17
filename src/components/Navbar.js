import React from 'react';

const styles = {
  nav: {
    background: 'rgba(13,15,20,0.97)',
    borderBottom: '0.5px solid rgba(255,255,255,0.07)',
    padding: '0 2rem',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '18px',
    color: '#C9A84C',
  },
  logoSpan: { color: '#F0EDE6' },
  ul: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: '#8A8A9A',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        ריבית<span style={styles.logoSpan}>חכמה</span>
      </div>
      <ul style={styles.ul}>
        <li><a href="#calculator" style={styles.link}>מחשבון</a></li>
        <li><a href="#about" style={styles.link}>מה זה ריבית דה ריבית?</a></li>
      </ul>
    </nav>
  );
}
