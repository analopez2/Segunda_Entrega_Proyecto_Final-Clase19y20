import { config } from '../config/config.js';
import { CarritoDaoArchivo } from './carritos/CarritoDaoArchivo.js';
import { CarritoDaoFirebase } from './carritos/CarritoDaoFirebase.js';
import { CarritoDaoMemoria } from './carritos/CarritoDaoMemoria.js';
import { CarritoDaoMongoDb } from './carritos/CarritoDaoMongoDb.js';
import { ProductosDaoArchivo } from './productos/ProductosDaoArchivo.js';
import { ProductosDaoFirebase } from './productos/ProductosDaoFirebase.js';
import { ProductosDaoMemoria } from './productos/ProductosDaoMemoria.js';
import { ProductosDaoMongoDb } from './productos/ProductosDaoMongoDb.js';
import { MongoDb } from '../DB/mongoDb/mongodb.js';

let productoDao;
let carritoDao;

switch (config.selectedDB) {
  case 'mongodb':
    MongoDb.init();
    productoDao = new ProductosDaoMongoDb();
    carritoDao = new CarritoDaoMongoDb();
    break;
  case 'firebase':
    productoDao = new ProductosDaoFirebase();
    carritoDao = new CarritoDaoFirebase();
    break;
  case 'memoria':
    productoDao = new ProductosDaoMemoria();
    carritoDao = new CarritoDaoMemoria();
    break;

  default:
    productoDao = new ProductosDaoArchivo();
    carritoDao = new CarritoDaoArchivo();
    break;
}

export { productoDao, carritoDao };
