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
      root.style.setProperty('--bg', '#F8F6F0');
      root.style.setProperty('--bg-2', '#FFFFFF');
      root.style.setProperty('--bg-3', '#F2EFE8');
      root.style.setProperty('--bg-4', '#EAE7E0');
      root.style.setProperty('--text', '#1A1A1A');
      root.style.setProperty('--text-muted', '#666666');
      root.style.setProperty('--text-dim', '#999999');
      root.style.setProperty('--border', 'rgba(201,168,76,0.3)');
      root.style.setProperty('--border-subtle', 'rgba(0,0,0,0.08)');
      document.body.style.background = '#F8F6F0';
      document.body.style.color = '#1A1A1A';
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
