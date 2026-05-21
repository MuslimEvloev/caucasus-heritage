/**
 * Абстрактный класс-родитель для всех разделов сайта.
 * Соответствует классу Section диаграммы классов ВКР (раздел 2.3.3).
 */
export default class Section {
  constructor({ id, title }) {
    if (new.target === Section) {
      throw new Error('Section — абстрактный класс, нельзя инстанцировать напрямую');
    }
    this.id = id;
    this.title = title;
  }

  open() {
    throw new Error('Метод open() должен быть переопределён в наследниках');
  }
}
