import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--bg', '#0D0F14');
      root.style.setProperty('--bg-2', '#161820');
      root.style.setProperty('--bg-3', '#1E2029');
      root.style.setProperty('--bg-4', '#252733');
      root.style.setProperty('--text', '#F0EDE6');
      root.style.setProperty('--text-muted', '#8A8A9A');
      root.style.setProperty('--text-dim', '#5A5A6A');
      root.style.setProperty('--border', 'rgba(201,168,76,0.18)');
      root.style.setProperty('--border-subtle', 'rgba(255,255,255,0.07)');
      document.body.style.background = '#0D0F14';
      document.body.style.color = '#F0EDE6';
    } else {
      root.style.setProperty('--bg', '#F0EDE6');
      root.style.setProperty('--bg-2', '#FFFFFF');
      root.style.setProperty('--bg-3', '#E8E4DC');
      root.style.setProperty('--bg-4', '#DDD9D0');
      root.style.setProperty('--text', '#111111');
      root.style.setProperty('--text-muted', '#444444');
      root.style.setProperty('--text-dim', '#666666');
      root.style.setProperty('--border', 'rgba(150,120,50,0.35)');
      root.style.setProperty('--border-subtle', 'rgba(0,0,0,0.12)');
      document.body.style.background = '#F0EDE6';
      document.body.style.color = '#111111';
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
