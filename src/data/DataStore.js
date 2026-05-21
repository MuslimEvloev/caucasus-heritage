import republics from './republics.json';
import places from './places.json';
import dishes from './dishes.json';

/**
 * DataStore — статическое хранилище контента сайта (раздел 2.3.4 ВКР).
 * Хранит данные о республиках, культурных объектах, блюдах и заранее
 * подготовленных маршрутах в виде JSON-файлов.
 */
const DataStore = {
  getRepublics() {
    return republics;
  },

  getRepublicById(id) {
    return republics.find((r) => r.id === id) || null;
  },

  getPlaces() {
    return places;
  },

  getPlacesByRepublic(republicId) {
    return places.filter((p) => p.republicId === republicId);
  },

  getPlaceById(id) {
    return places.find((p) => p.id === id) || null;
  },

  getDishes() {
    return dishes;
  },

  getDishesByRepublic(republicId) {
    return dishes.filter((d) => d.republicId === republicId);
  },
};

export default DataStore;
