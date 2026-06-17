import republicsRu from './republics.json';
import placesRu from './places.json';
import dishesRu from './dishes.json';
import historyRu from './history.json';
import kitchenDishesRu from './kitchenDishes.json';
import restaurantsRu from './restaurants.json';

import republicsEn from './en/republics.json';
import placesEn from './en/places.json';
import dishesEn from './en/dishes.json';
import historyEn from './en/history.json';
import kitchenDishesEn from './en/kitchenDishes.json';
import restaurantsEn from './en/restaurants.json';

/**
 * DataStore — статическое хранилище контента сайта (раздел 2.3.4 ВКР).
 * Хранит данные о республиках, культурных объектах, блюдах и маршрутах в виде
 * JSON-файлов. Поддерживает две локали (ru / en): нужный набор выбирается
 * по текущему языку, который выставляет LanguageProvider через setLang().
 */

const DATA = {
  ru: {
    republics: republicsRu,
    places: placesRu,
    dishes: dishesRu,
    history: historyRu,
    kitchenDishes: kitchenDishesRu,
    restaurants: restaurantsRu,
  },
  en: {
    republics: republicsEn,
    places: placesEn,
    dishes: dishesEn,
    history: historyEn,
    kitchenDishes: kitchenDishesEn,
    restaurants: restaurantsEn,
  },
};

let currentLang = 'ru';

const DataStore = {
  setLang(lang) {
    currentLang = DATA[lang] ? lang : 'ru';
  },

  _d() {
    return DATA[currentLang] || DATA.ru;
  },

  getRepublics() {
    return this._d().republics;
  },

  getRepublicById(id) {
    return this._d().republics.find((r) => r.id === id) || null;
  },

  getPlaces() {
    return this._d().places;
  },

  getPlacesByRepublic(republicId) {
    return this._d().places.filter((p) => p.republicId === republicId);
  },

  getPlaceById(id) {
    return this._d().places.find((p) => p.id === id) || null;
  },

  getDishes() {
    return this._d().dishes;
  },

  getDishesByRepublic(republicId) {
    return this._d().dishes.filter((d) => d.republicId === republicId);
  },

  getDishById(id) {
    return this._d().dishes.find((d) => d.id === id) || null;
  },

  getHistory(republicId) {
    return this._d().history[republicId] || null;
  },

  getKitchenDishes(republicId) {
    return this._d().kitchenDishes[republicId] || [];
  },

  getRestaurants(republicId) {
    return this._d().restaurants[republicId] || [];
  },
};

export default DataStore;
