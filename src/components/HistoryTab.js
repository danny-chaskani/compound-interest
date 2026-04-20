import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'ribit_history';

export function saveCalculation(type, params, results) {
  try {
    const history = getHistory();
    const entry = {
      id: Date.now(),
      type,
      name: '',
      date: new Date().toLocaleDateString('he-IL'),
      params,
      results,
    };
    history.unshift(entry);
    const trimmed = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    return entry.id;
  } catch (e) {
    return null;
  }
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function deleteEntry(id) {
  const history = getHistory().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function renameEntry(id, name) {
  const history = getHistory().map(e => e.id === id ? { ...e, name } : e);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportToCSV(history) {
  const rows = [['תאריך', 'סוג', 'שם', 'פרמטרים', 'תוצאות']];
  history.forEach(e => {
    const params = Object.entries(e.params).map(([k, v]) => `${k}: ${v}`).join(' | ');
    const results = Object.entries(e.results).map(([k, v]) => `${k}: ${v}`).join(' | ');
    rows.push([e.date, e.type, e.name || '—', params, results]);
  });
  const csv = '\uFEFF' + rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'חישובים_ריבית_חכמה.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const typeLabels = {
  compound: 'ריבית דה ריבית',
  mortgage: 'משכנתא',
  pension: 'פנסיה',
  savings: 'חיסכון ליעד',
  inflation: 'אינפלציה',
  comparison: 'השוואת תרחישים',
};

const typeColors = {
  compound: '#C9A84C',
  mortgage: '#5B9BD5',
  pension: '#4CAF7A',
  savings: '#E8A84C',
  inflation: '#E07070',
  comparison: '#9B7DE8',
};

const s = {
  wrapper: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' },
  empty: { textAlign: 'center', padding: '4rem 2rem', color: '#5A5A6A', fontFamily: "'DM Sans', sans-serif" },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem' },
  emptyText: { fontSize: '15px', marginBottom: '0.5rem', color: '#8A8A9A' },
  emptySubtext: { fontSize: '13px', color: '#5A5A6A' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '8px' },
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#F0EDE6' },
  btnRow: { display: 'flex', gap: '8px' },
  btn: (color) => ({ padding: '7px 14px', borderRadius: '20px', border: `0.5px solid ${color}33`, background: `${color}11`, color, fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }),
  card: { background: '#161820', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '1.2rem 1.5rem', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' },
  badge: (color) => ({ fontSize: '11px', background: `${color}18`, color, padding: '3px 10px', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }),
  nameInput: { background: 'transparent', border: 'none', borderBottom: '0.5px solid rgba(201,168,76,0.3)', color: '#F0EDE6', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", outline: 'none', width: '100%', padding: '2px 0' },
  date: { fontSize: '11px', color: '#5A5A6A', fontFamily: "'DM Sans', sans-serif", flexShrink: 0 },
  paramsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '6px' },
  param: { fontSize: '12px', color: '#8A8A9A', fontFamily: "'DM Sans', sans-serif" },
  paramVal: { color: '#F0EDE6', fontWeight: 500 },
  cardActions: { display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '0.5px solid rgba(255,255,255,0.07)', paddingTop: '10px' },
  actionBtn: (color) => ({ padding: '5px 12px', borderRadius: '12px', border: `0.5px solid ${color}44`, background: 'transparent', color, fontSize: '12px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }),
  compareSection: { background: '#1A1C24', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem', border: '0.5px solid rgba(201,168,76,0.15)' },
  compareTitle: { fontSize: '13px', color: '#C9A84C', marginBottom: '1rem', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase' },
  compareGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' },
  compareCard: (color) => ({ background: '#252733', borderRadius: '10px', padding: '1rem', borderTop: `2px solid ${color}` }),
  compareLabel: { fontSize: '11px', color: '#8A8A9A', marginBottom: '8px', fontFamily: "'DM Sans', sans-serif" },
  compareRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", padding: '3px 0' },
  compareKey: { color: '#8A8A9A' },
  compareVal: { color: '#F0EDE6', fontWeight: 500 },
};

export default function HistoryTab({ onLoadCalculation }) {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    setHistory(getHistory());
    const handler = () => setHistory(getHistory());
    window.addEventListener('ribit_history_updated', handler);
    return () => window.removeEventListener('ribit_history_updated', handler);
  }, []);

  const handleDelete = (id) => {
    deleteEntry(id);
    setHistory(getHistory());
    setSelected(s => s.filter(i => i !== id));
  };

  const handleRename = (id) => {
    renameEntry(id, editingName);
    setHistory(getHistory());
    setEditingId(null);
  };

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id)
      ? prev.filter(i => i !== id)
      : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleExport = () => exportToCSV(history);

  const handleClear = () => {
    if (window.confirm('למחוק את כל ההיסטוריה?')) {
      clearHistory();
      setHistory([]);
      setSelected([]);
    }
  };

  const selectedEntries = history.filter(e => selected.includes(e.id));

  if (history.length === 0) {
    return (
      <div style={s.wrapper}>
        <div style={s.empty}>
          <div style={s.emptyIcon}>📋</div>
          <div style={s.emptyText}>עדיין אין חישובים שמורים</div>
          <div style={s.emptySubtext}>כל חישוב שתשמור יופיע כאן</div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrapper}>
      <div style={s.topBar}>
        <div style={s.title}>החישובים שלי ({history.length})</div>
        <div style={s.btnRow}>
          {selected.length >= 2 && (
            <button style={s.btn('#9B7DE8')} onClick={() => {}}>
              ⚖️ השווה ({selected.length})
            </button>
          )}
          <button style={s.btn('#4CAF7A')} onClick={handleExport}>
            📥 ייצא CSV
          </button>
          <button style={s.btn('#E07070')} onClick={handleClear}>
            🗑 נקה הכל
          </button>
        </div>
      </div>

      {selectedEntries.length >= 2 && (
        <div style={s.compareSection}>
          <div style={s.compareTitle}>השוואה בין חישובים</div>
          <div style={s.compareGrid}>
            {selectedEntries.map(entry => (
              <div key={entry.id} style={s.compareCard(typeColors[entry.type] || '#C9A84C')}>
                <div style={s.compareLabel}>{entry.name || typeLabels[entry.type]}</div>
                {Object.entries(entry.results).map(([k, v]) => (
                  <div key={k} style={s.compareRow}>
                    <span style={s.compareKey}>{k}</span>
                    <span style={s.compareVal}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {history.map(entry => {
        const color = typeColors[entry.type] || '#C9A84C';
        const isSelected = selected.includes(entry.id);
        return (
          <div key={entry.id} style={{ ...s.card, border: isSelected ? `0.5px solid ${color}66` : s.card.border }}>
            <div style={s.cardTop}>
              <div style={{ flex: 1 }}>
                {editingId === entry.id ? (
                  <input
                    autoFocus
                    style={s.nameInput}
                    value={editingName}
                    onChange={e => setEditingName(e.target.value)}
                    onBlur={() => handleRename(entry.id)}
                    onKeyDown={e => e.key === 'Enter' && handleRename(entry.id)}
                    placeholder="שם לחישוב..."
                  />
                ) : (
                  <div
                    style={{ fontSize: '14px', color: entry.name ? '#F0EDE6' : '#5A5A6A', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}
                    onClick={() => { setEditingId(entry.id); setEditingName(entry.name || ''); }}
                  >
                    {entry.name || 'לחץ להוסיף שם...'}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={s.badge(color)}>{typeLabels[entry.type] || entry.type}</span>
                <span style={s.date}>{entry.date}</span>
              </div>
            </div>

            <div style={s.paramsGrid}>
              {Object.entries(entry.results).map(([k, v]) => (
                <div key={k} style={s.param}>
                  {k}: <span style={s.paramVal}>{v}</span>
                </div>
              ))}
            </div>

            <div style={s.cardActions}>
              <button style={s.actionBtn(isSelected ? color : '#8A8A9A')} onClick={() => toggleSelect(entry.id)}>
                {isSelected ? '✓ נבחר להשוואה' : 'השווה'}
              </button>
              {onLoadCalculation && (
                <button style={s.actionBtn('#C9A84C')} onClick={() => onLoadCalculation(entry)}>
                  ↩ טען חישוב
                </button>
              )}
              <button style={s.actionBtn('#E07070')} onClick={() => handleDelete(entry.id)}>
                מחק
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
