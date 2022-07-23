import mongoose from 'mongoose';
import { DATE_UTILS } from '../utils/utils.js';

class ContenedorMongoDb {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      const file = await this.model.find({});
      return JSON.parse(file);
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      const elements = await this.getAll();
      element.id =
        elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;

      element.timestamp = DATE_UTILS.getTimestamp();
      await this.model.create(element);

      return element;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const file = await this.model.find({ id: id });
      return JSON.parse(file);
    } catch (error) {
      return error;
    }
  }

  async updateById(id, newData) {
    try {
      const element = await this.model.find({ id: id });

      if (!element) return { error: 'Elemento no encontrado' };

      newData.timestamp = DATE_UTILS.getTimestamp();

      await this.model.replaceOne({ id: id }, { ...element, ...newData });

      return await this.model.find({ id: id });
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      await this.model.deleteOne({ id: id });
    } catch (error) {
      return error;
    }
  }
}

export { ContenedorMongoDb };
