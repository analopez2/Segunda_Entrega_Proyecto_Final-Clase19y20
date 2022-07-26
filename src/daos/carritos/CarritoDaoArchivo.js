import { ContenedorArchivo } from '../../contenedores/ContenedorArchivo.js';
import { config } from '../../config/config.js';

class CarritoDaoArchivo extends ContenedorArchivo {
  constructor() {
    super(config.FILESYSTEM_DB.carts);
  }
}

export { CarritoDaoArchivo };
