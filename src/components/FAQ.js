import React, { useState } from 'react';

const faqs = [
  {
    q: 'מה זה ריבית דה ריבית?',
    a: 'ריבית דה ריבית היא ריבית שמחושבת גם על הריבית שכבר צברת, ולא רק על הקרן המקורית. כך הכסף שלך גדל בקצב מואץ לאורך הזמן — ככל שהתקופה ארוכה יותר, האפקט חזק יותר.',
  },
  {
    q: 'מה ההבדל בין ריבית פשוטה לריבית דה ריבית?',
    a: 'ריבית פשוטה מחושבת רק על הקרן המקורית. ריבית דה ריבית מחושבת גם על הריבית שנצברה. לדוגמה: ₪10,000 ב-7% ל-30 שנה — ריבית פשוטה: ₪31,000. ריבית דה ריבית: ₪76,123.',
  },
  {
    q: 'מתי כדאי להתחיל לחסוך?',
    a: 'כמה שיותר מוקדם. כל שנה שמקדים משמעותית — ₪1,000 שמושקעים בגיל 25 שווים הרבה יותר מ-₪1,000 שמושקעים בגיל 35, בגלל אפקט הריבית דה ריבית לאורך זמן.',
  },
  {
    q: 'מה תדירות חישוב הריבית ולמה זה חשוב?',
    a: 'ריבית חודשית עדיפה על שנתית — כל חישוב מוסיף ריבית על הריבית שנצברה. ריבית של 7% שנתי עם חישוב חודשי נותנת תשואה אפקטיבית של כ-7.23% בפועל.',
  },
  {
    q: 'כמה כדאי לחסוך כל חודש?',
    a: 'הכלל המקובל הוא לחסוך לפחות 10-15% מההכנסה. אפילו ₪200-300 בחודש, בריבית של 7% ל-30 שנה, מסתכמים ביותר מ-₪220,000. השתמש במחשבון החיסכון שלנו לחישוב מדויק.',
  },
  {
    q: 'האם המחשבון מדויק?',
    a: 'המחשבון משתמש בנוסחאות מתמטיות מדויקות לחישוב ריבית דה ריבית. עם זאת, התוצאות הן הערכה בלבד — תשואות בפועל תלויות בשוק, מיסוי ועמלות. המידע אינו מהווה ייעוץ פיננסי.',
  },
];

const s = {
  section: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' },
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#F0EDE6', marginBottom: '1.5rem' },
  item: { borderBottom: '0.5px solid rgba(255,255,255,0.07)', overflow: 'hidden' },
  question: { width: '100%', background: 'none', border: 'none', color: '#F0EDE6', padding: '1.1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '15px', fontFamily: "'DM Sans', sans-serif", textAlign: 'right' },
  arrow: (open) => ({ color: '#C9A84C', fontSize: '18px', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0, marginRight: '1rem' }),  // note: marginRight for RTL = left side
  answer: (open) => ({ maxHeight: open ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease', color: '#8A8A9A', fontSize: '14px', lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", paddingBottom: open ? '1rem' : '0' }),
};

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={s.section}>
      <h2 style={s.title}>שאלות נפוצות</h2>
      {faqs.map((faq, i) => (
        <div key={i} style={s.item}>
          <button style={s.question} onClick={() => setOpen(open === i ? null : i)}>
            <span>{faq.q}</span>
            <span style={s.arrow(open === i)}>⌃</span>
          </button>
          <div style={s.answer(open === i)}>
            {faq.a}
          </div>
        </div>
      ))}
    </section>
  );
}
