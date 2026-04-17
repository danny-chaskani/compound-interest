import React from 'react';

const s = {
  footer: {
    borderTop: '0.5px solid rgba(255,255,255,0.07)',
    padding: '2rem',
    textAlign: 'center',
    color: '#5A5A6A',
    fontSize: '13px',
    fontFamily: "'DM Sans', sans-serif",
  },
};

export default function Footer() {
  return (
    <footer style={s.footer}>
      © 2025 ריביתחכמה · כל המחשבונים חינמיים · המידע הוא לצרכי מידע בלבד ואינו מהווה ייעוץ פיננסי
    </footer>
  );
}
