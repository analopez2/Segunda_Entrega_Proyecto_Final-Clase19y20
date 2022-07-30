import mongoose from 'mongoose';
import { ProductosSchema } from './ProductosSchema.js';

const CarritoSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  productos: { type: [ProductosSchema], required: true },
});

export { CarritoSchema };
