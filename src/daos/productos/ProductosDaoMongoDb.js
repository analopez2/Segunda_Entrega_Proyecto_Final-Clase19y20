import { ContenedorMongoDb } from '../../contenedores/ContenedorMongoDb.js';
import { ProductosSchema } from '../../DB/mongoDb/ProductosSchema.js';

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super('productos', ProductosSchema);
  }
}

export { ProductosDaoMongoDb };
