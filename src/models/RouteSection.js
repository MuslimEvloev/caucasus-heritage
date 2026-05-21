import Section from './Section.js';

export default class RouteSection extends Section {
  constructor(opts) {
    super(opts);
    this.map = null;
    this.route = null;
  }

  calculateRoute(points) {
    this.route = points;
    return points;
  }

  showMap(map) {
    this.map = map;
  }

  open() {
    return { route: '/routes' };
  }
}
