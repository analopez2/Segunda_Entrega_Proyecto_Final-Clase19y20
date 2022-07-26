import { ContenedorMongoDb } from '../../contenedores/ContenedorMongoDb.js';
import { CarritoSchema } from '../../DB/mongoDb/CarritoSchema.js';

class CarritoDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super('carritos', CarritoSchema);
  }
}

export { CarritoDaoMongoDb };
