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
    setGoal(num); setGoalInput(num.toLocaleString('he-IL'));
  };

  const handleCurrentChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw) || 0;
    setCurrent(num); setCurrentInput(num.toLocaleString('he-IL'));
  };

  const results = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const futureValueOfCurrent = current * Math.pow(1 + r, n);
    const remaining = Math.max(goal - futureValueOfCurrent, 0);
    const monthlySaving = r === 0 ? remaining / n : remaining * r / (Math.pow(1 + r, n) - 1);
    const totalDeposited = monthlySaving * n + current;
    return { monthlySaving, totalDeposited, interestEarned: Math.max(goal - totalDeposited, 0) };
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
            <div style={s.fieldLabel}>יעד חיסכון (₪)</div>
            <input type="text" inputMode="numeric" style={s.textInput} value={goalInput} onChange={handleGoalChange} placeholder="100,000" />
            <div style={s.fieldLabel}>חיסכון קיים (₪)</div>
            <input type="text" inputMode="numeric" style={s.textInput} value={currentInput} onChange={handleCurrentChange} placeholder="0" />
            <SliderField label="ריבית שנתית" value={rate} min={1} max={15} step={0.5} onChange={setRate} suffix="%" isRate={true} />
            <SliderField label="תוך כמה זמן" value={years} min={1} max={30} step={1} onChange={setYears} suffix="שנה" />
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
        <ShareBar title="מחשבון חיסכון ליעד" results={[
          { key: 'יעד', val: fmt(goal) },
          { key: 'תקופה', val: years + ' שנה' },
          { key: 'חיסכון חודשי נדרש', val: fmt(results.monthlySaving) },
          { key: 'תרומת הריבית', val: '+' + fmt(results.interestEarned) },
        ]} />
      </div>
    </div>
  );
}
