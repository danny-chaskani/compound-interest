import React, { useState, useMemo } from 'react';
import ShareBar from './ShareBar';
import { SliderField } from './Calculator';

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
  resultMainAmount: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#E07070', fontWeight: 700 },
  row: { display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid rgba(255,255,255,0.07)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif" },
  rowKey: { color: '#8A8A9A' },
  rowVal: { color: '#F0EDE6', fontWeight: 500 },
  rowValRed: { color: '#E07070', fontWeight: 500 },
  note: { fontSize: '12px', color: '#5A5A6A', marginTop: '1rem', lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" },
};

export default function InflationCalculator() {
  const [amountInput, setAmountInput] = useState('100,000');
  const [amount, setAmount] = useState(100000);
  const [inflation, setInflation] = useState(3);
  const [years, setYears] = useState(20);

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw) || 0;
    setAmount(num); setAmountInput(num.toLocaleString('he-IL'));
  };

  const results = useMemo(() => {
    const futureValue = amount * Math.pow(1 + inflation / 100, years);
    const realValue = amount / Math.pow(1 + inflation / 100, years);
    const loss = amount - realValue;
    return { futureValue, realValue, loss, lossPercent: ((loss / amount) * 100).toFixed(1) };
  }, [amount, inflation, years]);

  return (
    <div style={s.wrapper} id="inflation">
      <div style={s.card}>
        <div style={s.header}>
          <div style={s.headerIcon}>📉</div>
          <div>
            <div style={s.headerTitle}>מחשבון אינפלציה</div>
            <div style={s.headerSub}>כמה הכסף שלך שווה בעתיד?</div>
          </div>
        </div>
        <div style={s.grid}>
          <div style={s.inputs}>
            <div style={s.fieldLabel}>סכום היום (₪)</div>
            <input type="text" inputMode="numeric" style={s.textInput} value={amountInput} onChange={handleAmountChange} placeholder="100,000" />
            <SliderField label="שיעור אינפלציה שנתי" value={inflation} min={0.5} max={10} step={0.5} onChange={setInflation} suffix="%" />
            <SliderField label="מספר שנים" value={years} min={1} max={40} step={1} onChange={setYears} suffix="שנה" />
            <div style={s.note}>ממוצע האינפלציה בישראל עומד על כ-3%-4% בשנה.</div>
          </div>
          <div style={s.results}>
            <div style={s.resultMain}>
              <div style={s.resultMainLabel}>ערך ריאלי בעוד {years} שנה</div>
              <div style={s.resultMainAmount}>{fmt(results.realValue)}</div>
            </div>
            {[
              { key: 'ערך היום', val: fmt(amount), red: false },
              { key: 'שחיקת ערך', val: '-' + fmt(results.loss), red: true },
              { key: 'אחוז שחיקה', val: results.lossPercent + '%', red: true },
              { key: 'נדרש לשמור ערך', val: fmt(results.futureValue), red: false },
            ].map(({ key, val, red }, i) => (
              <div key={i} style={{ ...s.row, borderBottom: i === 3 ? 'none' : s.row.borderBottom }}>
                <span style={s.rowKey}>{key}</span>
                <span style={red ? s.rowValRed : s.rowVal}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <ShareBar title="מחשבון אינפלציה" results={[
          { key: 'סכום היום', val: fmt(amount) },
          { key: 'אינפלציה', val: inflation + '%' },
          { key: 'תקופה', val: years + ' שנה' },
          { key: 'ערך ריאלי', val: fmt(results.realValue) },
          { key: 'שחיקת ערך', val: results.lossPercent + '%' },
        ]} />
      </div>
    </div>
  );
}
