const indexService = require('../services/indexService');
const searchService = require('../services/searchService');

async function createProduct(req, res, next) {
  try {
    const { name, price } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'name and price are required' });
    }
    const product = await indexService.indexProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function bulkCreateProducts(req, res, next) {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'products must be a non-empty array' });
    }
    const result = await indexService.bulkIndexProducts(products);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function searchProducts(req, res, next) {
  try {
    const { q, category, minPrice, maxPrice, minRating, page, size } = req.query;
    const results = await searchService.searchProducts({
      q,
      category,
      minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
      maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
      minRating: minRating !== undefined ? Number(minRating) : undefined,
      page: page !== undefined ? Number(page) : 1,
      size: size !== undefined ? Number(size) : 10,
    });
    res.json(results);
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await indexService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const deleted = await indexService.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProduct,
  bulkCreateProducts,
  searchProducts,
  getProductById,
  deleteProduct,
};
