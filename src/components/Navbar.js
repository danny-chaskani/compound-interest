import React from 'react';

export default function Navbar() {
  const nav = {
    background: 'rgba(13,15,20,0.97)',
    borderBottom: '0.5px solid rgba(255,255,255,0.07)',
    padding: '0 2rem', height: '64px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky', top: 0, zIndex: 100,
  };

  return (
    <nav style={nav}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 14 L6 8 L10 11 L14 4 L16 6" stroke="#0D0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="4" r="1.5" fill="#0D0F14"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', color: '#F0EDE6', fontWeight: 700 }}>ריבית חכמה</div>
          <div style={{ fontSize: '10px', color: '#8A8A9A', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em' }}>מחשבונים פיננסיים</div>
        </div>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1.5rem', margin: 0, padding: 0 }}>
        <li><a href="#calculator" style={{ color: '#8A8A9A', textDecoration: 'none', fontSize: '14px', fontFamily: "'DM Sans', sans-serif" }}>מחשבונים</a></li>
        <li><a href="#about" style={{ color: '#8A8A9A', textDecoration: 'none', fontSize: '14px', fontFamily: "'DM Sans', sans-serif" }}>אודות</a></li>
      </ul>
    </nav>
  );
}
