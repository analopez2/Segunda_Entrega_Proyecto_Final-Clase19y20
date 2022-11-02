import dotenv from 'dotenv';
dotenv.config();

const config = {
  FILESYSTEM_DB: {
    products: 'productos',
    carts: 'carritos',
  },
  server: {
    PORT: process.env.PORT || 8080,
    routes: {
      base: '/api',
      products: '/api/productos',
      carts: '/api/carrito',
    },
  },
  selectedDB: process.env.TIPO_DB,
  UrlMongoDB: process.env.URL,
};

export { config };
