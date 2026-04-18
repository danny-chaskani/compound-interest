import React, { useState, useMemo } from 'react';
import ShareBar from './ShareBar';

const fmt = (n) => '₪' + Math.round(n).toLocaleString('he-IL');

function calcFinal(P, r, t, pmt, n) {
  const periods = t * n;
  const rn = r / n;
  const compound = P * Math.pow(1 + rn, periods);
  const monthly_n = pmt * (n / 12);
  const annuity = monthly_n > 0 ? monthly_n * ((Math.pow(1 + rn, periods) - 1) / rn) : 0;
  return compound + annuity;
}

const s = {
  wrapper: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' },
  card: { background: '#161820', border: '0.5px solid rgba(201,168,76,0.18)', borderRadius: '20px', overflow: 'hidden' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' },
  inputs: { padding: '2rem', borderLeft: '0.5px solid rgba(255,255,255,0.07)' },
  results: { padding: '2rem', background: '#1E2029', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  panelTitle: { fontSize: '12px', color: '#8A8A9A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: "'DM Sans', sans-serif" },
  field: { marginBottom: '1.4rem' },
  label: { fontSize: '13px', color: '#8A8A9A', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans', sans-serif" },
  val: { color: '#C9A84C', fontWeight: 500 },
  textInput: { width: '100%', background: '#252733', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#F0EDE6', padding: '10px 12px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', outline: 'none', direction: 'ltr', textAlign: 'right' },
  resultMain: { background: '#252733', border: '0.5px solid rgba(201,168,76,0.18)', borderRadius: '12px', padding: '1.2rem', textAlign: 'center' },
  resultMainLabel: { fontSize: '12px', color: '#8A8A9A', marginBottom: '6px', fontFamily: "'DM Sans', sans-serif" },
  resultMainAmount: { fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#C9A84C', fontWeight: 700 },
  row: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.07)', fontSize: '14px', fontFamily: "'DM Sans', sans-serif" },
  rowKey: { color: '#8A8A9A' },
  rowVal: { color: '#F0EDE6', fontWeight: 500 },
  rowValGreen: { color: '#4CAF7A', fontWeight: 500 },
  chartSection: { padding: '1.5rem 2rem', borderTop: '0.5px solid rgba(255,255,255,0.07)' },
  chartTitle: { fontSize: '12px', color: '#8A8A9A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: "'DM Sans', sans-serif" },
  chartBars: { display: 'flex', alignItems: 'flex-end', gap: '4px', height: '120px' },
  legend: { display: 'flex', gap: '1.5rem', marginTop: '0.75rem', fontSize: '12px', color: '#8A8A9A', fontFamily: "'DM Sans', sans-serif" },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  legendDot: { width: '10px', height: '10px', borderRadius: '2px', flexShrink: 0 },
};

export default function Calculator() {
  const [principal, setPrincipal] = useState(10000);
  const [principalInput, setPrincipalInput] = useState('10,000');
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [monthly, setMonthly] = useState(500);
  const [monthlyInput, setMonthlyInput] = useState('500');
  const [freq, setFreq] = useState(1);

  const r = rate / 100;

  const handlePrincipalChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw) || 0;
    setPrincipal(num);
    setPrincipalInput(num.toLocaleString('he-IL'));
  };

  const handleMonthlyChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw) || 0;
    setMonthly(num);
    setMonthlyInput(num.toLocaleString('he-IL'));
  };

  const finalAmt = useMemo(() => calcFinal(principal, r, years, monthly, freq), [principal, r, years, monthly, freq]);
  const totalDeposits = monthly * 12 * years;
  const interestEarned = finalAmt - principal - totalDeposits;
  const multiple = principal > 0 ? (finalAmt / principal).toFixed(1) : '—';
  const yr11 = useMemo(() => calcFinal(principal, r, 11, monthly, freq), [principal, r, monthly, freq]);

  const step = years <= 10 ? 1 : years <= 20 ? 2 : 5;
  const yearsArr = [];
  for (let y = step; y <= years; y += step) yearsArr.push(y);
  if (yearsArr[yearsArr.length - 1] !== years) yearsArr.push(years);

  const vals = yearsArr.map(y => calcFinal(principal, r, y, monthly, freq));
  const principals = yearsArr.map(y => Math.min(principal + monthly * 12 * y, calcFinal(principal, r, y, monthly, freq)));
  const maxVal = Math.max(...vals, 1);

  const shareResults = [
    { key: 'סכום התחלתי', val: fmt(principal) },
    { key: 'ריבית שנתית', val: rate + '%' },
    { key: 'תקופה', val: years + ' שנה' },
    { key: 'הפקדה חודשית', val: fmt(monthly) },
    { key: 'סכום סופי צפוי', val: fmt(finalAmt) },
    { key: 'רווח מריבית', val: '+' + fmt(interestEarned) },
    { key: 'כפולת הכסף', val: 'x' + multiple },
  ];

  return (
    <div style={s.wrapper} id="calculator">
      <div style={s.card}>
        <div style={s.grid}>
          <div style={s.inputs}>
            <div style={s.panelTitle}>פרמטרים</div>
            <div style={s.field}>
              <label style={s.label}>סכום התחלתי (₪)</label>
              <input type="text" inputMode="numeric" style={s.textInput} value={principalInput} onChange={handlePrincipalChange} placeholder="10,000" />
            </div>
            <div style={s.field}>
              <label style={s.label}>ריבית שנתית <span style={s.val}>{rate}%</span></label>
              <input type="range" min="1" max="20" step="0.5" value={rate} onChange={e => setRate(+e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>תקופת השקעה <span style={s.val}>{years} שנה</span></label>
              <input type="range" min="1" max="40" step="1" value={years} onChange={e => setYears(+e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>הפקדה חודשית (₪)</label>
              <input type="text" inputMode="numeric" style={s.textInput} value={monthlyInput} onChange={handleMonthlyChange} placeholder="500" />
            </div>
            <div style={s.field}>
              <label style={{ ...s.label, display: 'block', marginBottom: '8px' }}>תדירות חישוב ריבית</label>
              <select value={freq} onChange={e => setFreq(+e.target.value)}>
                <option value={12}>חודשית</option>
                <option value={4}>רבעונית</option>
                <option value={1}>שנתית</option>
              </select>
            </div>
          </div>
          <div style={s.results}>
            <div style={s.panelTitle}>תוצאות</div>
            <div style={s.resultMain}>
              <div style={s.resultMainLabel}>סכום סופי צפוי</div>
              <div style={s.resultMainAmount}>{fmt(finalAmt)}</div>
            </div>
            <div>
              {[
                { key: 'סכום התחלתי', val: fmt(principal), green: false },
                { key: 'סה"כ הפקדות חודשיות', val: fmt(totalDeposits), green: false },
                { key: 'רווח מריבית דה ריבית', val: '+' + fmt(interestEarned), green: true },
                { key: 'כפולת הכסף', val: 'x' + multiple, green: true },
                { key: 'שווי בשנה ה-11', val: fmt(yr11), green: false },
              ].map(({ key, val, green }, i) => (
                <div key={i} style={{ ...s.row, borderBottom: i === 4 ? 'none' : s.row.borderBottom }}>
                  <span style={s.rowKey}>{key}</span>
                  <span style={green ? s.rowValGreen : s.rowVal}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={s.chartSection}>
          <div style={s.chartTitle}>צמיחה לאורך השנים</div>
          <div style={s.chartBars}>
            {yearsArr.map((y, i) => {
              const total = vals[i];
              const princ = principals[i];
              const interest = total - princ;
              const princH = (princ / maxVal) * 100;
              const intH = (interest / maxVal) * 100;
              return (
                <div key={y} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ width: '100%', background: '#C9A84C', borderRadius: '3px 3px 0 0', height: `${intH}%`, opacity: 0.85, minHeight: interest > 0 ? '2px' : '0' }} />
                  <div style={{ width: '100%', background: '#252733', height: `${princH}%`, minHeight: '2px' }} />
                  <div style={{ fontSize: '9px', color: '#5A5A6A', marginTop: '4px', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" }}>{y}י׳</div>
                </div>
              );
            })}
          </div>
          <div style={s.legend}>
            <div style={s.legendItem}><div style={{ ...s.legendDot, background: '#252733', border: '1px solid rgba(201,168,76,0.3)' }} />קרן</div>
            <div style={s.legendItem}><div style={{ ...s.legendDot, background: '#C9A84C' }} />ריבית צבורה</div>
          </div>
        </div>
        <ShareBar title="מחשבון ריבית דה ריבית" results={shareResults} />
      </div>
    </div>
  );
}
