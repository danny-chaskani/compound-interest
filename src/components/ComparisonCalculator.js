import React, { useState, useMemo } from 'react';

const fmt = (n) => '₪' + Math.round(n).toLocaleString('he-IL');

function calcFinal(P, r, t, pmt) {
  const n = 12;
  const periods = t * n;
  const rn = r / n;
  const compound = P * Math.pow(1 + rn, periods);
  const annuity = pmt > 0 ? pmt * ((Math.pow(1 + rn, periods) - 1) / rn) : 0;
  return compound + annuity;
}

const gold = '#C9A84C';
const blue = '#5B9BD5';

const s = {
  wrapper: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' },
  card: { background: '#161820', border: '0.5px solid rgba(201,168,76,0.18)', borderRadius: '20px', overflow: 'hidden' },
  header: { padding: '1.5rem 2rem', borderBottom: '0.5px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '12px' },
  headerIcon: { width: '36px', height: '36px', background: 'rgba(201,168,76,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' },
  headerTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#F0EDE6' },
  headerSub: { fontSize: '12px', color: '#8A8A9A', fontFamily: "'DM Sans', sans-serif" },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 },
  scenario: (color) => ({
    padding: '1.5rem',
    borderLeft: `2px solid ${color}`,
    borderBottom: '0.5px solid rgba(255,255,255,0.07)',
  }),
  scenarioTitle: (color) => ({
    fontSize: '13px',
    fontWeight: 600,
    color,
    marginBottom: '1rem',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  }),
  field: { marginBottom: '1rem' },
  label: { fontSize: '12px', color: '#8A8A9A', marginBottom: '5px', display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans', sans-serif" },
  val: (color) => ({ color, fontWeight: 500 }),
  textInput: { width: '100%', background: '#252733', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#F0EDE6', padding: '8px 10px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', outline: 'none', direction: 'ltr', textAlign: 'right' },
  resultsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '0.5px solid rgba(255,255,255,0.07)' },
  resultCol: (color) => ({ padding: '1.5rem', borderLeft: `2px solid ${color}` }),
  resultMain: (color) => ({ background: '#1E2029', borderRadius: '10px', padding: '1rem', textAlign: 'center', marginBottom: '1rem', border: `0.5px solid ${color}33` }),
  resultMainLabel: { fontSize: '11px', color: '#8A8A9A', marginBottom: '4px', fontFamily: "'DM Sans', sans-serif" },
  resultMainAmount: (color) => ({ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color, fontWeight: 700 }),
  row: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(255,255,255,0.07)', fontSize: '12px', fontFamily: "'DM Sans', sans-serif" },
  rowKey: { color: '#8A8A9A' },
  rowVal: { color: '#F0EDE6', fontWeight: 500 },
  diffSection: { padding: '1.5rem 2rem', borderTop: '0.5px solid rgba(255,255,255,0.07)', background: '#1A1C24' },
  diffTitle: { fontSize: '12px', color: '#8A8A9A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: "'DM Sans', sans-serif" },
  diffGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
  diffCard: (positive) => ({ background: '#252733', borderRadius: '10px', padding: '1rem', textAlign: 'center', border: `0.5px solid ${positive ? 'rgba(76,175,122,0.3)' : 'rgba(224,112,112,0.3)'}` }),
  diffLabel: { fontSize: '11px', color: '#8A8A9A', marginBottom: '4px', fontFamily: "'DM Sans', sans-serif" },
  diffVal: (positive) => ({ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: positive ? '#4CAF7A' : '#E07070', fontWeight: 700 }),
  chartSection: { padding: '1.5rem 2rem', borderTop: '0.5px solid rgba(255,255,255,0.07)' },
  chartTitle: { fontSize: '12px', color: '#8A8A9A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: "'DM Sans', sans-serif" },
  chartBars: { display: 'flex', alignItems: 'flex-end', gap: '6px', height: '140px' },
  legend: { display: 'flex', gap: '1.5rem', marginTop: '0.75rem', fontSize: '12px', color: '#8A8A9A', fontFamily: "'DM Sans', sans-serif" },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  legendDot: { width: '10px', height: '10px', borderRadius: '2px', flexShrink: 0 },
};

function ScenarioInput({ title, color, data, onChange }) {
  return (
    <div style={s.scenario(color)}>
      <div style={s.scenarioTitle(color)}>{title}</div>

      <div style={s.field}>
        <label style={s.label}>סכום התחלתי (₪)</label>
        <input type="text" inputMode="numeric" style={s.textInput}
          value={data.principalInput}
          onChange={e => {
            const raw = e.target.value.replace(/[^\d]/g, '');
            const num = parseInt(raw) || 0;
            onChange({ ...data, principal: num, principalInput: num.toLocaleString('he-IL') });
          }}
          placeholder="10,000"
        />
      </div>

      <div style={s.field}>
        <label style={s.label}>ריבית שנתית <span style={s.val(color)}>{data.rate}%</span></label>
        <input type="range" min="1" max="20" step="0.5" value={data.rate}
          onChange={e => onChange({ ...data, rate: +e.target.value })} />
      </div>

      <div style={s.field}>
        <label style={s.label}>תקופה <span style={s.val(color)}>{data.years} שנה</span></label>
        <input type="range" min="1" max="40" step="1" value={data.years}
          onChange={e => onChange({ ...data, years: +e.target.value })} />
      </div>

      <div style={s.field}>
        <label style={s.label}>הפקדה חודשית (₪)</label>
        <input type="text" inputMode="numeric" style={s.textInput}
          value={data.monthlyInput}
          onChange={e => {
            const raw = e.target.value.replace(/[^\d]/g, '');
            const num = parseInt(raw) || 0;
            onChange({ ...data, monthly: num, monthlyInput: num.toLocaleString('he-IL') });
          }}
          placeholder="500"
        />
      </div>
    </div>
  );
}

export default function ComparisonCalculator() {
  const [a, setA] = useState({ principal: 10000, principalInput: '10,000', rate: 5, years: 20, monthly: 500, monthlyInput: '500' });
  const [b, setB] = useState({ principal: 10000, principalInput: '10,000', rate: 8, years: 20, monthly: 500, monthlyInput: '500' });

  const rA = a.rate / 100;
  const rB = b.rate / 100;

  const finalA = useMemo(() => calcFinal(a.principal, rA, a.years, a.monthly), [a]);
  const finalB = useMemo(() => calcFinal(b.principal, rB, b.years, b.monthly), [b]);

  const totalDepA = a.monthly * 12 * a.years + a.principal;
  const totalDepB = b.monthly * 12 * b.years + b.principal;
  const interestA = finalA - totalDepA;
  const interestB = finalB - totalDepB;
  const diff = finalB - finalA;
  const diffPct = finalA > 0 ? ((diff / finalA) * 100).toFixed(1) : 0;

  const maxYears = Math.max(a.years, b.years);
  const step = maxYears <= 10 ? 1 : maxYears <= 20 ? 2 : 5;
  const yearsArr = [];
  for (let y = step; y <= maxYears; y += step) yearsArr.push(y);
  if (yearsArr[yearsArr.length - 1] !== maxYears) yearsArr.push(maxYears);

  const valsA = yearsArr.map(y => calcFinal(a.principal, rA, Math.min(y, a.years), a.monthly));
  const valsB = yearsArr.map(y => calcFinal(b.principal, rB, Math.min(y, b.years), b.monthly));
  const maxVal = Math.max(...valsA, ...valsB, 1);

  return (
    <div style={s.wrapper} id="comparison">
      <div style={s.card}>
        <div style={s.header}>
          <div style={s.headerIcon}>⚖️</div>
          <div>
            <div style={s.headerTitle}>השוואת תרחישים</div>
            <div style={s.headerSub}>השווה בין שתי אסטרטגיות השקעה שונות</div>
          </div>
        </div>

        <div style={s.grid}>
          <ScenarioInput title="תרחיש א'" color={gold} data={a} onChange={setA} />
          <ScenarioInput title="תרחיש ב'" color={blue} data={b} onChange={setB} />
        </div>

        <div style={s.resultsGrid}>
          {[
            { label: 'תרחיש א\'', final: finalA, interest: interestA, color: gold },
            { label: 'תרחיש ב\'', final: finalB, interest: interestB, color: blue },
          ].map(({ label, final, interest, color }) => (
            <div key={label} style={s.resultCol(color)}>
              <div style={s.resultMain(color)}>
                <div style={s.resultMainLabel}>סכום סופי — {label}</div>
                <div style={s.resultMainAmount(color)}>{fmt(final)}</div>
              </div>
              <div style={{ ...s.row }}><span style={s.rowKey}>רווח מריבית</span><span style={{ ...s.rowVal, color }}>{'+' + fmt(interest)}</span></div>
              <div style={{ ...s.row, borderBottom: 'none' }}><span style={s.rowKey}>כפולת הכסף</span><span style={s.rowVal}>x{(final / (color === gold ? a.principal : b.principal)).toFixed(1)}</span></div>
            </div>
          ))}
        </div>

        <div style={s.diffSection}>
          <div style={s.diffTitle}>הפרש בין התרחישים</div>
          <div style={s.diffGrid}>
            <div style={s.diffCard(diff >= 0)}>
              <div style={s.diffLabel}>הפרש סופי</div>
              <div style={s.diffVal(diff >= 0)}>{diff >= 0 ? '+' : '-'}{fmt(Math.abs(diff))}</div>
            </div>
            <div style={s.diffCard(diff >= 0)}>
              <div style={s.diffLabel}>הפרש באחוזים</div>
              <div style={s.diffVal(diff >= 0)}>{diff >= 0 ? '+' : ''}{diffPct}%</div>
            </div>
            <div style={s.diffCard(diff >= 0)}>
              <div style={s.diffLabel}>עדיף</div>
              <div style={s.diffVal(diff >= 0)}>{diff >= 0 ? "תרחיש ב'" : "תרחיש א'"}</div>
            </div>
          </div>
        </div>

        <div style={s.chartSection}>
          <div style={s.chartTitle}>השוואה לאורך השנים</div>
          <div style={s.chartBars}>
            {yearsArr.map((y, i) => (
              <div key={y} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '2px' }}>
                <div style={{ width: '45%', background: gold, borderRadius: '2px 2px 0 0', height: `${(valsA[i] / maxVal) * 100}%`, minHeight: '2px', opacity: 0.85 }} />
                <div style={{ width: '45%', background: blue, borderRadius: '2px 2px 0 0', height: `${(valsB[i] / maxVal) * 100}%`, minHeight: '2px', opacity: 0.85 }} />
                <div style={{ fontSize: '9px', color: '#5A5A6A', marginTop: '4px', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" }}>{y}י׳</div>
              </div>
            ))}
          </div>
          <div style={s.legend}>
            <div style={s.legendItem}><div style={{ width: '10px', height: '10px', borderRadius: '2px', background: gold }} />תרחיש א׳</div>
            <div style={s.legendItem}><div style={{ width: '10px', height: '10px', borderRadius: '2px', background: blue }} />תרחיש ב׳</div>
          </div>
        </div>
      </div>
    </div>
  );
}
