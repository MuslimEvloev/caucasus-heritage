import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AuthService from '../services/AuthService.js';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => AuthService.getCurrentUser());
  const [mode, setMode] = useState(null); // 'login' | 'register' | null

  const openAuth = useCallback((m = 'login') => setMode(m), []);
  const closeAuth = useCallback(() => setMode(null), []);

  const register = useCallback((data) => {
    const result = AuthService.register(data);
    if (result.ok) {
      setUser(result.user);
      setMode(null);
    }
    return result;
  }, []);

  const login = useCallback((data) => {
    const result = AuthService.login(data);
    if (result.ok) {
      setUser(result.user);
      setMode(null);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
  }, []);

  // Блокируем прокрутку страницы, пока открыто модальное окно
  useEffect(() => {
    document.body.style.overflow = mode ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mode]);

  const value = { user, mode, openAuth, closeAuth, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
