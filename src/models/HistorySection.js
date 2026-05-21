import Section from './Section.js';

export default class HistorySection extends Section {
  constructor(opts) {
    super(opts);
    this.content = null;
    this.currentRepublic = null;
  }

  loadHistory(republic) {
    this.currentRepublic = republic;
  }

  open() {
    return { route: '/history' };
  }
}
