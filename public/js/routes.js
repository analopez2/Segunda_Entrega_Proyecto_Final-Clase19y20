const getProducts = async () => {
  const response = await fetch('/api/productos');
  const products = await response.json();
  return products;
};

const getCarritos = async () => {
  const response = await fetch('/api/carrito');
  const carritos = await response.json();
  return carritos;
};

export const API_ROUTES = {
  getProducts,
  getCarritos,
};
