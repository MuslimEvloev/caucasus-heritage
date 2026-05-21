export default class Place {
  constructor({ id, name, type, coordinate, address, description }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.coordinate = coordinate;
    this.address = address;
    this.description = description;
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      coordinate: this.coordinate,
      address: this.address,
      description: this.description,
    };
  }
}
