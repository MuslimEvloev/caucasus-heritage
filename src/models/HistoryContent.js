export default class HistoryContent {
  constructor({ text, images = [] }) {
    this.text = text;
    this.images = images;
  }

  load() {
    return { text: this.text, images: this.images };
  }
}
