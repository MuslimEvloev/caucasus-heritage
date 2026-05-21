import Header from './Header.jsx';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />

      <Header />

      <div className="hero__title">
        <h1 className="hero__heading">
          <span className="hero__heading-line">Культурное наследие</span>
          <span className="hero__heading-line hero__heading-secondary">Северного Кавказа</span>
        </h1>
        <p className="hero__subtitle">
          Путеводитель по историко-культурному наследию республик Северного
          Кавказа. Маршруты, история, национальная кухня — всё в одном месте
        </p>
      </div>

      <a
        href="#sections"
        className="hero__bottom"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
      >
        <span className="hero__cta">
          <span className="hero__cta-text">Начать исследовать</span>
          <span className="hero__cta-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </span>
      </a>
    </section>
  );
}
