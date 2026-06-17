import LocalStorage from '../utils/LocalStorage.js';
import User from '../models/User.js';

/**
 * AuthService — сервис регистрации и авторизации (раздел 2.3.4 ВКР).
 * Пользователи и текущая сессия хранятся в LocalStorage (без бэкенда).
 * Пароли сохраняются в виде хеша, а не в открытом виде.
 */

const USERS_KEY = 'users';
const SESSION_KEY = 'user';

// Простейший детерминированный хеш (демо, не криптостойкий).
function hashPassword(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return 'h' + (h >>> 0).toString(16);
}

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isLogin = (s) => /^[A-Za-z0-9_]+$/.test(s);

const AuthService = {
  getUsers() {
    return LocalStorage.get(USERS_KEY, []);
  },

  getCurrentUser() {
    const session = LocalStorage.get(SESSION_KEY);
    return session ? new User(session) : null;
  },

  register({ name, email, login, password, agree }) {
    const errors = {};
    if (!name || !name.trim()) errors.name = 'name_required';
    if (!isEmail((email || '').trim())) errors.email = 'email_invalid';
    if (!isLogin((login || '').trim())) errors.login = 'login_invalid';
    if ((password || '').length < 8) errors.password = 'password_short';
    if (!agree) errors.agree = 'agree_required';
    if (Object.keys(errors).length) return { ok: false, errors };

    const users = this.getUsers();
    const loginLc = login.trim().toLowerCase();
    const emailLc = email.trim().toLowerCase();
    if (users.some((u) => u.login.toLowerCase() === loginLc)) {
      return { ok: false, errors: { login: 'login_taken' } };
    }
    if (users.some((u) => u.email.toLowerCase() === emailLc)) {
      return { ok: false, errors: { email: 'email_taken' } };
    }

    const record = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      login: login.trim(),
      passwordHash: hashPassword(password),
    };
    users.push(record);
    LocalStorage.set(USERS_KEY, users);

    const session = { id: record.id, name: record.name, login: record.login, email: record.email };
    LocalStorage.set(SESSION_KEY, session);
    return { ok: true, user: new User(session) };
  },

  login({ identifier, password, remember }) {
    const errors = {};
    if (!identifier || !identifier.trim()) errors.identifier = 'identifier_required';
    if (!password) errors.password = 'password_required';
    if (Object.keys(errors).length) return { ok: false, errors };

    const users = this.getUsers();
    const id = identifier.trim().toLowerCase();
    const record = users.find(
      (u) => u.login.toLowerCase() === id || u.email.toLowerCase() === id
    );
    if (!record || record.passwordHash !== hashPassword(password)) {
      return { ok: false, errors: { form: 'invalid_credentials' } };
    }

    const session = { id: record.id, name: record.name, login: record.login, email: record.email };
    LocalStorage.set(SESSION_KEY, session);
    LocalStorage.set('remember', !!remember);
    return { ok: true, user: new User(session) };
  },

  logout() {
    LocalStorage.remove(SESSION_KEY);
  },
};

export default AuthService;
