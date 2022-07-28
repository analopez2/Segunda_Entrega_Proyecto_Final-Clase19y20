import { DATE_UTILS } from '../utils/utils.js';

class ContenedorFirebase {
  constructor(db, collectionName) {
    this.query = db.collection(collectionName);
  }

  async getAll() {
    try {
      const querySnapshot = await this.query.get();
      let docs = querySnapshot.docs;

      const elements = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return elements;
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      const doc = this.query.doc();
      element.timestamp = DATE_UTILS.getTimestamp();

      await doc.create(element);
      return { message: 'Elemento guardado', id: doc.id };
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const doc = this.query.doc(`${id}`);
      const element = await doc.get();
      return element.data();
    } catch (error) {
      return error;
    }
  }

  async updateById(id, newData) {
    try {
      const doc = this.query.doc(`${id}`);
      newData.timestamp = DATE_UTILS.getTimestamp();

      await doc.update(newData);
      return this.getById(id);
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const doc = this.query.doc(`${id}`);
      await doc.delete();
    } catch (error) {
      return error;
    }
  }
}

export { ContenedorFirebase };
