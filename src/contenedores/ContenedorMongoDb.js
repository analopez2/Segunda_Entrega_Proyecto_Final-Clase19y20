import mongoose from 'mongoose';
import { DATE_UTILS } from '../utils/utils.js';

class ContenedorMongoDb {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      const file = await this.model.find({});
      return file;
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      const elements = await this.model.find({});
      element.id =
        elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;
      element.timestamp = DATE_UTILS.getTimestamp();
      const newElement = new this.model({ ...element });
      let result = await newElement.save();
      console.log(result);
      return newElement;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const file = await this.model.findOne({ id: id });
      return file;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, newData) {
    try {
      const element = await this.model.findOne({ id: id });

      if (!element) return { error: 'Elemento no encontrado' };

      newData.id = id;
      newData.timestamp = DATE_UTILS.getTimestamp();

      let updatedElement = await this.model.findOneAndUpdate(
        { id: id },
        { ...newData },
        { new: true },
      );

      return updatedElement;
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
