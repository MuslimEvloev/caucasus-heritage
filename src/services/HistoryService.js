import DataStore from '../data/DataStore.js';

/**
 * HistoryService — сервис исторического контента (раздел 2.3.4 ВКР).
 * Загружает данные о республиках и культурных объектах из DataStore,
 * фильтрует их по выбранному региону и отдаёт обратно в HomePage.
 */
const HistoryService = {
  loadRepublics() {
    return DataStore.getRepublics();
  },

  loadRepublic(id) {
    const republic = DataStore.getRepublicById(id);
    const places = DataStore.getPlacesByRepublic(id);
    return { republic, places };
  },
};

export default HistoryService;
