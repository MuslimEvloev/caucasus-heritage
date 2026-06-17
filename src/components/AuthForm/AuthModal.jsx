import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';
import './AuthModal.css';

const EMPTY = {
  name: '',
  email: '',
  login: '',
  password: '',
  identifier: '',
  loginPassword: '',
  agree: false,
  remember: false,
};

export default function AuthModal() {
  const { mode, closeAuth, openAuth, register, login } = useAuth();
  const { t } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  // Сброс формы при открытии/смене режима
  useEffect(() => {
    if (mode) {
      setForm(EMPTY);
      setErrors({});
    }
  }, [mode]);

  // Закрытие по Escape
  useEffect(() => {
    if (!mode) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeAuth();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, closeAuth]);

  if (!mode) return null;

  const err = (code) => (code ? t('err.' + code) : undefined);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const result = register({
      name: form.name,
      email: form.email,
      login: form.login,
      password: form.password,
      agree: form.agree,
    });
    if (!result.ok) setErrors(result.errors);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login({
      identifier: form.identifier,
      password: form.loginPassword,
      remember: form.remember,
    });
    if (!result.ok) setErrors(result.errors);
  };

  const isRegister = mode === 'register';

  return (
    <div className="auth-overlay" onMouseDown={closeAuth}>
      <button
        type="button"
        className="auth-close"
        aria-label={t('am.close')}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={closeAuth}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <div className="auth-modal" onMouseDown={(e) => e.stopPropagation()}>
        {isRegister ? (
          <form className="auth-card" onSubmit={handleRegister} noValidate>
            <div className="auth-card__head">
              <h2 className="auth-card__title">{t('am.createTitle')}</h2>
              <p className="auth-card__subtitle">{t('am.createSubtitle')}</p>
            </div>

            <Field value={form.name} onChange={set('name')} placeholder={t('am.ph.name')} error={err(errors.name)} autoFocus />
            <Field type="email" value={form.email} onChange={set('email')} placeholder={t('am.ph.email')} error={err(errors.email)} />
            <Field value={form.login} onChange={set('login')} placeholder={t('am.ph.login')} error={err(errors.login)} />
            <Field type="password" value={form.password} onChange={set('password')} placeholder={t('am.ph.password')} error={err(errors.password)} />

            <label className={'auth-check' + (errors.agree ? ' auth-check--error' : '')}>
              <input type="checkbox" checked={form.agree} onChange={set('agree')} />
              <span className="auth-check__box" aria-hidden="true" />
              <span className="auth-check__label">{t('am.agree')}</span>
            </label>

            <button type="submit" className="auth-submit">{t('am.register')}</button>
          </form>
        ) : (
          <form className="auth-card" onSubmit={handleLogin} noValidate>
            <div className="auth-card__head">
              <h2 className="auth-card__title">{t('am.loginTitle')}</h2>
              <p className="auth-card__subtitle">{t('am.loginSubtitle')}</p>
            </div>

            <Field value={form.identifier} onChange={set('identifier')} placeholder={t('am.ph.identifier')} error={err(errors.identifier)} autoFocus />
            <Field type="password" value={form.loginPassword} onChange={set('loginPassword')} placeholder={t('am.ph.passwordLogin')} error={err(errors.password)} />

            {errors.form && <p className="auth-form-error">{err(errors.form)}</p>}

            <div className="auth-row">
              <label className="auth-check auth-check--inline">
                <input type="checkbox" checked={form.remember} onChange={set('remember')} />
                <span className="auth-check__box" aria-hidden="true" />
                <span className="auth-check__label">{t('am.remember')}</span>
              </label>
              <button type="button" className="auth-link auth-link--muted">{t('am.forgot')}</button>
            </div>

            <button type="submit" className="auth-submit">{t('am.login')}</button>
          </form>
        )}

        <p className="auth-switch">
          {isRegister ? t('am.haveAccount') : t('am.noAccount')}
          <button
            type="button"
            className="auth-link"
            onClick={() => openAuth(isRegister ? 'login' : 'register')}
          >
            {isRegister ? t('am.login') : t('am.register')}
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ error, ...props }) {
  return (
    <div className="auth-field-wrap">
      <input className={'auth-field' + (error ? ' auth-field--error' : '')} {...props} />
      {error && <span className="auth-field__error">{error}</span>}
    </div>
  );
}
