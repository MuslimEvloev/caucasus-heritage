import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';
import { useTheme } from '../../i18n/ThemeContext.jsx';
import './Header.css';

const NAV_ITEMS = [
  { id: 'home', key: 'nav.home', path: '/' },
  { id: 'history', key: 'nav.history', path: '/history' },
  { id: 'kitchen', key: 'nav.kitchen', path: '/kitchen' },
  { id: 'routes', key: 'nav.routes', path: '/routes' },
];

export default function Header({ theme = 'dark' }) {
  const location = useLocation();
  const { user, openAuth, logout } = useAuth();
  const { t, lang, toggleLang } = useLang();
  const { theme: colorScheme, toggleTheme } = useTheme();

  return (
    <header className={'header header--' + theme}>
      <NavLink to="/" className="header__pill header__logo-pill">
        <span className="header__inner-pill header__inner-pill--text">
          Caucasus Heritage<sup>®</sup>
        </span>
      </NavLink>

      <nav className="header__pill header__nav-pill" aria-label="Navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={
                'header__inner-pill header__inner-pill--text' +
                (isActive ? ' is-active' : '')
              }
            >
              {t(item.key)}
            </NavLink>
          );
        })}
      </nav>

      <div className="header__pill header__user-pill">
        <button
          type="button"
          className="header__inner-pill header__inner-pill--icon header__theme"
          onClick={toggleTheme}
          title={colorScheme === 'light' ? t('theme.toDark') : t('theme.toLight')}
          aria-label={colorScheme === 'light' ? t('theme.toDark') : t('theme.toLight')}
        >
          {colorScheme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="header__inner-pill header__inner-pill--text header__lang"
          onClick={toggleLang}
          title={lang === 'ru' ? 'Switch to English' : 'Переключить на русский'}
        >
          {lang === 'ru' ? 'EN' : 'RU'}
        </button>
        <span className="header__inner-pill header__inner-pill--icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        </span>
        {user ? (
          <button
            type="button"
            className="header__inner-pill header__inner-pill--text"
            onClick={logout}
            title={t('auth.logoutTitle')}
          >
            {user.name}
          </button>
        ) : (
          <button
            type="button"
            className="header__inner-pill header__inner-pill--text"
            onClick={() => openAuth('login')}
          >
            {t('auth.signIn')}
          </button>
        )}
      </div>
    </header>
  );
}
