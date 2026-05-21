import { useEffect } from 'react';
import Header from '../HomePage/Header.jsx';
import Footer from '../HomePage/Footer.jsx';
import Breadcrumbs from '../common/Breadcrumbs.jsx';
import RepublicCard from './RepublicCard.jsx';
import republics from '../../data/republics.json';
import './HistoryPage.css';

export default function HistoryPage() {
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
              { label: 'Главная', to: '/' },
              { label: 'История' },
            ]}
          />
        </div>

        <div className="history-page__head">
          <h1 className="history-page__title">
            <span className="history-page__title-line">История</span>
            <span className="history-page__title-line history-page__title-line--secondary">
              Северного Кавказа
            </span>
          </h1>
          <p className="history-page__lead">
            Выберите республику, чтобы изучить её историко-культурные памятники,
            события и значимых деятелей.
          </p>
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
