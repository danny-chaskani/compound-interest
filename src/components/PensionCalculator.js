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
  resultMainAmount: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#C9A84C', fontWeight: 700 },
  row: { display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid rgba(255,255,255,0.07)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif" },
  rowKey: { color: '#8A8A9A' },
  rowVal: { color: '#F0EDE6', fontWeight: 500 },
  rowValGreen: { color: '#4CAF7A', fontWeight: 500 },
};

export default function PensionCalculator() {
  const [salaryInput, setSalaryInput] = useState('15,000');
  const [salary, setSalary] = useState(15000);
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(67);
  const [rate, setRate] = useState(5);
  const [employeeRate, setEmployeeRate] = useState(6);
  const [employerRate, setEmployerRate] = useState(6.5);

  const handleSalaryChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw) || 0;
    setSalary(num);
    setSalaryInput(num.toLocaleString('he-IL'));
  };

  const years = Math.max(retireAge - age, 0);
  const r = rate / 100;

  const results = useMemo(() => {
    const monthlyTotal = salary * (employeeRate + employerRate) / 100;
    const n = 12;
    const rn = r / n;
    const periods = years * n;
    const totalFund = rn > 0 ? monthlyTotal * ((Math.pow(1 + rn, periods) - 1) / rn) : monthlyTotal * periods;
    const monthlyPension = totalFund / (20 * 12);
    const totalDeposited = monthlyTotal * 12 * years;
    return { totalFund, monthlyPension, totalDeposited, monthlyTotal };
  }, [salary, years, r, employeeRate, employerRate]);

  return (
    <div style={s.wrapper} id="pension">
      <div style={s.card}>
        <div style={s.header}>
          <div style={s.headerIcon}>🏦</div>
          <div>
            <div style={s.headerTitle}>מחשבון קרן פנסיה</div>
            <div style={s.headerSub}>כמה תקבל בפנסיה?</div>
          </div>
        </div>
        <div style={s.grid}>
          <div style={s.inputs}>
            <div style={s.fieldLabel}>משכורת ברוטו חודשית (₪)</div>
            <input type="text" inputMode="numeric" style={s.textInput} value={salaryInput} onChange={handleSalaryChange} placeholder="15,000" />
            <SliderField label="גיל נוכחי" value={age} min={20} max={60} step={1} onChange={setAge} suffix="שנה" />
            <SliderField label="גיל פרישה" value={retireAge} min={60} max={70} step={1} onChange={setRetireAge} suffix="שנה" />
            <SliderField label="תשואה שנתית צפויה" value={rate} min={1} max={10} step={0.5} onChange={setRate} suffix="%" />
            <SliderField label="הפרשת עובד" value={employeeRate} min={5} max={7} step={0.5} onChange={setEmployeeRate} suffix="%" />
            <SliderField label="הפרשת מעסיק" value={employerRate} min={5} max={8.5} step={0.5} onChange={setEmployerRate} suffix="%" />
          </div>
          <div style={s.results}>
            <div style={s.resultMain}>
              <div style={s.resultMainLabel}>קצבה חודשית צפויה</div>
              <div style={s.resultMainAmount}>{fmt(results.monthlyPension)}</div>
            </div>
            {[
              { key: 'שנות חיסכון', val: years + ' שנה', green: false },
              { key: 'הפרשה חודשית כוללת', val: fmt(results.monthlyTotal), green: false },
              { key: 'סה"כ צבירה', val: fmt(results.totalFund), green: true },
              { key: 'סה"כ הופקד', val: fmt(results.totalDeposited), green: false },
              { key: 'רווח מתשואה', val: '+' + fmt(results.totalFund - results.totalDeposited), green: true },
            ].map(({ key, val, green }, i) => (
              <div key={i} style={{ ...s.row, borderBottom: i === 4 ? 'none' : s.row.borderBottom }}>
                <span style={s.rowKey}>{key}</span>
                <span style={green ? s.rowValGreen : s.rowVal}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <ShareBar title="מחשבון קרן פנסיה" results={[
          { key: 'משכורת', val: fmt(salary) },
          { key: 'שנות חיסכון', val: years + ' שנה' },
          { key: 'קצבה חודשית צפויה', val: fmt(results.monthlyPension) },
          { key: 'סה"כ צבירה', val: fmt(results.totalFund) },
          { key: 'רווח מתשואה', val: '+' + fmt(results.totalFund - results.totalDeposited) },
        ]} />
      </div>
    </div>
  );
}
