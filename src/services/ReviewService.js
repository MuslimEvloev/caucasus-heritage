import LocalStorage from '../utils/LocalStorage.js';

/**
 * ReviewService — сервис пользовательских отзывов (сущность «Отзыв» по ВКR).
 * Отзыв = оценка (1–5), комментарий, дата, привязка к объекту/региону и автору.
 * Хранится в LocalStorage (без бэкенда, раздел 2.3.4 ВКР).
 */
const KEY = 'reviews';

const ReviewService = {
  getAll() {
    return LocalStorage.get(KEY, []);
  },

  getByTarget(target) {
    return this.getAll()
      .filter((r) => r.target === target)
      .sort((a, b) => b.date - a.date);
  },

  add(target, { rating, text }, user) {
    const errors = {};
    if (!rating || rating < 1) errors.rating = true;
    if (!text || text.trim().length < 5) errors.text = true;
    if (Object.keys(errors).length) return { ok: false, errors };

    const review = {
      id: Date.now(),
      target,
      userId: user ? user.id : null,
      userName: user ? user.name : 'Guest',
      rating: Math.min(5, Math.max(1, rating)),
      text: text.trim(),
      date: Date.now(),
    };
    const all = this.getAll();
    all.push(review);
    LocalStorage.set(KEY, all);
    return { ok: true, review };
  },
};

export default ReviewService;
