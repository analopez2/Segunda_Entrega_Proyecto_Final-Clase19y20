import { API_ROUTES } from './routes.js';
import { utils } from './utils.js';

const productsContainer = document.getElementById('productsContainer');

(async () => {
  const products = await API_ROUTES.getProducts();

  productsContainer.innerHTML = await utils.createProductTable(products);
})();
