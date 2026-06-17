import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LanguageContext.jsx';
import './DishCard.css';

export default function DishCard({ dish }) {
  const { t } = useLang();
  return (
    <Link to={`/kitchen/${dish.id}`} className="dish-card" aria-label={dish.name}>
      <div className="dish-card__face dish-card__face--default">
        <div className="dish-card__top">
          <span className="dish-card__flag-pill">
            <img src={dish.flag} alt="" className="dish-card__flag" />
          </span>
        </div>
        <div className="dish-card__photo-wrap">
          <img
            src={dish.image}
            alt={dish.name}
            className="dish-card__photo"
            loading="lazy"
          />
        </div>
        <div className="dish-card__text">
          <h3 className="dish-card__name">{dish.name}</h3>
          <p className="dish-card__description">{dish.description}</p>
        </div>
      </div>

      <div
        className="dish-card__face dish-card__face--hover"
        style={{ backgroundImage: `url(${dish.image})` }}
        aria-hidden="true"
      >
        <span className="dish-card__flag-pill dish-card__flag-pill--on-image">
          <img src={dish.flag} alt="" className="dish-card__flag" />
        </span>
        <span className="dish-card__cta">
          <span className="dish-card__cta-text">{t('card.go')}</span>
          <span className="dish-card__cta-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </span>
        </span>
      </div>
    </Link>
  );
}
