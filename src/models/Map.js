export default class MapModel {
  constructor({ center, zoom = 9 }) {
    this.center = center;
    this.zoom = zoom;
  }

  load() {
    // тайлы загружаются Leaflet'ом из внешнего сервиса OSM Tile API
  }

  display() {
    // отрисовка карты в окне браузера через react-leaflet
  }
}
