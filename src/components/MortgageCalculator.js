import React, { useState, useMemo } from 'react';
import ShareBar from './ShareBar';
import SliderField from './SliderField';

const fmt = (n) => '₪' + Math.round(n).toLocaleString('he-IL');

const s = {
  wrapper: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 2rem' },
  card: { background: '#161820', border: '0.5px solid rgba(201,168,76,0.18)', borderRadius: '20px', overflow: 'hidden' },
  header: { padding: '1.5rem 2rem', borderBottom: '0.5px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '12px' },
  headerIcon: { width: '36px', height: '36px', background: 'rgba(201,168,76,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' },
  headerTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#F0EDE6' },
  headerSub: { fontSize: '12px', color: '#8A8A9A', fontFamily: "'DM Sans', sans-serif" },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' },
  inputs: { padding: '1.5rem 2rem', borderLeft: '0.5px solid rgba(255,255,255,0.07)' },
  results: { padding: '1.5rem 2rem', background: '#1E2029' },
  fieldLabel: { fontSize: '13px', color: '#8A8A9A', marginBottom: '6px', fontFamily: "'DM Sans', sans-serif" },
  textInput: { width: '100%', background: '#252733', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#F0EDE6', padding: '9px 12px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', direction: 'ltr', textAlign: 'right', marginBottom: '1.2rem' },
  resultMain: { background: '#252733', border: '0.5px solid rgba(201,168,76,0.18)', borderRadius: '10px', padding: '1rem', textAlign: 'center', marginBottom: '1rem' },
  resultMainLabel: { fontSize: '11px', color: '#8A8A9A', marginBottom: '4px', fontFamily: "'DM Sans', sans-serif" },
  resultMainAmount: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#C9A84C', fontWeight: 700 },
  row: { display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid rgba(255,255,255,0.07)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif" },
  rowKey: { color: '#8A8A9A' },
  rowVal: { color: '#F0EDE6', fontWeight: 500 },
  rowValRed: { color: '#E07070', fontWeight: 500 },
};

export default function MortgageCalculator() {
  const [loanInput, setLoanInput] = useState('1,000,000');
  const [loan, setLoan] = useState(1000000);
  const [rate, setRate] = useState(4);
  const [years, setYears] = useState(25);

  const handleLoanChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw) || 0;
    setLoan(num);
    setLoanInput(num.toLocaleString('he-IL'));
  };

  const results = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) { const monthly = loan / n; return { monthly, totalPaid: monthly * n, totalInterest: 0 }; }
    const monthly = loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    return { monthly, totalPaid, totalInterest: totalPaid - loan };
  }, [loan, rate, years]);

  return (
    <div style={s.wrapper} id="mortgage">
      <div style={s.card}>
        <div style={s.header}>
          <div style={s.headerIcon}>🏠</div>
          <div>
            <div style={s.headerTitle}>מחשבון משכנתא</div>
            <div style={s.headerSub}>מה ההחזר החודשי שלך?</div>
          </div>
        </div>
        <div style={s.grid}>
          <div style={s.inputs}>
            <div style={s.fieldLabel}>סכום הלוואה (₪)</div>
            <input type="text" inputMode="numeric" style={s.textInput} value={loanInput} onChange={handleLoanChange} placeholder="1,000,000" />
            <SliderField label="ריבית שנתית" value={rate} min={1} max={10} step={0.1} onChange={setRate} suffix="%" isRate={true} />
            <SliderField label="תקופת הלוואה" value={years} min={5} max={30} step={1} onChange={setYears} suffix="שנה" />
          </div>
          <div style={s.results}>
            <div style={s.resultMain}>
              <div style={s.resultMainLabel}>החזר חודשי</div>
              <div style={s.resultMainAmount}>{fmt(results.monthly)}</div>
            </div>
            {[
              { key: 'סכום הלוואה', val: fmt(loan), red: false },
              { key: 'סה"כ תשלום', val: fmt(results.totalPaid), red: false },
              { key: 'סה"כ ריבית', val: fmt(results.totalInterest), red: true },
              { key: 'תקופה', val: years + ' שנה (' + (years * 12) + ' תשלומים)', red: false },
            ].map(({ key, val, red }, i) => (
              <div key={i} style={{ ...s.row, borderBottom: i === 3 ? 'none' : s.row.borderBottom }}>
                <span style={s.rowKey}>{key}</span>
                <span style={red ? s.rowValRed : s.rowVal}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <ShareBar title="מחשבון משכנתא" results={[
          { key: 'סכום הלוואה', val: fmt(loan) },
          { key: 'ריבית שנתית', val: rate + '%' },
          { key: 'תקופה', val: years + ' שנה' },
          { key: 'החזר חודשי', val: fmt(results.monthly) },
          { key: 'סה"כ ריבית', val: fmt(results.totalInterest) },
        ]} />
      </div>
    </div>
  );
}
