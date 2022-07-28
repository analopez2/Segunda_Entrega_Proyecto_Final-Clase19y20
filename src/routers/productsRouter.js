import { Router } from 'express';
import { isAdmin } from '../middlewares/middlewares.js';
import { ERRORS_UTILS, JOI_VALIDATOR } from '../utils/utils.js';
import { productoDao } from '../daos/index.js';

const productsRouter = Router();

const ProductApi = productoDao;

productsRouter.get('/', async (req, res) => {
  try {
    const products = await ProductApi.getAll();
    res.send(products);
  } catch (error) {
    res.statusCode(404).send({ error: error.message });
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductApi.getById(id);

    if (!product) {
      throw { error: ERRORS_UTILS.MESSAGES.NO_PRODUCT };
    }

    res.send(product);
  } catch (error) {
    res.statusCode(400).send({ error: error.message });
  }
});

productsRouter.post('/', isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    const productSaved = await ProductApi.save(product);

    res.send(productSaved);
  } catch (error) {
    res.statusCode(400).send({ error: error.message });
  }
});

productsRouter.put('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    const productUpdate = await ProductApi.updateById(id, product);

    res.send(productUpdate);
  } catch (error) {
    res.statusCode(400).send({ error: error.message });
  }
});

productsRouter.delete('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductApi.getById(id);
    if (!product) {
      throw { error: ERRORS_UTILS.MESSAGES.NO_PRODUCT };
    }
    const productDelete = await ProductApi.deleteById(id);

    res.send({
      mensaje: 'Producto eliminado',
      productoEliminado: productDelete,
    });
  } catch (error) {
    res.statusCode(404).send({ error: error.message });
  }
});

export { productsRouter };
