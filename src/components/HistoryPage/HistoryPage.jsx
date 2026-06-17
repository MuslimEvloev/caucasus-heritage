import { useEffect } from 'react';
import Header from '../HomePage/Header.jsx';
import Footer from '../HomePage/Footer.jsx';
import Breadcrumbs from '../common/Breadcrumbs.jsx';
import RepublicCard from './RepublicCard.jsx';
import DataStore from '../../data/DataStore.js';
import { useLang } from '../../i18n/LanguageContext.jsx';
import './HistoryPage.css';

export default function HistoryPage() {
  const { t } = useLang();
  const republics = DataStore.getRepublics();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="history-page">
      <Header theme="light" />

      <div className="history-page__container">
        <div className="history-page__breadcrumbs">
          <Breadcrumbs
            items={[
              { label: t('nav.home'), to: '/' },
              { label: t('nav.history') },
            ]}
          />
        </div>

        <div className="history-page__head">
          <h1 className="history-page__title">
            <span className="history-page__title-line">{t('history.title')}</span>
            <span className="history-page__title-line history-page__title-line--secondary">
              {t('common.subtitleRegion')}
            </span>
          </h1>
          <p className="history-page__lead">{t('history.lead')}</p>
        </div>

        <hr className="history-page__divider" />

        <div className="history-page__grid">
          {republics.map((r) => (
            <RepublicCard key={r.id} republic={r} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
