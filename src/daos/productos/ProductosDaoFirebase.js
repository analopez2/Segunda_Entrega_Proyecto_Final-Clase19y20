import { ContenedorFirebase } from '../../contenedores/ContenedorFirebase.js';
import { dbFirebase } from '../../config/firebase.js';

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(dbFirebase, 'productos');
  }
}

export { ProductosDaoFirebase };
