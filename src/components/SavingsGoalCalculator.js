import React, { useState, useMemo } from 'react';
import ShareBar from './ShareBar';

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
  field: { marginBottom: '1.2rem' },
  label: { fontSize: '13px', color: '#8A8A9A', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans', sans-serif" },
  val: { color: '#C9A84C', fontWeight: 500 },
  textInput: { width: '100%', background: '#252733', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#F0EDE6', padding: '9px 12px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', direction: 'ltr', textAlign: 'right' },
  resultMain: { background: '#252733', border: '0.5px solid rgba(201,168,76,0.18)', borderRadius: '10px', padding: '1rem', textAlign: 'center', marginBottom: '1rem' },
  resultMainLabel: { fontSize: '11px', color: '#8A8A9A', marginBottom: '4px', fontFamily: "'DM Sans', sans-serif" },
  resultMainAmount: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#C9A84C', fontWeight: 700 },
  row: { display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid rgba(255,255,255,0.07)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif" },
  rowKey: { color: '#8A8A9A' },
  rowVal: { color: '#F0EDE6', fontWeight: 500 },
  rowValGreen: { color: '#4CAF7A', fontWeight: 500 },
};

export default function SavingsGoalCalculator() {
  const [goalInput, setGoalInput] = useState('100,000');
  const [goal, setGoal] = useState(100000);
  const [currentInput, setCurrentInput] = useState('0');
  const [current, setCurrent] = useState(0);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(5);

  const handleGoalChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw) || 0;
    setGoal(num);
    setGoalInput(num.toLocaleString('he-IL'));
  };

  const handleCurrentChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw) || 0;
    setCurrent(num);
    setCurrentInput(num.toLocaleString('he-IL'));
  };

  const results = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const futureValueOfCurrent = current * Math.pow(1 + r, n);
    const remaining = Math.max(goal - futureValueOfCurrent, 0);
    let monthlySaving;
    if (r === 0) {
      monthlySaving = remaining / n;
    } else {
      monthlySaving = remaining * r / (Math.pow(1 + r, n) - 1);
    }
    const totalDeposited = monthlySaving * n + current;
    const interestEarned = goal - totalDeposited;
    return { monthlySaving, totalDeposited, interestEarned: Math.max(interestEarned, 0) };
  }, [goal, current, rate, years]);

  return (
    <div style={s.wrapper} id="savings">
      <div style={s.card}>
        <div style={s.header}>
          <div style={s.headerIcon}>🎯</div>
          <div>
            <div style={s.headerTitle}>מחשבון חיסכון ליעד</div>
            <div style={s.headerSub}>כמה לחסוך כל חודש?</div>
          </div>
        </div>
        <div style={s.grid}>
          <div style={s.inputs}>
            <div style={s.field}>
              <label style={s.label}>יעד חיסכון (₪)</label>
              <input type="text" inputMode="numeric" style={s.textInput} value={goalInput} onChange={handleGoalChange} placeholder="100,000" />
            </div>
            <div style={s.field}>
              <label style={s.label}>חיסכון קיים (₪)</label>
              <input type="text" inputMode="numeric" style={s.textInput} value={currentInput} onChange={handleCurrentChange} placeholder="0" />
            </div>
            <div style={s.field}>
              <label style={s.label}>ריבית שנתית <span style={s.val}>{rate}%</span></label>
              <input type="range" min="1" max="15" step="0.5" value={rate} onChange={e => setRate(+e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>תוך כמה זמן <span style={s.val}>{years} שנה</span></label>
              <input type="range" min="1" max="30" step="1" value={years} onChange={e => setYears(+e.target.value)} />
            </div>
          </div>
          <div style={s.results}>
            <div style={s.resultMain}>
              <div style={s.resultMainLabel}>חיסכון חודשי נדרש</div>
              <div style={s.resultMainAmount}>{fmt(results.monthlySaving)}</div>
            </div>
            {[
              { key: 'יעד', val: fmt(goal), green: false },
              { key: 'סה"כ הפקדות', val: fmt(results.totalDeposited), green: false },
              { key: 'תרומת הריבית', val: '+' + fmt(results.interestEarned), green: true },
              { key: 'תקופה', val: years + ' שנה (' + (years * 12) + ' חודשים)', green: false },
            ].map(({ key, val, green }, i) => (
              <div key={i} style={{ ...s.row, borderBottom: i === 3 ? 'none' : s.row.borderBottom }}>
                <span style={s.rowKey}>{key}</span>
                <span style={green ? s.rowValGreen : s.rowVal}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
