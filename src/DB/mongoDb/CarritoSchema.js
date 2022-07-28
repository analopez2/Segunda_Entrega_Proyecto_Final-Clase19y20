import mongoose from 'mongoose';

const CarritoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  productos: { type: Array, required: true },
});

export { CarritoSchema };
