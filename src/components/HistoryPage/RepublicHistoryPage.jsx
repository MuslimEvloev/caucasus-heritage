import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../HomePage/Header.jsx';
import Footer from '../HomePage/Footer.jsx';
import Breadcrumbs from '../common/Breadcrumbs.jsx';
import SmartImage from '../common/SmartImage.jsx';
import ReviewsSection from '../common/ReviewsSection.jsx';
import DataStore from '../../data/DataStore.js';
import { useLang } from '../../i18n/LanguageContext.jsx';
import '../common/RepublicDetail.css';

export default function RepublicHistoryPage() {
  const { republicId } = useParams();
  const { t, plural } = useLang();
  const republic = DataStore.getRepublicById(republicId);
  const history = DataStore.getHistory(republicId);
  const places = DataStore.getPlacesByRepublic(republicId);
  const monuments = places.filter((p) => p.type === 'cultural');

  const typeLabel = (type) => (type === 'natural' ? t('map.natural') : t('map.cultural'));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [republicId]);

  if (!republic || !history) {
    return (
      <div className="detail-page">
        <Header theme="light" />
        <div className="detail-container">
          <p>{t('detail.notFound')}</p>
          <Link to="/history" className="route-builder__back-link">{t('detail.backHistory')}</Link>
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
              { label: t('nav.home'), to: '/' },
              { label: t('nav.history'), to: '/history' },
              { label: republic.name },
            ]}
          />
        </div>

        <section className="detail-hero">
          <img className="detail-hero__img" src={republic.image} alt={republic.name} />
          <div className="detail-hero__inner">
            <span className="detail-hero__eyebrow">{t('rh.eyebrow')} · {republic.number}</span>
            <h1 className="detail-hero__title">{republic.name}</h1>
            {history.lead && <p className="detail-hero__sub">{history.lead}</p>}
          </div>
        </section>

        <p className="detail-lead">{history.intro}</p>

        {/* TIMELINE */}
        {history.timeline?.length > 0 && (
          <>
            <div className="detail-block-head">
              <h2 className="detail-block-title">{t('rh.chronology')}</h2>
              <span className="detail-block-count">
                {history.timeline.length} {plural(history.timeline.length, ['веха', 'вехи', 'вех'], ['milestone', 'milestones'])}
              </span>
            </div>
            <ol className="timeline">
              {history.timeline.map((tl, i) => (
                <li key={i} className="timeline__item">
                  <span className="timeline__dot" aria-hidden="true" />
                  <span className="timeline__period">{tl.period}</span>
                  <div className="timeline__content">
                    <h3 className="timeline__title">{tl.title}</h3>
                    <p className="timeline__text">{tl.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}

        {/* THEMATIC BLOCKS */}
        {history.blocks?.length > 0 && (
          <div className="history-blocks">
            {history.blocks.map((b, i) => (
              <section key={i} className="history-block">
                <div className="history-block__aside">
                  <span className="history-block__num">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="history-block__title">{b.title}</h2>
                </div>
                <div className="history-block__text">
                  {b.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* FIGURES */}
        <div className="detail-block-head">
          <h2 className="detail-block-title">{t('rh.figures')}</h2>
        </div>
        <div className="detail-figures">
          {history.figures.map((f, i) => (
            <div key={i} className="figure-card">
              <h3 className="figure-card__name">{f.name}</h3>
              <p className="figure-card__years">{f.years}</p>
              <p className="figure-card__text">{f.text}</p>
            </div>
          ))}
        </div>

        {/* FACTS */}
        {history.facts?.length > 0 && (
          <>
            <div className="detail-block-head">
              <h2 className="detail-block-title">{t('rh.facts')}</h2>
            </div>
            <div className="facts-grid">
              {history.facts.map((fact, i) => (
                <div key={i} className="fact-card">
                  <span className="fact-card__icon" aria-hidden="true">★</span>
                  <p className="fact-card__text">{fact}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* MONUMENTS */}
        {monuments.length > 0 && (
          <>
            <div className="detail-block-head">
              <h2 className="detail-block-title">{t('rh.monuments')}</h2>
              <span className="detail-block-count">
                {monuments.length} {plural(monuments.length, ['объект', 'объекта', 'объектов'], ['site', 'sites'])}
              </span>
            </div>
            <div className="detail-grid">
              {monuments.map((p) => (
                <div key={p.id} className="object-card">
                  <div className="object-card__photo">
                    <SmartImage src={p.image} name={p.name} alt={p.name} variant={p.type} />
                  </div>
                  <div className="object-card__body">
                    <span className="object-card__type">{typeLabel(p.type)}</span>
                    <h3 className="object-card__name">{p.name}</h3>
                    <p className="object-card__desc">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <ReviewsSection target={republic.id} />

        <div className="detail-cta">
          <div className="detail-cta__text">
            <h3>{t('rh.ctaTitle', { name: republic.name })}</h3>
            <p>{t('rh.ctaText')}</p>
          </div>
          <Link to={`/routes/${republic.id}`} className="detail-cta__btn">
            {t('rh.ctaBtn')}
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
