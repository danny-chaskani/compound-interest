import React from 'react';

const s = {
  section: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '2rem 1.5rem 5rem',
  },
  card: {
    background: '#161820',
    border: '0.5px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    padding: '2.5rem',
  },
  h2: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.8rem',
    color: '#F0EDE6',
    marginBottom: '1rem',
  },
  p: {
    color: '#8A8A9A',
    fontSize: '15px',
    lineHeight: 1.8,
    marginBottom: '1.2rem',
    fontFamily: "'DM Sans', sans-serif",
  },
  h3: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.1rem',
    color: '#C9A84C',
    margin: '2rem 0 0.75rem',
  },
  formula: {
    background: '#1E2029',
    border: '0.5px solid rgba(201,168,76,0.2)',
    borderRadius: '10px',
    padding: '1.2rem 1.5rem',
    margin: '1.5rem 0',
    direction: 'ltr',
    textAlign: 'center',
  },
  formulaText: {
    color: '#C9A84C',
    fontSize: '15px',
    fontFamily: 'monospace',
    letterSpacing: '0.02em',
  },
  formulaCaption: {
    color: '#5A5A6A',
    fontSize: '12px',
    marginTop: '6px',
    fontFamily: "'DM Sans', sans-serif",
  },
};

export default function About() {
  return (
    <section id="about" style={s.section}>
      <div style={s.card}>
        <h2 style={s.h2}>מה זה ריבית דה ריבית?</h2>

        <p style={s.p}>
          ריבית דה ריבית (Compound Interest) היא אחד המושגים החשובים ביותר בעולם הפיננסים.
          הרעיון פשוט: אתה מרוויח ריבית לא רק על הסכום המקורי שהשקעת, אלא גם על הריבית שכבר צברת.
          זהו אפקט "כדור השלג" — ככל שעובר הזמן, הצמיחה מואצת.
        </p>

        <p style={s.p}>
          אלברט איינשטיין כינה את ריבית דה ריבית "הפלא השמיני של העולם". בין אם זה נכון ולא,
          ברור שהבנת המושג יכולה לשנות את העתיד הפיננסי שלך.
        </p>

        <h3 style={s.h3}>הנוסחה המתמטית</h3>

        <div style={s.formula}>
          <div style={s.formulaText}>A = P(1 + r/n)^(nt)</div>
          <div style={s.formulaCaption}>
            A = סכום סופי | P = קרן | r = ריבית שנתית | n = תדירות חישוב | t = שנים
          </div>
        </div>

        <h3 style={s.h3}>דוגמה מעשית</h3>
        <p style={s.p}>
          נניח שהשקעת ₪10,000 בריבית שנתית של 7% למשך 30 שנה.
          עם ריבית פשוטה היית מקבל ₪31,000. אבל עם ריבית דה ריבית — תקבל <strong style={{ color: '#C9A84C' }}>₪76,123</strong>.
          ההבדל הוא כוח הצמיחה המצטברת.
        </p>

        <h3 style={s.h3}>טיפים להשקעה חכמה</h3>
        <p style={s.p}>
          ✦ התחל מוקדם — כל שנה שמקדים משמעותית יותר מכל שנה שמאחר<br />
          ✦ הוסף הפקדות חודשיות קבועות — גם סכום קטן מצטבר לסכום גדול<br />
          ✦ שים לב לתדירות חישוב הריבית — חודשית עדיפה על שנתית<br />
          ✦ השוק ההיסטורי ב-S&P 500 נתן בממוצע כ-10% שנתי לאורך עשרות שנים
        </p>
      </div>
    </section>
  );
}
