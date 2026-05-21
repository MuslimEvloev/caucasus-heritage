export default class User {
  constructor({ id, name, login }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.currentSection = null;
  }

  selectSection(section) {
    this.currentSection = section;
  }

  selectRepublic(republic) {
    return republic;
  }

  buildRoute(places) {
    return places;
  }
}
