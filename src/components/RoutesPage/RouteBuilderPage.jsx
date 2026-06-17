import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../HomePage/Header.jsx';
import Breadcrumbs from '../common/Breadcrumbs.jsx';
import RouteMap from './RouteMap.jsx';
import DataStore from '../../data/DataStore.js';
import RouteService from '../../services/RouteService.js';
import LocalStorage from '../../utils/LocalStorage.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';
import './RouteBuilderPage.css';

export default function RouteBuilderPage() {
  const { republicId } = useParams();
  const { user, openAuth } = useAuth();
  const { t, plural, lang } = useLang();
  const republic = DataStore.getRepublicById(republicId);
  const places = useMemo(() => DataStore.getPlacesByRepublic(republicId), [republicId, lang]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [routeBuilt, setRouteBuilt] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const route = useMemo(() => RouteService.buildRoute(selectedIds), [selectedIds]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const saved = LocalStorage.get(`route_${republicId}`);
    if (saved && Array.isArray(saved.placeIds)) {
      setSelectedIds(saved.placeIds.filter((id) => places.some((p) => p.id === id)));
    } else {
      setSelectedIds([]);
    }
    setRouteBuilt(false);
  }, [republicId, places]);

  if (!republic) {
    return (
      <div className="route-builder">
        <Header theme="light" />
        <div className="route-builder__notfound">
          <p>{t('rb.notFound')}</p>
          <Link to="/routes" className="route-builder__back-link">{t('rb.backToRoutes')}</Link>
        </div>
      </div>
    );
  }

  const selectedPlaces = selectedIds
    .map((id) => places.find((p) => p.id === id))
    .filter(Boolean);

  const distanceKm = Math.round(route.distance);
  const days = Math.max(1, Math.round(distanceKm / 120));

  const addPoint = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setSavedNotice(false);
  };
  const removePoint = (id) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
    setRouteBuilt(false);
    setSavedNotice(false);
  };
  const reset = () => {
    setSelectedIds([]);
    setRouteBuilt(false);
    setSavedNotice(false);
  };
  const build = () => {
    if (selectedIds.length >= 2) setRouteBuilt(true);
  };
  const save = () => {
    if (!user) {
      openAuth('register');
      return;
    }
    LocalStorage.set(`route_${republicId}`, {
      placeIds: selectedIds,
      distance: distanceKm,
      savedAt: Date.now(),
    });
    setSavedNotice(true);
  };

  return (
    <div className="route-builder">
      <Header theme="light" />

      <div className="route-builder__container">
        <div className="route-builder__breadcrumbs">
          <Breadcrumbs
            items={[
              { label: t('nav.home'), to: '/' },
              { label: t('nav.routes'), to: '/routes' },
              { label: republic.name },
            ]}
          />
        </div>

        <div className="route-builder__head">
          <div className="route-builder__head-text">
            <h1 className="route-builder__title">
              {t('rb.title')}<br />— {republic.name}
            </h1>
            <p className="route-builder__subtitle">{republic.description}.</p>
          </div>
          <div className="route-builder__actions">
            <button type="button" className="route-builder__btn route-builder__btn--ghost" onClick={reset}>
              {t('rb.reset')}
              <span className="route-builder__btn-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
              </span>
            </button>
            <button
              type="button"
              className="route-builder__btn route-builder__btn--dark"
              onClick={save}
              disabled={selectedIds.length === 0}
            >
              {savedNotice ? t('rb.saved') : t('rb.save')}
              <span className="route-builder__btn-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
              </span>
            </button>
          </div>
        </div>

        <div className="route-builder__layout">
          {/* LEFT PANEL */}
          <aside className="route-builder__sidebar">
            <div className="route-panel">
              <h2 className="route-panel__title">{t('rb.points')}</h2>
              <p className="route-panel__hint">{t('rb.hint')}</p>

              <ul className="route-panel__list">
                {selectedPlaces.map((p, i) => (
                  <li key={p.id} className="route-point">
                    <span className="route-point__index">{i + 1}</span>
                    <span className="route-point__name">{p.name}</span>
                    <button
                      type="button"
                      className="route-point__remove"
                      onClick={() => removePoint(p.id)}
                      aria-label={`Убрать ${p.name}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>

              <div className="route-panel__add">
                {t('rb.addNext')}
                <span className="route-panel__add-icon">+</span>
              </div>
            </div>

            <div className="route-params">
              <h3 className="route-params__title">{t('rb.params')}</h3>
              <div className="route-params__row">
                <span>{t('rb.paramPoints')}</span>
                <span className="route-params__value">{selectedIds.length}</span>
              </div>
              <div className="route-params__row">
                <span>{t('rb.paramDistance')}</span>
                <span className="route-params__value">
                  {selectedIds.length >= 2 ? `~ ${distanceKm} ${t('rb.km')}` : '—'}
                </span>
              </div>
              <div className="route-params__row">
                <span>{t('rb.paramDuration')}</span>
                <span className="route-params__value">
                  {selectedIds.length >= 2 ? `~ ${days} ${plural(days, ['день', 'дня', 'дней'], ['day', 'days'])}` : '—'}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="route-build-btn"
              onClick={build}
              disabled={selectedIds.length < 2}
            >
              {routeBuilt ? t('rb.built') : t('rb.build')}
              <span className="route-build-btn__icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>
              </span>
            </button>
          </aside>

          {/* MAP */}
          <div className="route-builder__map">
            <RouteMap
              places={places}
              selectedIds={selectedIds}
              routeBuilt={routeBuilt}
              onAdd={addPoint}
              onRemove={removePoint}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
