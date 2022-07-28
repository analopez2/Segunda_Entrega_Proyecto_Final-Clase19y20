import { ContenedorFirebase } from '../../contenedores/ContenedorFirebase.js';
import { dbFirebase } from '../../DB/firebase/firebase.js';

class CarritoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(dbFirebase, 'carritos');
  }
}

export { CarritoDaoFirebase };
