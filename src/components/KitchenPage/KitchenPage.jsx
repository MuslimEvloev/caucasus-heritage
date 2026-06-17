import { useEffect } from 'react';
import Header from '../HomePage/Header.jsx';
import Footer from '../HomePage/Footer.jsx';
import Breadcrumbs from '../common/Breadcrumbs.jsx';
import DishCard from './DishCard.jsx';
import DataStore from '../../data/DataStore.js';
import { useLang } from '../../i18n/LanguageContext.jsx';
import './KitchenPage.css';

export default function KitchenPage() {
  const { t } = useLang();
  const dishes = DataStore.getDishes();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="kitchen-page">
      <Header theme="light" />

      <div className="kitchen-page__container">
        <div className="kitchen-page__breadcrumbs">
          <Breadcrumbs
            items={[
              { label: t('nav.home'), to: '/' },
              { label: t('nav.kitchen') },
            ]}
          />
        </div>

        <div className="kitchen-page__head">
          <h1 className="kitchen-page__title">
            <span className="kitchen-page__title-line">{t('kitchen.title')}</span>
            <span className="kitchen-page__title-line kitchen-page__title-line--secondary">
              {t('common.subtitleRegion')}
            </span>
          </h1>
          <p className="kitchen-page__lead">{t('kitchen.lead')}</p>
        </div>

        <hr className="kitchen-page__divider" />

        <div className="kitchen-page__grid">
          {dishes.map((d) => (
            <DishCard key={d.id} dish={d} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
