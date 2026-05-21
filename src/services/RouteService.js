import DataStore from '../data/DataStore.js';
import Route from '../models/Route.js';

/**
 * RouteService — сервис построения маршрутов (раздел 2.3.4 ВКР).
 * Берёт у пользователя список выбранных точек, читает их координаты
 * в DataStore, собирает маршрут и передаёт результат в MapComponent.
 */
const RouteService = {
  buildRoute(placeIds) {
    const points = placeIds
      .map((id) => DataStore.getPlaceById(id))
      .filter(Boolean);
    const route = new Route({ id: Date.now(), places: points });
    route.calculate(points);
    return route;
  },
};

export default RouteService;
