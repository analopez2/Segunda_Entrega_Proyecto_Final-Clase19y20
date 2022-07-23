import joi from 'joi';

const product = joi.object({
  nombre: joi.string().required(),
  descripcion: joi.string().required(),
  codigo: joi.string().required(),
  foto: joi.string().required(),
  precio: joi.number().required(),
  stock: joi.number().required(),
});

export const JOI_VALIDATOR = {
  product,
};
