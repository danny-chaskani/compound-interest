import React from 'react';

const s = {
  section: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' },
  card: { background: '#161820', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '2rem' },
  cardGold: { background: '#161820', border: '0.5px solid rgba(201,168,76,0.25)', borderRadius: '16px', padding: '2rem' },
  h2: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#F0EDE6', marginBottom: '1rem' },
  h3: { fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#C9A84C', marginBottom: '0.75rem' },
  p: { color: '#8A8A9A', fontSize: '15px', lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", marginBottom: '1rem' },
  quote: { fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#F0EDE6', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '1rem', borderRight: '3px solid #C9A84C', paddingRight: '1rem' },
  formula: { background: '#1E2029', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '1.2rem 1.5rem', margin: '1.5rem 0', direction: 'ltr', textAlign: 'center' },
  formulaText: { color: '#C9A84C', fontSize: '15px', fontFamily: 'monospace' },
  formulaCaption: { color: '#5A5A6A', fontSize: '12px', marginTop: '6px', fontFamily: "'DM Sans', sans-serif" },
  stat: { textAlign: 'center', padding: '1rem' },
  statNum: { fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#C9A84C', fontWeight: 700 },
  statLabel: { fontSize: '13px', color: '#8A8A9A', fontFamily: "'DM Sans', sans-serif", marginTop: '4px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '0.5px solid rgba(255,255,255,0.07)', marginTop: '1.5rem' },
};

export default function About() {
  return (
    <section id="about" style={s.section}>
      <div style={s.grid}>

        {/* הסיפור */}
        <div style={{ ...s.cardGold, gridColumn: 'span 1' }}>
          <h2 style={s.h2}>למה בנינו את זה?</h2>
          <p style={s.quote}>
            "מי שמבין את הכלים הפיננסיים לעומק — והכסף שלו מנוהל לפיהם — פשוט חי ברמה אחת מעל."
          </p>
          <p style={s.p}>
            כשחיפשנו מחשבוני השקעות בעברית, מצאנו כלים מפוזרים, מבלבלים, ולא מקיפים.
            היה צריך לדלג מאתר לאתר רק כדי לחשב דברים בסיסיים.
          </p>
          <p style={s.p}>
            בנינו את האתר הזה כדי לשנות את זה — כל המחשבונים החשובים במקום אחד, בעברית, בחינם.
            האתר נבנה על ידי מי שעובד בתחום ההשקעות ומבין את החשיבות של הכרת הכלים האלו.
          </p>
        </div>

        {/* מה זה ריבית דה ריבית */}
        <div style={s.card}>
          <h3 style={s.h3}>מה זה ריבית דה ריבית?</h3>
          <p style={s.p}>
            ריבית דה ריבית היא הרווחת ריבית על ריבית שכבר צברת — לא רק על הקרן המקורית.
            זהו אפקט "כדור השלג" שמאיץ את הצמיחה לאורך זמן.
          </p>
          <div style={s.formula}>
            <div style={s.formulaText}>A = P(1 + r/n)^(nt)</div>
            <div style={s.formulaCaption}>A = סכום סופי | P = קרן | r = ריבית | n = תדירות | t = שנים</div>
          </div>
          <p style={s.p}>
            ₪10,000 ב-7% לשנה: אחרי 30 שנה עם ריבית פשוטה — ₪31,000.
            עם ריבית דה ריבית — <strong style={{ color: '#C9A84C' }}>₪76,123</strong>.
          </p>
        </div>
      </div>

      {/* כרטיס טיפים */}
      <div style={s.card}>
        <h3 style={s.h3}>3 עקרונות שישנו את הגישה שלך לכסף</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          {[
            { num: '01', title: 'התחל מוקדם', text: 'כל שנה שמקדים שווה יותר מכל שנה שמאחר. הזמן הוא הנכס הכי יקר שלך.' },
            { num: '02', title: 'עקביות מנצחת', text: 'הפקדה קבועה כל חודש, גם סכום קטן, מצטברת לסכום גדול לאורך שנים.' },
            { num: '03', title: 'הבן את הכלים', text: 'משכנתא, פנסיה, השקעות — מי שמבין את המספרים מקבל החלטות טובות יותר.' },
          ].map(({ num, title, text }) => (
            <div key={num}>
              <div style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '0.1em', marginBottom: '6px', fontFamily: "'DM Sans', sans-serif" }}>{num}</div>
              <div style={{ fontSize: '15px', color: '#F0EDE6', fontWeight: 500, marginBottom: '6px', fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
              <div style={{ fontSize: '13px', color: '#8A8A9A', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{text}</div>
            </div>
          ))}
        </div>
        <div style={s.statsRow}>
          {[
            { num: '5', label: 'מחשבונים' },
            { num: '100%', label: 'חינמי' },
            { num: '∞', label: 'חישובים' },
          ].map(({ num, label }) => (
            <div key={label} style={s.stat}>
              <div style={s.statNum}>{num}</div>
              <div style={s.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
