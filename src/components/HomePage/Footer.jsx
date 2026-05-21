import './Footer.css';

export default function Footer({ theme = 'light' }) {
  return (
    <footer className={'footer footer--' + theme}>
      <div className="footer__inner">
        <div className="footer__card footer__card--about">
          <h2 className="footer__title">О проекте</h2>
          <p className="footer__text">
            Caucasus Heritage — проект о культурном и историческом наследии
            Северного Кавказа: архитектурные памятники, традиционная кухня и
            туристические маршруты республик региона.
          </p>
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
        <p className="footer__copy">© Caucasus Heritage, 2026</p>
        <p className="footer__links">
          Контакты&nbsp;·&nbsp;О проекте&nbsp;·&nbsp;Политика конфиденциальности
        </p>
      </div>
    </footer>
  );
}
