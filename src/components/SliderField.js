import React, { useState } from 'react';

export default function SliderField({ label, value, min, max, step, onChange, suffix = '', isRate = false }) {
  const [inputVal, setInputVal] = useState(String(value));
  const [focused, setFocused] = useState(false);

  const sliderMax = isRate ? 100 : max;

  const handleSlider = (e) => {
    const v = parseFloat(e.target.value);
    onChange(v);
    if (!focused) setInputVal(String(v));
  };

  const handleInput = (e) => {
    setInputVal(e.target.value);
    const num = parseFloat(e.target.value);
    if (!isNaN(num) && num >= 0) {
      const clamped = isRate ? Math.max(num, 0) : Math.min(Math.max(num, min), max);
      onChange(clamped);
    }
  };

  const handleBlur = () => {
    setFocused(false);
    setInputVal(String(value));
  };

  const handleStep = (dir) => {
    const newVal = Math.round((value + dir * step) * 100) / 100;
    const clamped = isRate ? Math.max(newVal, 0) : Math.min(Math.max(newVal, min), max);
    onChange(clamped);
    setInputVal(String(clamped));
  };

  return (
    <div style={{ marginBottom: '1.4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ fontSize: '13px', color: '#8A8A9A', fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <input
            type="number"
            value={focused ? inputVal : value}
            min={0}
            step={step}
            onFocus={() => { setFocused(true); setInputVal(String(value)); }}
            onBlur={handleBlur}
            onChange={handleInput}
            style={{
              width: '64px', background: '#252733',
              border: '0.5px solid rgba(201,168,76,0.4)',
              borderRadius: '6px', color: '#C9A84C', padding: '3px 6px',
              fontSize: '13px', fontFamily: "'DM Sans', sans-serif",
              outline: 'none', textAlign: 'center', fontWeight: 500, direction: 'ltr',
            }}
          />
          {suffix && <span style={{ fontSize: '13px', color: '#8A8A9A', fontFamily: "'DM Sans', sans-serif" }}>{suffix}</span>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => handleStep(-1)}
          style={{
            width: '28px', height: '28px', borderRadius: '50%',
            border: '0.5px solid rgba(255,255,255,0.12)',
            background: '#252733', color: '#8A8A9A',
            fontSize: '16px', cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1,
          }}
        >−</button>
        <input
          type="range" min={isRate ? 0 : min} max={sliderMax} step={step}
          value={Math.min(value, sliderMax)}
          onChange={handleSlider}
          style={{ flex: 1 }}
        />
        <button
          onClick={() => handleStep(1)}
          style={{
            width: '28px', height: '28px', borderRadius: '50%',
            border: '0.5px solid rgba(255,255,255,0.12)',
            background: '#252733', color: '#8A8A9A',
            fontSize: '16px', cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1,
          }}
        >+</button>
      </div>
    </div>
  );
}
