import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';
import ReviewService from '../../services/ReviewService.js';
import './ReviewsSection.css';

function Stars({ value, onChange, readOnly }) {
  return (
    <div className={'review-stars' + (readOnly ? ' review-stars--readonly' : '')}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={'review-star' + (n <= value ? ' is-filled' : '')}
          onClick={readOnly ? undefined : () => onChange(n)}
          disabled={readOnly}
          aria-label={`${n}`}
          tabIndex={readOnly ? -1 : 0}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <polygon points="12 2 15 9 22 9.3 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9.3 9 9" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection({ target }) {
  const { user, openAuth } = useAuth();
  const { t, lang } = useLang();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    setReviews(ReviewService.getByTarget(target));
    setRating(0);
    setText('');
    setErrors({});
    setThanks(false);
  }, [target]);

  const submit = (e) => {
    e.preventDefault();
    const result = ReviewService.add(target, { rating, text }, user);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setReviews((prev) => [result.review, ...prev]);
    setRating(0);
    setText('');
    setErrors({});
    setThanks(true);
  };

  const fmtDate = (ts) =>
    new Date(ts).toLocaleDateString(lang === 'en' ? 'en-US' : 'ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <section className="reviews">
      <div className="detail-block-head">
        <h2 className="detail-block-title reviews__title">{t('reviews.title')}</h2>
        <span className="detail-block-count">{reviews.length}</span>
      </div>

      {user ? (
        <form className="review-form" onSubmit={submit} noValidate>
          <div className="review-form__rating-row">
            <span className="review-form__label">{t('reviews.rating')}</span>
            <Stars value={rating} onChange={(n) => { setRating(n); setErrors((er) => ({ ...er, rating: false })); }} />
            {errors.rating && <span className="review-form__error">{t('reviews.errRating')}</span>}
          </div>
          <textarea
            className="review-form__textarea"
            placeholder={t('reviews.placeholder')}
            value={text}
            onChange={(e) => { setText(e.target.value); setThanks(false); }}
            rows={3}
          />
          {errors.text && <span className="review-form__error">{t('reviews.errText')}</span>}
          {thanks && <p className="reviews__thanks">{t('reviews.thanks')}</p>}
          <button type="submit" className="review-submit">{t('reviews.submit')}</button>
        </form>
      ) : (
        <div className="review-login-prompt">
          <p>{t('reviews.loginPrompt')}</p>
          <button type="button" className="review-submit" onClick={() => openAuth('login')}>
            {t('am.login')}
          </button>
        </div>
      )}

      <div className="reviews__list">
        {reviews.length === 0 ? (
          <p className="reviews__empty">{t('reviews.empty')}</p>
        ) : (
          reviews.map((r) => (
            <article key={r.id} className="review-card">
              <div className="review-card__head">
                <span className="review-card__author">
                  {user && r.userId === user.id ? t('reviews.you') : r.userName}
                </span>
                <Stars value={r.rating} readOnly />
              </div>
              <p className="review-card__text">{r.text}</p>
              <span className="review-card__date">{fmtDate(r.date)}</span>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
