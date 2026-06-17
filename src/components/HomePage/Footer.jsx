import { useLang } from '../../i18n/LanguageContext.jsx';
import './Footer.css';

export default function Footer({ theme = 'light' }) {
  const { t } = useLang();
  return (
    <footer className={'footer footer--' + theme}>
      <div className="footer__inner">
        <div className="footer__card footer__card--about">
          <h2 className="footer__title">{t('footer.aboutTitle')}</h2>
          <p className="footer__text">{t('footer.aboutText')}</p>
        </div>

        <div className="footer__card footer__card--contacts">
          <ul className="footer__list">
            <li className="footer__list-item">
              <span className="footer__dot" aria-hidden="true" />
              <a href="tel:+79289950506">+7 (928) 995-05-06</a>
            </li>
            <li className="footer__list-item">
              <span className="footer__dot" aria-hidden="true" />
              <a href="mailto:caucasusheritage@gmail.com">
                caucasusheritage@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__meta">
        <p className="footer__copy">{t('footer.copy')}</p>
        <p className="footer__links">{t('footer.links')}</p>
      </div>
    </footer>
  );
}
