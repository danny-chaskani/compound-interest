import React, { useState, useMemo } from 'react';

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
    const totalFund = rn > 0
      ? monthlyTotal * ((Math.pow(1 + rn, periods) - 1) / rn)
      : monthlyTotal * periods;
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
            <div style={s.field}>
              <label style={s.label}>משכורת ברוטו חודשית (₪)</label>
              <input type="text" inputMode="numeric" style={s.textInput} value={salaryInput} onChange={handleSalaryChange} placeholder="15,000" />
            </div>
            <div style={s.field}>
              <label style={s.label}>גיל נוכחי <span style={s.val}>{age}</span></label>
              <input type="range" min="20" max="60" value={age} onChange={e => setAge(+e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>גיל פרישה <span style={s.val}>{retireAge}</span></label>
              <input type="range" min="60" max="70" value={retireAge} onChange={e => setRetireAge(+e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>תשואה שנתית צפויה <span style={s.val}>{rate}%</span></label>
              <input type="range" min="1" max="10" step="0.5" value={rate} onChange={e => setRate(+e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>הפרשת עובד <span style={s.val}>{employeeRate}%</span></label>
              <input type="range" min="5" max="7" step="0.5" value={employeeRate} onChange={e => setEmployeeRate(+e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>הפרשת מעסיק <span style={s.val}>{employerRate}%</span></label>
              <input type="range" min="5" max="8.333" step="0.333" value={employerRate} onChange={e => setEmployerRate(+e.target.value)} />
            </div>
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
      </div>
    </div>
  );
}
