import { DATE_UTILS } from '../utils/utils.js';

class ContenedorFirebase {
  constructor(db, collectionName) {
    this.query = db.collection(collectionName);
  }

  async getAll() {
    try {
      const querySnapshot = await this.query.get();
      let docs = querySnapshot.docs;

      const response = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return response;
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      const doc = this.query.doc();
      let response = await doc.create(element);
      console.log(response);
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const doc = this.query.doc(id);
      const element = await doc.get();
      return element.data();
    } catch (error) {
      return error;
    }
  }

  async updateById(id, newData) {
    try {
      const doc = this.query.doc(id);
      await doc.update({ newData });
      return this.getById(id);
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const doc = this.query.doc(id);
      await doc.delete();
    } catch (error) {
      return error;
    }
  }
}

export { ContenedorFirebase };
