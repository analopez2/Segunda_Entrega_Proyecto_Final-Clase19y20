import dotenv from 'dotenv';
dotenv.config();

import { CarritoDaoArchivo } from './carritos/CarritoDaoArchivo.js';
import { CarritoDaoFirebase } from './carritos/CarritoDaoFirebase.js';
import { CarritoDaoMemoria } from './carritos/CarritoDaoMemoria.js';
import { CarritoDaoMongoDb } from './carritos/CarritoDaoMongoDb.js';
import { ProductosDaoArchivo } from './productos/ProductosDaoArchivo.js';
import { ProductosDaoFirebase } from './productos/ProductosDaoFirebase.js';
import { ProductosDaoMemoria } from './productos/ProductosDaoMemoria.js';
import { ProductosDaoMongoDb } from './productos/ProductosDaoMongoDb.js';

let productoDao;
let carritoDao;
const db = process.env.TIPO_DB;

switch (db) {
  case 'mongodb':
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
