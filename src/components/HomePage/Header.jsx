import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Главная', path: '/' },
  { id: 'history', label: 'История', path: '/history' },
  { id: 'kitchen', label: 'Кухня', path: '/kitchen' },
  { id: 'routes', label: 'Маршруты', path: '/routes' },
];

export default function Header({ theme = 'dark' }) {
  const location = useLocation();

  return (
    <header className={'header header--' + theme}>
      <NavLink to="/" className="header__pill header__logo-pill">
        <span className="header__inner-pill header__inner-pill--text">
          Caucasus Heritage<sup>®</sup>
        </span>
      </NavLink>

      <nav className="header__pill header__nav-pill" aria-label="Основная навигация">
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
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="header__pill header__user-pill">
        <span className="header__inner-pill header__inner-pill--icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        </span>
        <button type="button" className="header__inner-pill header__inner-pill--text">
          Вход
        </button>
      </div>
    </header>
  );
}
