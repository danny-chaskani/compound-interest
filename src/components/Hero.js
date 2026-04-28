import React from 'react';

const s = {
  hero: {
    padding: '5rem 2rem 3rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: '-60px', left: '50%', transform: 'translateX(-50%)',
    width: '600px', height: '300px',
    background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(201,168,76,0.12)',
    border: '0.5px solid rgba(201,168,76,0.4)',
    color: '#A07830',
    fontSize: '12px',
    padding: '4px 14px',
    borderRadius: '20px',
    marginBottom: '1.5rem',
    letterSpacing: '0.05em',
    fontFamily: "'DM Sans', sans-serif",
  },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '1rem',
    color: 'var(--text, #F0EDE6)',
  },
  em: {
    fontStyle: 'italic',
    color: '#C9A84C',
  },
  p: {
    color: 'var(--text-muted, #8A8A9A)',
    fontSize: '16px',
    maxWidth: '520px',
    margin: '0 auto 2.5rem',
    lineHeight: 1.7,
    fontFamily: "'DM Sans', sans-serif",
  },
};

export default function Hero() {
  return (
    <section style={s.hero}>
      <div style={s.glow} />
      <div style={s.badge}>מחשבון חינמי ומדויק</div>
      <h1 style={s.h1}>
        מחשבון <em style={s.em}>ריבית דה ריבית</em><br />
        ועוד כלים פיננסיים
      </h1>
      <p style={s.p}>
        גלה כמה הכסף שלך יגדל עם ריבית מצטברת — חשב, השווה,
        והבן את כוח הצמיחה של ההשקעות שלך
      </p>
    </section>
  );
}
