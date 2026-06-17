import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import LocalStorage from '../utils/LocalStorage.js';

const ThemeContext = createContext(null);

const SUPPORTED = ['light', 'dark'];

function initialTheme() {
  const saved = LocalStorage.get('theme');
  if (SUPPORTED.includes(saved)) return saved;
  return 'light';
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    LocalStorage.set('theme', next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const value = { theme, setTheme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
