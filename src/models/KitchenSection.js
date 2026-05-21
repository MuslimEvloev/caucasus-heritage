import Section from './Section.js';

export default class KitchenSection extends Section {
  constructor(opts) {
    super(opts);
    this.recipes = [];
  }

  showRecipes(recipes) {
    this.recipes = recipes;
  }

  open() {
    return { route: '/kitchen' };
  }
}
