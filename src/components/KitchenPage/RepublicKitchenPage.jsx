import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../HomePage/Header.jsx';
import Footer from '../HomePage/Footer.jsx';
import Breadcrumbs from '../common/Breadcrumbs.jsx';
import SmartImage from '../common/SmartImage.jsx';
import LocationMap from '../common/LocationMap.jsx';
import DataStore from '../../data/DataStore.js';
import { useLang } from '../../i18n/LanguageContext.jsx';
import '../common/RepublicDetail.css';

export default function RepublicKitchenPage() {
  const { republicId } = useParams();
  const { t, plural } = useLang();
  const republic = DataStore.getRepublicById(republicId);
  const dish = DataStore.getDishById(republicId);
  const dishes = DataStore.getKitchenDishes(republicId);
  const restaurants = DataStore.getRestaurants(republicId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [republicId]);

  if (!republic || !dish) {
    return (
      <div className="detail-page">
        <Header theme="light" />
        <div className="detail-container">
          <p>{t('detail.notFound')}</p>
          <Link to="/kitchen" className="route-builder__back-link">{t('detail.backKitchen')}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Header theme="light" />

      <div className="detail-container">
        <div className="detail-breadcrumbs">
          <Breadcrumbs
            items={[
              { label: 'Главная', to: '/' },
              { label: 'Кухня', to: '/kitchen' },
              { label: republic.name },
            ]}
          />
        </div>

        <section className="detail-hero">
          <img className="detail-hero__img" src={dish.image} alt={republic.name} />
          <div className="detail-hero__inner">
            <span className="detail-hero__eyebrow">{t('rk.eyebrow')}</span>
            <h1 className="detail-hero__title">{republic.name}</h1>
          </div>
        </section>

        <p className="detail-lead">{dish.description}.</p>

        {/* DISHES WITH PHOTOS */}
        <div className="detail-block-head">
          <h2 className="detail-block-title">{t('rk.dishes')}</h2>
          <span className="detail-block-count">
            {dishes.length} {plural(dishes.length, ['блюдо', 'блюда', 'блюд'], ['dish', 'dishes'])}
          </span>
        </div>
        <div className="dish-photo-grid">
          {dishes.map((d) => (
            <article key={d.id} className="dish-photo-card">
              <div className="dish-photo-card__photo">
                <SmartImage src={d.image} name={d.name} alt={d.name} variant="cultural" />
              </div>
              <div className="dish-photo-card__body">
                <h3 className="dish-photo-card__name">{d.name}</h3>
                <p className="dish-photo-card__desc">{d.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* WHERE TO EAT — MAP */}
        {restaurants.length > 0 && (
          <>
            <div className="detail-block-head">
              <h2 className="detail-block-title">{t('rk.whereToEat')}</h2>
              <span className="detail-block-count">
                {restaurants.length} {plural(restaurants.length, ['заведение', 'заведения', 'заведений'], ['venue', 'venues'])}
              </span>
            </div>
            <div className="kitchen-map">
              <div className="kitchen-map__canvas">
                <LocationMap points={restaurants} />
              </div>
              <ul className="kitchen-map__list">
                {restaurants.map((r) => (
                  <li key={r.id} className="resto-card">
                    <span className="resto-card__pin" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 1.7.8 3.4 2 5l4 5 4-5c1.2-1.6 2-3.3 2-5z"/><circle cx="12" cy="8" r="2.2"/></svg>
                    </span>
                    <div>
                      <h4 className="resto-card__name">{r.name}</h4>
                      <p className="resto-card__specialty">{r.specialty}</p>
                      <p className="resto-card__address">{r.address}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <div className="detail-cta">
          <div className="detail-cta__text">
            <h3>{t('rk.ctaTitle', { name: republic.name })}</h3>
            <p>{t('rk.ctaText')}</p>
          </div>
          <Link to={`/history/${republic.id}`} className="detail-cta__btn">
            {t('rk.ctaBtn')}
            <span className="detail-cta__btn-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
