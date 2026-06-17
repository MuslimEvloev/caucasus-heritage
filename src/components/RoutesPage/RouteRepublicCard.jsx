import { Link } from 'react-router-dom';
import DataStore from '../../data/DataStore.js';
import { useLang } from '../../i18n/LanguageContext.jsx';
import '../HistoryPage/RepublicCard.css';

export default function RouteRepublicCard({ republic }) {
  const { t } = useLang();
  const count = DataStore.getPlacesByRepublic(republic.id).length;

  return (
    <Link to={`/routes/${republic.id}`} className="republic-card" aria-label={republic.name}>
      <div className="republic-card__face republic-card__face--default">
        <div className="republic-card__top">
          <span className="republic-card__number">{republic.number}</span>
        </div>
        <div className="republic-card__photo-wrap">
          <img
            src={republic.image}
            alt={republic.name}
            className="republic-card__photo"
            loading="lazy"
          />
        </div>
        <div className="republic-card__text">
          <h3 className="republic-card__name">{republic.name}</h3>
          <p className="republic-card__description">
            {count} {t('card.routeDesc')}
          </p>
        </div>
      </div>

      <div
        className="republic-card__face republic-card__face--hover"
        style={{ backgroundImage: `url(${republic.image})` }}
        aria-hidden="true"
      >
        <span className="republic-card__number republic-card__number--on-image">
          {republic.number}
        </span>
        <span className="republic-card__cta">
          <span className="republic-card__cta-text">{t('card.buildRoute')}</span>
          <span className="republic-card__cta-icon">
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
