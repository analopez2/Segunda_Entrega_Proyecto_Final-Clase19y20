import { DATE_UTILS } from '../utils/utils.js';

class ContenedorMemoria {
  constructor() {
    this.elements = [];
  }

  async getAll() {
    return this.elements;
  }

  async save(element) {
    element.id = this.newId();
    element.timestamp = DATE_UTILS.getTimestamp();

    this.elements.push(element);

    return element;
  }

  async getById(id) {
    const product = this.elements.find((p) => p.id == id);
    return product;
  }

  async updateById(id, newData) {
    const index = this.elements.findIndex((e) => e.id == id);

    if (index === -1) return { error: true };
    newData.timestamp = DATE_UTILS.getTimestamp();

    this.elements[index] = {
      ...this.elements[index],
      ...newData,
    };

    return this.elements[index];
  }

  async deleteById(id) {
    const index = this.elements.findIndex((e) => e.id == id);

    if (index === -1) return { error: true };

    this.elements = this.elements.filter((e) => e.id != id);

    return { error: false };
  }

  //#region private
  newId() {
    let id = 1;
    if (this.elements.length > 0) {
      id = this.elements[this.elements.length - 1].id + 1;
    }

    return id;
  }
  //#endregion
}

export { ContenedorMemoria };
