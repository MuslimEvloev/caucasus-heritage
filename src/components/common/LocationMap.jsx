import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LocationMap.css';

const PIN_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 1.7.8 3.4 2 5l4 5 4-5c1.2-1.6 2-3.3 2-5z"/><circle cx="12" cy="8" r="2.2"/></svg>';

function makePin() {
  return L.divIcon({
    html: `<div class="loc-marker">${PIN_SVG}</div>`,
    className: 'loc-marker-wrap',
    iconSize: [34, 34],
    iconAnchor: [17, 30],
    popupAnchor: [0, -28],
  });
}

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    if (points.length === 1) {
      map.setView(points[0].coordinate, 13);
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => p.coordinate));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
  }, [points, map]);
  return null;
}

export default function LocationMap({ points = [] }) {
  const center = points.length ? points[0].coordinate : [43.0, 45.0];
  const icon = makePin();

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom attributionControl={false} className="loc-map__canvas">
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />
      <FitBounds points={points} />
      {points.map((p) => (
        <Marker key={p.id} position={p.coordinate} icon={icon}>
          <Popup className="loc-popup" maxWidth={260}>
            <div className="loc-popup__card">
              <h4 className="loc-popup__name">{p.name}</h4>
              {p.specialty && <p className="loc-popup__specialty">{p.specialty}</p>}
              {p.address && <p className="loc-popup__address">{p.address}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
