import { Router } from 'express';
import { FilesystemContainer } from '../Api/FilesystemContainer.js';
import { config } from '../config/index.js';
import { ERRORS_UTILS } from '../utils/index.js';

const cartsRouter = Router();

const CartApi = new FilesystemContainer(config.FILESYSTEM_DB.carts);
const ProductsApi = new FilesystemContainer(config.FILESYSTEM_DB.products);

const BASE_CART = {
  products: [],
};

cartsRouter.post('/', async (req, res) => {
  try {
    const cart = await CartApi.save(BASE_CART);
    const cartId = cart.id;
    res.send({ id: cartId });
  } catch (error) {
    res.statusCode(400).send({ error: error });
  }
});

cartsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartApi.getById(id);
    if (!cart) {
      throw { error: ERRORS_UTILS.MESSAGES.NO_CART };
    }

    const carritoDelete = await CartApi.deleteById(id);

    res.send({
      mensaje: 'Carrito eliminado',
      carritoEliminado: carritoDelete,
    });
  } catch (error) {
    res.statusCode(404).send({ error: error });
  }
});

cartsRouter.get('/:id/productos', async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartApi.getById(id);

    if (!cart) {
      throw { error: ERRORS_UTILS.MESSAGES.NO_CART };
    }

    res.send(cart.products);
  } catch (error) {
    res.statusCode(404).send({ error: error });
  }
});

cartsRouter.post('/:id/productos', async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const cart = await CartApi.getById(id);

    if (!cart) {
      throw { error: ERRORS_UTILS.MESSAGES.NO_CART };
    }

    const product = await ProductsApi.getById(productId);

    if (!product) {
      throw { error: ERRORS_UTILS.MESSAGES.NO_PRODUCT };
    }

    cart.products.push(product);

    const updatedCart = await CartApi.updateById(id, cart);

    res.send(updatedCart);
  } catch (error) {
    res.status(404);
    res.send({ error });
  }
});

cartsRouter.delete('/:id/productos/:id_prod', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_prod } = req.params;

    let cart = await CartApi.getById(id);

    if (!cart) {
      throw { error: ERRORS_UTILS.MESSAGES.NO_CART };
    }

    const product = cart.products.find((e) => e.id == id_prod);

    if (!product) {
      throw { error: ERRORS_UTILS.MESSAGES.NO_PRODUCT };
    }

    cart.products = cart.products.filter((e) => e.id != id_prod);

    const updatedCart = await CartApi.updateById(id, cart);

    res.send(updatedCart);
  } catch (error) {
    res.statusCode(404).send({ error: error });
  }
});

export { cartsRouter };
