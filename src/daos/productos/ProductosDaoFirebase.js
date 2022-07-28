import { ContenedorFirebase } from '../../contenedores/ContenedorFirebase.js';
import { dbFirebase } from '../../DB/firebase/firebase.js';

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(dbFirebase, 'productos');
  }
}

export { ProductosDaoFirebase };
