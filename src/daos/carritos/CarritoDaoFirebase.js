import { ContenedorFirebase } from '../../contenedores/ContenedorFirebase.js';
import { dbFirebase } from '../../config/firebase.js';

class CarritoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(dbFirebase, 'carritos');
  }
}

export { CarritoDaoFirebase };
