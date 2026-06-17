import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import strings from './strings.js';
import LocalStorage from '../utils/LocalStorage.js';
import DataStore from '../data/DataStore.js';

const LanguageContext = createContext(null);

const SUPPORTED = ['ru', 'en'];

function initialLang() {
  const saved = LocalStorage.get('lang');
  if (SUPPORTED.includes(saved)) return saved;
  return 'ru';
}

export function useLang() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  // Держим DataStore в синхроне с текущим языком уже на этапе рендера,
  // чтобы дочерние компоненты получали локализованные данные.
  DataStore.setLang(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    DataStore.setLang(next);
    LocalStorage.set('lang', next);
    setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'ru' ? 'en' : 'ru');
  }, [lang, setLang]);

  // t('key', { name: 'X' }) — строка с подстановкой {name}
  const t = useCallback(
    (key, vars) => {
      const dict = strings[lang] || strings.ru;
      let value = dict[key];
      if (value === undefined) value = strings.ru[key];
      if (value === undefined) return key;
      if (Array.isArray(value)) return value;
      if (vars && typeof value === 'string') {
        return value.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : `{${k}}`));
      }
      return value;
    },
    [lang]
  );

  // Множественное число: plural(n, ['ru1','ru2','ru5'], ['en1','enN'])
  const plural = useCallback(
    (n, formsRu, formsEn) => {
      if (lang === 'en') return n === 1 ? formsEn[0] : formsEn[1];
      const n10 = n % 10;
      const n100 = n % 100;
      if (n10 === 1 && n100 !== 11) return formsRu[0];
      if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return formsRu[1];
      return formsRu[2];
    },
    [lang]
  );

  const value = { lang, setLang, toggleLang, t, plural };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
