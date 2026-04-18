import React from 'react';

const s = {
  bar: {
    display: 'flex',
    gap: '8px',
    padding: '1rem 2rem',
    borderTop: '0.5px solid rgba(255,255,255,0.07)',
    justifyContent: 'flex-end',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 14px',
    borderRadius: '20px',
    border: '0.5px solid rgba(255,255,255,0.12)',
    background: 'transparent',
    color: '#8A8A9A',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all 0.2s',
  },
};

export default function ShareBar({ title, results }) {
  const handleShare = async () => {
    const text = `${title}\n${results.map(r => `${r.key}: ${r.val}`).join('\n')}\n\nחושב ב: ${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text });
      } catch (e) {}
    } else {
      await navigator.clipboard.writeText(text);
      alert('התוצאות הועתקו ללוח!');
    }
  };

  const handlePrint = () => {
    const content = `
      <html dir="rtl">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; color: #333; direction: rtl; }
          h1 { color: #C9A84C; border-bottom: 2px solid #C9A84C; padding-bottom: 0.5rem; }
          table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
          td { padding: 10px; border-bottom: 1px solid #eee; }
          td:last-child { text-align: left; font-weight: bold; }
          .footer { margin-top: 2rem; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <h1>ריביתחכמה — ${title}</h1>
        <table>
          ${results.map(r => `<tr><td>${r.key}</td><td>${r.val}</td></tr>`).join('')}
        </table>
        <div class="footer">
          הופק מ-ריביתחכמה.co.il · המידע הוא לצרכי מידע בלבד ואינו ייעוץ פיננסי
        </div>
      </body>
      </html>
    `;
    const win = window.open('', '_blank');
    win.document.write(content);
    win.document.close();
    win.print();
  };

  return (
    <div style={s.bar}>
      <button style={s.btn} onClick={handleShare}>
        ⬆ שתף תוצאות
      </button>
      <button style={s.btn} onClick={handlePrint}>
        🖨 הדפס / PDF
      </button>
    </div>
  );
}
