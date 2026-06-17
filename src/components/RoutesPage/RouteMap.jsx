import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import SmartImage from '../common/SmartImage.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';
import 'leaflet/dist/leaflet.css';
import './RouteMap.css';

const ICONS = {
  natural:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18L13.5 6 10 12l-2-3z"/></svg>',
  cultural:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>',
};

function makeIcon(type, order) {
  const selected = order != null;
  const inner = selected
    ? `<span class="route-marker__badge">${order}</span>`
    : `<span class="route-marker__icon">${ICONS[type] || ICONS.cultural}</span>`;
  const html = `<div class="route-marker route-marker--${type} ${selected ? 'route-marker--selected' : ''}">${inner}</div>`;
  return L.divIcon({
    html,
    className: 'route-marker-wrap',
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -16],
  });
}

function FitBounds({ places }) {
  const map = useMap();
  useEffect(() => {
    if (!places.length) return;
    const bounds = L.latLngBounds(places.map((p) => p.coordinate));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 11 });
  }, [places, map]);
  return null;
}

export default function RouteMap({ places, selectedIds, routeBuilt, onAdd, onRemove }) {
  const { t } = useLang();
  const typeLabel = (type) => (type === 'natural' ? t('map.natural') : t('map.cultural'));
  const polyline = routeBuilt
    ? selectedIds
        .map((id) => places.find((p) => p.id === id))
        .filter(Boolean)
        .map((p) => p.coordinate)
    : [];

  const fallbackCenter = places.length ? places[0].coordinate : [43.0, 45.0];

  return (
    <MapContainer
      center={fallbackCenter}
      zoom={9}
      scrollWheelZoom
      attributionControl={false}
      className="route-map__canvas"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />
      <FitBounds places={places} />

      {places.map((p) => {
        const order = selectedIds.indexOf(p.id);
        const isSelected = order >= 0;
        return (
          <Marker
            key={p.id}
            position={p.coordinate}
            icon={makeIcon(p.type, isSelected ? order + 1 : null)}
            eventHandlers={{ click: () => { if (!isSelected) onAdd(p.id); } }}
          >
            <Popup className="route-popup" maxWidth={300}>
              <div className="route-popup__card">
                <div className="route-popup__photo">
                  <SmartImage src={p.image} name={p.name} alt={p.name} variant={p.type} />
                </div>
                <div className="route-popup__body">
                  <span className="route-popup__type">{typeLabel(p.type)}</span>
                  <h4 className="route-popup__name">{p.name}</h4>
                  <p className="route-popup__desc">{p.description}</p>
                  {isSelected ? (
                    <button
                      type="button"
                      className="route-popup__btn route-popup__btn--remove"
                      onClick={() => onRemove(p.id)}
                    >
                      {t('map.remove')}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="route-popup__btn"
                      onClick={() => onAdd(p.id)}
                    >
                      {t('map.add')}
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {polyline.length >= 2 && (
        <Polyline
          positions={polyline}
          pathOptions={{ color: '#1c1c1c', weight: 3, opacity: 0.9, dashArray: '2 9', lineCap: 'round' }}
        />
      )}
    </MapContainer>
  );
}
