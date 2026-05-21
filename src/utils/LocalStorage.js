/**
 * Обёртка над браузерным хранилищем «ключ — значение» (раздел 2.3.4 ВКР).
 * Используется для запоминания учётных данных пользователя и сохранённых
 * маршрутов между посещениями сайта.
 */
const PREFIX = 'ch_';

const LocalStorageWrapper = {
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage недоступен:', e);
    }
  },

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },
};

export default LocalStorageWrapper;
