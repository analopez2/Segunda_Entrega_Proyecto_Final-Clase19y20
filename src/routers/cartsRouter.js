import { Router } from 'express';
import { ERRORS_UTILS } from '../utils/utils.js';
import { productoDao, carritoDao } from '../daos/index.js';

const cartsRouter = Router();

const CartApi = carritoDao;
const ProductsApi = productoDao;

const BASE_CART = {
  productos: [],
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

    res.send(cart.productos);
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

    cart.productos.push(product);

    const updatedCart = await CartApi.updateById(id, cart);

    res.send(updatedCart);
  } catch (error) {
    res.statusCode(404).send({ error: error.message });
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

    const product = cart.productos.find((e) => e.id == id_prod);

    if (!product) {
      throw { error: ERRORS_UTILS.MESSAGES.NO_PRODUCT };
    }

    cart.productos = cart.productos.filter((e) => e.id != id_prod);

    const updatedCart = await CartApi.updateById(id, cart);

    res.send(updatedCart);
  } catch (error) {
    res.statusCode(404).send({ error: error });
  }
});

export { cartsRouter };
